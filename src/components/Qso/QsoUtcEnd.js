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
import { Platform } from 'react-native';

class QsoUtcEnd extends React.PureComponent {

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


        // dateNow = getQsoDateTimeZoneIncluded();
        dateNow1 = new Date();
        dateNow1.setHours(23);
        dateNow1.setMinutes(59);
        dateNow1.setSeconds(0);
        
        showT = dateNow1.getHours() +
          ':' +
          (dateNow1.getMinutes() < 10 ? '0' : '') +
          dateNow1.getMinutes()
        this.setState({date: dateNow1, showUtc: showT})
        console.log('date recalculadoUTCend:' + dateNow1)
       
        this.props.setQsoUtc(dateNow1,'ActivityEndUtc')
            // sin el timeout no actualiza la hora en redux  (no entiendo porque)
            // setTimeout(() => {
            //     this.props.setQsoUtc(dateNow1,'ActivityEndUtc')
                  
            //      }
            //     , 2000);


 
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
        console.log('time utcend: '+currentDate )
        
// // esta es la hora que muestra en pantalla
        // showT = currentDate.getHours()+':'+currentDate.getMinutes()
        showT = currentDate.getHours() +
          ':' +
          (currentDate.getMinutes() < 10 ? '0' : '') +
          currentDate.getMinutes()

          
        this.setState({show: Platform.OS === 'ios', date: currentDate, showUtc: showT});



        this.props.setQsoUtc(currentDate,'ActivityEndUtc')
     
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
               <Text style={{ fontSize: 17, color: '#243665',  textAlign: 'center' }} onPress={() => this.showDatepicker()} >UTC: {this.state.showUtc}</Text>
              </TouchableOpacity>


            
            
              {/* {this.state.show && ( */}
            {(this.state.show && Platform.OS === 'android') && (
                  <RNDateTimePicker mode="time" 
                  value={this.state.date}
                    display="spinner"
                    is24Hour={true}
                   onChange={this.onChange}
                  
                  />
       
        
      )}



     {(this.state.show && Platform.OS === 'ios' && Platform.Version < '13') && (
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
                    // backgroundColor: "rgba(255,255,255,0.98)",
                    backgroundColor: "grey",
                    marginTop: 120,
                    //  bottom: 150,
                    left: 10,
                    right: 10,
                    height: 340,
                    position: "absolute",
                    alignItems: "center",
                    borderRadius: 12
                  }}>
        <RNDateTimePicker mode="time" 
                  value={this.state.date}
                  style={{width:'100%', marginLeft: 5,marginTop:20}}
                    display="default"
                    is24Hour={true}
                   onChange={this.onChange}
                  
                  />
        <View style={{flexDirection: "row", flex: 1, marginTop:50}} >
        <View style={{flex: 0.5}} >
          <TouchableOpacity  onPress={() => this.closeDatePicker()} >                                       
               <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'left' }} onPress={() => this.closeDatePicker()} >cancel</Text>
          </TouchableOpacity>
          </View>
          <View style={{flex: 0.5}} >
          <TouchableOpacity  onPress={() => this.closeDatePicker()} >                                       
               <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'right' }} onPress={() => this.closeDatePicker()} >select</Text>
          </TouchableOpacity>
          </View>
        </View>

        </View>
        </Modal>
        
      )}


      {(this.state.show && Platform.OS === 'ios' && Platform.Version >= '13') && (
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
                    height: 150,
                    position: "absolute",
                    alignItems: "center",
                    borderRadius: 12
                  }}>
        <RNDateTimePicker mode="time" 
                  value={this.state.date}
                  style={{width:'100%',marginLeft: 220,marginTop:20}}
                    display="default"
                    is24Hour={true}
                   onChange={this.onChange}
                  
                  />
        <View style={{flexDirection: "row", flex: 1, marginTop: 50}} >
        <View style={{flex: 0.5}} >
          <TouchableOpacity  onPress={() => this.closeDatePicker()} >                                       
               <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'left' }} onPress={() => this.closeDatePicker()} >cancel</Text>
          </TouchableOpacity>
          </View>
          <View style={{flex: 0.5}} >
          <TouchableOpacity  onPress={() => this.closeDatePicker()} >                                       
               <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'right' }} onPress={() => this.closeDatePicker()} >select</Text>
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

 QsoUtcEnd.propTypes = {
   
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
   
        // qsodate: state.sqso.currentQso.qsodate,
     
        jwtToken: state.sqso.jwtToken 
     };
};


const mapDispatchToProps = {
   
    setQsoUtc
   }

export default connect(mapStateToProps, mapDispatchToProps)(QsoUtcEnd);

