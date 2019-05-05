import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
    static propTypes = {
        model: PropTypes.shape({
            isDone: PropTypes.bool,
            key: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired,
        deleteItem: PropTypes.func.isRequired,
        markDone: PropTypes.func.isRequired,
    };

    render() {
        const { model, deleteItem, markDone } = this.props;

        return (
            <li key={model.key}  className={model.isDone ? 'task-li line-through' : 'task-li'}>
                {model.text} <br />
                <button  className="item-btn" onClick={()=>deleteItem(model.key)}>Delete</button>
                <button  className="item-btn" onClick={()=>markDone(model.key)}>Done</button>
            </li>
        );
    }
}

export default TodoItem