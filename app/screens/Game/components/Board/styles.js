import { StyleSheet } from 'react-native';

import fonts from 'fonts';

const containerBackground = '#4895ef';
export default StyleSheet.create({
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
  },
  container: {
    backgroundColor: containerBackground,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ceil: {
    marginVertical: 2,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: 'white',
  },
});