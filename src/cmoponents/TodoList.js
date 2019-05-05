import React, {Component} from 'react'

class TodoList extends Component {
    inputElement = React.createRef();

    componentDidUpdate() {
        this.inputElement.current.focus()
    }

    onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const newItemText = this.inputElement.current.value;

        if (newItemText) {
            this.props.addItem(newItemText);
        }
    };

    render() {
        return (
            <div className="todoListMain">
                <div className="header-todo">
                    <form onSubmit={this.onSubmit}>
                        <input className="input-task" maxLength="80"
                            placeholder="Task"
                            ref={this.inputElement}
                        />
                        <button className="btn" type="submit"> Add Task</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default TodoList
