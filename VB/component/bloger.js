import React,{Component} from 'react';
import  {View,Dimensions,FlatList,ActivityIndicator,Alert,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import SmallBlock from './smallblock'
import {Foundation } from '@expo/vector-icons';
import { colorCode } from "../assets/colorcode";
import { Searchbar ,Text} from "react-native-paper";

const {height,width}=Dimensions.get('window')

class Blogger extends Component{

    constructor(props){
        super(props);
        this.state={
            isloadingdata:true
        }

        this.loadedfaild=false
    }
    state = {
        searchQuery: "",
        noResult:false,
      };


    path = 'https://www.googleapis.com/blogger/v3/blogs/6072990315574228729/posts/?maxResults=200&key=AIzaSyArAzxYYs9fmVWVTCdR3bD3l5-U0MYiljw'
    _onChangeSearch = query => {
      this.setState({ searchQuery: query })
      
      if(query==''){
        this.getBlogData(true)
        console.log('close',query)
      }
  
    }


    getBlogData=async (forceUsed=false)=>{
        this.loadedfaild=false

        if((this.state.searchQuery=='' || this.state.searchQuery==null)|| forceUsed==true){
            console.log(forceUsed)
            this.path = "https://www.googleapis.com/blogger/v3/blogs/6072990315574228729/posts/?maxResults=200&key=AIzaSyArAzxYYs9fmVWVTCdR3bD3l5-U0MYiljw"
       
          }else{
            console.log(this.state.searchQuery)
            this.path = 'https://www.googleapis.com/blogger/v3/blogs/6072990315574228729/posts/search/?q='+ this.state.searchQuery+'&key=AIzaSyArAzxYYs9fmVWVTCdR3bD3l5-U0MYiljw'
          
        }
     
        try{
                 fetch(this.path,{
                    method:'GET',
                    headers: { 
                        "Content-type": "application/json; charset=UTF-8",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                        
                    
                    } 
                }
                  ).then((res)=>res.json()).then(
                    (response)=>{
                        this.loadedfaild=false
                        this.props.saveToStore(response)
                        this.setState({isloadingdata:false})
                        
                        
                    }
                ).catch((err)=>{
                    
                    console.log('Error in get blog data'+err)
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


    NoResult(){
        if(this.props.datablog.items==[])
          this.setState({noResult:true})
          else{
            this.setState({noResult:false})
          }
        if(this.state.noResult){
          return (
            <Text>No Result</Text>
          )
        }else{
          return(null)
        }
      }
    


    render(){
        const { searchQuery } = this.state;
        if(this.loadedfaild){
            
            return(
                <View style={{flex:1,}}>
                    <TouchableOpacity style={{alignContent:'center',alignItems:'center',alignSelf:'center',flexDirection:'row',flex:1}} onPress={()=>{
                        this.loadedfaild=false
                        this.getBlogData()
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
                        <View style={{flex:1,}}>
                                <View style={{marginLeft:'auto',marginRight:'auto',width:'100%',    paddingTop: 3,backgroundColor:'#999999'}}>
                                        <Searchbar
                                            style={{paddingVertical:5,marginHorizontal:20}}
                                            placeholder="Search"
                                            onChangeText={this._onChangeSearch}
                                            value={searchQuery}
                                            onSubmitEditing={this.getBlogData}
                                            onIconPress={this.getBlogData}
                                            
                                            />
                                            {this.props.datablog.items!=null
                                            ?null
                                            : <Text style={{fontSize:30,marginHorizontal:10,marginTop:5,alignSelf:"center"}}>No Result</Text>
                                            }
                                    <View style={{backgroundColor:'#999999',width:width,marginTop:5,   marginBottom:115}}>
                                       
                                        <FlatList
                                            data={this.props.datablog.items}
                                            renderItem={({item})=>(
                                                <SmallBlock title={item.title} 
                                                    content={item.content}/>
                                            )}
                                            keyExtractor={(item)=>item.id}
                                        />
                                    </View>

                                </View>
                        </View>
                    )}

        }
}

const mapStateToProps=(state)=>{
    return{
        datablog:state.rA.blogdata,
        
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        saveToStore:(data)=>dispatch({type:'SaveBlogData',data:data})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Blogger) 