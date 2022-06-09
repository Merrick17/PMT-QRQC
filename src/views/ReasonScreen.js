import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Center, Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {addNewReasonApi} from '../redux/actions/qrqc.actions';
import {globalStyles} from '../styles/globalStyles';
import {Input, theme} from 'galio-framework';
const ReasonScreen = ({navigation, params}) => {
  const [respList, setRespList] = useState(['rep_1']);
  const {newQrQc} = useSelector(state => state.qrqc);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      desc_cause: '',
      rep_1: '',
      rep_2: '',
      rep_3: '',
      rep_4: '',
      rep_5: '',
    },
  });
  const addField = () => {
    if (respList.length < 5) {
      setRespList([...respList, `rep_${respList.length + 1}`]);
    }
  };
  const onSubmit = data => {
    let body = {...data, id_probleme: newQrQc.id_qrqc};
    dispatch(addNewReasonApi(body, navigation));
    console.log(data);
  };
  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Cause du problème</Text>
      </View>
      <View style={styles.problem}>
        <View>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  size="2xl"
                  placeholder="Cause"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  borderless
                  color={theme.COLORS.WARNING}
                  style={{
                    borderColor: theme.COLORS.WARNING,
                    height: 65,
                    width: '100%',
                  }}
                  placeholderTextColor={'#FFF'}
                  password={false}
                  bgColor="rgba(0,0,0,0.4)"
                />
              )}
              name="desc_cause"
            />
            <TouchableOpacity
              onPress={addField}
              style={{
                width: '35%',
                height: 70,
                backgroundColor: '#EA580C',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <Text style={{fontSize: 20, color: '#FFF', fontWeight: 'bold'}}>
                {' '}
                Ajouter reponse
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              marginTop: 10,
            }}>
            {respList.map((elm, ind) => {
              console.log('ELM', elm);
              return (
                <>
                  <Controller
                    key={ind.toString()}
                    control={control}
                    rules={{
                      required: false,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        w={450}
                        size="2xl"
                        placeholder={`Réponse ${ind + 1}`}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        marginTop={10}
                        height={150}
                        borderless
                        color={theme.COLORS.WARNING}
                        style={{borderColor: theme.COLORS.WARNING, height: 65}}
                        placeholderTextColor={'#FFF'}
                        password={false}
                        bgColor="rgba(0,0,0,0.4)"
                      />
                    )}
                    name={elm}
                  />
                  {/* {errors.NumArticle && (
                    <Text style={styles.errorLabel}>Champ obligatoire.</Text>
                  )} */}
                </>
              );
            })}
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
            Confirmer
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
    </View>
  );
};

export default ReasonScreen;

const styles = StyleSheet.create({
  problem: {
    width: '100%',
    minHeight: 550,
    marginTop: 25,
    padding: 10,

    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  header: {
    backgroundColor: '#FDBA74',
    width: '100%',
    height: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 24,
    color: '#FFF',
  },
  btn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0284C7',
    height: 35,
    width: 250,
    padding: 10,
  },
  btnLabel: {
    color: '#FFF',
    alignSelf: 'center',
  },
  dateLabel: {
    fontSize: 24,
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
