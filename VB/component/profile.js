import React from 'react';
import {View,StyleSheet} from 'react-native'
import ProfileStack from '../navigation/profilestack'
export default function Profile(){

    return(
     <View style={styles.container}>
         <ProfileStack/>
     </View>
    ) 
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    
  });