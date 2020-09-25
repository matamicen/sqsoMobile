import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, TouchableOpacity, Linking  } from 'react-native';
import { connect } from 'react-redux';
import { followAdd, unfollow, refreshFollowings } from '../../actions';
import PropTypes from 'prop-types';
import { getDate, hasAPIConnection} from '../../helper';
import VariosModales from '../Qso/VariosModales';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import I18n from '../../utils/i18n';


class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
          nointernet: false
        };
       
      }

      onPressAvatar = async (qra) => {
        console.log('pepe')
        urlnotif = 'https://www.superqso.com/'+qra;
        Linking.canOpenURL(urlnotif).then(supported => {
          if (!supported) {
            console.log('Can\'t handle url: ' + urlnotif);
          } else {
            // if(__DEV__)
            //   analytics().logEvent("OPENPROFILEsearch_DEV", {"QRA": this.props.qraLoggedIn});
            // else
            if(!__DEV__)
              analytics().logEvent("OPENPROFILEsearch_PRD", {"QRA": this.props.qraLoggedIn});
           
            return Linking.openURL(urlnotif);
          
          }
        }).catch(err => {
                console.error('An error occurred', err)
                crashlytics().setUserId(this.props.qra);
                crashlytics().log('error: ' + JSON.stringify(err)) ;
                if(__DEV__)
                crashlytics().recordError(new Error('Linking.OpenSearch_DEV'));
                else
                crashlytics().recordError(new Error('Linking.OpenSearch_PRD'));
      
      
              });
            }

   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }

       LlamoAPI = () => {
      //  this.props.fetchPeople();
        //this.props.navigation.navigate('CameraScreen');
      }

    //   onPressItem = (fileName2, description, fileaux, sqlrdsid, size, type, rdsUrlS3, date) => {
    //    console.log('presiono:' + fileName2+ ' ' + description + ' ' + fileaux + ' ' + sqlrdsid + ' ' + size + ' ' + type + ' '+rdsUrlS3) ;
    //    this.props.uploadMediaToS3(fileName2, fileaux, sqlrdsid, description, size, type, rdsUrlS3, date);
    // }
    follow = async (qra,follow,qra_avatar) => {
      if (await hasAPIConnection())
        {     
            date = getDate();
            if (follow==="FALSE")
              await this.props.followAdd(this.props.qraLoggedIn,qra,date,this.props.jwtToken,qra_avatar);
            else
              await this.props.unfollow(this.props.qraLoggedIn,qra,this.props.jwtToken); 
            this.props.refreshFollowings(true);
        }
        else
        {
          this.setState({nointernet: true});
        }

    }

    closeVariosModales = () => {
      this.setState({nointernet: false}); 
      
    }

    render() { console.log("RENDER USER FOLLOWERS");
  
           
                           
              
        return( <View >
               
               <View style={{ marginTop: 6}}>
               <View style={{flexDirection: 'row'}}>  
               { (this.props.imageurl===null) ?
                 <TouchableOpacity style={{}} onPress={() => this.onPressAvatar(this.props.name) }>
                  <Image source={require('../../images/emptyprofile.png')} style={styles.faceImageStyle}/> 
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={{ }} onPress={() => this.onPressAvatar(this.props.name) }>
                     <Image
                    style={styles.faceImageStyle}
                    resizeMethod="resize"
                    source={{ uri: this.props.imageurl }}
                      />
                            </TouchableOpacity>
                    }
{/* this.props.qraLoggedIn===this.props.name */}
                     {this.props.following==="FALSE" &&   
                  this.props.qraLoggedIn!==this.props.name &&
                     <TouchableOpacity style={{ marginTop: 15, marginLeft: 20}} onPress={() => this.follow(this.props.name,this.props.following,this.props.imageurl)} >
                       <Text style={{ color: 'grey', fontSize: 17}}>{I18n.t("UserFollow")} </Text>
                      </TouchableOpacity>
                     
                       }

                       {this.props.following==="TRUE" && 
                           this.props.qraLoggedIn!==this.props.name &&

                        <TouchableOpacity style={{ marginTop: 15, marginLeft: 20 }} onPress={() => this.follow(this.props.name,this.props.following,this.props.imageurl)} >
                          <Text style={{ color: 'grey', fontSize: 17}}>{I18n.t("UserUnFollow")} </Text>
                        </TouchableOpacity>    
                        } 


                        
                        {  this.props.qraLoggedIn===this.props.name &&
                          <Text style={{ marginTop: 15, marginLeft: 20, color: 'grey', fontSize: 17}}>You </Text>                   
                        } 

                        </View>
                        <TouchableOpacity style={{}} onPress={() => this.onPressAvatar(this.props.name) }>
                      <Text style={styles.name2} >
                                  {this.props.name}
                          </Text>
                          </TouchableOpacity>
                        
                         {/* {this.props.idqra_followed} */}
                

                    <View  style={{marginLeft: 25 }}>

                      {/* <Progress.Bar
                          style={{marginTop: 27, height: 6, width: 230 }}
                          width={230}
                          unfilledColor="lightgrey"
                          borderRadius={0}
           
                          color="lightgreen"
                          borderWidth={0}
                          progress={this.props.progress}
                       
                        /> */}

                        
                        
              

                    </View>

              </View>
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
        color: 'orange'  
      
       
    },
    name2:{
        fontSize: 12,
        marginLeft: 10,
        padding: 2,
        fontWeight: 'bold',        
     //   color: 'orange' 
        color: '#243665'       
              
    },
    status:{
      fontSize: 16,
      marginTop: 2,
      textAlign: 'right',
     // padding: 2,
     // fontWeight: 'bold',        
      color: 'grey'        
  }
  });

  User.propTypes = {
    imageurl: PropTypes.string,
    qra: PropTypes.string
  };



 const mapStateToProps = state => {
    return {  jwtToken: state.sqso.jwtToken,
              qraLoggedIn: state.sqso.qra
    };
};


const mapDispatchToProps = {
  followAdd,
   unfollow,
   refreshFollowings
   }

export default connect(mapStateToProps, mapDispatchToProps)(User);