import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Modal, FormControl, Button} from 'native-base';
import {Input, theme} from 'galio-framework';
import {useDispatch} from 'react-redux';
import {addAuditApi} from '../redux/actions/audit.action';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';
const AddAuditModal = ({showModal, closeModal}) => {
  const toast = useToast();
  const [desc, setDesc] = useState('');
  const [duree, setDuree] = useState('');
  const dispatch = useDispatch();
  const addNewTask = () => {
    dispatch(
      addAuditApi(
        {
          task: desc,
          duration: duree,
          date_ajout: moment(Date.now()).format('YYYY-MM-DD'),
        },
        toast,
      ),
    );
    closeModal();
  };

  return (
    <View>
      <Modal isOpen={showModal} onClose={closeModal}>
        <Modal.Content maxWidth="400px" style={{backgroundColor: '#334155'}}>
          <Modal.CloseButton />
          <Modal.Header>
            <Text style={{color: '#FFF', fontWeight: '700', fontSize: 24}}>
              Ajouter Nouveau Formulaire
            </Text>
          </Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>
                <Text style={{color: '#FFF', fontWeight: '700', fontSize: 17}}>
                  Description
                </Text>
              </FormControl.Label>
              <Input
                placeholder="Description"
                borderless
                color={theme.COLORS.WARNING}
                style={{borderColor: theme.COLORS.WARNING, height: 65}}
                placeholderTextColor={'#FFF'}
                bgColor="rgba(0,0,0,0.4)"
                value={desc}
                onChangeText={text => {
                  setDesc(text);
                }}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>
                <Text style={{color: '#FFF', fontWeight: '700', fontSize: 17}}>
                  Durée
                </Text>
              </FormControl.Label>
              <Input
                placeholder="Durée"
                borderless
                color={theme.COLORS.WARNING}
                style={{borderColor: theme.COLORS.WARNING, height: 65}}
                placeholderTextColor={'#FFF'}
                bgColor="rgba(0,0,0,0.4)"
                value={duree}
                onChangeText={text => {
                  setDuree(text);
                }}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer style={{backgroundColor: '#334155'}}>
            <View
              style={{
                justifyContent: 'space-evenly',
                alignItems: 'flex-end',
                flexDirection: 'row',
                width: '100%',
              }}>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => {
                  setDesc('');
                  setDuree('');
                  closeModal();
                }}>
                <Text style={styles.btnLabel}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.consultBtn} onPress={addNewTask}>
                <Text style={styles.btnLabel}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default AddAuditModal;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FDBA74',
    width: '100%',
    height: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: 24,
    color: '#FFF',
  },
  card: {
    width: '90%',
    height: 200,
    backgroundColor: '#FFF7ED',
    marginVertical: 10,
    borderWidth: 3,
    marginLeft: 50,
    borderRadius: 10,
  },

  errorIcon: {
    margin: 5,
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
    margin: 10,
  },
  errorDesc: {
    fontSize: 16,
    margin: 10,
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  consultBtn: {
    width: 120,
    height: 50,
    backgroundColor: '#F97316',
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
  },
  deleteBtn: {
    width: 120,
    height: 50,
    backgroundColor: '#BE123C',
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
  },
  footer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  btnLabel: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
