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
import {
  deleteDetailsApi,
  editDetails,
  getAuditDetailsApi,
  getAuditListApi,
} from '../redux/actions/audit.action';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Fab, Icon} from 'native-base';
import moment from 'moment';
import AddTaskModal from '../components/AddTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import {useToast} from 'react-native-toast-notifications';
const DetailsAudit = ({navigation, route}) => {
  const [showAddModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const {detailsList} = useSelector(state => state.audit);
  const [idTask, setIdTask] = useState(0);
  useEffect(() => {
    let {id} = route.params;
    console.log('ID', id);
    setIdTask(id);
    dispatch(getAuditDetailsApi(id));
  }, []);
  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.labelStyle}>Details Audit</Text>
      </View>
      <AddTaskModal
        showModal={showAddModal}
        id_audit={idTask}
        closeModal={() => {
          setShowModal(false);
        }}
      />
      <EditTaskModal
        showModal={showEditModal}
        closeModal={() => {
          setShowEditModal(false);
        }}
      />
      <FlatList
        data={detailsList}
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
              <Text style={styles.errorText}>{item.description}</Text>
            </View>
            <View>
              {/* <Text style={styles.errorDesc}>{item.duration}</Text> */}
            </View>
            <View style={styles.footer}>
              <View style={styles.dateView}>
                <MaterialIcon
                  name="date-range"
                  size={35}
                  style={styles.errorIcon}
                />
                <Text>
                  {item.date_desc &&
                    moment(item.date_desc).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '50%',
                }}>
                <TouchableOpacity
                  style={styles.consultBtn}
                  onPress={() => {
                    setShowEditModal(true);
                    dispatch(editDetails(item));
                  }}>
                  <MaterialIcon name="content-copy" color={'#FFF'} />
                  <Text style={styles.btnLabel}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => {
                    //consultDetails(item);
                    dispatch(
                      deleteDetailsApi(item.id_details, item.id_tache, toast),
                    );
                  }}>
                  <MaterialIcon name="content-copy" color={'#FFF'} />
                  <Text style={styles.btnLabel}>Supprimer</Text>
                </TouchableOpacity>
              </View>
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

export default DetailsAudit;

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
    width: 120,
    height: 50,
    backgroundColor: '#BE123C',
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
