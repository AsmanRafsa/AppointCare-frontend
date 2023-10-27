import { useState, useEffect } from "react";
import axios from "axios";

export default function Userprofile() {
  const url = "http://127.0.0.1:8000/api/user/profile/";
  const imageUrl = "http://127.0.0.1:8000/api/";
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Make an Axios GET request to fetch user data
    axios
      .put(url)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  if (!user) {
    return <div>Loading user data...</div>;
  }
  console.log(user)

  return (
    <>
      {user.map((Userprofile) => {
        <div>
          <h1>User Profile</h1>
          <img src={`${imageUrl}${Userprofile.profilePic}`} alt="Profile" />
          <p>Name: {Userprofile.related_data.first_name}  {Userprofile.related_data.last_name}</p>
          <p>Phone Number: {Userprofile.phoneNumber}</p>
        </div>;
      })}
    </>
  );
}
