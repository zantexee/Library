let myLibrary = [];

let formIsDisplaying = false;

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
  return (this.read = !this.read);
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBook(index) {
  const container = document.getElementById('book-container');

  container.removeChild(container.childNodes[index]);
}

function displayBook(book) {
  const container = document.getElementById('book-container');

  // Set dataset attribute index to help with removing books.

  const bookDiv = document.createElement('div');
  bookDiv.classList = 'book';
  bookDiv.dataset.index = container.children.length - 1;

  // Create title and author element
  const titleElement = document.createElement('h1');
  const authorElement = document.createElement('h6');

  const title = document.createTextNode(book.title);
  const author = document.createTextNode(book.author);

  titleElement.appendChild(title);
  authorElement.appendChild(author);

  // Create the remove button element
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove Book';
  removeButton.addEventListener('click', () => removeBook(container.children.length - 1));

  const readButton = document.createElement('button');
  readButton.textContent = 'Read';
  readButton.addEventListener('click', () => book.markRead());

  bookDiv.appendChild(titleElement);
  bookDiv.appendChild(authorElement);
  bookDiv.appendChild(removeButton);
  bookDiv.appendChild(readButton);

  // Add the new book element to the container
  container.appendChild(bookDiv);
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

  const authorInput = document.createElement('input');
  authorInput.type = 'text';
  authorInput.placeholder = 'Author';

  const pagesInput = document.createElement('input');
  pagesInput.type = 'number';
  pagesInput.placeholder = 'Pages';

  //  Creates div for checkbox
  const readDiv = document.createElement('div');
  readDiv.appendChild(document.createTextNode('Read'));

  const readInput = document.createElement('input');
  readInput.type = 'checkbox';
  readInput.defaultChecked = false;

  readDiv.appendChild(readInput);

  //  Add everything to the form element
  formElement.appendChild(titleInput);
  formElement.appendChild(authorInput);
  formElement.appendChild(pagesInput);
  formElement.appendChild(readDiv);

  // Add the form element to the container
  container.appendChild(formElement);
  formIsDisplaying = true;
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary(theHobbit);

(function initialDisplay(booksArr) {
  booksArr.forEach((book) => displayBook(book));
})(myLibrary);
