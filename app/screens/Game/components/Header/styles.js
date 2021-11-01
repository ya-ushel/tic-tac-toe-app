import { StyleSheet } from 'react-native';
import fonts from 'global/fonts';

export default StyleSheet.create({
  safe: {
    backgroundColor: '#0081a7',
  },
  container: {
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#0081a7',
    paddingBottom: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nickname: {
    fontFamily: fonts.semiBold,
    color: 'white',
    marginRight: 20,
    fontSize: 16,
    alignItems: 'center',
  },
});
