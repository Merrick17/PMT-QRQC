import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from '../views/MainScreen';
import React from 'react';
import SettingsSreen from '../views/SettingsSreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dashboard from '../views/Dashboard';
import Audit from '../views/Audit';
import Quality from '../views/Quality';
import AddNewQRQC from '../views/AddNewQRQC';
import AddNewAction from '../views/AddActions';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReasonScreen from '../views/ReasonScreen';
import DetailQrQC from '../views/DetailQrQC';
const Tab = createBottomTabNavigator();
const QualityNav = createNativeStackNavigator();
const QualityNavStack = () => {
  return (
    <QualityNav.Navigator
      initialRouteName="List"
      screenOptions={{headerShown: false}}>
      <QualityNav.Screen name="List" component={Quality} />
      <QualityNav.Screen name="Add" component={AddNewQRQC} />
      <QualityNav.Screen name="Reason" component={ReasonScreen} />
      <QualityNav.Screen name="Action" component={AddNewAction} />
      <QualityNav.Screen name="Details" component={DetailQrQC} />
    </QualityNav.Navigator>
  );
};
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-outline' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list' : 'ios-list';
          } else if (route.name === 'RH') {
            iconName = focused
              ? 'person-circle-outline'
              : 'person-circle-outline';
          } else if (route.name === 'Audit') {
            iconName = focused
              ? 'alert-circle-outline'
              : 'alert-circle-outline';
          } else if (route.name === 'Quality') {
            iconName = focused
              ? 'checkmark-circle-outline'
              : 'checkmark-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{tabBarLabel: 'Production'}}
      />
      <Tab.Screen
        name="RH"
        component={Dashboard}
        options={{tabBarLabel: 'Ressource Humaine'}}
      />
      <Tab.Screen
        name="Audit"
        component={Audit}
        options={{tabBarLabel: 'Audit'}}
      />
      <Tab.Screen
        name="Quality"
        component={QualityNavStack}
        options={{tabBarLabel: 'Qualite'}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsSreen}
        options={{tabBarLabel: 'Parametre'}}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
