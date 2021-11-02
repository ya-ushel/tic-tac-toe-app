import { StyleSheet } from 'react-native';

import fonts from 'fonts';

const containerBackground = '#edf6f9';
export default StyleSheet.create({
  container: {
    paddingTop: 50,
    // backgroundColor: containerBackground,
    // paddingHorizontal: 10,
    paddingBottom: 60,
  },
  playerContainer: {
    marginHorizontal: 5,
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 5,
    borderColor: 'transparent',
  },
  playerInfo: {
    paddingVertical: 5,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  currentPlayerContainer: {
    borderWidth: 5,
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
