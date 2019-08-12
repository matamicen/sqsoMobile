import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, TouchableOpacity,  StyleSheet, Platform,
  Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
//import Amplify, { Auth, API, Storage } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { getUserInfo, followersAlreadyCalled } from '../../actions';
 import NotificationList from './NotificationList';
 import UnreadCounter from './UnreadCounter';
// import SearchHeader from './SearchHeader';


//Amplify.configure(awsconfig);

class Notification extends Component {
  static navigationOptions = {
      tabBarLabel: ' ',  
        
      tabBarIcon: ({ tintColor }) => {
        return (<View style={{width: 70, height: 20,marginTop: (Platform.OS==='ios') ? 19 : 7}}>
           
        <Image
            style={{ width: 28, height: 28, marginLeft: 17 }}
            source={require('../../images/notifications.png')}/>
            <Text style={{fontSize:9, marginTop: 3}}>NOTIFICATIONS</Text>
            <UnreadCounter />
           
            </View>
            
            );}

      // tabBarIcon: ({ tintColor }) => {
      //   return (<Image
      //       style={{ width: 28, height: 28  }}
      //       source={require('../../images/notifications.png')}/>);}


  }

  constructor(props) {
    super(props);

      this.width = Dimensions.get('window').width; //full width
      this.height = Dimensions.get('window').height; //full height
          
   
  }

  async componentDidMount() {
    console.log("component Did Mount Notifications");
   


  }

 
   
render() { console.log("RENDER qso Screen" );

return   <View style={{flex: 1}}>
       
         
       {/* <View style={{flex: 1, marginTop: 30, marginLeft: 10}}> */}
       <View style={{flex: 0.06, marginTop: Platform.OS === 'ios' ? 13 : 13, marginLeft: 6}}>
          {/* <SearchHeader />  */}
          <Text style={styles.FollowingsText} >Notifications</Text>
          </View>   

              
       {/* <View style={{flex: 4, width:450, marginBottom: 10}}> width:this.width */}
       <View style={{flex: 0.94,  marginBottom: 5}}>
       
     
       <NotificationList />
      
       </View>
      
      




           </View>

} 

}

const styles = StyleSheet.create({
  FollowingsText: {
    //  textAlign: 'center',
      color: 'orange',
      fontSize: 22,
      fontWeight: '700',
       flex:0.8
             },
             otherText: {
           //   textAlign: 'center',
              color: 'grey',
              fontSize: 12,
              fontWeight: '400'
              
              
              
                     }
          })
  


 const mapStateToProps = state => {
    return {  
      followersalreadycalled: state.sqso.currentQso.followersAlreadyCalled,  
      notifications: state.sqso.currentQso.notifications,
    };
};


const mapDispatchToProps = {
  getUserInfo,
  followersAlreadyCalled
   }

export default connect(mapStateToProps, mapDispatchToProps)(Notification);