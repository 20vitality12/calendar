import React, {Component, Fragment} from 'react'
import moment, {Moment} from "moment";
import {getRandomString} from "../utils/string-utils";
import TodoItem from "./ToDoItem";
import PropTypes from 'prop-types';
import {ToDoItemsConsumer} from "./ToDoItemsContext";

export default class ToDoList extends Component {
    static propTypes = {
        selectedDate: PropTypes.instanceOf(moment).isRequired
    };

    inputElement = React.createRef();

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        this.inputElement.current.focus()
    }

    getNewToDoItem = (text = '', relatedDate) => ({
        text,
        key: getRandomString(10),
        relatedDate
    });

    onSubmit = (e, addItemCalback, relatedDateStringFormatter) => {
        e.preventDefault();
        e.stopPropagation();

        const newItemText = this.inputElement.current.value;

        if (newItemText) {
            addItemCalback(this.getNewToDoItem(newItemText, relatedDateStringFormatter(this.props.selectedDate)));
        }

        this.inputElement.current.value = '';
    };


    render() {
        return (
            <ToDoItemsConsumer>
                {({ state, actions }) => {
                    const itemsToRender = state.filter((i) => i.relatedDate === actions.getToDoItemRelatedDateFromMoment(this.props.selectedDate));

                    return (
                        <Fragment>
                            <div className="todoListMain">
                                <div className="header-todo">
                                    <form onSubmit={(e) => this.onSubmit(e, actions.addItem, actions.getToDoItemRelatedDateFromMoment)}>
                                        <input className="input-task" maxLength="80"
                                               placeholder="Enter new task"
                                               ref={this.inputElement}/>
                                        <button className="btn" type="submit"> Add Task</button>
                                    </form>
                                </div>
                            </div>
                            {itemsToRender.length > 0 &&
                            <ul className="theList">
                                {itemsToRender.map((model) => <TodoItem model={model}
                                                                        key={model.key}
                                                                        deleteItem={actions.deleteItem}
                                                                        markDone={actions.markDone}/>)}
                            </ul>
                            }
                        </Fragment>
                    );
                }}
            </ToDoItemsConsumer>
        )
    }
}