/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import FeedHeaderBar from './FeedHeaderBar';
import NewsFeedPresentational from './NewsFeedPresentational';
import SearchedResults from './Search/SearchResults';
import VariosModales from '../Qso/VariosModales';
import { _ } from 'lodash';
class NewsFeedContainer extends React.PureComponent {
  state = {
    qsos: this.props.qsos,
    searchedResults: this.props.searchedResults
  };
  componentDidUpdate(prevProps) {
    if (this.props.qsos && this.props.qsos !== prevProps.qsos) {
      this.setState({ qsos: this.props.qsos });
    }
    if (
      this.props.searchedResults &&
      this.props.searchedResults !== prevProps.searchedResults
    ) {
      this.setState({ searchedResults: this.props.searchedResults });
    }
  }

  closeWelcom = () => {
    this.props.actions.welcomeUserFirstTime(false);
  };

  render() {
    let qsos = [];
    // if (this.props.qsos && this.props.qsos.length > 0) {
    for (let i = 0; i < this.state.qsos.length; i++) {     
      qsos.push({
        qso: this.state.qsos[i],
        type: this.state.qsos[i].type,
        source: this.state.qsos[i].source ? this.state.qsos[i].source : null
      });
    }

    let searchr = [];
    // if (this.props.qsos && this.props.qsos.length > 0) {
    for (let i = 0; i < this.state.searchedResults.length; i++) {
       if (this.props.searchedresultstype==='HAMS'){ // filter by HAMS
         if (this.state.searchedResults[i].type==='QRA')
          searchr.push({
            qso: this.state.searchedResults[i],
            type: this.state.searchedResults[i].type,
            source: this.state.searchedResults[i].source ? this.state.searchedResults[i].source : null
          });
        }

        if (this.props.searchedresultstype==='PUBS') // filter by posts (QSO, FLDDAY, POST, QAP,etc)
         {
          if (this.state.searchedResults[i].type!=='QRA')
          searchr.push({
            qso: this.state.searchedResults[i],
            type: this.state.searchedResults[i].type,
            source: this.state.searchedResults[i].source ? this.state.searchedResults[i].source : null
          });

        }

         if (this.props.searchedresultstype==='ALL') // No filter bring them all
         searchr.push({
          qso: this.state.searchedResults[i],
          type: this.state.searchedResults[i].type,
          source: this.state.searchedResults[i].source ? this.state.searchedResults[i].source : null
        });
     
       
    }
    // }

    if (this.state.qsos) {
      return (
        <View style={{ flex: 1, zIndex: 1 }}>
          <View style={{ zIndex: 1 }}>
            <FeedHeaderBar />
          </View>
          {_.isEmpty(this.props.searchedResults) && (
            <View
              style={{ flex: 1, zIndex: 0 }}
              // pointerEvents={'auto'}
              pointerEvents={this.props.feedtouchable ? 'auto' : 'none'}>
              <NewsFeedPresentational
                feedType="MAIN"
                list={qsos}
                fetchingQSOS={this.props.fetchingQSOS}
                qsosFetched={this.props.qsosFetched}
              />
            </View>
          )}
            {!_.isEmpty(this.props.searchedResults) && (
            <View
              style={{ flex: 1, zIndex: 0 }}
              // pointerEvents={'auto'}
              pointerEvents={this.props.feedtouchable ? 'auto' : 'none'}>
              <NewsFeedPresentational
                feedType="SEARCH"
                list={searchr}
                fetchingQSOS={this.props.fetchingQSOS}
                qsosFetched={this.props.qsosFetched}
              />
            </View>
          )}
          {/* {!_.isEmpty(this.props.searchedResults) && (
            <View
              style={{ flex: 1, zIndex: 0 }}
              // pointerEvents={'auto'}
              pointerEvents={this.props.feedtouchable ? 'auto' : 'none'}>
              <SearchedResults
                feedType="MAIN"
                list={qsos}
                fetchingQSOS={this.props.fetchingQSOS}
                qsosFetched={this.props.qsosFetched}
              />
            </View>
          )} */}
          {this.props.welcomeuserfirsttime && (
            <VariosModales
              show={true}
              modalType="welcomefirsttime"
              closeInternetModal={this.closeWelcom.bind()}
            />
          )}
        </View>
      );
    } else return null;
  }
}

const mapStateToProps = (state) => {
  return {
    qsos: state.sqso.feed.qsos,
    fetchingQSOS: state.sqso.feed.FetchingQSOS,
    qsosFetched: state.sqso.feed.qsosFetched,
    feedtouchable: state.sqso.feed.FeedTouchable,
    welcomeuserfirsttime: state.sqso.welcomeUserFirstTime,
    searchedResults: state.sqso.feed.searchedResults,
    searchedresultstype: state.sqso.feed.searchedResultsType
  };
};
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedContainer);
