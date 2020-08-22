import React from 'react';
import {TouchableOpacity, StyleSheet, View,Image,Alert,ActivityIndicator,BackHandler} from 'react-native';
import { AntDesign ,MaterialCommunityIcons} from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
const soundObject = new Audio.Sound();

export default class App extends React.Component {
    
    constructor(props){
        super(props)
        this.state={
            isloading:false,
            playing:false,
            zpush:0,
            oppush:0,
            zplay:1,
            opplay:1,
            
        }
        this.volume=0.5
        this.uri=null
    }

    backAction = () => {
        
        return true;
    };

    controlVolumeUp=async()=>{
        if(this.volume+0.1<1 && this.state.playing){
            await soundObject.setVolumeAsync(this.volume+0.1)
            this.volume=this.volume+0.1
        }
        
    }

    controlVolumeDown=async()=>{
        if(this.volume-0.1>=0 && this.state.playing){
            await soundObject.setVolumeAsync(this.volume-0.1)
            this.volume=this.volume-0.1
        }
        
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
		Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
		});
    }

    startRadio=async()=>{
        try {
            if(this.state.playing){
                deactivateKeepAwake();
                await soundObject.stopAsync()
                soundObject.unloadAsync()
                this.setState({isloading:false,zpush:0,oppush:0,zplay:1,opplay:1,playing:false,})
                return
            }
            activateKeepAwake();
            await soundObject.loadAsync( { uri: this.uri },{volume: this.volume});
            await soundObject.playAsync();
            this.setState({isloading:false,zpush:1,oppush:1,zplay:0,opplay:0,playing:true,})
        } catch (e) {
            Alert.alert('Something Wrong','Check your network connection',[{text:'Ok'}])
            this.uri=null
            this.setState({isloading:false,zpush:0,oppush:0,zplay:1,opplay:1,playing:false,})
            console.log(`cannot play the sound file`, e)
        }
    }

    buttonPlay=()=>{
        this.setState({isloading:true})
        
    }

    geturl=()=>{
        fetch('http://192.248.43.4:8080/radio/takeurl',{
            method:'GET',
            headers: { 
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                
            
            } 
        }
          ).then((res)=>res.json()).then(
            (response)=>{
                if(response.status){
                    if(response.started){
                        this.uri=response.url
                        this.startRadio()
                    }else{
                        Alert.alert('Hey..',response.msg,[{text:'Ok'}])
                        this.setState({isloading:false,zpush:0,oppush:0,zplay:1,opplay:1,playing:false,})
                        return;
                    }
                }else{
                    Alert.alert('Something Wrong','Check your network connection',[{text:'Ok'}])
                    this.uri=null
                    this.setState({isloading:false,zpush:0,oppush:0,zplay:1,opplay:1,playing:false,})
                }
                
                
            }
        ).catch((err)=>{
            
            Alert.alert('Something Wrong','Check your network connection',[{text: 'OK',}])
            this.uri=null
            this.setState({isloading:false,zpush:0,oppush:0,zplay:1,opplay:1,playing:false,})
            }
        )
    }

    render() {

        if(this.state.isloading){
            if(!this.uri){
                this.geturl()
            }else{
                this.startRadio()
            }
            
         return(  
             
             <View style={styles.container}>
                <View style={{...StyleSheet.absoluteFill,}} >
                    <Image
                        source={require('../assets/images/radio.png')}
                        style={{height:null,width:null,flex:1}}/>
                </View> 
                <View style={{flexDirection:'row'}}>

                            <View style={{flexDirection:'column',justifyContent:'flex-start',   alignItems:'center',position:'absolute',translateX:50,translateY:-20}}>
                                <TouchableOpacity 
                                    onPress={this.controlVolumeUp}
                                >
                                    <MaterialCommunityIcons name='volume-plus' size={60}/>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={this.controlVolumeDown}
                                >
                                    <MaterialCommunityIcons name='volume-minus' size={60}/>
                                </TouchableOpacity>
                     </View>
                    </View> 
                    <View>   
                        <TouchableOpacity style={{position:'absolute',translateX:-65,translateY:20}} >
                            <ActivityIndicator/>
                        </TouchableOpacity>
                    </View>
            </View>   
            )
        }else{
            return (
                <View style={styles.container}>
                   <View style={{...StyleSheet.absoluteFill,}} >
                        <Image
                            source={require('../assets/images/radio.png')}
                            style={{height:null,width:null,flex:1}}/>
                    </View> 
                    <View style={{flexDirection:'row'}}>

                            <View style={{flexDirection:'column',justifyContent:'flex-start',   alignItems:'center',position:'absolute',translateX:50,translateY:-20}}>
                                <TouchableOpacity 
                                    onPress={this.controlVolumeUp}
                                >
                                    <MaterialCommunityIcons name='volume-plus' size={60}/>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={this.controlVolumeDown}
                                >
                                    <MaterialCommunityIcons name='volume-minus' size={60}/>
                                </TouchableOpacity>
                     </View>
                    </View> 
                    <View>   
                        <TouchableOpacity style={{position:'absolute',translateX:-100,zIndex:this.state.zplay,opacity:this.state.opplay}}
                        onPress={this.buttonPlay}
                        >
                            <AntDesign name='play' size={80}/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={{position:'absolute',translateX:-100,zIndex:this.state.zpush,opacity:this.state.oppush}}
                         onPress={this.buttonPlay}>
                            <AntDesign name='pausecircle' size={80}/>
                        </TouchableOpacity>
                    </View>
                </View>
           )
        }
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
});
