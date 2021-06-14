//import i18n from 'i18next';
import React from 'react';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import FeedItemHeader from './FeedItemHeader';
import FeedMedia from './FeedMedia';
import FeedSocialButtons from './FeedSocialButtons';
import QRAs from './QRAs';
class FeedItemRepost extends React.PureComponent {
  constructor() {
    super();
    this.state = { comments: [], likes: [], error: null };
  }

  // static getDerivedStateFromProps(props, prevState) {
  //   if (props.qso.comments !== prevState.comments) {
  //     return {showComments: false, comments: props.qso.comments };
  //   }
  //   if (props.qso.likes !== prevState.likes) {
  //     return { likes: props.qso.likes };
  //   }
  //   return null;
  // }
  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.qso) !== JSON.stringify(prevProps.qso))
      this.setState({
        qso: this.props.qso,
        comments: this.props.qso.comments,
        likes: this.props.qso.likes
      });
  }
  render() {
    const commentsCounter = '(' + this.props.qso.comments.length + ')';

    let text;
    let shareText;
    switch (this.props.qso.original[0].type) {
      case 'QSO':
        text = I18n.t('qso.workedAQSO');
        shareText = I18n.t('qso.checkOutQSO');
        break;
      case 'LISTEN':
        text = I18n.t('qso.listenedQSO');
        shareText = I18n.t('qso.checkOutQSO');
        break;
      case 'POST':
        text = I18n.t('qso.createdPost');
        shareText = I18n.t('qso.checkOutPost');
        break;
      case 'QAP':
        text = I18n.t('qso.createdQAP');
        shareText = I18n.t('qso.checkOutQAP');
        break;
      case 'FLDDAY':
        text = I18n.t('qso.createdFLDDAY');
        shareText = I18n.t('qso.checkOutFLDDAY');
        break;
      default:
    }
    var repostDate = new Date(this.props.qso.datetime);
    var date = new Date(this.props.qso.original[0].datetime);
    return (
      <Card containerStyle={{ padding: 0, margin: 0 }}>
        <FeedItemHeader
          feedType={this.props.feedType}
          idqsos={this.props.qso.idqsos}
        />
        <Card>
          <FeedItemHeader
            feedType={this.props.feedType}
            original={true}
            idqsos={this.props.qso.idqsos}
          />
          {this.props.feedType !== 'SEARCH' && (
            <QRAs
              feedType={this.props.feedType}
              avatarpic={this.props.qso.avatarpic}
              qso_owner={this.props.qso.qra}
              qras={this.props.qso.qras}
            />
          )}
          <FeedMedia
            // qso={this.props.qso}
            feedType={this.props.feedType}
            idqsos={this.props.idqsos}
            qso_owner={this.props.qso.qra}
          />
        </Card>
        {this.props.feedType !== 'SEARCH' && (
          <FeedSocialButtons
            feedType={this.props.feedType}
            comments={this.props.qso.comments}
            idqsos={this.props.idqsos}
            index={this.props.index}
            qso_owner={this.props.qso.qra}
            shareText={shareText}
          />
        )}
      </Card>
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
  else if (ownProps.feedType === 'SEARCH')
    return state.sqso.feed.searchedResults.find(
      (q) => q.idqsos === ownProps.idqsos
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(FeedItemRepost);
