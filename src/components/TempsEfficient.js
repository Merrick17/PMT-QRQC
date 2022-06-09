import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTempsEfficentApi} from '../redux/actions/trs.actions';
import {VictoryTheme, VictoryChart, VictoryBar} from 'victory-native';
const TempsEfficient = () => {
  const dispatch = useDispatch();
  const {tempsEfficient} = useSelector(state => state.trsGlobal);
  useEffect(() => {
    dispatch(getTempsEfficentApi());
  }, []);
  return (
    <View>
      <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
        <VictoryBar
          style={{data: {fill: '#c43a31'}}}
          data={tempsEfficient}
          x={'mois'}
          y={'total_temps_efficient'}
        />
      </VictoryChart>
    </View>
  );
};

export default TempsEfficient;

const styles = StyleSheet.create({});
