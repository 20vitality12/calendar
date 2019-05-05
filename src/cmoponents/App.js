import React, {Component} from 'react'
import TodoList from './TodoList'
import TodoItems from './TodoItems'
import {getRandomString} from "../utils/string-utils";
import moment from 'moment';

class App extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
        }
    }

    get selectedDateString() {
        const selectedDay = this.props.selectedDay || new Date();

        return moment(selectedDay).toISOString();
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

    handleInput = e => {
        const itemText = e.target.value;
        const currentItem = {text: itemText, key: Date.now()};
        this.setState({
            currentItem,
        })
    };

    addItem = (text) => this.setState({
        items: [
            ...this.state.items,
            this.getNewToDoItem(text)
        ],
    });

    render() {
        const itemsToRender = this.state.items.filter((i) => i.relatedDate === this.selectedDateString);
        if(itemsToRender > 0);
        return (
            <div className="App">
                <TodoList
                    addItem={this.addItem}
                    handleInput={this.handleInput}
                    currentItem={this.state.currentItem}
                />
                <TodoItems entries={itemsToRender} deleteItem={this.deleteItem} markDone={this.markDone}/>
                
            </div>
        )
    }
}

export default App
