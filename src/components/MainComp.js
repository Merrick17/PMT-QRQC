import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const MainComp = ({image, label, action}) => {
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={action}>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Image source={image} style={styles.image} />
    </TouchableOpacity>
  );
};

export default MainComp;

const styles = StyleSheet.create({
  mainContainer: {
    width: '90%',
    height: 120,
    backgroundColor: '#FFF7ED',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 20,
  },
  image: {
    height: 140,
    width: 350,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
