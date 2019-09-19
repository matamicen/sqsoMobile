import React, { Component } from 'react';
import { Text, Image, View, Modal, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { QsoQraDelete, deleteQsoQra, followAdd, unfollow, getUserInfo } from '../../actions';
import { getDate, getFollowStatus, hasAPIConnection} from '../../helper';
import PropTypes from 'prop-types';
import VariosModales from './VariosModales';




class Qra extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          people: [],
          errorMessage: "",
          isFetching: true,
          modaldeleteqra: false,
          followstatus: 'empty',
          nointernet: false
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
          this.setState({ modaldeleteqra: false});
          }

         follow = async (qra,qra_avatar) => {
         //  if(!this.props.isfetching){
        
          if (await hasAPIConnection())
          {
              date = getDate();
              if (this.state.followstatus==="false")
               {
                this.setState({followstatus: 'true'})
                 await this.props.followAdd(qra,date,this.props.jwtToken,qra_avatar);
                 // chequeo si la api fue exitosa y lo dio de alta en redux
                 
                 // saco estas dos lineas de abajo para darle mejor UX al usuario y que cambie al toque el Follow
                 // si la API de follow fallara es mala suerte, no lo vera en los follwoing y lo debera hacer de nuevo en algun otro moment
                //  followstat = await getFollowStatus(this.props.followings, qra);
                //  if (followstat==="true") this.setState({followstatus: 'true'})
              }
               else
               {
                this.setState({followstatus: 'false'})
                await this.props.unfollow(qra,this.props.jwtToken);
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



            delete = (qra) => {
            // depende si el QSO esta Onprogress o si tiene un sqlrdsid creado borra llamando a la API o no.
            if (this.props.sqlrdsid !== '')
                 this.props.QsoQraDelete(this.props.sqlrdsid,qra,this.props.jwtToken);
               else
                 this.props.deleteQsoQra(qra);
         
             this.closeModaldeleteqra();
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


             <Modal visible={this.state.modaldeleteqra} position= {'top'} transparent={true} animationType={"slide"} onRequestClose={() => console.log('Close was requested')}>
             {/* <KeyboardAvoidingView behavior="padding"  > */}
              <View style={{ 
                   padding:10, 
                  backgroundColor : 'rgba(0,0,0,0.85)',
                   marginTop: 185,
                   left: 105,
                   right: 15,
                   width: 170,
                   height: 190,
                   paddingVertical: 5,
                 //   position: 'absolute',
                   
                 //  alignItems: 'center',
                   borderRadius: 12                       
                    }}>

                       <View style={{ flex:1 }}>
                       <View style={{ flex:0.4, flexDirection: 'row', }}>
                   
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

                       <View style={{ flex:0.15,  marginLeft: 10   }}>
                          <Text style={styles.name2} >
                                  {this.props.qra}
                          </Text>
                      </View>
                       

                    
                    

                      <View style={{ flex:0.25, marginLeft: 10   }}>
               
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
        color: '#333333'        
    },
    name2:{
      fontSize: 12,
    //   marginLeft: 3,
      // padding: 2,
      fontWeight: 'bold',        
      color: 'orange'        
  }
  });

  Qra.propTypes = {
    imageurl: PropTypes.string,
    qra: PropTypes.string
  };



 const mapStateToProps = state => {
    return { sqlrdsid: state.sqso.currentQso.sqlrdsId,
             followings: state.sqso.currentQso.followings,
             jwtToken: state.sqso.jwtToken
    }
          //   isfetching: state.sqso.isFetching };
};


const mapDispatchToProps = {
  QsoQraDelete,
  deleteQsoQra,
  followAdd,
  unfollow,
  getUserInfo
   }

export default connect(mapStateToProps, mapDispatchToProps)(Qra);