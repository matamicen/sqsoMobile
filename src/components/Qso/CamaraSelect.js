import React, { Component } from 'react';
import { Text, Image, View, Modal, ActivityIndicator, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { setToken} from '../../actions';
import { hasAPIConnection} from '../../helper';
import { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports'

import VariosModales from './VariosModales';


Auth.configure(awsconfig);

class CamaraSelect extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
         
          nointernet: false,
          warningMessage: false
        };
      }

  

   componentDidMount = async () => {
    
  

    // session = await Auth.currentSession();
      
    
    // //  session = await Auth.currentAuthenticatedUser();
    //   console.log("Su token DID MOUNT es: " + session.idToken.jwtToken);
    //    this.props.setToken(session.idToken.jwtToken);
    

    //     // si tiene 2 de length es porque solo tiene 1 media solo ya que el otro siempre es un registro de type VACIO 
    //     // que se usa para que haya algo y el usuario pueda tocar la pantalla u bajar el teclado

    //     if (this.props.sqlrdsid && this.props.mediafiles.length===2) // quiere decir que tiene QSO en base de datos y solo le queda un media
    //          this.setState({warningMessage: true});

    


     
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
                this.deletePost();
                else
                 // borro del backend el media con la API y luego en el action de esta API borro 
                 // de mediafiles el media si se confirma ok el borrado de API
                this.props.deleteMedia(this.props.idmedia,this.props.name,this.props.jwtToken);



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

   goCamera = async () => {
    this.props.close();

            setTimeout(() => {
                this.props.cameraScreen();
            }
            , 250);


      }

    goPhotoGallery = async () => {
        this.props.close();

        if ( Platform.OS === 'ios')
        timer = 700;
          else timer = 250;

            setTimeout(() => {
                this.props.photoGallery();
            }
            , timer);


      }


            

    render() { console.log("RENDER Delete Media");
       
  
              
        return( <View> 

         

             <Modal visible={true} position= {'top'} transparent={true} animationType={"slide"} onRequestClose={() => console.log('Close was requested')}>
             {/* <KeyboardAvoidingView behavior="padding"  > */}
              <View style={{ 
                   padding:10, 
                  backgroundColor : 'rgba(0,0,0,0.90)',
                   marginTop: 230,
                   left: 37,
                   right: 15,
                 //  width: 170,
                   width: 290,
                   height: 150,
               
                   paddingVertical: 5,
                 
                   borderRadius: 12                       
                    }}>

                     
                    <View style={{ flex:1, alignItems: "center", marginTop:3 }}>
             
                 
                      <View style={{ flex:0.8, flexDirection: 'row' }}>
                    
                      <View style={{ flex:0.5, alignItems: 'center',  marginTop: 20}}>
                           
                            <TouchableOpacity  style={{ 
                               alignItems: 'center'
                                }} onPress={() => this.goPhotoGallery()} >
                                
                            <Image
                                style={{ width: 29,
                                height: 26
                                }}
                                resizeMethod="resize"
                                source={require('../../images/gallery.png')}
                                />
                                
                    
                                    <Text style={{ color: 'white', fontSize: 16,  marginTop: 3}}>Gallery</Text>
                             </TouchableOpacity>
                      </View> 

                      <View style={{ flex:0.5, alignItems: 'center', marginTop: 21}}>
                            
                            <TouchableOpacity   style={{ 
                               alignItems: 'center'
                                }} onPress={() => this.goCamera()} >
                                
                            <Image
                                style={{ width: 31,
                                height: 26
                                }}
                                resizeMethod="resize"
                                source={require('../../images/camera3.png')}
                                />
                                
                    
                                    <Text style={{ color: 'white', fontSize: 16, marginTop: 3}}>Camera</Text>
                             </TouchableOpacity>
                      </View> 
         
                  </View>

                        <View style={{ flex:0.2, flexDirection: 'row', justifyContent: "center" }}>
                            <View style={{ flex:1, alignItems: 'center'}}>
                              <TouchableOpacity onPress={() => this.props.close()} >
                            <Text style={{ color: 'grey', fontSize: 16}}>Cancel</Text>
                              </TouchableOpacity>
                            </View>
                           {/* {(!this.props.deletedflag) && */}
                            {/* <View style={{ flex:0.5, alignItems: 'flex-end'}}>
                              <TouchableOpacity onPress={() => this.goCamera()} >
                            <Text style={{ color: 'red', fontSize: 16}}>Camera</Text>
                              </TouchableOpacity>
                          </View> */}
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
  setToken
 
   }

export default connect(mapStateToProps, mapDispatchToProps)(CamaraSelect);