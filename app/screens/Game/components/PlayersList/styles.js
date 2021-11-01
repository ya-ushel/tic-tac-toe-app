import { StyleSheet } from 'react-native';

import fonts from 'fonts';

const containerBackground = '#edf6f9';
export default StyleSheet.create({
  container: {
    backgroundColor: containerBackground,
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderBottomWidth: 5,
    borderBottomColor: '#a68a64',
  },
  playerContainer: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  playerName: {
    marginTop: 5,
  },
});
