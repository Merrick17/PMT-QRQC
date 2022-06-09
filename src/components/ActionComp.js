import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ActionComp = ({action}) => {
  return (
    <View style={styles.container}>
      <Text>{action && action.type_action}</Text>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text>Quantité en cours:{action && action.qte_en_cours}</Text>
        <Text>
          Quantité en cours N/F: {action && action.qte_en_cours_non_conforme}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text>Quantité Magasin:{action && action.qte_magasin}</Text>
        <Text>
          Quantité Magasin en cours N/F:
          {action && action.qte_magasin_non_conforme}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text>Quantité Client: {action && action.qte_stock_client}</Text>
        <Text>
          Quantité Client N/F : {action && action.qte_stock_client_non_conforme}
        </Text>
      </View>
    </View>
  );
};

export default ActionComp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 10,
    padding: 5,
    justifyContent: 'space-evenly',
   
  },
});
