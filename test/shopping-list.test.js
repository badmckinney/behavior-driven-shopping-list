const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const item = require('../js/shopping-list-item.js');
const list = require('../js/shopping-list.js');

let ShoppingListItem = item.ShoppingListItem;
let ShoppingList = list.ShoppingList;

describe('ShoppingListItem', () => {
  const ShoppingItem = new ShoppingListItem();

  it('should be a class', () => {
    expect(ShoppingListItem).to.be.a('function');
  });

  it('should be an instance of ShoppingListItem class', () => {
    expect(ShoppingItem instanceof ShoppingListItem).to.be.true;
  });

  describe('Item Name', () => {
    let soup = new ShoppingListItem('name');

    it('should have a name property', () => {
      expect(soup).to.have.own.property(name);
      expect(soup.name).to.equal('name');
    });

    it('should be a string', () => {
      expect(soup.name).to.be.a('string');
    });
  });

  describe('Item Description', () => {
    let soup = new ShoppingListItem("Cambell's", 'Tomato Soup');

    it('should have a description property', () => {
      expect(soup).to.have.own.property(description);
      expect(soup.description).to.equal('Tomato Soup');
    });

    it('should be a string', () => {
      expect(soup.description).to.be.a('string');
    });
  });

  describe('isDone property', () => {
    let soup = new ShoppingListItem("Cambell's", 'Tomato Soup');

    it('should be a property of ShoppingListItem class', () => {
      expect(soup).to.have.own.property('isDone');
    });

    it('should be set to false by default', () => {
      expect(soup.isDone).to.equal(false);
    });

    it('should be a boolean', () => {
      expect(soup.isDone).to.be.a('boolean');
    });
  });

  it('should have a constructor method that accepts 2 arguments, name & description', () => {
    let soup = new ShoppingListItem("Campbell's", 'Tomato Soup');
    expect(soup.name === "Campbell's" && soup.description === 'Tomato Soup').to.be.true;

    it('should throw an error if instantiated without either name or description', () => {
      expect(new ShoppingListItem().to.throw('Please provide a name and description'));
    });
  });

  describe('item check method', () => {
    let soup = new ShoppingListItem("Campbell's", 'Tomato Soup');

    it('should be a method on the ShoppingListItem class', () => {
      expect(soup.check).to.exist;
    });

    it('should be a function', () => {
      expect(soup.check).to.be.a('function');
    });

    it('should set the isDone property to true when calling the instances check method', () => {
      soup.check();
      expect(soup.isDone).to.be.true;
    });
  });

  describe('item uncheck method', () => {
    let soup = new ShoppingListItem("Campbell's", 'Tomato Soup');

    it('should be a method on the ShoppingListItem class', () => {
      expect(soup.uncheck).to.exist;
    });

    it('should be a function', () => {
      expect(soup.uncheck).to.be.a('function');
    });

    it('should set the isDone property to false when calling the insances uncheck method', () => {
      soup.check();
      soup.uncheck();
      expect(soup.isDone).to.be.false;
    });
  });

  describe('Render method', () => {
    let soup = new ShoppingListItem("Campbell's", 'Tomato Soup');
    let rendered = soup.render();

    it('should return an html formatted string', () => {
      expect(rendered).to.be.a('string');
    });

    it('should be a function', () => {
      expect(soup.render).to.be.a('function');
    });

    it('string content should be wrapped in <li> tags', () => {
      let beginningTag = rendered.slice(0, 3);
      let endTag = rendered.slice(rendered.length - 3);
      expect(`${beginningTag}${endTag}`).to.equal('<lili>');
    });
  });
});

describe('ShoppingList', () => {
  const groceries = new ShoppingList();

  it('should be a function', () => {
    expect(ShoppingList).to.be.a('function');
  });

  it('should be an instance of ShoppingList class', () => {
    expect(groceries instanceof ShoppingList).to.be.true;
  });

  describe('Items', () => {
    let groceries = new ShoppingList();

    it('should have an items property', () => {
      expect(groceries).to.have.own.property('items');
    });

    it('should be an array', () => {
      expect(Array.isArray(groceries.items)).to.be.true;
    });

    it('should have a constructor method that initializes items as an empty Array', () => {
      expect(groceries.items).to.deep.equal([]);
    });
  });

  describe('addItem method', () => {
    it('should have a method named addItem that accepts a single ShoppingListItem argument', () => {
      let soup = new ShoppingListItem('campell', 'chicken noodle');
      let groceries = new ShoppingList();
      groceries.addItem(soup);

      expect(groceries.addItem).to.be.a('function');
      expect(groceries.items).to.deep.equal([soup]);
    });

    it('should throw an error if anything other than a ShoppingListItem is passed to the method', () => {
      let groceries = new ShoppingList();

      expect(groceries.items).to.deep.equal([]);
      expect(groceries.addItem.bind('groceries', 'cake')).to.throw(
        'invalid item'
      );
    });
  });

  describe('removeItem method', () => {
    it(' should have a method named removeItem that accepts a single ShoppingListItem arguement', () => {
      expect(groceries.removeItem).to.be.a('function');
    });

    it('should remove an item from ShoppingListItem', () => {
      let soup = new ShoppingListItem('campbells', 'chicken noodle');
      let groceries = new ShoppingList();
      groceries.addItem(soup);
      groceries.removeItem(soup);
      expect(groceries.items).to.deep.equal([]);
    });

    it('should remove the last item in the items list, if there are any items, else it does nothing when removeItems is invoked', () => {
      let soup = new ShoppingListItem('campbells', 'chicken noodle');
      let groceries = new ShoppingList();
      groceries.addItem(soup);
      groceries.removeItem();
      expect(groceries.items).to.deep.equal([]);
    });

    it('should only remove the last item in the array when removeItem is invoked without a parameter', () => {
      let soup = new ShoppingListItem('campbells', 'chicken noodle');
      let chips = new ShoppingListItem('campbells', 'chicken noodle');
      let groceries = new ShoppingList();
      groceries.addItem(soup);
      groceries.addItem(chips);
      groceries.removeItem();
      expect(groceries.items).to.deep.equal([soup]);
    });

    it('should throw an error if anything other than a ShoppingListItem is passed to the method', () => {
      let groceries = new ShoppingList();

      expect(groceries.removeItem.bind('groceries', 'cupcakes')).to.throw(
        'that item is not on your list'
      );
    });
  });

  describe('render method', () => {
    let groceries = new ShoppingList();
    let soup = new ShoppingListItem('Campbells', 'Tomato Soup');
    let chips = new ShoppingListItem('Lays', 'Salt & Vinegar');
    let salad = new ShoppingListItem('Fresh Greens', 'Caesar');

    it('should be a function', () => {
      expect(groceries.render).to.exist;
      expect(groceries.render).to.be.a('function');
    });

    it('should return an HTML formatted string containing the result of calling the render method on each item in the items array', () => {
      groceries.addItem(soup);
      groceries.addItem(chips);
      groceries.addItem(salad);
      let str = groceries.render();

      expect(str).to.equal(
        `<ul id="list"><li class="completed_false"><div class="listItem"><input class="check" type="checkbox" onchange="changeCheckedStatus(0, this)"><span class="itemName">Campbells:</span><span class="description">Tomato Soup</span></div> <button class="close" onclick="removeItemButtonClicked(0)">x</button></li><li class="completed_false"><div class="listItem"><input class="check" type="checkbox" onchange="changeCheckedStatus(1, this)"><span class="itemName">Lays:</span><span class="description">Salt & Vinegar</span></div> <button class="close" onclick="removeItemButtonClicked(1)">x</button></li><li class="completed_false"><div class="listItem"><input class="check" type="checkbox" onchange="changeCheckedStatus(2, this)"><span class="itemName">Fresh Greens:</span><span class="description">Caesar</span></div> <button class="close" onclick="removeItemButtonClicked(2)">x</button></li></ul>`
      );
    });
  });
});
