import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import { Link } from "react-router-dom"; // Import Link

export default function UserList({ users, onEdit, onDelete }) {
  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#1F2937", color: "white" }}>
            <th style={{ padding: "10px" }}>ID</th>
            <th style={{ padding: "10px" }}>Name</th>
            <th style={{ padding: "10px" }}>Username</th>
            <th style={{ padding: "10px" }}>Email</th>
            <th style={{ padding: "10px" }}>Phone</th>
            <th style={{ padding: "10px" }}>Website</th>
            <th style={{ padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={user.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#2D8C7B" : "#1F2937",
                  color: "#FFFFFF",
                }}
              >
                <td style={{ padding: "10px", border: "none" }}>{user.id}</td>
                <td style={{ padding: "10px", border: "none" }}>
                  <Link to={`/user/${user.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                    {user.name}
                  </Link>
                </td>
                <td style={{ padding: "10px", border: "none" }}>
                  {user.username}
                </td>
                <td style={{ padding: "10px", border: "none" }}>
                  {user.email}
                </td>
                <td style={{ padding: "10px", border: "none" }}>
                  {user.phone}
                </td>
                <td style={{ padding: "10px", border: "none" }}>
                  {user.website}
                </td>
                <td style={{ padding: "10px", border: "none" }}>
                  <button
                    onClick={() => onEdit(user)}
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <FaUserEdit />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    <TiUserDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
