import React, { Component } from 'react';
import { Text, Image, View, Modal, ActivityIndicator, StyleSheet, TouchableOpacity, Platform , TextInput, Keyboard} from 'react-native';
import { connect } from 'react-redux';
import { setToken, addQra, fetchQraProfileUrl, addCallsign, copyQsoCallSignsToQsoQras,
  onprogressTrue, onprogressFalse ,postQsoNew, postQsoQras,
  actindicatorPostQsoNewTrue, setQsoCallsigns} from '../../actions';
// import { addQra, onprogressTrue, onprogressFalse, fetchQraProfileUrl, postQsoNew, postQsoQras,
//     actindicatorPostQsoNewTrue } from '../../actions';
import { hasAPIConnection, ValidacionAddCallsign, updateOnProgress, check_firstTime_OnProgress} from '../../helper';
import { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports'
import QsoCallSigns from './QsoCallSigns';
import VariosModales from './VariosModales';
import I18n from '../../utils/i18n';


Auth.configure(awsconfig);

class AddCallSigns extends Component {

    constructor(props) {
        super(props);
        

        this.arrAux = [];
        
        this.state = {
       //   pickerSelection: 'Choose Band',
         // pickerDisplayed: false
         qra: '',
         envio: {name: 'LW8PPP', url: 'https://s3.amazonaws.com/sqso/us-east-1%3A29a10ff3-e4d7-45cf-a432-7821674b8d77/profile/profile.jpg'},
         nointernet: false,
     
         
        };
      }

  

   componentDidMount = async () => {
    

     
       }

       


        closeVariosModales = () => {
          this.setState({nointernet: false}); 
          
        }


    addCallsignToqsoqras_despuesDelay = async () => {

   // no hace falta chequear si hay internet, acaba de chequear el metodo que llama a este 50 milisegundos antes.

      this.arrAux[0] = '1';
      this.arrAux[1] = '2';

    //  update si el QSO esta onProress 
     if (ONPROGRESS=updateOnProgress(this.props.qsotype,this.props.band,this.props.mode,this.arrAux,this.props.mediafiles))
             await this.props.onprogressTrue();
        else
              this.props.onprogressFalse();


//#PUBLISH
    //  if (this.props.sqlrdsid===''){
    //    console.log('onprogress: '+ ONPROGRESS)
             
    //          // chequeo si esta OnProgress para poder obtener el SqlRdsID de AWS RDS
    //        if (ONPROGRESS) {
    //         data = check_firstTime_OnProgress(this.props.qsotype,this.props.band,this.props.mode,this.props.rst,
    //               this.props.db, this.props.qra,ONPROGRESS,this.props.sqlrdsid,this.props.latitude,
    //                                      this.props.longitude);
    //              console.log("Data to Send API: "+ JSON.stringify(data));  
    //              console.log('qsoqras 11: '+ JSON.stringify(this.props.qsoqras))
    //              this.props.close();
    //              setTimeout(() => {
              
    //               this.props.actindicatorPostQsoNewTrue();
    //               this.props.postQsoNew(data,this.props.qsoqras,this.props.mediafiles,this.props.jwtToken);
    //               this.props.setQsoCallsigns('DELETEALL',''); 
    //             }
    //             , 500);
            
    //        }else {
    //          console.log("Todavia no esta OnProgreSSS como para llamar a PostNewQso");
    //          this.props.close();
    //          this.props.setQsoCallsigns('DELETEALL',''); 

    //         }
             
    //        }
    //        else {
    //           qraToAddRds = [];
    //           console.log('qsoqras 13: '+ JSON.stringify(this.props.qsoqras))
    //           this.props.qsoqras.map(item => {
    //                if(item.sent === 'false'){
    //                   qraToAddRds.push(item);
    //                   console.log('entro status false')

    //                }
    //                console.log('iteracion: '+JSON.stringify(item))
                   
    //                })
    //           // qraToAddRds.push(qra);
    //           console.log('qratoadd: '+ JSON.stringify(qraToAddRds))
    //           this.props.close();
    //           await this.props.postQsoQras("ALL",this.props.sqlrdsid,qraToAddRds,this.props.jwtToken);
    //           this.props.setQsoCallsigns('DELETEALL','');
    //             } 

          this.props.close();
          this.props.setQsoCallsigns('DELETEALL',''); 
    //#PUBLISH


    }
    

    addCallsignToqsoqras = async () => {

      if (await hasAPIConnection())
      {
      this.props.copyQsoCallSignsToQsoQras(this.props.qsocallsigns);

      setTimeout(() => {

        // una espera para que copie los array en redux y se actualicen en este compoennte
        // porque el metodo de abajo usa el nuevo array
        this.addCallsignToqsoqras_despuesDelay();
        
      }
      , 50);
    }
    else this.setState({nointernet: true});

    }
    
      
        addQraCallsigns = async () => {
    
   
       if (await hasAPIConnection())
           {
           // chequea el haya una API en ejecucion
           //saco espacios vacios del CallSign ingresado
           callToAdd = this.state.qra.toUpperCase();
           auxCallToAdd = callToAdd.replace(/\s+/g, ''); 
    
          CallSignValido = ValidacionAddCallsign(this.props.qsocallsigns,this.props.qra.toUpperCase(),auxCallToAdd);
    
           // if(!this.props.isfetching && this.state.qra !== '' && this.state.qra.toUpperCase() !== this.props.qra.toUpperCase())
         console.log('isfecthing:' + this.props.isfetching + ' callsignValido: '+CallSignValido)
          //  if(!this.props.isfetching && CallSignValido) 
          if(CallSignValido) 
           { 
              console.log("ejecuta addQRA");
             
   
      //       qra = {name: this.state.qra.toUpperCase(), url: 'https://randomuser.me/api/portraits/med/men/72.jpg'} 
             qra = {qra: auxCallToAdd, url: 'empty', sent: 'false', deleted: 'false', deletedSent: 'false', following: ''} 
       
             // hay que darle tiempo a que agregue el QRA al store asi despues chequea bien el onProgress
              this.props.addCallsign(qra);
            //   this.arrAux[0] = '1';
            //   this.arrAux[1] = '2';
   
             // update si el QSO esta onProress 
            //  if (ONPROGRESS=updateOnProgress(this.props.qsotype,this.props.band,this.props.mode,this.arrAux,this.props.mediafiles))
            //          await this.props.onprogressTrue();
            //     else
            //           this.props.onprogressFalse();
   
                 
            //          console.log("QRA OWNER:"+this.props.qra);
   
            // busco URL del profile
              this.props.fetchQraProfileUrl(auxCallToAdd,'qra',this.props.jwtToken);
   
             
            //  if (this.props.sqlrdsid===''){
               
            //    // chequeo si esta OnProgress para poder obtener el SqlRdsID de AWS RDS
            //  if (ONPROGRESS) {
            //   data = check_firstTime_OnProgress(this.props.qsotype,this.props.band,this.props.mode,this.props.rst,
            //         this.props.db, this.props.qra,ONPROGRESS,this.props.sqlrdsid,this.props.latitude,
            //                                this.props.longitude);
            //        console.log("Data to Send API: "+ JSON.stringify(data));  
                 
            //       this.props.actindicatorPostQsoNewTrue();
            //       this.props.postQsoNew(data,this.props.qsoqras,this.props.mediafiles,this.props.jwtToken);
                  
            //  }else console.log("Todavia no esta OnProgreSSS como para llamar a PostNewQso");
               
            //  }else {
            //     qraToAddRds = [];
            //     qraToAddRds.push(qra);
            //     await this.props.postQsoQras("OnlyOneQra",this.props.sqlrdsid,qraToAddRds,this.props.jwtToken);
            //       }         
           }
           else console.log("se esta ejecutando una API o no se ingreso un QRA o ingreso un QRA duplicado, no permite ejecutar otra api al mismo tiempo");
   
             Keyboard.dismiss();
            //  this.setState({qra: '', size: 12, changeColor: true});
            this.setState({qra: ''});
         }
             else this.setState({nointernet: true});
           
       }


            

    render() { console.log("RENDER add callsign");
       
  
              
        return( <View> 

{/* animationType={"slide"} */}

             <Modal visible={true} position= {'top'} transparent={true}  onRequestClose={() => console.log('Close was requested')}>
             {/* <KeyboardAvoidingView behavior="padding"  > */}
              <View style={{ 
                   padding:10, 
                  backgroundColor : 'rgba(36,54,101,0.93)',
                   marginTop: 120,
                   left: 25,
                //    right: 15,
                 //  width: 170,
                   width: 307,
                   height: 210,
               
                   paddingVertical: 5,
                 
                   borderRadius: 12                       
                    }}>

                     
                    <View style={{ flex:1, alignItems: "center", marginTop:3 }}>
             

                    <View style={{ flex:0.5 }}>
                      <QsoCallSigns /> 
                    </View>
                    <View style={{ flex:0.4, flexDirection: 'row', marginTop:9 }}>
                    <View style={{ flex:0.27,alignItems: 'flex-end' }}>
                    <Text style={{ color: '#c0c0c0', fontSize: 15, fontWeight: 'bold', marginTop: 2}}>{I18n.t("AddCallSignsCallsign")} </Text>
                    </View>
                    <View style={{ flex:0.47, alignItems: 'flex-start'}}> 
                                <TextInput 
                            // placeholder="email"
                            underlineColorAndroid='transparent'
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            returnKeyType="next"
                            // autoCapitalize="none"
                            style={styles.input}
                            autoCorrect={false}
                            // onSubmitEditing={() => this.passwordRef.focus()} 
                            value={this.state.qra}
                                onChangeText={(text) => {  this.setState({qra: text.toUpperCase()}) }}
                                    
                            onSubmitEditing={() => this.addQraCallsigns() }
                            keyboardType={Platform.OS==='android' ? 'visible-password' : 'default'}
                            />
                    </View> 
                    <View style={{ flex:0.23}}>
                    <TouchableOpacity onPress={() => this.addQraCallsigns()} >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginTop: 5}}>{I18n.t("AddCallSignsAdd")}</Text>
                    </TouchableOpacity>
                    </View> 
                    {/* <Text style={{ color: 'grey', fontSize: 16}}>Enter CallSign</Text> */}
                    </View>

                    <View style={{ flex:0.13 , flexDirection: 'row'}}>
                      <View style={{ flex:0.5, alignItems: 'flex-start'}}>
                              <TouchableOpacity onPress={() => this.props.close()} style={{ marginLeft: 5, marginBottom: 5}}>
                            <Text style={{ color: '#c0c0c0', fontSize: 17}}>{I18n.t("AddCallSignsCancel")}</Text>
                              </TouchableOpacity>
                            </View>
                       
                           <View style={{ flex:0.5, alignItems: 'flex-end'}}>
                             {(this.props.qsocallsigns.length>0) &&
                              <TouchableOpacity onPress={() => this.addCallsignToqsoqras()} style={{ marginRight: 5, marginBottom: 5}} >
                            <Text style={{ color: 'white', fontSize: 18}}>{I18n.t("AddCallSignsConfirm")}</Text>
                              </TouchableOpacity>
                           }
                          </View>
                       
                    </View>



                    </View>
                    
              </View>
                {/* </KeyboardAvoidingView > */}
                   
                      </Modal>
                      {(this.state.nointernet) && 
                      <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
                      }

            

         </View>
            
           
       
        )} 

 }

 
const styles = StyleSheet.create({
       faceImageStyle: {
      width: 65,
      height: 65,
      borderRadius: 30
       },
    name:{
        fontSize: 12,
        marginLeft: 5,
        padding: 2,
        fontWeight: 'bold',        
       // color: '#333333'  
        color: '#243665'      
    },
    name2:{
      fontSize: 12,
    //   marginLeft: 3,
      // padding: 2,
      fontWeight: 'bold',        
     // color: 'orange'    
      color: '#8BD8BD'        
  },
  input: {
    height: 42,    
    width: 130,
    backgroundColor: 'rgba(255,255,255,0.2)',
    // marginBottom: 8,
    color: '#FFF',
    fontSize: 17,
    borderRadius: 18,
    fontWeight: 'bold'
    // paddingHorizontal: 10
          },

  
  });



  

 const mapStateToProps = state => {
    return { sqlrdsid: state.sqso.currentQso.sqlrdsId,
            //  followings: state.sqso.currentQso.followings,
             jwtToken: state.sqso.jwtToken,
             isfetching: state.sqso.isfetching,
             qsocallsigns: state.sqso.currentQso.qsocallsigns,
             qra: state.sqso.qra,

             band: state.sqso.currentQso.band,
             mode: state.sqso.currentQso.mode,
             rst: state.sqso.currentQso.rst,
             db: state.sqso.currentQso.db,
             qsotype: state.sqso.currentQso.qsotype,
             onprogress: state.sqso.currentQso.onProgress,
             latitude: state.sqso.currentQso.latitude,
             longitude: state.sqso.currentQso.longitude,
             mediafiles: state.sqso.currentQso.mediafiles,
            //  userqra: state.sqso.qra,
              qsoqras: state.sqso.currentQso.qsoqras,
            //  deletedflag: state.sqso.currentQso.deletedFlag,
            //  deletepostmessage: state.sqso.currentQso.deletedFlagMessage,
    }
          //   isfetching: state.sqso.isFetching };
};


const mapDispatchToProps = {
//   deleteMediaInMemory,
//   deletedFlag,
//   deletePost,
//   deleteMedia,
  setToken,
  //addQra,
  fetchQraProfileUrl,
  addCallsign,
  copyQsoCallSignsToQsoQras,
  onprogressTrue,
  onprogressFalse,
  postQsoNew,
  postQsoQras,
  actindicatorPostQsoNewTrue,
  setQsoCallsigns

 
   }

export default connect(mapStateToProps, mapDispatchToProps)(AddCallSigns);