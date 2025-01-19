import axios from 'axios';

export const saveUserDataToDB = async data => {
  const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user`, data);

  if (res.data.insertedId) console.log('Data saved successfully!');
  console.log(res.data);
};
