import React, { Component } from 'react';
import { Text, Image, View, Modal, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { QsoQraDelete, deleteQsoQra, followAdd, unfollow, getUserInfo, deletePost, deletedFlag, setQsoCallsigns } from '../../actions';
import { getDate, getFollowStatus, hasAPIConnection} from '../../helper';
import PropTypes from 'prop-types';
import VariosModales from './VariosModales';




class QraAddCallSign extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          people: [],
          errorMessage: "",
          isFetching: true,
          modaldeleteqra: false,
          followstatus: 'empty',
          nointernet: false,
          warningMessage: false
        };
      }

  

   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }

       LlamoAPI = () => {
      //  this.props.fetchPeople();
        //this.props.navigation.navigate('CameraScreen');
      }

      onPressItem = async (url, qra) => {
        console.log('click QRA: '+ url + ' ' + qra);
        if (this.props.following==='NOT_EXIST' && this.props.sqlrdsid.length===0)
           this.setState({ modaldeleteqra: true, followstatus: 'NOT_EXIST' });
         else{
        followstat = await getFollowStatus(this.props.followings, qra);
        this.setState({ modaldeleteqra: true, followstatus: followstat });
         }
        }
        
        closeModaldeleteqra = () => {
          console.log('click close QRA: ');
          this.props.deletedFlag(false, '');
          this.setState({ warningMessage: false, modaldeleteqra: false});
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

         follow = async (qra,qra_avatar) => {
         //  if(!this.props.isfetching){
        
          if (await hasAPIConnection())
          {
              date = getDate();
              if (this.state.followstatus==="false")
               {
                this.setState({followstatus: 'true'})
                 await this.props.followAdd(this.props.userqra, qra,date,this.props.jwtToken,qra_avatar);
                 // chequeo si la api fue exitosa y lo dio de alta en redux
                 
                 // saco estas dos lineas de abajo para darle mejor UX al usuario y que cambie al toque el Follow
                 // si la API de follow fallara es mala suerte, no lo vera en los follwoing y lo debera hacer de nuevo en algun otro moment
                //  followstat = await getFollowStatus(this.props.followings, qra);
                //  if (followstat==="true") this.setState({followstatus: 'true'})
              }
               else
               {
                this.setState({followstatus: 'false'})
                await this.props.unfollow(this.props.userqra,qra,this.props.jwtToken);
              // followstat = await getFollowStatus(this.props.followings, qra);
              // if (followstat==="false") this.setState({followstatus: 'false'})
            }
          }
           else
          {
           
            this.setState({modaldeleteqra: false, nointernet: true});

          }

        

         //      this.props.getUserInfo();
        //     }else console.log('intento llamar dos veces follow')
            }


            closeVariosModales = () => {
              this.setState({nointernet: false}); 
              
            }

            deleteCallSign = async (qra) => {
              console.log('se presiono delete callsign: '+qra)
              this.props.setQsoCallsigns('DELETEONE',qra);

            }

            delete = async (qra) => {
            // depende si el QSO esta Onprogress o si tiene un sqlrdsid creado borra llamando a la API o no.
            if (await hasAPIConnection())
            {
            if (this.props.sqlrdsid !== ''){
                 console.log('cantidad qras: '+this.props.qsoqras.length)
                 if (this.props.qsoqras.length===1 && this.props.qsotype!=='POST')
                   this.setState({warningMessage: true});
                   else{
                     this.props.QsoQraDelete(this.props.sqlrdsid,qra,this.props.jwtToken);
                     this.closeModaldeleteqra();
                   }
                }
                 else{
                 this.props.deleteQsoQra(qra);
                 this.closeModaldeleteqra();
                }
         
              }else
              this.setState({nointernet: true});

                  

              }

            

    render() { console.log("RENDER QRA");
       
  
              
        return( <View >

         

          {this.props.imageurl!==null ? 

   
                <TouchableOpacity onPress={() => this.onPressItem(this.props.imageurl, this.props.qra)} >
                     <Image style={styles.faceImageStyle} resizeMethod="resize"  source={{ uri: this.props.imageurl }}/> 
                </TouchableOpacity>
               :
               <TouchableOpacity  onPress={() => this.onPressItem(this.props.imageurl, this.props.qra)} 
                underlayColor="white">
                    <Image source={require('../../images/emptyprofile.png')} style={styles.faceImageStyle}/> 
               </TouchableOpacity>
           }
               
      
         

             <Text style={styles.name} >
                {this.props.qra}
             </Text>
             <TouchableOpacity  style={{marginLeft: 11}} onPress={() => this.deleteCallSign(this.props.qra)} >
                                <Image source={require('../../images/removecircle.png')}  style={{width: 19, height: 19 } } 
                                   resizeMode="contain" />  
                                    {/* <Text style={{ color: 'grey',  fontSize: 16}}>Delete</Text> */}
                             
             </TouchableOpacity>


             <Modal visible={this.state.modaldeleteqra} position= {'top'} transparent={true} animationType={"slide"} onRequestClose={() => console.log('Close was requested')}>
             {/* <KeyboardAvoidingView behavior="padding"  > */}
              <View style={{ 
                   padding:10, 
                  backgroundColor : 'rgba(0,0,0,0.85)',
                   marginTop: 185,
                   left: 40,
                   right: 15,
                 //  width: 170,
                   width: 320,
                   height: 190,
                   paddingVertical: 5,
                 //   position: 'absolute',
                   
                 //  alignItems: 'center',
                   borderRadius: 12                       
                    }}>

                     {(!this.state.warningMessage) ?
                       <View style={{ flex:1, alignItems: "center", marginTop:5 }}>
                       <View style={{ flex:0.4, flexDirection: 'row'}}>
                   
                          {/* <Qra qra={this.props.qra} imageurl={this.props.imageurl} /> */}
                          {this.props.imageurl!==null ? 

                                <Image style={styles.faceImageStyle} resizeMethod="resize" source={{ uri: this.props.imageurl }}/> 
                                :
                                <Image source={require('../../images/emptyprofile.png')} style={styles.faceImageStyle}/> 
                               
                          }

                          <TouchableOpacity  style={{ marginTop: 5,  padding:5, marginLeft: 5}} onPress={() => this.delete(this.props.qra)} >
                                <Image source={require('../../images/removecircle.png')}  style={{width: 24, height: 24, marginLeft:10 } } 
                                   resizeMode="contain" />  
                                    <Text style={{ color: 'grey',  fontSize: 16}}>Delete</Text>
                             
                          </TouchableOpacity>
                    
                       </View>

                       <View style={{ flex:0.15,marginRight: 68}}>
                          <Text style={styles.name2} >
                                  {this.props.qra}
                          </Text>
                      </View>
                       

                    
                    

                      <View style={{ flex:0.25, marginRight: 68  }}>
               
                     {this.state.followstatus==="false" &&

                     <TouchableOpacity  onPress={() => this.follow(this.props.qra,this.props.imageurl)} >
                       <Text style={{ color: 'white', fontSize: 17}}>Follow</Text>
                      </TouchableOpacity>
                        
                         
                       }

                       {/* {this.props.following==="TRUE" &&  */}
                       {this.state.followstatus==="true" &&

                        <TouchableOpacity  onPress={() => this.follow(this.props.qra,this.props.imageurl)} >
                          <Text style={{ color: 'white', fontSize: 17}}>UnFollow</Text>
                        </TouchableOpacity>
                      
                         
                        
                        } 
                     </View> 
                    
                     <View style={{ flex:0.2, flexDirection: 'row', justifyContent: "center" }}>
                        <TouchableOpacity onPress={() => this.closeModaldeleteqra()} >
                       <Text style={{ color: 'grey', fontSize: 16}}>Cancel</Text>
                         </TouchableOpacity>

                     </View>   
                  
               

                        

                    </View>
                    :
                    <View style={{ flex:1, alignItems: "center", marginTop:3 }}>
                      {(!this.props.deletedflag) ?
                       <View style={{ flex:0.8, justifyContent: "center", alignItems: "center" }}>
                       <Text style={{ color: 'red', fontSize: 18, alignItems: "center"}}>WARNING</Text>
                        <Text style={{ color: 'white', fontSize: 16}}>The entire post will be DELETED if you delete the last callsign. If you want to change the callsign, add the new one first and then delete this one.</Text>
                      </View>
                      :
                      <View style={{ flex:0.8, justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ color: 'yellow', fontSize: 18, alignItems: "center"}}>Message</Text>
                       <Text style={{ color: 'white', fontSize: 16}}>{this.props.deletepostmessage}</Text>
                     </View>
                  }


                        <View style={{ flex:0.2, flexDirection: 'row', justifyContent: "center" }}>
                            <View style={{ flex:0.5, alignItems: 'flex-start'}}>
                              <TouchableOpacity onPress={() => this.closeModaldeleteqra()} >
                            <Text style={{ color: 'grey', fontSize: 16}}>Cancel</Text>
                              </TouchableOpacity>
                            </View>
                           {(!this.props.deletedflag) &&
                            <View style={{ flex:0.5, alignItems: 'flex-end'}}>
                              <TouchableOpacity onPress={() => this.deletePost()} >
                            <Text style={{ color: 'grey', fontSize: 16}}>Delete the POST</Text>
                              </TouchableOpacity>
                          </View>
                     } 

                       </View>   
                    </View>
                    }
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
      width: 43,
      height: 43,
      borderRadius: 30
       },
    name:{
        fontSize: 12,
        marginLeft: 0,
        padding: 2,
        fontWeight: 'bold',        
       // color: '#333333'  
        color: 'white'      
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

//   Qra.propTypes = {
//     imageurl: PropTypes.string,
//     qra: PropTypes.string
//   };

  

 const mapStateToProps = state => {
    return { sqlrdsid: state.sqso.currentQso.sqlrdsId,
             followings: state.sqso.currentQso.followings,
             jwtToken: state.sqso.jwtToken,
             userqra: state.sqso.qra,
             qsotype: state.sqso.currentQso.qsotype,
             qsoqras: state.sqso.currentQso.qsoqras,
             deletedflag: state.sqso.currentQso.deletedFlag,
             deletepostmessage: state.sqso.currentQso.deletedFlagMessage,
    }
          //   isfetching: state.sqso.isFetching };
};


const mapDispatchToProps = {
  QsoQraDelete,
  deleteQsoQra,
  followAdd,
  unfollow,
  getUserInfo,
  deletePost,
  deletedFlag,
  setQsoCallsigns
 
   }

export default connect(mapStateToProps, mapDispatchToProps)(QraAddCallSign);