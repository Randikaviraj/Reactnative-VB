import React,{Component} from 'react';
import qs from 'qs';
import  {View,Text,SafeAreaView,StyleSheet,ScrollView,Image,TouchableOpacity,Linking,Alert,AsyncStorage,BackHandler} from 'react-native';
import {Ionicons, } from '@expo/vector-icons';
import ImageUpload from './imageupload';
import {connect} from 'react-redux'

class ProfileHome extends Component{
   
   
    
   


     async  logout(){
        Alert.alert('LogOut','Do you want to logout ?',[{text: 'Yes', onPress: async() => 
        {
            await AsyncStorage.setItem('IsLoggedin','0');
            BackHandler.exitApp()
        }, style: 'cancel'},
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}])
        
        
    }

     async  sendEmail(to, subject, body, options = {}) {
        const { cc, bcc } = options;
    
        let url = `mailto:${to}`;
    
        
        const query = qs.stringify({
            subject: subject,
            body: body,
            cc: cc,
            bcc: bcc
        });
    
        if (query.length) {
            url += `?${query}`;
        }
    
        
        const canOpen = await Linking.canOpenURL(url);
    
        if (!canOpen) {
            throw new Error('Provided URL can not be handled');
        }
    
        return Linking.openURL(url);
    }


   handleMail=()=>{
        Alert.alert(
            'Mail to vibawa',
            'Do you want to send message to vibawa ?',
            [
              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Yes', onPress: () =>{
                this.sendEmail(
                    'test@gmail.com',
                    'Send My Msg!',
                    'text your msg...'
                ).then(() => {
                    console.log('Our email successful provided to device mail ');
                });
              } },
            ],
            { cancelable: false }
          )
    }

    render(){
        console.log('profile '+this.props.fname)
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flexDirection:'row',paddingTop:40}}>
                    <View style={styles.profile}>
                            <ImageUpload email={this.props.email}/>
                    </View>

                    <View style={{top:60,right:29,width:60,height:60,borderRadius:30,position:'absolute'}}>
                        <TouchableOpacity onPress={this.handleMail}>
                            <Ionicons name="ios-chatboxes" size={50} /> 
                        </TouchableOpacity>   
                    </View>
                </View>
                <View style={{flexDirection:'column',alignSelf:"center",paddingTop:10,marginTop:40}}>
                    <Text style={{fontSize:30,fontWeight:'bold',alignSelf:"center",paddingTop:20}} >{this.props.fname}</Text>
                    <Text style={{fontSize:15,alignSelf:"center",color:'grey',paddingTop:10}} >{this.props.lname}</Text>
                    <Text style={{fontSize:15,alignSelf:"center",color:'grey',paddingTop:10}} >
                      {this.props.email}
                    </Text>
                </View>
                <TouchableOpacity style={styles.button}
                onPress={()=>this.logout()}               
               ><Text style={{color:'#3399ff'}}>LogOut</Text></TouchableOpacity>

               <TouchableOpacity style={styles.button}
                onPress={()=>this.props.navigation.navigate('UpdateProfile',{fname:this.props.fname,lname:this.props.lname,email:this.props.email})}               
               ><Text style={{color:'#3399ff'}}>Edit Profile</Text></TouchableOpacity>

               <TouchableOpacity style={styles.button}
                onPress={()=>this.props.navigation.navigate('ChangePassword',{email:this.props.email})}
               ><Text style={{color:'#3399ff'}}>Change Password</Text></TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    ) 
    }
}

const mapStateToProps=(state)=>{
    return{
        fname:state.rA.fname,
        lname:state.rA.lname,
        email:state.rA.email
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems:'center',
      justifyContent:'center',
      padding:28
    },
    profile:{
        width:200,
        height:200,
        borderRadius:120,
        overflow:'hidden',
        alignSelf:'center',
        
    },
    button:{
        alignSelf:'center',
        marginTop:30,
        borderRadius:50,
        color:'blue',
        borderColor:'black',
        borderWidth:5,
        paddingHorizontal:50,
        backgroundColor:'#e6f2ff',
        paddingVertical:8
        

    }
  });

  export default connect(mapStateToProps)(ProfileHome)