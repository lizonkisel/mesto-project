class Section {
  constructor({renderer}, containerSelector) {
    this.renderer = renderer,
    this.container = document.querySelector(containerSelector);
  }

  addItem(item, insertMethod = 'append') {
    if (insertMethod === 'append') {
      this.container.append(item);
    } else {
      this.container.prepend(item);
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
