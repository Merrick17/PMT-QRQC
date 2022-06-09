import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Button, FlatList, Modal} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  getTrsGlobalApi,
  getTrsInfo,
  getTrsInfoApi,
} from '../redux/actions/trs.actions';
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
const TRSGlobalComp = () => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.trsGlobal);
  const [type, setType] = useState('type');

  useEffect(() => {
    dispatch(getTrsGlobalApi());
    // console.log('Data', data);
  }, []);
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
      <FlatList
        data={data}
        style={{
          width: '100%',
          alignSelf: 'center',
        }}
        nestedScrollEnabled
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
        }}
        numColumns={2}
        horizontal={false}
        renderItem={({item, index}) => {
          // console.log('Item', item);
          return (
            <View style={styles.speedoMeter}>
              <Text>{item.mois}</Text>
              <Speedometer
                key={index.toString()}
                value={item.trsGlobal}
                max={100}
                angle={160}
                fontFamily="squada-one">
                <Background angle={180} />
                <Arc col />
                <Needle />
                <Progress color={displayColor(item.trsGlobal)} />
                <Marks />
                <Indicator>
                  {(value, textProps) => (
                    <Text
                      {...textProps}
                      fontSize={60}
                      fill="#555"
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
          );
        }}
      />
    </View>
  );
};

export default TRSGlobalComp;

const styles = StyleSheet.create({
  trsView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    maxHeight: 430,
    width: 700,
  },
  trsButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  speedoMeter: {
    width: 500,
    height: 450,
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
