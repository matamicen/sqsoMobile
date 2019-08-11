import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, FlatList  } from 'react-native';
import { connect } from 'react-redux';
import { fetchPeople, get_notifications } from '../../actions';
//import User from './User';
import PropTypes from 'prop-types';
import NotifItem from './NotifItem';

class NotificationList extends Component {

    constructor(props) {
        super(props);

        this.state = {
          isFetching: false
        };
        
         }

  

   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }

    
      
     onRefresh() {
        console.log('refreshing')
       // this.setState({ isFetching: true });
       this.props.get_notifications(this.props.jwtToken);

      }

  // _keyExtractor = item => item.idqra_notifications.toString();
    _keyExtractor = item => item.idqra_activity.toString();

  

  _renderItem = ({ item }) => {
    const { idqra_notifications, idqra_activity, qra_avatarpic, QSO_GUID, QRA, read, url, message} = item;

    return (
      <View>
       <View style={{marginLeft: 0 }}>
       <NotifItem  message={message} url={url} read={read} avatar_pic={qra_avatarpic} idqra_notifications={idqra_notifications} idqra_activity={idqra_activity} QSO_GUID={QSO_GUID} QRA={QRA} />
       
        {/* <Text style={{ color: 'orange', fontSize: 17}}>id notif: {idqra_notifications} </Text> */}
        </View>
       
      </View>
    );
  };


    render() { console.log("RENDER Notification List");
    console.log(JSON.stringify(this.props.notifications));
           
                           
              
        return( 
        <View style={{  flex: 1 }}>
           {(this.props.notifications.length>0) &&
              <FlatList  style={styles.qralist }
                
              data={this.props.notifications}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              extraData={this.props.unreadcounter}
              

              
              />
           }
             
             {/* } */}
               
               
                

         </View>
            
           
       
        )} 

 }

 

 const styles = StyleSheet.create({
    
    qralist: {
        marginRight: 0 
        
      //  marginBottom: 70,
      // maxHeight: 150
     
     
    }
  });

  NotificationList.propTypes = {
    
  };



 const mapStateToProps = state => {
    return {
        notifications: state.sqso.currentQso.notifications,
        jwtToken: state.sqso.jwtToken,
        unreadcounter: state.sqso.notificationsUnread

        
      };
};


const mapDispatchToProps = {
  get_notifications
   
   }

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);