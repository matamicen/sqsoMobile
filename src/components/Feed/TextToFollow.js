import React from 'react';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
// import '../styles/style.css';

class PopupToFollow extends React.Component {
  state = {
    isFollowing: this.props.following.some((o) => o.qra === this.props.qra),
    following: this.props.following
  };

  follow = () => {
    this.props.actions.doFollowQRA(this.props.token, this.props.qra);
  };
  unfollow = () => {
    this.setState({ isFollowing: false });
    this.props.actions.doUnfollowQRA(this.props.token, this.props.qra);
  };
  static getDerivedStateFromProps(props, state) {
    if (props.following !== state.following)
      return {
        following: props.following,
        isFollowing: props.following.some((o) => o.qra === props.qra)
      };

    return null;
  }
  render = () => {
    if (this.props.currentQRA !== this.props.qra && !this.state.isFollowing)
      return (
        <Button
          type="clear"
          // type="button"
          // className="link-button-follow"
          onPress={() => this.follow()}
          title={I18n.t('qra.follow')}
        />
      );
    else return null;
  };
}

const mapStateToProps = (state, ownProps) => ({
  //state: state,
  currentQRA: state.sqso.qra,

  following: state.sqso.currentQso.followings,
  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(PopupToFollow);
