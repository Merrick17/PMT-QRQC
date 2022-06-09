import {StyleSheet, FlatList, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAbsentInfoApi} from '../redux/actions/absent.action';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryLegend,
  VictoryBar,
} from 'victory-native';
const AbsentComp = () => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.absent);

  useEffect(() => {
    dispatch(getAbsentInfoApi());
  }, []);
  return (
    <View style={styles.absentView}>
      {data && (
        <FlatList
          numColumns={2}
          horizontal={false}
          nestedScrollEnabled
          data={data}
          renderItem={({item, index}) => {
            console.log('Data', item[0].Matricule);
            return (
              <View style={styles.container}>
                <Text style={styles.textLabel}>{item.Matricule}</Text>
                <View>
                  <VictoryChart
                    theme={VictoryTheme.material}
                    key={index.toString()}>
                    <VictoryLegend
                      x={175}
                      y={70}
                      title={'Matricule employée'}
                      centerTitle
                      orientation="horizontal"
                      gutter={20}
                      style={{border: {stroke: 'black'}, title: {fontSize: 20}}}
                      data={[{name: item[0].Matricule}]}
                    />
                    <VictoryBar
                      style={{
                        data: {fill: '#c43a31'},
                        parent: {border: '1px solid #ccc'},
                      }}
                      data={item}
                      x="mois"
                      y={'moyenne'}
                    />
                  </VictoryChart>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default AbsentComp;

const styles = StyleSheet.create({
  absentView: {
    width: '100%',
    height: 700,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  container: {
    width: '100%',
    height: 350,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 4,
  },
  textLabel: {
    fontSize: 17,
    marginLeft: 30,
    backgroundColor: 'red',
  },
});
