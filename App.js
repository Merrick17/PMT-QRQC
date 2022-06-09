import {StyleSheet, Dimensions, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, Text, Box, View} from 'native-base';
import messaging from '@react-native-firebase/messaging';
import {ALERT_TYPE, Dialog, Root, Toast} from 'react-native-alert-notification';
import {ToastProvider} from 'react-native-toast-notifications';
import {NavigationContainer} from '@react-navigation/native';
import MainNav from './src/navigation/mainNav';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();
const App = () => {
  const [loading, setLoading] = useState(true);
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Token', fcmToken);
    }
  };
  useEffect(() => {
    checkToken();
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Message', remoteMessage);
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      //navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('Message', remoteMessage);
        if (remoteMessage) {
          // console.log(
          //   'Notification caused app to open from quit state:',
          //   remoteMessage.notification,
          // );
          Alert.alert('Notification');
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Root theme="dark">
      <ToastProvider>
        <Provider store={store}>
          <NativeBaseProvider>
            <NavigationContainer>
              <MainNav />
            </NavigationContainer>
          </NativeBaseProvider>
        </Provider>
      </ToastProvider>
    </Root>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#FFF',
  },
});
