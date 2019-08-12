import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, Modal, StyleSheet, TextInput,
     TouchableOpacity, FlatList, Dimensions } from 'react-native';
     import {Keyboard} from 'react-native'
     import { connect } from 'react-redux';
     import User from './User';
import {  followingsSelected, getQrasFromSearch, insertQraSearched, getUserInfo, refreshFollowings,
          searchQrasLocal} from '../../actions';
import { hasAPIConnection} from '../../helper';



class SearchEnterQra extends Component {

    constructor(props) {
        super(props);
        countLenght = 0;
        entro = false;
        apretoSearch = false;
        this.width = Dimensions.get('window').width; //full width
        this.height = Dimensions.get('window').height; //full height
        
        this.state = {
       //   pickerSelection: 'Choose Band',
         // pickerDisplayed: false
         qra: '',
         addfollowersModal: false,
         actindicatorfecthQras: false      
        };
      }

    componentDidMount() {
 
       }

       switch = () => {
         this.props.followingsSelected(!this.props.followingsselected);
      
       }

       addFollowers = async () => {
        // if (this.props.refreshfollowings){
        //   // esto chequea si el usaurio hizo algun follow o unfollow actualiza la lista
        //   this.props.getUserInfo();
        //   this.props.refreshFollowings(false);
        // } 
        if (await hasAPIConnection())
        {
         qrasearchedvacia = [];
        this.props.insertQraSearched(qrasearchedvacia);
        this.setState({qra: ''});
        this.setState({addfollowersModal: !this.state.addfollowersModal});
        }
        else 
        { console.log('no hay internet searchenterqra');
          // this.setState({nointernet: true});
          // this.setState({addfollowersModal: !this.state.addfollowersModal});
          this.props.openVariosModales();
        }
      }

      closeAddFollowers = async () => {
       
        this.setState({addfollowersModal: false});

        if (await hasAPIConnection()===false) 
                    this.props.openVariosModales();

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
          this.props.getQrasFromSearch(text.toUpperCase(),this.props.jwtToken);
          console.log("NO DA BOLA AWAIT");
          // this.setState({actindicatorfecthQras: false})
        }else this.props.searchQrasLocal(text.toUpperCase(),long2);

        if (long2>4) this.props.searchQrasLocal(text.toUpperCase(),long2);
         

        if (long2<4) { 
          this.entro = false;
          // this.props.searchQrasLocal('',long2);

        }
      }else 
      {
        this.setState({addfollowersModal: false});
        this.props.openVariosModales();
        
      }
           
      
      }

      searchQras = async () => {
        Keyboard.dismiss();
        // this.setState({actindicatorfecthQras: true})
        // this.entro = true;
        // await this.props.getQrasFromSearch(this.state.qra.toUpperCase());
        // this.setState({actindicatorfecthQras: false});
        // this.apretoSearch = true;

      }
     

    render() { console.log("RENDER Enter QRAtoSearch" );
  //  console.log(this.props.qrashow)

    
              
              // <View >          
        
              return  <View style={{flexDirection: 'row', flex:1}}> 
               <View style={{ flexDirection: 'row', flex: 0.5}}>
               {(this.props.followingsselected) ?
                      <TouchableOpacity  style={{ marginTop: 5}} onPress={ () => this.switch()} >
                                <Text style={styles.otherText} >Switch to Followers</Text>
                            </TouchableOpacity>     

                    :     
                      <TouchableOpacity  style={{ marginTop: 5}} onPress={ () => this.switch()} >
                                <Text style={styles.otherText} >Switch to Followings</Text>
                            </TouchableOpacity>    
                        
             }
              
                   {/* <TouchableOpacity  onPress={ () => this.addFollowers() }>
                        <Image source={require('../../images/search.png')}  style={{width: 28, height: 28, marginTop: 7 } } 
                        resizeMode="contain" /> 
                        </TouchableOpacity>  */}
                </View>
              <View style={{flex: 0.5, alignItems: 'flex-end', marginRight: 10}}>
              <TouchableOpacity  onPress={ () => this.addFollowers() }>
                   <Text style={{height: 40,  fontSize: 16, marginTop: 5, color: 'grey'}}>
                      Add QRAs to Follow
                    </Text>
              </TouchableOpacity> 
              </View>
        {/* </View> */}

  {/* style={{height: 10, width: 10}} */}
    <Modal  visible ={this.state.addfollowersModal} animationType={"slide"} transparent={true} onRequestClose={() => console.log('Close was requested')}>
        <View style={{ //margin:20,
                       //  padding:20, 
                        backgroundColor: 'rgba(0,0,0,0.85)',
              //   backgroundColor:  '#292c40',
                        // bottom: 300,
                      //   top: 15,
                      marginTop: 50,
                      marginBottom: 200,
                      marginLeft: 30,
                      marginRight: 45,
                     //    width: 330,
                       //  height: 120,
                         left: 5,
                         right: 5,
                    //     position: 'absolute',
                    //     alignItems: 'center',
                         borderRadius: 12,
                     //         flex: 1              
                          }}>
                          
                 
                
                {/* <View style={{ flexDirection: 'row', flex: 0.15, marginLeft: 15, marginTop: 5 }}> */}
                <View style={{flexDirection: 'row', marginLeft: 15, marginTop: 5 }}>

              

                      <TextInput style={{height: 40, width:90, fontSize: 16, marginTop: 8, color: 'white'}}
                    placeholder="search Qra" placeholderTextColor="white" value={this.state.qra}
                    onChangeText={(text) => this.onChange(text)}  
                    
                    />
                  
                   <TouchableOpacity  onPress={ () => this.searchQras() }>
                        <Image source={require('../../images/search.png')}  style={{width: 32, height: 32, marginTop: 3 } } 
                        resizeMode="contain" /> 
                        </TouchableOpacity> 

                            {/* <View style={{   marginLeft: 15, marginTop: 5}}> */}
                    <TouchableOpacity   onPress={() => this.closeAddFollowers()} style={{ marginTop: 16, marginLeft: this.width-260}}>
                      <Text style={{ color: 'orange', fontWeight: 'bold', fontSize: 14}}>Close</Text>
                    </TouchableOpacity >
                 {/* </View> */}

                   
                   </View>

           {/* <View style={{  flex: 0.7, marginLeft: 25}}> */}
           <View style={{ marginLeft: 25, height: 400, width: 300, marginBottom: 10}}>

                      <FlatList  style={styles.qralist }
               
               data={this.props.qrashow}
               keyExtractor={this._keyExtractor}
               renderItem={this._renderItem}
               showsVerticalScrollIndicator={false}
               showsHorizontalScrollIndicator={false}
               />

 <Modal visible={this.state.actindicatorfecthQras} position= {'top'} transparent={true}  onRequestClose={() => console.log('Close was requested')}>
             {/* <KeyboardAvoidingView behavior="padding"  > */}
              <View style={{ 
                   padding:10, 
                  backgroundColor : 'rgba(0,0,0,0.85)',
                   marginTop: 210,
                   left: 135,
                   right: 15,
                   width: 105,
                   height: 35,
                   paddingVertical: 5,
                 //   position: 'absolute',
                   
                 //  alignItems: 'center',
                   borderRadius: 12                       
                    }}>
                   <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15}}>Fetching ...</Text>
                   
                  

                    </View>
                {/* </KeyboardAvoidingView > */}
                   
                      </Modal>


               </View>

                {/* <View style={{  flex: 0.05, marginLeft: 15, marginTop: 5}}> */}
            
                    
          </View>
           </Modal>

                  

                          </View> 
       
     } 

 }



const styles = StyleSheet.create({
  FollowingsText: {
    //  textAlign: 'center',
      color: 'orange',
      fontSize: 22,
      fontWeight: '700'
             },
             otherText: {
           //   textAlign: 'center',
              color: 'grey',
              fontSize: 16,
              fontWeight: '400'
                     },
                     qralist: {
                      marginRight: 115 ,
                      
                    //  marginBottom: 70,
                    // maxHeight: 150
                   
                   
                  }
          })
  
 SearchEnterQra.propTypes = {
    
};


 const mapStateToProps = state => {
    return { 
      followingsselected: state.sqso.currentQso.followingsSelected,
      followings: state.sqso.currentQso.followings,
      qrasearched: state.sqso.currentQso.qraSearched,
      qrashow: state.sqso.currentQso.qraShow,
      refreshfollowings: state.sqso.currentQso.refreshFollowings, 
      jwtToken: state.sqso.jwtToken
      
       };
};


const mapDispatchToProps = {
  followingsSelected,
  getQrasFromSearch,
  insertQraSearched,
  getUserInfo,
  refreshFollowings,
  searchQrasLocal,
  
   
   }

export default connect(mapStateToProps, mapDispatchToProps)(SearchEnterQra);