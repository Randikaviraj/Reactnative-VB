import React from 'react';
import ValidationComponent from 'react-native-form-validator';
import {StyleSheet,TextInput,View,StatusBar,Dimensions,TouchableOpacity,Text,Image,TouchableWithoutFeedback,Keyboard,ActivityIndicator,Alert} from 'react-native';
import {KeyboardAwareScrollView,} from 'react-native-keyboard-aware-scroll-view'
import {connect} from 'react-redux'



var {height,width}=Dimensions.get("window");

class UpdateProfile extends ValidationComponent{

    constructor(props){
        super(props)
        
        this.state={
            fname:this.props.navigation.getParam('fname'),
            lname:this.props.navigation.getParam('lname'),
            isloading:false,
            response:{status:false,network:false},
            responseStatus:false
        }
       
        
    }
    

   handleCancel=()=>{
        this.props.navigation.navigate('Profile')
    }

    handleUpdate=()=>{
        if(!this.state.fname){
            this.setState({fname:this.props.navigation.getParam('fname')})
           
        }
        if(!this.state.lname){
            this.setState({lname:this.props.navigation.getParam('lname')})
           
        }
            this.getUpdate(this.state)
            this.setState({
                isloading:true,
                response:{status:false,network:false},
                responseStatus:false})
     
    }



    componentDidUpdate(){

        if(this.state.responseStatus){
           
                if(!this.state.response.status && !this.state.response.network){
                    Alert.alert('Something wrong','Check your network connection',[{text: 'OK',}])
                    
                    this.setState({
                        fname:this.props.navigation.getParam('fname'),
                        lname:this.props.navigation.getParam('lname'),
                        isloading:false,
                        response:{status:false,network:false},
                        responseStatus:false})
                        return
                }
                if(!this.state.response.status && this.state.response.network){
                    Alert.alert('Update Failed','Couldn\'t update,check your names,names should greater than there characters',[{text: 'OK',}])
                    this.setState({
                        fname:this.props.navigation.getParam('fname'),
                         lname:this.props.navigation.getParam('lname'),
                        isloading:false,
                        response:{status:false,network:false},
                        responseStatus:false})
                        return
                }
                
                if(this.state.response.status){
                    Alert.alert('Done','You have successfully update',[{text: 'OK',}])
                    this._update();
                        
                }

            
        }
        
    }


    _update= async()=>{
        
        this.props.saveToStore({fname:this.state.fname,lname:this.state.lname})
        this.setState({
            fname:'',
            lname:'',
            isloading:false,
            response:{status:false,network:false},
            responseStatus:false})
            
        this.props.navigation.navigate('Profile')
    }





getUpdate=async (data)=>{
        
    
             fetch('http://192.248.43.4:8080/user/updateprofile',{
                method:'POST',
                body: JSON.stringify({ 
                    fname:data.fname,
                    lname:data.lname,
                    email:this.props.navigation.getParam('email')
                    
                
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
                console.log("Error in updateprofile..............."+e)
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
                                        onChangeText={(val)=>{this.setState({fname:val})}}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder="Enter New Frist Name" placeholderTextColor="#ffffff" />
                                   
                                    <TextInput style={styles.inputbox} 
                                        onChangeText={(val)=>{this.setState({lname:val})}}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder="Enter New Last Name" placeholderTextColor="#ffffff"/>
                                
                                    <View style={{marginTop:50}}>
                                        <TouchableOpacity style={styles.button} onPress={this.handleUpdate}>
                                            <Text style={styles.buttontext} >Update</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={this.handleCancel}>
                                            <Text style={styles.buttontext} >Back</Text>
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
        marginTop:5,

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

const mapDispatchToProps=(dispatch)=>{
    return{
        saveToStore:(data)=>dispatch({type:'UpdateStore',data:data})
    }
}

export default connect(null,mapDispatchToProps)(UpdateProfile)