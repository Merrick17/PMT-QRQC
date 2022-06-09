import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {ScrollView} from 'native-base';
import TRSComp from '../components/TRSComp';
import {useSelector, useDispatch} from 'react-redux';
import {Fab} from 'native-base';
import TempsEfficient from '../components/TempsEfficient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RebusComp from '../components/RebusComp';
import OtdComp from '../components/OTDComp';
const SecondProd = () => {
  const {showModal, selectedModal} = useSelector(state => state.modal);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView
        style={{height: '100%', width: '100%'}}
        contentContainerStyle={styles.homeContainer}>
        <View style={styles.header}>
          <Text style={styles.labelStyle}>Taux de Rebut</Text>
        </View>
        <RebusComp type={'jours'} />
        <View style={styles.header}>
          <Text style={styles.labelStyle}>OTD  </Text>
        </View>
        <OtdComp />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SecondProd;

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
    justifyContent: 'flex-start',
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
