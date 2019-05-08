import React, {Fragment} from "react";
import moment from "moment";
import DayNames from "./DayNames";
import Week from "./Week";
import ToDoList from "./TodoList";
import {ToDoItemsProvider} from "./ToDoItemsContext";

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMonth: moment(),
            selectedWeek: moment(),
            selectedDate: moment().startOf('day'),
            isSliderOpened: false,
            show: true,
            toDoItems: []
        };

        this.showThisStateWeek = this.showThisStateWeek.bind(this);
        this.showThisStateMonth = this.showThisStateMonth.bind(this);
    }

    onPreviousClick = () => this.state.show ? this.previousMonth() : this.previousWeek();

    onNextClick = () => this.state.show ? this.nextMonth() : this.nextWeek();

    renderLabel = () => this.state.show ? this.renderMonthLabel() : this.renderWeekLabel();

    previousMonth = () => this.setState({selectedMonth: this.state.selectedMonth.subtract(1, 'month')});
    nextMonth = () => this.setState({selectedMonth: this.state.selectedMonth.add(1, 'month')});
    previousWeek = () => this.setState({selectedWeek: this.state.selectedWeek.subtract(1, 'week')});
    nextWeek = () => this.setState({selectedWeek: this.state.selectedWeek.add(1, 'week')});

    onDaySelect = (date) => this.setState({selectedDate: date, selectedMonth: date.clone()});

    renderMonthLabel() {
        const {isSliderOpened, selectedMonth} = this.state;

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
                     selectedDate={selectedDate}
        />;
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

    showThisStateWeek() {
        this.setState({show: this.state.show = false});
    }

    showThisStateMonth() {
        this.setState({show: this.state.show = true});
    }

    deleteToDoItem = (key) => this.setState({
        toDoItems: this.state.toDoItems.filter(item => item.key !== key),
    });

    markToDoItemDone = (key) => this.setState({
        toDoItems: this.state.toDoItems.map(item => item.key === key
            ? {...item, isDone: true}
            : item),
    });

    addToDoItem = (newItem) => this.setState({
        toDoItems: [
            ...this.state.toDoItems,
            newItem
        ]
    });

    getToDoItemRelatedDateFromMoment = (momentObj) => moment(momentObj).startOf('day').toISOString();

    renderMonthBtn() {
        const selectedMonth = this.state.selectedMonth;

        return <Fragment>
        <span className="prev-next"
              onClick={() => this.onPreviousClick()}>{selectedMonth.clone().subtract(1, "month").format("MMM")}</span>
            {this.renderLabel()}
            <span className="prev-next"
                  onClick={() => this.onNextClick()}>{selectedMonth.clone().add(1, "month").format("MMM")}</span>
        </Fragment>
    }

    renderWeekBtn() {

        return <React.Fragment>
            <span className="prev-next" onClick={() => this.onPreviousClick()}>prev</span>
            {this.renderLabel()}
            <span className="prev-next" onClick={() => this.onNextClick()}>next</span>
        </React.Fragment>
    }

    render() {
        const {isSliderOpened, show} = this.state;

        return (
            <section className="calendar">
                <ToDoItemsProvider value={{
                    state: this.state.toDoItems,
                    actions: {
                        deleteItem: this.deleteToDoItem,
                        markDone: this.markToDoItemDone,
                        addItem: this.addToDoItem,
                        getToDoItemRelatedDateFromMoment: this.getToDoItemRelatedDateFromMoment
                    }
                }}>
                    <header className="header">
                        <div className="month-display row">
                            {show ? this.renderMonthBtn() : this.renderWeekBtn()}
                        </div>
                        {isSliderOpened &&
                        <div className="row display-mode">
                            <span className="option" onClick={this.showThisStateWeek}>This week</span>
                            <span className="option" onClick={this.showThisStateMonth}>This month</span>
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
                </ToDoItemsProvider>
            </section>
        );
    }
}