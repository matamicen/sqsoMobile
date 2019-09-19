import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, Button, ActivityIndicator, TouchableOpacity, ScrollView, Modal,
   Platform, Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { getQslScan } from '../../actions';

import { getDateQslScan } from '../../helper';
import { hasAPIConnection } from '../../helper';
import VariosModales from '../Qso/VariosModales';




class BePremium extends Component {
//   static navigationOptions = {
//       tabBarLabel: 'Qsl Scan',

//       tabBarIcon: ({ tintColor }) => {
//         return (<Image
//             style={{ width: 28, height: 28  }}
//             source={require('../../images/qrcodescan.png')}/>);}

//   }

  constructor(props) {
    super(props);
    
    this.freeparam = ' ';
    

    this.state = {
   
      nointernet: false,
     
      
    };
  }

  componentDidMount() {
    
    //  this.props.fetchPeople();
    this.setState({nointernet: true}); 
   
     }

  navigate = () => {
    const navigateToScreen2 = NavigationActions.navigate({
      routeName:'Root'
     
    })

    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Root' })],
      });
   

    // The navigateToScreen2 action is dispatched and new navigation state will be calculated in basicNavigationReducer here ---> https://gist.github.com/shubhnik/b55602633aaeb5919f6f3c15552d1802
    this.props.navigation.dispatch(resetAction)
}

closeVariosModales = () => {
  this.setState({nointernet: false}); 
  if (this.freeparam==='qsoscreen')
   this.props.navigation.navigate("QsoScreen");
   else
  this.props.navigation.navigate("QslScanScreen");
}


 gotoQslScanScreen = async () => {

    this.props.navigation.navigate("QslScanScreen");

}
   
render() { console.log("RENDER BePremium SCREEN!" );
     const { params } = this.props.navigation.state;
     this.freeparam = params ? params.freeparam : null;
     
      
    
    console.log("BePremium parametros: "+JSON.stringify(this.freeparam) );




return   <View style={{flex: 1}}>
   
             
{(this.state.nointernet) && 
        <VariosModales show={this.state.nointernet} modalType={'bepremium'} feature={this.freeparam} closeInternetModal={this.closeVariosModales.bind()} />
} 
       
       
    </View>

} 

}


 const mapStateToProps = state => {
    return {  

        
     };
};


const mapDispatchToProps = {
    getQslScan
    
   }

export default connect(mapStateToProps, mapDispatchToProps)(BePremium);