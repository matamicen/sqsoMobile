import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
//import I18n from '../../utils/i18n';;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import QSOComments from './QSOComments';
import QSOLikeButton from './QSOLikeButton';
import QSOLikeText from './QSOLikeText';
import QSORePostButton from './QSORePostButton';
import QSOShareButtons from './QSOShareButtons';
// import './style.js';

class FeedSocialButtons extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      qso: null,
      showComments: false,
      comments: [],
      likes: [],
      error: null
    };
  }

  render() {
    const commentsCounter = '(' + this.props.qso.comments.length + ')';
    // let shareText;

    // switch (this.props.qso.type) {
    //   case 'POST':
    //     // text = I18n.t('qso.createdPost');
    //     shareText = I18n.t('qso.checkOutPost');
    //     break;
    //   case 'QAP':
    //     // text = I18n.t('qso.createdQAP');
    //     shareText = I18n.t('qso.checkOutQAP');
    //     break;
    //   case 'FLDDAY':
    //     // text = I18n.t('qso.createdFLDDAY');
    //     shareText = I18n.t('qso.checkOutFLDDAY');
    //     break;
    //   default:
    // }
    if (this.props.qso)
      return (
        <View style={styles.container}>
          <QSOLikeText
            feedType={this.props.feedType}
            // qso={this.props.qso}
            // likes={this.props.qso.likes}
            idqsos={this.props.idqsos}
          />
          <View style={styles.buttons}>
            <View style={styles.like}>
              <QSOLikeButton
                feedType={this.props.feedType}
                // qso={this.props.qso}
                idqsos={this.props.idqsos}
              />
            </View>
            <View style={styles.comment}>
              <Button
                type="clear"
                icon={<Icon name="comment-o" type="font-awesome" />}
                onPress={() => this.setState({ showComments: true })}
                title={
                  this.props.qso.comments.length > 0 ? commentsCounter : ''
                }
              />
            </View>
            <View style={styles.repost}>
              <QSORePostButton
                feedType={this.props.feedType}
                idqsos={this.props.idqsos}
                // qso={this.props.qso}
              />
            </View>
            <View style={styles.share}>
              <QSOShareButtons
                feedType={this.props.feedType}
                idqso={this.props.qso.GUID_URL}
                idqsos={this.props.idqsos}
                title={this.props.shareText}
              />
            </View>
          </View>
          {this.state.showComments && (
            <QSOComments
              feedType={this.props.feedType}
              showComments={this.state.showComments}
              doClose={() => this.setState({ showComments: false })}
              index={this.props.index}
              // qso={this.props.qso}
              idqsos={this.props.idqsos}
              // comments={this.props.comments}
              // recalculateRowHeight={this.props.recalculateRowHeight}
            />
          )}
        </View>
      );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column' },

  buttons: { flex: 1, flexDirection: 'row' },
  like: { flex: 1 },
  comment: { flex: 1 },
  repost: { flex: 1 },
  share: { flex: 1 }
});
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
const mapStateToProps = (state, ownProps) => ({
  token: state.sqso.jwtToken,
  qso: selectorFeedType(state, ownProps),
  comments: state.sqso.feed.qso
    ? selectorFeedType(state, ownProps).comments
    : [],
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(FeedSocialButtons);
// export default connect(mapStateToProps, mapDispatchToProps, null, {
//   pure: false
// })(FeedSocialButtons);
