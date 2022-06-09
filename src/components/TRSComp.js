import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Button, FlatList, Modal} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {getTrsInfo, getTrsInfoApi} from '../redux/actions/trs.actions';
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
  DangerPath,
} from 'react-native-cool-speedometer';
import HistoryModal from './HistoryModal';
import {SHOW_MODAL} from '../redux/actionTypes';
import {getPosteHistoryApi} from '../redux/actions/modal.action';
const TRSComp = () => {
  const [type, setType] = useState('day');

  const dispatch = useDispatch();
  const {data} = useSelector(state => state.trs);

  useEffect(() => {
    dispatch(getTrsInfoApi(type));
    // console.log('Data', data);
  }, [type]);
  const displayColor = value => {
    if (value < 40) {
      return 'red';
    } else if (value > 40 && value < 75) {
      return 'yellow';
    } else {
      return 'green';
    }
  };
  return (
    <View style={styles.trsView}>
      <View style={styles.trsButtons}>
        <TouchableOpacity
          style={type == 'day' ? styles.btnTypeSelected : styles.btnType}
          onPress={() => {
            setType('day');
          }}>
          <Text style={styles.btnLabel}>Par Jours</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={type == 'week' ? styles.btnTypeSelected : styles.btnType}
          onPress={() => {
            setType('week');
          }}>
          <Text style={styles.btnLabel}>Par Semaine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={type == 'month' ? styles.btnTypeSelected : styles.btnType}
          onPress={() => {
            setType('month');
          }}>
          <Text style={styles.btnLabel}>Par Mois</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{width: '100%', marginTop: 20}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {data.map((item, index) => (
          <View style={styles.speedoMeter}>
            <View
              style={{
                width: '100%',
                justifyContent: 'space-evenly',
                backgroundColor: '#FFF7ED',
                flexDirection: 'row',
                height: 70,
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <Text style={{color: '#000', fontSize: 24}}>
                Poste Charge : {item.Poste_charge}
              </Text>
              <Text style={{color: '#000', fontSize: 24}}>
                Objectif: {item.objectif && item.objectif.pourcentage}
              </Text>
            </View>
            <Speedometer
              width={450}
              height={250}
              key={index.toString()}
              value={item.trs}
              max={100}
              angle={160}
              fontFamily="squada-one">
              <Background angle={180} color={'rgba(255,255,255,0.5)'} />
              <Arc col />
              <Needle />
              <Progress color={displayColor(item.trs)} />
              <Marks />
              <Indicator>
                {(value, textProps) => (
                  <Text
                    {...textProps}
                    fontSize={60}
                    fill="#FFF"
                    x={250 / 2}
                    y={210}
                    textAnchor="middle"
                    fontFamily="squada-one">
                    {value}%
                  </Text>
                )}
              </Indicator>
            </Speedometer>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TRSComp;

const styles = StyleSheet.create({
  trsView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    maxHeight: 430,
    width: 700,
    marginLeft: 30,
  },
  trsButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  speedoMeter: {
    width: '100%',
    height: 450,
    marginBottom: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // borderColor: '#FFF',
    // borderWidth: 2,
    margin: 40,
    alignContent: 'center',
  },
  speedLabel: {
    color: '#0000',
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
