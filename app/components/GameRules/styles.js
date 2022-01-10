import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    color: 'white',
  },
  itemContainer: {
    // width,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  itemTitle: {
    marginTop: 15,
    opacity: 0.6,
    lineHeight: 22,
    color: '#14213d',
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
