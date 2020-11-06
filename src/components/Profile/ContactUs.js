import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';

import {
    postContactUs
    
    
  } from "../../actions";
  import {
    hasAPIConnection } from "../../helper";
  import VariosModales from "../Qso/VariosModales";


class ContactUs extends React.PureComponent {


  constructor(props) {
    super(props);
    
    this.state = {
       waitingModal: true,
       contactusSent: false,
       nointernet: false
      
    };
  }

  componentDidMount() {
    
  

     }

  send_email = async (from,message) => {
    if (await hasAPIConnection()) {  
        console.log('envia email');
          console.log('mensaje escrito: ' + message);
          this.setState({waitingModal: false});
          

       this.props.postContactUs(from,message,this.props.jwtToken);
       setTimeout(() => {
                  
        console.log('prevideoreward en true con delay de 50');
        this.setState({ contactusSent: true });
        
      }
      , 50);
    }else
    {
      this.setState({waitingModal: false});
      setTimeout(() => {
                  
        console.log('nointernet en true con delay de 50');
        this.setState({ nointernet: true });
        
      }
      , 50);

    }

      
  }

  closecontactus =  () => {
    console.log('close this component contactus');

    // close this component
    this.props.closecontactus();
}

closeVariosModales = (param) => {
  
  // this.setState({ nointernet: false});

    this.closecontactus();
  };

    
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

{(this.state.contactusSent) && 
  <VariosModales
              show={this.state.contactusSent}
              modalType="contactusSent"
              message=""
            //  sendemail={this.send_email.bind()}
              closecontact={this.closecontactus.bind()}
            /> 
 }

{(this.state.nointernet) && 
          <VariosModales
            show={this.state.nointernet}
            modalType="nointernet"
            closeInternetModal={this.closeVariosModales.bind()}
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