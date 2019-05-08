import React, {Component, Fragment} from 'react'
import moment, {Moment} from "moment";
import {getRandomString} from "../utils/string-utils";
import TodoItem from "./ToDoItem";
import PropTypes from 'prop-types';

export const {Provider, Consumer} = React.createContext()

export default class ToDoList extends Component {
    static propTypes = {
        selectedDate: PropTypes.instanceOf(Moment).isRequired
    };

    inputElement = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }  
    }

    componentDidUpdate() {
        this.inputElement.current.focus()
    }

    onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const newItemText = this.inputElement.current.value;

        if (newItemText) {
            this.addItem(newItemText);
        }

        this.inputElement.current.value = '';
    };

    get selectedDateString() {
        const selectedDay = this.props.selectedDate || new Date();

        return moment(selectedDay).startOf('day').toISOString();
    };


    getNewToDoItem = (text = '') => ({
        text,
        key: getRandomString(10),
        relatedDate: this.selectedDateString
    });

    deleteItem = (key) => this.setState({
        items: this.state.items.filter(item => item.key !== key),
    });

    markDone = (key) => this.setState({
        items: this.state.items.map(item => item.key === key
            ? {...item, isDone: true}
            : item),
    });

    addItem = (text) => this.setState({
        items: [
            ...this.state.items,
            this.getNewToDoItem(text)
        ],
    });

    render() {
        
        const itemsToRender = this.state.items.filter((i) => i.relatedDate === this.selectedDateString);
        
        return (
            
            <Fragment>
                <Provider value={{state: this.state}}> {this.props.children}
                <div className="todoListMain">
                    <div className="header-todo">
                        <form onSubmit={this.onSubmit}>
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
                                                            deleteItem={this.deleteItem}
                                                            markDone={this.markDone}/>)}
                </ul>
                }
                </Provider>
            </Fragment>
            
        )
    }
}