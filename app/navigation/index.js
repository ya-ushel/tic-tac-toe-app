import { Platform } from 'react-native';
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
    const basicIconInsets = Platform.isPad ? 5 : 10;

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
                            top: basicIconInsets + 5,
                            bottom: basicIconInsets - 5,
                            left: basicIconInsets,
                            right: basicIconInsets,
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
                            top: basicIconInsets + 5,
                            bottom: basicIconInsets - 2,
                            left: basicIconInsets - 2,
                            right: basicIconInsets - 2,
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
                            top: basicIconInsets + 5,
                            bottom: basicIconInsets,
                            left: basicIconInsets,
                            right: basicIconInsets,
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
