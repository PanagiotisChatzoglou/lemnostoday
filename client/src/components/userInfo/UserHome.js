import React, { useState } from "react";

const UserHome = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <>
      {user?.result && (
        <div>
          <div>{user?.result.name}</div>
          <div>{user?.result.email}</div>
        </div>
      )}
    </>
  );
};

export default UserHome;
