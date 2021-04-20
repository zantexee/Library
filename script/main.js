//Book class
function Book(title, author, numberOfPages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = numberOfPages;
  this.read = hasRead;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? 'already read' : 'not read yet'
  }`;
};

Book.prototype.markRead = function () {
  this.read = !this.read;
  return saveToLocal();
};

let myLibrary = [];

let formIsDisplaying = false;

function getFromLocal() {
  const arr = JSON.parse(localStorage.getItem('books'));
  arr.forEach((book) => {
    const tempBook = new Book(book.title, book.author, book.pages, book.read);
    myLibrary.push(tempBook);
  });
}

function saveToLocal() {
  localStorage.setItem('books', JSON.stringify(myLibrary));
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBook(book) {
  const container = document.getElementById('book-container');
  const index = book.dataset.index;

  const element = document.querySelector(`[data-index~="${index}"]`);
  element.remove();

  myLibrary.splice(index, 1);
  saveToLocal();
}

function displayBook(book) {
  const container = document.getElementById('book-container');

  // Set dataset attribute index to help with removing books.

  const bookDiv = document.createElement('div');
  bookDiv.classList = 'book';
  bookDiv.dataset.index = container.children.length;

  // Create title and author element
  const titleElement = document.createElement('h1');
  const authorElement = document.createElement('h6');

  const title = document.createTextNode(book.title);
  const author = document.createTextNode(book.author);

  titleElement.appendChild(title);
  authorElement.appendChild(author);

  const hrElem = document.createElement('hr');

  // Create the remove button element
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove Book';
  removeButton.classList = 'btn';
  removeButton.addEventListener('click', () => removeBook(bookDiv));

  const readButton = document.createElement('button');
  readButton.textContent = book.read ? 'Read' : 'Not Read';
  readButton.classList = 'btn';
  readButton.addEventListener('click', () => {
    book.markRead();
    readButton.textContent = book.read ? 'Read' : 'Not Read';
  });

  const buttonDiv = document.createElement('div');
  buttonDiv.appendChild(removeButton);
  buttonDiv.appendChild(readButton);
  buttonDiv.classList = 'btn-div flex ';

  bookDiv.appendChild(titleElement);
  bookDiv.appendChild(authorElement);
  bookDiv.appendChild(hrElem);
  bookDiv.appendChild(buttonDiv);

  // Add the new book element to the container
  container.appendChild(bookDiv);

  saveToLocal();
}

function displayNewForm() {
  const container = document.getElementsByClassName('form')[0];

  //  Checks if form is already displaying.
  if (formIsDisplaying) {
    formIsDisplaying = false;
    return container.removeChild(container.lastElementChild);
  }

  //  Creates the form element
  const formElement = document.createElement('form');

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = 'Title';
  titleInput.required = true;

  const authorInput = document.createElement('input');
  authorInput.type = 'text';
  authorInput.placeholder = 'Author';
  authorInput.required = true;

  const pagesInput = document.createElement('input');
  pagesInput.type = 'number';
  pagesInput.placeholder = 'Pages';
  pagesInput.required = true;

  //  Creates div for checkbox
  const readDiv = document.createElement('div');
  readDiv.appendChild(document.createTextNode('Read'));

  const readInput = document.createElement('input');
  readInput.type = 'checkbox';
  readInput.defaultChecked = false;

  readDiv.appendChild(readInput);
  readDiv.classList = 'flex read-input';

  const submitButton = document.createElement('button');
  submitButton.textContent = 'ADD BOOK';
  submitButton.type = 'submit';
  submitButton.classList = 'btn';

  //  Add everything to the form element
  formElement.appendChild(titleInput);
  formElement.appendChild(authorInput);
  formElement.appendChild(pagesInput);
  formElement.appendChild(readDiv);
  formElement.appendChild(submitButton);

  formElement.addEventListener('submit', (e) => {
    const book = new Book(
      e.target[0].value,
      e.target[1].value,
      e.target[2].value,
      e.target[3].checked,
    );

    addBookToLibrary(book);
    displayBook(book);
    displayNewForm();

    e.preventDefault();
  });

  // Add the form element to the container
  container.appendChild(formElement);
  formIsDisplaying = true;
}

// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
// addBookToLibrary(theHobbit);

// const meow = new Book('The meowry', 'J.R.R. Meowr', 245, false);
// addBookToLibrary(meow);

getFromLocal();

(function initialDisplay(booksArr) {
  booksArr.forEach((book) => displayBook(book));
})(myLibrary);
