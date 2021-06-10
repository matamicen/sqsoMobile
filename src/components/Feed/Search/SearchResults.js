/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { _ } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
class searchedResults extends React.Component {
  //   constructor() {}
  //   componentWillUnmount() {
  // this.props.actions.searchedResults([]);
  //   }
  ItemView({ item }) {
    return (
      // Flat List Item
      <Text>
        {item.qra}
        {/* {'.'}
        {item.title.toUpperCase()} */}
      </Text>
    );
  }

  ItemSeparatorView() {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8'
        }}
      />
    );
  }
  render() {
    return (
      <View>
        <FlatList
          // ref={flatListRef}
          // refreshing={refresh}
          data={this.props.searchedResults}
          renderItem={this.ItemView}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    searchedResults: state.sqso.feed.searchedResults
  };
};
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(searchedResults);
