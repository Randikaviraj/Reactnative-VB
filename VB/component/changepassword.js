import React from 'react';
import ValidationComponent from 'react-native-form-validator';
import {StyleSheet,TextInput,View,StatusBar,Dimensions,TouchableOpacity,Text,Image,TouchableWithoutFeedback,Keyboard,ActivityIndicator,Alert} from 'react-native';
import {KeyboardAwareScrollView,} from 'react-native-keyboard-aware-scroll-view'




var {height,width}=Dimensions.get("window");

export default class ChangePassword extends ValidationComponent{

    constructor(props){
        super(props)
        
        this.state={
            password:'',
            repassword:'',
            isloading:false,
            response:{status:false,network:false},
            responseStatus:false
            
        }
       
        
    }
    

   handleCancel=()=>{
        this.props.navigation.navigate('Profile')
    }

    handleUpdate=()=>{
            if(this.state.password!==this.state.repassword){
                Alert.alert('Ooops','Confirm password is not matching',[{text: 'OK',}])
                this.setState({
                    responseStatus:false})
                return
            }

            if(this.state.password.length<8){
                Alert.alert('Error','Password should have minimum 8 chars',[{text: 'OK',}])
                this.setState({
                    responseStatus:false})
                return
            }

            this.getUpdate(this.state)
            this.setState({
                isloading:true,
                response:{status:false,network:false},
                repassword:'',
                responseStatus:false})
     
    }



    componentDidUpdate(){

        if(this.state.responseStatus){
           
                if(!this.state.response.status && !this.state.response.network){
                    Alert.alert('Something wrong','Check your network connection',[{text: 'OK',}])
                    
                    this.setState({
                        password:'',
                        repassword:'',
                        isloading:false,
                        response:{status:false,network:false},
                        responseStatus:false})
                        return
                }
                if(!this.state.response.status && this.state.response.network){
                    Alert.alert('Password change Failed','Your password should greater than eight characters',[{text: 'OK',}])
                    this.setState({
                        password:'',
                        repassword:'',
                        isloading:false,
                        response:{status:false,network:false},
                        responseStatus:false})
                        return
                }
                
                if(this.state.response.status){
                    Alert.alert('Done','You have successfully Change the password',[{text: 'OK',}])
                    this._update();
                        
                }

            
        }
        
    }


    _update= async()=>{
        
        
        this.setState({
            password:'',
            repassword:'',
            isloading:false,
            response:{status:false,network:false},
            responseStatus:false})
            
        this.props.navigation.navigate('Profile')
    }





getUpdate=async (data)=>{
        
            
             fetch('http://192.248.43.4:8080/user/changepassword',{
                method:'POST',
                body: JSON.stringify({ 
                    email:this.props.navigation.getParam('email'),
                    password:data.password
                    
                
                }), 
                
                headers: { 
                    "Content-type": "application/json; charset=UTF-8",
                    "Accept": "application/json",
                    
                
                } 
            }).then((res)=>res.json()).then(
                (response)=>{
                    
                    this.setState({response:response,responseStatus:true})
                    
                }
            ).catch((e)=>{
                console.log("Error in change password..............."+e)
                this.setState({response:{status:false,network:false},responseStatus:true})
            })
        
   
}




 render(){
    if(this.state.isloading){
        
        return(
                <View style={styles.main}>
                    
                    <ActivityIndicator style={{alignSelf:'center'}}/>
                    
                </View>
            )
    }else{
                return(
                <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} style={styles.main}>
                        <KeyboardAwareScrollView  extraScrollHeight={15} enableOnAndroid={true} 
                            keyboardShouldPersistTaps='handled' style={{flex:1}}>
                            <View style={styles.main}>
                                <View style={{...StyleSheet.absoluteFill,}} >
                                        <Image
                                        source={require('../assets/images/mainbackground.jpg')}
                                        style={{height:null,width:null,flex:1}}/>
                                </View>
                                
                                    <TextInput style={styles.inputbox} 
                                        autoCapitalize='none'
                                        onChangeText={(val)=>{this.setState({password:val})}}
                                        underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true}
                                        placeholder="New Password" placeholderTextColor="#ffffff"/>
                                     <TextInput style={styles.inputbox} 
                                        autoCapitalize='none'
                                        onChangeText={(val)=>{this.setState({repassword:val})}}
                                        underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true}
                                        placeholder="Confirm Password" placeholderTextColor="#ffffff"/>
                                        
                                        
                                        <View style={{marginTop:50}}>
                                        <TouchableOpacity style={styles.button} onPress={this.handleUpdate}>
                                            <Text style={styles.buttontext} >Change Password</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={this.handleCancel}>
                                            <Text style={styles.buttontext} >Cancel</Text>
                                        </TouchableOpacity>
                                        </View>
                            </View>
                        </KeyboardAwareScrollView>
                </TouchableWithoutFeedback>
                );

        }

    }   
    
}



const styles=StyleSheet.create({
    main:{
        backgroundColor:'white',
        flex:1,
        width:width,
        height:height,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        
    },
   
    inputbox:{
        width:300,
        backgroundColor:'rgba(255,255,255,0.3)',
        borderRadius:25,
        fontSize:16,
        paddingHorizontal:16,
        color:'black',
        marginTop:20,
        padding:10
    },
    buttontext:{
        color:'#ffffff',
        fontSize:16,
        fontWeight:'bold',
        marginTop:5

    },
    button:{
        borderRadius:25,
        width:300,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(51, 0, 0, 0.7)',
        marginVertical:5,
        paddingVertical:1,
        paddingBottom:10


    },
    

});


