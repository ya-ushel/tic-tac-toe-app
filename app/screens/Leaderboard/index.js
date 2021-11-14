import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { login } from 'store/redusers/userSlice';
import { Icon, Label, UserAvatar } from 'components';
import { socket } from 'utils';
import Navigator from 'navigation';
import { getLeaders } from 'actions/user';
import { wait } from 'utils';

import { Header } from './components';
import styles from './styles';

const LeaderboardScreen = ({}) => {
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    setRefreshing(true);
    const leaders = await getLeaders();
    setLeaders(leaders);
    await wait(500);
    setRefreshing(false);
  };

  const renderLeader = ({ item }) => {
    const meLeader = item.id === user.id;

    return (
      <View style={styles.player} key={item.id}>
        <View style={styles.rowContainer}>
          <Label
            style={{
              width: 30,
              fontSize: 20,
              opacity: item.index > 2 && !meLeader ? 0.5 : 1,
              fontWeight: meLeader ? 'bold' : 'normal',
            }}>
            {item.index + 1}.
          </Label>
          <UserAvatar backgroundColor={item.avatarColor} size={50} label="P" />
          <Label
            style={[
              styles.playerName,
              { fontWeight: meLeader ? 'bold' : 'normal' },
            ]}>
            {item.nickname}
          </Label>
        </View>
        <View style={styles.rowContainer}>
          <Label style={styles.playerScore}>{item.rating}</Label>
          <Icon size={15} name="favorite" color="#ffba08" />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Label style={styles.title}>Top players</Label>
      <FlatList
        style={{ marginTop: 20 }}
        data={leaders}
        renderItem={renderLeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchLeaders} />
        }
      />
    </View>
  );
};

export default LeaderboardScreen;
