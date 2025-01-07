class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._submitButtonSelector = config.submitButtonSelector;
  }

  // Check the validity of each input field and show or clear error messages
  _checkInputValidity(inputElement) {
    const errorMessage = inputElement.validationMessage;
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (inputElement.validity.valid) {
      errorElement.textContent = ""; // Clear error
      errorElement.classList.remove(this._config.errorClass);
    } else {
      errorElement.textContent = errorMessage; // Show error message
      errorElement.classList.add(this._config.errorClass);
    }
  }

  // Enable or disable the submit button based on form validity
  _toggleButtonState(inputList) {
    const isFormValid = inputList.every(
      (inputElement) => inputElement.validity.valid
    );
    if (isFormValid) {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    }
  }

  // Add event listeners to input fields for validation and button state toggling
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    if (inputList.length === 0) {
      console.error("No inputs found with the provided selector.");
      return;
    }

    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    this._toggleButtonState(inputList);

    // Add 'input' event listener to each input field
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement); // Check validity of the input
        this._toggleButtonState(inputList); // Toggle submit button state
      });
    });
  }

  // Reset validation state (clear errors and disable the submit button)
  _resetValidation() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-error`
      );
      errorElement.textContent = ""; // Clear error messages
    });
    this._formElement.reset();
    this._toggleButtonState(inputList); // disables the button if the inputs are empty
  }

  // Initialize validation by adding the necessary event listeners
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._resetValidation(); // Reset form validation on submit
    });

    this._setEventListeners(); // Set up event listeners for inputs
  }
}

export default FormValidator;
