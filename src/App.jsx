import React, { useState, useEffect, act } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from "./Components/UserLists";
import UserDetails from "./Components/Userdetail";
import FormModal from "./Components/FormModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeRow, setActiveRow] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch users");
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }, []);

  const handleAddUser = () => {
    setIsAddModalOpen(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the user: ${user.name}?`
    );
    if (confirmDelete) {
      updateList(activeRow, "DELETE", user);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateList = (index, action, user) => {
    let message = "User added successfully!";
    if (action === "ADD") {
      setUsers((prev) => {
        prev.push(user);
        return prev;
      });
    } else if (action === "EDIT") {
      setUsers((prev) => {
        prev[index] = { ...user };
        return prev;
      });
      message = "User updated successfully!";
    } else {
      setUsers((prev) => {
        prev.splice(index, 1);
        return prev;
      });
      message = "User deleted successfully!";
    }

    toast.success(message, 3000);
  };

  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ textAlign: "center" }}>User Management</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "600px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Search user by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "5px",
              marginRight: "20px",
            }}
          />
          <button
            onClick={handleAddUser}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
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
            <Route
              path="/"
              element={
                <UserList
                  users={filteredUsers}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                  setActiveRow={setActiveRow}
                />
              }
            />
            <Route path="/user/:id" element={<UserDetails users={users} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}

        {/* Add User Modal  */}
        {isAddModalOpen && (
          <FormModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            action="ADD"
            updateList={updateList}
          />
        )}

        {/* Edit User Modal  */}
        {isEditModalOpen && (
          <FormModal
            isOpen={isEditModalOpen}
            action="EDIT"
            onClose={() => setIsEditModalOpen(false)}
            defaultValues={currentUser}
            index={activeRow}
            updateList={updateList}
          />
        )}
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
