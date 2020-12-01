import { API } from 'aws-amplify';
import { default as React, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// Import Autocomplete component
import Autocomplete from 'react-native-autocomplete-input';
import { Avatar } from 'react-native-elements';
import I18n from '../../utils/i18n';

const FeedHeaderSearch = (props) => {
  // For Main Data
  // const [films, setFilms] = useState([]);
  // For Filtered Data
  const [filteredUsers, setFilteredUsers] = useState([]);
  // For Selected Data
  const [selectedValue, setSelectedValue] = useState({});

  // useEffect(() => {
  // fetch('https://aboutreact.herokuapp.com/getpost.php?offset=1')
  //   .then((res) => res.json())
  //   .then((json) => {
  //     const { results: films } = json;
  //     setFilms(films);
  //     //setting the data in the films state
  //   })
  //   .catch((e) => {
  //     alert(e);
  //   });
  // }, []);

  const findUser = (query) => {
    // Method called every time when we change the value of the input
    if (query) {
      let apiName = 'superqso';
      let path = '/qra-list?qra=' + query;
      let myInit = {
        body: {}, // replace this with attributes you need
        headers: {
          // "Authorization": this.props.token
        } // OPTIONAL
      };
      API.get(apiName, path, myInit)
        .then((response) => {
          if (response.body.error > 0) {
            this.setState({ isLoading: false, error: response.body.message });
          } else {
            // this.setState({ data: response.body.message, isLoading: false });
            setFilteredUsers(response.body.message);
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isLoading: false, error });
        });
      // Making a case insensitive regular expression
      // const regex = new RegExp(`${query.trim()}`, 'i');
      // Setting the filtered film array according the query
      // setFilteredUsers(films.filter((film) => film.title.search(regex) >= 0));
    } else {
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
          // Data to show in suggestion
          data={filteredUsers}
          keyExtractor={(item) => item.qra}
          // Default value if you want to set something in input
          defaultValue={
            JSON.stringify(selectedValue) === '{}' ? '' : selectedValue.name
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
                  setFilteredUsers([]);
                  props.navigate(item.qra);
                }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Avatar round source={{ uri: item.avatarpic }} />
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
export default FeedHeaderSearch;
// class FeedHeaderSearch extends React.PureComponent {
//   state = {
//     loading: false,
//     data: [],
//     page: 1,
//     seed: 1,
//     text: '',
//     error: null,
//     query: '',
//     fullData: []
//   };

//   renderHeader() {
//     return (
//       <View>
//         <SearchBar
//           placeholder="Type Here..."
//           lightTheme
//           round
//           onChangeText={(text) => this.searchFilterFunction(text)}
//           value={this.state.text}
//         />
//       </View>
//     );
//   }
//   searchFilterFunction(text) {
//     this.setState({ text });
//     let apiName = 'superqso';
//     let path = '/qra-list?qra=' + text;
//     let myInit = {
//       body: {}, // replace this with attributes you need
//       headers: {
//         // "Authorization": this.props.token
//       } // OPTIONAL
//     };
//     API.get(apiName, path, myInit)
//       .then((response) => {
//         if (response.body.error > 0) {
//           this.setState({ isLoading: false, error: response.body.message });
//         } else {
//           this.setState({ data: response.body.message, isLoading: false });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         this.setState({ isLoading: false, error });
//       });
//   }
//   renderItem = ({ item }) => (
//     <ListItem
//       key={item.qra}
//       bottomDivider
//       onPress={() => {
//         this.props.navigate(item.qra);
//       }}>
//       <Avatar round source={{ uri: item.avatarpic }} />
//       <ListItem.Content>
//         <ListItem.Title>{item.name}</ListItem.Title>
//       </ListItem.Content>
//       <ListItem.Chevron />
//     </ListItem>
//   );
//   render() {
//     if (this.state.isLoading) {
//       return (
//         <View
//           style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator size="large" color="#5500dc" />
//         </View>
//       );
//     }
//     if (this.state.error) {
//       return (
//         <View
//           style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text style={{ fontSize: 18 }}>
//             Error fetching data... Check your network connection!
//           </Text>
//         </View>
//       );
//     }
//     return (
//       <View style={styles.container}>
//         <FlatList
//           extraData={this.state.data}
//           data={this.state.data}
//           keyExtractor={(item) => item.qra}
//           renderItem={(item) => this.renderItem(item)}
//           ListHeaderComponent={this.renderHeader.bind(this)}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//     width: 300
//   },
//   search: { flex: 1, width: '100%' },

//   listItem: {
//     marginTop: 10,
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//     flexDirection: 'row'
//   },
//   coverImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8
//   },
//   metaInfo: {
//     marginLeft: 10
//   },
//   title: {
//     fontSize: 18,
//     width: 200,
//     padding: 10
//   }
// });
// const mapStateToProps = (state) => ({
//   FetchingQSOS: state.sqso.feed.FetchingQSOS,
//   qsosFetched: state.sqso.feed.qsosFetched,
//   //   authenticating: state.sqso.feeduserData.authenticating,
//   currentQRA: state.sqso.qra,

//   token: state.sqso.jwtToken,
//   qsos: state.sqso.feed.qsos
// });
// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(Actions, dispatch)
// });

// export default withNavigation(
//   connect(mapStateToProps, mapDispatchToProps)(FeedHeaderSearch)
// );
