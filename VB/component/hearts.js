import React from 'react'
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import Animated,{Easing, Extrapolate} from 'react-native-reanimated';

var heartcount=1

function randomNum(max,min){
    return Math.random()*(max-min)+min
}
export default class Hearts extends React.Component{

    state={
        hearts:[]
    }


    addHeart=()=>{
        this.setState({
            hearts:[
                ...this.state.hearts,
                {
                    key:heartcount,
                    right:randomNum(150,30)
                }
            ]
        },
        ()=>{
            
                heartcount++
            
            
        }
        )
    }

    render()
    {return(
        <View style={{flex:1}}>
            <View style={{flex:1}}>
                {
                    this.state.hearts.map(hert=>{
                        return <HeartCont key={hert.key} style={{right:hert.right}}/>
                    })
                }
            </View>
            
        <TouchableOpacity style={styles.buttom} onPress={this.addHeart}>
            <AntDesign name='hearto' size={30} color={'#005ce6'}/>
        </TouchableOpacity>
        </View>
    )}
}

class HeartCont extends React.Component{

    state={
        position:new Animated.Value(0)
    }

    render(){
        return(
            <Animated.View style={[styles.heartcontainer,this.props.style]}>
                    <Heart color='red'/>
            </Animated.View>
        )
    }
}



const Heart=props=>(
    <View {...props} style={[styles.heart,props.style]}>
        <AntDesign name='heart' size={55} color={props.color}/>
    </View>
)

const styles=StyleSheet.create({
buttom:{
height:60,
width:60,
backgroundColor:'white',
borderRadius:30,
alignItems:'center',
justifyContent:'center',
position:'absolute',
bottom:3,
left:3
},
heart:{
   width:50,
   height:50,
   alignItems:'center',
   justifyContent:'center',
   backgroundColor:'transparent'  
},
heartcontainer:{
    position:'absolute',
    bottom:30,
    backgroundColor:'transparent' 

}

})