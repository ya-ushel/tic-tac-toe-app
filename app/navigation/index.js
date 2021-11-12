import { Navigation } from 'react-native-navigation';

import { tabColor, selectedTabColor } from 'constants/navigation';

class Navigator {
  activeComponentId = null;
  prevComponentId = null;

  constructor() {
    this.drawerVisibility = {
      left: false,
      right: false,
    };

    Navigation.events().registerComponentDidAppearListener(
      ({ componentId }) => {
        if (this.activeComponentId !== componentId) {
          this.prevComponentId = this.activeComponentId;
        }
        this.activeComponentId = componentId;
      },
    );
  }

  push(componentId, screen, passProps = null, options = {}) {
    Navigation.push(componentId, {
      component: {
        id: screen,
        name: screen,
        passProps,
        options: {
          bottomTabs: { visible: false },
          sideMenu: {
            left: {
              enabled: false,
            },
          },
          ...options,
        },
      },
    });
  }

  showModal(componentId, screen, passProps = null, options = {}) {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              id: screen,
              name: screen,
              passProps,
              options,
            },
          },
        ],
      },
    });
  }

  async updateTabsLabel() {
    Navigation.mergeOptions('Home', {
      bottomTab: {
        text: 'homee',
      },
    });
  }

  setRootWithTabs() {
    console.log('setRootWithTabs');
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      id: 'HomeScreen',
                      name: 'HomeScreen',
                      options: {
                        bottomTab: {
                          text: 'Home',
                          fontSize: 12,
                          textColor: tabColor,
                          iconColor: tabColor,
                          fontFamily: 'Montserrat-Regular',
                          selectedIconColor: selectedTabColor,
                          selectedTextColor: selectedTabColor,
                          icon: require('../assets/icons/home.png'),
                          iconInsets: {
                            top: 10,
                            bottom: 5,
                            left: 5,
                            right: 5,
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      id: 'LeaderboardScreen',
                      name: 'LeaderboardScreen',
                      options: {
                        bottomTab: {
                          fontSize: 12,
                          text: 'Leaderboard',
                          textColor: tabColor,
                          iconColor: tabColor,
                          fontFamily: 'Montserrat-Regular',
                          selectedIconColor: selectedTabColor,
                          selectedTextColor: selectedTabColor,
                          icon: require('../assets/icons/leaderboard.png'),
                          iconInsets: {
                            top: 10,
                            bottom: 3,
                            left: 3,
                            right: 3,
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },

            {
              stack: {
                children: [
                  {
                    component: {
                      id: 'ProfileScreen',
                      name: 'ProfileScreen',
                      options: {
                        bottomTab: {
                          fontSize: 12,
                          text: 'Profile',
                          textColor: tabColor,
                          iconColor: tabColor,
                          fontFamily: 'Montserrat-Regular',
                          selectedIconColor: selectedTabColor,
                          selectedTextColor: selectedTabColor,
                          icon: require('../assets/icons/user.png'),
                          iconInsets: {
                            top: 10,
                            bottom: 5,
                            left: 5,
                            right: 5,
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    });
  }

  setStackRoot(componentId, screen, passProps = null, options = {}) {
    Navigation.setStackRoot(componentId, [
      {
        component: {
          id: screen,
          name: screen,
          passProps,
          options,
        },
      },
    ]);
  }

  setRoot(screen, passProps = null, options = {}, cb = () => null) {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                id: screen,
                name: screen,
                passProps,
                options,
              },
            },
          ],
        },
      },
    }).then(() => cb());
  }

  dismissAllModals() {
    Navigation.dismissAllModals();
  }

  dismissModal(componentId) {
    Navigation.dismissModal(componentId);
  }

  pop(componentId) {
    Navigation.pop(componentId);
  }

  popTo(componentId) {
    Navigation.pop(componentId);
  }
}

export default new Navigator();