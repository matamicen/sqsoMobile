import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, Modal, StyleSheet, TouchableHighlight, TouchableOpacity  } from 'react-native';
import { connect } from 'react-redux';
import { setBand, postQsoNew, onprogressTrue, onprogressFalse, postQsoEdit, actindicatorPostQsoNewTrue } from '../../actions';
import PropTypes from 'prop-types';
import { updateOnProgress, check_firstTime_OnProgress, hasAPIConnection } from '../../helper';
import VariosModales from './VariosModales';



class QsoBand extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
       //   pickerSelection: 'Choose Band',
          pickerDisplayed: false,
          nointernet: false
         
       
        };
      }

      componentDidMount() {
 
    }

    
      setPickerValue = async (value) => {
     //     this.setState({pickerSelection: value});

     if (await hasAPIConnection())
     {
     if (this.props.band!==value){    
                console.log("pasa por setBand");
               
                
                 this.props.setBand(value);
                
                  
                  
                if (ONPROGRESS=updateOnProgress(this.props.qsotype,value,this.props.mode,this.props.qsoqras,this.props.mediafiles))
                await this.props.onprogressTrue();
           else
                 this.props.onprogressFalse();

                 if (this.props.sqlrdsid===''){
            
                    // chequeo si esta OnProgress para poder obtener el SqlRdsID de AWS RDS
                  if (ONPROGRESS) {
                   data = check_firstTime_OnProgress(this.props.qsotype,value,this.props.mode,
                                                this.props.qra,ONPROGRESS,this.props.sqlrdsid, this.props.latitude,
                                                this.props.longitude);
                        console.log("Data to Send API: "+ JSON.stringify(data));  
                       this.props.actindicatorPostQsoNewTrue();
                       this.props.postQsoNew(data,this.props.qsoqras,this.props.mediafiles,this.props.jwtToken);
                       
                  }else console.log("Todavia no esta OnProgreSSS como para llamar a PostNewQso");
                    
                  }else {
                      qsoHeader = { "mode" : this.props.mode,
                                    "band" : value,
                                    "type" : this.props.qsotype,
                                    "sqlrdsid" : this.props.sqlrdsid,
                                    "qra": this.props.qra
                                  }
                                  console.log("antes de enviar a API qdoHeader:"+ JSON.stringify(qsoHeader))

                         await this.props.postQsoEdit(qsoHeader,this.props.jwtToken);         

                       }  

            }
          this.togglePicker();
        }else
        { this.togglePicker();
          this.setState({nointernet: true});
        }
        
      }

      closeVariosModales = () => {
        this.setState({nointernet: false}); 
        // this.togglePicker();
      }


      togglePicker = () => {
          console.log("llamo togglepicker")
        this.setState({pickerDisplayed: !this.state.pickerDisplayed})
    }


    render() { console.log("RENDER qso BAND" );
              
               const pickerValues = [
                {
                    title: '23cm',
                    value: '23cm'
                },
                   {
                       title: '70cm',
                       value: '70cm'
                   },
                   {
                    title: '1.25m',
                    value: '1.25m'
                },
                {
                    title: '2m',
                    value: '2m'
                },
                {
                    title: '6m',
                    value: '6m'
                },
                {
                    title: '10m',
                    value: '10m'
                },
                {
                    title: '15m',
                    value: '15m'
                },
                {
                    title: '17m',
                    value: '17m'
                },
                {
                    title: '20m',
                    value: '20m'
                },
                {
                    title: '40m',
                    value: '40m'
                },
                {
                    title: '60m',
                    value: '60m'
                },
                {
                    title: '80m',
                    value: '80m'
                },
                {
                    title: '160m',
                    value: '160m'
                }
               ]
              


        return <View>               
                                 
                                 {/* , marginLeft: 33 */}
               <TouchableOpacity   onPress={() => this.togglePicker()} style={{ width: 70, height: 50 }}>                  
               <Text style={{ fontSize: 19, color: '#999', marginTop: 8, marginLeft: 6  }} onPress={() => this.togglePicker()} >{this.props.band}</Text>
               </TouchableOpacity >
               <Modal visible ={this.state.pickerDisplayed} animationType={"slide"} transparent={true} onRequestClose={() => console.log('Close was requested')}>
                    <View style={{ margin:20,
                         padding:20, 
                         backgroundColor: '#efefef',
                         bottom: 10,
                         left: 20,
                         right: 20,
                         position: 'absolute',
                         alignItems: 'center'                      
                          }}>
                          
                    <Text style={{ fontWeight: 'bold', alignItems: 'center', marginBottom:10}}>Please pick a Band </Text>
                    {pickerValues.map((value, index) => {
                        return  <TouchableOpacity key={index} onPress={() => this.setPickerValue(value.title)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                                 <Text style={{ fontSize: 19, padding:3}} >{value.title}</Text>
                                 </TouchableOpacity >
                    })}

                    <TouchableOpacity   onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4}}>
                      <Text style={{ color: '#999'}}>Cancel</Text>
                    </TouchableOpacity >
                    </View>

               
               </Modal>
               {(this.state.nointernet) && 
               <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
               }
          

            </View>
       
     } 

 }

 QsoBand.propTypes = {
   
};


 const mapStateToProps = state => {
    return {        
        band: state.sqso.currentQso.band,
        mode: state.sqso.currentQso.mode,
        qsotype: state.sqso.currentQso.qsotype,
        qsoqras: state.sqso.currentQso.qsoqras,
        sqlrdsid: state.sqso.currentQso.sqlrdsId,
        latitude: state.sqso.currentQso.latitude,
        longitude: state.sqso.currentQso.longitude,
        isfetching: state.sqso.isfetching,
        qra: state.sqso.qra,   
        mediafiles: state.sqso.currentQso.mediafiles,
        jwtToken: state.sqso.jwtToken
    };
};


const mapDispatchToProps = {
    setBand,
    postQsoNew,
    onprogressTrue,
    onprogressFalse,
    postQsoEdit,
    actindicatorPostQsoNewTrue
    
   }

export default connect(mapStateToProps, mapDispatchToProps)(QsoBand);

