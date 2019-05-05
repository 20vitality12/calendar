import React from "react";
import Day from "./Day";
import PropTypes from "prop-types";
import { Moment } from 'moment';
export default class Week extends React.Component {
    static propTypes = {
        startOfWeek: PropTypes.instanceOf(Moment).isRequired,
        startOfMonth: PropTypes.instanceOf(Moment),
        selectedDate: PropTypes.instanceOf(Moment).isRequired,
        onDaySelect: PropTypes.func.isRequired,
    };

    render() {
        let days = [];

        const {
            startOfWeek,
            selectedDate,
            onDaySelect,
            selectedMonth
        } = this.props;

        let currentDate = startOfWeek;

        for (let i = 0; i < 7; i++) {
            days.push(currentDate);
            currentDate = currentDate.clone();
            currentDate.add(1, "day");
        }
        
        return (
            <div className="row week" key={days[0]}>
                {days.map((day) => (
                    <Day date={day}
                         key={day.toISOString()}
                         isCurrentMonth={selectedMonth ? day.month() === selectedMonth.month() : true}
                         number={day.date()}
                         selectedDate={selectedDate}
                         onDaySelect={onDaySelect}/>
                ))}
            </div>
        );
    }
}