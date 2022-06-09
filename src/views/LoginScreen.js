import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {Input, theme, Button} from 'galio-framework';
import {Center, Box, View} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import {loginUserApi} from '../redux/actions/auth.action';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {useToast} from 'react-native-toast-notifications';
import Spinner from 'react-native-loading-spinner-overlay';
const LoginScreen = ({navigation}) => {
  const [fcmToken, setFcmToken] = useState('');
  const {loading} = useSelector(state => state.auth);
  const toast = useToast();
  const checkToken = async () => {
    const deviceToken = await messaging().getToken();
    if (deviceToken) {
      console.log('Token', deviceToken);
      setFcmToken(deviceToken);
    }
  };
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      matricule: '',
      password: '',
    },
  });
  const onSubmit = data => {
    console.log(data);
    let body = {...data, deviceToken: fcmToken};
    dispatch(loginUserApi(body, navigation, toast));
  };
  useEffect(() => {
    checkToken();
  }, []);
  const loginUser = () => {
    navigation.replace('Main');
  };
  return (
    <SafeAreaView style={globalStyles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.companyLogo}
      />
      <Spinner
        visible={loading}
        textContent={'Veuillez Patienter..'}
        textStyle={styles.spinnerTextStyle}
      />
      <Center mt={3} style={styles.inputContainer}>
        <Box alignItems="center">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Matricule"
                borderless
                color={theme.COLORS.WARNING}
                style={{borderColor: theme.COLORS.WARNING, height: 65}}
                placeholderTextColor={'#FFF'}
                bgColor="rgba(0,0,0,0.4)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="matricule"
          />
          {errors.matricule && (
            <Text style={{color: 'red', margin: 3, alignSelf: 'flex-start'}}>
              Champ Obligatoire.
            </Text>
          )}
        </Box>
        <Box alignItems="center" marginTop={5}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Mot de passe"
                borderless
                color={theme.COLORS.WARNING}
                style={{borderColor: theme.COLORS.WARNING, height: 65}}
                placeholderTextColor={'#FFF'}
                password={true}
                bgColor="rgba(0,0,0,0.4)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={{color: 'red', margin: 3, alignSelf: 'flex-start'}}>
              Champ Obligatoire.
            </Text>
          )}
        </Box>
        <Box alignItems={'center'} marginTop={5}>
          <Button
            color="warning"
            round
            onPress={handleSubmit(onSubmit)}
            style={{width: 360, height: 60}}>
            Se Connecter
          </Button>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  label: {
    color: '#000',
  },
  companyLogo: {
    width: 350,
    height: 250,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginRight: '5%',
  },
  inputContainer: {
    width: 500,
  },
  inputStyle: {
    width: 350,
  },
  spinnerTextStyle: {
    fontSize: 17,
    color: '#FFF',
  },
});
