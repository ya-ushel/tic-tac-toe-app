import { StyleSheet } from 'react-native';

import fonts from 'fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    marginTop: 40,
    marginBottom: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#14213d',
    fontSize: 22,
    fontFamily: fonts.semiBold,
  },
  description: {
    color: '#14213d',
    marginTop: 10,
  },
});
