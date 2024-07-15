import React, { useState } from "react";

const EditBookForm = ({ book, handleUpdateBook, handleClose }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBookData = { title, author }; // Prepare updated data
    await handleUpdateBook(book.id, updatedBookData); // Pass book ID and updated data
    handleClose(); // Close the modal
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update Book</button>
    </form>
  );
};

export default EditBookForm;
