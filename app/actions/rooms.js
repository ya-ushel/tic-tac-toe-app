import axios from '../utils/axios';

const getAllRooms = async () => {
  try {
    const res = await axios.get('rooms/list');
    return res.data;
  } catch (error) {
    console.log('error', error);
  }
};

const createRoom = async options => {
  try {
    const res = await axios.post('rooms/create', {
      options,
    });
    console.log('res', res);
  } catch (error) {
    console.log('error', error);
  }
};

const editRoom = async (roomId, options) => {
  try {
    const res = await axios.post('rooms/edit', {
      options,
      roomId,
    });
    console.log('res', res);
  } catch (error) {
    console.log('error', error);
  }
};

const leaveRoom = async id => {
  try {
    const res = await axios.post('rooms/leave', {
      roomId: id,
    });
    console.log(res);
  } catch (error) {
    console.log('error', error);
  }
};

const joinRoom = async id => {
  try {
    const res = await axios.post('rooms/join', {
      roomId: id,
    });
    console.log(res);
  } catch (error) {
    console.log('error', error);
  }
};

export { getAllRooms, createRoom, editRoom, leaveRoom, joinRoom };
