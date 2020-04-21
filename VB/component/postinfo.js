import React from 'react';
import  {View,StyleSheet,FlatList,TextInput,} from 'react-native';
import {  Card, Title, Paragraph, Button } from 'react-native-paper';
import {KeyboardAwareScrollView,} from 'react-native-keyboard-aware-scroll-view'

export default function PostInfo(props){
    return(
        <KeyboardAwareScrollView  extraScrollHeight={100} enableOnAndroid={true} 
        keyboardShouldPersistTaps='handled'>
        <View style={{flex:1,paddingHorizontal:10,marginHorizontal:11,marginVertical:10, backgroundColor:'white',borderRadius:15,}}>
            <View style={styles.header}>
            <Title style={{fontSize:20,fontWeight:'bold'}}>Card title</Title>
            </View>
            <View style={{flex:1}}>
            <Card >
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{borderRadius:15,marginBottom:15,}} />
            <Card.Content>
            <Paragraph>Card content fffffffffffffffffffffffffffffffffffffffffffffffffffffffjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj</Paragraph>
            </Card.Content>
            </Card>
            <View style={{flexDirection:'row',alignSelf:'center',paddingTop:10}}>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 ,borderRadius:10,padding:5,marginTop:5}} placeholder='Enter Your Comment Here...' multiline={true} numberOfLines={10} 
                 />
                <Button icon="send" mode="contained" onPress={() => console.log('Pressed')} style={{backgroundColor:'#80d4ff',borderRadius:10}}>
                save
                </Button>
            </View>
            
            </View>
        </View>
        </KeyboardAwareScrollView>
    )
}

const styles=StyleSheet.create({
    header:{
        alignItems:'center',
        justifyContent:'center',
        padding:5,
        marginTop:10,
        paddingTop:20,
        backgroundColor:'white',
        borderRadius:20
       
    }
})