//import i18n from 'i18next';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
//import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import * as Actions from '../../actions';
import PopupToFollow from '../PopupToFollow';
import TextToFollow from '../TextToFollow';
import FeedLinkList from './FeedLinkList';
import FeedMedia from './FeedMedia';
import FeedOptionsMenu from './FeedOptionsMenu';
import FeedSocialButtons from './FeedSocialButtons';
import QRAs from './QRAs';
import './style.js';
class FeedItemPost extends React.Component {
  constructor() {
    super();
    this.state = {
      showComments: false,
      comments: [],
      likes: [],
      error: null,
      qso: null
    };

    this.recalculateRowHeight = this.recalculateRowHeight.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.qso) !== JSON.stringify(prevProps.qso))
      this.setState({
        qso: this.props.qso,
        comments: this.props.qso.comments,
        likes: this.props.qso.likes
      });
  }

  recalculateRowHeight() {
    if (this.props.recalculateRowHeight)
      this.props.recalculateRowHeight(this.props.index);
  }

  //     }
  // static getDerivedStateFromProps(props, prevState) {
  //   if (props.qso.comments !== prevState.comments)
  //     return { comments: props.qso.comments };
  //   if (props.qso.likes !== prevState.likes) {
  //     return { likes: props.qso.likes };
  //   }
  //   return null;
  // }
  render() {
    const { t } = this.props;

    // let picList = this.props.qso.media.filter(media => media.type === 'image');
    // let audioList = this.props.qso.media.filter(
    //   media => media.type === 'audio'
    // );

    // const commentsCounter = '(' + this.props.qso.comments.length + ')';

    let text;
    // let shareText;

    switch (this.props.qso.type) {
      case 'POST':
        text = t('qso.createdPost');
        // shareText = t('qso.checkOutPost');
        break;
      case 'QAP':
        text = t('qso.createdQAP');
        // shareText = t('qso.checkOutQAP');
        break;
      case 'FLDDAY':
        text = t('qso.createdFLDDAY');
        // shareText = t('qso.checkOutFLDDAY');
        break;
      default:
    }
    var date = new Date(this.props.qso.datetime);

    return (
      <Fragment>
        <Segment raised>
          <div className="qso-header">
            <div className="qso-avatar">
              <Link to={'/' + this.props.qso.qra}>
                <Image
                  src={
                    this.props.qso.avatarpic
                      ? this.props.qso.avatarpic
                      : '/emptyprofile.png'
                  }
                  size="mini"
                  avatar
                  style={{
                    width: '50px',
                    height: '50px'
                  }}
                />
              </Link>
              <TextToFollow qra={this.props.qso.qra} />
            </div>
            <div className="qso-header-action">
              <PopupToFollow
                qra={this.props.qso.qra}
                trigger={
                  <Link to={'/' + this.props.qso.qra}>
                    {this.props.qso.qra}
                  </Link>
                }
              />
              {text}
            </div>
            <div className="qso-header-info-post">
              <div>
                <b>{t('qso.date')}: </b>
                {date.toLocaleDateString(i18n.language, { month: 'short' }) +
                  ' ' +
                  date.getDate() +
                  ', ' +
                  date.getFullYear()}
              </div>
              <div>
                <b>UTC: </b>
                {date.getUTCHours() +
                  ':' +
                  (date.getMinutes() < 10 ? '0' : '') +
                  date.getMinutes()}
              </div>
            </div>

            <div
              className="qso-header-button"
              style={{
                float: 'right'
              }}>
              <FeedOptionsMenu
                qso_owner={this.props.qso.qra}
                idqso={this.props.qso.idqsos}
                guid={this.props.qso.GUID_QR}
                qso={this.props.qso}
                optionsCaller="FeedItem"
                QslCard={false}
              />
            </div>
          </div>

          {this.props.qso.qras.length > 0 && (
            <Fragment>
              <Divider
                hidden
                style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
              />

              <QRAs
                avatarpic={this.props.qso.avatarpic}
                qso_owner={this.props.qso.qra}
                qras={this.props.qso.qras}
              />
            </Fragment>
          )}
          <FeedMedia
            qso={this.props.qso}
            measure={this.props.measure}
            idqso={this.props.qso.idqsos}
            qso_owner={this.props.qso.qra}
            recalculateRowHeight={this.recalculateRowHeight}
          />

          {this.props.qso.links && (
            <FeedLinkList links={this.props.qso.links} />
          )}
          <Divider
            hidden
            style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
          />
          <FeedSocialButtons
            qso={this.props.qso}
            recalculateRowHeight={this.recalculateRowHeight}
            measure={this.props.measure}
            comments={this.props.comments}
            idqso={this.props.qso.idqsos}
            index={this.props.index}
            qso_owner={this.props.qso.qra}
          />
        </Segment>
        {/* <Confirm
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
        /> */}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, qsos) => ({
  isAuthenticated: state.userData.isAuthenticated,
  fetchingQSOS: state.FetchingQSOS,
  qsosFetched: state.qsosFetched,
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FeedItemPost))
);
FeedItemPost.propTypes = {
  qso: PropTypes.object.isRequired
};
