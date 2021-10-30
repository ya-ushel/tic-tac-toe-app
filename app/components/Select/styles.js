import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  variantContainer: {
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#90be6d',
    width: 30,
    alignItems: 'center',
  },
  selectedVariantContainer: {
    backgroundColor: '#90be6d',
  },
});
