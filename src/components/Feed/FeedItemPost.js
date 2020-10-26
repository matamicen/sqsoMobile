//import i18n from 'i18next';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
//import I18n from '../../utils/i18n';;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import * as Actions from '../../actions';
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
     

    // let picList = this.props.qso.media.filter(media => media.type === 'image');
    // let audioList = this.props.qso.media.filter(
    //   media => media.type === 'audio'
    // );

    // const commentsCounter = '(' + this.props.qso.comments.length + ')';

    let text;
    // let shareText;

    switch (this.props.qso.type) {
      case 'POST':
        text = I18n.t('qso.createdPost');
        // shareText = I18n.t('qso.checkOutPost');
        break;
      case 'QAP':
        text = I18n.t('qso.createdQAP');
        // shareText = I18n.t('qso.checkOutQAP');
        break;
      case 'FLDDAY':
        text = I18n.t('qso.createdFLDDAY');
        // shareText = I18n.t('qso.checkOutFLDDAY');
        break;
      default:
    }
    var date = new Date(this.props.qso.datetime);

    return (
      <Fragment>
        <Segment raised>
          <View className="qso-header">
            <View
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
            </View>
          </View>

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
          cancelButton={I18n.t('global.cancel')}
          confirmButton={I18n.t('auth.login')}
          content={I18n.t('auth.loginToPerformAction')}
        /> */}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, qsos) => ({
  fetchingQSOS: state.FetchingQSOS,
  qsosFetched: state.qsosFetched,
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(FeedItemPost);
FeedItemPost.propTypes = {
  qso: PropTypes.object.isRequired
};
