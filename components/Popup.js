class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close"); // Select close button
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  _handleEscapeClose(evt) {
    console.log("Key was pressed");
    if (evt.key === "Escape") {
      this.close(); // Call the close method when 'Escape' is pressed
    }
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose); // Add 'keyup' listener
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    console.log("Close method called");
    document.removeEventListener("keyup", this._handleEscapeClose); // Remove the listener
  }

  setEventListeners() {
    // Handle the close button click and outside modal click
    this._popupCloseBtn.addEventListener("click", () => {
      console.log(this._popupCloseBtn);
      this.close(); // Close when the close button is clicked
    });

    this._popupElement.addEventListener("mousedown", (evt) => {
      console.log(evt.target.classList);

      // Close modal if clicked on overlay (popup) or the close button
      if (evt.target.classList.contains("popup")
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
