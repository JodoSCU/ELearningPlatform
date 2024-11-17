// src/pages/EmployeePage.js
import React from 'react';
import { useUserRole } from '../contexts/UserContext';

function EmployeePage() {
  const role = useUserRole();

  if (role !== 'Employee') {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <h2>Learning Track</h2>
      {/* Add learning track components here */}
      <div>
        <h3>Assessment 1</h3>
        {/* Add assessment details here */}
      </div>
    </div>
  );
}

export default EmployeePage;
