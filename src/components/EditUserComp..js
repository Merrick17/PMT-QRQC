import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Modal, FormControl, Select} from 'native-base';
import {Input, theme} from 'galio-framework';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserInfo} from '../redux/actions/users.action';
const EditUserModal = ({showModal, closeModal}) => {
  const [desc, setDesc] = useState('');
  const [resp, setResp] = useState('');
  const [poste, setPoste] = useState('PRODUCTION');

  const {selectedUser} = useSelector(state => state.users);
  //   const {selectedObjectif} = useSelector(state => state.objectif);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedUser) {
      //   setPoste(selectedUser.PASSWD);
      //   setResp(selectedObjectif.Matricule_responsable);
      setDesc(selectedUser.PASSWD);
    }
  }, [selectedUser]);
  const addNewTask = () => {
    dispatch(
      updateUserInfo({
        service: poste,
        matricule: selectedUser.MATRIC,
        password: desc,
      }),
    );
    setDesc('');
    closeModal();
  };

  return (
    <View>
      <Modal isOpen={showModal} onClose={closeModal}>
        <Modal.Content maxWidth="400px" style={{backgroundColor: '#334155'}}>
          <Modal.CloseButton />
          <Modal.Header>
            <Text style={{color: '#FFF', fontWeight: '700', fontSize: 24}}>
              Modifier Utilisateur
            </Text>
          </Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>
                <Text style={{color: '#FFF', fontWeight: '700', fontSize: 17}}>
                  Mot de passe
                </Text>
              </FormControl.Label>
              <Input
                placeholder="Mot de passe"
                borderless
                color={theme.COLORS.WARNING}
                style={{borderColor: theme.COLORS.WARNING, height: 65}}
                placeholderTextColor={'#FFF'}
                bgColor="rgba(0,0,0,0.4)"
                value={desc}
                onChangeText={text => {
                  setDesc(text);
                }}
                password
              />
            </FormControl>

            <FormControl mt="3">
              <FormControl.Label>
                <Text style={{color: '#FFF', fontWeight: '700', fontSize: 17}}>
                  SERVICE
                </Text>
              </FormControl.Label>
              <Select
                minWidth="200"
                maxWidth={450}
                height={20}
                backgroundColor={'rgba(0,0,0,0.4)'}
                borderColor={'rgba(0,0,0,0.4)'}
                color="#FFFF"
                selectedValue={poste}
                onValueChange={value => setPoste(value)}
                accessibilityLabel="SERVICE"
                placeholder="SERVICE">
                <Select.Item label={'PRODUCTION'} value={'PRODUCTION'} />
                <Select.Item label={'DIRECTION'} value={'DIRECTION'} />
                <Select.Item label={'RESSOURCE HUMAINE'} value={'RH'} />
                <Select.Item label={'CONTROLE QUALITE'} value={'CONTROLE'} />
              </Select>
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

export default EditUserModal;

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
