import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';

import * as Actions from '../../../actions';
import ExploreUsers from './exploreUsersPresentational';
class exploreUsersContainer extends React.PureComponent {
  constructor() {
    super();
    this.state = { followed: [] };
  }

  doFollow = (param) => {
    // if (process.env.REACT_APP_STAGE === 'production')
    //   window.gtag('event', 'qraFollowRecommended_WEBPRD', {
    //     event_category: 'User',
    //     event_label: 'follow'
    //   });
    this.setState({ followed: [...this.state.followed, param] });
    this.props.actions.doFollowQRA(this.props.token, param);
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
    else return null;
  }
}
const mapStateToProps = (state, ownProps) => ({
  followFetched: state.sqso.feed.followFetched,
  followFetching: state.sqso.feed.followFetching,
  latestUsers: state.sqso.feed.latestUsers,
  followers: state.sqso.currentQso.followers,
  followings: state.sqso.currentQso.followings,
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(exploreUsersContainer)
);
