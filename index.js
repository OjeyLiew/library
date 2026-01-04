let myLibrary = [];

function Book(bookId, title, author, pages, read) {
    this.bookId = bookId;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const bookId = crypto.randomUUID();
    const newBook = new Book(bookId, title, author, pages, read);
    myLibrary.push(newBook);
}

let tableBody = document.querySelector("tbody");

function delBook(bookId) {
    myLibrary = myLibrary.filter(b => b.bookId !== bookId);
    for (const child of tableBody.childNodes) {
        if (child.dataset.bookid === bookId) {
            child.remove();
            break;
        }
    }
}

function printBook(book) {
    const tableRow = document.createElement("tr");
    tableRow.setAttribute("data-bookid", book.bookId);
    for (const k of Object.keys(book)) {
        const cell = document.createElement("td");
        cell.textContent = book[k];
        tableRow.appendChild(cell);
    }
    const cell = document.createElement("td");
    const delButton = document.createElement("button");
    delButton.textContent = "Delete";
    cell.appendChild(delButton);
    delButton.addEventListener("click", (event) => {
        delBook(book.bookId);
    })

    const anotherCell = document.createElement("td");
    const readButton = document.createElement("button");
    readButton.textContent = "Toggle Read";
    readButton.addEventListener("click", (event) => {
        let newRead = false;
        myLibrary = myLibrary.map(b => {
            if (b.bookId === book.bookId) {
                b.read = !b.read;
                newRead = b.read;
            }
            return b;
        })
        for (const child of tableBody.childNodes) {
            console.log(child);
            if (child.dataset.bookid === book.bookId) {
                child.childNodes[4].textContent = newRead;
                break;
            }
        }
    })
    anotherCell.appendChild(readButton);
    tableRow.appendChild(cell);
    tableRow.appendChild(anotherCell);
    tableBody.appendChild(tableRow);
}

function printLibrary() {
    const newBody = document.createElement("tbody");
    tableBody.parentNode.replaceChild(newBody, tableBody);
    tableBody = newBody;
    for (const book of myLibrary) {
        printBook(book);
    }
}



const dialog = document.querySelector("dialog");
const addButton = document.querySelector(".add");
const closeButton = document.querySelector(".close");
const form = document.querySelector("form");

addButton.addEventListener("click", (event) => {
    dialog.showModal();
})

closeButton.addEventListener("click", () => {
    dialog.close();
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = event.target[0].value;
    const author = event.target[1].value;
    const pages = event.target[2].value;
    const read = event.target[3].checked;
    addBookToLibrary(title, author, pages, read);
    printLibrary();
})

addBookToLibrary("It", "Stephen Kings", 256, true);
addBookToLibrary("Computer Systems", "Kings", 608, true);
printLibrary();