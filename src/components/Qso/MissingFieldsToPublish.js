import React, { Component } from 'react';
import { Text, Image, View, Modal, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import I18n from '../../utils/i18n';


// Auth.configure(awsconfig);

class MissingFieldsToPublish extends Component {

    constructor(props) {
        super(props);
        
      
      }

  

   componentDidMount = async () => {
    
  
     
       }

       
   

    render() { console.log("RENDER MissingFields");
       
  
              
        return( <View> 

         

             <Modal visible={true} position= {'top'} transparent={true} animationType={"slide"} onRequestClose={() => console.log('Close was requested')}>
             {/* <KeyboardAvoidingView behavior="padding"  > */}
              <View style={{ 
                   padding:5, 
                  backgroundColor : 'rgba(36,54,101,0.93)',
                   marginTop: 200,
                   left: 10,
                   right: 10,
                 //  width: 170,
                   width: 340,
                   height: 150,
               
                   paddingVertical: 5,
                 
                   borderRadius: 12                       
                    }}>

                     
                    <View style={{ flex:1, alignItems: "center", marginTop:3 }}>
                 
                     <View style={{ flex:0.8, justifyContent: "center", alignItems: "center" }}>
                       {/* <Text style={{ color: 'red', fontSize: 18, alignItems: "center"}}>{I18n.t("DeletePostWarning")}</Text> */}
                        <Text style={{ color: 'white', fontSize: 16}}>{this.props.message}</Text>
                      </View>
            
       


                        <View style={{ flex:0.2, flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                         
                              <TouchableOpacity onPress={() => this.props.closeMissingFields()} >
                            <Text style={{ color: '#c0c0c0', fontSize: 16}}>{I18n.t("MISSCLOSE")}</Text>
                              </TouchableOpacity>
      
                       </View>   
                    </View>
                    
              </View>
                {/* </KeyboardAvoidingView > */}
                   
                      </Modal>
                 

            

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
       // color: '#333333'  
        color: '#243665'      
    },
    name2:{
      fontSize: 12,
    //   marginLeft: 3,
      // padding: 2,
      fontWeight: 'bold',        
     // color: 'orange'    
      color: '#8BD8BD'        
  }
  });



  

 const mapStateToProps = state => {
    return {
    }
         
};


const mapDispatchToProps = {


 
   }

export default connect(mapStateToProps, mapDispatchToProps)(MissingFieldsToPublish);