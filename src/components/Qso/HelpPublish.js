import React, { Component } from 'react';
import { Text, Image, View, Modal, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
// import { deletePost, deletedFlag, deleteMediaInMemory , deleteMedia, setToken} from '../../actions';
import { hasAPIConnection} from '../../helper';
// import { Auth } from 'aws-amplify';
// import awsconfig from '../../aws-exports'

// import VariosModales from './VariosModales';
import I18n from '../../utils/i18n';


// Auth.configure(awsconfig);

class HelpPublish extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
         
        //   nointernet: false,
        //   warningMessage: false,
        //   alreadyPublished: false,
        };
        // this.conta = 0;
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
        // console.log('deletepost_sqlrdsid: '+ this.props.sqlrdsid );
        // if (this.props.sqlrdsid)
        //   this.setState({alreadyPublished: true});


     
       }

       

   

        // deletePublishedPost = async  () => {
       
        //     if (await hasAPIConnection())
        //   {
        //             // si se llama este metodo es porque el post fue publicado
        //             this.deletePost();
        //             this.props.closeDeletePost()
    
        //    // this.props.deletePost(this.props.sqlrdsid,this.props.jwtToken);
        //   }else
        //       this.setState({nointernet: true});
        //     }

        // closeVariosModales = () => {
        //   this.setState({nointernet: false}); 
          
        // }


        //   deletePost = async  () => {
        //     if (await hasAPIConnection())
        //   {
        //     // this.props.deletedFlag(false,'');
        //   //  this.setState({warningMessage: false});
        //     this.props.deletePost(this.props.sqlrdsid,this.props.jwtToken);
        //   }else
        //       this.setState({nointernet: true});
        //     }

            // closeVariosModales = () => {
            //   this.setState({nointernet: false}); 
              
            // }



            

    render() { console.log("RENDER Delete Media");
       
  
              
        return( <View> 

         
{/* animationType={"slide"} */}
             <Modal visible={true} position= {'top'} transparent={true}  onRequestClose={() => console.log('Close was requested')}>
             {/* <KeyboardAvoidingView behavior="padding"  > */}
              <View style={{ 
                   padding:10, 
                  backgroundColor : 'rgba(36,54,101,0.95)',
                   marginTop: 50,
                   left: 15,
                   right: 15,
                 //  width: 170,
                   width: 320,
                   height: this.props.helptag ? 250 : 430,
               
                   paddingVertical: 5,
                 
                   borderRadius: 12                       
                    }}>

                     
                    <View style={{ flex:1, alignItems: "center", marginTop:0 }}>
                  
                      { (this.props.qsotype==='QSO') &&
                 <View style={{ flex:0.9, alignItems: "center" }}>
                         <View style={{ flex:0.13, alignItems: "center" }}>
                       <Text style={{ color: 'yellow', fontSize: 18, alignItems: "center"}}>{I18n.t("helpPublishQSOtitle")} {"\n"}</Text>
                       </View> 
                      <View style={{ flex:0.25, alignItems: 'flex-start' }}>
                        <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishQSOMessage1")}{"\n"}</Text>
                      </View>
                      <View style={{ flex:0.30, alignItems: 'flex-start' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16}}>• {I18n.t("helpPublishQSOfield1")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16}}>• {I18n.t("helpPublishQSOfield2")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold',fontSize: 16}}>• {I18n.t("helpPublishQSOfield3")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold',fontSize: 16}}>• {I18n.t("helpPublishQSOfield4")}</Text>
                      </View>
                      <View style={{ flex:0.37, alignItems: 'flex-start' }}>
                        <Text style={{ color: '#c0c0c0', fontSize: 16, alignItems: 'flex-start'}}>{"\n"}{I18n.t("helpPublishQSOMessage2")}</Text>
                      </View>
                 </View>
                     } 

       { (this.props.qsotype==='LISTEN') &&
                 <View style={{ flex:0.9, alignItems: "center" }}>
                         <View style={{ flex:0.13, alignItems: "center" }}>
                       <Text style={{ color: 'yellow', fontSize: 18, alignItems: "center"}}>{I18n.t("helpPublishSWLtitle")} {"\n"}</Text>
                       </View> 
                      <View style={{ flex:0.24, alignItems: "center" }}>
                        <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishSWLMessage1")}{"\n"}</Text>
                      </View>
                      <View style={{ flex:0.30, alignItems: 'flex-start' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16}}>• {I18n.t("helpPublishSWLfield1")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16}}>• {I18n.t("helpPublishSWLfield2")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold',fontSize: 16}}>• {I18n.t("helpPublishSWLfield3")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold',fontSize: 16}}>• {I18n.t("helpPublishSWLfield4")}</Text>
                      </View>
                      <View style={{ flex:0.38, alignItems: "center" }}>
                        <Text style={{ color: '#c0c0c0', fontSize: 16}}>{"\n"}{I18n.t("helpPublishSWLMessage2")}</Text>
                      </View>
                 </View>
                     }

{ (this.props.qsotype==='POST') &&
                 <View style={{ flex:0.9, alignItems: "center" }}>
                         <View style={{ flex:0.15, alignItems: "center" }}>
                       <Text style={{ color: 'yellow', fontSize: 18, alignItems: "center"}}>{I18n.t("helpPublishPOSTtitle")} {"\n"}</Text>
                       </View> 
                      <View style={{ flex:0.55 }}>
                        <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishPOSTMessage1")}{"\n"}</Text>
                        <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishPOSTMessage2")}</Text>
                      </View>
                     <View style={{ flex:0.35, marginTop:10 }}>
                    <Text style={{ color: 'yellow', fontSize: 16}}>{I18n.t("helpPublishPOSTfield1")}</Text>
                         <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishPOSTfield2")}</Text>
                        {/* <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16}}>• {I18n.t("helpPublishPOSTfield1")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16}}>• {I18n.t("helpPublishPOSTfield2")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold',fontSize: 16}}>• {I18n.t("helpPublishPOSTfield3")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold',fontSize: 16}}>• {I18n.t("helpPublishPOSTfield4")}</Text> */}
                      </View> 
                      {/* <View style={{ flex:0.30, alignItems: "center" }}>
                        <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishPOSTMessage2")}</Text>
                      </View> */}
                 </View>
                     }

{ (this.props.qsotype==='FLDDAY') &&
                 <View style={{ flex:0.9, alignItems: "center" }}>
                         <View style={{ flex:0.1, alignItems: "center" }}>
                       <Text style={{ color: 'yellow', fontSize: 18, alignItems: "center"}}>{I18n.t("helpPublishFLDDAYtitle")} {"\n"}</Text>
                       </View> 
                      <View style={{ flex:0.55 }}>
                        <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishFLDDAYMessage1")}{"\n"}</Text>
                        <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishFLDDAYMessage2")}</Text>
                      </View>
                      <View style={{ flex:0.35, marginTop:10 }}>
                        <Text style={{ color: 'yellow', fontSize: 16}}>{I18n.t("helpPublishQAPfield1")}</Text>
                         <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishQAPfield2")}</Text>
                        {/* <Text style={{ color: 'white', fontWeight: 'bold',fontSize: 16}}>• {I18n.t("helpPublishPOSTfield3")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold',fontSize: 16}}>• {I18n.t("helpPublishPOSTfield4")}</Text> */}
                      </View> 
                      {/* <View style={{ flex:0.30, alignItems: "center" }}>
                        <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishPOSTMessage2")}</Text>
                      </View> */}
                 </View>
                     }

{ (this.props.qsotype==='QAP') &&
                 <View style={{ flex:0.9, alignItems: "center" }}>
                         <View style={{ flex:0.1, alignItems: "center" }}>
                       <Text style={{ color: 'yellow', fontSize: 18, alignItems: "center"}}>{I18n.t("helpPublishQAPtitle")} {"\n"}</Text>
                       </View> 
                      <View style={{ flex:0.55 }}>
                        <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishQAPMessage1")}{"\n"}</Text>
                        <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishQAPMessage2")}</Text>
                      </View>
                      <View style={{ flex:0.35, marginTop:10 }}>
                        <Text style={{ color: 'yellow', fontSize: 16}}>{I18n.t("helpPublishQAPfield1")}</Text>
                         <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishQAPfield2")}</Text>
                        {/* <Text style={{ color: 'white', fontWeight: 'bold',fontSize: 16}}>• {I18n.t("helpPublishPOSTfield3")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold',fontSize: 16}}>• {I18n.t("helpPublishPOSTfield4")}</Text>  */}
                      </View>
                      {/* <View style={{ flex:0.30, alignItems: "center" }}>
                        <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishPOSTMessage2")}</Text>
                      </View> */}
                 </View>
                     }

          {/* { (this.props.helptag && this.props.helptype==='tag') && */}
          { (this.props.helptag && (this.props.helptype==='QAP' || this.props.helptype==='FLDAY' || this.props.helptype==='POST')) &&
                 <View style={{ flex:0.9, alignItems: "center" }}>
                         <View style={{ flex:0.2, alignItems: "center" }}>
                       <Text style={{ color: 'yellow', fontSize: 18, alignItems: "center"}}>{I18n.t("helpPublishTagtitle")} {"\n"}</Text>
                       </View> 
                      <View style={{ flex:0.8 }}>
                        <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishTagMessage1")}{"\n"}</Text>
                      </View>
                      {/* <View style={{ flex:0.24, alignItems: 'flex-start' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16}}>• {I18n.t("helpPublishSWLfield1")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16}}>• {I18n.t("helpPublishSWLfield2")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold',fontSize: 16}}>• {I18n.t("helpPublishSWLfield3")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold',fontSize: 16}}>• {I18n.t("helpPublishSWLfield4")}</Text>
                      </View> */}
                      {/* <View style={{ flex:0.1, alignItems: "flex-start" }}>
                       <Text style={{ color: 'yellow', fontSize: 15}}>{I18n.t("helpPublishTagExample")}</Text>
                        <Text style={{ color: 'white', fontSize: 15}}>"{I18n.t("helpPublishTagMessage2")}"</Text>
                        <Text style={{ color: '#c0c0c0', fontSize: 15}}>{I18n.t("helpPublishTagMessage3")}<Text style={{ color: 'white', fontSize: 15}}> "{I18n.t("helpPublishTagRePublicar")}".</Text></Text>
                        <Text style={{ color: '#c0c0c0', fontSize: 15}}>{I18n.t("helpPublishTagMessage4")}{"\n"}</Text> 
                      </View> */}
                 </View>
                     }   
               
               { (this.props.helptag && (this.props.helptype==='QSO' || this.props.helptype==='LISTEN')) &&
                 <View style={{ flex:0.9, alignItems: "center" }}>
                         <View style={{ flex:0.2, alignItems: "center" }}>
                       <Text style={{ color: 'yellow', fontSize: 18, alignItems: "center"}}>{I18n.t("helpPublishSdtitle")} {"\n"}</Text>
                       </View> 
                      <View style={{ flex:0.8 }}>
                        <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("helpPublishSdMessage1")}{"\n"}</Text>
                      </View>
                      {/* <View style={{ flex:0.24, alignItems: 'flex-start' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16}}>• {I18n.t("helpPublishSWLfield1")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16}}>• {I18n.t("helpPublishSWLfield2")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold',fontSize: 16}}>• {I18n.t("helpPublishSWLfield3")}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold',fontSize: 16}}>• {I18n.t("helpPublishSWLfield4")}</Text>
                      </View> */}
                      {/* <View style={{ flex:0.1, alignItems: "flex-start" }}>
                       <Text style={{ color: 'yellow', fontSize: 15}}>{I18n.t("helpPublishTagExample")}</Text>
                        <Text style={{ color: 'white', fontSize: 15}}>"{I18n.t("helpPublishTagMessage2")}"</Text>
                        <Text style={{ color: '#c0c0c0', fontSize: 15}}>{I18n.t("helpPublishTagMessage3")}<Text style={{ color: 'white', fontSize: 15}}> "{I18n.t("helpPublishTagRePublicar")}".</Text></Text>
                        <Text style={{ color: '#c0c0c0', fontSize: 15}}>{I18n.t("helpPublishTagMessage4")}{"\n"}</Text> 
                      </View> */}
                 </View>
                     }          
      


                        <View style={{ flex:0.1, flexDirection: 'row', alignItems: 'center' }}>
                         
                        
                            {/* <View style={{ flex:0.5, alignItems: 'flex-end'}}> */}
                       
                              <TouchableOpacity onPress={() => this.props.closeHelp()} >
                                <Text style={{ color: 'white', fontSize: 16}}>{I18n.t("helpPublishQSOClose")}</Text>
                             </TouchableOpacity>
                            
                          {/* </View> */}
                     {/* }  */}

                       </View>   
                    </View>
                    
              </View>
                {/* </KeyboardAvoidingView > */}
                   
                      </Modal>
                      {/* {(this.state.nointernet) && 
                      <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
                      } */}

            

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
     return { }
};


const mapDispatchToProps = {
 
 
   };

export default connect(mapStateToProps, mapDispatchToProps)(HelpPublish);