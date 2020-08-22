import React from 'react';
import  {View,TouchableOpacity} from 'react-native';
import {  Card, Title,} from 'react-native-paper';
import { black } from 'color-name';

export default function Block(props){
    
    var uri = null;
    function takeURI(){
        try{
            var image = props.content;
            var patt =  /(http[^\s]+(jpg|jpeg|png|tiff)\b)/;
            var result = patt.exec(image);
            
            
            if(result[1]){
                uri=result[1]
            }
        }catch(e){
            console.log('uri error in block'+e)
        }
     
    }

    takeURI();

    return(
        <View style={{flex:1,marginHorizontal:1,marginVertical:1,
        width:props.width-15,height:props.height}}>
            <Card style={{flex:1}}>
                <TouchableOpacity onPress={()=>props.onNav(props.indexno)}>
                    <Card.Cover source={{ uri: uri }} style={{ width:props.width-15,height:props.height,borderColor:black,borderWidth:1}} />
                </TouchableOpacity>
            </Card>
        </View>
    )
}