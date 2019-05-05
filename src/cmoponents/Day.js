import React, { Component } from 'react'

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

export default Day