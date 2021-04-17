let myLibrary = [];

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

  let bookDiv = document.createElement('div');
  bookDiv.classList = 'book';

  // Create title and author element
  let titleElement = document.createElement('h1');
  let authorElement = document.createElement('h6');

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

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary(theHobbit);

(function initialDisplay(booksArr) {
  booksArr.forEach((book) => displayBook(book));
})(myLibrary);
