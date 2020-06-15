import React, { Component } from 'react';
import { Text, Image, View, Modal, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { deletePost, deletedFlag, deleteMediaInMemory , deleteMedia, setToken} from '../../actions';
import { hasAPIConnection} from '../../helper';
import { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports'

import VariosModales from './VariosModales';
import I18n from '../../utils/i18n';


Auth.configure(awsconfig);

class DeleteMedia extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
         
          nointernet: false,
          warningMessage: false
        };
      }

  

   componentDidMount = async () => {
    
  
    // console.log('didmount DeleteMedia')
    // console.log('sqlrdsid:'+ this.props.sqlrdsid)
    // console.log('mediaLenght:'+ this.props.mediafiles.length)
    // console.log('mediaName:'+ this.props.name)
    // console.log('idmedia:'+ this.props.idmedia)
    // console.log('media:'+ JSON.stringify(this.props.mediafiles))
    // if (this.props.sqlrdsid)
    //     console.log('tiene sqlrdsid:'+this.props.sqlrdsid)
    //     else
    //     console.log('NO TIENE sqlrdsid:');
    session = await Auth.currentSession();
      
    
    //  session = await Auth.currentAuthenticatedUser();
      console.log("Su token DID MOUNT es: " + session.idToken.jwtToken);
       this.props.setToken(session.idToken.jwtToken);
    

        // si tiene 2 de length es porque solo tiene 1 media solo ya que el otro siempre es un registro de type VACIO 
        // que se usa para que haya algo y el usuario pueda tocar la pantalla u bajar el teclado

        if (this.props.sqlrdsid && this.props.mediafiles.length===2) // quiere decir que tiene QSO en base de datos y solo le queda un media
             this.setState({warningMessage: true});

    


     
       }

       

       
       deleteMedia = async  () => {
       
        if (await hasAPIConnection())
      {
        this.props.deletedFlag(false,'');

        // chequeo si se creo QSO en BD
        if (!this.props.sqlrdsid)
           { // no tiene QSO creado con lo cual puede borrar todo lo que quiere
            // de la memoria de mediafiles
     
              this.props.deleteMediaInMemory(this.props.name);
              // this.props.closeDelete();

           }
           else
           { // hay un QSO creado en BD puede ir borrando pero si quiere borrar 
            // el ultimo se pregunta si quiere borrar todo el QSO
            if (this.props.sqlrdsid && this.props.mediafiles.length===2) 
            {  this.deletePost();
                this.props.closeDelete()
            }
                else{
                 // borro del backend el media con la API y luego en el action de esta API borro 
                 // de mediafiles el media si se confirma ok el borrado de API
                this.props.deleteMedia(this.props.idmedia,this.props.name,this.props.desc,this.props.jwtToken);
                this.props.closeDelete()
              }


           }

       // this.props.deletePost(this.props.sqlrdsid,this.props.jwtToken);
      }else
          this.setState({nointernet: true});
        }

        closeVariosModales = () => {
          this.setState({nointernet: false}); 
          
        }


          deletePost = async  () => {
            if (await hasAPIConnection())
          {
            this.props.deletedFlag(false,'');
          //  this.setState({warningMessage: false});
            this.props.deletePost(this.props.sqlrdsid,this.props.jwtToken);
          }else
              this.setState({nointernet: true});
            }

            closeVariosModales = () => {
              this.setState({nointernet: false}); 
              
            }



            

    render() { console.log("RENDER Delete Media");
       
  
              
        return( <View> 

         

             <Modal visible={true} position= {'top'} transparent={true} animationType={"slide"} onRequestClose={() => console.log('Close was requested')}>
             {/* <KeyboardAvoidingView behavior="padding"  > */}
              <View style={{ 
                   padding:10, 
                  backgroundColor : 'rgba(0,0,0,0.90)',
                   marginTop: 230,
                   left: 50,
                   right: 15,
                 //  width: 170,
                   width: 290,
                   height: 150,
               
                   paddingVertical: 5,
                 
                   borderRadius: 12                       
                    }}>

                     
                    <View style={{ flex:1, alignItems: "center", marginTop:3 }}>
                   {/* { (!this.props.deletedflag) ? */}
                      { (this.state.warningMessage) ?
                     <View style={{ flex:0.8, justifyContent: "center", alignItems: "center" }}>
                       <Text style={{ color: 'red', fontSize: 18, alignItems: "center"}}>{I18n.t("DeleteMediaWarning")}</Text>
                        <Text style={{ color: 'white', fontSize: 16}}>{I18n.t("DeleteMediaTheentire1")} {this.props.desc}. {I18n.t("DeleteMediaTheentire2")}</Text>
                      </View>
                      :
                      <View style={{ flex:0.8, justifyContent: "center", alignItems: "center" }}>
                          <Image
                        style={{ width: 27,
                          height: 27, marginBottom: 20
                        }}
                        resizeMethod="resize"
                        source={require('../../images/delete3.png')}
                          />
                      <Text style={{ color: 'white', fontSize: 16, alignItems: "center"}}>{(this.props.desc==='photo') ? I18n.t("DeleteMediaAreYouSurePhoto") : I18n.t("DeleteMediaAreYouSureAudio")  } {(this.props.desc==='photo') ? I18n.t("DeleteMediaPhoto") : I18n.t("DeleteMediaAudio")}?</Text>
                      </View> }
                {/* :
                  <View style={{ flex:0.8, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: 'red', fontSize: 18, alignItems: "center"}}>ERROR</Text>
                            <Text style={{ color: 'white', fontSize: 16}}>We could not delete </Text>
                </View>
             */}
            {/* } */}


                        <View style={{ flex:0.2, flexDirection: 'row', justifyContent: "center" }}>
                            <View style={{ flex:0.5, alignItems: 'flex-start'}}>
                              <TouchableOpacity onPress={() => this.props.closeDelete()} >
                            <Text style={{ color: 'grey', fontSize: 16}}>{I18n.t("DeleteMediaCancel")}</Text>
                              </TouchableOpacity>
                            </View>
                           {/* {(!this.props.deletedflag) && */}
                            <View style={{ flex:0.5, alignItems: 'flex-end'}}>
                              <TouchableOpacity onPress={() => this.deleteMedia()} >
                            <Text style={{ color: 'red', fontSize: 16}}>{I18n.t("DeleteMediaDelete")}</Text>
                              </TouchableOpacity>
                          </View>
                     {/* }  */}

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
  }
  });



  

 const mapStateToProps = state => {
    return { //sqlrdsid: state.sqso.currentQso.sqlrdsId,
            //  followings: state.sqso.currentQso.followings,
             jwtToken: state.sqso.jwtToken,
            //  userqra: state.sqso.qra,
            //  qsoqras: state.sqso.currentQso.qsoqras,
             deletedflag: state.sqso.currentQso.deletedFlag,
             deletepostmessage: state.sqso.currentQso.deletedFlagMessage,
    }
          //   isfetching: state.sqso.isFetching };
};


const mapDispatchToProps = {
  deleteMediaInMemory,
  deletedFlag,
  deletePost,
  deleteMedia,
  setToken
 
   }

export default connect(mapStateToProps, mapDispatchToProps)(DeleteMedia);