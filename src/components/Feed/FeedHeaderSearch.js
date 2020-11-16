import { API } from 'aws-amplify';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Avatar, ListItem, SearchBar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';

class FeedHeaderSearch extends React.PureComponent {
  state = {
    loading: false,
    data: [],
    page: 1,
    seed: 1,
    text: '',
    error: null,
    query: '',
    fullData: []
  };

  renderHeader() {
    return (
      <View>
        <SearchBar
          placeholder="Type Here..."
          lightTheme
          round
          onChangeText={(text) => this.searchFilterFunction(text)}
          value={this.state.text}
        />
      </View>
    );
  }
  searchFilterFunction(text) {
    this.setState({ text });
    let apiName = 'superqso';
    let path = '/qra-list?qra=' + text;
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
          this.setState({ data: response.body.message, isLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false, error });
      });
  }
  renderItem = ({ item }) => (
    <ListItem
      key={item.qra}
      bottomDivider
      onPress={() => {
        this.props.navigate(item.qra);
      }}>
      <Avatar round source={{ uri: item.avatarpic }} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>
      );
    }
    if (this.state.error) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18 }}>
            Error fetching data... Check your network connection!
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          extraData={this.state.data}
          data={this.state.data}
          keyExtractor={(item) => item.qra}
          renderItem={(item) => this.renderItem(item)}
          ListHeaderComponent={this.renderHeader.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    width: 300
  },
  search: { flex: 1, width: '100%' },

  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  metaInfo: {
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10
  }
});
const mapStateToProps = (state) => ({
  FetchingQSOS: state.sqso.feed.FetchingQSOS,
  qsosFetched: state.sqso.feed.qsosFetched,
  //   authenticating: state.sqso.feeduserData.authenticating,
  currentQRA: state.sqso.qra,

  token: state.sqso.jwtToken,
  qsos: state.sqso.feed.qsos
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(FeedHeaderSearch)
);
