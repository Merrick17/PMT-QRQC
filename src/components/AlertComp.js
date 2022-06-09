import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {ALERT_TYPE, Dialog, Root, Toast} from 'react-native-alert-notification';
const AlertComp = ({item, handleFix, selected}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            backgroundColor: '#EA580C',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 24, color: '#FFF', fontWeight: 'bold'}}>
            {item && item.id_alert}
          </Text>
        </View>
        <Text style={styles.headerTitle}>{item && item.title}</Text>
        {item.status == 'EN COURS' ? (
          <MaterialIcon
            name="error"
            size={50}
            color="#C2410C"
            style={{
              alignSelf: 'flex-end',
              position: 'absolute',
              top: 15,
              right: 20,
            }}
          />
        ) : (
          <MaterialIcon
            name="verified-user"
            size={50}
            color="#C2410C"
            style={{
              alignSelf: 'flex-end',
              position: 'absolute',
              top: 15,
              right: 20,
            }}
          />
        )}
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-start',
          paddingLeft: 20,
          marginBottom: 15,
        }}>
        <Text style={{fontSize: 17}}>{item && item.description}</Text>
      </View>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingLeft: 20,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialIcon name="date-range" size={30} />
          <Text style={{fontSize: 17, marginLeft: 10}}>
            {item && moment(item.created_at).format('DD/MM/YYYY hh:mm')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 30,
          }}>
          <MaterialIcon name="supervised-user-circle" size={30} />
          <Text style={{fontSize: 17, marginLeft: 10}}>
            {selected
              ? `${item.sender.NOMPER && item.sender.PRENOM}`
              : `${item.receiver.NOMPER && item.receiver.PRENOM}`}
          </Text>
        </View>
        {!selected && item.status == 'EN COURS' && (
          <TouchableOpacity
            style={styles.btnTypeSelected}
            onPress={() => {
              handleFix(item);
            }}>
            <Text style={styles.btnLabel}>Corriger</Text>
          </TouchableOpacity>
        )}
        {item.status == 'TERMINER' && (
          <TouchableOpacity
            style={styles.btnTypeSelected}
            onPress={() => {
              Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: item && item.title,
                textBody: item && item.correction_desc,
                button: 'close',
              });
            }}>
            <Text style={styles.btnLabel}>Consulter</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AlertComp;

const styles = StyleSheet.create({
  mainContainer: {
    width: 700,
    height: 170,
    backgroundColor: '#FFF7ED',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 15,
    borderRadius: 20,
  },
  header: {
    width: '100%',
    justifyContent: 'flex-start',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  image: {
    height: 180,
    width: 350,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  btnTypeSelected: {
    width: '30%',
    height: 70,
    backgroundColor: '#EA580C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    right: 10,
    bottom: 150,
  },
  btnLabel: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
