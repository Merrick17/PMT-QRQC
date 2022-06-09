import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {Box, Select, Button} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {getAllUsersApi} from '../redux/actions/users.action';
import moment from 'moment';
import {useForm, Controller} from 'react-hook-form';
import {addNewQRQCApi} from '../redux/actions/qrqc.actions';
import {Input, theme} from 'galio-framework';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const AddNewQRQC = ({navigation}) => {
  const dispatch = useDispatch();
  const {userList} = useSelector(state => state.users);
  useEffect(() => {
    dispatch(getAllUsersApi());
  }, []);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      Service: '',
      desc_prob: '',
      NumArticle: '',
      NumOf: '',
      pos_probleme: '',
      moyenne_detection: '',
      frequence_detection: '',
      reccurence: '',
      raison_defaut: '',
      pos_detection: '',
      nbr_piece: '',
    },
  });

  const [dateProb, setDateProb] = useState(new Date(Date.now()));
  const [dateDetc, setDateDetec] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [showProblem, setShowProb] = useState(false);
  const [showDetec, setShowDetec] = useState(false);
  const [problemUser, setProblemUser] = useState(null);
  const [detectUser, setDetecUser] = useState(null);

  const onSubmit = data => {
    let selectedProbUser = userList.find(user => user.MATRIC == problemUser);
    let selectedDetectUser = userList.find(user => user.MATRIC == detectUser);
    console.log('Selected Prob', selectedProbUser);
    console.log('Selected Detect', selectedDetectUser);
    let body = {
      ...data,
      nom_perso_detect: `${selectedDetectUser.NOMPER} ${selectedDetectUser.PRENOM}`,
      mat_perso_detect: selectedDetectUser.MATRIC,
      nom_personne: `${selectedProbUser.NOMPER} ${selectedProbUser.PRENOM}`,
      mat_personne: selectedProbUser.MATRIC,
      Date_probleme: moment(dateProb).format('YYYY-MM-DD'),
      date_detection: moment(dateDetc).format('YYYY-MM-DD'),
    };
    dispatch(addNewQRQCApi(body, navigation));
    console.log(data);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <View style={globalStyles.container}>
      <ScrollView
        style={{width: '100%', height: '100%'}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.problem}>
          <View style={styles.header}>
            <Text style={styles.label}>Problème</Text>
          </View>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 20,
            }}>
            {showProblem && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateProb}
                mode={mode}
                is24Hour={true}
                onChange={(ev, date) => {
                  setDateProb(date);
                  setShowProb(false);
                }}
              />
            )}

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setShowProb(true);
              }}>
              <MaterialIcon name="date-range" color={'#FFF'} size={20} />
              <Text style={styles.btnLabel}>Date de problème</Text>
            </TouchableOpacity>
            <Text style={styles.dateLabel}>
              {moment(dateProb).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              justifyContent: 'space-evenly',
              flex: 1,
              width: '100%',
            }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="Service"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  borderless
                  color={theme.COLORS.WARNING}
                  style={{
                    borderColor: theme.COLORS.WARNING,
                    height: 65,
                    width: '100%',
                    marginRight: 10,
                  }}
                  placeholderTextColor={'#FFF'}
                  bgColor="rgba(0,0,0,0.4)"
                />
              )}
              name="Service"
            />
            {errors.Service && (
              <Text style={styles.errorLabel}>Champ obligatoire.</Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="Num Article"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  borderless
                  color={theme.COLORS.WARNING}
                  style={{borderColor: theme.COLORS.WARNING, height: 65}}
                  placeholderTextColor={'#FFF'}
                  bgColor="rgba(0,0,0,0.4)"
                />
              )}
              name="NumArticle"
            />
            {errors.NumArticle && (
              <Text style={styles.errorLabel}>Champ obligatoire.</Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  w={450}
                  placeholder="Num OF"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  borderless
                  color={theme.COLORS.WARNING}
                  style={{borderColor: theme.COLORS.WARNING, height: 65}}
                  placeholderTextColor={'#FFF'}
                 
                  bgColor="rgba(0,0,0,0.4)"
                />
              )}
              name="NumOf"
            />
            {errors.NumOf && (
              <Text style={styles.errorLabel}>Champ obligatoire.</Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  w={450}
                  placeholder="Description Problème"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  borderless
                  color={theme.COLORS.WARNING}
                  style={{borderColor: theme.COLORS.WARNING, height: 65}}
                  placeholderTextColor={'#FFF'}
                
                  bgColor="rgba(0,0,0,0.4)"
                />
              )}
              name="desc_prob"
            />
            {errors.desc_prob && (
              <Text style={styles.errorLabel}>Champ obligatoire.</Text>
            )}
            {errors.raison_defaut && (
              <Text style={styles.errorLabel}>Champ obligatoire.</Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  w={450}
                  placeholder="Position Problème"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  borderless
                  color={theme.COLORS.WARNING}
                  style={{borderColor: theme.COLORS.WARNING, height: 65}}
                  placeholderTextColor={'#FFF'}
                  password={false}
                  bgColor="rgba(0,0,0,0.4)"
                />
              )}
              name="pos_probleme"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  w={450}
                  placeholder="Moyenne de detection"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  borderless
                  color={theme.COLORS.WARNING}
                  style={{borderColor: theme.COLORS.WARNING, height: 65}}
                  placeholderTextColor={'#FFF'}
                  password={false}
                  bgColor="rgba(0,0,0,0.4)"
                />
              )}
              name="moyenne_detection"
            />
            {errors.moyenne_detection && (
              <Text style={styles.errorLabel}>Champ obligatoire.</Text>
            )}
            <Select
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderColor: 'rgba(0,0,0,0.4)',
              }}
              minWidth="200"
              maxWidth={450}
              selectedValue={problemUser}
              onValueChange={value => setProblemUser(value)}
              accessibilityLabel="Reponsable Problème"
              height={20}
              backgroundColor={'rgba(0,0,0,0.4)'}
              borderColor={'rgba(0,0,0,0.4)'}
              placeholder="Reponsable Problème">
              {userList.map(elm => (
                <Select.Item
                  key={elm.MATRIC.toString()}
                  label={`${elm.PRENOM} ${elm.NOMPER}`}
                  value={elm.MATRIC}
                />
              ))}
            </Select>
          </View>
        </View>
        <View style={styles.problem}>
          <View style={styles.header}>
            <Text style={styles.label}>Détection</Text>
          </View>
          <View
            style={{
              padding: 10,
              justifyContent: 'space-evenly',
              flex: 1,
              width: '100%',
            }}>
            <Select
              minWidth="200"
              maxWidth={450}
              height={20}
              backgroundColor={'rgba(0,0,0,0.4)'}
              borderColor={'rgba(0,0,0,0.4)'}
              selectedValue={detectUser}
              onValueChange={value => setDetecUser(value)}
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
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignSelf: 'flex-start',
              }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder="Nombre pièce"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    borderless
                    color={theme.COLORS.WARNING}
                    style={{
                      borderColor: theme.COLORS.WARNING,
                      height: 65,
                      width: 150,
                    }}
                    placeholderTextColor={'#FFF'}
                    password={false}
                    bgColor="rgba(0,0,0,0.4)"
                  />
                )}
                name="nbr_piece"
              />
              {errors.nbr_piece && (
                <Text style={styles.errorLabel}>Champ obligatoire.</Text>
              )}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder="Reccurence"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    borderless
                    color={theme.COLORS.WARNING}
                    style={{
                      borderColor: theme.COLORS.WARNING,
                      height: 65,
                      width: 150,
                    }}
                    placeholderTextColor={'#FFF'}
                    password={false}
                    bgColor="rgba(0,0,0,0.4)"
                  />
                )}
                name="reccurence"
              />
              {errors.reccurence && (
                <Text style={styles.errorLabel}>Champ obligatoire.</Text>
              )}
              <Controller
                control={control}
                rules={{
                  required: true,
                  width: 100,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder="Fréquence"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    borderless
                    color={theme.COLORS.WARNING}
                    style={{
                      borderColor: theme.COLORS.WARNING,
                      height: 65,
                    }}
                    placeholderTextColor={'#FFF'}
                    password={false}
                    bgColor="rgba(0,0,0,0.4)"
                  />
                )}
                name="frequence_detection"
              />
              {errors.frequence_detection && (
                <Text style={styles.errorLabel}>Champ obligatoire.</Text>
              )}
            </View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="Raison défaut"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  borderless
                  color={theme.COLORS.WARNING}
                  style={{
                    borderColor: theme.COLORS.WARNING,
                    height: 65,
                    width: '100%',
                    marginRight: 10,
                  }}
                  placeholderTextColor={'#FFF'}
                  password={false}
                  bgColor="rgba(0,0,0,0.4)"
                />
              )}
              name="raison_defaut"
            />

            {errors.raison_defaut && (
              <Text style={styles.errorLabel}>Champ obligatoire.</Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  w={450}
                  placeholder="Position détection"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  borderless
                  color={theme.COLORS.WARNING}
                  style={{
                    borderColor: theme.COLORS.WARNING,
                    height: 65,
                    width: '100%',
                    marginRight: 10,
                  }}
                  placeholderTextColor={'#FFF'}
                  password={false}
                  bgColor="rgba(0,0,0,0.4)"
                />
              )}
              name="pos_detection"
            />
            {errors.pos_detection && (
              <Text style={styles.errorLabel}>Champ obligatoire.</Text>
            )}

            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {showDetec && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateProb}
                  mode={mode}
                  is24Hour={true}
                  onChange={(ev, date) => {
                    setDateDetec(date);
                    setShowDetec(false);
                  }}
                />
              )}

              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setShowDetec(true);
                }}>
                <MaterialIcon name="date-range" color={'#FFF'} size={20} />
                <Text style={styles.btnLabel}>Date de detection</Text>
              </TouchableOpacity>
              <Text style={styles.dateLabel}>
                {' '}
                {moment(dateDetc).format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.btnList}>
          <TouchableOpacity
            style={{
              width: '45%',
              height: 70,
              backgroundColor: '#EA580C',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            onPress={handleSubmit(onSubmit)}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFF'}}>
              Suivant
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '45%',
              height: 70,
              backgroundColor: '#BE123C',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            onPress={() => {
              navigation.pop();
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFF'}}>
              Annuler
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddNewQRQC;

const styles = StyleSheet.create({
  problem: {
    width: '100%',
    minHeight: 550,
    marginTop: 25,

    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#FDBA74',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    color: '#FFF',
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FB923C',
    height: 50,
    width: 350,
    padding: 10,
    borderRadius: 10,
  },
  btnLabel: {
    color: '#FFF',
    alignSelf: 'center',
  },
  dateLabel: {
    fontSize: 24,
    color: '#FFF',
  },
  btnList: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  errorLabel: {
    color: 'red',
  },
});
