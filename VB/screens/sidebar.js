import React,{Component} from 'react';
import {StyleSheet,View,Text,ScrollView,ImageBackground,Image} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer'
import {connect} from 'react-redux'


class Sidebar extends Component{

render(){
    return(
        <ScrollView>
            <ImageBackground source={require('../assets/images/SidebarBackground.jpg')}
            style={{width:undefined,padding:16,paddingTop:48}}>
                <Image source={require('../assets/images/face.jpg')} style={styles.face}/>
                <Text style={styles.name}>{this.props.fname} {this.props.lname}</Text>
                
            </ImageBackground>
            <View style={styles.container}>
                    <DrawerNavigatorItems {...this.props}/>
            </View>
        </ScrollView>
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

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    face:{
        width:80,
        height:80,
        borderRadius:40,
        borderWidth:3,
        borderColor:'white'
    },
    name:{
        color:'white',
        fontSize:20,
        fontWeight:'800',
        marginVertical:8
    }
})

export default connect(mapStateToProps)(Sidebar)