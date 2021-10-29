import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safe: {
    backgroundColor: '#5C95FF',
  },
  container: {
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#5C95FF',
    paddingBottom: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nickname: {
    marginLeft: 10,
    fontSize: 16,
  },
});
