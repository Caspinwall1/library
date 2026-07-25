const mylibrary = [];

function Book(title, author, pages, hasRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}
  Book.prototype.toggleRead = function () {
  this.hasRead = !this.hasRead;
};

function addBookToLibrary(title, author, pages, hasRead) {
  const book = new Book(
    title,
    author,
    pages,
    hasRead
  );
  mylibrary.push(book)
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Dune", "Frank Herbert", 412, false);
console.log(typeof document);
console.log(mylibrary);
function displayBooks() {
  const container = document.getElementById("library-container");

  // Clear previous display
  container.innerHTML = "";

  mylibrary.forEach((book) => {
    const card = document.createElement("div");

    card.innerHTML = `
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.hasRead ? "Yes" : "No"}</p>
        <button class="read-btn">Toggle Read</button>
      <button class="remove-btn">Remove</button>
      `;
      const readBtn = card.querySelector(".read-btn");
      readBtn.addEventListener("click", () => {
        book.toggleRead();
       displayBooks();
      });
      const removeBtn = card.querySelector(".remove-btn");
      removeBtn.addEventListener("click", () => {
      removeBook(book.id);
      });

    container.appendChild(card);
  });
}

displayBooks();

const newBookBtn = document.getElementById("new-book-btn");
const bookForm = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => {
  if (bookForm.style.display === "none") {
    bookForm.style.display = "block";
  } else {
    bookForm.style.display = "none";
  }
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const hasRead = document.getElementById("hasRead").checked;

  addBookToLibrary(
    title,
    author,
    pages,
    hasRead
  );

  displayBooks();

  bookForm.reset();
});


function removeBook(id) {
  const index = mylibrary.findIndex(
    book => book.id === id
  );

  if (index !== -1) {
    mylibrary.splice(index, 1);
  }

  displayBooks();
}
