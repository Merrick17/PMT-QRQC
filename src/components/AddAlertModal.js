import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Modal, FormControl, Select} from 'native-base';
import {Input, theme, Button} from 'galio-framework';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {getAllUsersApi} from '../redux/actions/users.action';
import {addAlertApi} from '../redux/actions/alert.action';
const AddAlertModal = ({showModal, closeModal, selected}) => {
  const {userInfo} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getAllUsersApi());
  }, []);

  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const [resp, setResp] = useState(51);
  const {userList} = useSelector(state => state.users);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const toast = useToast();
  const handleAddImage = async () => {
    try {
      let result = await launchCamera();
      if (!result.didCancel) {
        setImage(result.assets[0]);
        console.log('Result', result);
      }
    } catch (error) {}
  };
  const addNewTask = () => {
    dispatch(
      addAlertApi(
        {
          sender_id: userInfo.MATRIC,
          receiver_id: resp,
          description: desc,
          title: title,
          image: image,
        },
        selected,
        toast,
      ),
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
              Ajouter Nouveau Alert
            </Text>
          </Modal.Header>
          <Modal.Body>
            <FormControl isRequired={true}>
              <FormControl.Label>
                <Text style={{color: '#FFF', fontWeight: '700', fontSize: 17}}>
                  Titre
                </Text>
              </FormControl.Label>
              <Input
                placeholder="Titre"
                borderless
                color={theme.COLORS.WARNING}
                style={{borderColor: theme.COLORS.WARNING, height: 65}}
                placeholderTextColor={'#FFF'}
                bgColor="rgba(0,0,0,0.4)"
                value={title}
                onChangeText={text => {
                  setTitle(text);
                }}
              />
            </FormControl>
            <FormControl mt="3">
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
                  Responsable
                </Text>
              </FormControl.Label>
              <Select
                minWidth="200"
                maxWidth={450}
                height={20}
                backgroundColor={'rgba(0,0,0,0.4)'}
                borderColor={'rgba(0,0,0,0.4)'}
                color="#FFFF"
                selectedValue={resp}
                onValueChange={value => setResp(value)}
                accessibilityLabel="Reponsable Détection"
                placeholder="Reponsable Détection">
                {userList.map(elm => (
                  <Select.Item
                    key={elm.MATRIC.toString()}
                    label={`${elm.PRENOM} ${elm.NOMPER}`}
                    value={elm.MATRIC}
                  />
                ))}
              </Select>
            </FormControl>
            <Button
              color="warning"
              onPress={handleAddImage}
              style={{width: 360, height: 60, marginVertical: 20}}>
              Ajouter une Image
            </Button>
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
                  setTitle('');
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

export default AddAlertModal;

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
