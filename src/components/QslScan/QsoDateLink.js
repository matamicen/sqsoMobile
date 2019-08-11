import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, Modal, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { setMode, postQsoNew, onprogressTrue, onprogressFalse, postQsoEdit, actindicatorPostQsoNewTrue } from '../../actions';
import PropTypes from 'prop-types';
import { updateOnProgress, check_firstTime_OnProgress} from '../../helper';

class QsoDateLink extends Component {

    constructor(props) {
        super(props);
        
     
      }

    componentDidMount() {
 
       }


        


    render() { console.log("RENDER QsoDate de QSLSCAN" );
//    {this.props.sqsoqslscan.datetime.substr(0,12)}
    //    console.log(JSON.stringify(this.props.sqsoqslscan));

        return <View >        

                 {/* {(this.props.sqsoqslscanerror===0) && */}
               <Text style={{ fontSize: 16, color: '#999'}}>Date:
               <Text style={{ fontSize: 16, color: 'orange'}}>  {this.props.datetime.substr(0,12)} </Text>
               
               </Text>
       {/* } */}
{/*                                  
         {(this.props.sqsoqslalreadyscan==='full') &&
               <Text style={{ fontSize: 18, color: '#999', marginTop: 13, marginLeft: 5}}>QTR (UTC):
               <Text style={{ fontSize: 18, color: 'orange'}}> {this.props.sqsoqslscan.datetime.substr(11, 5)} </Text>
               
               </Text> 
         }
         */}
             
             
          

            </View>
       
     } 

 }

 QsoDateLink.propTypes = {
   
};


 const mapStateToProps = state => {
    return {        
      //  sqsoqslalreadyscan: state.sqso.qslAlreadyScan,  
        sqsoqslscanerror: state.sqso.currentQso.qslscan.body.error,  
        sqsoqslscan: state.sqso.currentQso.qslscan.body.message 
       
     };
};


const mapDispatchToProps = {

   }

export default connect(mapStateToProps, mapDispatchToProps)(QsoDateLink);

