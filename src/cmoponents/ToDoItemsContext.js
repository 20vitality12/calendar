import React from 'react';

const ToDoItemsContext = React.createContext({
    state: [],
    actions: {}
});

export const ToDoItemsProvider = ToDoItemsContext.Provider;
export const ToDoItemsConsumer = ToDoItemsContext.Consumer;