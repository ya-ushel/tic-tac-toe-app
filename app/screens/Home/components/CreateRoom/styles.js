import { StyleSheet } from 'react-native';

import fonts from 'fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fdfcdc',
    marginBottom: -30,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  createButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  modal: {
    backgroundColor: '#0081a7',
    alignItems: 'flex-start',
    paddingVertical: 20,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: -20,
    paddingBottom: 100,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: fonts.semiBold,
  },
  options: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  optionLabel: {
    marginRight: 20,
  },
});
