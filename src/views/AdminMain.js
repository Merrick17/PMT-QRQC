import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {ScrollView} from 'native-base';
import TRSComp from '../components/TRSComp';
import {useSelector, useDispatch} from 'react-redux';
import {Fab} from 'native-base';
import TempsEfficient from '../components/TempsEfficient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const AdminMain = ({navigation}) => {
  const {showModal, selectedModal} = useSelector(state => state.modal);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView
        style={{height: '100%', width: '100%'}}
        contentContainerStyle={styles.homeContainer}>
        <View style={styles.header}>
          <Text style={styles.labelStyle}>Taux de Rendement Synthétique</Text>
        </View>
        <TRSComp type={'jours'} />
        <View style={styles.header}>
          <Text style={styles.labelStyle}>Temps Efficient Globale (Mois) </Text>
        </View>
        <TempsEfficient />
        {/* <View style={styles.header}>
          <Text style={styles.labelStyle}>Temps de Rebut</Text>
        </View> */}
      </ScrollView>
      <Fab
        backgroundColor={'#FDBA74'}
        renderInPortal={false}
        icon={<MaterialIcon color={'#FFF'} name="navigate-next" size={40} />}
        color={'#FFF'}
        onPress={() => {
          navigation.navigate('Second');
        }}
      />
    </SafeAreaView>
  );
};

export default AdminMain;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FDBA74',
    width: '100%',
    height: 70,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  labelStyle: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  trsView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    height: 400,
    width: '100%',
  },
  trsButtons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '50%',
  },
});
