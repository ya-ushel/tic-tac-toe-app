import { StyleSheet } from 'react-native';

import fonts from 'fonts';

const containerBackground = '#fefae0';
export default StyleSheet.create({
  container: {
    backgroundColor: containerBackground,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 5,
    borderBottomColor: '#a68a64',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ceil: {
    marginVertical: 3,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#a68a64',
  },
});
