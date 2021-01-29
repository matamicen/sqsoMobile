import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import FeedHeaderBar from './FeedHeaderBar';
import NewsFeedPresentational from './NewsFeedPresentational';
import VariosModales from '../Qso/VariosModales';

class NewsFeedContainer extends React.PureComponent {
  state = { qsos: this.props.qsos };
  componentDidUpdate(prevProps) {
    if (this.props.qsos && this.props.qsos !== prevProps.qsos) {
      this.setState({ qsos: this.props.qsos });
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
    // }

    if (this.state.qsos) {
      return (
        <View style={{ flex: 1, zIndex: 1 }}>
          <View style={{ zIndex: 1 }}>
            <FeedHeaderBar />
          </View>
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
    FetchingQSOS: state.sqso.feed.FetchingQSOS,
    qsosFetched: state.sqso.feed.qsosFetched,
    feedtouchable: state.sqso.feed.FeedTouchable,
    welcomeuserfirsttime: state.sqso.welcomeUserFirstTime,
    // authenticating: state.sqso.feed.userData.authenticating,

    // token: state.sqso.feed.userData.token
    // public: state.sqso.feed.userData.public
  };
};
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedContainer);
