import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {deleteObjectifApi} from '../redux/actions/objectif.actions';

const ObjectifComp = ({item, handleEdit}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>
          Machine: {item && item.Machine} / Objectif: {item && item.pourcentage}{' '}
        </Text>
        <Text style={styles.label}>Responsable: {item && item.resp}</Text>
        <Text style={styles.label}>Type: {item && item.type}</Text>
      </View>
      <View style={styles.btnContainer}>
        <View
          style={{
            width: '40%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            style={styles.consultBtn}
            onPress={() => {
              handleEdit(item);
            }}>
            <MaterialIcon name="content-copy" color={'#FFF'} />
            <Text style={styles.btnLabel}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => {
              // dispatch(deleteQrQcApi(item.id_qrqc));
              dispatch(deleteObjectifApi(item.id_objectif));
            }}>
            <MaterialIcon name="delete" color={'#FFF'} />
            <Text style={styles.btnLabel}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ObjectifComp;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 150,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 10,
    padding: 5,
    justifyContent: 'space-evenly',
    backgroundColor: '#FFF7ED',
    borderRadius: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    fontSize: 14,
  },
});
