import React, { createContext, useState, useEffect } from "react";
import usersData from "../data/users.json"; // Importamos los usuarios iniciales

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    } else {
      localStorage.setItem("users", JSON.stringify(usersData));
      setUsers(usersData);
    }
  }, []);

  const addUser = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <UsersContext.Provider value={{ users, addUser, updateUser }}>
      {children}
    </UsersContext.Provider>
  );
};
