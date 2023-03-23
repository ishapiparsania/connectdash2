import React from 'react';

import {
  StyleSheet,
  Text,
  View,Button,TouchableOpacity,TextInput,Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react';
import fb from '../assets/fb1.webp'
import styles from '../styles/style';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBarNavigator from '../navigators/TopBarNavigator';
import { hp,wp } from '../components/Dimension';

const Login=()=> {
    const navigation=useNavigation();
    
    useEffect( () =>
    {    
        AsyncStorage.getItem("UserData").then(valuen => {
                        
            if (valuen !== null ) {
                try{
                
                    var value= JSON.parse(valuen);
                    console.log(value)
                    if(value.isLoggedin === '1'){
                        navigation.navigate("HomeScreen")
                        // alert("already loged in")
                        

                    }
                }catch(error){
                    console.log(error)
                }
                
                }
        })
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValidError, setEmailValidError] = useState('');
    const [passwordValidError, setPasswordValidError] = useState('');
    const handleValidEmail = val => {
        
        if (val.length === 0) {
        setEmailValidError('* email address must be entered');
        } 
        
        else  {
        setEmailValidError('');
        }
    };
    const handleValidPassword = val => {
        
        if (val.length === 0) {
        setPasswordValidError('* password must be enter');
        }  else  {
        setPasswordValidError('');
        }
    };

    const setData = async() => {
        

        if((email === '' && password === '') || email === '' || password === ''){
            // alert('email password required')
            return;
        }else{

        await AsyncStorage.getItem("UserDatadb").then(value => {
        
        if (value !== null && email !== '' && password !== '') {
            try{
                var updatedData = JSON.parse(value)
                var userD =  updatedData.find(key =>  key.email === email && key.password === password )
                if (userD) {
                    var user= {
                        email: userD.email,
                        password: userD.password,
                        name:userD.name,
                        token : userD.token,
                        isLoggedin:'1',
                        coverimg:userD.coverimg ,
                        profimage:userD.profimage
                    }
                    AsyncStorage.setItem('UserData',JSON.stringify(user));
                    console.log(user)
                    // AsyncStorage.setItem("isLoggedIn",'1')
                    
                    // alert("Login successfull");
                    
                    navigation.navigate('HomeScreen');
                    
                   
                }
                else{
                    alert("Username Password Incorrect")
                    // AsyncStorage.setItem("isLoggedIn",0)

                    navigation.navigate('Login')
                }
            // });

            }catch(error){
                console.log(error)
            }
            
            }else{
                alert("No Data available")
            }
        })
    }
    

    }

  return (
  <View style={styles.container}>
      <View>
      <Image
        style={styles.tinyLogo}
        source={fb}/>
      </View>
    <View style={{ top:hp('45%'),alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
                style={[styles.input,{backgroundColor:'#fff'},styles.shadow]}
                value={email}
                placeholder={"Phone or email"}
                keyboardType='email-address'
                returnKeyType='next'
                placeholderTextColor = "#898F9C"
                onChangeText={value => {setEmail(value);handleValidEmail(value); }}
                autoCapitalize={"none"}
                clearButtonMode="always"
            />

            {emailValidError ? <Text style={{color:"red"}}>{emailValidError}</Text> : null}

        <TextInput
    
               style={[styles.input,{backgroundColor:'#fff'},styles.shadow]}
                value={password}
                placeholder={"Password"}
                keyboardType='email-address'
                returnKeyType='next'
                placeholderTextColor = "#898F9C"
                clearButtonMode="always"

                onChangeText={value => {setPassword(value);handleValidPassword(value);}}
            />
             {passwordValidError ? <Text style={{color:"red"}}>{passwordValidError}</Text> : null}

      <TouchableOpacity  style={styles.input} onPress = {setData} >
         <Text style={{color:'#ffff',fontSize:18,textAlign:'center'}}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity  style={[styles.input,{backgroundColor:'#fff'}]} >
         <Text style={{color:'#4267B2',fontSize:18,textAlign:'center',fontWeight:'bold'}}>Forgot Password?</Text>
          </TouchableOpacity>

      <TouchableOpacity  style={[styles.input,{backgroundColor:'#228b22'}]} onPress={() => navigation.navigate('Register')}>
         <Text style={{color:'#ffff',fontSize:18,textAlign:'center'}}>Create New Facebook Account</Text>
          </TouchableOpacity>

    </View>

  </View>
  
  )
}

export default Login;
