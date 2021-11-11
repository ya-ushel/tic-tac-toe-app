import { StyleSheet, Dimensions } from 'react-native';

import fonts from 'fonts';

const { width, height } = Dimensions.get('screen');

const containerBackground = 'white';

export default StyleSheet.create({
  yourRoomTitle: {
    fontSize: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontFamily: fonts.semiBold,
  },
  roomContainerShadow: {
    backgroundColor: containerBackground,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.2,
    width: '100%',
    height: 5,
    paddingBottom: 10,
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
  startButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
