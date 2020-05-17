import React, { Component } from 'react';
import { View, Platform, Text} from 'react-native';
import { connect } from 'react-redux';
import moment from "moment";


  


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


  
    
render() { console.log("Render Moment Ago" );
    

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