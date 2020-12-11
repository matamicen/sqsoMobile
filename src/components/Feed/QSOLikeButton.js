import API from '@aws-amplify/api';
import crashlytics from '@react-native-firebase/crashlytics';
// import * as Sentry from '@sentry/browser';
import React from 'react';
import { Button, Icon } from 'react-native-elements';
//import I18n from '../../utils/i18n';;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';

class QSOLikeButton extends React.PureComponent {
  constructor() {
    super();
    this.likeCounter = 0;
    this.liked = null;
    this.icon = 'thumbs-o-up';
    this.state = {
      icon: 'thumbs-o-up',
      liked: null,
      likeCounter: 0,
      openLogin: false,
      likes: [],
      idqra: null
    };
  }
  componentDidUpdate() {
    console.log(this.props.qso);
  }
  static getDerivedStateFromProps(props, prevState) {
    console.log(props.likes);
    console.log(props.qso);

    if (props.userInfo.idqras && prevState.idqra !== props.userInfo.idqras) {
      if (props.likes.some((o) => o.idqra === props.userInfo.idqras)) {
        return {
          qso: props.qso,
          liked: true,
          icon: 'thumbs-up',
          likes: props.likes,
          likeCounter: props.likes.length
        };
      } else {
        return {
          qso: props.qso,
          liked: false,
          icon: 'thumbs-o-up',
          likes: props.likes,
          likeCounter: props.likes.length
        };
        // if (
        //   props.userData.qra
        // ) {
        //   if (props.qso.likes.some(o => o.idqra === props.userData.qra.idqras)) {
        //     return {
        //       liked: true,
        //       icon: 'thumbs up',
        //       likes: props.qso.likes,
        //       likeCounter: props.qso.likes.length
        //     };
        //   } else {
        //     return {
        //       liked: false,
        //       icon: 'thumbs outline up',
        //       likes: props.qso.likes,
        //       likeCounter: props.qso.likes.length
        //     };
        //   }
      }
    }
    return null;
  }
  async doLike(token = null) {
    // if (!__DEV__) {
    //   window.gtag('event', 'qsoLiked_WEBPRD', {
    //     event_category: 'QSO',
    //     event_label: 'liked'
    //   });
    // }
    try {
      // const currentSession = await Auth.currentSession();
      // token = currentSession.getIdToken().getJwtToken();
      // this.props.actions.refreshToken(token);

      let apiName = 'superqso';
      let path = '/qso-like';
      let myInit = {
        body: {
          qso: this.props.qso.idqso_shared
            ? this.props.qso.idqso_shared
            : this.props.qso.idqsos
        }, // replace this with attributes you need
        headers: {
          Authorization: token ? token : this.props.token
        } // OPTIONAL
      };
      API.post(apiName, path, myInit)
        .then((response) => {
          if (response.body.error > 0) {
          } else {
          }
        })
        .catch(async (error) => {
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__) {
            console.log(error.message);
            crashlytics().recordError(new Error('QSOLikeButton_DEV'));
          } else {
            crashlytics().recordError(new Error('QSOLikeButton_PRD'));
          }
        });
      //   }
      // );
    } catch (error) {
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) {
        console.log('Unable to refresh Token');
        console.log(error);
        crashlytics().recordError(new Error('QSOLikeButton_DEV'));
      } else {
        crashlytics().recordError(new Error('QSOLikeButton_PRD'));
      }
    }
  }

  async doUnLike(token = null) {
    if (!__DEV__) {
      // window.gtag('event', 'qsoUnliked_WEBPRD', {
      //   event_category: 'QSO',
      //   event_label: 'unliked'
      // });
    }
    try {
      // const currentSession = await Auth.currentSession();
      // token = currentSession.getIdToken().getJwtToken();
      // this.props.actions.refreshToken(token);
      let apiName = 'superqso';
      let path = '/qso-like';
      let myInit = {
        body: {
          qso: this.props.qso.idqso_shared
            ? this.props.qso.idqso_shared
            : this.props.qso.idqsos
        }, // replace this with attributes you need
        headers: {
          Authorization: token ? token : this.props.token
        } // OPTIONAL
      };
      API.del(apiName, path, myInit)
        .then((response) => {
          if (response.body.error > 0) {
          } else {
          }
        })
        .catch(async (error) => {
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__) {
            console.log(error.message);
            crashlytics().recordError(new Error('QSOLikeButton_DEV'));
          } else {
            crashlytics().recordError(new Error('QSOLikeButton_PRD'));
          }
        });
      //   }
      // );
    } catch (error) {
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) {
        console.log('Unable to refresh Token');
        console.log(error);
        crashlytics().recordError(new Error('QSOLikeButton_DEV'));
      } else {
        crashlytics().recordError(new Error('QSOLikeButton_PRD'));
      }
    }
  }

  handleOnLike() {
    if (!this.liked) {
      this.likeCounter++;

      this.liked = true;
      this.icon = 'thumbs-up';

      this.setState({
        likeCounter: this.likeCounter,
        icon: 'thumbs-up',
        liked: true
      });
      // doLikeQSO(idqso, idqra, qra, firstname, lastname, avatarpic)
      this.props.actions.doLikeQSO(
        this.props.idqsos,
        this.props.userInfo.idqras,
        this.props.currentQRA,
        this.props.userInfo.firstname,
        this.props.userInfo.lastname,
        this.props.userInfo.avatarpic
      );
      this.doLike();
    } else {
      this.likeCounter--;

      this.liked = false;
      this.icon = 'thumbs-o-up';
      this.setState({
        likeCounter: this.likeCounter,
        liked: false,
        icon: 'thumbs-o-up'
      });
      this.props.actions.doDislikeQSO(
        this.props.qso.idqsos,
        this.props.userInfo.idqras
      );
      this.doUnLike();
    }
  }

  render() {
    let icon;
    this.likeCounter = this.state.likeCounter;
    if (this.liked !== true && this.liked !== false) {
      icon = this.state.icon;
      this.liked = this.state.liked;
    } else if (this.liked) icon = 'thumbs-up';
    else icon = 'thumbs-o-up';

    let counter = this.likeCounter > 0 ? this.likeCounter.toString() : null;
    // if (!counter) counter = this.state.likeCounter.toString();
    return (
      <Button
        type="clear"
        icon={<Icon name={icon} type="font-awesome" />}
        // active={false}
        onPress={() => this.handleOnLike()}
        title={counter}
      />
    );
  }
}
const selectorFeedType = (state, ownProps) => {
  if (ownProps.feedType === 'MAIN')
    return state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'PROFILE')
    return state.sqso.feed.qra.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'FIELDDAYS')
    return state.sqso.feed.fieldDays.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'DETAIL') return state.sqso.feed.qso;
  else return null;
};
const selectorFeedTypeLikes = (state, ownProps) => {
  if (ownProps.feedType === 'MAIN')
    return state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos).likes;
  else if (ownProps.feedType === 'PROFILE')
    return state.sqso.feed.qra.qsos.find((q) => q.idqsos === ownProps.idqsos)
      .likes;
  else if (ownProps.feedType === 'FIELDDAYS')
    return state.sqso.feed.fieldDays.find((q) => q.idqsos === ownProps.idqsos)
      .likes;
  else if (ownProps.feedType === 'DETAIL' && state.sqso.feed.qso)
    return state.sqso.feed.qso.likes;
  else return null;
};
const mapStateToProps = (state, ownProps) => ({
  currentQRA: state.sqso.qra,
  userInfo: state.sqso.userInfo,
  qso: selectorFeedType(state, ownProps),
  likes: selectorFeedTypeLikes(state, ownProps),
  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QSOLikeButton);
