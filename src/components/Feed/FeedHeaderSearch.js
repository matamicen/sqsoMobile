import { API } from 'aws-amplify';
import { default as React, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Auth } from 'aws-amplify';
import { SearchBar } from 'react-native-elements';
import I18n from '../../utils/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import Autocomplete from 'react-native-autocomplete-input';

const FeedHeaderSearch = (props) => {
  // For Main Data
  // const [films, setFilms] = useState([]);
  // For Filtered Data
  const [searchValue, setSearchValue] = useState([]);
  // For Selected Data
  const [users, setFilteredUsers] = useState({});

  const [searching, isSearching] = useState(false);

  const [error, setError] = useState({});

  // const renderInput = (props) => (
  //   <TextInput
  //     {...props}
  //     ref={(input) => {
  //       this.textInput = input;
  //     }}
  //   />
  // );

  const findUser = async (query) => {
    isSearching(true);
    setSearchValue(query);
    // Method called every time when we change the value of the input
    // if (query) {
    let session = await Auth.currentSession();
    props.actions.setToken(session.idToken.jwtToken);
    let apiName = 'superqso';
    let path = '/contentSearch';
    let myInit = {
      body: { searchValue: query }, // replace this with attributes you need
      headers: {
        Authorization: session.idToken.jwtToken
      }
    };

    if (query.length < 3) props.actions.setFeedTouchable(true);

    // comienza a buscar a partir de 3 letras
    if (query.length > 2)
      API.post(apiName, path, myInit)
        .then((response) => {
          console.log('devuelve API search:')
          console.log(response.body.message)
          if (response.body.error > 0) {
            isSearching(false);
            setError(response.body.message);
            // this.setState({ isLoading: false, error: response.body.message });
            props.actions.setFeedTouchable(true);
          } else {
            // this.setState({ data: response.body.message, isLoading: false });

            // isSearching(false);
            // setFilteredUsers(response.body.message);
            // props.actions.setFeedTouchable(false);
            props.actions.setSearchedResults(response.body.message);

            // props.actions.doClearFeed(false);
            // props.actions.doFetchUserFeed(props.currentQRA);
            // props.actions.setSearchedResults([]);
           
           
           
            // props.actions.doClearFeed(false);
            // // props.actions.doFetchUserFeed(props.currentQRA);
            // props.actions.doFetchPublicFeed();
          }
        })
        .catch((err) => {
          console.log(err);
          isSearching(false);
          setError(err);
          props.actions.setFeedTouchable(true);
        });
    // Making a case insensitive regular expression
    // const regex = new RegExp(`${query.trim()}`, 'i');
    // Setting the filtered film array according the query
    // setFilteredUsers(films.filter((film) => film.title.search(regex) >= 0));
    // }
    else {
      // If the query is null then return blank
      // setFilteredUsers([]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* <SearchBar
          lightTheme
          clearIcon
          showLoading
          loadingProps={{
            animating: searching,
            color: 'black'
          }}
          round
          inputContainerStyle={{ height: 40 }}
          containerStyle={{ backgroundColor: 'white' }}
          placeholder={I18n.t('navBar.searchCallsign')}
          onCancel={() => {
            isSearching(false);
            props.actions.setSearchedResults([]);
          }}
          onChangeText={(text) => findUser(text)}
          value={searchValue}
        /> */}
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          // renderTextInput={renderInput}
          // Data to show in suggestion
          // data={users}
          // onFocus={() => setSelectedValue('')}
          // keyExtractor={(item) => item.qra}
          // Default value if you want to set something in input
          // defaultValue={
          //   JSON.stringify(selectedValue) === '{}' ? I18n.t('navBar.searchCallsign') : selectedValue.name
          // }
          // Onchange of the text changing the state of the query
          // Which will trigger the findUser method
          // To show the suggestions
          onChangeText={(text) => findUser(text)}
          placeholder={I18n.t('navBar.searchCallsign')}
          // renderItem={({ item }) => (
          //   // For the suggestion view

          //   <View key={item.qra}>
          //     <TouchableOpacity
          //       onPress={() => {
          //         if (!__DEV__) analytics().logEvent('qraNavBarSearch_APPPRD');
          //         props.actions.setFeedTouchable(true);
          //         setFilteredUsers([]);
          //         Keyboard.dismiss();

          //         this.textInput.clear();
          //         props.navigate(item.qra);
          //       }}>
          //       <View style={{ flex: 1, flexDirection: 'row' }}>
          //         <Avatar
          //           round
          //           source={
          //             item.avatarpic
          //               ? {
          //                   uri: item.avatarpic
          //                 }
          //               : require('../../images/emptyprofile.png')
          //           }
          //         />
          //         <Text style={styles.itemText}>{item.name}</Text>
          //       </View>
          //     </TouchableOpacity>
          //   </View>
          // )}
        />
      </View>
    </SafeAreaView>
  );
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
  }
});

const mapStateToProps = (state) => ({

  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedHeaderSearch);
