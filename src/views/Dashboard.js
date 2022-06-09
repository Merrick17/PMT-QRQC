import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import React, {useEffect} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';
import {Button, ScrollView} from 'native-base';
import TRSComp from '../components/TRSComp';
import {useDispatch} from 'react-redux';
import {getAbsentInfoApi} from '../redux/actions/absent.action';
import AbsentComp from '../components/AbsentComp';

const Dashboard = () => {
  const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000},
  ];

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.labelStyle}>Taux d'absentisme</Text>
      </View>
      <AbsentComp />
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FDBA74',
    width: '100%',
    height: 100,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: 24,
    color: '#FFF',
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
