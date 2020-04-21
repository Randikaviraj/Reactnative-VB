import React from 'react';
import  {View,} from 'react-native';
import {  Card, Title, Paragraph } from 'react-native-paper';

export default function Block(props){
    return(
        <View style={{flex:1,paddingHorizontal:10,marginHorizontal:11,marginVertical:10,height:props.height,
        width:props.width-15}}>
            <Card style={{flex:1}}>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content>
                <Title style={{fontSize:15,fontWeight:'500'}}>Card title</Title>
                <Paragraph>Card content fffffffffffffffffffffffffffffffffffffffffffffffffffffff</Paragraph>
            </Card.Content>
            </Card>
        </View>
    )
}