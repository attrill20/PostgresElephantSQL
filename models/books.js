import { pool } from "../db/index.js";

export async function getBooks() {
  // Query the database and return all books
  const query = 'SELECT * FROM books'
  const result = await pool.query(query)
  console.table(result.rows)
  return result.rows
}

export async function searchBooksByTitle(searchTerm) {
  // Query the database and return all books that have a matching title matching the searchTerm
  const value = [searchTerm]
  const query = `SELECT * FROM books WHERE title ~* $1 ;`;
  const result = await pool.query(query, value)
  console.table(result.rows)
  return result.rows
}

export async function searchBooksByAuthor(searchTerm) {
  // Query the database and return all books that have an author name matching the searchTerm
  const value = [searchTerm]
  const query = `
  SELECT * FROM books 
  INNER JOIN authors
  ON books.author_id = authors.id
  WHERE authors.last_name ~* $1 OR authors.first_name ~* $1 ;`;
  const result = await pool.query(query, value)
  console.table(result.rows)
  return result.rows
}

export async function getBookById(id) {
  // Query the database and return the book with a matching id
  const value = [id]
  const query = `SELECT * FROM books WHERE id = $1 ;`;
  const result = await pool.query(query, value)

  if (result.rows.length === 0) {
    console.log(`No book found with ID ${id}`);
    return { message: `No book found with ID ${id}` };
  }

  console.table(result.rows)
  return result.rows
}

export async function createBook(book) {
  // Query the database to create a book and return the newly created book
  const userInput = [book.title, book.published_date];
  const query = 
  `INSERT INTO books (title, published_date)
    VALUES ($1, $2)
    RETURNING *;`;
  const result = await pool.query(query, userInput);
  console.log(result.rows);
  return {payload: result.rows}
}

export async function updateBookById(id, updates) {
  // Query the database to update a book and return the newly updated book
   // Extract the required updates from the 'updates' object
   const { title, published_date} = updates;

   // Query the database to update an author and return the newly updated author
   const userInput = [title, published_date, id];
   const query = `
     UPDATE books
     SET title = $1, published_date = $2
     WHERE id = $3
     RETURNING *;
   `;
   const result = await pool.query(query, userInput);
   console.log(result.rows);
   return {payload: result.rows}
}

export async function deleteBookById(id) {
  // Query the database to delete a book and return the deleted book
  const value = [id]
  const query = `
  DELETE FROM books
  WHERE id=$1
  `;
  const result = await pool.query(query, value);
  console.log(`Book with ID ${id} deleted successfully.`);
  return { deletedBookId: id };
}
