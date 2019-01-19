"use strict";

class ShoppingListItem {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.isDone = false;
  }

  check() {
    return (this.isDone = true);
  }

  uncheck() {
    return (this.isDone = false);
  }

  render(idx) {
    if (this.isDone === true) {
      return `<li class="completed_${this.isDone}"><div clas="listItem"><input class="check" type="checkbox" onchange="changeCheckedStatus(${idx}, this)" checked/><span class="itemName completed">${this.name}</span><span class="description completed">${this.description}</span></div> <button class="close" onclick="removeItemButtonClicked(${idx})">x</button></li>`;
    } else {
      return `<li class="completed_${this.isDone}"><div class="listItem"><input class="check" type="checkbox" onchange="changeCheckedStatus(${idx}, this)"><span class="itemName">${this.name}:</span><span class="description">${this.description}</span></div> <button class="close" onclick="removeItemButtonClicked(${idx})">x</button></li>`;
    }
  }

}

// module.exports = { ShoppingListItem };
