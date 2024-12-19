class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = Array.isArray(items) ? items : []; // Ensure `items` is always an array
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Renders all items in the container by calling the renderer function
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Adds a new item to the internal array and appends it to the container
  addItem(item) {
    // const element = this._renderer(item); // Renderer returns the DOM element
    this._container.append(item); // Append the DOM element
  }
}

export default Section;
