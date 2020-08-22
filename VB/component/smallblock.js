import React,{useState} from 'react';
import  {View,TouchableOpacity,Modal} from 'react-native';
import {  Card, Title,} from 'react-native-paper';
import Details from './details'



export default function SmallBlock(props){
    const [modalVisible, setModalVisible] = useState(false);
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
        <View style={{flex:1,paddingHorizontal:10,marginHorizontal:11,marginVertical:10,}}>
            <Card style={{flex:1}}>
                <TouchableOpacity onPress={()=>setModalVisible(true)}>
                    <Card.Cover source={{ uri: uri }} />
                </TouchableOpacity>
                <Card.Content>
                    <Title style={{fontSize:15,fontWeight:'500'}}>{props.title}</Title>
                </Card.Content>
            </Card>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(false)
                }}
            >
                <Details details={props.content} handle={()=>setModalVisible(false)}/>
            </Modal>
        </View>
    )
}