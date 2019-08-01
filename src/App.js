import React from "react";

class Todo extends React.Component {
  render() {
    return (
      <li className="task">
        {
          <React.Fragment>
            <span
              className="close"
              onClick={() => {
                this.props.removeOnClick();
              }}
            />
            <span
              className={this.props.done ? "is-done" : ""}
              onClick={() => {
                this.props.toggleOnClick();
              }}
            >
              {this.props.title}
            </span>
          </React.Fragment>
        }
      </li>
    );
  }
}

class App extends React.Component {
  state = {
    todos: [
      { title: "Learn to code", done: true },
      { title: "Rule the world", done: false }
    ],
    value: ""
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    let refTodos = [...this.state.todos];
    refTodos.push({
      title: this.state.value,
      done: false
    });
    this.setState({ todos: refTodos, value: "" });
    event.preventDefault();
  };

  renderList() {
    return this.state.todos.map((task, index) => {
      return (
        <Todo
          key={index}
          done={task.done}
          title={task.title}
          toggleOnClick={() => {
            let refTodo = { ...this.state.todos[index] };
            refTodo.done = !refTodo.done;
            let refTodos = [...this.state.todos];
            refTodos[index] = refTodo;
            this.setState({ todos: refTodos });
          }}
          removeOnClick={() => {
            let refTodos = [...this.state.todos];
            refTodos.splice(index, 1);
            this.setState({ todos: refTodos });
          }}
        />
      );
    });
  }

  render() {
    return (
      <div className="App">
        <h1>To-Do list</h1>
        {this.state.todos.length > 0 && (
          <ul className="list"> {this.renderList()}</ul>
        )}

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="tâche, rappel..."
          />
          <button className="submit" type="submit">
            Valider
          </button>
        </form>
      </div>
    );
  }
}

export default App;
