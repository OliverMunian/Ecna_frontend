import { useState, useRef } from 'react';
import {View} from 'react-native'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const ref_input2 = useRef();
  const ref_input3 = useRef();

  const handleSubmit = () => {
    navigation.navigate('TabNavigator');
  };

  return (
    
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.view}>
        <Text style={styles.txt}> Veuillez compléter tous les champs pour continuer </Text>
          <TextInput placeholder="Adresse mail" style={styles.input} autoFocus={true} placeholderTextColor={'white'} returnKeyType = {"next"} onSubmitEditing={() => ref_input2.current.focus()}/>
          <TextInput placeholder="Mot de passe" style={styles.input} placeholderTextColor={'white'} onSubmitEditing={() => ref_input3.current.focus()} ref={ref_input2}/>
          <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
            <Text style={styles.btntxt}> Valider</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    
  )
}

const styles = StyleSheet.create({
  container:{    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
  },
  view:{
    width: '100%',
    alignItems:'center',
    marginBottom: 50,
  },
  txt:{
    marginBottom: 20,
    color:'white'
  },
  input:{
    backgroundColor:'black',
    width: '75%',
    height: 75,
    borderRadius:20,
    marginBottom:20,
    borderWidth: 1,
    borderColor:'white',
    textAlign: 'center',
    color: 'white',
  },
  btn:{
    width:130,
    height:60,
    backgroundColor:'blue',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    borderWidth: 1,
    borderColor:'white'
  },
  btntxt:{
    color:'white',
  }

});
