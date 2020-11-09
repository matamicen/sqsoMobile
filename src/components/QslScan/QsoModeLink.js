import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, Modal, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { setMode, postQsoNew, onprogressTrue, onprogressFalse, postQsoEdit, actindicatorPostQsoNewTrue } from '../../actions';
import PropTypes from 'prop-types';
import { updateOnProgress, check_firstTime_OnProgress} from '../../helper';
import I18n from '../../utils/i18n';

class QsoModeLink extends React.PureComponent {

    constructor(props) {
        super(props);
        
     
      }

    componentDidMount() {
 
       }

    


    render() { console.log("RENDER qso MODE" );
              

        return <View >               
                                 
         {/* {(this.props.sqsoqslscanerror===0) && */}
               <Text style={{ fontSize: 16, color: '#999'}}> {I18n.t("QSLSCANQR_MODE")}
               <Text style={{ fontSize: 16, color: 'black'}}> {this.props.mode} </Text>
               
               </Text>
         {/* } */}
             
             
          

            </View>
       
     } 

 }

 QsoModeLink.propTypes = {
   
};


 const mapStateToProps = state => {
    return {        
        sqsoqslscan: state.sqso.currentQso.qslscan.body.message,
        sqsoqslscanerror: state.sqso.currentQso.qslscan.body.error,    
     };
};


const mapDispatchToProps = {

   }

export default connect(mapStateToProps, mapDispatchToProps)(QsoModeLink);

