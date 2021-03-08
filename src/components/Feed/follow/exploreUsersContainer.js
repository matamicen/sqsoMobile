import React, { Fragment } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { userNotValidated } from '../../../helper';
import * as Actions from '../../../actions';
import ExploreUsers from './exploreUsersPresentational';
import analytics from '@react-native-firebase/analytics';
class exploreUsersContainer extends React.PureComponent {
  constructor() {
    super();
    this.state = { followed: [] };
  }

  doFollow = (param) => {
    // if (process.env.REACT_APP_STAGE === 'production')
    //   window.gtag('event', 'qraFollowRecommended_APPPRD', {
    //     event_category: 'User',
    //     event_label: 'follow'
    //   });
    if (!__DEV__) analytics().logEvent('qraFollowRecommended_APPPRD');
    if (this.props.userinfo.pendingVerification) userNotValidated();
    else {
      this.setState({ followed: [...this.state.followed, param] });
      this.props.actions.doFollowQRA(this.props.token, param);
    }
  };
  // doUnfollow = param => {

  //     this.props.actions.doUnfollowQRA(this.props.token, param);

  render() {
    if (this.props.latestUsers)
      return (
        <Fragment>
          <ExploreUsers
            followed={this.state.followed}
            users={this.props.latestUsers}
            following={this.props.followings}
            followers={this.props.followers}
            doFollow={(e) => this.doFollow(e)}
            doUnfollow={(e) => this.doUnfollow(e)}
            currentQRA={this.props.currentQRA}
          />
        </Fragment>
      );
    else
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
  }
}
const mapStateToProps = (state, ownProps) => ({
  followFetched: state.sqso.feed.followFetched,
  followFetching: state.sqso.feed.followFetching,
  latestUsers: state.sqso.feed.latestUsers,
  followers: state.sqso.currentQso.followers,
  followings: state.sqso.currentQso.followings,
  userinfo: state.sqso.userInfo,
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(exploreUsersContainer);
