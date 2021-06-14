/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { _ } from 'lodash';
import NewsFeedPresentational from '../NewsFeedPresentational';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
class searchedResults extends React.Component {
  render() {
    let qsos = [];
    // if (this.props.qsos && this.props.qsos.length > 0) {
    for (let i = 0; i < this.props.searchedResults.length; i++) {
      qsos.push({
        qso: this.props.searchedResults[i],
        type: this.props.searchedResults[i].type,
        source: this.props.searchedResults[i].source
          ? this.props.searchedResults[i].source
          : null
      });
    }

    return (
      <View>
        <NewsFeedPresentational feedType="SEARCH" list={qsos} />
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
