import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, FlatList  } from 'react-native';
import { connect } from 'react-redux';
import { fetchPeople } from '../../actions';
import Qra from './Qra';
//import PropTypes from 'prop-types';

class QsoQras extends Component {

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
    const { qra, url, following } = item;

    return (
      <View>
       <View style={{ paddingRight: 8 }}>
        <Qra qra={qra} imageurl={url} following={following}/>
        </View>
       
      </View>
    );
  };


    render() { console.log("RENDER qso QsoQras");
    console.log("QsoQRAS:" +  JSON.stringify(this.props.qsoqras));
           
                           
              
        return( <View >
               
              <FlatList  style={styles.qralist }
               
                data={this.props.qsoqras}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
               
                />

         </View>
            
           
       
        )} 

 }

 

 const styles = StyleSheet.create({
    
    qralist: {
        marginRight: 115 ,
        marginLeft: 10 
     
    }
  });

  // QsoQras.propTypes = {
    
  // };



 const mapStateToProps = state => {
    return {
        qsoqras: state.sqso.currentQso.qsoqras
        
      };
};


const mapDispatchToProps = {
   
   }

export default connect(mapStateToProps, mapDispatchToProps)(QsoQras);