import React from 'react';
import { View } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userNotValidated } from '../../helper';
// import {Button} from 'react-native-elements';
// import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import * as Actions from '../../actions';
import FollowCarousel from './follow/followCarousel';
class FeedItemFollow extends React.PureComponent {
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
    // if (!__DEV__)
    //   window.gtag('event', 'qraFollowRecommended_APPPRD', {
    //     event_category: 'User',
    //     event_label: 'follow'
    //   });
    if (!__DEV__) analytics().logEvent('qraFollowCarrousel_APPPRD');
    if (this.props.userinfo.pendingVerification) userNotValidated();
    else {
      this.setState({ followed: [...this.state.followed, param] });
      this.props.actions.doFollowQRA(this.props.token, param);
    }
  };
  // doUnfollow = param => {

  //     this.setState({ followed: this.state.followed.filter(f => f === param) });
  //     this.props.actions.doUnfollowQRA(this.props.token, param);

  // };

  render() {
    if (this.props.follow)
      return (
        <FollowCarousel
          followed={this.state.followed}
          follow={this.props.follow}
          following={this.props.following}
          followers={this.props.followers}
          doFollow={(e) => this.doFollow(e)}
          doUnfollow={(e) => this.doUnfollow(e)}
          currentQRA={this.props.currentQRA}
        />
      );
    else return null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentQRA: state.sqso.qra,
  followFetched: state.sqso.feed.followFetched,
  followFetching: state.sqso.feed.followFetching,
  follow: state.sqso.feed.follow,
  following: state.sqso.currentQso.followings,
  followers: state.sqso.currentQso.followers,
  userinfo: state.sqso.userInfo,
  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(FeedItemFollow);
// export default connect(mapStateToProps, mapDispatchToProps, null, {
//   pure: false
// })(FeedItemFollow);
