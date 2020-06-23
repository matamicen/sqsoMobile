import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, TouchableOpacity, Dimensions,
    Linking  } from 'react-native';
import { connect } from 'react-redux';
import {  set_notification_read, manage_notifications } from '../../actions';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { getDateQslScan } from '../../helper';
// import moment from "moment";
import MomentAgo from './MomentAgo';
import I18n from '../../utils/i18n';

class NotifItem extends Component {

    constructor(props) {
        super(props);

        this.width = Dimensions.get('window').width; //full width
        this.height = Dimensions.get('window').height; //full height
        
        this.state = {
          people: [],
          errorMessage: "",
          isFetching: true,
          // ago: moment(this.props.datetimecomment).fromNow()
        };
      }

  

   componentDidMount() {
    
      //  this.props.fetchPeople();
      // this.timerID = setInterval(
      //   () => this.tick(),
      //   60000
      // );
     
       }
       componentWillUnmount() {
        // clearInterval(this.timerID);
      }

      // tick() {
      //   this.setState({
      //     ago: moment(this.props.datetimecomment).fromNow()
      //   });
      // }
  
      onPressItem = (idqra_notifications, urlnotif) => {
       console.log('presiono notif:' + idqra_notifications+ ' URL:' + urlnotif ) ;

    //    let url = 'http://d3cevjpdxmn966.cloudfront.net/qso/'+urlnotif;
if (urlnotif!=null)
    {
       this.props.set_notification_read(idqra_notifications,this.props.jwtToken);
      //  this.props.manage_notifications('SET_READ_URL',idqra_notifications);

       Linking.canOpenURL(urlnotif).then(supported => {
        if (!supported) {
          console.log('Can\'t handle url: ' + urlnotif);
        } else {
          if(__DEV__)
            analytics().logEvent("OPENNOTIF_DEV", {"QRA": this.props.qra});
          else
            analytics().logEvent("OPENNOTIF_PRD", {"QRA": this.props.qra});
          console.log("Recording analytics open Notif")

          // delay de 2.5 segundos para que borre el item asi no no lo borra inmediato y no confune
          // al usuario
          setTimeout(() => {
            this.props.manage_notifications('SET_READ_URL',idqra_notifications);
          }
          , 2500)
          return Linking.openURL(urlnotif);
        
        }
      }).catch(err => {
              console.error('An error occurred', err)
              crashlytics().setUserId(this.props.qra);
              crashlytics().log('error: ' + JSON.stringify(err)) ;
              if(__DEV__)
              crashlytics().recordError(new Error('Linking.canOpenURL_DEV'));
              else
              crashlytics().recordError(new Error('Linking.canOpenURL_PRD'));
    
    
            });
    }
    else
     console.log('la notificacion no viene con URL');
    
    }


    markAsRead = (idqra_notifications, urlnotif) => {
        console.log('presiono notif:' + idqra_notifications+ ' URL:' + urlnotif ) ;
        // let url = 'http://d3cevjpdxmn966.cloudfront.net/qso/'+urlnotif;
 
       this.props.set_notification_read(idqra_notifications,this.props.jwtToken); // llamo api de borrado de notificacion en backend
        this.props.manage_notifications('SET_READ',idqra_notifications); // borro del array de notificacion en memoria asi el usuario ve el efecto inmediato
 
    //     Linking.canOpenURL(url).then(supported => {
    //      if (!supported) {
    //        console.log('Can\'t handle url: ' + url);
    //      } else {
    //        return Linking.openURL(url);
    //      }
    //    }).catch(err => console.error('An error occurred', err));
     
     }


    render() { console.log("RENDER NotifItem");
  console.log('josesito:')
   // fec = new Date(this.props.datetimecomment);
   
    //out = moment(this.props.datetimecomment).fromNow();  
  //    console.log(out);
  
  
                           
              
        return( <View style={{ flex: 1, backgroundColor: this.props.read===null ? 'white' : '#DCDCDC' }}>
               
               <View style={{flex: 1, flexDirection: 'row', marginTop: 9, borderBottomWidth: 1,
                borderBottomColor: '#D3D3D3' }}>

                <View style={{flex: 0.23, marginLeft: 6}}>
                 {this.props.avatar_pic!==null ?
                  <TouchableOpacity onPress={() => this.onPressItem(this.props.idqra_activity,this.props.url)} underlayColor="white">  
                       <Image
                    style={styles.faceImageStyle}
                    resizeMethod="resize"
                    source={{ uri: this.props.avatar_pic }}
                      /> 
                  </TouchableOpacity>

                      :
                      <TouchableOpacity onPress={() => this.onPressItem(this.props.idqra_activity,this.props.url)} underlayColor="white">  
                      <Image source={require('../../images/emptyprofile.png')} style={styles.faceImageStyle} resizeMethod="resize" /> 
                      </TouchableOpacity>
                      }
                      
                      <Text style={{fontSize:11, marginLeft: 5,  color: '#243665',fontWeight: 'bold' }} > {this.props.QRA} </Text>
                   
                </View>
                      
                      
                    
                    
                



               {/* {"\n"}{"\n"} */}

                    <View  style={{flex: 0.60 }}>

                    <TouchableOpacity onPress={() => this.onPressItem(this.props.idqra_activity,this.props.url)} underlayColor="white">  
                     
                        {/* los \n son por si el mensaje de la notificacion ocupa 1 sola linea, le agrega dos lineas para
                        que el CLICK sobre lo vacio haga click y tenga efecto
                        on {getDateQslScan(this.props.utc).substr(0,12)}  this.props.band!=='') ?
                         */}
                        {(this.props.activity_type===18 && this.props.band!=='') &&
 
                         <Text style={{fontSize:15}}>{this.props.message} on {this.props.band} {this.props.mode} |
                           <Text style={{fontSize:15, fontWeight: "bold", color: 'black'}}> {(this.props.comment) && this.props.comment.substr(0,50)}... </Text> <Text style={{fontSize:14, color: 'grey'}}><MomentAgo date={this.props.datetimecomment}/></Text>
                         </Text>
                      }
                         {(this.props.activity_type===18 && this.props.band==='') &&
                         <View >
                           <Text style={{fontSize:15 }}>{this.props.message} |
                             <Text style={{fontSize:15, fontWeight: "bold", height: 40, color: 'black'}}> {(this.props.comment) && this.props.comment.substr(0,57)}... </Text>  <Text style={{fontSize:14, height: 40, color: 'grey'}}><MomentAgo date={this.props.datetimecomment}/></Text>
                           </Text>
                        </View>
                     }
                      
                    
                     
                           {(this.props.activity_type===10 && this.props.band!=='') &&
                           <View>
                          <Text style={{fontSize:15}}>{this.props.message} on {this.props.band} {this.props.mode}{"\n"}   
                          {/* <Text style={{fontSize:15}}>{this.props.message} {I18n.t("NOTIF_ACTIVTYPE_10_QSO",{mode: this.props.mode,band: this.props.band,callsign: this.props.QRA})} {"\n"} */}
                          <Text style={{fontSize:14, height: 60, color: 'grey'}}><MomentAgo date={this.props.utc}/>{"\n"} </Text>
                            {/* <Text style={{fontSize:14, height: 60, color: 'grey'}}> on {getDateQslScan(this.props.utc).substr(0,19)} UTC{"\n"} </Text> */}
                           </Text>
                          </View>
                       }
                        {(this.props.activity_type===10 && this.props.band==='') &&
                         <View>
                          <Text style={{fontSize:15}}>{this.props.message}</Text>
                          <Text style={{fontSize:14, height: 40, color: 'grey'}}><MomentAgo date={this.props.utc}/></Text>
                          {/* <Text style={{fontSize:14, height: 40, color: 'grey'}}>on {getDateQslScan(this.props.utc).substr(0,19)} UTC</Text> */}
                          </View>
                       }
{/* {moment(this.props.datetimecomment).fromNow()} */}
                        {(this.props.activity_type===1) &&
                          <View>
                          <Text style={{fontSize:15}}>{this.props.message} </Text>
                          <Text style={{fontSize:14, color: 'grey', height: 40 }}><MomentAgo date={this.props.datetimecomment}/></Text>
                          {/* <Text style={{fontSize:14, color: 'grey', height: 40 }}>on {getDateQslScan(this.props.datetimecomment).substr(0,19)} UTC</Text> */}
                          </View>
                        }
                         {(this.props.activity_type===23) &&
                          <Text style={{fontSize:15, height: 75}}>{this.props.message} </Text>
                          // <Text style={{fontSize:15, height: 75}}>{this.props.message} on {this.props.band} {this.props.mode}{"\n"} </Text>
                        }
                           
                          {(this.props.activity_type===12 && this.props.band!=='') &&
                          <View>
                          <Text style={{fontSize:15}}>{this.props.message} on {this.props.band} {this.props.mode} </Text>
                           <Text style={{fontSize:14, height: 25,color: 'grey'}}><MomentAgo date={this.props.utc}/>{"\n"} </Text>
                            {/* <Text style={{fontSize:14, height: 25,color: 'grey'}}> on {getDateQslScan(this.props.utc).substr(0,19)} UTC </Text>  */}
                          </View>
                       }

                        {(this.props.activity_type===12 && this.props.band==='') &&
                         <View>
                          <Text style={{fontSize:15}}>{this.props.message}</Text>
                          <Text style={{fontSize:14, height: 25,color: 'grey' }}><MomentAgo date={this.props.utc}/></Text>
                          {/* <Text style={{fontSize:14, height: 25,color: 'grey' }}>on {getDateQslScan(this.props.utc).substr(0,19)} UTC</Text> */}
                          </View>
                       }

                         {(this.props.activity_type===50) &&
                         <View>
                          <Text style={{fontSize:15}}>{this.props.message}</Text>
                          <Text style={{fontSize:14, height: 40, color:'grey'}}><MomentAgo date={this.props.datetimecomment}/> </Text>
                          {/* <Text style={{fontSize:14, height: 40, color:'grey'}}>on {getDateQslScan(this.props.datetimecomment).substr(0,19)} UTC </Text> */}
                          </View>
                      }
                        {/* El 108 es el de la notificacion que viene por push pero el telefono esta en Foreground entonces la capturo y 
                           y la doy de alta en la bandeja de notificaciones */}
                          {(this.props.activity_type===108) &&
                          <Text style={{fontSize:15, height: 75}}>{this.props.message} {"\n"} </Text>
                        }
                     </TouchableOpacity>
                             

                    </View>



                    <View  style={{flex: 0.15, marginRight: 7, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>

                   {this.props.read===null ? 
                    // <TouchableOpacity onPress={() => this.markAsRead(this.props.idqra_notifications,this.props.QSO_GUID)} underlayColor="white">  
                    <TouchableOpacity onPress={() => this.markAsRead(this.props.idqra_activity,this.props.QSO_GUID)} underlayColor="white">  
                      {/* <View>
                        <Text style={{fontSize:11,  color: '#243665',fontWeight: 'bold' }}>Mark As</Text>
                        </View>
                        <View style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{fontSize:11, color: '#243665',fontWeight: 'bold' }}>Read</Text>
                        </View> */}
                        <Image
                          source={require("../../images/delete2.png")}
                          style={{ width: 21, height: 21, marginLeft: 4  }}
                          resizeMode="contain"
                        />
                         <Text style={{fontSize:11,  color: 'red',fontWeight: 'bold' }}>{I18n.t("NotifItemDelete")}</Text>

                    </TouchableOpacity>
                   
                   :
                //    <TouchableOpacity onPress={() => this.markAsRead(this.props.idqra_notifications,this.props.QSO_GUID)} underlayColor="white">  
                        <View>
                        <Text style={{fontSize:10, color: '#243665',fontWeight: 'bold' }}>Read</Text>
                        </View>
                        

                    // </TouchableOpacity>
                    }

                

                    </View>

              </View>


         </View>
            
           
       
        )} 

 }

 
const styles = StyleSheet.create({
       faceImageStyle: {
      width: 53,
      height: 53,
      borderRadius: 25
       },
       mediaStyle:
       {
        width: 58,
        height: 58,
        borderRadius: 30
         },
    name:{
        fontSize: 12,
        marginLeft: 5,
        padding: 2,
        fontWeight: 'bold',        
        color: 'orange'        
    },
    status:{
      fontSize: 14,
      marginTop: 2,
      textAlign: 'right',
     // padding: 2,
     // fontWeight: 'bold',        
      color: 'grey'        
  },
  inapropiate:{
    fontSize: 14,
    marginTop: 2,
    textAlign: 'right',
   // padding: 2,
   // fontWeight: 'bold',        
    color: 'red'        
}
  });





 const mapStateToProps = state => {
    return { jwtToken: state.sqso.jwtToken,
      qra: state.sqso.qra
    };
};


const mapDispatchToProps = {
    set_notification_read,
    manage_notifications
   }

export default connect(mapStateToProps, mapDispatchToProps)(NotifItem);