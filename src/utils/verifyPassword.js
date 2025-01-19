import { notifyError } from './notification';

export const verifyPassword = password => {
  if (password.length < 6) {
    return notifyError('Password must be at least 6 characters long.');
  }

  if (!/[A-Z]/.test(password)) {
    return notifyError('Password must have at least one uppercase letter.');
  }

  if (!/[a-z]/.test(password)) {
    return notifyError('Password must have at least one lowercase letter.');
  }
};
