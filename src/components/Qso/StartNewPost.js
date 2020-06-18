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

class StartNewPost extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
         
          nointernet: false,
          warningMessage: false,
          alreadyPublished: false,
        };
        this.conta = 0;
      }

  

   componentDidMount = async () => {
    
  



    // session = await Auth.currentSession();
      
    
    // //  session = await Auth.currentAuthenticatedUser();
    //   console.log("Su token DID MOUNT es: " + session.idToken.jwtToken);
    //    this.props.setToken(session.idToken.jwtToken);
    



       // cuento cuantas imagens o audios tiene la publicacion
       // porque el length a veces no es correcto porque se tuvo que inventar un media vacio que no es ni audio ni imagen
       // para que el usuario pueda bajar el teclado en iOS desde la QsoScreen, entonces el usuario toca el sector de MEDIA
       // que hay un media que no se muestra pero ocupa Height en la pantalla y el teclado se baja cuando se toca ese sector

//      this.conta = 0;

//        this.props.mediafiles.map(item => {
//     if(item.type === 'audio' || item.type === 'image') {
//       this.conta = this.conta + 1; 
//     }
//   })

        // si tiene 2 de length es porque solo tiene 1 media solo ya que el otro siempre es un registro de type VACIO 
        // que se usa para que haya algo y el usuario pueda tocar la pantalla u bajar el teclado
        // console.log('sqlrdsid: '+ this.props.sqlrdsid + ' mediafiles.length: '+ this.props.mediafiles.length + 'conta: '+ this.conta)
        // if (this.props.sqlrdsid && this.conta===1) // quiere decir que tiene QSO en base de datos y solo le queda un media
        //      this.setState({warningMessage: true});


        console.log('deletepost_sqlrdsid: '+ this.props.sqlrdsid );
        if (this.props.sqlrdsid)
          this.setState({alreadyPublished: true});


     
       }

       


        deletePublishedPost = async  () => {
       
            if (await hasAPIConnection())
          {
                    // si se llama este metodo es porque el post fue publicado
                    this.deletePost();
                    this.props.closeDeletePost()
    
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
            // this.props.deletedFlag(false,'');
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
                  backgroundColor : 'rgba(36,54,101,0.93)',
                   marginTop: 230,
                   left: 30,
                   right: 15,
                 //  width: 170,
                   width: 305,
                   height: 150,
               
                   paddingVertical: 5,
                 
                   borderRadius: 12                       
                    }}>

                     
                    <View style={{ flex:1, alignItems: "center", marginTop:3 }}>
                   {/* { (!this.props.deletedflag) ? */}
                      { (this.state.alreadyPublished) ?
                     <View style={{ flex:0.8, justifyContent: "center", alignItems: "center" }}>
                       {/* <Text style={{ color: 'red', fontSize: 18, alignItems: "center"}}>{I18n.t("DeletePostWarning")}</Text> */}
                        <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("StartNewPostAlreadyPublished")}</Text>
                      </View>
                      :
                      <View style={{ flex:0.8, justifyContent: "center", alignItems: "center" }}>
                     
                   <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("StartNewPostNotPublished")}</Text>
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
                            {/* {(this.state.alreadyPublished) &&   */}
                              <TouchableOpacity onPress={() => this.props.closeStartNewPost()} >
                            <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("StartNewPostContinueEditing")}</Text>
                              </TouchableOpacity>
                                 {/* } */}
                            </View>
                           {/* {(!this.props.deletedflag) && */}
                            <View style={{ flex:0.5, alignItems: 'flex-end'}}>
                            {/* {(this.state.alreadyPublished) ?     */}
                              <TouchableOpacity onPress={() => this.props.endQso()} >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold'}}>{I18n.t("StartNewPostOK")}</Text>
                              </TouchableOpacity>
                              {/* : */}
                              {/* <TouchableOpacity onPress={() => this.props.closeDeletePost()} >
                                <Text style={{ color: 'grey', fontSize: 16}}>{I18n.t("DeletePostCantDelete")}</Text>
                             </TouchableOpacity> */}
                            {/* } */}
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
            //  deletedflag: state.sqso.currentQso.deletedFlag,
            //  deletepostmessage: state.sqso.currentQso.deletedFlagMessage,
    }
          //   isfetching: state.sqso.isFetching };
};


const mapDispatchToProps = {

  setToken
 
   }

export default connect(mapStateToProps, mapDispatchToProps)(StartNewPost);