import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
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
      qraError: null
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    if (this.props.qra) this.setState({ qra: this.props.qra });
    if (__DEV__) this.setState({ adActive: false });

    //Following
    // if (

    //   this.props.userFetched &&
    //   !this.props.fetchingQRA &&
    //   this.props.QRAFetched
    // ) {
    //   this.followed = this.props.following.some(
    //     o => o.qra === this.props.qraInfo.qra
    //   );
    //   this.setState({ followed: this.followed });
    // }

    //Comentado Adsense
    // window.googletag.cmd.push(function () {
    //   window.googletag.destroySlots();
    //   window.googletag
    //     .defineSlot(
    //       '/22031658057/qraDetail/qraDetail_left',
    //       [160, 600],
    //       'div-ads-instance-qraDetail-left'
    //     )
    //     .addService(window.googletag.pubads());
    //   window.googletag
    //     .defineSlot(
    //       '/22031658057/qraDetail/qraDetail_right',
    //       [160, 600],
    //       'div-ads-instance-qraDetail-right'
    //     )
    //     .addService(window.googletag.pubads());
    //   window.googletag.pubads().enableSingleRequest();
    //   window.googletag.enableServices();
    // });

    const { navigation } = this.props;
    const qraInMemory = navigation.getParam('qra', 'NO-ID');
    // let qraInMemory = this.props.qra ? this.props.qra.qra.qra : '';
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
      case 2:
        this.props.history.push('/' + this.props.match.params.qra + '/bio');
        break;
      case 3:
        this.props.history.push('/' + this.props.match.params.qra + '/info');
        break;
      case 4:
        this.props.history.push(
          '/' + this.props.match.params.qra + '/following'
        );
        break;
      default:
        this.props.history.push(
          '/' + this.props.navigation.getParam('qra', 'NO-ID')
        );
        break;
    }
    this.setState({ tab: i });
  }
  handleButtonClick() {
    // if (!this.props.token) return null;
    // if (
    //   // !this.props.following.some(o => o.qra === this.props.match.params.qra)
    //   !this.followed
    // ) {
    //   // if (!__DEV__)
    //   // window.gtag('event', 'qraFollowProfile_WEBPRD', {
    //   //   event_category: 'User',
    //   //   event_label: 'follow'
    //   // });
    //   this.props.actions.doFollowQRA(
    //     this.props.token,
    //     this.props.match.params.qra
    //   );
    //   this.followed = true;
    //   this.setState({ followed: this.followed });
    // } else {
    //   this.props.actions.doUnfollowQRA(
    //     this.props.token,
    //     this.props.match.params.qra
    //   );
    //   this.followed = false;
    //   this.setState({ followed: this.followed });
    // }
    // // this.setState(prevState => {
    // //   return {
    // //     followed: !prevState.followed
    // //   };
    // // });
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
            onClick={this.handleButtonClick}
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

const mapStateToProps = (state, ownProps) => ({
  currentQRA: state.sqso.qra,

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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QRAProfileContainer);
