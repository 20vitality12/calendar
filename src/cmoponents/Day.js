import React from 'react'
import PropTypes from 'prop-types';
import {ToDoItemsConsumer} from "./ToDoItemsContext";
import moment from "moment";
 
export default class Day extends React.Component {
    static propTypes = {
        date: PropTypes.instanceOf(moment).isRequired,
        isCurrentMonth: PropTypes.bool.isRequired,
        number: PropTypes.number.isRequired,
        onDaySelect: PropTypes.func.isRequired,
        selectedDate: PropTypes.instanceOf(moment).isRequired
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
        
        
        return (
            <ToDoItemsConsumer>
                {({ state, actions }) => {
                    const itemsOnDate = state.filter((i) => i.relatedDate === actions.getToDoItemRelatedDateFromMoment(date));

                    const todoItemsCount = itemsOnDate.length;

                    return (
                        <div key={date.toISOString()}
                             className={"day" + (isToday ? " today" : "")
                             + (isCurrentMonth ? "" : " different-month")
                             + (date.isSame(selectedDate) ? " selected" : "")}
                             onClick={() => onDaySelect(date)}>
                            <div className="day-number">
                                <div className="border"></div>
                                <div>
                                    <span >{number} </span>
                                </div>
                                <div className="task-line-container">
                                    <div className={(todoItemsCount === 1 ? " has-events one-task" : "")}></div>
                                    <div className={(todoItemsCount === 2 ? " has-events two-task" : "")}></div><div className={(todoItemsCount === 2 ? " has-events two-task" : "")}></div>
                                    <div className={(todoItemsCount > 2 ? " has-events three-task" : "")}></div><div className={(todoItemsCount > 2 ? " has-events three-task" : "")}></div><div className={(todoItemsCount > 2 ? " has-events three-task" : "")}></div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </ToDoItemsConsumer>

        );
    }
}
