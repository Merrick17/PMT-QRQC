import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory-native';
import {Modal, Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {getPosteHistoryApi} from '../redux/actions/modal.action';
const HistoryModal = ({showModal, closeModal}) => {
  const {data, selectedPoste} = useSelector(state => state.modal);

  return (
    <View>
      <Modal isOpen={showModal} onClose={closeModal}>
        <Modal.Content maxWidth="450px">
          <Modal.CloseButton />
          <Modal.Header>{selectedPoste}</Modal.Header>
          <Modal.Body style={{width: '100%'}}>
            <View style={styles.content}>
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine
                  style={{
                    data: {stroke: '#c43a31'},
                    parent: {border: '1px solid #ccc'},
                  }}
                  data={data}
                  x="mois"
                  y="trs"
                />
              </VictoryChart>
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                onPress={() => {
                  closeModal();
                }}>
                OK
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default HistoryModal;

const styles = StyleSheet.create({
  content: {
    margin: 10,
  },
});
