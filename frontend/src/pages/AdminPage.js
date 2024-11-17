// src/pages/AdminPage.js
import React from 'react';
import { useUserRole } from '../contexts/UserContext';

function AdminPage() {
  const role = useUserRole();

  if (role !== 'Admin') {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Employee Progress</h2>
      {/* Add components to list employees and show their progress here */}
      <div>
        <h3>Employee 1</h3>
        <p>Progress: 80%</p>
      </div>
      <div>
        <h3>Employee 2</h3>
        <p>Progress: 90%</p>
      </div>
    </div>
  );
}

export default AdminPage;
