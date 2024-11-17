import React from 'react';
import { useUserRole } from './contexts/UserContext.js';

function AdminPage() {
  const role = useUserRole();

  if (role === null) {
    return <p>Loading...</p>; // Add a loading state while fetching the role
  }

  if (role !== 'Admin') {
    return <p>Access Denied: You do not have the required permissions to view this page.</p>;
  }

  return (
    <div>
      <h1>Welcome, Admin!</h1>
      <p>This is the admin dashboard.</p>
    </div>
  );
}

export default AdminPage;
