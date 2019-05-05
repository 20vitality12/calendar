import React from 'react'
import moment from 'moment';
import {render} from 'react-dom'

import './less/styles.less';

import App from './cmoponents/App';
import DayNames from './cmoponents/DayNames'
import Weeks from './cmoponents/Weeks'
import Week from './cmoponents/Week'
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
        const { month } = this.state;

        this.setState({
            month: month.subtract(1, 'month'),
        });
    }

    next() {
        const { month } = this.state;

        this.setState({
            month: month.add(1, 'month'),
        });
    }
    previousWeek() {
        const  {week } = this.state;

        this.setState({
            week: week.subtract(1, 'week'),
        });
    }

    nextWeek() {
        const  { week } = this.state;

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

        const { selected, month} = this.state;

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
        const { isSliderOpened, month } = this.state;

        return <span className="month-label">{ month.format("MMM") }
                <i className={`fas ${isSliderOpened ? 'fa-chevron-up' : 'fa-chevron-down'}`}
                onClick={() => this.toggleSlider() }/>
               </span>;
    }

    renderDay2Day() {
        const { selected } = this.state;

        return <span className="currentDate">{selected.format("dddd, D MMMM")}</span>;
    }

    renderToDoList() {
        const { selected } = this.state;

        return <App selectedDay={selected}/>
    }

    showThisState() {
        this.setState({ show: !this.state.show });
    }

    render() {
        const { isSliderOpened, show } = this.state;

        if(show) {
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

render(<Calendar/>, document.getElementById('app'))