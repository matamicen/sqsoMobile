/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import I18n from '../../utils/i18n';

class ConfirmSignUp extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      confirmationcode: '',
      showEmailNotReceived: false
    };
  }

  componentDidMount() {}

  confirm = () => {
    this.props.confirmSignup();
  };

  render() {
    return (
      <View>
        <Modal
          visible={true}
          transparent={true}
          onRequestClose={() => console.log('Close was requested')}>
          <View
            style={{
              //  margin:20,
              padding: 20,
              //         backgroundColor:  '#475788',
              backgroundColor: 'rgba(0,0,0,0.85)',
              // backgroundColor:"rgba(139,216,189,0.96)",
              top: 40,
              left: 5,
              right: 5,
              position: 'absolute',
              borderBottomLeftRadius: 22,
              borderBottomRightRadius: 22,
              borderTopLeftRadius: 22,
              borderTopRightRadius: 22,

              alignItems: 'center'
            }}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 0.6 }}>
                <Text style={{ color: 'white', fontSize: 17, padding: 10 }}>
                  {I18n.t('confirmSignUpWeHaveSent')}
                </Text>
                <Text style={{ color: 'white', fontSize: 15, padding: 20 }}>
                  {I18n.t('confirmHelp1')}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                      this.setState({showEmailNotReceived: !this.state.showEmailNotReceived});
                    }}>
                      <Text style={{ color: 'white', fontSize: 14, padding: 1 }}>
                        {I18n.t('confirmHelp2')}
                      </Text>
                </TouchableOpacity>
                {(this.state.showEmailNotReceived) &&
                <View>
                  <Text style={{ color: 'white', fontSize: 14, padding: 1 }}>
                    {I18n.t('confirmHelp3')}
                  </Text>
                  <Text style={{ color: 'white', fontSize: 14, padding: 1 }}>
                    {I18n.t('confirmHelp4')}
                  </Text>
                  <Text style={{ color: 'white', fontSize: 14, padding: 1 }}>
                    {I18n.t('confirmHelp5')}
                  </Text>
                </View>
                }
                {/* <TextInput
                  placeholder={I18n.t('confirmSignUpConfirmationCode')}
                  onFocus={() => this.setState({ confirmationcodeError: 0 })}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="white"
                  keyboardType={
                    Platform.OS === 'android' ? 'visible-password' : 'default'
                  }
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.inputConfirmation}
                  value={this.state.confirmationcode}
                  onChangeText={(text) =>
                    this.setState({ confirmationcode: text })
                  }
                /> */}
              </View>

              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'space-around',
                  padding: 3,
                  opacity: this.props.confirmationcodeError
                }}>
                <Text
                  style={{
                    color: this.props.color,
                    textAlign: 'center',
                    fontSize: 16,
                    width: 290
                  }}>
                  {' '}
                  {this.props.errormessage2}
                </Text>
              </View>

              <View style={{ flex: 0.2, flexDirection: 'row' }}>
                <View style={{ flex: 0.25 }}>
                  <TouchableOpacity
                    disabled={this.state.buttonsEnabled}
                    onPress={() => this.props.close_confirmSignup()}
                    style={{ paddingTop: 8, paddingBottom: 4, flex: 0.5 }}>
                    <Text
                      style={{ color: 'white', fontSize: 14, marginLeft: 5 }}>
                      {I18n.t('confirmSignUpCancelButton')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.4 }}>
                  <TouchableOpacity
                    disabled={this.state.buttonsEnabled}
                    onPress={() => this.props.resendCode()}
                    style={{
                      paddingTop: 8,
                      paddingBottom: 4,
                      flex: 0.5,
                      alignItems: 'flex-start'
                    }}>
                    <Text
                      style={{ color: 'white', fontSize: 14, marginLeft: 5 }}>
                      {I18n.t('confirmSignUpResendCodeButton')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.35 }}>
                  <TouchableOpacity
                    disabled={this.state.buttonsEnabled}
                    onPress={() => this.confirm()}
                    style={{
                      paddingTop: 4,
                      paddingBottom: 4,
                      flex: 0.5,
                      alignItems: 'flex-end'
                    }}>
                    <Text style={{ color: 'white', fontSize: 17 }}>
                      {I18n.t('confirmSignUpConfirmButton')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(ConfirmSignUp)
);
