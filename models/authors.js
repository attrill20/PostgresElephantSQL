import { pool } from "../db/index.js";

export async function getAuthors() {
  // Query the database and return all authors
  const query = 'SELECT * FROM authors'
  const result = await pool.query(query)
  console.table(result.rows)
  return result.rows;
}

export async function searchAuthorsByName(searchTerm) {
  // Query the database and return all authors that have a name matching the searchTerm
  const value = [searchTerm]
  const query = `SELECT * FROM authors WHERE last_name = $1 ;`;
  const result = await pool.query(query, value)
  console.table(result.rows)
  return result.rows;
}

export async function getAuthorById(id) {
  // Query the database and return the book with a matching id
  const value = [id]
  const query = `SELECT * FROM authors WHERE id = $1 ;`;
  const result = await pool.query(query, value)
  console.table(result.rows[0])
  return result.rows[0];
}

export async function createAuthor(author) {
  // Query the database to create an author and return the newly created author
  return {};
}

export async function updateAuthorById(id, updates) {
  // Query the database to update an author and return the newly updated author
  return {};
}

export async function deleteAuthorById(id) {
  // Query the database to delete an author and return the deleted author
  return {};
}
