import React from 'react';
import { Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { userNotValidated } from '../../helper';
import I18n from '../../utils/i18n';
class QSORePostButton extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showConfirmationRequest: false
    };
  }

  doRePost() {
    if (this.props.userinfo.pendingVerification) userNotValidated();
    else {
      this.setState({ showConfirmationRequest: false });
      this.props.actions.doRepost(
        this.props.qso.type === 'SHARE'
          ? this.props.qso.idqso_shared
          : this.props.qso.idqsos,
        this.props.token,
        this.props.qso
      );
    }
  }

  // openConfirmationRequest() {
  //   this.setState({ showConfirmationRequest: true });
  // }

  // close = () => {
  //   this.setState({ showReportContent: false });
  // };
  confirmationAlert = () =>
    Alert.alert(
      I18n.t('qso.repost'),
      I18n.t('qso.confirmRepost'),
      [
        {
          text: 'Cancel',
          onPress: () => this.setState({ showConfirmationRequest: false }),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.doRePost() }
      ],
      { cancelable: false }
    );
  render() {
    // const { showConfirmationRequest } = this.state;
    return (
      <Button
        type="clear"
        icon={<Icon name="retweet" type="font-awesome" />}
        onPress={() => this.confirmationAlert()}
        // title={I18n.t('qso.repost')}>
      >
        {/* <View style={{ justifyItems: 'center' }}>
            <Text style={{ fontSize: 1 }} />
          </View> */}
      </Button>
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
  else if (ownProps.feedType === 'DETAIL') return state.sqso.feed.qso;
  else return null;
};
const mapStateToProps = (state, ownProps) => ({
  token: state.sqso.jwtToken,
  userinfo: state.sqso.userInfo,
  qso: selectorFeedType(state, ownProps)
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(QSORePostButton);
// export default connect(mapStateToProps, mapDispatchToProps, null, {
//   pure: false
// })(QSORePostButton);
