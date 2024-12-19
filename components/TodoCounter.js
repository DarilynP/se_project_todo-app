class TodoCounter {
  // todos: Initial list of todos as an array
  // selector: Selector for the counter text element
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._total = todos.length; // Total number of todos
    this._completedTodos = todos.filter((todo) => todo.completed).length; // Count completed todos
    this._updateText(); // Initialize the text
  }

  // Update completed todos count
  updateCompleted = (increment) => {
    if (increment) {
      this._completedTodos += 1;
    } else {
      this._completedTodos -= 1;
    }
    this._updateText();
  };

  // Update total todos count
  updateTotal = (increment) => {
    if (increment) {
      this._total += 1;
    } else {
      this._total -= 1;
    }
    this._updateText();
  };

  // Update the counter text
  _updateText() {
    this._element.textContent = `Showing ${this._completedTodos} out of ${this._total} completed`;
  }
}

export default TodoCounter;
