import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getOtdApi, getTempsEfficentApi} from '../redux/actions/trs.actions';
import {VictoryTheme, VictoryChart, VictoryBar} from 'victory-native';
const OtdComp = () => {
  const dispatch = useDispatch();
  const {otdInfo} = useSelector(state => state.trsGlobal);
  useEffect(() => {
    dispatch(getOtdApi());
  }, []);
  return (
    <View>
      <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
        <VictoryBar
          style={{data: {fill: '#c43a31'}}}
          data={otdInfo}
          x={'mois'}
          y={'nbr'}
        />
      </VictoryChart>
    </View>
  );
};

export default OtdComp;

const styles = StyleSheet.create({});
