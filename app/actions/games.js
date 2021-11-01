import axios from 'utils/axios';

const getGame = async gameId => {
  try {
    const res = await axios.get('games/get', { params: { gameId } });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log('error', error);
  }
};

export { getGame };
