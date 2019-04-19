import React from 'react'
import { render } from 'react-dom'
import './css/styles.css'
import './less/styles.less';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      month: moment(),
      selected: moment().startOf('day')
    };
    
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }
  previous() {
    const {
      month,
    } = this.state;
  
    this.setState({
      month: month.subtract(1, 'month'),
    });
  }
  

  next() {
    const {
      month,
    } = this.state;

    this.setState({
      month: month.add(1,'month'),
    });
  }
  
  select(day) {
    this.setState({
      selected: day.date,
      month: day.date.clone(),
    });
  }

  renderWeeks() {
    let weeks = [];
    let done = false;
    let date = this.state.month.clone().startOf("month").add("w" -1).day("Sunday");
    let count = 0;
    let monthIndex = date.month();

    const {
      selected,
      month,
    } = this.state;

    while (!done) {
      weeks.push(
        <Week key={date} 
          date={date.clone()} 
          month={month} 
          select={(day)=>this.select(day)} 
          selected={selected} />
      );

      date.add(1, "w");
      
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  };

  slide() {
    var icon = document.querySelector('.fa-chevron-down');
    var panel =  document.querySelector('.display-mode');
    var iconUp = document.querySelector('.fa-chevron-up');
    var icons = document.getElementsByClassName("fas");
    for( var i = 0; i < icons.length; i++) {
      icons[i].addEventListener("click", function() {
      
        if (panel.style.display === "flex") {
          panel.style.display = "none";
          iconUp.style.display = "none";
          icon.style.display = "inline-block";
        } else {
          panel.style.display = "flex";
          icon.style.display = "none";
          iconUp.style.display = "inline-block";
        }
      })  
    }
    
  }

  renderMonthLabel() {
    const {
      month,
    } = this.state;

    return <span className="month-label">{month.format("MMM")} 
    <i className="fas fa-chevron-down" onClick={this.slide}></i>
    <i className="fas fa-chevron-up" onClick={this.slide}></i>
    </span>;
  }

  render() {
    return (
      <section className="calendar">
        <header className="header">
          <div className="month-display row">
            <i className="arrow fa fa-angle-left" onClick={this.previous}/>
            {this.renderMonthLabel()}
            <i className="arrow fa fa-angle-right" onClick={this.next}/>
          </div>
          <div className="row display-mode">
            <span className="option">This week</span>
            <span className="option">This month</span>
          </div>
          <DayNames />
        </header>
        <div className="days-container">
          {this.renderWeeks()}
        </div>
      </section>
    );
  }
}

class DayNames extends React.Component {
    render() {
        return (
          <div className="row day-names">
            <span className="day">S</span>
            <span className="day">M</span>
            <span className="day">T</span>
            <span className="day">W</span>
            <span className="day">T</span>
            <span className="day">F</span>
            <span className="day">S</span>
          </div>
        );
    }
}

class Week extends React.Component {
  render() {
    let days = [];
    let {
      date,
    } = this.props;
    
    const {
      month,
      selected,
      select,
    } = this.props;

    for (var i = 0; i < 7; i++) {
      let day = {
          name: date.format("dd").substring(0, 1),
          number: date.date(),
          isCurrentMonth: date.month() === month.month(),
          isToday: date.isSame(new Date(), "day"),
          date: date
      };
      days.push(
        <Day day={day}
          selected={selected}
          select={select}/>
      );

      date = date.clone();
      date.add(1, "day");
    }

    return (
      <div className="row week" key={days[0]}>
        {days}
      </div>
    );
  }

}

class Day extends React.Component {
  render() {
    const {
      day,
      day: {
        date,
        isCurrentMonth,
        isToday,
        number
      },
      select,
      selected
    } = this.props;

    return (
      <div 
        key={date.toString()} 
        className={"day" + (isToday ? " today" : "") + (isCurrentMonth ? "" : " different-month") + (date.isSame(selected) ? " selected" : "")} 
        onClick={()=>select(day)}><div className="day-number">{number}</div>
      </div>
    );
  }
}

render(<Calendar/>, document.getElementById('app'))