import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('carify_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.get(`/users?email=${email}&password=${password}`);
      if (response.data.length > 0) {
        const loggedInUser = response.data[0];
        setUser(loggedInUser);
        localStorage.setItem('carify_user', JSON.stringify(loggedInUser));
        return { success: true };
      } else {
        return { success: false, message: 'İstifadəçi adı və ya şifrə yanlışdır' };
      }
    } catch (error) {
      return { success: false, message: 'Sistem xətası baş verdi' };
    }
  };

  const register = async (userData) => {
    try {
      // Öncə bu emaillə istifadəçi olub olmadığını yoxlayaq
      const checkUser = await api.get(`/users?email=${userData.email}`);
      if (checkUser.data.length > 0) {
        return { success: false, message: 'Bu e-poçt ünvanı artıq mövcuddur' };
      }
      
      const response = await api.post('/users', userData);
      setUser(response.data);
      localStorage.setItem('carify_user', JSON.stringify(response.data));
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Qeydiyyat zamanı xəta baş verdi' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('carify_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
