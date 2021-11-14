import axios from '../utils/axios';

const getLeaders = async () => {
  try {
    const res = await axios.get('users/leaders');
    return res.data.map((u, i) => {
      u.index = i;
      return u;
    });
  } catch (error) {
    console.log('error', error);
  }
};

export { getLeaders };
