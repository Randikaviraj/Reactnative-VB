import React from 'react';
import ValidationComponent from 'react-native-form-validator';
import {StyleSheet,TextInput,View,StatusBar,Dimensions,Image,TouchableOpacity,Text,TouchableWithoutFeedback,Keyboard,Alert,Modal,ActivityIndicator} from 'react-native';
import {KeyboardAwareScrollView,} from 'react-native-keyboard-aware-scroll-view'


var {height,width}=Dimensions.get("window");

export default class ForgetPass extends ValidationComponent{

    constructor(props){
        super(props)
        this.state={
            email:'',
            isloading:false,
            response:{status:false,network:false,statusrenew:false},
            responseStatus:false,
            confirmnum:'',
            num:'',
            password:'',
            repassword:'',
            confirmmodal:false

        }   
    }

    handleBack=()=>{
        this.props.navigation.navigate('Login')
    }


    handleEmail=()=>{
        
        
        if(!this.state.email){ 
            Alert.alert('Error','Enter your email here',[{text: 'OK',}])
            return
        }

       
        this.getEmail(this.state)
        this.setState({
        isloading:true,
        response:{status:false,network:false,statusrenew:false},
        responseStatus:false})
        
        
      
    }



    handleRenew=()=>{
        
        if(this.state.num!==this.state.confirmnum){
            Alert.alert('Ooops','Confirmion code in not valid',[{text: 'OK',}])
            this.setState({
                responseStatus:false})
            return
        }
        if(!this.state.password){
            Alert.alert('Error','Enter your new password here',[{text: 'OK', onPress: () => console.log('OK Pressed in missing email')}])
            this.setState({
                responseStatus:false})
            return
        }
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

       
        this.renewPassword(this.state)
        this.setState({
        isloading:true,
        response:{status:false,network:false,statusrenew:false},
        responseStatus:false})
        
        
      
    }

    _finishRenew= async()=>{
        
        Alert.alert('Done','Successfully renew your password',[{text: 'OK',}])
        this.setState({
            email:'',
            isloading:false,
            response:{status:false,network:false,statusrenew:false},
            responseStatus:false,
            confirmnum:'',
            num:'',
            password:'',
            repassword:'',
            confirmmodal:false

        })
        this.props.navigation.navigate('Login')
    }
    
    
    _logscreen= async()=>{
       
        this.setState({
            isloading:false,
            response:{status:false,network:false,statusrenew:false},
            responseStatus:false,confirmmodal:true
        })
        
    }

 

    componentDidUpdate(){

        if(this.state.responseStatus){
            if(this.state.response.statusrenew){
                this._logscreen()
                return

            }
            if(!this.state.response.status){
                Alert.alert('Error',' Check your network connection',[{text: 'OK',}])
                this.setState({ email:'',
                isloading:false,
                response:{status:false,network:false,statusrenew:false},
                responseStatus:false,
                confirmnum:'',
                num:'',
                password:'',
                repassword:'',
                confirmmodal:false})
                return

            }
           
            if(this.state.response.status){
                this._finishRenew()
                return

            }

           
        }
        
    }



    getEmail=async (data)=>{

        let num=((Math.round(Math.random() * 10)+5)*100+(Math.round(Math.random() * 10)*2+7)*100)*12547
        this.setState({num:num.toString()})
        try{
                 fetch('http://192.248.43.4:8080/user/forgetemail',{
                    method:'POST',
                    body: JSON.stringify({ 
                        email:data.email,
                        num:num
                    }), 
                    
                    headers: { 
                        "Content-type": "application/json; charset=UTF-8",
                        "Accept": "application/json",
                        
                    
                    } 
                }).then((res)=>res.json()).then(
                    (response)=>{
                       
                        this.setState({response:response,responseStatus:true})
                        
                    }
                ).catch(
                    (e)=>
                {this.setState({response:{statusrenew:false,network:false},responseStatus:true})})
            
        }catch(e){
            console.log("Error in login in loginpage..............."+e)
            this.setState({response:{statusrenew:false,network:false},responseStatus:true})
            return
            
        }
        }



    renewPassword=async (data)=>{
        
            
            fetch('http://192.248.43.4:8080/user/changepassword',{
               method:'POST',
               body: JSON.stringify({ 
                   email:data.email,
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
                            <View style={{...StyleSheet.absoluteFill,}} >
                            <Image
                                source={require('../assets/images/mainbackground.jpg')}
                                style={{height:null,width:null,flex:1}}/>
                            </View>
                            <ActivityIndicator style={{alignSelf:'center'}}/>
                            
                        </View>
                    )
            }else{

                    return(
                        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                                <KeyboardAwareScrollView  extraScrollHeight={15} enableOnAndroid={true} 
                                    keyboardShouldPersistTaps='handled'>
                                    <View style={styles.main}>
                                        <StatusBar barStyle='light-content' backgroundColor='black'/>
                                        <View style={{...StyleSheet.absoluteFill,}} >
                                        <Image
                                                source={require('../assets/images/mainbackground.jpg')}
                                                style={{height:null,width:null,flex:1}}/>
                                        </View>
                                        
                                        <View  style={styles.container}>
                                                <Text style={{...styles.buttontext,fontSize:22}} >Enter your email to get </Text>
                                                    <Text style={{...styles.buttontext,fontSize:22}} >
                                                         confirmation code</Text>
                                                    <TextInput style={styles.inputbox} 
                                                    underlineColorAndroid='rgba(0,0,0,0)'
                                                    autoCapitalize='none'
                                                    placeholder="Enter email here" placeholderTextColor="#ffffff"
                                                    onChangeText={(val)=>{this.setState({email:val})}}/>
                                                    
                                                <View style={{paddingTop:60}}>
                                                    <TouchableOpacity style={styles.button} onPress={this.handleEmail}>
                                                        <Text style={styles.buttontext} >Enter</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.button} onPress={this.handleBack}>
                                                        <Text style={styles.buttontext} >Back</Text>
                                                    </TouchableOpacity>
                                                 </View>
                                            </View>   
                                        </View>
                                        <Modal
                                            animationType="slide"
                                            visible={this.state.confirmmodal}
                                            style={styles.container}
                                        >
                                                <View style={{...StyleSheet.absoluteFill,}} >
                                                    <Image
                                                        source={require('../assets/images/mainbackground.jpg')}
                                                        style={{height:null,width:null,flex:1}}/>
                                                </View>
                                                     <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} >
                                                        <View  style={styles.container}> 
                                                            <TextInput style={styles.inputbox}
                                                                keyboardType='number-pad' 
                                                                underlineColorAndroid='rgba(0,0,0,0)'
                                                                autoCapitalize='none'
                                                                placeholder="Enter Confirmation Code" placeholderTextColor="#ffffff"
                                                                onChangeText={(val)=>{this.setState({confirmnum:val})}}/>
                                                            <TextInput style={styles.inputbox} 
                                                                autoCapitalize='none'
                                                                underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true}
                                                                placeholder="Enter Your New Password" placeholderTextColor="#ffffff"
                                                                onChangeText={(val)=>{this.setState({password:val})}}/>
                                                                
                                                            <TextInput style={styles.inputbox} 
                                                                    autoCapitalize='none'
                                                                    underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true}
                                                                    placeholder="Confirm Your Password" placeholderTextColor="#ffffff"
                                                                    onChangeText={(val)=>{this.setState({repassword:val})}}/>
                                                            <View style={{paddingTop:60}}>
                                                                <TouchableOpacity style={styles.button}onPress={this.handleRenew}>
                                                                <Text style={styles.buttontext} >RenewPassword</Text>
                                                                </TouchableOpacity>
                                                                    <TouchableOpacity style={styles.button} onPress={()=>{
                                                                        this.setState({
                                                                            email:'',
                                                                            isloading:false,
                                                                            response:{status:false,network:false,statusrenew:false},
                                                                            responseStatus:false,
                                                                            confirmnum:'',
                                                                            num:'',
                                                                            password:'',
                                                                            repassword:'',
                                                                            confirmmodal:false
                                                                        })
                                                                }}>
                                                                <Text style={styles.buttontext} >Cancel</Text>
                                                                </TouchableOpacity>
                                                                        
                                                            </View>
                                                     </View>
                                                   </TouchableWithoutFeedback>
                                            </Modal>   
                            </KeyboardAwareScrollView>
                        </TouchableWithoutFeedback>
                    );

                }
            }  
}







const styles=StyleSheet.create({
    main:{
        backgroundColor:'#538cc6',
        flex:1,
        width:width,
        height:height,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        padding:10
    },
    container:{
        height:height,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5
    },

    inputbox:{
        width:300,
        backgroundColor:'rgba(255,255,255,0.3)',
        borderRadius:25,
        fontSize:16,
        paddingHorizontal:16,
        color:'#ffffff',
        marginTop:35,
        padding:10,
        paddingVertical:10
    },
  
    buttontext:{
        color:'#ffffff',
        fontSize:16,
        fontWeight:'bold',
        marginVertical:4,
        

    },
    button:{
        borderRadius:25,
        width:300,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#660000',
        marginVertical:10,
        paddingVertical:5


    },
  

});

