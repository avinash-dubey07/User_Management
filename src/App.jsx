import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import Router components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from "./Components/UserLists";
import UserDetails from "./Components/Userdetail";
import FormModal from "./Components/FormModal";
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch users");
        return response.json();
      })
      .then((data) => {setUsers(data); setLoading(false);})
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }, []);

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the user: ${user.name}?`
    );
    if (confirmDelete) {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      toast.success("User deleted successfully");
    }
  };

  const handleSubmitUser = (userData) => {
    if (currentUser) {
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === currentUser.id ? { ...u, ...userData } : u
        )
      );
      toast.success("User updated successfully");
    } else {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to add user");
          return response.json();
        })
        .then((newUser) => {
          setUsers((prevUsers) => [...prevUsers, newUser]);
          toast.success("User added successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>
        <h1 style={{ textAlign: "center" }}>User Management</h1>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: "600px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search user by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: "10px", borderRadius: "5px", marginRight: "20px" }}
          />
          <button
            onClick={handleAddUser}
            style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", borderRadius: "5px" }}
          >
            Add User
          </button>
        </div>

        {loading ? (
          <div style={{ width: "100%", maxWidth: "600px" }}>
            {/* Skeleton for each user item */}
            {[...Array(7)].map((_, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <Skeleton height={30} width="100%" />
                <Skeleton height={30} width="100%" />
              </div>
            ))}
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<UserList users={filteredUsers} onEdit={handleEditUser} onDelete={handleDeleteUser} />} />
            <Route path="/user/:id" element={<UserDetails users={users} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}

        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitUser}
          defaultValues={currentUser}
        />
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
