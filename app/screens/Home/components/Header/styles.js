import { StyleSheet, Platform } from 'react-native';

import fonts from 'fonts';

export default StyleSheet.create({
  safe: {
    backgroundColor: '#0081a7',
  },
  container: {
    flexDirection: 'row',
    // height: 50,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#0081a7',
    paddingBottom: 20,
    paddingTop: Platform.isPad ? 20 : 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nickname: {
    marginLeft: 10,
    fontSize: 16,
  },
  coins: {
    color: '#ffba08',
    marginTop: 2,
    marginRight: 5,
    fontFamily: fonts.semiBold,
  },
});
