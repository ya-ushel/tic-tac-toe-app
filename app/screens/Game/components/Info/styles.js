import { StyleSheet } from 'react-native';

import fonts from 'fonts';

const containerBackground = '#edf6f9';
export default StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    paddingHorizontal: 10,
    // paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    color: '#293241',
    fontSize: 30,
    fontFamily: fonts.semiBold,
  },
  boardScale: {
    fontFamily: fonts.semiBold,
  },
  scale: {
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
  },
  chatWheels: {
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
  },
  chatWheelsButton: {
    opacity: 0.8,
    marginHorizontal: 5,
  },
  tipsContainer: {
    position: 'absolute',
    right: 0,
    height: 70,
    width: 165,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#14213d',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.2,
  },
  tipsLabel: {
    color: '#ffba08',
    fontFamily: fonts.semiBold,
  },
});
