import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, TextInput, Platform, TouchableOpacity  } from 'react-native';
import { connect } from 'react-redux';
import { fetchPeople } from '../../actions';
//import Qra from './Qra';
import QraProfile from './QraProfile';
import QsoQras from './QsoQras';
import QsoType from './QsoType';
import QsoBand from './QsoBand';
import QsoMode from './QsoMode';
import QsoRst from './QsoRst';
import QsodB from './QsodB';
import QsoEnterQra from './QsoEnterQra';
import AddCallSigns from './AddCallSigns';


class QsoHeader extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          people: [],
          errorMessage: "",
          isFetching: true,
          text: '',
          testCrash: 0,
          addCallsigns: false
   
        };
      }

 
    

   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }

       LlamoAPI = () => {
      //  this.props.fetchPeople();
        //this.props.navigation.navigate('CameraScreen');
      }

      CloseAddCallSigns = () => {
        this.setState({
          addCallsigns: false});
    
        };
    
      confirmAddCallsigns = () => {
         this.setState({
           addCallsigns: false});
         };


    render() { console.log("RENDER qso Header");

    // este codigo es solo para generar un error a proposito 
    // para probar que el crashalytics ande.

    // if (this.state.testCrash === 0) 
    //   // Simulate a JS error
    //     throw new Error('I crashed!');
           
                           
              
        return(  <View style={styles.content} >
               
           <View style={{flex:0.6}}>
               <View style={{flexDirection: 'row', flex:1}}>
                  {/* <QraProfile qra={this.props.qra} imageurl={this.props.rdsurl+'profile/profile_avatar.jpg?'+this.props.sqsoprofilepicrefresh } />   */}
                  {/* { this.props.sqsonewqsoactive && */}
                   <View style={{flex:0.22}}>
                   { this.props.sqsonewqsoactive &&
                     <QraProfile qra={this.props.qra} imageurl={this.props.sqsoprofilepicrefresh } /> 
                   }
                     </View>               
                  
                 {/* { this.props.sqsonewqsoactive ? */}
                   <View style={{flex:0.16}}>
                      { this.props.sqsonewqsoactive ? 
                      <QsoType /> : null }
                   </View>
                   {/* { this.props.sqsonewqsoactive && this.props.qsotype!=='POST' ? */}
                   <View style={{flex:0.62}}>  
                      { this.props.sqsonewqsoactive  ?
                      <QsoQras /> : null} 
                   </View>
 
              </View> 
            </View>
              {/* flex: 1 */}
         <View style={{flex:0.4}}>
             <View style={{flexDirection: 'row', marginTop: 6, flex:1 }}>
                    <View style={{flex: Platform.OS==='ios' ? 0.47 : 0.47}}>
                 
              { this.props.sqsonewqsoactive ?
                               <TouchableOpacity   onPress={() => this.togglePicker()} >                                       
                                  <Text style={{ fontSize: 19, color: '#999', marginTop: 8, marginLeft: 3}} onPress={() => this.setState({addCallsigns: true})} >Add CallSign</Text>
                               </TouchableOpacity>
          
                                  : null }

                    {/* { this.props.sqsonewqsoactive ?
                        <QsoEnterQra /> : null } */}
                 
                    </View>
                   
                    <View style={{flex: Platform.OS==='ios' ? 0.170 : 0.170 , alignItems: 'center'}}>  
                    { this.props.sqsonewqsoactive && this.props.qsotype!=='POST' ?  
                        <QsoBand />  : null }
                       
                         </View>
                  
                    <View style={{flex: Platform.OS==='ios' ? 0.170 : 0.170}}>
                    { this.props.sqsonewqsoactive && this.props.qsotype!=='POST' ?    
                        <QsoMode />  : null }
                    </View>  

                    <View style={{flex: Platform.OS==='ios' ? 0.190 : 0.190, alignItems: 'center'}}>
                    { this.props.sqsonewqsoactive && this.props.qsotype!=='POST' ?    
                       (this.props.digitalmode) ? <QsodB /> : <QsoRst />
                        
                        : null }
                    </View>  

               </View> 
             </View>       
             
    {(this.state.addCallsigns) &&
                  <AddCallSigns   close={this.CloseAddCallSigns.bind()} confirm={this.confirmAddCallsigns.bind()} />
                }   
                
            </View>
           
       
        )} 

 }

 const styles = StyleSheet.create({
   content: {
      
    marginTop: Platform.OS === 'ios' ? 13 : 13,
    marginLeft: 6,
    marginRight: 3,
    flexDirection: 'column',
    flex: 1
    
    //flexDirection: 'row'
   
    },
    faceImageStyle: {
        width: 65,
        height: 65,
        borderRadius: 30
         }
});


 const mapStateToProps = state => {
    return {  sqsonewqsoactive: state.sqso.newqsoactive,
        qsotype: state.sqso.currentQso.qsotype,
        qra: state.sqso.qra,
        digitalmode: state.sqso.currentQso.digitalMode,
        sqsoprofilepicrefresh: state.sqso.profilePicRefresh,
        rdsurl: state.sqso.urlRdsS3
       
     };
};


const mapDispatchToProps = {
   
   }

export default connect(mapStateToProps, mapDispatchToProps)(QsoHeader);