import axios from 'axios';

export const saveUserDataToDB = async data => {
  await axios.post(`${import.meta.env.VITE_SERVER_URL}/user`, data);
};
