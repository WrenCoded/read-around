import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function UserProfile() {
  const { isLoggedIn, username } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <h1>Please log in to view your profile.</h1>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {username}</p>
      {/* Add more user profile information here */}
    </div>
  );
}
