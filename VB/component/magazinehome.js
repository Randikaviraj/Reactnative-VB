import React,{Component} from 'react';
import  {View,Text,SafeAreaView,Dimensions,AsyncStorage,BackHandler,Alert,ActivityIndicator,FlatList,TouchableOpacity,Vibration, Platform} from 'react-native';
import Block from './block'
import {connect} from 'react-redux'
import {Foundation } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';


class MagazineHome extends Component{

    constructor(props){
        super(props)
        this.state={
            fname:'',
            lname:'',
            email:'',
            isloadingdata:true
        }
        this.loadedfaild=false
    }

    

    backAction = () => {
        
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

    this.props.saveToStore({fname:fname,lname:lname,email:email})
    this.getCacheprofile(email)

   }




   getCacheprofile=async (data)=>{
 
    try{
         
    
          fetch('http://192.248.43.4:8080/user/getfilename',{
            method:'POST',
            body: JSON.stringify({ 
                email:data,
            }), 
            headers: { 
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json",} 
              }
            ).then((res)=>res.json()).then(
              (res)=>{
                
                console.log('filename'+res.filename)
                var cacheuri='no uri'
                var today = new Date();
                var date = today.getFullYear()+'z'+(today.getMonth()+1)+'z'+today.getDate();
                var time = today.getHours()+'z'+today.getMinutes()+'z'+today.getSeconds();
                
                FileSystem.downloadAsync(
                  `http://192.248.43.4:8080/profilepic/${res.filename}`,
                  FileSystem.cacheDirectory + `profile${date}${time}${res.filename}`
                )
                  .then(({ uri }) => {
                    
                    console.log('Finished downloading to ', uri);
                    this.props.updateProfileUri(uri)
                    this.setState({profileuri:uri})
                  })
                  .catch(error => {
                    console.error(error);
                  });
                  
            
            
            }
          ).catch((e)=>{
              console.log(e)
              
        })
      
              
         
           
    
    }catch(e){
        
        console.log("Error in saga functons  ..............."+e)
        return ''
    }
}







   getBlogData=async ()=>{
    this.loadedfaild=false
 
    try{
             fetch('https://www.googleapis.com/blogger/v3/blogs/4281507632887219271/posts/?maxResults=100&key=AIzaSyArAzxYYs9fmVWVTCdR3bD3l5-U0MYiljw',{
                method:'GET',
                headers: { 
                    "Content-type": "application/json; charset=UTF-8",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                    
                
                } 
            }
              ).then((res)=>res.json()).then(
                (response)=>{
                    this.loadedfaild=false
                    this.props.saveToMagazineStore(response)
                    this.setState({isloadingdata:false})
                    
                    
                }
            ).catch((err)=>{
                
                Alert.alert('Something Wrong','Check your network connection',[{text: 'OK',}])
                this.loadedfaild=true
                this.setState({isloadingdata:false})
 
                }
            )
        
         
           
    
    }catch(e){
        console.log('Error in get blog data'+e)
        Alert.alert('Something Wrong','Check your network connection',[{text: 'OK',}])
        this.loadedfaild=true
        this.setState({isloadingdata:false})
 
        }
    }

    navgateMagazine=(indexno)=>{
        console.log(indexno)
        this.props.navigation.navigate('MagazineContent',{indexno:indexno})
    
    }



render(){

   
    if(this.loadedfaild){
            
        return(
            <View style={{flex:1}}>
                <TouchableOpacity style={{alignContent:'center',alignItems:'center',alignSelf:'center',flexDirection:'row',flex:1}} onPress={()=>{
                    this.getCacheprofile(this.state.email)
                    this.loadedfaild=false
                    this.setState({isloadingdata:true})
                    }}>
                    <Foundation name='refresh' size={50} />
                </TouchableOpacity>
                
            </View>
        )
    }

    if(this.state.isloadingdata){
        this.getBlogData()
        return(
            <View style={{flex:1,}}>
            
                <ActivityIndicator style={{alignSelf:'center',marginTop:100}}/>
                
            </View>
        )
    }
    else{
        
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'#bbbbbb'}}>
                <View style={{flex:1,}}>
                        <View style={{backgroundColor:'#bbbbbb'}}>
                        <Text style={{fontSize:25,fontWeight:'700',paddingHorizontal:25}}></Text>
                        </View>

                        <View
                        scrollEventThrottle={16}
                        style={{
                            alignContent:'center',
                            alignSelf:'center',
                            justifyContent:'center'
                        
                        }}
                        >
                            <FlatList
                                            data={this.props.datamagazine.items}
                                            renderItem={({item})=>(
                                                <View style={{borderWidth:8,borderColor:'#363231',borderRadius:15,marginHorizontal:4}}>
                                                <Block width={Dimensions.get('window').width/1.4} height={Dimensions.get('window').height/2} title={item.title} content={item.content}
                                                indexno={parseInt(item.labels[0].split(' ')[1])}
                                                onNav={this.navgateMagazine}
                                                />
                                                </View>
                                            )}
                                            keyExtractor={(item)=>item.id}
                                        />
                    
                        </View>
                </View>
        </SafeAreaView>    
    
        )}
    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        saveToStore:(data)=>dispatch({type:'SaveStore',data:data}),
        saveToMagazineStore:(data)=>dispatch({type:'MagazineCoverssave',data:data}),
        updateProfileUri:(data)=>dispatch({type:'ProfilcachUri',data:data}),
    }
}

const mapStateToProps=(state)=>{
    return{
        datamagazine:state.rA.magazineCovers,
        
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(MagazineHome) 
