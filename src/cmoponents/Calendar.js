import React from "react";
import moment from "moment";
import ToDoList from "./ToDoList";
import DayNames from "./DayNames";
import Week from "./Week";

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMonth: moment(),
            selectedWeek: moment(),
            selectedDate: moment().startOf('day'),
            isSliderOpened: false,
            show: true,
        };

        this.showThisState = this.showThisState.bind(this);
    }

    onPreviousClick = () => this.state.show ? this.previousMonth() : this.previousWeek();

    onNextClick = () => this.state.show ? this.nextMonth() : this.nextWeek();

    renderLabel = () => this.state.show ? this.renderMonthLabel() : this.renderWeekLabel();

    previousMonth = () => this.setState({ selectedMonth: this.state.selectedMonth.subtract(1, 'month')});
    nextMonth = () => this.setState({ selectedMonth: this.state.selectedMonth.add(1, 'month')});
    previousWeek = () => this.setState({ selectedWeek: this.state.selectedWeek.subtract(1, 'week') });
    nextWeek = () =>  this.setState({ selectedWeek: this.state.selectedWeek.add(1, 'week') });

    onDaySelect = (date) => this.setState({ selectedDate: date, selectedMonth: date.clone() });

    renderMonthLabel() {
      const {isSliderOpened, selectedMonth } = this.state;

      
      return <span className="month-label">{selectedMonth.format("MMM")}
          <i className={`fas ${isSliderOpened ? 'fa-chevron-up' : 'fa-chevron-down'}`}
             onClick={() => this.toggleSlider()}/>
             </span>;
    }

    renderWeekLabel() {
      const {isSliderOpened, selectedWeek} = this.state;

      
      return <span className="month-label">{selectedWeek.format("MMM")}
          <i className={`fas ${isSliderOpened ? 'fa-chevron-up' : 'fa-chevron-down'}`}
             onClick={() => this.toggleSlider()}/>
             </span>;
    }

    renderWeeks() {
        let weeks = [];
        let done = false;
        let date = this.state.selectedMonth.clone().startOf("month").add("d" - 1).day("Sunday");
        let count = 0;
        let monthIndex = date.month();

        const {
            selectedDate,
            selectedMonth,
        } = this.state;

        while (!done) {
            weeks.push(
                <Week key={date.toISOString()}
                      startOfWeek={date.clone()}
                      selectedMonth={selectedMonth}
                      onDaySelect={(day) => this.onDaySelect(day)}
                      selectedDate={selectedDate}/>
            );

            date.add(1, "w");

            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        return weeks;
    };

   renderWeek() {
        const {
            selectedDate,
            selectedWeek,
        } = this.state;

        return <Week key={selectedWeek.toISOString()}
                     startOfWeek={selectedWeek.clone()}
                     selectedWeek={selectedWeek}
                     onDaySelect={(date) => this.onDaySelect(date)}
                     selectedDate={selectedDate}/>;
    };

    toggleSlider() {
        this.setState({isSliderOpened: !this.state.isSliderOpened});
    }

    

    renderDay2Day() {
        const {selectedDate} = this.state;

        return <span className="currentDate">{selectedDate.format("dddd, D MMMM")}</span>;
    }

    renderToDoList() {
        const {selectedDate} = this.state;

        return <ToDoList selectedDate={selectedDate}/>
    }

    showThisState() {
        this.setState({show: !this.state.show});
    }

    render() {
        const {isSliderOpened, show} = this.state;

        return (
            <section className="calendar">
                <header className="header">
                    <div className="month-display row">
                        <i className="arrow fa fa-angle-left" onClick={() => this.onPreviousClick()}/>
                        {this.renderLabel()}
                        <i className="arrow fa fa-angle-right" onClick={() => this.onNextClick()}/>
                    </div>

                    {isSliderOpened &&
                        <div className="row display-mode">
                            <span className="option" onClick={this.showThisState}>This week / This month</span>
                        </div>
                    }
                    <DayNames/>
                </header>
                <div className="days-container">
                    {show ? this.renderWeeks() : this.renderWeek()}
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