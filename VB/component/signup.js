import React from 'react';
import ValidationComponent from 'react-native-form-validator';
import {StyleSheet,TextInput,View,StatusBar,Dimensions,TouchableOpacity,Text,Image,TouchableWithoutFeedback,Keyboard,ActivityIndicator,Alert,Modal} from 'react-native';
import {KeyboardAwareScrollView,} from 'react-native-keyboard-aware-scroll-view'




var {height,width}=Dimensions.get("window");

export default class SignUp extends ValidationComponent{

    constructor(props){
        super(props)
        
        this.state={
            fname:'',
            lname:'',
            email:'',
            password:'',
            repassword:'',
            isloading:false,
            response:{statussignup:false,network:false},
            responseconfirm:{statusrenew:false,network:false},
            responseStatus:false,
            comcode:'',
            gencode:'',
            confirmmodal:false
            
        }
        this.errmsg=''
        this.repassworderr=''
    }
    

   handleLogin=()=>{
        this.props.navigation.navigate('Login')
    }

    handleSignup=()=>{
        this.errmsg=''
        this.repassworderr=''
        if(!this.state.fname){
            this.errmsg='Frist name is required'
            this.setState({error:true})
            return
        }
        if(!this.state.lname){
            this.errmsg='Last name is required'
            this.setState({error:true})
            return
        }
        if(!this.state.email){
            this.errmsg='Email  is required'
            this.setState({error:true})
            return
        }
        if(!this.state.password){
            this.errmsg='Password  is required'
            this.setState({error:true})
            return
        }
        if(this.state.password!==this.state.repassword){
            this.repassworderr='Entered password is not matching'
            this.setState({error:true})
            return
        }
            
        this.validate({
            fname: {minlength:3, maxlength:20, },
            lname: {minlength:3, maxlength:20, },
            email: {email: true,},
            password:{minlength:8}
           
          });

        if(!this.getErrorMessages()){
            this.getConfirm(this.state)
            this.setState({
                isloading:true,
                response:{statussignup:false,network:false},
                responseStatus:false})
            
            
        }
        
     
    }



    componentDidUpdate(){

        if(this.state.responseStatus){
            
                if(this.state.responseconfirm.statusrenew){
                    this.setState({confirmmodal:true,isloading:false,responseStatus:false,})
                    
                    return

                }
                if(!this.state.responseconfirm.network){
                    Alert.alert('Error',' Check your network connection',[{text: 'OK',}])
                    this.setState({
                        fname:'',
                        lname:'',
                        email:'',
                        password:'',
                        repassword:'',
                        isloading:false,
                        response:{statussignup:false,network:false},
                        responseconfirm:{statusrenew:false,network:false},
                        responseStatus:false,
                        comcode:'',
                        gencode:'',
                        confirmmodal:false})
                    return

                }
            
               
                if(!this.state.response.statussignup && !this.state.response.network){
                    Alert.alert('Something wrong','Couldn\'t sign up check your network connection,try again later',[{text: 'OK',}])
                    this.errmsg=''
                    this.repassworderr=''
                    this.setState({
                        fname:'',
                        lname:'',
                        email:'',
                        password:'',
                        repassword:'',
                        isloading:false,
                        response:{statussignup:false,network:false},
                        responseconfirm:{statusrenew:false,network:false},
                        responseStatus:false,
                        comcode:'',
                        gencode:'',
                        confirmmodal:false})
                        return
                }
                if(!this.state.response.statussignup && this.state.response.network){
                    Alert.alert('SignUp Failed','Couldn\'t signup,have you signup using this email earlier? There is an account in this email',[{text: 'OK',}])
                    this.errmsg=''
                    this.repassworderr=''
                    this.setState({
                        fname:'',
                        lname:'',
                        email:'',
                        password:'',
                        repassword:'',
                        isloading:false,
                        response:{statussignup:false,network:false},
                        responseconfirm:{statusrenew:false,network:false},
                        responseStatus:false,
                        comcode:'',
                        gencode:'',
                        confirmmodal:false
                    })
                    return
                }
                
                if(this.state.response.statussignup){
                    Alert.alert('Done','You have successfully signup',[{text: 'OK',}])
                    this.errmsg=''
                    this.repassworderr=''
                    this.setState({
                        fname:'',
                        lname:'',
                        email:'',
                        password:'',
                        repassword:'',
                        isloading:false,
                        response:{statussignup:false,network:false},
                        responseconfirm:{statusrenew:false,network:false},
                        responseStatus:false,
                        comcode:'',
                        gencode:'',
                        confirmmodal:false})
                        this.props.navigation.navigate('Login')
                        return
                        
                }

            
        }
        
    }





getSignUp=async (data)=>{
        
    
             fetch('http://192.248.43.4:8080/user/signup',{
                method:'POST',
                body: JSON.stringify({ 
                    fname:data.fname,
                    lname:data.lname,
                    email:data.email,
                    password:data.password,
                
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
                console.log("Error in signup in signuppage..............."+e)
                this.setState({response:{statussignup:false,network:false},responseStatus:true})
            })
        
   
}





getConfirm=async (data)=>{

    let num=((Math.round(Math.random() * 10)+5)*100+(Math.round(Math.random() * 10)*2+7)*100)*12547
    this.setState({gencode:num.toString()})
    try{
             fetch('http://192.248.43.4:8080/user/confirmemail',{
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
                    
                    this.setState({responseconfirm:response,responseStatus:true})
                    
                }
            ).catch((e)=>{
                this.setState({responseconfirm:{statusrenew:false,network:false},responseStatus:true})
                
            })
        
    }catch(e){
        console.log("Error in login in loginpage..............."+e)
        this.setState({responseconfirm:{statusrenew:false,network:false},responseStatus:true})
        return
        
    }
    }



    handleConfirm=()=>{
        
        if(this.state.gencode!==this.state.comcode){
            Alert.alert('Ooops','Confirmion code in not valid',[{text: 'OK',}])
            this.setState({
                responseStatus:false,comcode:''})
            return
        }
    
        this.getSignUp(this.state)
        this.setState({
        isloading:true,
        response:{statussignup:false,network:false},
        responseStatus:false,
        responseconfirm:{statusrenew:false,network:true}
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
                                {!(!this.errmsg) && 
                                    <View style={{backgroundColor:'#ff3333',borderRadius:15,width:300,paddingBottom:3}}>
                                    <Text style={{ 
                                        fontSize:16,marginTop:5,alignSelf:'center'}}>{this.errmsg}</Text> 
                                    </View>
                                    } 

                                    <View style={{paddingTop:10}}>
                                    {this.isFieldInError('fname') && this.getErrorsInField('fname').map(errorMessage => <Text style={{ color:'black',
                                        fontSize:12,marginTop:5,alignSelf:'center'}}>{errorMessage}</Text>) } 
                                    </View>

                                    <TextInput style={styles.inputbox}
                                        onChangeText={(val)=>{this.setState({fname:val})}}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder="Frist Name" placeholderTextColor="#ffffff" />

                                    <View >
                                    {this.isFieldInError('lname') && this.getErrorsInField('lname').map(errorMessage => <Text style={{ color:'black',
                                        fontSize:12,marginTop:5,alignSelf:'center'}}>{errorMessage}</Text>) } 
                                    </View>


                                    <TextInput style={styles.inputbox} 
                                        onChangeText={(val)=>{this.setState({lname:val})}}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder="Last Name" placeholderTextColor="#ffffff"/>
                                
                                    <View >
                                    {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text style={{ color:'black',
                                        fontSize:12,marginTop:5,alignSelf:'center'}}>{errorMessage}</Text>) } 
                                    </View>


                                    <TextInput style={styles.inputbox} 
                                        autoCapitalize='none'
                                        onChangeText={(val)=>{this.setState({email:val})} }
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder="Email" placeholderTextColor="#ffffff"
                                        keyboardType='email-address'/>
                                    
                                    <View >
                                    {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <Text style={{ color:'black',
                                        fontSize:12,marginTop:5,alignSelf:'center'}}>{errorMessage}</Text>) } 
                                    </View>

                                    <TextInput style={styles.inputbox} 
                                        autoCapitalize='none'
                                        onChangeText={(val)=>{this.setState({password:val})}}
                                        underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true}
                                        placeholder="Password" placeholderTextColor="#ffffff"/>
                                    
                                    <View >
                                    {!(!this.repassworderr) &&  <Text style={{ color:'black',
                                        fontSize:12,marginTop:5,alignSelf:'center'}}>{this.repassworderr}</Text> } 
                                    </View>
                                    <TextInput style={styles.inputbox} 
                                        autoCapitalize='none'
                                        onChangeText={(val)=>{this.setState({repassword:val})}}
                                        underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry={true}
                                        placeholder="Confirm Password" placeholderTextColor="#ffffff"/>

                                    <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
                                        <Text style={styles.buttontext} >Sign Up</Text>
                                    </TouchableOpacity>

                                    <View style={styles.login}>
                                        <Text style={{color:'rgba(255,255,255,0.6)'}}>If you have an account ?</Text>
                                        <TouchableOpacity onPress={this.handleLogin}> 
                                            <Text style={{fontWeight:'bold'}}>  Login</Text>
                                        </TouchableOpacity>
                                        
                                    </View>
                                </View>
                            
                            </View>
                            <Modal
                                animationType="slide"
                                visible={this.state.confirmmodal}
                              
                            >
                                <View style={styles.main}>
                                    <View style={{...StyleSheet.absoluteFill,}} >
                                        <Image
                                            source={require('../assets/images/mainbackground.jpg')}
                                            style={{height:null,width:null,flex:1}}/>
                                    </View>
                                    <View  style={styles.container}>
                                            <Text style={styles.buttontext} >Send a code to your email</Text>
                                            <TextInput style={styles.inputbox} 
                                            keyboardType='number-pad'
                                            underlineColorAndroid='rgba(0,0,0,0)'
                                            autoCapitalize='none'
                                            placeholder="Confirmation Code" placeholderTextColor="#ffffff"
                                            onChangeText={(val)=>{this.setState({comcode:val})}}/>
                                            
                                            <View style={{paddingTop:60}}>
                                                <TouchableOpacity style={styles.button} onPress={this.handleConfirm}>
                                                    <Text style={styles.buttontext} >Confirm</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{...styles.button,marginVertical:2}} 
                                                onPress={()=>this.setState({
                                                    fname:'',
                                                    lname:'',
                                                    email:'',
                                                    password:'',
                                                    repassword:'',
                                                    isloading:false,
                                                    response:{statussignup:false,network:false},
                                                    responseconfirm:{statusrenew:false,network:false},
                                                    responseStatus:false,
                                                    comcode:'',
                                                    gencode:'',
                                                    confirmmodal:false
                                                })}>
                                                    <Text style={styles.buttontext} >Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                    </View>
                                </View>
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
        flex:1,
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
        backgroundColor:'#660000',
        marginVertical:30,
        paddingVertical:8,
        paddingBottom:13


    },
    login:{
        flexDirection:'row',
        fontSize:20,
        paddingTop:10
    }

});


