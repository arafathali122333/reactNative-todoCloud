import React,{useState} from 'react';
import { View, StyleSheet,Button,Image,TextInput,Platform,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login=({navigation})=> {    
    const [username,setusername] = useState('');
    const [password,setpassword] = useState('');

    AsyncStorage.getItem('user').then((value) =>{   
      if(value){
        navigation.navigate('Home');
      }
    });
    
    const gotohome=()=>{
      if(username.trim()=="" || password.trim()==""){
       (Platform.OS=='web') ? alert("Please Fill Username and Password") : Alert.alert("Please Fill Username and Password");
       return;
      }
      if(password.trim().length<6){
        (Platform.OS=='web') ? alert("Password should be above 6 characters") : Alert.alert("Password should be above 6 characters");
        return;
      }
      if(username.trim()!="" && password.trim()!=""){
        let user = username.trim()+password.trim();
        setusername('');
        setpassword('');
        navigation.navigate('Home',user);
        AsyncStorage.setItem('user', user);
      }
    }
    return (
        <View style={styles.container}>
        <Image
        style={styles.logo}
        source={require('../assets/todoLogo.png')}
      />
      <TextInput
        placeholder="UserName"
        style={styles.input}
        value={username}
        onChangeText={(username) => setusername(username)}/>

        <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={(password) => setpassword(password)}
        secureTextEntry={true}
        />

        <Button
        title="Register / Login"
        onPress={gotohome}/>
    </View>
    );
}

const styles = StyleSheet.create({
    logo:{
        width: 250,
        height: 60,
        marginBottom:10,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: 240,
      height: 44,
      padding: 10,
      borderRadius:7,
      marginBottom: 10,
      backgroundColor: '#e8e8e8'
    },
  });

export default Login;