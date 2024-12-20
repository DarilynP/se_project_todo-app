class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector); // Store the template element reference
    this._date = data.date;
    this._selector = selector.id;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _getTemplate() {
    return (this._template = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true));
  }

  _deleteTodo = () => {
    this._todoElement.remove();
    this._todoElement = null;
  };

  _setEventListeners() {
    // Set up checkbox change handler to toggle completion status
    if (this._todoCheckboxElement) {
      this._todoCheckboxElement.addEventListener("change", () => {
        this._data.completed = !this._data.completed;
        this._handleCheck(this._data.completed); // Handle the updated completion state
        console.log(this._data.completed); // Log completion state
      });
    } else {
      console.error("Checkbox element not found!");
    }

    // Set up delete button handler
    if (this.deleteButtonElement) {
      this.deleteButtonElement.addEventListener("click", () => {
        this._handleDelete(this._data.completed);
        this._deleteTodo(); // Remove the todo item from the DOM
      });
    } else {
      console.error("Delete button element not found!");
    }
  }

  _generateCheckboxElement() {
    this._todoCheckboxElement =
      this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxElement.checked = this._data.completed;
    this._todoCheckboxElement.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  toggleCompleted = () => {
    this._completed = !this._completed;
  };

  remove = () => {
    if (this._todoElement) {
      this._todoElement.remove();
      // Help garbage collection
      this._todoElement = null;
    }
  };

  _generateDateElement() {
    this._dateElement = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._date);

    if (!isNaN(dueDate)) {
      const dueDate = new Date(this._date);
      if (!isNaN(dueDate)) {
        this._dateElement.textContent = `Due: ${dueDate.toLocaleString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        )}`;
      }
    } else {
      this._dateElement.textContent = ""; // Clear the date field if no date is provided
    }
  }

  getView() {
    this._todoElement = this._getTemplate(); // Get the template and clone it
    if (!this._todoElement) {
      console.error("failed to create todo element");
      return null;
    }
    const todoNameElement = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    // Select elements within the cloned content

    this.deleteButtonElement = this._todoElement.querySelector(
      ".todo__delete-button"
    );

    todoNameElement.textContent = this._data.name;
    todoDate.textContent = this._data.date; // Assuming you have a date in your data

    this._generateCheckboxElement();
    this._generateDateElement();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
