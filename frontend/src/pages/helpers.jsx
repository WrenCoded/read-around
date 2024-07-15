import axios from "axios";

export const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/auth/user-profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error.response);
    throw error;
  }
};

export const refreshBooks = async (userToken, setUser) => {
  if (userToken) {
    const response = await axios.get("http://localhost:8080/books", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    setUser((prevUser) => ({ ...prevUser, books: response.data }));
  }
};

export const deleteBook = async (userToken, bookId) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/books/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting book:", error.response);
    throw error;
  }
};

export const updateBook = async (userToken, bookId, updatedBookData) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/books/${bookId}`,
      updatedBookData,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error.response);
    throw error;
  }
};