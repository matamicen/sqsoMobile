import React from 'react';
//import I18n from '../../utils/i18n';;
import { connect } from 'react-redux';
//import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import * as Actions from '../../actions';
import FollowCarrousel from '../follow/followCarrousel';
import './style.js';
class FeedItemFollow extends React.Component {
  state = {
    followed: [],
    openLogin: false,
    follow: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.follow !== prevProps.follow)
      this.setState({ follow: this.props.follow });
  }
  doFollow = (param) => {
    if (this.props.isAuthenticated) {
      if (!__DEV__)
        window.gtag('event', 'qraFollowRecommended_WEBPRD', {
          event_category: 'User',
          event_label: 'follow'
        });
      this.setState({ followed: [...this.state.followed, param] });
      this.props.actions.doFollowQRA(this.props.token, param);
    } else this.setState({ openLogin: true });
  };
  // doUnfollow = param => {
  //   if (this.props.isAuthenticated) {
  //     this.setState({ followed: this.state.followed.filter(f => f === param) });
  //     this.props.actions.doUnfollowQRA(this.props.token, param);
  //   } else this.setState({ openLogin: true });
  // };

  render() {
    const { t } = this.props;
    if (this.props.follow)
      return (
        <Segment
          raised
          secondary
          style={{
            padding: 'initial',
            textAlign: 'center',
            height: 'max-content'
          }}>
          <FollowCarrousel
            followed={this.state.followed}
            follow={this.props.follow}
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
            cancelButton={t('global.cancel')}
            confirmButton={t('auth.login')}
            content={t('auth.loginToPerformAction')}
          />
        </Segment>
      );
    else return null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentQRA: state.sqso.qra,
  followFetched: state.followFetched,
  followFetching: state.followFetching,
  follow: state.follow,
  following: state.userData.following,
  followers: state.userData.followers,
  isAuthenticated: state.userData.isAuthenticated,
  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(
    withTranslation()(FeedItemFollow)
  )
);
