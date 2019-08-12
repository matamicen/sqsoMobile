import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, FlatList  } from 'react-native';
import { connect } from 'react-redux';
// import Qra from './Qra';
import Comment from './Comment';
import { getDateQslScan } from '../../helper';
//import PropTypes from 'prop-types';

class CommentsLink extends Component {

    constructor(props) {
        super(props);
        
     

         }



   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }


  _keyExtractor = item => item.datetime;
//   _keyExtractor = (item, index) => index;


  _renderItem = ({ item }) => {
    const { qra, datetime, comment } = item;
    fecha = getDateQslScan(datetime);


    return (
      <View>
       <View style={{ paddingRight: 8 }}>
        <Comment qra={qra} datetime={fecha} comment={comment}/>
        </View>
       
      </View>
    );
  };


    render() { 
           
                           
              
        return( <View style={{marginTop: 20}}>
               {(this.props.sqsoqslscanerror===0) &&
               <View>
                    { this.props.comments.length>0 &&
                    <View style={{flexDirection: 'row'}}>
                            <Image source={require('../../images/comment.png')} style={{height:23, width:23}}/> 
                            <Text style={{fontSize: 19, color:"grey"  }} > {this.props.comments.length} Comments </Text>
                    </View > }
              
               </View>
              }
               
              <FlatList  style={styles.qralist }
               
                data={this.props.comments}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
               
               
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
       // sqsoqslalreadyscan: state.sqso.qslAlreadyScan,
        sqsoqslscanerror: state.sqso.currentQso.qslscan.body.error,  
        qsotype: state.sqso.currentQso.qsotype,
        
      };
};


const mapDispatchToProps = {
   
   }

export default connect(mapStateToProps, mapDispatchToProps)(CommentsLink);