import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, Modal, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { setMode, postQsoNew, onprogressTrue, onprogressFalse, postQsoEdit, actindicatorPostQsoNewTrue, setRst } from '../../actions';
import PropTypes from 'prop-types';
import { updateOnProgress, check_firstTime_OnProgress, hasAPIConnection} from '../../helper';
import VariosModales from './VariosModales';
import I18n from '../../utils/i18n';

class QsoMode extends React.PureComponent {

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
     if (this.props.mode!==value){ 

        if (value==='JT65' || value==='FT4' || value==='FT8')
            // this.props.setRst(this.props.db,true);
             if (this.props.mode==='JT65' || this.props.mode==='FT4' || this.props.mode==='FT8') 
                 this.props.setRst(this.props.db,true);
              else
               this.props.setRst('-07',true);
           else
             { // eligio un modo no digital, pero si viene desde uno digital le sete 59
                if (this.props.mode==='JT65' || this.props.mode==='FT4' || this.props.mode==='FT8') 
                  this.props.setRst('59',false);
                 else
                  this.props.setRst(this.props.rst,false);

             }
         
        //   if (value==='JT65' || value==='FT4' || value==='FT8')
        //      if (this.props.mode==='JT65' || this.props.mode==='FT4' || this.props.mode==='FT8') 
        //          this.props.setRst(this.props.rst,true, this.props.rstbeforechangemode);
        //       else
        //        this.props.setRst(this.props.rstbeforechangemode,true, this.props.rst);
        //    else
        //      { // eligio un modo no digital, pero si viene desde uno digital le sete 59
        //         if (this.props.mode==='JT65' || this.props.mode==='FT4' || this.props.mode==='FT8') 
        //           this.props.setRst(this.props.rstbeforechangemode,false,this.props.rst);
        //          else
        //           this.props.setRst(this.props.rst,false,this.props.rstbeforechangemode);

        //      }

             this.props.setMode(value);
          // algoritmo para meterle el 9 final automatico si eleigio CW
          // siempre y cuando no lo haya seteado el antes a la T
        //   if (value==='CW'){
        //         rtsModif = this.props.rst;
        //         long = rtsModif.length;
        //         console.log('longitud de RTS: '+long + ' '+ this.props.rst)
        //         if (long===2){
        //         rstLocal = this.props.rst+'9';
        //         this.props.setRst(rstLocal);
        //         }else
        //         {
        //             console.log('ultimo digito: '+ rtsModif[2])
        //         }
        //    }

          if (ONPROGRESS=updateOnProgress(this.props.qsotype,this.props.band,value,this.props.qsoqras,this.props.mediafiles))
          await this.props.onprogressTrue();
     else
           this.props.onprogressFalse();
//#PUBLISH
        //    if (this.props.sqlrdsid===''){
      
        //       // chequeo si esta OnProgress para poder obtener el SqlRdsID de AWS RDS
        //     if (ONPROGRESS) {
        //      data = check_firstTime_OnProgress(this.props.qsotype,this.props.band,value,this.props.rst,
        //         this.props.db, this.props.qra,ONPROGRESS,this.props.sqlrdsid, this.props.latitude,
        //                                   this.props.longitude);
        //           console.log("Data to Send API: "+ JSON.stringify(data)); 
                  
        //           this.props.actindicatorPostQsoNewTrue();
        //           this.props.postQsoNew(data,this.props.qsoqras,this.props.mediafiles,this.props.jwtToken);
                 
        //     }else console.log("Todavia no esta OnProgreSSS como para llamar a PostNewQso");
              
        //     }
        //     else
        //      {
        //         qsoHeader = { "mode" : value,
        //                       "band" : this.props.band,
        //                       "type" : this.props.qsotype,
        //                       "sqlrdsid" : this.props.sqlrdsid,
        //                       "qra": this.props.qra,
        //                       "rst" : this.props.rst,
        //                       "db" : this.props.db
        //                    }
        //       console.log("antes de enviar a API qdoHeader:"+ JSON.stringify(qsoHeader))
        //       this.props.postQsoEdit(qsoHeader,'mode',this.props.jwtToken);   

        //          }  
        //#PUBLISH
     }

          this.togglePicker();
            //  } else
            //  { this.togglePicker();
            //    this.setState({nointernet: true});
            //   }
      }


      closeVariosModales = () => {
        this.setState({nointernet: false}); 
        // this.togglePicker();
      }

      togglePicker = () => {
          console.log("llamo togglepicker")
        this.setState({pickerDisplayed: !this.state.pickerDisplayed})
    }


    render() { console.log("RENDER qso MODE" );
              
               const pickerValues = [
                   {
                       title: 'SSB',
                       value: 'SSB'
                   },
                   {
                    title: 'AM',
                    value: 'AM'
                },
                {
                    title: 'FM',
                    value: 'FM'
                },
                {
                    title: 'CW',
                    value: 'CW'
                },
        
                {
                    title: 'FT8',
                    value: 'FT8'
                },
                {
                    title: 'JT65',
                    value: 'JT65'
                },
                {
                    title: 'SSTV',
                    value: 'SSTV'
                },
                {
                    title: 'PSK31',
                    value: 'PSK31'
                },
                {
                    title: 'RTTY',
                    value: 'RTTY'
                },
                {
                    title: 'D-Star',
                    value: 'D-Star'
                },
                {
                    title: 'DMR',
                    value: 'DMR'
                },
                {
                    title: 'YSF',
                    value: 'YSF'
                },
                {
                    title: 'SAT',
                    value: 'SAT'
                },
                {
                    title: 'EME',
                    value: 'EME'
                },
                {
                    title: 'WSPR',
                    value: 'WSPR'
                }
            
               ]
              


        return <View >               
                                 
                                 {/* marginLeft: 48  style={{ width: 70, height: 50 }}*/}
              <TouchableOpacity style={styles.buttonModeContainer} onPress={() => this.togglePicker()} >                                       
               <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'center' }} onPress={() => this.togglePicker()} >{this.props.mode}</Text>
              </TouchableOpacity>

               <Modal visible ={this.state.pickerDisplayed} animationType={"slide"} transparent={true} onRequestClose={() => console.log('Close was requested')}>
                    <View style={{ margin:20,
                         padding:20, 
                         backgroundColor: '#efefef',
                         bottom: 3,
                         left: 20,
                         right: 20,
                         position: 'absolute',
                         alignItems: 'center',
                         borderBottomLeftRadius: 22,
                         borderBottomRightRadius: 22,
                         borderTopLeftRadius: 22,
                         borderTopRightRadius: 22,                      
                          }}>
                          
                    <Text style={{ fontWeight: 'bold', alignItems: 'center', marginBottom:10}}>{I18n.t("QsoModePleasePick")} </Text>
                    {pickerValues.map((value, index) => {
                        return  <TouchableOpacity key={index} onPress={() => this.setPickerValue(value.title)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                                 <Text style={{ fontSize: 17, padding:1.25}} >{value.title}</Text>
                                 </TouchableOpacity>
                    })}

                    <TouchableOpacity  onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4}}>
                      <Text style={{ color: '#999'}}>{I18n.t("QsoModeCancel")}</Text>
                    </TouchableOpacity>
                    </View>

               
               </Modal>
               {(this.state.nointernet) && 
               <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
               }
          

            </View>
       
     } 

 }

 QsoMode.propTypes = {
   
};

const styles = StyleSheet.create({

    buttonModeContainer:{
    //   backgroundColor: '#2980b9',
    backgroundColor: '#8BD8BD',
       paddingVertical: 5,
       borderRadius: 22,
       width: 70,
       height: 36,
       marginTop: 0
       }
    });


 const mapStateToProps = state => {
    return {        
        mode: state.sqso.currentQso.mode,
        band: state.sqso.currentQso.band,
        rst: state.sqso.currentQso.rst,
        db: state.sqso.currentQso.db,
        // rstbeforechangemode: state.sqso.currentQso.rstBeforeChangeMode,
        qsotype: state.sqso.currentQso.qsotype,
        qsoqras: state.sqso.currentQso.qsoqras,
        sqlrdsid: state.sqso.currentQso.sqlrdsId,
        isfetching: state.sqso.isfetching,
        qra: state.sqso.qra, 
        latitude: state.sqso.currentQso.latitude,
        longitude: state.sqso.currentQso.longitude, 
        mediafiles: state.sqso.currentQso.mediafiles,
        jwtToken: state.sqso.jwtToken 
     };
};


const mapDispatchToProps = {
    setMode,
    setRst,
    postQsoNew,
    onprogressTrue,
    onprogressFalse,
    postQsoEdit,
    actindicatorPostQsoNewTrue
   }

export default connect(mapStateToProps, mapDispatchToProps)(QsoMode);

