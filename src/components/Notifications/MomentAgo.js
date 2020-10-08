import React, { Component } from 'react';
import { View, Platform, Text} from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../utils/i18n';
import moment from "moment";

import 'moment/locale/es';
// import 'moment/locale/pt';

if (I18n.locale.substring(0, 2) ==='es')
     moment.locale('es');
 if (I18n.locale.substring(0, 2) ==='en')
     moment.locale('en');
  //   Anda bien con el protugues, lo comento porque por ahora no implementamos Brasil
    //  if (I18n.locale.substring(0, 2) ==='pt')
    //  moment.locale('pt');
    




class MomentAgo extends Component {


  constructor(props) {
    super(props);
    
    
    this.state = {
       
       ago: moment(this.props.date).fromNow()
      
    };
  }

 

  
  componentDidMount() {
    
    
    //  this.props.fetchPeople();
    this.timerID = setInterval(
      () => this.tick(),
      60000
    );
   
     }
     componentWillUnmount() {
      clearInterval(this.timerID);
    }

    tick() {
      this.setState({
        ago: moment(this.props.date).fromNow()
      });
    }


  
    
render() { 
    

return ( this.state.ago)
    //  {this.state.ago}
 
} 

}


 const mapStateToProps = state => {
    return {  
        jwtToken: state.sqso.jwtToken
        
     };
};


const mapDispatchToProps = {
    

   }

export default connect(mapStateToProps, mapDispatchToProps)(MomentAgo);