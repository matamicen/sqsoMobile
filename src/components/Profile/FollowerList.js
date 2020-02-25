import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, FlatList  } from 'react-native';
import { connect } from 'react-redux';
import Qra from './Qra';
import PropTypes from 'prop-types';

class FollowerList extends Component {

    constructor(props) {
        super(props);
        
         }

  

   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }

       LlamoAPI = () => {
      //  this.props.fetchPeople();
        //this.props.navigation.navigate('CameraScreen');
      }

  _keyExtractor = item => item.qra;


  

  _renderItem = ({ item }) => {
    const { qra, profilepic, avatarpic} = item;

    return (
      <View>
       <View style={{ paddingRight: 5, width: 88, paddingBottom: 5 }}>
        
        <Qra qra={qra} imageurl={avatarpic}   />
      
        </View>
       
      </View>
    );
  };


    render() { console.log("RENDER qso Followings FollowerList");
    console.log("Followings FollowerList:" +  JSON.stringify(this.props.followings));
           
                           
              
        return( <View style={{  flex: 1,  alignItems: 'center' }}>
             {(this.props.followingsselected) ?   
              <FlatList  style={styles.qralist }
               
                data={this.props.followings}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                numColumns={3} 
                />
             :
              <FlatList  style={styles.qralist }
                
              data={this.props.followers}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              numColumns={3} 
              />
             
             }
               
               
                

         </View>
            
           
       
        )} 

 }

 

 const styles = StyleSheet.create({
    
    qralist: {
        marginRight: 15 
        
      //  marginBottom: 70,
      // maxHeight: 150
     
     
    }
  });

  FollowerList.propTypes = {
    
  };



 const mapStateToProps = state => {
    return {
        followers: state.sqso.currentQso.followers,
        followings: state.sqso.currentQso.followings,
        followingsselected: state.sqso.currentQso.followingsSelected   
      };
};


const mapDispatchToProps = {
   
   }

export default connect(mapStateToProps, mapDispatchToProps)(FollowerList);