import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import {Button} from 'react-native-elements';
// import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import * as Actions from '../../actions';
import FollowCarrousel from '../follow/followCarrousel';
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
    //   window.gtag('event', 'qraFollowRecommended_WEBPRD', {
    //     event_category: 'User',
    //     event_label: 'follow'
    //   });
    this.setState({ followed: [...this.state.followed, param] });
    this.props.actions.doFollowQRA(this.props.token, param);
  };
  // doUnfollow = param => {

  //     this.setState({ followed: this.state.followed.filter(f => f === param) });
  //     this.props.actions.doUnfollowQRA(this.props.token, param);

  // };

  render() {
     
    if (this.props.follow)
      return (
        <View
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
        </View>
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

  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(FeedItemFollow);
