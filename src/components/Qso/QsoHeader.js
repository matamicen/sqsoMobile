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
import I18n from '../../utils/i18n';
import HelpPublish from './HelpPublish';


class QsoHeader extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          people: [],
          errorMessage: "",
          isFetching: true,
          text: '',
          testCrash: 0,
          addCallsigns: false,
          helpPublish: false
   
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

        CloseHelpPublish = () => {
          this.setState({
            helpPublish: false,
            helpTag: false});
      
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
         <View style={{flex:0.31}}>
             <View style={{flexDirection: 'row', marginTop: 6, flex:1 }}>
                    <View style={{flex: Platform.OS==='ios' ? 0.310 : 0.310,  alignItems: 'center'}}>
                 
              { this.props.sqsonewqsoactive ?
                              //  <TouchableOpacity   onPress={() => this.setState({addCallsigns: true})} >  
                                <TouchableOpacity  style={styles.buttonAddCallSignContainer} onPress={() => this.setState({addCallsigns: true})} >                                                                            
                                  {/* <Text style={{ fontSize: 19, color: '#999', marginTop: 8, marginLeft: 3}}>{I18n.t("QsoHeaderAddCallsign")}</Text> */}
                                  {(this.props.qsotype==='POST' || this.props.qsotype==='QAP' || this.props.qsotype==='FLDDAY') ?
                                  <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'center'}}>{I18n.t("QsoHeaderTagCallsign")}</Text>
                                  :
                                  <Text style={{ fontSize: 19, color: '#243665',  textAlign: 'center'}}>{I18n.t("QsoHeaderAddCallsign")}</Text>
                                  }
                               </TouchableOpacity>
          
                                  : null }

                    {/* { this.props.sqsonewqsoactive ?
                        <QsoEnterQra /> : null } */}
                 
                    </View>
                   
                    <View style={{flex: Platform.OS==='ios' ? 0.220 : 0.222 , alignItems: 'center'  }}>  
                    { this.props.sqsonewqsoactive && this.props.qsotype!=='POST' && this.props.qsotype!=='QAP' && this.props.qsotype!=='FLDDAY' ?  
                        <QsoBand />  : null }
                       
                         </View>
                  
                    <View style={{flex: Platform.OS==='ios' ? 0.224 : 0.222, alignItems: 'center'}}>
                    { this.props.sqsonewqsoactive && this.props.qsotype!=='POST' && this.props.qsotype!=='QAP' && this.props.qsotype!=='FLDDAY' ?    
                        <QsoMode />  : null }
                    </View>  

                    <View style={{flex: Platform.OS==='ios' ? 0.246 : 0.246, flexDirection: 'row'}}>
                    { this.props.sqsonewqsoactive && this.props.qsotype!=='POST' && this.props.qsotype!=='QAP' && this.props.qsotype!=='FLDDAY' ?    
                       (this.props.digitalmode) ? <QsodB /> : <QsoRst />
                        
                        : null }
                    </View>  

               </View> 
             </View>  
              {/* color: '#000080' */}

               <View style={{flex:0.11, flexDirection: 'row'}}>
               <View style={{flex:(this.props.qsotype==='POST' || this.props.qsotype==='QAP' || this.props.qsotype==='FLDDAY') ? 0.5:0.3, alignItems: 'flex-start'}}>
               { this.props.sqsonewqsoactive &&
               <TouchableOpacity  style={{marginRight: 10 }} onPress={() => this.setState({helpTag: true})} >                                                                            
                               
                                     {(this.props.qsotype==='POST' || this.props.qsotype==='QAP' || this.props.qsotype==='FLDDAY') &&
                                  <Text style={{ fontSize: 14, color: 'grey'}}>{I18n.t("QsoHeaderHelpTag")}</Text>
                                  }
                                  </TouchableOpacity>
               }
               </View>
               <View style={{flex:(this.props.qsotype==='POST' || this.props.qsotype==='QAP' || this.props.qsotype==='FLDDAY') ? 0.5:0.7, alignItems: 'flex-end'}}>
               { this.props.sqsonewqsoactive &&
               <TouchableOpacity  style={{marginRight: 10 }} onPress={() => this.setState({helpPublish: true})} >                                                                            
                                  {/* <Text style={{ fontSize: 19, color: '#999', marginTop: 8, marginLeft: 3}}>{I18n.t("QsoHeaderAddCallsign")}</Text> */}
                                  {this.props.qsotype==='QSO' &&
                                  <Text style={{ fontSize: 14, color: 'grey'}}>{I18n.t("QsoHeaderHelpQSO")}</Text>
                                  }
                                     {this.props.qsotype==='LISTEN' &&
                                  <Text style={{ fontSize: 14, color: 'grey'}}>{I18n.t("QsoHeaderHelpSWL")}</Text>
                                  }
                                     {this.props.qsotype==='POST' &&
                                  <Text style={{ fontSize: 14, color: 'grey'}}>{I18n.t("QsoHeaderHelpPOST")}</Text>
                                  }
                                      {this.props.qsotype==='QAP' &&
                                  <Text style={{ fontSize: 14, color: 'grey'}}>{I18n.t("QsoHeaderHelpQAP")}</Text>
                                  }
                                      {this.props.qsotype==='FLDDAY' &&
                                  <Text style={{ fontSize: 14, color: 'grey'}}>{I18n.t("QsoHeaderHelpFLDDAY")}</Text>
                                  }                                                                  
                                  </TouchableOpacity>
               }
               </View>
              
               </View>    
             
    {(this.state.addCallsigns) &&
                  <AddCallSigns   close={this.CloseAddCallSigns.bind()} confirm={this.confirmAddCallsigns.bind()} />
                }   

    {(this.state.helpPublish) &&
                  <HelpPublish   closeHelp={this.CloseHelpPublish.bind()} qsotype={this.props.qsotype} hrlptag={false}/>
                } 
    {(this.state.helpTag) &&
                  <HelpPublish   closeHelp={this.CloseHelpPublish.bind()} qsotype="" helptag={true} />
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
         },
         buttonAddCallSignContainer:{
          //   backgroundColor: '#2980b9',
          backgroundColor: '#8BD8BD',
             paddingVertical: 5,
             borderRadius: 22,
             width: 115,
             height: 36,
             marginTop: 0
             },
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