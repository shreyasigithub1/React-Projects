import TodoItem from "./todoItem";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [
        { id: 1, text: "Buy milk", isCompleted: false },
        { id: 2, text: "Clean room", isCompleted: false },
        { id: 3, text: "Read a book", isCompleted: false },
        { id: 4, text: "Do laundry", isCompleted: false },
        { id: 5, text: "Finish project", isCompleted: false },
        { id: 6, text: "Call Mom", isCompleted: false },
      ],
    };
  }

  handleTask(id) {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id == id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    }));
  }
  render() {
    return (
      <>
        <h1>Todo List</h1>
        <ul>
          {this.state.todos.map((td) => (
            <li>
              <TodoItem
                key={td.id}
                text={td.text}
                isCompleted={td.isCompleted}
                handleTask={() => this.handleTask(td.id)}
              />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default App;
