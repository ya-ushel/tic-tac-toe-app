import axios from '../utils/axios';

const getAllRooms = async () => {
  try {
    const res = await axios.get('rooms/list');
    return res.data;
  } catch (error) {
    console.log('error', error);
  }
};

export { getAllRooms };
