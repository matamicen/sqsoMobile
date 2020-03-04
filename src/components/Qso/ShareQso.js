import React, { Component } from 'react';
import { View, Platform, Text, TouchableOpacity, Image,  Animated,
  Easing, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Share from 'react-native-share';


  


class ShareQso extends Component {


  constructor(props) {
    super(props);
    
    this.state = {

      fadeValue: new Animated.Value(0),
      xValue: new Animated.Value(0),
      springValue: new Animated.Value(0.3),
      rotateValue: new Animated.Value(0)
    
      
    };
  }

  componentDidMount() {

    setTimeout(() => {
      this.rotateAnimation();
        
       }
      , 1500);
  }


  rotateAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.fadeValue, {
        toValue: 1,
        duration: 600,

      }),
      Animated.spring(this.state.springValue, {
        toValue: 1,
        friction: 1.3
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 100,
        duration: 600,
        asing: Easing.linear,
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 0,
        duration: 0,
      }),
     
          ]).start(() => {

          });
 

 }

  share = () => {
  
    const url = 'https://www.superqso.com/qso/e2166569-599b-11ea-9581-0a96c372e817';
    const title = 'Awesome Contents';
    const message = 'Please check out this QSO.';
    const options = {
          title,
          subject: title,
          message: `${message} ${url}`,
        }
    // const options = Platform.select({
    //   ios: {
    //     activityItemSources: [
    //       {
    //         placeholderItem: { type: 'url', content: url },
    //         item: {
    //           default: { type: 'url', content: url },
    //         },
    //         subject: {
    //           default: title,
    //         },
    //         linkMetadata: { originalUrl: url, url, title },
    //       },
    //       {
    //         placeholderItem: { type: 'text', content: message },
    //         item: {
    //           default: { type: 'text', content: message },
    //           message: null, // Specify no text to share via Messages app.
    //         },
    //       },
    //     ],
    //   },
    //   default: {
    //     title,
    //     subject: title,
    //     message: `${message} ${url}`,
    //   },
    // });
    
    Share.open(options);
    

  }
    
render() { console.log("RENDER share SCREEN!" );
const interpolatedRotateAnimation = this.state.rotateValue.interpolate({
  inputRange: [0,  100],
  outputRange: ['0deg','360deg']
});
    

return <View>
{/* style={{ width: 65 }} */}
<Animated.View style={[styles.animationView,
                    {opacity: this.state.fadeValue},
                    // {transform: [{scale: this.state.springValue}], alignSelf: 'center'}
                  // {left: this.state.xValue}
                    ]} >
                <TouchableOpacity 
                  onPress={() => this.share()}  >
                <Animated.View style={[styles.button,{alignSelf: 'center' } ]} >
                 <Animated.Image 
                                    source={require('../../images/share3.png')}
                                    style={[styles.imageView,
                                    //  {opacity: this.state.fadeValue},
                                    {left: this.state.xValue },
                                    // {transform: [{scale: this.state.springValue}], alignSelf: 'center'}
                                    {transform: [{rotate: interpolatedRotateAnimation}], alignSelf: 'center'}
                                  ]}>
                   </Animated.Image>                 
                  {/* <Image
                  source={require("../../images/share3.png")}
                  style={{ width: 33, height: 33, marginLeft: 15, marginTop: 2 }}
                  resizeMode="contain"
                /> */}
                  {/* <Text style={{ fontSize: 13, color: "black", marginLeft: 8 }}>
                    Share
                  </Text> */}

             </Animated.View>   
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => this.share()}  >
                      <Animated.View 
                      style={[{transform: [{scale: this.state.springValue}], alignSelf: 'center'}
                      
                          ]}>
                         <Text style={{ fontSize: 13, color: "black", marginLeft: 6, marginTop: 0 }}>
                          Share
                          </Text>
                      </Animated.View>
                    </TouchableOpacity>




            </Animated.View>

    </View>

  }

}


const styles = StyleSheet.create({
 
  animationView: {
    // position: "absolute",
      //  marginTop: 85,
    // right: 180
    // width: 100,
    // height: 100,
  //  backgroundColor: 'skyblue',
  },
  imageView: {
    width: 29,
    height: 29,
    resizeMode : 'contain'
    
    
  },
  button: {
    // width: 70,
    // height: 70,
    // alignItems: "center",
    // justifyContent: "center",
    // shadowColor: "#333",
    // shadowOpacity: .1,
    // shadowOffset: {x:2, y:0},
    // shadowRadius: 2,
    // borderRadius: 35,
    // backgroundColor: '#243665'


  }
  
});


 const mapStateToProps = state => {
    return {  

        
     };
};


const mapDispatchToProps = {
    
   
   }

export default connect(mapStateToProps, mapDispatchToProps)(ShareQso);