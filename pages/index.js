import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupElement = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupElement.querySelector(".popup__form");
const addTodoCloseButton = addTodoPopupElement.querySelector(".popup__close");

// const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const renderTodo = (data) => {
  const todo = generateTodo(data); // Generate the todo
  section.addItem(todo); // Add the todo to the section
};

// The logic for generating a todo remains the same
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

// render initial todos
section.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (input) => {
    // Extract name and date from the input object
    const name = input.name;
    const dateInput = input.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };

    renderTodo(values);
    todoCounter.updateTotal(true);

    addTodoPopup.close();
    addTodoPopup.resetForm();
  },
});

addTodoPopup.setEventListeners();

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
  console.log(completed);
}

function handleDelete(completed) {
  todoCounter.updateTotal(false);
  // decrement total count
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

// function handleEscapeClose(evt) {
//   if (evt.key === "Escape") {
//     const openModal = document.querySelector(".popup_visible");
//     if (openModal) {
//       closeModal(openModal);
//       document.removeEventListener("keyup", handleEscapeClose);
//     }
//   }
// }

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
  document.addEventListener("keyup", handleEscapeClose);
});

// addTodoCloseButton.addEventListener("click", () => {
//   addTodoPopup.close();
// });

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();

//   const newTodo = { name, date, id };
//   const todoElement = generateTodo(newTodo);
//   todosList.append(todoElement); // use add itme method instead
//   closeModal(addTodoPopupElement);
// });

const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();
