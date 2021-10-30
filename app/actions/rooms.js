import axios from '../utils/axios';

const getAllRooms = async () => {
  try {
    const res = await axios.get('rooms/list');
    return res.data;
  } catch (error) {
    console.log('error', error);
  }
};

const createRoom = async (name, options) => {
  try {
    const res = await axios.post('rooms/create', null, {
      params: {
        name,
        options,
      },
    });
    console.log('res', res);
  } catch (error) {
    console.log('error', error);
  }
};

const leaveRoom = async id => {
  try {
    const res = await axios.post('rooms/leave', null, {
      params: {
        roomId: id,
      },
    });
    console.log(res);
  } catch (error) {
    console.log('error', error);
  }
};

const joinRoom = async id => {
  try {
    const res = await axios.post('rooms/join', null, {
      params: {
        roomId: id,
      },
    });
    console.log(res);
  } catch (error) {
    console.log('error', error);
  }
};

export { getAllRooms, createRoom, leaveRoom, joinRoom };
