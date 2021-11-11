import React from 'react';
import { View } from 'react-native';

import { Label, Button, Icon } from 'components';
import styles from './styles';

const GameDetails = ({ setResultsVisible, resultsVisible }) => {
  const onResults = () => {
    setResultsVisible(!resultsVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Button
          renderIcon={() => (
            <Icon
              style={{ paddingVertical: 5 }}
              name="replay"
              color="white"
              size={30}
            />
          )}>
          Replay
        </Button>
      </View>
      <View style={styles.rowContainer}>
        <Button
          color="gold"
          onPress={onResults}
          renderIcon={() => (
            <Icon
              style={{ paddingVertical: 5 }}
              name="cup"
              color="white"
              size={30}
            />
          )}>
          Results
        </Button>
      </View>
    </View>
  );
};

export default GameDetails;
