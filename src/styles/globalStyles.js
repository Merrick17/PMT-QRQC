import {StyleSheet, Dimensions} from 'react-native';
const globalStyles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0B1326',
  },
});

export {globalStyles};
