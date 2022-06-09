import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

const UserComp = ({label, service, handleEdit}) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <View
          style={{
            flexDirection: 'row',

            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            alignSelf: 'flex-start',
            marginLeft: 10,
          }}>
          <MaterialIcon
            name="info-outline"
            size={20}
            style={{marginRight: 10}}
          />
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>{service} </Text>
        </View>
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
            handleEdit();
          }}>
          <MaterialIcon name="content-copy" color={'#FFF'} />
          <Text style={styles.btnLabel}>Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => {
            // dispatch(deleteQrQcApi(item.id_qrqc));
          }}>
          <MaterialIcon name="delete" color={'#FFF'} />
          <Text style={styles.btnLabel}>Bloquer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserComp;

const styles = StyleSheet.create({
  mainContainer: {
    width: 700,
    height: 120,
    backgroundColor: '#FFF7ED',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 20,
  },
  image: {
    height: 140,
    width: 350,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
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
  btnLabel: {
    color: '#FFF',
  },
});
