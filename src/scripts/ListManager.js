class InfoItem {
  constructor (number) {
    this.number = number;
    this.url = "";
    this.text = "";
  }
}

class InfoList {
  constructor() {
    this.counter = 0;
  }

  addItem(list) {
    const item = new InfoItem(this.counter++);
    item.close = this.deleteItem.bind(this, list, item);
    list.push(item);
  }

  deleteItem(list, deleteItem) {
    const index = list.indexOf(deleteItem);
    if (index === -1) { return };
    list.splice(index, 1);
  }
}

export default InfoList;