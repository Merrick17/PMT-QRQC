import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {getAuditListApi} from '../redux/actions/audit.action';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Fab, Icon} from 'native-base';
import moment from 'moment';
import AddAuditModal from '../components/AddAuditModal';
const Audit = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [showAddModal, setShowModal] = useState(false);
  const {auditList} = useSelector(state => state.audit);
  const consultDetails = item => {
    navigation.navigate('DetailsAudit', {
      id: item.id_tache,
    });
  };
  useEffect(() => {
    dispatch(getAuditListApi());
  }, []);
  return (
    <View style={globalStyles.container}>
      <AddAuditModal
        showModal={showAddModal}
        closeModal={() => {
          setShowModal(false);
        }}
      />
      <View style={styles.header}>
        <Text style={styles.labelStyle}>Gestion des Audit</Text>
      </View>
      <FlatList
        data={auditList}
        style={{
          width: '100%',
          height: 400,
          alignSelf: 'center',
          alignContent: 'center',
        }}
        renderItem={({item}) => (
          <View style={styles.card} key={item.id_tache.toString()}>
            <View style={styles.cardHeader}>
              <MaterialIcon
                name="error-outline"
                size={45}
                style={styles.errorIcon}
              />
              <Text style={styles.errorText}>
                {item.tache}/({item.duration})
              </Text>
            </View>

            <View style={styles.footer}>
              <View style={styles.dateView}>
                <MaterialIcon
                  name="date-range"
                  size={35}
                  style={styles.errorIcon}
                />
                <Text>
                  {item.date_ajout &&
                    moment(item.date_ajout).format('DD/MM/YYYY')}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.consultBtn}
                onPress={() => {
                  consultDetails(item);
                }}>
                <MaterialIcon name="content-copy" color={'#FFF'} />
                <Text style={styles.btnLabel}>Consulter</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Fab
        onPress={() => {
          setShowModal(true);
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

export default Audit;

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
    width: '90%',
    height: 150,
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
