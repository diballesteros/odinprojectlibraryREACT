import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

let myLibrary = [];

function Book(name, description, pages, author, read) {
    this.name = name;
    this.description = description;
    this.pages = pages;
    this.author = author;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

function addBookToLibrary() {
    const newName = document.getElementById("new-book-name");
    const newAuthor = document.getElementById("new-book-author");
    const newPages = document.getElementById("new-book-pages");
    const newDescription = document.getElementById("new-book-description");

    if (!newName.validity.valueMissing && !newAuthor.validity.valueMissing && !newPages.validity.valueMissing) {
        const newBook = new Book(newName.value, newDescription.value, newPages.value, newAuthor.value);

        myLibrary.push(newBook);
    
        render(myLibrary);
    }
}

function removeBookFromLibrary() {
    const index = this.getAttribute('libraryindex');

    myLibrary.splice(index, 1);
    render(myLibrary);
}

function changeReadStatus() {
    const index = this.getAttribute('libraryindex');

    myLibrary[index].toggleRead();
    render(myLibrary);
}

function showForm() {
    document.getElementById("new-book-form").classList.add("form-display");
}

function cancelForm() {
    document.getElementById("new-book-form").classList.remove("form-display");
}

function createRemoveBookListener() {
    for (var i = 0; i < myLibrary.length; i++) {
        document.getElementById("remove-book-" + i).addEventListener("click", removeBookFromLibrary);
    }
}

function createReadBookListener() {
    for (var i = 0; i < myLibrary.length; i++) {
        document.getElementById("read-book-" + i).addEventListener("click", changeReadStatus);
    }
}

function render(library) {
    var libraryTable = "<table border='1'><tr>";

    for (var i = 0; i < library.length; i++) {

        var read = library[i].read ? "read" : "notread";

        libraryTable += "<td>" + library[i].name + "</td>"
            + "<td>" + library[i].description + "</td>"
            + "<td>" + library[i].author + "</td>"
            + "<td><button type='button' id='remove-book-" + i + "' libraryindex='" + i + "'>X</button></td>"
            + "<td id='read-book-" + i + "' libraryindex='" + i + "' class='" + read + "'>Read</td>";

        var next = i + 1;

        if (next != library.length) {
            libraryTable += "</tr><tr>";
        }
    }
    libraryTable += "</tr></table>"

    document.getElementById("container").innerHTML = libraryTable;

    createRemoveBookListener();
    createReadBookListener();
}

function init() {

    const bookA = new Book("First", "First Description", 10, "Bill", true);
    const bookB = new Book("Second", "Second Description", 10, "Bob", false);
    const bookC = new Book("Third", "Third Description", 10, "Burger", false);

    myLibrary.push(bookA, bookB, bookC);

    render(myLibrary);

    document.getElementById("show-form").addEventListener("click", showForm);

    document.getElementById("cancel-form").addEventListener("click", cancelForm);

    document.getElementById("add-book").addEventListener("click", addBookToLibrary);
}

class Library extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render () {
        return (
            <div>Test
            </div>
        );
    }
}

ReactDOM.render(
    <Library />,
    document.getElementById('root')
);
