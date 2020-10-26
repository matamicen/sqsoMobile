import React, { Fragment } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
class QSORePostButton extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showConfirmationRequest: false,
      openLogin: false
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
      'Alert Title',
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
      <Fragment>
        <Button icon onClick={() => this.confirmationAlert()}>
          <View style={{ justifyItems: 'center' }}>
            <Icon name="retweet" type="font-awesome" />

            <Text style={{ fontSize: 1 }}>{I18n.t('qso.repost')}</Text>
          </View>
        </Button>

        {/* <Confirm
          size="mini"
          open={showConfirmationRequest}
          onCancel={() => this.setState({ showConfirmationRequest: false })}
          onConfirm={this.doRePost.bind(this)}
          content={I18n.t('qso.confirmRepost')}
        /> */}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(QSORePostButton);
