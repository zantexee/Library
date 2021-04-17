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

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBook(book) {
  const container = document.getElementById('book-container');

  const bookDiv = document.createElement('div');
  bookDiv.classList = 'book';

  // Create title and author element
  const titleElement = document.createElement('h1');
  const authorElement = document.createElement('h6');

  const title = document.createTextNode(book.title);
  const author = document.createTextNode(book.author);

  titleElement.appendChild(title);
  authorElement.appendChild(author);

  // Add the title and author element to the new book element
  bookDiv.appendChild(titleElement);
  bookDiv.appendChild(authorElement);

  // Add the new book element to the container
  container.appendChild(bookDiv);
}

function displayNewForm() {
  const container = document.getElementsByClassName('form')[0];

  if (formIsDisplaying) {
    formIsDisplaying = false;
    return container.removeChild(container.lastElementChild);
  }

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

  const readDiv = document.createElement('div');
  readDiv.appendChild(document.createTextNode('Read'));

  const readInput = document.createElement('input');
  readInput.type = 'checkbox';
  readInput.defaultChecked = false;

  readDiv.appendChild(readInput);

  formElement.appendChild(titleInput);
  formElement.appendChild(authorInput);
  formElement.appendChild(pagesInput);
  formElement.appendChild(readDiv);

  container.appendChild(formElement);
  formIsDisplaying = true;
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary(theHobbit);

(function initialDisplay(booksArr) {
  booksArr.forEach((book) => displayBook(book));
})(myLibrary);
