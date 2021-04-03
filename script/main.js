let myLibrary = [];

function Book(title, author, numberOfPages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = numberOfPages;
    this.read = hasRead;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
        this.read ? "already read" : "not read yet"
    }`;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
}

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

addBookToLibrary(theHobbit);
