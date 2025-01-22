export const fetchDataAsync = async (axios, route) => {
  try {
    const res = await axios.get(route);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
