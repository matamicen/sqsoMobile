import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import FeedItemHeader from './FeedItemHeader';
import FeedMedia from './FeedMedia';
import FeedSocialButtons from './FeedSocialButtons';
import QRAs from './QRAs';
// import './style.js';

class FeedItemQSO extends React.Component {
  constructor() {
    super();
    this.state = { showComments: false, comments: [], likes: [], error: null };
  }

  //     }
  // static getDerivedStateFromProps(props, prevState) {
  //   if (props.qso.comments !== prevState.comments) {
  //     console.log('update');
  //     return { qso: props.qso, comments: props.qso.comments };
  //   }
  //   if (props.qso.likes !== prevState.likes) {
  //     return { qso: props.qso, likes: props.qso.likes };
  //   }
  //   return null;
  // }
  shouldComponentUpdate() {
    return this.props.qso ? true : false;
  }
  render() {
    let shareText;

    switch (this.props.qso.type) {
      case 'QSO':
        // text = I18n.t('qso.workedAQSO');
        shareText = I18n.t('qso.checkOutQSO');
        break;
      case 'LISTEN':
        // text = I18n.t('qso.listenedQSO');
        shareText = I18n.t('qso.checkOutQSO');
        break;
      case 'SHARE':
        // text = I18n.t('qso.repostedQSO');
        shareText = I18n.t('qso.checkOutPost');
        break;
      case 'POST':
        // text = I18n.t('qso.createdPost');
        shareText = I18n.t('qso.checkOutPost');
        break;
      case 'QAP':
        // text = I18n.t('qso.createdQAP');
        shareText = I18n.t('qso.checkOutQAP');
        break;
      case 'FLDDAY':
        // text = I18n.t('qso.createdFLDDAY');
        shareText = I18n.t('qso.checkOutFLDDAY');
        break;
      default:
    }
    return (
      // <Fragment>
      //   <Segment raised>
      //     <View className="qso-header">

      //       {/* {date.toLocaleDateString("i18n.language", {month: "short"}) + ' ' + date.getDate() + ', ' + date.getFullYear()} */}
      //       <View
      //         className="qso-header-button"
      //         style={{
      //           float: 'right'
      //         }}>
      //         <FeedOptionsMenu
      //           qso_owner={this.props.qso.qra}
      //           idqso={this.props.qso.idqsos}
      //           guid={this.props.qso.GUID_QR}
      //           qso={this.props.qso}
      //           optionsCaller="FeedItem"
      //           QslCard={
      //             this.props.currentQRA === this.props.qso.qra ||
      //             this.props.qso.qras.some(
      //               (o) => o.qra === this.props.currentQRA
      //             )
      //           }
      //         />
      //       </View>
      //     </View>

      //     {this.props.qso.links && (
      //       <FeedLinkList links={this.props.qso.links} />
      //     )}
      //     <Divider hidden style={{ marginTop: '1vh' }} />

      //     <Button.Group fluid basic>
      //       <QSOLikeButton
      //         qso={this.props.qso}
      //         recalculateRowHeight={this.recalculateRowHeight}
      //       />
      //       <Button onClick={() => this.setState({ showComments: true })}>
      //         <View>
      //           <Icon name="comment outline" />{' '}
      //           {this.props.qso.comments.length > 0 && commentsCounter}
      //         </View>
      //       </Button>
      //       <QSORePostButton qso={this.props.qso} />
      //       <QSOShareButtons
      //         idqso={this.props.qso.GUID_URL}
      //         title={shareText}
      //       />
      //     </Button.Group>

      //     {this.state.showComments && (
      //       <QSOComments
      //         showComments={this.state.showComments}
      //         doClose={() => this.setState({ showComments: false })}
      //         index={this.props.index}
      //         qso={this.props.qso}
      //         comments={this.props.comments}
      //         recalculateRowHeight={this.recalculateRowHeight}
      //       />
      //     )}
      //   </Segment>
      //   {/* <Confirm
      //     size="mini"
      //     open={this.state.openLogin}
      //     onCancel={() => this.setState({ openLogin: false })}
      //     onConfirm={() =>
      //       this.props.history.push({
      //         pathname: '/login',
      //         state: { from: this.props.location.pathname }
      //       })
      //     }
      //     cancelButton={I18n.t('global.cancel')}
      //     confirmButton={I18n.t('auth.login')}
      //     content={I18n.t('auth.loginToPerformAction')}
      //   /> */}
      // </Fragment>
      <Card containerStyle={{ padding: 0, margin: 0 }}>
        <FeedItemHeader
          feedType={this.props.feedType}
          idqsos={this.props.qso.idqsos}
        />
        <QRAs
          feedType={this.props.feedType}
          avatarpic={this.props.qso.avatarpic}
          qso_owner={this.props.qso.qra}
          qras={this.props.qso.qras}
        />

        <FeedMedia
          // qso={this.props.qso}
          feedType={this.props.feedType}
          currentIndex={this.props.currentIndex}
          currentVisibleIndex={this.props.currentVisibleIndex}
          idqsos={this.props.idqsos}
          qso_owner={this.props.qso.qra}
        />
        {/* <QSOLikeText qso={qso} likes={this.state.likes} /> */}
        <FeedSocialButtons
          feedType={this.props.feedType}
          comments={this.props.qso.comments}
          idqsos={this.props.idqsos}
          index={this.props.index}
          qso_owner={this.props.qso.qra}
          shareText={shareText}
        />
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
    // flexGrow: 1
    // marginTop: Constants.statusBarHeight
  }
});
const selectorFeedType = (state, ownProps) => {
  if (ownProps.feedType === 'MAIN')
    return state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'PROFILE')
    return state.sqso.feed.qra.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'FIELDDAYS')
    return state.sqso.feed.fieldDays.find((q) => q.idqsos === ownProps.idqsos);
  else return null;
};
const mapStateToProps = (state, ownProps) => ({
  fetchingQSOS: state.sqso.feed.FetchingQSOS,
  qso: selectorFeedType(state, ownProps),
  qsosFetched: state.sqso.feed.qsosFetched,
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(FeedItemQSO);
// FeedItemQSO.propTypes = {
//   qso: PropTypes.object.isRequired
// };
