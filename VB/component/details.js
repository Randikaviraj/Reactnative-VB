import * as React from 'react';
import {View,StyleSheet,TouchableOpacity} from 'react-native'
import { WebView } from 'react-native-webview';
import {AntDesign } from '@expo/vector-icons';


const Details=(props)=>{

 return(
    <View style={styles.main}>
        <TouchableOpacity style={{alignSelf:'center'}} onPress={props.handle} >
            <AntDesign name='closecircle' size={40}/>
        </TouchableOpacity>
        <WebView
        originWhitelist={['*']}
        source={{ html: `${props.details} '<meta name="viewport" content="width=device-width, initial-scale=0.5">'`}}
        style={{ marginTop: 0.1 }}
      />
      
    </View> 
 );

}


export default Details;

const styles=StyleSheet.create({
    main:{
        flex:1,
        padding:10,
        fontSize:500,
        
    },
   

})