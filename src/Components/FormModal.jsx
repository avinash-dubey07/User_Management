import React, { useState, useEffect, useRef } from "react";

// Simple email and phone validation regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/; // Validates a 10-digit phone number
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/; // Validates URL

function generateUserName(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ$@_-#abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

const FormModal = ({
  isOpen,
  onClose,
  defaultValues,
  action,
  index,
  updateList,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: generateUserName(10),
    street: "",
    city: "",
    companyName: "",
    website: "",
  });

  const [errors, setErrors] = useState({});
  const modalRef = useRef(null); // Create a reference for the modal container

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        name: defaultValues.name,
        email: defaultValues.email,
        phone: defaultValues.phone,
        username: defaultValues.username,
        street: defaultValues.address.street,
        city: defaultValues.address.city,
        companyName: defaultValues.companyName || "",
        website: defaultValues.website || "",
      });
    } else {
      setFormData((prev) => ({ ...prev,  })); // Initialize username as non-editable
    }
  }, [defaultValues]);

  // Function to close modal if clicked outside
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // Close modal
    }
  };

  // Set up event listener for clicks outside the modal
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Name is required and must be at least 3 characters.";
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "A valid email is required.";
    }
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "A valid phone number is required.";
    }
    if (!formData.street || !formData.city) {
      newErrors.address = "Street and city are required.";
    }
    if (formData.companyName && formData.companyName.length < 3) {
      newErrors.companyName =
        "Company name must be at least 3 characters if provided.";
    }
    if (formData.website && !urlRegex.test(formData.website)) {
      newErrors.website = "A valid URL is required if provided.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const addUser = () => {
    if (validateForm()) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          updateList(index, action, formData);
          onClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const editUser = () => {
    if (validateForm()) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          updateList(index, action, formData);
          onClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: "white",
          padding: "45px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          width: "600px",
          maxHeight: "80%",
          overflowY: "auto",
        }}
      >
        <h2 style={{ color: "#1F2937" }}>
          {defaultValues ? "Edit User" : "Add User"}
        </h2>
        <form>
          <label style={{ color: "#333" }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              display: "block",
              padding: "10px",
              margin: "10px 0",
              width: "100%",
            }}
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}

          <label style={{ color: "#333" }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              display: "block",
              padding: "10px",
              margin: "10px 0",
              width: "100%",
            }}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

          <label style={{ color: "#333" }}>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{
              display: "block",
              padding: "10px",
              margin: "10px 0",
              width: "100%",
            }}
          />
          {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}

          <label style={{ color: "#333" }}>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            readOnly // Make username non-editable
            style={{
              display: "block",
              padding: "10px",
              margin: "10px 0",
              width: "100%",
            }}
          />

          <label style={{ color: "#333" }}>Address (Street)</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            style={{
              display: "block",
              padding: "10px",
              margin: "10px 0",
              width: "100%",
            }}
          />

          <label style={{ color: "#333" }}>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            style={{
              display: "block",
              padding: "10px",
              margin: "10px 0",
              width: "100%",
            }}
          />
          {errors.address && (
            <span style={{ color: "red" }}>{errors.address}</span>
          )}

          <label style={{ color: "#333" }}>Company Name (optional)</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            style={{
              display: "block",
              padding: "10px",
              margin: "10px 0",
              width: "100%",
            }}
          />
          {errors.companyName && (
            <span style={{ color: "red" }}>{errors.companyName}</span>
          )}

          <label style={{ color: "#333" }}>Website (optional)</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            style={{
              display: "block",
              padding: "10px",
              margin: "10px 0",
              width: "100%",
            }}
          />
          {errors.website && (
            <span style={{ color: "red" }}>{errors.website}</span>
          )}
        </form>
        <button
          onClick={() => {
            if (action === "ADD") {
              addUser();
            } else {
              editUser();
            }
          }}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px",
            marginRight: "10px",
          }}
        >
          {action === "ADD" ? "Add" : "Save"}
        </button>
        <button
          onClick={onClose}
          style={{
            backgroundColor: "#f44336",
            color: "white",
            padding: "10px",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FormModal;
