//import i18n from 'i18next';
import React from 'react';
import { StyleSheet, Text, View, Linking, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import VideoPlayer from 'react-native-video-controls';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import moment from 'moment';

class Link extends React.PureComponent {
  openUrl(url) {
    // url = url.toUpperCase();

    if (
      !url.toUpperCase().startsWith('HTTP://') &&
      !url.toUpperCase().startsWith('HTTPS://')
    ) {
      url = 'http://' + url;
    }
    Linking.openURL(url);
    Linking.canOpenURL(url, (supported) => {
      if (!supported) {
        Alert.alert('Can\'t handle url: ' + url);
      } else {
        Linking.openURL(url);
      }
    });
  }
  render() {
    return (
      <Text
        style={{ color: 'blue' }}
        onPress={() => this.openUrl(this.props.url)}>
        {this.props.children}
      </Text>
    );
  }
}

class Description extends React.PureComponent {
  render() {
    // Check if nested content is a plain string
    if (typeof this.props.description === 'string') {
      // Split the content on space characters
      var words = this.props.description.split(/\s/);

      // Loop through the words
      var contents = words.map(function (word, i) {
        // Space if the word isn't the very last in the set, thus not requiring a space after it
        var separator = i < words.length - 1 ? ' ' : '';

        // The word is a URL, return the URL wrapped in a custom <Link> component
        if (word.match(/(^http[s]?:\/{2})|(^www)|(^\/{1,2})/gim)) {
          return (
            <Link key={i} url={word}>
              {word}
              {separator}
            </Link>
          );
        } else {
          return (
            <Text key={i}>
              {word}
              {separator}
            </Text>
          );
        }
      }, this);
      // The nested content was something else than a plain string
      // Return the original content wrapped in a <Text> component
    } else {
      console.log(
        'Attempted to use <HyperText> with nested components. ' +
          'This component only supports plain text children.'
      );
      return <Text>{this.props.children}</Text>;
    }

    // Return the modified content wrapped in a <Text> component
    return <Text>{contents}</Text>;
  }
}
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
                <Text>
                  <Description description={this.props.media.description} />
                  {' - '}
                </Text>
              )}
              <Text>
                {' '}
                {moment(new Date(date)).utc().format('lll')}
                {' UTC'}
                {/* {date.toLocaleDateString(I18n.locale, { month: 'short' })}{' '}
                {date.getUTCHours() +
                  ':' +
                  (date.getMinutes() < 10 ? '0' : '') +
                  date.getMinutes()}{' '} */}
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
                controlTimeout={1500}
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
                  <Text style={{ fontSize: 17 }}>
                    <Description description={this.props.media.description} />

                    {' - '}
                  </Text>
                )}
                <Text style={{ fontSize: 17 }}>
                  {' '}
                  {moment(new Date(date)).utc().format('lll')}
                  {' UTC'}
                  {/* {date.toLocaleDateString(I18n.locale, { month: 'short' })}{' '}
                  {date.getUTCHours() +
                    ':' +
                    (date.getMinutes() < 10 ? '0' : '') +
                    date.getMinutes()} */}
                </Text>
                {this.props.media.views_counter > 0 && (
                  <Text style={{ fontSize: 17 }}>
                    {I18n.t('qso.audioPlays', {
                      count: this.props.media.views_counter + 1
                    })}
                  </Text>
                )}
              </Text>
            </View>
          </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(FeedAudio);
// export default connect(mapStateToProps, mapDispatchToProps, null, {
//   pure: false
// })(FeedAudio);
