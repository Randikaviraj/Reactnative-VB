import React,{Component} from 'react';
import  {View,Text,SafeAreaView,ScrollView,Dimensions,AsyncStorage,BackHandler,Alert} from 'react-native';
import Block from './block'
import {connect} from 'react-redux'

class Article extends Component{

    constructor(props){
        super(props)
        this.state={
            fname:'',
            lname:'',
            email:''
        }
    }

    backAction = () => {
        Alert.alert("Log Out!", "Are you sure you want to log out?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: async() => {
            await AsyncStorage.setItem('IsLoggedin','0');
            this.props.navigation.navigate('Login')
          } }
        ]);
        return true;
    };

    componentDidMount(){
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        this.getdata()
       
    }

   async getdata(){
    const fname=await AsyncStorage.getItem('fname')
    const lname=await AsyncStorage.getItem('lname')
    const email=await AsyncStorage.getItem('email')
    console.log(fname)
    this.props.saveToStore({fname:fname,lname:lname,email:email})

   }


render(){
    
    return(
            
            <SafeAreaView style={{flex:1}}>
                <View style={{flex:1}}>
                    <View style={{backgroundColor:'white'}}>
                    <Text style={{fontSize:25,fontWeight:'700',paddingHorizontal:25}}>Articles</Text>
                    </View>

                    <ScrollView
                    scrollEventThrottle={16}

                    >
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{height:Dimensions.get('window').height/2}}  scrollEventThrottle={16} snapToAlignment='center'>
                        <Block width={Dimensions.get('window').width/2} height={Dimensions.get('window').height/2}/>
                        <Block width={Dimensions.get('window').width/2} height={Dimensions.get('window').height/2}/>
                        <Block width={Dimensions.get('window').width/2} height={Dimensions.get('window').height/2}/>
                        <Block width={Dimensions.get('window').width/2} height={Dimensions.get('window').height/2}/>
                        <Block width={Dimensions.get('window').width/2} height={Dimensions.get('window').height/2}/>
                        <Block width={Dimensions.get('window').width/2} height={Dimensions.get('window').height/2}/>
                        
                        </ScrollView>
                        <Block width={Dimensions.get('window').width} height={Dimensions.get('window').height/2}/>
                        <Block width={Dimensions.get('window').width} height={Dimensions.get('window').height/2}/>
                        <Block width={Dimensions.get('window').width} height={Dimensions.get('window').height/2}/>
                        <Block width={Dimensions.get('window').width} height={Dimensions.get('window').height/2}/>
                        <Block width={Dimensions.get('window').width} height={Dimensions.get('window').height/2}/>
                        <Block width={Dimensions.get('window').width} height={Dimensions.get('window').height/2}/>
                    </ScrollView>
                </View>
                
            </SafeAreaView>    
        
    )

    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        saveToStore:(data)=>dispatch({type:'SaveStore',data:data})
    }
}

export default connect(null,mapDispatchToProps)(Article)