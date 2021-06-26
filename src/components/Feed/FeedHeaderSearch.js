import { API } from 'aws-amplify';
import { default as React, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, TextInput, Image, Keyboard,TouchableHighlight } from 'react-native';
import { Auth } from 'aws-amplify';
import { SearchBar } from 'react-native-elements';
import I18n from '../../utils/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Avatar, Icon, Button } from 'react-native-elements';
import * as Actions from '../../actions';
import Autocomplete from 'react-native-autocomplete-input';
import { setToken } from '../../actions';
import { createIconSetFromFontello } from 'react-native-vector-icons';

const FeedHeaderSearch = (props) => {
  // For Main Data
  // const [films, setFilms] = useState([]);
  // For Filtered Data
  const [searchValue, setSearchValue] = useState('');
  // For Selected Data
  const [users, setFilteredUsers] = useState({});

  const [searching, isSearching] = useState(false);

  const [error, setError] = useState({});
  const [searchInput, setSearchInput] = useState(false);
  




  // const renderInput = (props) => (
  //   <TextInput
  //     {...props}
  //     ref={(input) => {
  //       this.textInput = input;
  //     }}
  //   />
  // );

  const inputSearch = async (query) =>{
    // isSearching(true);
     setSearchValue(query);
  }

  const cancelSearch = async () => {

    props.actions.setSearchedResults([],false);
    setSearchInput(false);
    props.cancelsearch();
 
    
  }

  const searchIconPress = async () => {
    setSearchInput(true)
    props.actions.setSearchedResults([],true);
    // someFeed = {
    //   type: "AD2",
    //   source: "FEED",
    // }
    // props.actions.setSearchedResults([someFeed]);
    
    // esto es para que apenas se vea el search le abra el softkey para que tipe la busqueda.
    setTimeout(() => {
      this.nameOrId.focus()
    }, 250);
    props.searchicon()
    
  
  }

  
  // const findUser = async (query) => {
 
  //   isSearching(true);
  //   setSearchValue(query);
  //   // Method called every time when we change the value of the input
  //   // if (query) {
  //   let session = await Auth.currentSession();
  //   props.actions.setToken(session.idToken.jwtToken);
  //   let apiName = 'superqso';
  //   let path = '/contentSearch';
  //   let myInit = {
  //     body: { searchValue: query }, // replace this with attributes you need
  //     headers: {
  //       Authorization: session.idToken.jwtToken
  //     }
  //   };

  //   if (query.length < 3) props.actions.setFeedTouchable(true);

  //   // comienza a buscar a partir de 3 letras
  //   if (query.length > 2)
  //     API.post(apiName, path, myInit)
  //       .then((response) => {
  //         console.log('devuelve API search:')
  //         console.log(response.body.message)
  //         if (response.body.error > 0) {
  //           isSearching(false);
  //           setError(response.body.message);
  //           // this.setState({ isLoading: false, error: response.body.message });
  //           props.actions.setFeedTouchable(true);
  //         } else {
  //           // this.setState({ data: response.body.message, isLoading: false });

  //           // isSearching(false);
  //           // setFilteredUsers(response.body.message);
  //           // props.actions.setFeedTouchable(false);
  //           props.actions.setSearchedResults(response.body.message);

  //           // props.actions.doClearFeed(false);
  //           // props.actions.doFetchUserFeed(props.currentQRA);
  //           // props.actions.setSearchedResults([]);
           
           
           
  //           // props.actions.doClearFeed(false);
  //           // // props.actions.doFetchUserFeed(props.currentQRA);
  //           // props.actions.doFetchPublicFeed();
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         isSearching(false);
  //         setError(err);
  //         props.actions.setFeedTouchable(true);
  //       });
  //   // Making a case insensitive regular expression
  //   // const regex = new RegExp(`${query.trim()}`, 'i');
  //   // Setting the filtered film array according the query
  //   // setFilteredUsers(films.filter((film) => film.title.search(regex) >= 0));
  //   // }
  //   else {
  //     // If the query is null then return blank
  //     // setFilteredUsers([]);
  //   }
  // };

  const search = async () => {
    console.log('buscar: '+searchValue.length)
    if (searchValue.length > 0)
 {   
  // borro el resultado de la busqueda anterior 
  props.actions.setSearchedResults([],true);
     Keyboard.dismiss();
   setTimeout(() => {
    props.actions.setSearchedResultsFilter('ALL'); // new search by default filter by POSTs
   }, 300);
     
    
    


    isSearching(true);
    // setSearchValue(query);

    // Method called every time when we change the value of the input
    // if (query) {
    let session = await Auth.currentSession();
    props.actions.setToken(session.idToken.jwtToken);
    let apiName = 'superqso';
    let path = '/contentSearch';
    let myInit = {
      body: { searchValue: searchValue }, // replace this with attributes you need
      headers: {
        Authorization: session.idToken.jwtToken
      }
    };

    API.post(apiName, path, myInit)
        .then((response) => {
          console.log('devuelve API search:')
          console.log(response.body.message)
          if (response.body.error > 0) {
            isSearching(false);
            setError(response.body.message);
            // this.setState({ isLoading: false, error: response.body.message });
            // props.actions.setFeedTouchable(true);
          } else {
            // this.setState({ data: response.body.message, isLoading: false });

            // isSearching(false);
            // setFilteredUsers(response.body.message);
            // props.actions.setFeedTouchable(false);

            // console.log('SEARCHMM:')
            // console.log(response.body.message)
            props.searching();
            props.actions.setSearchedResults(response.body.message,true);
          
   
            

            // props.actions.doClearFeed(false);
            // props.actions.doFetchUserFeed(props.currentQRA);
            // props.actions.setSearchedResults([]);
           
           
           
            // props.actions.doClearFeed(false);
            // // props.actions.doFetchUserFeed(props.currentQRA);
            // props.actions.doFetchPublicFeed();
          }
          if (!__DEV__) analytics().logEvent('qraNavBarSearch_APPPRD');
        })
        .catch((err) => {
          console.log(err);
          isSearching(false);
          setError(err);
          // props.actions.setFeedTouchable(true);
        });

      }
      else
        setSearchValue('')



  }



  // (true) && 
  return (

    searchInput ?
    <SafeAreaView style={{ flex: 1, flexDirection: 'row', marginTop:7, marginBottom: 7 }}>
      
        <View style={styles.searchSection}>

        <TouchableOpacity onPress={() => search()} >
            <Image
              source={require('../../images/search.png')}
              style={{ width: 18, height: 18, marginLeft: 6 }}
              resizeMode="contain"

            />
             </TouchableOpacity>
            

           <TextInput
            ref={input => {
              this.nameOrId = input;
            }}
                  placeholderTextColor="dimgray" 
                  // returnKeyType='search'
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  keyboardType={
                    Platform.OS === 'android' ? 'visible-password' : 'default'
                  }
                  autoCorrect={false}
                
                  style={styles.input2}
                  // autoFocus={true}
               
                 


                  onChangeText={(text) => inputSearch(text)}
          placeholder={I18n.t('navBar.searchCallsign')}
        
          returnKeyType='search'
          onSubmitEditing={() => {
             search() }}
                />
          </View>


         <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
    
         <TouchableOpacity onPress={() => cancelSearch()} >
                            <Text style={{ color: '#243665', fontSize: 16}}>{I18n.t('search.cancel')}</Text>
                              </TouchableOpacity>
                              </View> 

    </SafeAreaView>
    :

    <SafeAreaView style={{ flex: 1, flexDirection: 'row' }}>
      <View
            style={{
              flex: 0.2,
              // flexBasis: 60,
              // flexGrow: 0,
              // flexShrink: 0,
              marginTop: 5,
              marginLeft: 5
            }}>
            <Avatar
              size="medium"
              rounded
              source={require('../../images/superqsologo2.png')}
            />
          </View> 
          <View
            style={{
              flex: 0.8,
              // flexBasis: 60,
              // flexGrow: 0,
              // flexShrink: 0,
               alignItems: 'flex-end',
              // justifyContent: 'flex-end',
              marginTop: 10,
              marginLeft:12,
              // backgroundColor: 'green'
            }}>
          
              <Icon
              name="search"
             
      // name="search-circle"
      // type='ionicon'
      size={35}
      color='#243665'
      onPress={() => searchIconPress()} 
    />
          </View> 

    </SafeAreaView>
   

      

  );
                // }
      


                
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#F5FCFF',
    flex: 1,
    left: 0,
    // position: 'absolute',
    right: 0,
    top: 0,
    // zIndex: 1,
    // paddingTop: 10,
    marginBottom: 0
    // marginTop: 40
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16
  },
  input: {
    height: 40,
    // backgroundColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'lightgray',
    // borderWidth: 1,
    borderRadius: 22,
    marginBottom: 18,
    width: 240,
    // color: '#FFF',
    color: 'black',
    fontSize: 18,
    paddingHorizontal: 4,
    // textAlign: 'center'
  },
  input2: {
    flex: 1,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    borderRadius: 22,
    paddingLeft: 5,
    // backgroundColor: Platform.OS === 'android' ? '#f5f5f5' : '#939393',
    backgroundColor: Platform.OS === 'android' ? '#f5f5f5' : '#f5f5f5',
    //backgroundColor: 'grey',
    marginRight: 10,
    marginTop: 2,
    marginBottom: 3,
    fontSize: 16,

    color: '#424242'
  },
  searchSection: {
    flex: 0.75,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    marginLeft: 5,
    // backgroundColor: Platform.OS === 'android' ? '#f5f5f5' : '#939393',
    backgroundColor: Platform.OS === 'android' ? '#f5f5f5' : '#f5f5f5',
    fontSize: 12
    // backgroundColor: 'grey',
  },
});

const mapStateToProps = (state) => ({

  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedHeaderSearch);
