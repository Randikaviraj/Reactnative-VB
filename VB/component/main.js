import React,{Component} from 'react';
import {Dimensions,View,StyleSheet,Text,TextInput,TouchableOpacity} from 'react-native';
import Animated,{Easing, Extrapolate} from 'react-native-reanimated';
import {TapGestureHandler,State} from 'react-native-gesture-handler';
import Svg,{Image,Circle,ClipPath} from 'react-native-svg'


const {width,height}=Dimensions.get('window');
const {Value,event,block,eq,cond,set,Clock,startClock,stopClock,debug,timing,clockRunning,interpolate,concat }=Animated;

function runTiming(clock, value, dest) {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };
  
    const config = {
      duration: 1000,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease),
    };
  
    return block([
      cond(
        clockRunning(clock),
        [
          // if the clock is already running we update the toValue, in case a new dest has been passed in
          set(config.toValue, dest),
        ],
        [
          // if the clock isn't running we reset all the animation params and start the clock
          set(state.finished, 0),
          set(state.time, 0),
          set(state.position, value),
          set(state.frameTime, 0),
          set(config.toValue, dest),
          startClock(clock),
        ]
      ),
      // we run the step here that is going to update position
      timing(clock, state, config),
      // if the animation is over we stop the clock
      cond(state.finished, debug('stop clock', stopClock(clock))),
      // we made the block return the updated position
      state.position,
    ]);
  }

export default class Main extends Component{
    
    constructor(){
        super();
        this.btnopacity=new Value(1);

        this.handleStateChange=event([
            {
                nativeEvent:({state})=>block([
                    cond(eq(state,State.END),set(this.btnopacity,runTiming(new Clock(),1,0)))
                ])
            }
        ]);

        this.btny=interpolate(this.btnopacity,{
            inputRange:[0,1],
            outputRange:[100,0],
            extrapolate:Extrapolate.CLAMP
        });

        this.bgy=interpolate(this.btnopacity,{
            inputRange:[0,1],
            outputRange:[(-height/3)-17,0],
            extrapolate:Extrapolate.CLAMP
        });

        this.signinopcty=interpolate(this.btnopacity,{
            inputRange:[0,1],
            outputRange:[1,0],
            extrapolate:Extrapolate.CLAMP
        });
        this.signiny=interpolate(this.btnopacity,{
            inputRange:[0,1],
            outputRange:[0,100],
            extrapolate:Extrapolate.CLAMP
        });

        this.signinzindex=interpolate(this.btnopacity,{
            inputRange:[0,1],
            outputRange:[1,-1],
            extrapolate:Extrapolate.CLAMP
        });
        
        this.rotatex=interpolate(this.btnopacity,{
            inputRange:[0,1],
            outputRange:[180,360],
            extrapolate:Extrapolate.CLAMP
        });

        this.onCloseState=event([
            {
                nativeEvent:({state})=>block([
                    cond(eq(state,State.END),set(this.btnopacity,runTiming(new Clock(),0,1)))
                ])
            }
        ]);


        
    }
    
    handleSignup=()=>{
        this.props.navigation.navigate('Signup')
    }

    handleSignin=()=>{
        this.props.navigation.navigate('Login')
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'white',justifyContent:'flex-end'}}>
                <Animated.View style={{...StyleSheet.absoluteFill,translateY:this.bgy}}>
                    <Svg height={height+50} width={width}>
                    <ClipPath id='id'>
                        <Circle r={height+50} cx={width/2}/>
                    </ClipPath>
                    <Image
                    href={require('../assets/images/mainbackground.jpeg')}
                    height={height+50} width={width}
                    preserveAspectRatio='xMidYMid  slice'
                    clipPath='url(#id)'
                    />
                    </Svg>
                </Animated.View>
                <View style={{height:height / 8,}}>
                    <TapGestureHandler onHandlerStateChange={this.handleStateChange}>
                    <Animated.View style={{...styles.button,backgroundColor:'#f7e6ff',opacity:this.btnopacity,transform:[{translateY:this.btny}],height:50,}}>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>OooPs</Text>
                    </Animated.View>
                    </TapGestureHandler>
                   

                    <Animated.View style={{height:height/3,...StyleSheet.absoluteFill,top:null,justifyContent:"center",zIndex:this.signinzindex,opacity:this.signinopcty,translateY:this.signiny}}>
                        <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                            <Animated.View style={styles.close}>
                                <Animated.Text style={{fontSize:20,transform:[{rotate:concat(this.rotatex,'deg')}]}}>X</Animated.Text>
                            </Animated.View>
                        </TapGestureHandler>
                        <TouchableOpacity style={{...styles.button,backgroundColor:'#99ffff',borderColor:'#00e6e6',borderWidth:1}} onPress={this.handleSignin}>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>SIGN IN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.button,borderWidth:0.3,}} onPress={this.handleSignup}>
                            <Text style={{fontSize:13,fontWeight:'bold',}}>SIGN UP</Text>
                        </TouchableOpacity>
                        
                        
                    </Animated.View>
                </View>
                
            </View>
        )
    }
}

const styles=StyleSheet.create(
    {
        button:{
            backgroundColor:'white',
            height:70,
            marginHorizontal:20,
            borderRadius:35,
            alignItems:"center",
            justifyContent:'center',
            marginVertical:5,
            shadowOffset:{width:4,height:4},
            shadowColor:'black',
            shadowOpacity:0.3

        },
        textinput:{
            height:50,
            borderRadius:25,
            borderWidth:0.5, 
            marginHorizontal:20,
            paddingLeft:10,
            marginVertical:5,
            borderColor:'rgba(0,0,0,0.2)'
        },
        close:{
            height:40,
            width:40,
            backgroundColor:'white',
            borderRadius:20,
            alignItems:'center',
            justifyContent:'center',
            position:'absolute',
            top:-20,
            left:width/2-20,
            shadowColor:'black',
            shadowOpacity:0.3
        }
    }
);