import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {Box, Select, Button} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {getAllUsersApi} from '../redux/actions/users.action';
import moment from 'moment';
import {useForm, Controller} from 'react-hook-form';
import {addNewActionApi, addNewQRQCApi} from '../redux/actions/qrqc.actions';
import {Input, theme} from 'galio-framework';
import {useToast} from 'react-native-toast-notifications';
const AddNewAction = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {userList} = useSelector(state => state.users);
  const toast = useToast();
  useEffect(() => {
    console.log('Item', route);
    // dispatch(getAllUsersApi());
  }, []);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      type_action: '',

      qte_en_cours: '',
      qte_en_cours_non_conforme: '',
      qte_magasin: '',
      qte_magasin_non_conforme: '',
      qte_stock_client: '',
      qte_stock_client_non_conforme: '',
    },
  });

  const {newQrQc} = useSelector(state => state.qrqc);

  const onSubmit = data => {
    console.log('Data', data);
    console.log('QRQC', newQrQc);
    let body = {
      ...data,
      id_probleme: newQrQc.id_qrqc,
    };
    dispatch(addNewActionApi(body, toast));
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Action de correction</Text>
      </View>

      <View
        style={{
          padding: 10,
          justifyContent: 'flex-start',
          flex: 1,
          width: '100%',
        }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              borderless
              color={theme.COLORS.WARNING}
              style={{
                borderColor: theme.COLORS.WARNING,
                height: 65,
                width: '100%',
              }}
              placeholderTextColor={'#FFF'}
              password={false}
              bgColor="rgba(0,0,0,0.4)"
              placeholder="Type"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="type_action"
        />
        {errors.Service && (
          <Text style={styles.errorLabel}>Champ obligatoire.</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              borderless
              color={theme.COLORS.WARNING}
              style={{borderColor: theme.COLORS.WARNING, height: 65}}
              placeholderTextColor={'#FFF'}
              password={false}
              bgColor="rgba(0,0,0,0.4)"
              placeholder="Quantité en cours"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="qte_en_cours"
        />
        {errors.NumArticle && (
          <Text style={styles.errorLabel}>Champ obligatoire.</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              borderless
              color={theme.COLORS.WARNING}
              style={{borderColor: theme.COLORS.WARNING, height: 65}}
              placeholderTextColor={'#FFF'}
              password={false}
              bgColor="rgba(0,0,0,0.4)"
              placeholder="Quantité en cours non conforme"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="qte_en_cours_non_conforme"
        />
        {errors.NumOf && (
          <Text style={styles.errorLabel}>Champ obligatoire.</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              borderless
              color={theme.COLORS.WARNING}
              style={{borderColor: theme.COLORS.WARNING, height: 65}}
              placeholderTextColor={'#FFF'}
              password={false}
              bgColor="rgba(0,0,0,0.4)"
              placeholder="Quantité Magasin"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="qte_magasin"
        />
        {errors.desc_prob && (
          <Text style={styles.errorLabel}>Champ obligatoire.</Text>
        )}
        {errors.raison_defaut && (
          <Text style={styles.errorLabel}>Champ obligatoire.</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              borderless
              color={theme.COLORS.WARNING}
              style={{borderColor: theme.COLORS.WARNING, height: 65}}
              placeholderTextColor={'#FFF'}
              password={false}
              bgColor="rgba(0,0,0,0.4)"
              placeholder="Quantité Magasin non conforme"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="qte_magasin_non_conforme"
        />
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              borderless
              color={theme.COLORS.WARNING}
              style={{borderColor: theme.COLORS.WARNING, height: 65}}
              placeholderTextColor={'#FFF'}
              password={false}
              bgColor="rgba(0,0,0,0.4)"
              placeholder="Quantité de stock client"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="qte_stock_client"
        />
        {errors.moyenne_detection && (
          <Text style={styles.errorLabel}>Champ obligatoire.</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              borderless
              color={theme.COLORS.WARNING}
              style={{borderColor: theme.COLORS.WARNING, height: 65}}
              placeholderTextColor={'#FFF'}
              password={false}
              bgColor="rgba(0,0,0,0.4)"
              placeholder="Quantité de stock client non conforme"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="qte_stock_client_non_conforme"
        />
        {errors.qte_stock_client_non_conforme && (
          <Text style={styles.errorLabel}>Champ obligatoire.</Text>
        )}
      </View>

      <View style={styles.btnList}>
        <TouchableOpacity
          style={{
            width: '45%',
            height: 70,
            backgroundColor: '#EA580C',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}
          onPress={handleSubmit(onSubmit)}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFF'}}>
            Confirmer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '45%',
            height: 70,
            backgroundColor: '#BE123C',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}
          onPress={() => {
            navigation.pop();
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFF'}}>
            Annuler
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNewAction;

const styles = StyleSheet.create({
  problem: {
    width: '100%',
    minHeight: 550,
    marginTop: 25,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: '10%',
  },
  header: {
    backgroundColor: '#FDBA74',
    width: '100%',
    height: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 24,
    color: '#FFF',
  },
  btn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0284C7',
    height: 35,
    width: 250,
    padding: 10,
  },
  btnLabel: {
    color: '#FFF',
    alignSelf: 'center',
  },
  dateLabel: {
    fontSize: 24,
  },
  btnList: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  errorLabel: {
    color: 'red',
  },
});
