import React  from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Dimensions,SafeAreaView} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
const {height,width}=Dimensions.get('window');

export default function Header({navigation}){

    
        return(
            <View style={styles.container} >
                <SafeAreaView style={{flex:1}}>
                    <TouchableOpacity style={{alignItems:'flex-end',margin:20,}} 
                    onPress={()=>navigation.openDrawer()}>
                        <MaterialIcons name='menu' size={35} color="#161924"/>
                    </TouchableOpacity> 
                    
                    </SafeAreaView>
            </View>
        )
    
}

const styles=StyleSheet.create({
   
    container:{
        flex:1,
        height:'100%',
        width:width-25,
        
    },
    text:{
        color:'#161924',
        fontSize:10,
        fontWeight:'500',

    }
})