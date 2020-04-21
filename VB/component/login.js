import React from 'react';
import ValidationComponent from 'react-native-form-validator';
import {StyleSheet,TextInput,View,StatusBar,Dimensions,Image,TouchableOpacity,Text,TouchableWithoutFeedback,Keyboard,Alert,AsyncStorage,ActivityIndicator,} from 'react-native';
import {KeyboardAwareScrollView,} from 'react-native-keyboard-aware-scroll-view'


var {height,width}=Dimensions.get("window");

export default class Login extends ValidationComponent{

    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            isloading:false,
            response:{statussignin:false,network:false,},
            responseStatus:false
        }
        
        
    }

   
    

    handleSignup=()=>{
        this.props.navigation.navigate('Signup')
    }


    handleSignin=()=>{
        
        
        if(!this.state.email){
            Alert.alert('Error','To sign in,enter your email',[{text: 'OK', onPress: () => console.log('OK Pressed in missing email')}])
            return
        }

        if(!this.state.password){
            Alert.alert('Error','To sign in,enter password',[{text: 'OK', onPress: () => console.log('OK Pressed in missing password')}])
            return
        }
        this.getSignIn(this.state)
        this.setState({
        isloading:true,
        response:{statussignin:false,network:false},
        responseStatus:false})
        
        
      
    }

    componentDidMount(){
        
        this._loadData()
    }

    
    _login= async()=>{
        
        await AsyncStorage.setItem('IsLoggedin','1');
        await AsyncStorage.setItem('fname',this.state.response.user.fristname)
        await AsyncStorage.setItem('lname',this.state.response.user.lastname)
        await AsyncStorage.setItem('email',this.state.response.user.email)
        this.setState({
            email:'',
            password:'',
            isloading:false,
            response:{statussignin:false,network:false},
            responseStatus:false
        })
        this.props.navigation.navigate('Home')
    }

    _loadData=async()=>{
        const IsLoggedin=await AsyncStorage.getItem('IsLoggedin')
        console.log(IsLoggedin)
        if(IsLoggedin==='1'){
            console.log('oooooo')
            this.props.navigation.navigate('Home')
        }
    }

    componentDidUpdate(){
        
        if(this.state.responseStatus){
            if(!this.state.response.statussignin && !this.state.response.network){
                Alert.alert('Error','Couldn\'t sign in check your network connection',[{text: 'OK',}])
                this.setState({ email:'',
                password:'',
                isloading:false,
                response:{statussignin:false,network:false},
                responseStatus:false})
                return

            }
            if(!this.state.response.statussignin && this.state.response.network){
                Alert.alert('Couldn\' SignIn','Couldn\'t sign in your entered password or email is wrong',[{text: 'OK',}])
                this.setState({
                    email:'',
                    password:'',
                    isloading:false,
                    response:{statussignin:false,network:false},
                    responseStatus:false
                })
                return

            }if(this.state.response.statussignin){
                this._login()
                return
                
            }

           
        }
        
    }

    asyncForgetPass=async()=>{
        const forgetpass=await AsyncStorage.getItem('forgetpass')
        const email=await AsyncStorage.getItem('email')
        if(forgetpass==='1'){
            const num=await AsyncStorage.getItem('num')
            this.props.navigation.navigate('ForgetPass',{A:1,B:0,num:num,email:email})
            return
        }
        this.props.navigation.navigate('ForgetPass',{A:0,B:1,num:0,email:''})
    }


    getSignIn=async (data)=>{
        
        try{
                 fetch('http://192.168.42.127:3330/user/login',{
                    method:'POST',
                    body: JSON.stringify({ 
                        email:data.email,
                        password:data.password,
                    
                    }), 
                    
                    headers: { 
                        "Content-type": "application/json; charset=UTF-8",
                        "Accept": "application/json",
                        
                    
                    } 
                }).then((res)=>res.json()).then(
                    (response)=>{
                        console.log('response***********'+response.statussignin)
                        this.setState({response:response,responseStatus:true})
                        
                    }
                ).catch(this.setState({response:{statussignin:false,network:false},responseStatus:true}))
            
             
               
        
        }catch(e){
            console.log("Error in login in loginpage..............."+e)
            this.setState({response:{statussignin:false,network:false},responseStatus:true})
            return
            
        }
        }



   render(){
            if(this.state.isloading){
                
                return(
                        <View style={styles.main}>
                            <View style={{...StyleSheet.absoluteFill,}} >
                            <Image
                                source={require('../assets/images/mainbackground.jpeg')}
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
                                                source={require('../assets/images/mainbackground.jpeg')}
                                                style={{height:null,width:null,flex:1}}/>
                                        </View>
                                        
                                        <View  style={styles.container}>
                                        
                                            <TextInput style={styles.inputbox} 
                                            underlineColorAndroid='rgba(0,0,0,0)'
                                            autoCapitalize='none'
                                            placeholder="Email" placeholderTextColor="#ffffff"
                                            onChangeText={(val)=>{this.setState({email:val})}}/>
                                            <TextInput style={styles.inputbox} 
                                            autoCapitalize='none'
                                        underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true}
                                            placeholder="Password" placeholderTextColor="#ffffff"
                                            onChangeText={(val)=>{this.setState({password:val})}}/>
                                            <View style={{paddingTop:60}}>
                                            <TouchableOpacity style={styles.button} onPress={this.handleSignin}>
                                                <Text style={styles.buttontext} >SIGN IN</Text>
                                            </TouchableOpacity>

                                            <View style={styles.signup}>
                                                <Text style={{color:'rgba(255,255,255,0.6)'}}>Don't have an account yet?</Text>
                                                <TouchableOpacity onPress={this.handleSignup}>
                                                    <Text style={{fontWeight:'bold',color:'rgba(255,255,255,0.6)'}}> Sign Up</Text>
                                                </TouchableOpacity>
                                                
                                            </View>
                                            <View style={styles.signup}>
                                                <Text style={{color:'rgba(255,255,255,0.6)'}}>Forget your Password</Text>
                                                <TouchableOpacity onPress={this.asyncForgetPass}>
                                                    <Text style={{fontWeight:'bold',color:'rgba(255,255,255,0.6)',alignSelf:'center' }}> Click here</Text>
                                                </TouchableOpacity>
                                                
                                            </View>
                                            </View>
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
        height:height/2,
        justifyContent:'center',
        alignItems:'center',
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
        backgroundColor:'#000080',
        marginVertical:10,
        paddingVertical:8


    },
    signup:{
        flexDirection:'row',
        fontSize:16,
        paddingTop:5,
        alignSelf:'center' 
        
    }

});

