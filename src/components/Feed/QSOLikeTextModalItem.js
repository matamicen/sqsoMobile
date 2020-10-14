import React from 'react';
//import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import * as Actions from '../../actions';
class QSOLikeTextModalItem extends React.Component {
  constructor() {
    super();
    this.followed = null;
    this.state = { followed: null };
  }
  componentDidMount() {
    if (process.env.REACT_APP_STAGE === 'production')
      window.gtag('event', 'qsoLikeModalOpen_WEBPRD', {
        event_category: 'qso',
        event_label: 'qsoLikeModalOpen'
      });
    // this.setState({ likes: this.props.qso ? this.props.qso.likes : [] });
  }
  // static getDerivedStateFromProps(props, prevState) {
  //   if (props.qso.likes && props.qso.likes.length !== prevState.likes.length)
  //     return { likes: props.qso.likes };
  //   return null;
  // }
  handleButtonClick(idqra) {
    if (!this.props.userData.token) return null;
    if (this.props.userData.isAuthenticated) {
      if (!this.followed) {
        if (process.env.REACT_APP_STAGE === 'production')
          window.gtag('event', 'qraFollowLike_WEBPRD', {
            event_category: 'User',
            event_label: 'follow'
          });
        this.props.actions.doFollowQRA(this.props.userData.token, idqra);
        this.followed = true;
        this.setState({ followed: this.followed });
      } else {
        this.props.actions.doUnfollowQRA(this.props.userData.token, idqra);
        this.followed = false;
        this.setState({ followed: this.followed });
      }
    }
  }
  render() {
    const { l, t } = this.props;

    if (
      this.props.isAuthenticated &&
      this.props.userFetched &&
      this.followed !== true &&
      this.followed !== false &&
      this.state.followed === this.followed
    ) {
      this.followed = this.props.userData.following.some(
        o => o.idqra_followed === l.idqra
      );
    }
    return (
      <div key={l.qra} style={{ display: 'flex', paddingBottom: '10px' }}>
        <div
          style={{
            flex: '0 1 auto',
            justifyContent: 'center',
            paddingRigth: '5px'
          }}
        >
          <Link to={'/' + l.qra}>
            <Image
              src={l.avatarpic ? l.avatarpic : '/emptyprofile.png'}
              size="mini"
              avatar
              style={{
                width: '50px',
                height: '50px'
              }}
            />
          </Link>
        </div>
        <div
          style={{
            flex: '1 1 auto',
            justifyContent: 'center',
            paddingRigth: '5px'
          }}
        >
          <Link to={'/' + l.qra}>
            <span style={{ fontSize: '1.5rem' }}>{l.qra}</span>
            <br />
            <span style={{ fontSize: '1rem' }}>
              {l.firstname + ' ' + l.lastname}
            </span>
          </Link>
        </div>
        <div
          style={{
            flex: '0 1 auto',
            justifyContent: 'center',
            padding: '0'
          }}
        >
          {this.props.isAuthenticated &&
            !this.followed &&
            l.qra !== this.props.userData.currentQRA && (
              <Button
                style={{
                  
                  paddingLeft: '1em',
                  paddingRight: '1em'
                }}
                positive={!this.followed}
                onClick={() => this.handleButtonClick(l.qra)}
              >
                {this.props.followers.some(o => o.qra === l.qra)
                  ? t('qra.followToo')
                  : t('qra.follow')}
              </Button>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.userData.isAuthenticated,
  currentQRA: state.sqso.qra,
  userData: state.userData,
  followers: state.userData.followers,
  userFetched: state.userData.userFetched,
  token: state.sqso.jwtToken
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(QSOLikeTextModalItem))
);
