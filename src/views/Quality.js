import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {globalStyles} from '../styles/globalStyles';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Fab, FlatList, Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {deleteQrQcApi, getAllQrQcApi} from '../redux/actions/qrqc.actions';
import {NavBar} from 'galio-framework';
import moment from 'moment';
import {ADD_NEW_QRQC_SUCCESS} from '../redux/actionTypes';
const Quality = ({route, navigation}) => {
  const {list} = useSelector(state => state.qrqc);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllQrQcApi());
  }, []);
  const consultDetails = item => {
    dispatch({type: ADD_NEW_QRQC_SUCCESS, payload: item});
    navigation.navigate('Details', {
      model: item,
    });
  };
  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.labelStyle}>Tableau QRQC</Text>
      </View>
      <FlatList
        data={list}
        style={{
          width: '100%',
          height: 400,
          alignSelf: 'center',
          alignContent: 'center',
        }}
        renderItem={({item}) => (
          <View style={styles.card} key={item.id_qrqc}>
            <View style={styles.cardHeader}>
              <MaterialIcon
                name="error-outline"
                size={45}
                style={styles.errorIcon}
              />
              <Text style={styles.errorText}>
                Erreur à la position {item.Service}
              </Text>
            </View>
            <View>
              <Text style={styles.errorDesc}>{item.desc_prob}</Text>
            </View>
            <View style={styles.footer}>
              <View style={styles.dateView}>
                <MaterialIcon
                  name="date-range"
                  size={35}
                  style={styles.errorIcon}
                />
                <Text>
                  {item.Date_probleme &&
                    moment(item.Date_probleme).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View
                style={{
                  width: '40%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  style={styles.consultBtn}
                  onPress={() => {
                    consultDetails(item);
                  }}>
                  <MaterialIcon name="content-copy" color={'#FFF'} />
                  <Text style={styles.btnLabel}>Consulter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => {
                    dispatch(deleteQrQcApi(item.id_qrqc));
                  }}>
                  <MaterialIcon name="delete" color={'#FFF'} />
                  <Text style={styles.btnLabel}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <Fab
        onPress={() => {
          navigation.navigate('AddNew');
        }}
        backgroundColor="#F97316"
        renderInPortal={false}
        shadow={2}
        placement="bottom-right"
        size="md"
        icon={
          <Icon color="white" as={MaterialIcon} name="add-alert" size="4" />
        }
        label="Ajouter nouveau"
        color={'#F97316'}
      />
    </View>
  );
};

export default Quality;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FDBA74',
    width: '100%',
    height: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: 24,
    color: '#FFF',
  },
  card: {
    width: 670,
    height: 200,
    backgroundColor: '#FFF7ED',
    marginVertical: 10,
    borderWidth: 3,
    marginLeft: 50,
    borderRadius: 10,
  },

  errorIcon: {
    margin: 5,
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
    margin: 10,
  },
  errorDesc: {
    fontSize: 16,
    margin: 10,
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  consultBtn: {
    width: 120,
    height: 50,
    backgroundColor: '#F97316',
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
  },
  deleteBtn: {
    backgroundColor: '#BE123C',
    width: 120,
    height: 50,
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
  },
  footer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  btnLabel: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
