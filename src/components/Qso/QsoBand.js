import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, Modal, StyleSheet, TouchableHighlight, TouchableOpacity  } from 'react-native';
import { connect } from 'react-redux';
import { setBand, postQsoNew, onprogressTrue, onprogressFalse, postQsoEdit, actindicatorPostQsoNewTrue } from '../../actions';
import PropTypes from 'prop-types';
import { updateOnProgress, check_firstTime_OnProgress, hasAPIConnection } from '../../helper';
import VariosModales from './VariosModales';
import I18n from '../../utils/i18n';


class QsoBand extends React.PureComponent {

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

    //  if (await hasAPIConnection())
    //  {
     if (this.props.band!==value){    
                console.log("pasa por setBand");
               
                
                 this.props.setBand(value);
                
                  
                  
                if (ONPROGRESS=updateOnProgress(this.props.qsotype,value,this.props.mode,this.props.qsoqras,this.props.mediafiles))
                await this.props.onprogressTrue();
           else
                 this.props.onprogressFalse();

                 //#PUBLISH
                //  if (this.props.sqlrdsid===''){
            
                //     // chequeo si esta OnProgress para poder obtener el SqlRdsID de AWS RDS
                //   if (ONPROGRESS) {
                //    data = check_firstTime_OnProgress(this.props.qsotype,value,this.props.mode,this.props.rst,
                //            this.props.db, this.props.qra,ONPROGRESS,this.props.sqlrdsid, this.props.latitude,
                //                                 this.props.longitude);
                //         console.log("Data to Send API: "+ JSON.stringify(data));  
                //        this.props.actindicatorPostQsoNewTrue();
                //        this.props.postQsoNew(data,this.props.qsoqras,this.props.mediafiles,this.props.jwtToken);
                       
                //   }else console.log("Todavia no esta OnProgreSSS como para llamar a PostNewQso");
                    
                //   }else {
                //       qsoHeader = { "mode" : this.props.mode,
                //                     "band" : value,
                //                     "type" : this.props.qsotype,
                //                     "sqlrdsid" : this.props.sqlrdsid,
                //                     "qra": this.props.qra,
                //                     "rst" : this.props.rst
                //                   }
                //                   console.log("antes de enviar a API qdoHeader:"+ JSON.stringify(qsoHeader))

                //          this.props.postQsoEdit(qsoHeader,'band',this.props.jwtToken);         

                //        } 
                 //#PUBLISH 

            }
          this.togglePicker();
        // }
        // else
        // { this.togglePicker();
        //   this.setState({nointernet: true});
        // }
        
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
                    title: '12m',
                    value: '12m'
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
                    title: '30m',
                    value: '30m'
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
             {/* <TouchableOpacity   style={styles.buttonBandContainer} onPress={() => this.togglePicker()} style={{ width: 70, height: 50 }}>                   */}
               <TouchableOpacity   style={styles.buttonBandContainer} onPress={() => this.togglePicker()} >                  
               {/* <Text style={{ fontSize: 19, color: '#999', marginTop: 8, marginLeft: 10  }} onPress={() => this.togglePicker()} >{this.props.band}</Text> */}
               <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'center'  }} onPress={() => this.togglePicker()} >{this.props.band}</Text>
               </TouchableOpacity >
               <Modal visible ={this.state.pickerDisplayed} animationType={"slide"} transparent={true} onRequestClose={() => console.log('Close was requested')}>
                    <View style={{ margin:5,
                         padding:20, 
                         backgroundColor: '#efefef',
                         bottom: 3,
                         left: 20,
                         right: 20,
                         position: 'absolute',
                         alignItems: 'center' ,
                         borderBottomLeftRadius: 22,
                         borderBottomRightRadius: 22,
                         borderTopLeftRadius: 22,
                         borderTopRightRadius: 22,                     
                          }}>
                          
                    <Text style={{ fontWeight: 'bold', alignItems: 'center', marginBottom:10}}>{I18n.t("QsoBandPleasePick")} </Text>
                    {pickerValues.map((value, index) => {
                        return  <TouchableOpacity key={index} onPress={() => this.setPickerValue(value.title)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                                 <Text style={{ fontSize: 18, padding:1.25}} >{value.title}</Text>
                                 </TouchableOpacity >
                    })}

                    <TouchableOpacity   onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4}}>
                      <Text style={{ color: '#999'}}>{I18n.t("QsoBandCancel")}</Text>
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

const styles = StyleSheet.create({

    buttonBandContainer:{
    //   backgroundColor: '#2980b9',
    backgroundColor: '#8BD8BD',
       paddingVertical: 5,
       borderRadius: 22,
       width: 70,
       height: 36,
       marginTop: 0,
       marginLeft: 8
       }
    });

 const mapStateToProps = state => {
    return {        
        band: state.sqso.currentQso.band,
        mode: state.sqso.currentQso.mode,
        rst: state.sqso.currentQso.rst,
        db: state.sqso.currentQso.db,
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

