import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, FlatList  } from 'react-native';
import { connect } from 'react-redux';
import { fetchPeople } from '../../actions';
import QraAddCallSign from './QraAddCallSign';
//import PropTypes from 'prop-types';

class QsoCallSigns extends Component {

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
        <QraAddCallSign qra={qra} imageurl={url} following={following}/>
        </View>
       
      </View>
    );
  };


    render() { console.log("RENDER qsocallsigns");
    console.log("qsocallsigns:" +  JSON.stringify(this.props.qsocallsigns));
           
                           
              
        return( <View >
               
              <FlatList  style={styles.qralist }
               
                data={this.props.qsocallsigns}
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
        // marginRight: 115 ,
         marginLeft: 10 
     
    }
  });

  // QsoQras.propTypes = {
    
  // };



 const mapStateToProps = state => {
    return {
        qsocallsigns: state.sqso.currentQso.qsocallsigns
        
      };
};


const mapDispatchToProps = {
   
   }

export default connect(mapStateToProps, mapDispatchToProps)(QsoCallSigns);