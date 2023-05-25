import { pool } from "../db/index.js";
import { authorRoutes } from "../routes/authors.js";

export async function getAuthors() {
  // Query the database and return all authors
  const query = 'SELECT * FROM authors'
  const result = await pool.query(query)
  console.table(result.rows)
  return {payload: result.rows}
}

export async function searchAuthorsByName(searchTerm) {
  // Query the database and return all authors that have a name matching the searchTerm
  const value = [searchTerm]
  const query = `SELECT * FROM authors WHERE last_name = $1 ;`;
  const result = await pool.query(query, value)
  console.table(result.rows)
  return {payload: result.rows}
}

export async function getAuthorById(id) {
  // Query the database and return the book with a matching id
  const value = [id]
  const query = `SELECT * FROM authors WHERE id = $1 ;`;
  const result = await pool.query(query, value)
  console.table(result.rows)
  return {payload: result.rows}
}

export async function createAuthor(author) {
  // Query the database to create an author and return the newly created author
  const userInput = [author.first_name, author.last_name];
  const newAuthor = [...userInput];
  const query = 
  `INSERT INTO authors (first_name, last_name)
    VALUES ($1, $2)
    RETURNING *;`;
  const result = await pool.query(query, newAuthor);
  console.log(result.rows);
  return {payload: result.rows}
}

export async function updateAuthorById(id, updates) {
  // Query the database to update an author and return the newly updated author

   // Extract the required updates from the 'updates' object
   const { first_name, last_name } = updates;

   // Query the database to update an author and return the newly updated author
   const userInput = [first_name, last_name, id];
   const query = `
     UPDATE authors
     SET first_name = $1, last_name = $2
     WHERE id = $3
     RETURNING *;
   `;
   const result = await pool.query(query, userInput);
   console.log(result.rows);
   return {payload: result.rows}
 }



export async function deleteAuthorById(id) {
  // Query the database to delete an author and return the deleted author
  const value = [id]
  const query = `
  DELETE FROM authors
  WHERE id=$1
  `;
  const result = await pool.query(query, value);
  console.log(`Author with ID ${id} deleted successfully.`);
  return { deletedAuthorId: id };
}

