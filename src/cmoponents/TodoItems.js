import React, { Component } from 'react'

class TodoItems extends Component {
  createTasks = item => {
    return (
      <li key={item.key} className={item.isDone ? 'line-through' : ''}>
        {item.text}
          <button onClick={()=>this.props.deleteItem(item.key)}>Delete</button>
          <button onClick={()=>this.props.markDone(item.key)}>Done</button>
      </li>
    )
  };

  render() {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.createTasks);

    return <ul className="theList">{listItems}</ul>
  }
}

export default TodoItems
