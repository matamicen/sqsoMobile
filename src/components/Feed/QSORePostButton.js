import React from 'react';
import { Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
class QSORePostButton extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showConfirmationRequest: false
    };
  }

  doRePost() {
    this.setState({ showConfirmationRequest: false });
    this.props.actions.doRepost(
      this.props.qso.type === 'SHARE'
        ? this.props.qso.idqso_shared
        : this.props.qso.idqsos,
      this.props.token,
      this.props.qso
    );
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

const mapStateToProps = (state, ownProps) => ({
  token: state.sqso.jwtToken,
  qso: state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos)
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(QSORePostButton);
