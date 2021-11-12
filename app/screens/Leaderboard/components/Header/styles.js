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
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#0081a7',
    paddingBottom: 20,
    paddingTop: Platform.isPad ? 20 : 10,
  },
  title: {
    fontFamily: fonts.semiBold,
    color: 'white',
    fontSize: 15,
  },
});
