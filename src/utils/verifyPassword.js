export const verifyPassword = password => {
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  if (!/[A-Z]/.test(password)) {
    throw new Error('Password must have at least one uppercase letter.');
  }

  if (!/[a-z]/.test(password)) {
    throw new Error('Password must have at least one lowercase letter.');
  }
};
