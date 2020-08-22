import React from 'react';
import {View,StyleSheet} from 'react-native'
import MagazineStack from '../navigation/magazineStack'
export default function Article(){

    return(
     <View style={styles.container}>
         <MagazineStack/>
     </View>
    ) 
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    
  });