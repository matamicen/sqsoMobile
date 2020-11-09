import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, FlatList  } from 'react-native';
import { connect } from 'react-redux';
import QraLike from './QraLike';
//import PropTypes from 'prop-types';
import I18n from '../../utils/i18n';

class LikesLink extends React.PureComponent {

    constructor(props) {
        super(props);
        
     

         }



   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }


  _keyExtractor = item => item.qra;

  _renderItem = ({ item }) => {
    const { qra, profilepic, avatarpic } = item;

    return (
      <View>
       <View style={{ paddingRight: 8 }}>
        <QraLike qra={qra} imageurl={avatarpic}  />
        </View>
       
      </View>
    );
  };


    render() { 
           
                           
              
        return( <View style={{marginTop: 20}}>
               {(this.props.sqsoqslscanerror===0) &&
               <View>
              <View style={{flexDirection: 'row'}}>
                    <Image source={require('../../images/like.png')} style={{height:27, width:27}}/> 
                    <Text style={{fontSize: 19, color:"grey", marginTop: 3  }} > {this.props.likes.length} {I18n.t("QSLSCANQR_LIKES")} </Text>
               </View > 
               { this.props.likes.length>0 &&
               <Text style={{color:"grey", marginTop: 10 }}> {I18n.t("QSLSCANQR_HAMSLIKETHIS")} {this.props.type} </Text>
                                     }
               </View>
              }
               
              <FlatList  style={styles.qralist }
               
                data={this.props.likes}
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
        marginLeft: 10,
        marginTop: 10 
     
    }
  });

  // QsoQras.propTypes = {
    
  // };



 const mapStateToProps = state => {
    return {
        sqsoqslscan: state.sqso.currentQso.qslscan.body.message,
     //   sqsoqslalreadyscan: state.sqso.qslAlreadyScan,
        sqsoqslscanerror: state.sqso.currentQso.qslscan.body.error,  
        qsotype: state.sqso.currentQso.qsotype,
        
      };
};


const mapDispatchToProps = {
   
   }

export default connect(mapStateToProps, mapDispatchToProps)(LikesLink);