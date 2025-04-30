export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const getUserRole = () => {
  const role = localStorage.getItem('role');
  return role ? parseInt(role, 10) : null;
};

export const setUserRole = (role) => {
  localStorage.setItem('role', role.toString());
};

export const removeUserRole = () => {
  localStorage.removeItem('role');
};

export const getUserName = () => {
  return localStorage.getItem('name');
};

export const setUserName = (name) => {
  localStorage.setItem('name', name);
};

export const removeUserName = () => {
  localStorage.removeItem('name');
};

export const clearAuth = () => {
  removeToken();
  removeUserRole();
  removeUserName();
};
