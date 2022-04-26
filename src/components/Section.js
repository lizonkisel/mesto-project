class Section {
  constructor({renderer}, containerSelector) {
    this.renderer = renderer,
    this._container = document.querySelector(containerSelector);
  }

  addItem(item, insertMethod = 'append') {
    if (insertMethod === 'append') {
      this._container.append(item);
    } else {
      this._container.prepend(item);
    }
  }

  renderItems(cards) {
    cards.forEach((item) => {
      // this.addItem(item);
      this.renderer(item);
    })
  }
};

export {Section};
