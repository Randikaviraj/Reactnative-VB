import React from 'react';
import {View,StyleSheet,Modal} from 'react-native'
export default function Logout(){

    return(
     <View style={styles.container}>
      <Modal visible={true}/>
     </View>
    ) 
}


const styles = StyleSheet.create({
    container: {
      flex:1
    },
    
  });