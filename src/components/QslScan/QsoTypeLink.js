import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, TouchableOpacity, Modal, 
  TouchableHighlight  } from 'react-native';
import { connect } from 'react-redux';
import { cambioqsotype, postQsoEdit, resetQso } from '../../actions';
import PropTypes from 'prop-types';


class QsoTypeLink extends Component {

    constructor(props) {
        super(props);
        this.state = {
          changeqsoModal: false
        }
      }

  

   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }


      openQsoTypeModal = () => {
        //this.props.cambioqsotype();
        this.setState({changeqsoModal: true})
        }

      closeQsoTypeModal = () => {
        this.setState({changeqsoModal: false})
      }

   


    render() { console.log("RENDER qso Header ... QSOTYPE: "+ this.props.qsotype);
           
              
        return( <View style={{marginLeft: 5} }>

              { (this.props.type==='QSO') ?
            
                 <Image source={require('../../images/inQSO.png')} style={{width: 50, height: 50} } 
                 resizeMode="contain" /> 
          
                

               :  (this.props.type==='LISTEN') ? 
              
                 <Image source={require('../../images/listen.png')} style={{width: 50, height: 50} } 
                 resizeMode="contain" />
               
                  :

                (this.props.type==='POST') ? 
               
                 <Image source={require('../../images/post.png')} style={{width: 50, height: 50} } 
                 resizeMode="contain" />
              
                 
                 : null
                }
  
              
  

            
            </View>
       
        )} 

 }

 const styles = StyleSheet.create({
   content: {
    marginTop: 30,
    marginLeft: 10,
    flexDirection: 'row'
   

    

    }
});

QsoTypeLink.propTypes = {
   
  };


 const mapStateToProps = state => {
    return { 
      sqsoqslscan: state.sqso.currentQso.qslscan.body.message,
      jwtToken: state.sqso.jwtToken
           
    };
};


const mapDispatchToProps = {
  
   
   }

export default connect(mapStateToProps, mapDispatchToProps)(QsoTypeLink);