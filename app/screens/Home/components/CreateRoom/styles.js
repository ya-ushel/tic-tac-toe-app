import { StyleSheet } from 'react-native';

import fonts from 'fonts';

const containerBackground = 'red';
export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 20,
    // flex: 1,
    // alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  createButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 5,
  },
  modal: {
    backgroundColor: '#62b6cb',
    alignItems: 'flex-start',
    paddingVertical: 20,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: -20,
    paddingBottom: 100,
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: fonts.semiBold,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  optionLabel: {
    marginRight: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.2,
  },
});
