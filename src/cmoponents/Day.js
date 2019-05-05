import React from 'react';
import PropTypes from 'prop-types';
import { Moment } from 'moment';
export default class Day extends React.Component {
    static propTypes = {
        date: PropTypes.instanceOf(Moment).isRequired,
        isCurrentMonth: PropTypes.bool.isRequired,
        number: PropTypes.number.isRequired,
        onDaySelect: PropTypes.func.isRequired,
        selectedDate: PropTypes.instanceOf(Moment).isRequired
    };

    render() {
        const {
            date,
            number,
            onDaySelect,
            selectedDate,
            isCurrentMonth
        } = this.props;

        const isToday = date.isSame(new Date(), "day");
        //const hasEvents = 
        
        return (
            <div key={date.toISOString()}
               className={"day" + (isToday ? " today" : "") 
               + (isCurrentMonth ? "" : " different-month") 
               + (date.isSame(selectedDate) ? " selected" : "")}
                onClick={() => onDaySelect(date)}>
                <div className="day-number">
                    <span className="">{number}</span>
                </div>
            </div>
        );
    }
}