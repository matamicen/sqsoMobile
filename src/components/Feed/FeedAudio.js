//import i18n from 'i18next';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import VideoPlayer from 'react-native-video-controls';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';

class FeedAudio extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showReportContent: false,
      showMessage: false,
      audioNotVisible: true,
      promptLogin: false,
      promptPremium: false,
      error: null
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    // if (
    //   this.props.qraUserData.monthly_audio_play >
    //   this.props.qraUserData.account_type.web_qso_audio_play
    // ) {
    //   this.setState({ promptPremium: true });
    // } else {
    // this.props.recalculateRowHeight();
    this.props.actions.doQsoMediaPlay(
      this.props.media.idqsos_media,
      this.props.token,
      this.props.media.idqso
    );
    this.setState({ audioNotVisible: false });
    // }
    // } else {
    //   if (this.props.index > 0) this.setState({ promptLogin: true });
    //   else {
    //     this.props.recalculateRowHeight();
    //     this.setState({ audioNotVisible: false });
    //   }
  }

  render() {
    const date = new Date(this.props.media.datetime);
    // const onlyForRegistered = !!(
    //   this.props.index > 0
    // );
    if (this.props.media.url) {
      if (this.state.audioNotVisible) {
        return (
          // {/* <Modal
          //   closeIcon
          //   open={this.state.promptPremium}
          //   onClose={() => this.setState({ promptPremium: false })}
          //   header={I18n.t('global.upgradePremium')}
          //   content={I18n.t('global.userMaxReached')}
          //   actions={['OK']}
          // /> */}
          // {/* <Confirm
          //   size="mini"
          //   open={this.state.promptLogin}
          //   onConfirm={() =>
          //     this.props.history.push({
          //       pathname: '/login',
          //       state: { from: this.props.location.pathname }
          //     })
          //   }
          //   onCancel={() => this.setState({ promptLogin: false })}
          //   cancelButton={I18n.t('global.cancel')}
          //   confirmButton={I18n.t('auth.login')}
          //   content={I18n.t('auth.loginToPerformAction')}
          // /> */}
          // {/* <View
          //   style={{
          //     display: 'flex',
          //     alignItems: 'center',
          //     fontSize: '1.2rem'
          //   }}> */}
          <View style={styles.icon}>
            <Icon
              name="play-circle"
              type="font-awesome"
              color="#243665"
              onPress={() => this.onClick()}
            />

            <Text style={{ marginLeft: 5 }}>
              <Text>
                {I18n.t('qso.playAudio')}
                {' - '}
              </Text>
              {this.props.media.description && (
                <Text>{this.props.media.description}</Text>
              )}
              <Text>
                {date.toLocaleDateString(I18n.locale, { month: 'short' })}{' '}
                {date.getUTCHours() +
                  ':' +
                  (date.getMinutes() < 10 ? '0' : '') +
                  date.getMinutes()}{' '}
              </Text>

              {this.props.media.views_counter > 0 && (
                <Text>
                  {I18n.t('qso.audioPlays', {
                    count: this.props.media.views_counter
                  })}
                </Text>
              )}
            </Text>
          </View>
        );
      } else {
        return (
          // <Fragment>
          <View style={styles.container}>
            <View style={styles.audio}>
              <VideoPlayer
                source={{
                  uri: this.props.media.url
                }} // Can be a URL or a local file.
                style={{ height: 85 }}
                audioOnly
                disableVolume
                disableFullscreen
                disableBack
                controlTimeout={1500000}
                // controls
                navigator={this.props.navigator}
                muted={false}
                fullscreen={true}
                repeat={false}
                resizeMode={'cover'}
                volume={1.0}
                rate={1.0}
                ignoreSilentSwitch={'obey'}
              />
            </View>
            <View style={styles.text}>
              <Text>
                {this.props.media.description && (
                  <Text>
                    <b>{this.props.media.description}</b>
                    {' - '}
                  </Text>
                )}
                {date.toLocaleDateString(I18n.locale, { month: 'short' })}{' '}
                {date.getUTCHours() +
                  ':' +
                  (date.getMinutes() < 10 ? '0' : '') +
                  date.getMinutes()}
                {this.props.media.views_counter > 0 && (
                  <Text>
                    {I18n.t('qso.audioPlays', {
                      count: this.props.media.views_counter + 1
                    })}
                  </Text>
                )}
              </Text>
            </View>
          </View>
          // </Fragment>
        );
      }
    } else {
      return null;
    }
  }
}
const styles = StyleSheet.create({
  icon: {
    flex: 1,
    flexDirection: 'row'
  },
  audio: {
    flex: 1,
    width: '100%'
  },
  text: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
    // flexGrow: 1
    // marginTop: Constants.statusBarHeight
  }
});
const mapStateToProps = (state) => ({
  token: state.sqso.jwtToken,

  currentQRA: state.sqso.qra
  // qraUserData: state.userData.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(FeedAudio);
