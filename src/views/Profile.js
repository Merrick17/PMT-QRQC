import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../styles/globalStyles';
import AlertComp from '../components/AlertComp';
import {Switch, Fab, Icon} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AddAlertModal from '../components/AddAlertModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAlertsByReceiverApi,
  getAlertsBySenderApi,
} from '../redux/actions/alert.action';
import CorrectAlertComp from '../components/CorrectAlertComp';
const Profile = () => {
  const [selected, setSelected] = useState(false);
  const [showAddModal, setShowModal] = useState(false);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [selectedError, setSelectedError] = useState(null);
  const {userInfo} = useSelector(state => state.auth);
  const {list} = useSelector(state => state.alert);
  const dispatch = useDispatch();
  const handleFix = value => {
    setSelectedError(value);
    setShowCorrectModal(true);
  };
  useEffect(() => {
    if (selected) {
      dispatch(getAlertsBySenderApi(userInfo.MATRIC));
    } else {
      console.log('USER INFO', userInfo);
      dispatch(getAlertsByReceiverApi(userInfo.MATRIC));
    }
  }, [selected]);
  return (
    <View style={globalStyles.container}>
      <CorrectAlertComp
        showModal={showCorrectModal}
        closeModal={() => {
          setShowCorrectModal(false);
        }}
        errorId={selectedError && selectedError.id_alert}
        selected={selected}
        senderId={selectedError && selectedError.sender_mat}
        receiverId={selectedError && selectedError.receiver_mat}
      />
      <AddAlertModal
        showModal={showAddModal}
        closeModal={() => {
          setShowModal(false);
        }}
        selected={selected}
      />
      <View style={styles.header}>
        <Text style={styles.labelStyle}>Alerts</Text>
      </View>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View style={styles.trsButtons}>
          <TouchableOpacity
            style={selected ? styles.btnTypeSelected : styles.btnType}
            onPress={() => {
              setSelected(true);
            }}>
            <Text style={styles.btnLabel}>Alerts Envoyé</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={!selected ? styles.btnTypeSelected : styles.btnType}
            onPress={() => {
              setSelected(false);
            }}>
            <Text style={styles.btnLabel}>Alerts Reçu</Text>
          </TouchableOpacity>
        </View>
        {/* <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          style={{
            width: '100%',
            height: Dimensions.get('screen').height * 0.5,
          }}>
          {list.map(elm => (
            <AlertComp
              key={elm.id_alert.toString()}
              item={elm}
              handleFix={handleFix}
              selected={selected}
            />
          ))}
        </ScrollView> */}
        <View style={{width: '100%', height: 750}}>
          <FlatList
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            data={list}
            scrollEnabled={true}
            renderItem={({item}) => (
              <AlertComp
                key={item.id_alert.toString()}
                item={item}
                handleFix={handleFix}
                selected={selected}
              />
            )}
          />
        </View>
        {/* <FlatList
          contentContainerStyle={{
            width: '100%',
            height: '100%',
            backgroundColor: 'red',
          }}
          renderItem={({item}) =>}
          style={{width: '100%', height: '100%'}}
        /> */}
      </View>
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

export default Profile;

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
