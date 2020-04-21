import React,{useState} from 'react';
import  {View,TouchableOpacity,Modal} from 'react-native';
import {  Card, Title,} from 'react-native-paper';
import Details from './details'
export default function SmallBlock(props){
    const [modalVisible, setModalVisible] = useState(false);
    return(
        <View style={{flex:1,paddingHorizontal:10,marginHorizontal:11,marginVertical:10,}}>
            <Card style={{flex:1}}>
                <TouchableOpacity onPress={()=>setModalVisible(true)}>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
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