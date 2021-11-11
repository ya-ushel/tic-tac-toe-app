import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  variantContainer: {
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#1d3557',
    minWidth: 30,
    alignItems: 'center',
  },
  selectedVariantContainer: {
    backgroundColor: '#1d3557',
  },
});
