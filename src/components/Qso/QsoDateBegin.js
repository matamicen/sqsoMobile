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
import moment from 'moment';
// import 'moment/locale/es';
// import 'moment/locale/en';

class QsoDateBegin extends React.PureComponent {

    constructor(props) {
        super(props);
        
        this.state = {

          nointernet: false,
       
          date:new Date(),
          mode: 'date',
          show: false,
          showDate: 'Enter Date',
         
         
       
        };
      }

    componentDidMount() {


        console.log('I18n.locale.substring(0, 2):'+I18n.locale.substring(0, 2))
        dateNow = getQsoDateTimeZoneIncluded();
        
        console.log('moment: '+ moment(dateNow).format("MMM D YYYY") )
      //   if (I18n.locale.substring(0, 2) === 'es'){
          
      //     showD = moment(dateNow).format("D MMM YYYY")
      //   } 
      //   else
      //   {
      //     showD = moment(dateNow).format("MMM D YYYY")
      // }
      
      
        this.setState({date: dateNow, showDate: 'Enter Date'})
        console.log('date recalculado:' + dateNow)

        // no envia fecha de begin a redux, mantiene el ano 1900 por defecto
        // solo envia a redux si el usuario cambia la fecha, es para luego poder validar
        // si el usuario ingreso fecha o no al momento de Publicar.
        
        // this.props.setQsoDate(dateNow,'ActivityBegin')
       
  
       }

   


      closeVariosModales = () => {
        this.setState({nointernet: false}); 
        // this.togglePicker();
      }

    
      onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        console.log('date y selectedDate: '+selectedDate + ' ' +date)
        if (selectedDate !== undefined) // por si apreta Cancel en fecha
    {
          if (I18n.locale.substring(0, 2) === 'es'){
              
          showD = moment(currentDate).format("D MMM YYYY")
        } 
        else
        {
          showD = moment(currentDate).format("MMM D YYYY")
      }
    }
      else
        showD = this.state.showDate
    

        this.setState({show: Platform.OS === 'ios', date: currentDate, showDate: showD});
        console.log('fecha seleccionada: '+selectedDate)
        console.log('showD: '+showD)

        if (selectedDate !== undefined) // no envio fecha si apreto CANCEL porque me cambiaria el ano 1900 
                                        // que es donde yo chequeo si el usuario ingreso o no la fecha al momentode publicar
          this.props.setQsoDate(currentDate,'ActivityBegin')
  // }  
     
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

      closeDatePicker = () => {
        this.setState({show: false})
      }








  


    render() { console.log("RENDER qso MODE" );
              
              

        return <View >              
                                 
                                 {/* marginLeft: 48  style={{ width: 70, height: 50 }}*/}
              <TouchableOpacity style={styles.buttonModeContainer} onPress={() => this.showDatepicker()} >                                       
               <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'center' }} onPress={() => this.showDatepicker()} >{I18n.t("QsoDate")} {this.state.showDate}</Text>
              </TouchableOpacity>

              {(this.state.show && Platform.OS === 'android') && (
       
         <DateTimePicker
          testID="dateTimePicker"
          style={{width:'100%'}}
          value={this.state.date}
          mode={this.state.mode}
          is24Hour={true}
          display="spinner"
          onChange={this.onChange}
        />
        
        
      )}
            
              {(this.state.show && Platform.OS === 'ios') && (
                <Modal
                visible={true}
                animationType={"slide"}
                transparent={true}
                onRequestClose={() => console.log("Close was requested")}
              >
                <View
                  style={{
                    margin: 10,
                    padding: 10,
                    backgroundColor: "rgba(255,255,255,0.98)",
                    marginTop: 120,
                    //  bottom: 150,
                    left: 10,
                    right: 10,
                    height: 350,
                    position: "absolute",
                    alignItems: "center",
                    borderRadius: 12
                  }}>
         <DateTimePicker
          testID="dateTimePicker"
          style={{width:'100%'}}
          value={this.state.date}
          mode={this.state.mode}
          is24Hour={true}
          display="spinner"
          onChange={this.onChange}
        />
        <View style={{flexDirection: "row", flex: 1}} >
        <View style={{flex: 0.5}} >
          <TouchableOpacity  onPress={() => this.closeDatePicker()} >                                       
               <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'left' }} onPress={() => this.closeDatePicker()} >{I18n.t("QsoDateCancel")}</Text>
          </TouchableOpacity>
          </View>
          <View style={{flex: 0.5}} >
          <TouchableOpacity  onPress={() => this.closeDatePicker()} >                                       
               <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'right' }} onPress={() => this.closeDatePicker()} >{I18n.t("QsoDateSelect")}</Text>
          </TouchableOpacity>
          </View>
        </View>

        </View>
        </Modal>
        
      )}


               
               {(this.state.nointernet) && 
               <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
               }
          

            </View>
       
     } 

 }

 QsoDateBegin.propTypes = {
   
};

const styles = StyleSheet.create({

    buttonModeContainer:{
    //   backgroundColor: '#2980b9',
    backgroundColor: '#8BD8BD',
       paddingVertical: 5,
       borderRadius: 22,
       width: 190,
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

export default connect(mapStateToProps, mapDispatchToProps)(QsoDateBegin);