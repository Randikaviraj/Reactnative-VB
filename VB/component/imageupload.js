import React,{Component} from 'react';
import { Image, View ,TouchableOpacity,Alert,ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


export default class ImageUpload extends Component {

  constructor(props){
    super(props)
    this.state = {
      image: null,
      isloading:false,
      response:{status:false,network:false},
      responseStatus:false
    };
    this.image=null
  }

  componentDidMount() {
    this.getPermissionAsync();
  }
  componentDidUpdate(){
    
  if(this.state.responseStatus){
         console.log(' 1...'+this.state.response.status)  
         console.log(' 2...'+this.state.response.network)  
        if(!this.state.response.status && !this.state.response.network){
            Alert.alert('Something wrong','Check your network connection',[{text: 'OK',}])
            
            this.setState({
              image: null,
              data:null,
              isloading:false,
              response:{status:false,network:false},
              responseStatus:false})
              return
        }
        if(!this.state.response.status && this.state.response.network){
            Alert.alert('Something Wrong','Couldn\'t upload photo',[{text: 'OK',}])
            this.setState({
              image: null,
              data:null,
              isloading:false,
              response:{status:false,network:false},
              responseStatus:false})
              return
        }
        
        if(this.state.response.status){
            
          this.setState({ image: this.image,isloading:false,response:{status:false,network:false},
            responseStatus:false});
                
        }
    }
  
}



  getUpload=async (uri)=>{
    
    console.log(uri)
    console.log(this.props.email)
   
    let fileType = uri.substring(uri.lastIndexOf(".") + 1);

    let formData = new FormData();
  
    formData.append("photo", {
      uri,
      name: `${this.props.email}.${fileType}`,
      type: `image/${fileType}`
    });
  
    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    };
    
    fetch('http://192.168.42.127:3330/user/uploadimage',options
    ).then((res)=>res.json()).then(
       (response)=>{
           
           this.setState({response:response,responseStatus:true})
           
       }
   ).catch((e)=>{
       console.log("Error in uploadin error..............."+e)
       this.setState({response:{status:false,network:false},responseStatus:true})
   })



  }


        
 
render(){
    let { image } = this.state;

      if(this.state.isloading){
            
          return(
                  <View style={styles.main}>
                      
                      <ActivityIndicator style={{alignSelf:'center'}}/>
                      
                  </View>
              )
      }
      else{

        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this._pickImage} style={{width:200,
            height:200,
            borderRadius:120,
            overflow:'hidden',
            alignSelf:'center',
            backgroundColor:'grey',
            borderWidth:4
            }}>
            
            <Image source={image!=null? { uri: `data:image/jpeg;base64,${image}` } : require('../assets/images/pp.jpg')} style={{           
                width:200,
                height:200,
                borderRadius:120,
                overflow:'hidden',
                alignSelf:'center' }} />
            </TouchableOpacity>
          </View>
        );

      }
  }
    
  

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64:true
    });

    

    if (!result.cancelled) {
      this.image=result.base64
      this.getUpload(result.uri)
     
    }
    
  };

}
