import React,{Component} from 'react';
import qs from 'qs';
import  {View,Text,SafeAreaView,StyleSheet,ScrollView,Image,TouchableOpacity,Linking,Alert,AsyncStorage,BackHandler} from 'react-native';
import {Ionicons, } from '@expo/vector-icons';
import ImageUpload from './imageupload';
import {connect} from 'react-redux'


class ProfileHome extends Component{
    constructor(props){
        super(props)
        this.state={
            profileuri:null
        }
    }

    backAction = () => {
        
        return true;
    };
    
    componentDidMount(){
        
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

     async  logout(){
        Alert.alert('LogOut','Do you want to logout ?',[{text: 'Yes', onPress: async() => 
        {
            await AsyncStorage.setItem('IsLoggedin','0');
            this.props.navigation.navigate('Logout')
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
                    'vibawacommunity@gmail.com',
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
        
    return(
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{...StyleSheet.absoluteFill,}} >
                                        <Image
                                        source={require('../assets/images/mainbackground.jpg')}
                                        style={{height:null,width:null,flex:1}}/>
                                </View>
                <View style={{flexDirection:'row',paddingTop:20,alignSelf:'center'}}>
                    <View style={styles.profile}>
                            <ImageUpload email={this.props.email} profileuri={this.props.profileuri}
                                updateProfileUri={this.props.updateProfileUri}
                            />
                    </View>

                    <View style={{top:40,right:-25,width:60,height:60,borderRadius:30,position:'absolute'}}>
                        <TouchableOpacity onPress={this.handleMail}>
                            <Ionicons name="ios-chatboxes" size={50} /> 
                        </TouchableOpacity>   
                    </View>
                </View>
                <View style={{flexDirection:'column',alignSelf:"center",paddingTop:5,marginTop:5}}>
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
      
    ) 
    }




    



}

const mapStateToProps=(state)=>{
    return{
        fname:state.rA.fname,
        lname:state.rA.lname,
        email:state.rA.email,
        profileuri:state.rA.profileuri,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
      updateProfileUri:(data)=>dispatch({type:'ProfilcachUri',data:data}),
      
    }
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems:'center',
      justifyContent:'center',
      paddingTop:5,
      paddingHorizontal:10
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
        borderWidth:3,
        paddingHorizontal:50,
        backgroundColor:'rgba(255,255,255,0.3)',
        paddingVertical:8
        

    }
  });

  

  export default connect(mapStateToProps,mapDispatchToProps)(ProfileHome)