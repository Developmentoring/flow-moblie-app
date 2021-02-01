import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabSamScreen from '../screens/TabSamScreen';
import TabOneScreen from '../screens/TabOneScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {
  TabLoginParamList,
  BottomTabParamList,
  TabOneParamList,
  HomeParamList,
  TabSamParamList
} from '../types';

import { useSelector } from 'react-redux';
import { selectSessionToken } from '../features/login/sessionSlice';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const sessionToken = useSelector(selectSessionToken);
  const isLoggedIn = true ;//sessionToken != '' ? true : false

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      {isLoggedIn ? LoggedInScreens : LoggedOutScreens}
    </BottomTab.Navigator>
  );
}

const LoginTab = <BottomTab.Screen
  key="login"
  name="Login"
  component={TabLoginNavigator}
  options={{
    tabBarIcon: ({ color }) => <TabBarIcon name="ios-log-in" color={color} />,
  }}
/>

const SamTab = <BottomTab.Screen
  key="Sam"
  name="Tasks"
  component={TabSamNavigator}
  options={{
    tabBarIcon: ({ color }) => <TabBarIcon name="logo-octocat" color={color} />,
  }}
/>

const TabOneTab = <BottomTab.Screen
  key="TabOne"
  name="TabOne"
  component={TabOneNavigator}
  options={{
    tabBarIcon: ({ color }) => <TabBarIcon name="logo-reddit" color={color} />,
  }}
/>

const HomeTab = <BottomTab.Screen
  key="Home"
  name="Home"
  component={HomeNavigator}
  options={{
    tabBarIcon: ({ color }) => <TabBarIcon name="logo-youtube" color={color} />,
  }}
/>

const LoggedInScreens = [SamTab, HomeTab, TabOneTab]
const LoggedOutScreens = [LoginTab]

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </TabOneStack.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Home' }}
      />
    </HomeStack.Navigator>
  );
}

const TabSamStack = createStackNavigator<TabSamParamList>();

function TabSamNavigator() {
  return (
    <TabSamStack.Navigator>
      <TabSamStack.Screen
        name="TabSamScreen"
        component={TabSamScreen}
        options={{ headerTitle: 'Tasks' }}
      />
    </TabSamStack.Navigator>
  );
}

const TabLoginStack = createStackNavigator<TabLoginParamList>();

function TabLoginNavigator() {
  return (
    <TabLoginStack.Navigator>
      <TabLoginStack.Screen
        name="TabLoginScreen"
        component={LoginScreen}
        options={{ headerTitle: 'Login' }}
      />
      <TabLoginStack.Screen
        name="TabSamScreen"
        component={TabSamScreen}
        options={{ headerTitle: 'Tasks' }}
      />
    </TabLoginStack.Navigator>
  );
}
