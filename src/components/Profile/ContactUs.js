import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';

import {
    postContactUs
    
    
  } from "../../actions";
  import VariosModales from "../Qso/VariosModales";


class ContactUs extends Component {


  constructor(props) {
    super(props);
    
    this.state = {
       waitingModal: true
      
    };
  }

  componentDidMount() {
    
  

     }

  send_email = async (from,message) => {
       console.log('envia email');
       console.log('mensaje escrito: ' + message);
       

       this.props.postContactUs(from,message,this.props.jwtToken);
      
  }

  closecontactus =  () => {
    console.log('close this component contactus');

    // close this component
    this.props.closecontactus();
}

    
render() { console.log("RENDER contactUs SCREEN!" );
    

return <View>
{(this.state.waitingModal) && 
 <VariosModales
             show={this.state.waitingModal}
             modalType="contactus"
             message=""
             sendemail={this.send_email.bind()}
             closecontact={this.closecontactus.bind()}
           /> 
}

</View>; 
} 

}


 const mapStateToProps = state => {
    return {  
        jwtToken: state.sqso.jwtToken
        
     };
};


const mapDispatchToProps = {
    
    postContactUs
   }

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);