import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, Modal, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { setMode, postQsoNew, onprogressTrue, onprogressFalse, postQsoEdit, actindicatorPostQsoNewTrue } from '../../actions';
import PropTypes from 'prop-types';
import { updateOnProgress, check_firstTime_OnProgress} from '../../helper';

class QsoQtrLink extends Component {

    constructor(props) {
        super(props);
        
     
      }

    componentDidMount() {
 
       }

    


    render() { console.log("RENDER qso MODE" );
              
// {this.props.sqsoqslscan.datetime.substr(13, 5)} 
        return <View style={{flexDirection: 'row'}}>        
     
                                 
         {/* {(this.props.sqsoqslscanerror===0) && */}
               <Text style={{ fontSize: 16, color: '#999'}}>QTR(UTC):
               <Text style={{ fontSize: 16, color: 'orange'}}> {this.props.datetime.substr(13, 5)} </Text>
               
               </Text> 
         {/* } */}
         
             
          

            </View>
       
     } 

 }

 QsoQtrLink.propTypes = {
   
};


 const mapStateToProps = state => {
    return {        
        sqsoqslscan: state.sqso.currentQso.qslscan.body.message,
        sqsoqslscanerror: state.sqso.currentQso.qslscan.body.error,  
        //sqsoqslalreadyscan: state.sqso.qslAlreadyScan,    
     };
};


const mapDispatchToProps = {

   }

export default connect(mapStateToProps, mapDispatchToProps)(QsoQtrLink);
