import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayForm: false,
            books: [
                {
                    name: 'first',
                    description: 'description',
                    pages: 10,
                    author: 'Bill',
                    read: false,
                },
                {   
                    name: 'second',
                    description: 'description',
                    pages: 10,
                    author: 'Bob',
                    read: false
                },
                {
                    name: 'third',
                    description: 'description',
                    pages: 10,
                    author: 'Ben',
                    read: false
                },
            ]
        }
    }

    addBook(name, author, pages, description) {
        const modifiedLibrary = this.state.books.slice();
        modifiedLibrary.push({
            name: name,
            description: description,
            pages: pages,
            author: author,
            read: false
        })
        this.setState({
            displayForm: false,
            books: modifiedLibrary
        });
    };

    removeBook(i) {
        const modifiedLibrary = this.state.books.slice();
        modifiedLibrary.splice(i, 1);
        this.setState({
            books: modifiedLibrary
        });
    };

    changeRead(i) {
        const modifiedLibrary = this.state.books.slice();
        modifiedLibrary[i].read = !modifiedLibrary[i].read;
        this.setState({
            books: modifiedLibrary
        });
    };

    toggleForm() {
        this.setState({
            displayForm: !this.state.displayForm
        });
    };

    render() {
        return (
            <div id="container" className="container">
                <Library 
                books={this.state.books}
                removeBook={i => this.removeBook(i)}
                changeRead={i => this.changeRead(i)}/>
                <button id="show-form" 
                        className="new-book-button"
                        onClick={() => this.toggleForm()}>ADD BOOK
                </button>
                <Form 
                displayForm={this.state.displayForm}
                addBook={(name, author, pages, desc) => this.addBook(name, author, pages, desc)}
                cancelBookForm={() => this.toggleForm()}/>
            </div>
        );
    }
}

function Library (props) {
    return (props.books.map((book, index) => {
            return <Book 
                    key={book.name}
                    name={book.name}
                    description={book.description}
                    author={book.author}
                    read={book.read}
                    removeBook={() => props.removeBook(index)}
                    changeRead={() => props.changeRead(index)}/>    
                })
    );
}

function Book (props) {
    return (
        <div className="book">
            <span className="book__name">{props.name}</span>
            <span className="book__desc">{props.description}</span>
            <span className="book__author">{props.author}</span>
            <span 
            className={`book__read ${props.read? 'read' : 'notread'}`}
            onClick={props.changeRead}>READ
            </span>
            <button className="book__remove" onClick={props.removeBook}>REMOVE</button>
        </div>
    );
};

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            author: '',
            pages: 0,
            description: ''
        }
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    };

    handleAuthorChange(event) {
        this.setState({author: event.target.value});
    };

    handlePageChange(event) {
        this.setState({pages: event.target.value});
    };

    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
    };

    handleSubmit(event) {
        this.props.addBook(this.state.name, this.state.author, this.state.pages, this.state.description);
        this.setState({
            name: '',
            author: '',
            pages: 0,
            description: ''
        });
        event.preventDefault();
    }

    render() {
        if (!this.props.displayForm) {
            return null;
        }
        return (
            <form id="new-book-form" 
            onSubmit={(i) => this.handleSubmit(i)}>
                <label htmlFor="new-book-name">Name: (*)</label>
                <input type="text" id="new-book-name" placeholder="Please enter the book's name..." 
                value={this.state.name}
                onChange={(i) => this.handleNameChange(i)}/>
                <label htmlFor="new-book-author">Author: (*)</label>
                <input type="text" id="new-book-author" placeholder="Please enter the book's author..." 
                value={this.state.author}
                onChange={(i) => this.handleAuthorChange(i)}/>
                <label htmlFor="new-book-pages">Pages: (*)</label>
                <input type="number" id="new-book-pages" placeholder="Please enter how many pages the book has..." 
                value={this.state.pages}
                onChange={(i) => this.handlePageChange(i)}/>
                <label htmlFor="new-book-description">Description:</label>
                <textarea id="new-book-description" placeholder="Please enter a description of the book..."
                value={this.state.description}
                onChange={(i) => this.handleDescriptionChange(i)}>
                </textarea>
                <div>
                    <button type="submit" form="new-book-form" id="add-book">Add
                    </button>
                    <button type="button" id="cancel-form"
                    onClick={this.props.cancelBookForm}>Cancel</button>
                </div>
            </form>
        );
    }
}

ReactDOM.render(
    <Container />,
    document.getElementById('root')
);
