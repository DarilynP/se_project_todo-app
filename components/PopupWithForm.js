import Popup from "../components/Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  getInputValues() {
    // Gets values of all input fields
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    const values = {};

    this._inputList.forEach((input) => {
      values[input.name] = input.value; // Store input field values in a values object
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    // Handle form submission
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this.getInputValues();

      this._handleFormSubmit(inputValues); // Pass input values to form submit handler
      this.close(); // Close the modal after submission
    });
  }

  close() {
    // Clear input fields before closing, if desired
    super.close(); // Calls close on parent class (Popup) that hides the modal
  }

  resetForm() {
    this._popupForm.reset(); // Clear form inputs when closing the modal
  }
}

export default PopupWithForm;
