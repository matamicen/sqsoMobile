import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import * as Actions from '../../actions';
import ExploreUsers from './exploreUsersPresentational';
class exploreUsersContainer extends React.PureComponent {
  constructor() {
    super();
    this.state = { openLogin: false, followed: [] };
  }
  componentDidMount() {
    // if (

    //   // !this.props.followFetched &&
    //   // !this.props.followFetching
    // ) {
    this.props.actions.doLatestUsersFetch();
    // }
  }
  doFollow = (param) => {
    if (process.env.REACT_APP_STAGE === 'production')
      window.gtag('event', 'qraFollowRecommended_WEBPRD', {
        event_category: 'User',
        event_label: 'follow'
      });
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
            following={this.props.following}
            followers={this.props.followers}
            doFollow={(e) => this.doFollow(e)}
            doUnfollow={(e) => this.doUnfollow(e)}
            currentQRA={this.props.currentQRA}
          />
          <Confirm
            size="mini"
            open={this.state.openLogin}
            onCancel={() => this.setState({ openLogin: false })}
            onConfirm={() =>
              this.props.history.push({
                pathname: '/login',
                state: { from: this.props.location.pathname }
              })
            }
            cancelButton={I18n.t('global.cancel')}
            confirmButton={I18n.t('auth.login')}
            content={I18n.t('auth.loginToPerformAction')}
          />
        </Fragment>
      );
    else return null;
  }
}
const mapStateToProps = (state, ownProps) => ({
  followFetched: state.followFetched,
  followFetching: state.followFetching,
  latestUsers: state.latestUsers,
  following: state.userData.following,
  followers: state.userData.followers,
  currentQRA: state.sqso.qra,

  token: state.userData.token
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(
    withTranslation()(exploreUsersContainer)
  )
);
