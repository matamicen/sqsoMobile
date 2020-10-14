import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Modal } from 'semantic-ui-react';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';
import * as Actions from '../../actions';
import '../../styles/style.css';
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
    if (process.env.NODE_ENV !== 'production')
      this.setState({ adActive: false });

    //Following
    // if (
    //   this.props.isAuthenticated &&
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
    window.googletag.cmd.push(function() {
      window.googletag.destroySlots();
      window.googletag
        .defineSlot(
          '/22031658057/qraDetail/qraDetail_left',
          [160, 600],
          'div-ads-instance-qraDetail-left'
        )
        .addService(window.googletag.pubads());
      window.googletag
        .defineSlot(
          '/22031658057/qraDetail/qraDetail_right',
          [160, 600],
          'div-ads-instance-qraDetail-right'
        )
        .addService(window.googletag.pubads());
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
    });
    let qraInMemory = this.props.qra ? this.props.qra.qra.qra : '';

    if (
      (!this.props.fetchingQRA && !this.props.QRAFetched) ||
      (this.props.QRAFetched && this.props.match.params.qra !== qraInMemory)
    ) {
      this.props.actions.clearQRA();
      this.props.actions.doFetchQRA(
        this.props.match.params.qra,
        this.props.token
      );
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
  handleOpen = () => this.setState({ adActive: true });
  handleClose = () => this.setState({ adActive: false, adClosed: true });
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

  static getDerivedStateFromProps(props, prevState) {
    // let followed;

    if (props.QRAFetched && prevState.loaderActive) {
      if (
        // process.env.NODE_ENV === 'production' &&
        !prevState.adClosed &&
        props.qraUserData &&
        props.qraUserData.account_type &&
        props.qraUserData.monthly_qra_views >
          props.qraUserData.account_type.web_qra_profile_view
      ) {
        return {
          adActive: true,
          qra: props.qra,
          // followed: props.following.some(o => o.qra === props.match.params.qra),
          loaderActive: false
        };
      } else if (
        // process.env.NODE_ENV === 'production' &&
        !props.isAuthenticated
      ) {
        return {
          adActive: true,
          qra: props.qra,
          loaderActive: false
        };
      } else {
        return {
          // followed: props.following.some(o => o.qra === props.match.params.qra),
          loaderActive: false,
          qra: props.qra
        };
      }
    }
    if (!props.qra && !prevState.loaderActive) {
      return { loaderActive: true };
    }

    if (
      process.env.NODE_ENV === 'production' &&
      !prevState.adClosed &&
      props.qraUserData &&
      props.qraUserData.account_type &&
      props.qraUserData.monthly_qra_views >
        props.qraUserData.account_type.web_qra_profile_view
    ) {
      return {
        // followed :   props.following.some(o => o.qra === props.match.params.qra),
        adActive: true
      };
    }

    //Default
    // return {
    //   followed :   props.following.some(o => o.qra === props.match.params.qra)

    // };
    return { qra: props.qra };
  }
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
        this.props.history.push('/' + this.props.match.params.qra);
        break;
    }
    this.setState({ tab: i });
  }
  handleButtonClick() {
    if (!this.props.token) return null;
    if (
      // !this.props.following.some(o => o.qra === this.props.match.params.qra)
      !this.followed
    ) {
      if (this.props.isAuthenticated) {
        if (process.env.REACT_APP_STAGE === 'production')
          window.gtag('event', 'qraFollowProfile_WEBPRD', {
            event_category: 'User',
            event_label: 'follow'
          });
        this.props.actions.doFollowQRA(
          this.props.token,
          this.props.match.params.qra
        );
        this.followed = true;
        this.setState({ followed: this.followed });
      }
    } else {
      if (this.props.isAuthenticated) {
        this.props.actions.doUnfollowQRA(
          this.props.token,
          this.props.match.params.qra
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

  render() {
    const { t } = this.props;
    let qraInfo = null;
    if (this.props.qra) qraInfo = this.props.qra.qra;

    if (this.props.qraError) {
      return (
        <Modal
          open={this.props.qraError ? true : false}
          onClose={() =>  this.props.history.push('/')}
          size="small"
        >
          <Modal.Content>
            <p align="center">{this.props.qraError}</p>
          </Modal.Content>
        </Modal>
      );
    }
    if (
      this.props.isAuthenticated &&
      this.props.userFetched &&
      !this.props.fetchingQRA &&
      this.props.QRAFetched &&
      this.followed !== true &&
      this.followed !== false &&
      this.state.followed === this.followed
    ) {
      this.followed = this.props.following.some(
        o => o.qra === this.props.match.params.qra
      );
    }
    return (
      <Fragment>
        <Dimmer active={this.state.loaderActive} page>
          <Loader>{t('qra.loading')}</Loader>
        </Dimmer>
        {qraInfo && (
          <QRAProfile
            qraInfo={qraInfo}
            following={this.props.following}
            followers={this.props.followers}
            loaderActive={this.state.loaderActive}
            qra={this.state.qra}
            onClick={this.handleButtonClick}
            isAuthenticated={this.props.isAuthenticated}
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
  currentQRA: state.userData.currentQRA,
  isAuthenticated: state.userData.isAuthenticated,
  following: state.userData.following,
  followers: state.userData.followers,
  token: state.userData.token,
  fetchingQRA: state.FetchingQRA,
  userFetched: state.userData.userFetched,
  QRAFetched: state.QRAFetched,
  qra: state.qra,
  qraUserData: state.userData.qra,
  fetchingUser: state.userData.fetchingUser,

  qraError: state.qraError
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { pure: false }
  )(withTranslation()(QRAProfileContainer))
);
