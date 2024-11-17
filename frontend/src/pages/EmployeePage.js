import React from 'react';
import { useUserRole } from './contexts/UserContext';

function EmployeePage() {
  const role = useUserRole();

  if (role === null) {
    return <p>Loading...</p>; // Add a loading state while fetching the role
  }

  if (role !== 'Employee') {
    return <p>Access Denied: You do not have the required permissions to view this page.</p>;
  }

  return (
    <div>
      <h1>Welcome, Employee!</h1>
      <p>This is the employee dashboard.</p>
    </div>
  );
}

export default EmployeePage;
