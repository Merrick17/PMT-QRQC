import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../views/LoginScreen';
import MainTabs from './bottomNav';
import MainDash from '../views/MainDash';
import Quality from '../views/Quality';
import MainScreen from '../views/MainScreen';
import SecondProd from '../views/SecondProd';
import Dashboard from '../views/Dashboard';
import DetailQrQC from '../views/DetailQrQC';
import AddNewQRQC from '../views/AddNewQRQC';
import ReasonScreen from '../views/ReasonScreen';
import AddNewAction from '../views/AddActions';
import Audit from '../views/Audit';
import DetailsAudit from '../views/DetailsAudit';
import Profile from '../views/Profile';
import AdminSettings from '../views/AdminSettings';

const Stack = createNativeStackNavigator();
const MainNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainDash} />
      <Stack.Screen name="Prod" component={MainScreen} />
      <Stack.Screen name="Second" component={SecondProd} />
      <Stack.Screen name="RH" component={Dashboard} />
      <Stack.Screen name="QRQC" component={Quality} />
      <Stack.Screen name="Details" component={DetailQrQC} />
      <Stack.Screen name="AddNew" component={AddNewQRQC} />
      <Stack.Screen name="Reason" component={ReasonScreen} />
      <Stack.Screen name="Action" component={AddNewAction} />
      <Stack.Screen name="Audit" component={Audit} />
      <Stack.Screen name="DetailsAudit" component={DetailsAudit} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={AdminSettings} />
    </Stack.Navigator>
  );
};

export default MainNav;

const styles = StyleSheet.create({});
