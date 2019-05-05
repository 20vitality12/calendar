import React, { Component } from 'react'

class TodoItems extends Component {
  createTasks = item => {
    return (
      <li key={item.key}  className={item.isDone ? 'task-li line-through' : 'task-li'}>
        {item.text} <br></br>
          <button  className="item-btn" onClick={()=>this.props.deleteItem(item.key)}>Delete</button>
          <button  className="item-btn" onClick={()=>this.props.markDone(item.key)}>Done</button>
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
