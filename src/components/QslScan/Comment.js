import React, { Component } from 'react';
import { Text, Image, View, Modal, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { QsoQraDelete, deleteQsoQra, followAdd, unfollow } from '../../actions';
import { getDate} from '../../helper';
import PropTypes from 'prop-types';



class Comment extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          people: [],
          errorMessage: "",
          isFetching: true,
          modaldeleteqra: false
        };
      }

  

   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }

      

            

    render() { console.log("RENDER QRA");
       
  
              
        return( <View style={{marginTop:10}}>

         

          {/* {this.props.imageurl!==null ? 

            <Image style={styles.faceImageStyle} source={{ uri: this.props.imageurl }}/>  
               :
            <Image source={require('../../images/emptyprofile.png')} style={styles.faceImageStyle}/> 
              
           } */}
               
      
         
         <View  style={{flexDirection: 'row'}} >
             <Text style={styles.name} >
                 {this.props.qra}
             </Text>

               <Text style={{color: 'grey',fontSize: 11, marginTop: 2, marginLeft: 4 }} >
                      on {this.props.datetime}
             </Text>
         </View>

            

              <Text style={{ marginTop: 2 }} >
                 {this.props.comment}
             </Text>


            
            

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
        fontSize: 14,
        marginLeft: 0,
       // padding: 2,
        fontWeight: 'bold',        
        color: 'orange'        
    },
    name2:{
      fontSize: 12,
      marginLeft: 11,
      padding: 2,
      fontWeight: 'bold',        
      color: 'orange'        
  }
  });

  Comment.propTypes = {
    imageurl: PropTypes.string,
    qra: PropTypes.string
  };



 const mapStateToProps = state => {
    return { }
};


const mapDispatchToProps = {
  QsoQraDelete,
  deleteQsoQra,
  followAdd,
  unfollow
   }

export default connect(mapStateToProps, mapDispatchToProps)(Comment);