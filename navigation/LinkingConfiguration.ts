import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Login: {
            screens: {
              TabLoginScreen: 'login',
            },
          },
          Sam: {
            screens: {
              TabSamScreen: 'sam',
            },
          },
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
