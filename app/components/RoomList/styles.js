import { StyleSheet } from 'react-native';

import fonts from '../../global/fonts';

export default StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    backgroundColor: '#fdfcdc',
  },
  title: {
    fontSize: 30,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: fonts.semiBold,
  },
  roomContainer: {
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    paddingBottom: 30,
  },
});
