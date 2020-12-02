import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, Modal, StyleSheet, TouchableHighlight, TouchableOpacity, DatePickerAndroid,
    Keyboard,  } from 'react-native';
import { connect } from 'react-redux';
import {  setQsoUtc } from '../../actions';
import PropTypes from 'prop-types';
import {  getQsoDateTimeZoneIncluded} from '../../helper';
import VariosModales from './VariosModales';
import I18n from '../../utils/i18n';
import RNDateTimePicker from '@react-native-community/datetimepicker';

class QsoUtc extends React.PureComponent {

    constructor(props) {
        super(props);
        
        this.state = {

          nointernet: false,
       
          date:new Date(),
          mode: 'time',
          show: false,
          showUtc: ''
         
       
        };
      }

    componentDidMount() {

        // dateNowAux = new Date();
        // hourNow = dateNowAux.getHours();
        // timeZoneOffset  = Math.floor(dateNowAux.getTimezoneOffset()/60);
        // console.log('hour didMount:' + hourNow + ' timeZone: '+ timeZoneOffset)
        // // horaoff = hour+Math.floor(dateNow.getTimezoneOffset()/60);
        // // console.log('sumo:' + horaoff)
        // dateNow = new Date(dateNowAux.getTime() + (dateNowAux.getTimezoneOffset() * 60000));

        // // recalculo fecha en base al offset del timeZone
        // if (timeZoneOffset > 0) // GMT (-)
        // {
        //     hourOff = 24 + timeZoneOffset
        //   if (hourNow < hourOff) // mantiene el mismo dia
        //     this.setState({date: dateNow, showDate: dateNow.toLocaleDateString(I18n.locale.substring(0, 2), {
        //         month: 'short'
        //       })})
        //    else
        //    {   // se pasa al otro dia por el offset del timeZone
        //        dateNow.setDate(dateNow.getDate() + 1)
        //    }


        // }
        // else
        // {
        //     hourOff = hourNow + timeZoneOffset
        //   if (hourOff > 0) // mantiene el mismo dia
        //     this.setState({date: dateNow,showDate: dateNow.toLocaleDateString(I18n.locale.substring(0, 2), {
        //         month: 'short'
        //       })})
        //    else
        //    {   // se pasa al otro dia por el offset del timeZone
        //        dateNow.setDate(dateNow.getDate() - 1)
        //    }

        // }
        dateNow = getQsoDateTimeZoneIncluded();
        this.setState({date: dateNow, showUtc: dateNow.getHours()+':'+dateNow.getMinutes()})
        console.log('date recalculado:' + dateNow)
        this.props.setQsoUtc(dateNow)
       
       


 
       }

   


      closeVariosModales = () => {
        this.setState({nointernet: false}); 
        // this.togglePicker();
      }

    
      onChange = (event, selectedDate) => {
          // este componente tiene fecha y hora pero lo que importa es solo la hora que luego
          // esta hora se junta con la fecha del compoenente QsoDate ya que QsoDate comienza con fecha default y hora UTC
          // pero luego cada cambio en UTC o Date son independientes, ya l maneja el usuario a mano y antes de ser enviado 
          // a la publicacion se junta la fecha de QsoDate y la hora de UTC
        const currentDate = selectedDate || date;
        console.log('time: '+currentDate )
        
// // esta es la hora que muestra en pantalla
        showT = currentDate.getHours()+':'+currentDate.getMinutes()

          
        this.setState({show: Platform.OS === 'ios', date: currentDate, showUtc: showT});



        this.props.setQsoUtc(currentDate)
     
      };
    
       showMode = (currentMode) => {

        this.setState({show: true, mode: currentMode });
      };
    
       showDatepicker = () => {
         this.showMode('date');
        
      };
    
       showTimepicker = () => {
        this.showMode('time');
      };








  


    render() { console.log("RENDER qso MODE" );
              
              

        return <View >              
                                 
                                 {/* marginLeft: 48  style={{ width: 70, height: 50 }}*/}
              <TouchableOpacity style={styles.buttonModeContainer} onPress={() => this.showDatepicker()} >                                       
               <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'center' }} onPress={() => this.showDatepicker()} >UTC: {this.state.showUtc}</Text>
              </TouchableOpacity>


            
            
              {this.state.show && (
                  <RNDateTimePicker mode="time" 
                  value={this.state.date}
                    display="spinner"
                    is24Hour={true}
                   onChange={this.onChange}
                  
                  />
        // <DateTimePicker
        // <RNDateTimePicker 
        //   testID="dateTimePicker"
        //   value={this.state.date}
        //   mode={this.state.mode}
        //   is24Hour={true}
        //   display="spinner"
        //   onChange={this.onChange}
        // />
        
      )}


               
               {(this.state.nointernet) && 
               <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
               }
          

            </View>
       
     } 

 }

 QsoUtc.propTypes = {
   
};

const styles = StyleSheet.create({

    buttonModeContainer:{
    //   backgroundColor: '#2980b9',
    backgroundColor: '#8BD8BD',
       paddingVertical: 5,
       borderRadius: 22,
       width: 125,
       height: 36,
       marginTop: 0
       }
    });


 const mapStateToProps = state => {
    return {        
   
        qsodate: state.sqso.currentQso.qsodate,
     
        jwtToken: state.sqso.jwtToken 
     };
};


const mapDispatchToProps = {
   
    setQsoUtc
   }

export default connect(mapStateToProps, mapDispatchToProps)(QsoUtc);

