// import React, { Component } from 'react';
// import { Text, Image, View, Button, ActivityIndicator, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
// import { connect } from 'react-redux';
// import { NavigationActions } from 'react-navigation';
// //import Amplify, { Auth, API, Storage } from 'aws-amplify';
// //import awsconfig from '../../aws-exports';
// import { getUserInfo, setToken } from '../../actions';
// import SearchEnterQra from './SearchEnterQra';
// import { hasAPIConnection} from '../../helper';
// import VariosModales from '../Qso/VariosModales';
// import QraProfile from './../Qso/QraProfile';


// //Amplify.configure(awsconfig);

// class SearchHeader extends Component {

//     constructor(props) {
//         super(props);

  

//         this.state = {
         
//           nointernet: false
//         }
//       }


// //   async componentDidMount() {
// //     console.log("component Did Mount Search");
 
// refresh = async () => {
//     if (await hasAPIConnection())
//      this.props.getUserInfo(this.props.jwtToken);
//    else 
//      this.setState({nointernet: true});
//     }

// //  brokeToken = async () => {

// //   await this.props.setToken('eyJraWQiOiJVSUdDTWhSV0Qzb3g1Q0Q5K2xKc3pYQU9SallmOERhRDZhMjMybEN1TUlZPSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206Y291bnRyeSI6IkFyZ2VudGluYSIsInN1YiI6ImJiNmZjYzFjLTgwMGUtNDk1ZC1iNDhjLTlkYmZlN2E3OTZiNyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJiaXJ0aGRhdGUiOiIwNVwvMjVcLzIwMDEiLCJjdXN0b206bGFzdE5hbWUiOiJnaW5vYmlsaSIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX3l6bkJsc29UeCIsImNvZ25pdG86dXNlcm5hbWUiOiJMVTRGRkYiLCJhdWQiOiI1NWxoaWRnbmo3anRibzl2bjBycnEzYzBxYSIsImN1c3RvbTpmaXJzdE5hbWUiOiJtYW51IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1NDMwNjM0NjAsImV4cCI6MTU0MzA2NzA2MCwiaWF0IjoxNTQzMDYzNDYwLCJlbWFpbCI6Im1hdGFtaWNlbkBnbWFpbC5jb20ifQ.fHD6DRDGOaKCO8FjSXwiriIOSDtdjKzc7MGBwRam2FgirB8Nes_Ujj9Gnts1-GEyolGk9I_pD2CJnho2YEVpSCu-eDuM0mNzh4CnoQegvbQoeTnlyLuwK91j9cEPciVUZSPtygyg6ICJhziE1J89Wb32gF5vRla3qr4y_lVR0kYmIZST9ufThH4kF9GFigx2qfSTsIW0FEG_BEhG5A4p6ST518Jsh8iCFh1gFHFjWKHCUJ02BjFtbjte_K5N5xclBnjUl9haLsxyWkLb5oQQG8llJ7saD20Meh-xgqyw5tV4GlMbSP6pIPIovouhWfdW16Ni7P29wd5pdXay-XnK2z');
// //  }   


// //   }
// closeVariosModales = () => {
//     this.setState({nointernet: false}); 
   
//   }

//   openVariosModales = () => {
//     this.setState({nointernet: true}); 
   
//   }

 
   
//         render() { console.log("RENDER SearchHeader Screen" );

//         return   <View style={{flex: 1, flexDirection: 'column'}}>
            
                
//             <View style={{flex: 0.7,flexDirection: 'column'}}>
//               <QraProfile qra={this.props.qra} imageurl={this.props.sqsoprofilepicrefresh } />  
//               <SearchEnterQra openVariosModales={this.openVariosModales.bind(this)}/>
//             </View>

//             <View style={{flex: 0.3,flexDirection: 'column'}}>
//               <View style={{flexDirection: 'row', flex:1}}>
                
//                 <View style={{flex: 0.5}}>
//                     {(this.props.followingsselected) ?
//                         // <TouchableOpacity  >
//                             <Text style={styles.FollowingsText} >Following</Text>
//                         // </TouchableOpacity>
//                     :
//                     // <TouchableOpacity  style={{ flex:0.8}}  >
//                        <Text style={styles.FollowingsText} >Followers</Text>
//                     // </TouchableOpacity>

//                     }
                       
//                </View>        
//                {/* style={{ flex:0.2}} */}
//                <View style={{flex: 0.5, alignItems: 'flex-end', marginRight: 10 }}>
//                 <TouchableOpacity   onPress={ () => this.refresh()} >
//                         <Image source={require('../../images/reload.png')}  style={{width: 18, height: 18, marginTop: 3, marginLeft: 15 } } 
//                         resizeMode="contain" />  
//                             <Text style={styles.otherText} >Refresh</Text>
//                         </TouchableOpacity>

//                   {/* <TouchableOpacity   onPress={ () => this.brokeToken()} >
//                         <Image source={require('../../images/reload.png')}  style={{width: 18, height: 18, marginTop: 3, marginLeft: 15 } } 
//                         resizeMode="contain" />  
//                             <Text style={styles.otherText} >BrokeToken</Text>
//                         </TouchableOpacity>        */}
//                </View>
//              </View>

//             </View> 
//             {(this.state.nointernet) && 
//             <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
//             }
//             </View>

//         } 


// }



// const styles = StyleSheet.create({
// FollowingsText: {
//   //  textAlign: 'center',
//     color: 'orange',
//     fontSize: 22,
//     fontWeight: '700',
//      flex:0.8
//            },
//            otherText: {
//          //   textAlign: 'center',
//             color: 'grey',
//             fontSize: 12,
//             fontWeight: '400'
            
            
            
//                    }
//         })

//  const mapStateToProps = state => {
//     return {  
//              followings: state.sqso.currentQso.followings,
//              followers: state.sqso.currentQso.followers,
//              followingsselected: state.sqso.currentQso.followingsSelected,   
//              qra: state.sqso.qra,
//              rdsurl: state.sqso.urlRdsS3,
//              sqsoprofilepicrefresh: state.sqso.profilePicRefresh,
//              jwtToken: state.sqso.jwtToken
//     };
// };


// const mapDispatchToProps = {
//     getUserInfo,
//     setToken
  
//    }

// export default connect(mapStateToProps, mapDispatchToProps)(SearchHeader);