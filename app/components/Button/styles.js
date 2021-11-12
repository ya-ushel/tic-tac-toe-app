import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignItems: 'center',
  },
  label: {
    color: 'white',
  },
  shadow: {
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 5,
    borderRadius: 4,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
