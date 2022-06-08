import { createContext } from 'react';

const UserContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export default UserContext;