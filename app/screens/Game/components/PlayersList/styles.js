import { StyleSheet } from 'react-native';

import fonts from 'fonts';

const containerBackground = '#edf6f9';
export default StyleSheet.create({
  container: {
    paddingTop: 50,
    // backgroundColor: containerBackground,
    // paddingHorizontal: 10,
    paddingBottom: 60,
    borderWidth: 1,
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
    borderWidth: 7,
    borderColor: '#99d98c',
  },
  playerName: {
    color: 'white',
  },
  playerScore: {
    fontSize: 12,
    color: 'white',
  },
});
