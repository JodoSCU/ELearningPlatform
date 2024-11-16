// src/contexts/UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function getUserRole() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const groups = user.signInUserSession.idToken.payload['cognito:groups'];

        if (groups && groups.includes('Admin')) {
          setRole('Admin');
        } else if (groups && groups.includes('Employee')) {
          setRole('Employee');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    }
    getUserRole();
  }, []);

  return <UserContext.Provider value={role}>{children}</UserContext.Provider>;
}

export function useUserRole() {
  return useContext(UserContext);
}
