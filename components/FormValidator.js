class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _checkInputValidity(inputElement) {
    const errorMessage = inputElement.validationMessage;
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (inputElement.validity.valid) {
      errorElement.textContent = ""; // Clear error
    } else {
      errorElement.textContent = errorMessage; // Show error message
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    if (inputList.length === 0) {
      console.error("No inputs found with the provided selector.");
      return;
    }

    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    const isFormValid = inputList.every(
      (inputElement) => inputElement.validity.valid
    );
    if (isFormValid) {
      buttonElement.removeAttribute("disabled");
    } else {
      buttonElement.setAttribute("disabled", "true");
    }
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formElement);
  }
}

export default FormValidator;
