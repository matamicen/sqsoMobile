import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, TouchableOpacity  } from 'react-native';
import { connect } from 'react-redux';
import { uploadMediaToS3 } from '../../actions';
import PropTypes from 'prop-types';
import PlayMediaAudio from './PlayMediaAudio';



class Media extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
       
        };
      }

  

   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }




    render() { console.log("RENDER MEDIA");
   
                           
              
        return( <View >

               

                 {
                   (this.props.mostrar==='image') &&  
                        (this.props.type===this.props.mostrar) && 
                    // <View style={{flexDirection: 'row'}}> 
                    <View >
                     
                        <Image  
                        style={styles.faceImageStyle}
                        source={{ uri: this.props.imageurl }}
                        resizeMethod="resize"
                        resizeMode="contain"
                        />
                       
                        <Text style={{textAlign: 'center', fontSize: 16, color: '#243665'}} >{this.props.description}</Text>
                        {/*  <S3Image imgKey="209fb104-22bc-4ada-9afd-079b78b4e9dc/cr7.jpg" /> */}
                  </View>
              
                 }

                 {
                   (this.props.mostrar==='audio') &&  
                        (this.props.type===this.props.mostrar) && 
                        // <Text> es audio {this.props.imageurl}</Text>
                         <PlayMediaAudio url={this.props.imageurl} description={this.props.description} datetime={this.props.datetime}/>
                        // <PlayMediaAudio url="https://s3.amazonaws.com/sqso/protected/us-east-1%3Acc508f7e-92fb-41f5-b0ef-8ba6831ce09c/images/test.mp4" />
                       
                 }

               
          
          
              </View>

            
           
       
        )} 

 }

 
const styles = StyleSheet.create({
       faceImageStyle: {
        //    height: 350,
        //    width: 750
        // height: 216,
        // width: 384,
        height: 259.2,
        width: 460.8,
        borderRadius: 15
        
        
       
       
    //   borderRadius: 30
       },
    name:{
        fontSize: 12,
        marginLeft: 5,
        padding: 2,
        fontWeight: 'bold',        
        color: 'orange'        
    },
    status:{
      fontSize: 16,
      marginTop: 2,
      textAlign: 'right',
     // padding: 2,
     // fontWeight: 'bold',        
      color: 'grey'        
  }
  });

  Media.propTypes = {
    imageurl: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string
  };



 const mapStateToProps = state => {
    return {  };
};


const mapDispatchToProps = {
    uploadMediaToS3
   }

export default connect(mapStateToProps, mapDispatchToProps)(Media);