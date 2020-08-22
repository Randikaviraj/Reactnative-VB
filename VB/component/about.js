import React from 'react';
import  {View,Image,Dimensions} from 'react-native';
import {KeyboardAwareScrollView,} from 'react-native-keyboard-aware-scroll-view'
var {height,width}=Dimensions.get("window");

export default function About(){
    return(
        <KeyboardAwareScrollView>
            <View style={{height:height,width:width}}>
                        <Image
                            source={require('../assets/images/about.jpg')}
                                style={{flex:1,
                                    width: null,
                                    height: null,
                                    resizeMode: 'contain'}}/>
            </View>
        </KeyboardAwareScrollView>
    )
}