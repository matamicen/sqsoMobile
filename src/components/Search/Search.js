import React, { Component } from 'react';
import { Text, Image, View, Button, StyleSheet, Platform, Dimensions, TextInput, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
//import Amplify, { Auth, API, Storage } from 'aws-amplify';
//import awsconfig from '../../aws-exports';
//import { getUserInfo, followersAlreadyCalled } from '../../actions';
import {  followingsSelected, getQrasFromSearch, insertQraSearched, getUserInfo, refreshFollowings,
  searchQrasLocal} from '../../actions';
import { hasAPIConnection} from '../../helper';
import VariosModales from '../Qso/VariosModales';
import User from './User';
import I18n from '../../utils/i18n';





class Search extends Component {
  static navigationOptions = {
      tabBarLabel: ' ',  

      tabBarIcon: ({ tintColor }) => {
        // return (<View style={{width: 55, height: 20,marginTop: (Platform.OS==='ios') ? 5 : 5,marginLeft:15, backgroundColor:'green'}}>
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
            // style={{ width: 28, height: 28, marginLeft: 13 }}
            style={{ width: 28, height: 28, marginLeft: 10, marginTop: (Platform.OS==='ios') ? 19 : 26 }}
            source={require('../../images/search.png')}/>
             <Text style={{fontSize:9, marginTop: 3, marginLeft: 10}}>{I18n.t("SearchTitle")}</Text>
            {/* <Text style={{fontSize:9, marginTop: 3.5, marginLeft: 9}}>{I18n.t("SearchTitle")}</Text> */}
            </View>
            
            );}

        

      // tabBarIcon: ({ tintColor }) => {
      //   return (<Image
      //       style={{ width: 28, height: 28  }}
      //       source={require('../../images/search.png')}/>);}




  }

  constructor(props) {
    super(props);

      this.width = Dimensions.get('window').width; //full width
      this.height = Dimensions.get('window').height; //full height
      
      
      this.state = {
   
       qra: '',
       addfollowersModal: false,
       actindicatorfecthQras: false,
       nointernet: false,
       searching: false    
      };
      
   
  }




  async componentDidMount() {
    console.log("component Did Mount Search");
    if (!this.props.followersalreadycalled)
      {       console.log('TOKEN did Search: ' + this.props.jwtToken);
      
              // this.props.getUserInfo(this.props.jwtToken);
              // this.props.followersAlreadyCalled(true);
      }


  }

  onChange = async (text) => {
   
    this.setState({qra: text});
   if (await hasAPIConnection())
   { 
     // this.countLenght = this.countLenght + 1;
       long = text.length.toString();
       long2 = text.length;
       if (long2===0)  this.apretoSearch = false;
      console.log('escribe:'+long);
      if (long2===4 && !this.entro) {
        // this.setState({actindicatorfecthQras: true})
        console.log("es igual a 4, llama api search");
        this.entro = true;
        this.props.getQrasFromSearch(this.props.qra,text.toUpperCase(),this.props.jwtToken);
        console.log("NO DA BOLA AWAIT");
        this.setState({searching: true});
        setTimeout(() => {      
          this.setState({searching: false});
         }
        , 2000);

        // this.setState({actindicatorfecthQras: false})
      }else this.props.searchQrasLocal(text.toUpperCase(),long2);

      if (long2>4) {
        this.setState({searching: true});
        setTimeout(() => {      
          this.setState({searching: false});
         }
        , 500);

        this.props.searchQrasLocal(text.toUpperCase(),long2);
      }
       

      if (long2<4) { 
        this.entro = false;
        // this.props.searchQrasLocal('',long2);

      }
    }else 
    {
      this.setState({addfollowersModal: false});
      this.setState({nointernet: true}); 
     // this.props.openVariosModales();
      
    }
         
    
    }

    closeVariosModales = () => {
      this.setState({nointernet: false}); 
     
    }

    _keyExtractor = item => item.qra;


      _renderItem = ({ item }) => {
        const { qra, profilepic, following, avatarpic } = item;
    
        return (
          <View>
           <View style={{ paddingRight: 8 }}>
            <User name={qra} imageurl={avatarpic} following={following}  />
           
            </View>
           
          </View>
        );
      };

 
   
render() { console.log("RENDER qso Screen" );

return   <View style={{flex: 1,  backgroundColor: '#fff'}}>
      
      
          <View style={{flex: 0.08, flexDirection: 'row', marginTop: Platform.OS === 'ios' ? 13 : 13, marginLeft: 6}}>
                {/* <SearchHeader />  */}
                <View  style={{flex: 0.2}}>
                     {/* <TouchableOpacity  style={{ marginTop: 5}} onPress={ () => this.switch()} >
                                <Text style={styles.otherText} >Switch to Followers</Text>
                     </TouchableOpacity>  */}

               </View>

                <View style={styles.searchSection}>
                  <Image source={require('../../images/search.png')}  style={{width: 18, height: 18, marginLeft: 6 } } 
                              resizeMode="contain" />  
                {/* <Icon style={styles.searchIcon} name="ios-search" size={20} color="#000"/> */}
                <TextInput
                    style={styles.input}
                    placeholder={I18n.t("SearchSearchCallsign")}
                    onChangeText={(text) => this.onChange(text)}
                 //   onChangeText={(text) => {this.setState({text})}}
                    value={this.state.qra}
                    underlineColorAndroid="transparent"
                    keyboardType={Platform.OS==='android' ? 'visible-password' : 'default'}
                />
                
                </View>  
                <View  style={{flex: 0.2}}>
                     {/* <TouchableOpacity  style={{ marginTop: 5}} onPress={ () => this.switch()} >
                                <Text style={styles.otherText} >Switch to Followers</Text>
                     </TouchableOpacity>  */}
            
            </View>


       </View>      
     
        {!this.state.searching ? 
       <View style={{flex: 0.06, alignItems:"center"}}>
         <Text style={{fontSize: 12, color:"grey"}}>{I18n.t("SearchWeStartToSearch")}</Text>
         <Text style={{fontSize: 12, color:"grey"}}>{I18n.t("SearchAfter4Digit")}</Text>
       </View>
       :
       <View style={{flex: 0.06, alignItems:"center"}}>
       <Text style={{fontSize: 13, color:"grey"}}>{I18n.t("SearchSearching")}</Text>
      
     </View>
     }


       <View style={{flex: 0.86, width:this.width-25, marginBottom: 0}}>
       {/* <FollowerList />  */}
       {/* , height: 400 */}
            <View style={{flex:1, marginLeft: 15, width: 300, marginBottom: 10, marginTop: 10}}>

            <FlatList  style={styles.qralist }

            data={this.props.qrashow}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            />
            </View>
      
       </View>
       {(this.state.nointernet) && 
       <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
       }
      
       {/* </View> */}

           </View>

} 

}

const styles = StyleSheet.create({
 
  searchSection: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    fontSize: 12
   // backgroundColor: 'grey',
},
searchIcon: {
    padding: 10,
},
input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderRadius: 22,
    paddingLeft: 5,
     backgroundColor: '#f5f5f5',
   // backgroundColor: 'grey',
    marginRight: 10,
    marginTop:2,
    marginBottom: 3,
    fontSize:16,
 
   
    color: '#424242',
},

});



 const mapStateToProps = state => {
    return {  
      followersalreadycalled: state.sqso.currentQso.followersAlreadyCalled,  
      jwtToken: state.sqso.jwtToken,
      qrashow: state.sqso.currentQso.qraShow,
      qra: state.sqso.qra
    };
};


const mapDispatchToProps = {
  getQrasFromSearch,
  searchQrasLocal

   }

export default connect(mapStateToProps, mapDispatchToProps)(Search);