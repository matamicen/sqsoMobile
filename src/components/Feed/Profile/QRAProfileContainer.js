import React, { Fragment } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { userNotValidated } from '../../../helper';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import analytics from '@react-native-firebase/analytics';
import QRAProfile from './QRAProfilePresentational';

class QRAProfileContainer extends React.PureComponent {
  constructor() {
    super();
    this.followed = null;
    this.state = {
      loaderActive: true,
      adActive: false,
      adClosed: false,
      tab: null,
      followed: null,
      qra: null,
      qraError: null,
      openMenu: true
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    if (this.props.qra) this.setState({ qra: this.props.qra });
    if (__DEV__) this.setState({ adActive: false });

    this.props.navigation.setParams({
      openMenu: () => {
        return <View />;
      }
    });

    const { navigation } = this.props;
    let qraInMemory = navigation.getParam('qra', this.props.currentQRA);
    let screen = navigation.getParam('screen');

    if (screen === 'MYPOSTS') qraInMemory = this.props.currentQRA;
    // let qraInMemory = this.props.qra ? this.props.qra.qra.qra : '';
    qraInMemory = qraInMemory ? qraInMemory : this.props.currentQRA;
    console.log('qraInMemory ' + qraInMemory);

    if (
      (!this.props.fetchingQRA && !this.props.QRAFetched) ||
      this.props.QRAFetched
    ) {
      this.props.actions.clearQRA();
      this.props.actions.doFetchQRA(qraInMemory, this.props.token);
    }
    switch (this.props.tab) {
      case 'BIO':
        this.setState({ tab: 2 });
        break;
      case 'INFO':
        this.setState({ tab: 3 });
        break;
      case 'FOLLOWING':
        this.setState({ tab: 4 });
        break;
      default:
        this.setState({ tab: 1 });
        break;
    }
  }
  // handleOpen = () => this.setState({ adActive: true });
  // handleClose = () => this.setState({ adActive: false, adClosed: true });
  componentDidUpdate(prevProps, prevState) {
    if (this.props.qra !== prevProps.qra)
      this.setState({ qra: this.props.qra });
    if (this.props.qraError && prevState.loaderActive) {
      this.setState({
        qraError: this.props.qraError,
        loaderActive: false
      });
    }
  }

  // static getDerivedStateFromProps(props, prevState) {
  // let followed;

  // if (props.QRAFetched && prevState.loaderActive) {
  //   if (
  //     // process.env.NODE_ENV === 'production' &&
  //     !prevState.adClosed &&
  //     props.qraUserData &&
  //     props.qraUserData.account_type &&
  //     props.qraUserData.monthly_qra_views >
  //       props.qraUserData.account_type.web_qra_profile_view
  //   ) {
  //     return {
  //       adActive: true,
  //       qra: props.qra,
  //       // followed: props.following.some(o => o.qra === props.match.params.qra),
  //       loaderActive: false
  //     };
  //   } else {
  //     return {
  //       // followed: props.following.some(o => o.qra === props.match.params.qra),
  //       loaderActive: false,
  //       qra: props.qra
  //     };
  //   }
  // }
  // if (!props.qra && !prevState.loaderActive) {
  //   return { loaderActive: true };
  // }

  // if (
  //   process.env.NODE_ENV === 'production' &&
  //   !prevState.adClosed &&
  //   props.qraUserData &&
  //   props.qraUserData.account_type &&
  //   props.qraUserData.monthly_qra_views >
  //     props.qraUserData.account_type.web_qra_profile_view
  // ) {
  //   return {
  //     // followed :   props.following.some(o => o.qra === props.match.params.qra),
  //     adActive: true
  //   };
  // }

  //Default
  // return {
  //   followed :   props.following.some(o => o.qra === props.match.params.qra)

  // };
  //   return { qra: props.qra };
  // }
  handleTabClick(i) {
    switch (i) {
      // case 2:
      //   this.props.history.push('/' + this.props.match.params.qra + '/bio');
      //   break;
      // case 3:
      //   this.props.history.push('/' + this.props.match.params.qra + '/info');
      //   break;
      // case 4:
      //   this.props.history.push(
      //     '/' + this.props.match.params.qra + '/following'
      //   );
      //   break;
      default:
        this.props.history.push(
          '/' + this.props.navigation.getParam('qra', 'NO-ID')
        );
        break;
    }
    this.setState({ tab: i });
  }
  handleButtonClick() {
    if (!this.props.token) return null;
    if (this.props.userinfo.pendingVerification) userNotValidated();
    else {
      if (
        // !this.props.following.some(o => o.qra === this.props.match.params.qra)
        !this.followed
      ) {
        // if (!__DEV__)
        // window.gtag('event', 'qraFollowProfile_APPPRD', {
        //   event_category: 'User',
        //   event_label: 'follow'
        // });
        if (!__DEV__) analytics().logEvent('qraFollowProfile_APPPRD');
        this.props.actions.doFollowQRA(
          this.props.token,
          this.props.qra.qra.qra
        );
        this.followed = true;
        this.setState({ followed: this.followed });
      } else {
        if (!__DEV__) analytics().logEvent('qraUnFollowProfile_APPPRD');
        this.props.actions.doUnfollowQRA(
          this.props.token,
          this.props.qra.qra.qra
        );
        this.followed = false;
        this.setState({ followed: this.followed });
      }
    }
    // this.setState(prevState => {
    //   return {
    //     followed: !prevState.followed
    //   };
    // });
  }
  // shouldComponentUpdate() {
  //   return this.props.qra ? true : false;
  // }
  render() {
    let qraInfo = null;
    if (this.props.qra) qraInfo = this.props.qra.qra;

    // if (this.props.qraError) {
    //   return (
    //     // <Modal
    //     //   open={this.props.qraError ? true : false}
    //     //   onClose={() => this.props.history.push('/')}
    //     //   size="small">
    //     //   <Modal.Content>
    //     //     <p align="center">{this.props.qraError}</p>
    //     //   </Modal.Content>
    //     // </Modal>
    //   );
    // }
    if (
      // this.props.userFetched &&
      // !this.props.fetchingQRA &&
      this.props.QRAFetched &&
      this.followed !== true &&
      this.followed !== false &&
      this.state.followed === this.followed
    ) {
      this.followed = this.props.following.some(
        (o) => o.qra === this.props.navigation.getParam('qra', 'NO-ID')
      );
    }
    if (this.props.fetchingQRA) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }
    return (
      <Fragment>
        {/* //   <Dimmer active={this.state.loaderActive} page>
      //     <Loader>{I18n.t('qra.loading')}</Loader>
      //   </Dimmer>  */}
        {qraInfo && (
          <QRAProfile
            qraInfo={qraInfo}
            following={this.props.following}
            followers={this.props.followers}
            loaderActive={this.state.loaderActive}
            qra={this.state.qra}
            onClick={() => this.handleButtonClick()}
            userFetched={this.props.userFetched}
            currentQRA={this.props.currentQRA}
            followed={this.followed}
            handleTabClick={this.handleTabClick}
            tab={this.state.tab}
            adActive={this.state.adActive}
            handleClose={this.handleClose}
            fetchingQRA={this.props.fetchingQRA}
            QRAFetched={this.props.QRAFetched}
          />
        )}
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  trigger: {
    padding: 5,
    margin: 5
  },
  text: {
    fontSize: 30,
    backgroundColor: 'gray'
  },
  slideInOption: {
    padding: 5
  }
});
const mapStateToProps = (state, ownProps) => ({
  currentQRA: state.sqso.qra,
  userinfo: state.sqso.userInfo,
  followers: state.sqso.currentQso.followers,
  following: state.sqso.currentQso.followings,
  token: state.sqso.jwtToken,
  fetchingQRA: state.sqso.feed.FetchingQRA,
  // userFetched: state.userData.userFetched,
  QRAFetched: state.sqso.feed.QRAFetched,
  qra: state.sqso.feed.qra,
  qraUserData: state.sqso.feed.userData.qra,
  // fetchingUser: state.userData.fetchingUser,

  qraError: state.sqso.feed.qraError
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(QRAProfileContainer)
);
