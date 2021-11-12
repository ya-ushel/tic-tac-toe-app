import { StyleSheet, Dimensions } from 'react-native';

import fonts from '../../global/fonts';

const { width, height } = Dimensions.get('screen');

const containerBackground = 'white';
export default StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    backgroundColor: containerBackground,
    height: height - 0,
    // flex: 1,
  },
  title: {
    fontSize: 25,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: fonts.semiBold,
  },
  roomContainerShadow: {
    backgroundColor: containerBackground,
  },
  roomContainer: {
    marginVertical: 2,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roomName: {
    fontSize: 16,
  },
  roomSettings: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  roomPlayers: {
    marginRight: 5,
  },
  roomPlayerAvatar: {
    marginHorizontal: 5,
  },
});
