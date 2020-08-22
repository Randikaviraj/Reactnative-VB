import React,{Component} from 'react';
import { Image, View ,TouchableOpacity,Alert,ActivityIndicator,ImageBackground} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

export default class ImageUpload extends Component {

  constructor(props){
    super(props)
    this.state = {
      response:{status:false,network:false},
      responseStatus:false,
      uri:this.props.profileuri
    };
    
    
  }


  componentDidMount() {
    this.getPermissionAsync();
    this.getCacheprofile(this.props.email)
    
  }


  componentDidUpdate(){
  
  if(this.state.responseStatus){
       
        if(!this.state.response.status && !this.state.response.network){
            Alert.alert('Something wrong','Check your network connection',[{text: 'OK',}])
            
            this.setState({
              image: null,
              data:null,
              response:{status:false,network:false},
              responseStatus:false})
              return
        }
        if(!this.state.response.status && this.state.response.network){
            Alert.alert('Something Wrong','Couldn\'t upload photo',[{text: 'OK',}])
            this.setState({
              image: null,
              data:null,
              response:{status:false,network:false},
              responseStatus:false})
              return
        }
        
        if(this.state.response.status){
          
          this.setState({response:{status:false,network:false},
            responseStatus:false});
                
        }
    }
  
}



getUpload=async (uri)=>{
     
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

        fetch('http://192.248.43.4:8080/user/savefilename',{
          method:'POST',
          body: JSON.stringify({ 
              email:this.props.email,
              filename:`${this.props.email}.${fileType}`
          
          }), 
          
          headers: { 
              "Content-type": "application/json; charset=UTF-8",
              "Accept": "application/json",} 
            
            }).then((respond)=>{

              if(respond.status){
                      fetch('http://192.248.43.4:8080/user/uploadimage',options
                      ).then((res)=>res.json()).then(
                        (response)=>{
                            this.props.updateProfileUri(uri)
                            this.setState({response:response,responseStatus:true,uri:uri})
                            
                        }
                    ).catch((e)=>{
                        console.log("Error in uploadin error..............."+e)
                        this.setState({response:{status:false,network:false},responseStatus:true})
                    })
              }
                  
      }).catch((error)=>{
            this.setState({response:{status:false,network:false},responseStatus:true})
      })

}




        
 
render(){
  
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
              <ImageBackground source={require('../assets/images/pp.jpg')}
               style={{ width:200,
                height:200,
                borderRadius:120,
                overflow:'hidden',
                alignSelf:'center'}}>
              <Image source={{uri:this.state.uri}} style={{           
                width:200,
                height:200,
                borderRadius:120,
                overflow:'hidden',
                alignSelf:'center' }}/>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        );
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
      this.getUpload(result.uri)
    }
    
  };



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
                    this.setState({uri:uri})
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

}


