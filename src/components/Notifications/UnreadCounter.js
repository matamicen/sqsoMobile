import React, { Component } from 'react';
import { Text, Image, View, Modal, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { } from '../../actions';





class UnreadCounter extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
         
        };
      }

  

   componentDidMount() {
    
     
     
       }

    

    render() { console.log("RENDER UnreadCounter");
       
  
              
        return( //<View >

         (this.props.unreadcounter!==0) ?
         <Text 
               style={{color: 'white',
                       position:'absolute',
                       top:1,
                       left:32,
                   //    margin: -1,
                       minWidth:18,
                        // height:18,
                       borderRadius:6,
                       overflow: 'hidden',
                        // alignItems: 'center',
                        // justifyContent: 'center',
                       backgroundColor: '#FF0000', 
                       fontWeight: 'bold',
                       
                       textAlign: "center",  
                       fontSize: 10 }}>{this.props.unreadcounter}</Text>
                       :
                       null
                      
        

       //  </View>
            
           
       
        )
      
      
      } 

 }





 const mapStateToProps = state => {
    return { 
             unreadcounter: state.sqso.notificationsUnread
    }
          
};


const mapDispatchToProps = {

   }

export default connect(mapStateToProps, mapDispatchToProps)(UnreadCounter);