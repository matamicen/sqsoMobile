import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, TouchableOpacity, Dimensions,
    Linking  } from 'react-native';
import { connect } from 'react-redux';
import {  set_notification_read, manage_notifications } from '../../actions';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';

class NotifItem extends Component {

    constructor(props) {
        super(props);

        this.width = Dimensions.get('window').width; //full width
        this.height = Dimensions.get('window').height; //full height
        
        this.state = {
          people: [],
          errorMessage: "",
          isFetching: true
        };
      }

  

   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }

  
      onPressItem = (idqra_notifications, urlnotif) => {
       console.log('presiono notif:' + idqra_notifications+ ' URL:' + urlnotif ) ;

    //    let url = 'http://d3cevjpdxmn966.cloudfront.net/qso/'+urlnotif;
if (urlnotif!=null)
    {
       this.props.set_notification_read(idqra_notifications,this.props.jwtToken);
       this.props.manage_notifications('SET_READ_URL',idqra_notifications);

       Linking.canOpenURL(urlnotif).then(supported => {
        if (!supported) {
          console.log('Can\'t handle url: ' + urlnotif);
        } else {
          return Linking.openURL(urlnotif);
        }
      }).catch(err => console.error('An error occurred', err));
    }
    else
     console.log('la notificacion no viene con URL');
    
    }


    markAsRead = (idqra_notifications, urlnotif) => {
        console.log('presiono notif:' + idqra_notifications+ ' URL:' + urlnotif ) ;
        // let url = 'http://d3cevjpdxmn966.cloudfront.net/qso/'+urlnotif;
 
        this.props.set_notification_read(idqra_notifications,this.props.jwtToken);
        this.props.manage_notifications('SET_READ',idqra_notifications);
 
    //     Linking.canOpenURL(url).then(supported => {
    //      if (!supported) {
    //        console.log('Can\'t handle url: ' + url);
    //      } else {
    //        return Linking.openURL(url);
    //      }
    //    }).catch(err => console.error('An error occurred', err));
     
     }


    render() { console.log("RENDER NotifItem");
  
           
           
                           
              
        return( <View style={{ flex: 1, backgroundColor: this.props.read===null ? 'white' : '#DCDCDC' }}>
               
               <View style={{flex: 1, flexDirection: 'row', marginTop: 9, borderBottomWidth: 1,
                borderBottomColor: '#D3D3D3' }}>

                <View style={{flex: 0.19, marginLeft: 6}}>
                 {this.props.avatar_pic!==null ?
                       <Image
                    style={styles.faceImageStyle}
                    resizeMethod="resize"
                    source={{ uri: this.props.avatar_pic }}
                      /> 

                      :
                      <Image source={require('../../images/emptyprofile.png')} style={styles.faceImageStyle}/> 
                      }
                      <Text style={{fontSize:9, marginLeft: 5, color: 'orange',fontWeight: 'bold' }} > {this.props.QRA} </Text>

                </View>
                      
                      
                    
                    
                





                    <View  style={{flex: 0.66 }}>

                    <TouchableOpacity onPress={() => this.onPressItem(this.props.idqra_activity,this.props.url)} underlayColor="white">  
                        {/* <Text>{this.props.QSO_GUID} - id notif: {this.props.idqra_notifications} </Text> */}
                        <Text>{this.props.message}</Text>
                    {/* {(this.props.read===null) ? <Text>ES null</Text> : <Text>NO es null</Text> } */}
                     </TouchableOpacity>
                             

                    </View>



                    <View  style={{flex: 0.15, marginRight: 7, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>

                   {this.props.read===null ? 
                    // <TouchableOpacity onPress={() => this.markAsRead(this.props.idqra_notifications,this.props.QSO_GUID)} underlayColor="white">  
                    <TouchableOpacity onPress={() => this.markAsRead(this.props.idqra_activity,this.props.QSO_GUID)} underlayColor="white">  
                      <View>
                        <Text style={{fontSize:10, color: 'orange',fontWeight: 'bold' }}>Mark As</Text>
                        </View>
                        <View style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{fontSize:10, color: 'orange',fontWeight: 'bold' }}>Read</Text>
                        </View>

                    </TouchableOpacity>
                   
                   :
                //    <TouchableOpacity onPress={() => this.markAsRead(this.props.idqra_notifications,this.props.QSO_GUID)} underlayColor="white">  
                        <View>
                        <Text style={{fontSize:10, color: 'orange',fontWeight: 'bold' }}>Read</Text>
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
    return { jwtToken: state.sqso.jwtToken
    };
};


const mapDispatchToProps = {
    set_notification_read,
    manage_notifications
   }

export default connect(mapStateToProps, mapDispatchToProps)(NotifItem);