import { API } from 'aws-amplify';
import { default as React, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard
} from 'react-native';
import analytics from '@react-native-firebase/analytics';

import Autocomplete from 'react-native-autocomplete-input';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import I18n from '../../utils/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';

const FeedHeaderSearch = (props) => {
  // For Main Data
  // const [films, setFilms] = useState([]);
  // For Filtered Data
  const [filteredUsers, setFilteredUsers] = useState([]);
  // For Selected Data
  const [selectedValue, setSelectedValue] = useState({});

  const renderInput = (props) => (
    <TextInput
      {...props}
      ref={(input) => {
        this.textInput = input;
      }}
    />
  );

  const findUser = (query) => {
    // Method called every time when we change the value of the input
    // if (query) {
    let apiName = 'superqso';
    let path = '/qra-list?qra=' + query;
    let myInit = {
      body: {}, // replace this with attributes you need
      headers: {
        // "Authorization": this.props.token
      } // OPTIONAL
    };

    console.log('query:' + query);
    console.log('length:' + query.length);
    if (query.length < 3) props.actions.setFeedTouchable(true);

    // comienza a buscar a partir de 3 letras
    if (query.length > 2)
      API.post(apiName, path, myInit)
        .then((response) => {
          if (response.body.error > 0) {
            this.setState({ isLoading: false, error: response.body.message });
            props.actions.setFeedTouchable(true);
          } else {
            // this.setState({ data: response.body.message, isLoading: false });
            setFilteredUsers(response.body.message);
            props.actions.setFeedTouchable(false);
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isLoading: false, error });
          props.actions.setFeedTouchable(true);
        });
    // Making a case insensitive regular expression
    // const regex = new RegExp(`${query.trim()}`, 'i');
    // Setting the filtered film array according the query
    // setFilteredUsers(films.filter((film) => film.title.search(regex) >= 0));
    // }
    else {
      // If the query is null then return blank
      setFilteredUsers([]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          renderTextInput={renderInput}
          // Data to show in suggestion
          data={filteredUsers}
          onFocus={() => setSelectedValue('')}
          keyExtractor={(item) => item.qra}
          // Default value if you want to set something in input
          defaultValue={
            JSON.stringify(selectedValue) === '{}' ? I18n.t('navBar.searchCallsign') : selectedValue.name
          }
          // Onchange of the text changing the state of the query
          // Which will trigger the findUser method
          // To show the suggestions
          onChangeText={(text) => findUser(text)}
          placeholder={I18n.t('navBar.searchCallsign')}
          renderItem={({ item }) => (
            // For the suggestion view

            <View key={item.qra}>
              <TouchableOpacity
                onPress={() => {
                  if (!__DEV__) analytics().logEvent('qraNavBarSearch_APPPRD');
                  props.actions.setFeedTouchable(true);
                  setFilteredUsers([]);
                  Keyboard.dismiss();

                  this.textInput.clear();
                  props.navigate(item.qra);
                }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Avatar
                    round
                    source={
                      item.avatarpic
                        ? {
                            uri: item.avatarpic
                          }
                        : require('../../images/emptyprofile.png')
                    }
                  />
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    paddingTop: 10,
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

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedHeaderSearch);
