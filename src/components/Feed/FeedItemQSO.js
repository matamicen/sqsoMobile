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

class FeedItemQSO extends React.PureComponent {
  constructor() {
    super();
    this.state = { showComments: false, comments: [], likes: [], error: null };
  }

  //     }
  // static getDerivedStateFromProps(props, prevState) {
  //   if (props.qso.comments !== prevState.comments) {

  //     return { qso: props.qso, comments: props.qso.comments };
  //   }
  //   if (props.qso.likes !== prevState.likes) {
  //     return { qso: props.qso, likes: props.qso.likes };
  //   }
  //   return null;
  // }

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
      <Card containerStyle={{ padding: 0, margin: 0 }}>
        <FeedItemHeader
          feedType={this.props.feedType}
          idqsos={this.props.qso.idqsos}
        />
        {/* {this.props.feedType !== 'SEARCH' && ( */}
          <QRAs
            feedType={this.props.feedType}
            avatarpic={this.props.qso.avatarpic}
            qso_owner={this.props.qso.qra}
            qras={this.props.qso.qras}
          />
        {/* )}  */}
        <FeedMedia
          // qso={this.props.qso}
          feedType={this.props.feedType}
          currentIndex={this.props.currentIndex}
          currentVisibleIndex={this.props.currentVisibleIndex}
          idqsos={this.props.idqsos}
          qso_owner={this.props.qso.qra}
        />
        {/* {this.props.feedType !== 'SEARCH' && (  */}
          <FeedSocialButtons
            feedType={this.props.feedType}
            comments={this.props.qso.comments}
            idqsos={this.props.idqsos}
            index={this.props.index}
            qso_owner={this.props.qso.qra}
            shareText={shareText}
          />
       {/* )}   */}
      </Card>
    );
  }
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start'
//     // flexGrow: 1
//     // marginTop: Constants.statusBarHeight
//   }
// });
const selectorFeedType = (state, ownProps) => {
  if (ownProps.feedType === 'MAIN'){ 
    return state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos);
  }
  else if (ownProps.feedType === 'PROFILE')
    return state.sqso.feed.qra.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'FIELDDAYS')
    return state.sqso.feed.fieldDays.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'SEARCH')
    return state.sqso.feed.searchedResults.find((q) => q.idqsos === ownProps.idqsos);
  
  else if (ownProps.feedType === 'DETAIL') return state.sqso.feed.qso;
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
