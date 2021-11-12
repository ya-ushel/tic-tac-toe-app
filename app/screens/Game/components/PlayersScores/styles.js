import { StyleSheet } from 'react-native';

import fonts from 'fonts';

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    // backgroundColor: containerBackground,
    // paddingHorizontal: 10,
    paddingBottom: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  player: {
    justifyContent: 'space-between',

    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingVertical: 10,
  },
  playerName: {
    marginLeft: 10,
    fontSize: 18,
  },
  playerTime: {
    marginRight: 5,
    color: '#ced4da',
  },
  playerScore: {
    marginRight: 5,
    fontSize: 18,
    color: '#ffba08',
    fontFamily: fonts.semiBold,
  },
});
