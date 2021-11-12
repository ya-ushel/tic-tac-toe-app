import React, { useState } from 'react';
import { View } from 'react-native';

import { Button, CreateRoomModal } from 'components';
import styles from './styles';

const CreateRoom = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.shadow}>
          <Button
            onPress={() => setModalVisible(true)}
            style={styles.createButton}>
            Create room
          </Button>
        </View>
      </View>
      <CreateRoomModal
        mode="create"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default CreateRoom;
