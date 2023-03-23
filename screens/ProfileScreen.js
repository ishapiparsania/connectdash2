import React, { Component,useEffect,useState } from 'react'
import { Text, View,TouchableOpacity,Image,StyleSheet,ImageBackground, ScrollView,TouchableHighlight,FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { hp,wp } from '../components/Dimension';
import NavbarTab from '../components/NavbarTab';
import PostOption from '../components/PostOption';
import PublicDetails from '../components/PublicDetails';
import { useDispatch, useSelector } from 'react-redux';
import { LogBox } from 'react-native';
import moment from 'moment'
import { RemovePost } from '../actions/Action/PostAction';
import ShowPost from '../components/ShowPost';


const ProfileScreen  =()=>{
    const navigation=useNavigation();
    const[profimg,setprofimg]=useState("https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png");
    const [coverimg,setcoverimg]=useState("")
    const[name,setname]=useState("");
    const postarray=[]
    const dataNew = useSelector(state => state);
    const dispatch = useDispatch();
    const data= dataNew.getPostReducer.post
    console.log(data)
  

  useEffect(()=>{
    AsyncStorage.getItem("UserData").then(valuen => {
      if (valuen !== null ) {
        try{
        var value= JSON.parse(valuen);
        console.log(value)
          if(value.isLoggedin === '1'){
          setname(value.name)
          setprofimg(value.profimage)
          setcoverimg(value.coverimg)
          }
        }catch(error){
        console.log(error)
        }
      }
    })
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreAllLogs()
  },[data,profimg,coverimg]);


  const takePhotoLibrary = async()=>{
      ImagePicker.openPicker({
        width: 300,height: 400,cropping: true
      }).then(image => {
        // console.log(image.path);
        AsyncStorage.getItem("UserDatadb").then(value => {
              try{
                  var updatedData = JSON.parse(value)
                  var userD =  updatedData.find(key =>  key.name === name )
                  if (userD) {
                    // console.log(userD)
                    updatedData.findIndex(key =>  key.name === name )
                      var user= {
                          email: userD.email,
                          password: userD.password,
                          token : userD.token,
                          name:userD.name,
                          isLoggedin:'1',
                          profimage:image.path,
                          coverimg:userD.coverimg
                      }
                      AsyncStorage.setItem('UserData',JSON.stringify(user));
                      setprofimg(image.path)
                    
                  }
                  else{  
                  }
              }catch(error){
                  console.log(error)
              } 
          })
      });
      }

  const takePhotoLibrary1 = async()=>{
      ImagePicker.openPicker({
        width: 300,height: 400,cropping: true
      }).then(image => {
        // console.log(image.path);
        AsyncStorage.getItem("UserDatadb").then(value => {
              try{
                  var updatedData = JSON.parse(value)
                   console.log("okkk")

                  console.log(updatedData)

                  var userD =  updatedData.find(key =>  key.name === name )
                   
                
                console.log(userD)
                  if (userD) {
                    var index= updatedData.findIndex(key =>  key.name === name )
                      var user= {
                          email: userD.email,
                          password: userD.password,
                          token : userD.token,
                          name:userD.name,
                          isLoggedin:'1',
                          profimage:userD.profimage,
                          coverimg:image.path

                      }
                      setcoverimg(image.path)
                  }
                  else{  
                  }
              }catch(error){
                  console.log(error)
              } 
          })
      });
      }


  
    return (
        <SafeAreaView style={{backgroundColor:'white',flex:1}}>
          <NavbarTab/>
          <ScrollView showsVerticalScrollIndicator='true'>
            <View style={{height:2500}}>
          {/* <View>
          <TouchableOpacity onPress={takePhotoLibrary1}>
            <View>
          <Image  source={{uri:coverimg}} style={styles.imageStyle} />
          </View>
          </TouchableOpacity>
          </View> */}
          <View>
          <TouchableOpacity onPress={takePhotoLibrary}>
            <View style={{alignSelf:'center'}}>
                <Image source={{uri:profimg}} style={styles.profileImage} />
            </View>
        </TouchableOpacity>  
        </View>     
        <View style={{top:hp('-12%')}}> 
        <View>
          <Text style={{top:hp('22%'),fontSize:35,fontWeight:'bold',alignSelf:'center'}}>{name}</Text>
        </View>
        <View style={{flexDirection:'row',  top:hp('25%'),}}>
        <TouchableHighlight style={styles.input}>
        <Text style={{alignSelf:'center',color:'#fff',fontWeight:'500',fontSize:18}}>Add to story</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.input1}>
        <Text style={{color:'#000',fontWeight:'500',fontSize:26,alignSelf:'center'}}>...</Text>
      </TouchableHighlight>
      </View>
        <View>
        <View style={{top:hp('30%'),padding:5,
              borderTopColor:"#05050538",
              borderTopWidth:1}}>
          <PublicDetails/>
        </View>
        <View style={{top:hp('32%'),backgroundColor:'white',padding:5,
              borderTopColor:"#05050538",
              borderTopWidth:18}}>
                <Text style={{padding:15,fontWeight:'bold',fontSize:20}}>Posts</Text>
          <PostOption/> 
          <View style={{top:hp('3%'),padding:5,
              borderTopColor:"#05050538",
              borderTopWidth:1}}>
          <View style={{flexDirection:'row',justifyContent:'space-evenly',top:7}}>
            
            <TouchableOpacity style={{flexDirection:'row'}}>
              <Image source={require("../assets/status.png")} style={{height:22,width:22,top:-4}} />
              <Text style={{color:'grey',fontWeight:'bold',paddingLeft:5}}>Status</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{flexDirection:'row'}}>
               <Image source={require("../assets/photo.png")} style={styles.icon}/>
              <Text style={{color:'grey',fontWeight:'bold',paddingLeft:5}}>Photo</Text>
            </TouchableOpacity>
          </View>
        </View>   
        </View>
        <View style={{top:hp('35%'),backgroundColor:'white',padding:5,
              borderTopColor:"#05050538",
              borderTopWidth:18}}>
              <ShowPost/>
        </View>
        </View>
        </View> 
        
      </View>
      
      </ScrollView>
    
  </SafeAreaView>
    )
  
}

const styles = StyleSheet.create({
    profileImage:{
      top:hp('6%'),
      width:220,
      height:220,
      borderRadius:120,
      borderWidth:6,
      borderColor:'#fff',
      backgroundColor:'#d3d3d3'  
  },
  imageStyle :{
    position: 'absolute',
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
    height:hp('34%'),
    width:wp('90%'),
    position: 'absolute',
    top:hp('2%'),
    marginRight:5,
    marginLeft:20,
    backgroundColor:'#d3d3d3'  

},
  input:{
  width:wp('80%'),
  padding:12,
  borderRadius:5,
  backgroundColor:'#1A6ED8', 
  borderBottomWidth: 0.3 ,
  
  marginLeft:20

},
input1:{
  width:wp('11%'),
  borderRadius:5,
  backgroundColor:'#d3d3d3', 
  borderBottomWidth: 0.3 ,

  marginLeft:7

},
  icon:{
    width:25,
    height:25,
    resizeMode:"contain",
    top:-4

    },
});

export default ProfileScreen
