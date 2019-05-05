import React from 'react'
import {render} from 'react-dom'
import './css/styles.css'
import './less/styles.less';
import App from './cmoponents/App';

import moment from 'moment';

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            month: moment(),
            week: moment(),
            selected: moment().startOf('day'),
            isSliderOpened: false,
            show: true,
        };

        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.previousWeek = this.previousWeek.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
        this.showThisState = this.showThisState.bind(this);
    }

    previous() {
        const {month} = this.state;

        this.setState({
            month: month.subtract(1, 'month'),
        });
    }

    next() {
        const {month} = this.state;

        this.setState({
            month: month.add(1, 'month'),
        });
    }
    previousWeek() {
        const {week} = this.state;

        this.setState({
            week: week.subtract(1, 'week'),
        });
    }

    nextWeek() {
        const {week} = this.state;

        this.setState({
            week: week.add(1, 'week'),
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
        let date = this.state.month.clone().startOf("month").add("d" - 1).day("Sunday");
        let count = 0;
        let monthIndex = date.month();

        const {
            selected,
            month,
        } = this.state;

        while (!done) {
            weeks.push(
                <Weeks key={date}
                      date={date.clone()}
                      month={month}
                      select={(day) => this.select(day)}
                      selected={selected}/>
            );

            date.add(1, "w");

            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        return weeks;
    };

    renderWeek() {
        let weeks = [];
        let done = false;
        let date = this.state.week.clone().startOf("week").add("d" - 1).day("Sunday");
        let count = 0;
        let weekIndex = date.week();

        const {
            selected,
            week,
        } = this.state;

        while (!done) {
            weeks.push(
                <Week key={date}
                      date={date.clone()}
                      week={week}
                      select={(day) => this.select(day)}
                      selected={selected}/>
            );

            date.add(1, "w");

            done = count++ > 2 && weekIndex !== date.week();
            weekIndex = date.week();
        }

        return weeks;
    };

    toggleSlider() {
        this.setState({isSliderOpened: !this.state.isSliderOpened});
    }

    renderMonthLabel() {
        const {isSliderOpened, month} = this.state;

        return <span className="month-label">{month.format("MMM")}
            <i className={`fas ${isSliderOpened ? 'fa-chevron-up' : 'fa-chevron-down'}`}
               onClick={() => this.toggleSlider()}/>
     </span>;
    }

    renderDay2Day() {
        const {selected} = this.state;

        return <span className="currentDate">{selected.format("dddd, D MMMM")}</span>;
    }

    renderToDoList() {
        const { selected } = this.state;

        return <App selectedDay={selected}/>
    }

    showThisState() {
        this.setState({show: !this.state.show});
    }

    render() {
        const {isSliderOpened, show} = this.state;

        if( show ) {
        return (
            <section className="calendar">
                <header className="header">
                    <div className="month-display row">
                        <i className="arrow fa fa-angle-left" onClick={this.previous}/>
                        {this.renderMonthLabel()}
                        <i className="arrow fa fa-angle-right" onClick={this.next}/>
                    </div>
                    {isSliderOpened &&
                    <div className="row display-mode">
                        <span className="option" onClick={this.showThisState}>This week / This month</span>
                    </div>
                    }
                    <DayNames/>
                </header>
                <div className="days-container">
                    {this.renderWeeks()}
                </div>
                <div className="events-container">
                    <div className="day2day">
                        {this.renderDay2Day()}
                    </div>
                    <div className="events">
                        {this.renderToDoList()} 
                    </div>
                </div>
            </section>
        );
        } else {
            return (
                <section className="calendar">
                    <header className="header">
                        <div className="month-display row">
                            <i className="arrow fa fa-angle-left" onClick={this.previousWeek}/>
                            {this.renderMonthLabel()}
                            <i className="arrow fa fa-angle-right" onClick={this.nextWeek}/>
                        </div>
                        {isSliderOpened &&
                        <div className="row display-mode">
                            <span className="option" onClick={this.showThisState}>This week / This month</span>
                        </div>
                        }
                        <DayNames/>
                    </header>
                    <div className="days-container hide">
                        {this.renderWeek()}
                    </div>
                    <div className="events-container">
                        <div className="day2day">
                            {this.renderDay2Day()}
                        </div>
                        <div className="events">
                            {this.renderToDoList()}
                        </div>
                    </div>
                </section>
            );    
        }
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

class Weeks extends React.Component {
    render() {
        let days = [];
        let {
            date,
        } = this.props;

        const {
            month,
            selected,
            select
            
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

class Week extends React.Component {
    render() {
        let days = [];
        let {
            date,
        } = this.props;

        const {
            month,
            week,
            selected,
            select
            
        } = this.props;

        for (var i = 0; i < 7; i++) {
            let day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.week() === week.week(),
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
                onClick={() => select(day)}>
                <div className="day-number"><span className="">{number}</span></div>
            </div>
        );
    }
}

render(<Calendar/>, document.getElementById('app'))