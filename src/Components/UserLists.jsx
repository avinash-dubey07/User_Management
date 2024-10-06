import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function UserList({ users, onEdit, onDelete, setActiveRow }) {
  const isMobile = window.screen.width <= 640;
  const isTablet = !isMobile && window.screen.width <= 1024;
  const isDesktop = !isMobile && !isTablet;

  console.log({ isMobile, isTablet });
  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#1F2937", color: "white" }}>
            <th style={{ padding: "10px" }}>ID</th>
            <th style={{ padding: "10px" }}>Name</th>
            {!isMobile && <th style={{ padding: "10px" }}>Username</th>}
            {!isMobile && <th style={{ padding: "10px" }}>Email</th>}
            {!isMobile && <th style={{ padding: "10px" }}>Phone</th>}
            {isDesktop && <th style={{ padding: "10px" }}>Website</th>}
            <th style={{ padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#2D8C7B" : "#1F2937",
                  color: "#FFFFFF",
                }}
              >
                <td style={{ padding: "10px", border: "none" }}>{index + 1}</td>
                <td style={{ padding: "10px", border: "none" }}>
                  <Link
                    to={`/user/${user.id}`}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {user.name}
                  </Link>
                </td>
                {!isMobile && (
                  <td style={{ padding: "10px", border: "none" }}>
                    {user.username}
                  </td>
                )}
                {!isMobile && (
                  <td style={{ padding: "10px", border: "none" }}>
                    {user.email}
                  </td>
                )}
                {!isMobile && (
                  <td style={{ padding: "10px", border: "none" }}>
                    {user.phone}
                  </td>
                )}
                {isDesktop && (
                  <td style={{ padding: "10px", border: "none" }}>
                    {user.website}
                  </td>
                )}
                <td style={{ padding: "10px", border: "none" }}>
                  <button
                    onClick={() => {
                      setActiveRow(index);
                      onEdit(user);
                    }}
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
                    onClick={() => {
                      setActiveRow(index);
                      onDelete(user);
                    }}
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
