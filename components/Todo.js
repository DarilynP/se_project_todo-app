class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector); // Store the template element reference
  }

  _getTemplate() {
    const template = this._templateElement; // Use the stored template element reference
    //const todoElement = template.content.cloneNode(true); // Clone the template's content
    const todoElement = template.content.querySelector(".todo").cloneNode(true);

    // Select elements within the cloned content
    this._todoCheckboxElement = todoElement.querySelector(".todo__completed");
    this._deleteButtonElement = todoElement.querySelector(
      ".todo__delete-button"
    );

    if (!this._deleteButtonElement) {
      console.error("Delete button not found in cloned template!");
    }

    return todoElement;
  }

  //   _deleteTodo() {
  //     // Assuming `this._todoElement` refers to the entire todo item element
  //     if (this._todoElement && this._todoElement instanceof HTMLElement) {
  //       console.log("Deleting:", this._todoElement);
  //       this._todoElement.remove(); // Remove the todo from the DOM
  //     } else {
  //       console.error("Todo element not found for deletion!");
  //     }
  //   }

  _deleteTodo = () => {
    this._todoElement.remove();
    this._todoElement = null;
  };

  _setEventListeners() {
    // Set up checkbox change handler to toggle completion status
    if (this._todoCheckboxElement) {
      this._todoCheckboxElement.addEventListener("change", () => {
        this._data.completed = !this._data.completed;
        console.log(this._data.completed);
      });
    } else {
      console.error("Checkbox element not found!");
    }

    // Set up delete button handler
    if (this._deleteButtonElement) {
      this._deleteButtonElement.addEventListener("click", () => {
        this._deleteTodo(); // Call delete function when delete button is clicked
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

  getView() {
    this._todoElement = this._getTemplate(); // Get the template and clone it
    if (!this._todoElement) {
      console.error("failed to create todo element");
      return null;
    }
    const todoNameElement = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    const todoDeleteButton = this._todoElement.querySelector(
      ".todo__delete-button"
    );

    todoNameElement.textContent = this._data.name;
    todoDate.textContent = this._data.date; // Assuming you have a date in your data

    this._generateCheckboxElement();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
