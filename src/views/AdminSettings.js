import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {getAllUsersApi} from '../redux/actions/users.action';
import {Fab} from 'native-base';
import UserComp from '../components/UserComp';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AddObjectifModal from '../components/AddObjectifModal';
import {getObjectifApi} from '../redux/actions/objectif.actions';
import ObjectifComp from '../components/ObjectifComp';
import EditObjectifModal from '../components/EditObjectifModal';
import {EDIT_USER_INFO, UPDATE_OBJECTIF} from '../redux/actionTypes';
import EditUserModal from '../components/EditUserComp.';
const AdminSettings = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const {userList} = useSelector(state => state.users);
  const {objectifList} = useSelector(state => state.objectif);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const handleEdit = item => {
    setShowEditModal(true);
    dispatch({
      type: UPDATE_OBJECTIF,
      payload: item,
    });
  };
  const handleEditUser = user => {
    setShowEditUser(true);
    dispatch({
      type: EDIT_USER_INFO,
      payload: user,
    });
  };
  useEffect(() => {
    dispatch(getAllUsersApi());
    dispatch(getObjectifApi());
  }, []);
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.labelStyle}>Paramètre</Text>
      </View>
      <AddObjectifModal
        showModal={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
      />
      <EditObjectifModal
        showModal={showEditModal}
        closeModal={() => {
          setShowEditModal(false);
        }}
      />
      <EditUserModal
        showModal={showEditUser}
        closeModal={() => {
          setShowEditUser(false);
        }}
      />
      <View style={styles.trsButtons}>
        <TouchableOpacity
          style={selected ? styles.btnTypeSelected : styles.btnType}
          onPress={() => {
            setSelected(true);
          }}>
          <Text style={styles.btnLabel}>Objectifs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={!selected ? styles.btnTypeSelected : styles.btnType}
          onPress={() => {
            setSelected(false);
          }}>
          <Text style={styles.btnLabel}>Utilisateur</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        style={{width: '100%', height: 1000}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {!selected
          ? userList &&
            userList.map(elm => (
              <UserComp
                label={`${elm.NOMPER} ${elm.PRENOM}`}
                service={elm.SERVICE}
                handleEdit={() => {
                  handleEditUser(elm);
                }}
              />
            ))
          : objectifList &&
            objectifList.map(elm => (
              <ObjectifComp item={elm} handleEdit={handleEdit} />
            ))}
      </ScrollView>
      {selected && (
        <Fab
          backgroundColor={'#FDBA74'}
          renderInPortal={false}
          icon={<MaterialIcon color={'#FFF'} name="add" size={40} />}
          color={'#FFF'}
          onPress={() => {
            setShowModal(true);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default AdminSettings;

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
    fontWeight: 'bold',
  },
  card: {
    width: '90%',
    height: 200,
    backgroundColor: '#FFF7ED',
    marginVertical: 10,
    borderWidth: 3,
    marginLeft: 50,
    borderRadius: 10,
    fontWeight: 'bold',
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
  trsView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxHeight: 400,
    width: '100%',

    // marginLeft: 30,
  },
  trsButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  speedoMeter: {
    width: 500,
    height: 650,
    marginBottom: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  speedLabel: {
    color: '#FFF',
    fontSize: 24,
  },
  btnStyle: {
    width: 70,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnType: {
    width: '30%',
    height: 70,
    backgroundColor: '#FB923C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  btnTypeSelected: {
    width: '30%',
    height: 70,
    backgroundColor: '#EA580C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  btnLabel: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
