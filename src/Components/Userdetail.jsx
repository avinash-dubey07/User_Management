import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetails = ({ users }) => {
  const { id } = useParams();                                       // Get the user ID from the URL
  const navigate = useNavigate();
  const user = users.find(user => user.id === parseInt(id));       // Find the user in the array

  if (!user) {
    return <div>User not found!</div>;
  }
 
  const { address, company} = user;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Company Name:</strong> {company.name}</p>
      <h3>Address</h3>
          <p><strong>Street:</strong> {address.street}</p>
          <p><strong>Suite:</strong> {address.suite}</p>
          <p><strong>City:</strong> {address.city}</p>
          <p><strong>Zipcode:</strong> {address.zipcode}</p>
      <button onClick={() => navigate(-1)} style={{ marginTop: '20px', padding: '10px 20px' }}>Back to User List</button>
    </div>
  );
};

export default UserDetails;
