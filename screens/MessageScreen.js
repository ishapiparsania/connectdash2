import React, { Component } from 'react'
import { Text, View,SafeAreaView } from 'react-native'
import NavbarTab from '../components/NavbarTab'
import { useNavigation } from '@react-navigation/native'

 const MessageScreen = ()=>  {
  
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>

        <Text> message screen </Text>
      </SafeAreaView>
    )
  
}

export default MessageScreen
