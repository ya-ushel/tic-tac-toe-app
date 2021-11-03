import { StyleSheet } from 'react-native';

import fonts from 'fonts';

const containerBackground = '#edf6f9';
export default StyleSheet.create({
  container: {
    paddingTop: 15,
    // backgroundColor: containerBackground,
    // paddingHorizontal: 10,
    paddingBottom: 60,
  },
  playerContainer: {
    // marginRight: 40,
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 30,
    // paddingLeft: 15,
    paddingVertical: 10,
    borderWidth: 5,
    borderColor: 'transparent',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.2,
  },
  playerInfo: {
    paddingVertical: 5,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  playerInfoBottom: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentPlayerContainer: {
    borderRadius: 7,
    // marginTop: 10,
    transform: [{ scale: 1.05 }],
    shadowOffset: {
      width: 2,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 4.2,
  },
  playerName: {
    color: 'white',
  },
  playerScore: {
    fontSize: 12,
    color: 'white',
  },
});
