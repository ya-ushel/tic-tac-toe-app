import Moralis from 'moralis';
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

async function loginViaMoralis(connector) {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({
      connector,
      signingMessage: 'Log in using Moralis',
    })
      .then(function (user) {
        console.log('logged in user:', user);
        console.log(user.get('ethAddress'));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export { getLeaders, loginViaMoralis };
