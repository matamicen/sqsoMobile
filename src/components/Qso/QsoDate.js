import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, Modal, StyleSheet, TouchableHighlight, TouchableOpacity, DatePickerAndroid,
    Keyboard,  } from 'react-native';
import { connect } from 'react-redux';
import {  setQsoDate } from '../../actions';
import PropTypes from 'prop-types';
import {  getQsoDateTimeZoneIncluded} from '../../helper';
import VariosModales from './VariosModales';
import I18n from '../../utils/i18n';
import DateTimePicker from '@react-native-community/datetimepicker';

class QsoDate extends React.PureComponent {

    constructor(props) {
        super(props);
        
        this.state = {

          nointernet: false,
       
          date:new Date(),
          mode: 'date',
          show: false,
          showDate: new Date().toLocaleDateString(I18n.locale.substring(0, 2), {
            month: 'short'
          })
         
       
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
        this.setState({date: dateNow, showDate: dateNow.toLocaleDateString(I18n.locale.substring(0, 2), {
                    month: 'short'
                  })})
        console.log('date recalculado:' + dateNow)
        this.props.setQsoDate(dateNow)
       
       


 
       }

   


      closeVariosModales = () => {
        this.setState({nointernet: false}); 
        // this.togglePicker();
      }

    
      onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        
// // esta es la fecha que muestra en pantalla
        showD = currentDate.toLocaleDateString(I18n.locale.substring(0, 2), {
            month: 'short'
          })

          
        this.setState({show: Platform.OS === 'ios', date: currentDate, showDate: showD});



        this.props.setQsoDate(currentDate)
     
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
               <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'center' }} onPress={() => this.showDatepicker()} >Date: {this.state.showDate}</Text>
              </TouchableOpacity>


            
              {this.state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          mode={this.state.mode}
          is24Hour={true}
          display="spinner"
          onChange={this.onChange}
        />
        
      )}


               
               {(this.state.nointernet) && 
               <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
               }
          

            </View>
       
     } 

 }

 QsoDate.propTypes = {
   
};

const styles = StyleSheet.create({

    buttonModeContainer:{
    //   backgroundColor: '#2980b9',
    backgroundColor: '#8BD8BD',
       paddingVertical: 5,
       borderRadius: 22,
       width: 170,
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
   
    setQsoDate
   }

export default connect(mapStateToProps, mapDispatchToProps)(QsoDate);

