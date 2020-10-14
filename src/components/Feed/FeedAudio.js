//import i18n from 'i18next';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Video from 'react-native-video';
//import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
//import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';

class FeedAudio extends React.Component {
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
    // if (this.props.isAuthenticated) {
    // if (
    //   this.props.qraUserData.monthly_audio_play >
    //   this.props.qraUserData.account_type.web_qso_audio_play
    // ) {
    //   this.setState({ promptPremium: true });
    // } else {
    this.props.recalculateRowHeight();
    this.setState({ audioNotVisible: false });
    // }
    // } else {
    //   if (this.props.index > 0) this.setState({ promptLogin: true });
    //   else {
    //     this.props.recalculateRowHeight();
    //     this.setState({ audioNotVisible: false });
    //   }
    // }
  }

  render() {
    const date = new Date(this.props.media.datetime);
    // const onlyForRegistered = !!(
    //   this.props.index > 0 && !this.props.isAuthenticated
    // );
    if (this.props.media.url) {
      if (this.state.audioNotVisible) {
        return (
          // {/* <Modal
          //   closeIcon
          //   open={this.state.promptPremium}
          //   onClose={() => this.setState({ promptPremium: false })}
          //   header={t('global.upgradePremium')}
          //   content={t('global.userMaxReached')}
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
          //   cancelButton={t('global.cancel')}
          //   confirmButton={t('auth.login')}
          //   content={t('auth.loginToPerformAction')}
          // /> */}
          // {/* <div
          //   style={{
          //     display: 'flex',
          //     alignItems: 'center',
          //     fontSize: '1.2rem'
          //   }}> */}
          <View>
            <Button
              // size="small"
              // circular
              // icon="play"
              onClick={() => this.onClick()}
              // style={{ background: '#8BD8BD', color: '#243665' }}
            />
            <Text>
              <Text
              // style={{ fontSize: '1rem' }}
              >
                {I18n.t('qso.playAudio')}
                {' - '}
              </Text>
              {this.props.media.description && (
                <Text
                // style={{ fontSize: '1em' }}
                >
                  {/* <b> */}
                  {this.props.media.description}
                  {/* </b> */}
                  {' - '}
                </Text>
              )}
              <Text
              // style={{ fontSize: '1rem' }}
              >
                {date.toLocaleDateString(I18n.locale, { month: 'short' }) +
                  ' ' +
                  date.getDate() +
                  ', ' +
                  date.getFullYear()}{' '}
                {date.getUTCHours() +
                  ':' +
                  (date.getMinutes() < 10 ? '0' : '') +
                  date.getMinutes()}{' '}
              </Text>

              {this.props.media.views_counter > 0 && (
                <Text
                // style={{ fontSize: '1rem', color: 'gray' }}
                >
                  {' '}
                  {I18n.t('qso.audioPlays', {
                    count: this.props.media.views_counter
                  })}
                </Text>
              )}
              {/* {onlyForRegistered && (
                  <Link
                    to={{
                      pathname: '/login',
                      state: { from: this.props.location.pathname }
                    }}
                  >
                    {'  '}
                    {t('auth.loginRequired')}
                  </Link>
                )} */}
            </Text>
          </View>
        );
      } else {
        return (
          // <Fragment>
          <View>
            {/* <audio
              ref={this.props.media.url}
              src={this.props.media.url}
              // style={{ width: '100%', maxWidth: '100%', height: '25px' }}
              controls
              autoPlay
              preload="none"
              controlsList="nodownload"
              onPlay={() =>
                this.props.isAuthenticated
                  ? this.props.actions.doQsoMediaPlay(
                      this.props.media.idqsos_media,
                      this.props.token,
                      this.props.media.idqso
                    )
                  : this.props.actions.doQsoMediaPlayPublic(
                      this.props.media.idqsos_media,

                      this.props.media.idqso
                    )
              }
            /> */}
            <Video
              audioOnly
              source={{
                uri: this.props.media.url
              }}
            />
            <Text>
              {this.props.media.description && (
                <Text>
                  <b>{this.props.media.description}</b>
                  {' - '}
                </Text>
              )}
              {date.toLocaleDateString(I18n.locale, { month: 'short' }) +
                ' ' +
                date.getDate() +
                ', ' +
                date.getFullYear()}{' '}
              {date.getUTCHours() +
                ':' +
                (date.getMinutes() < 10 ? '0' : '') +
                date.getMinutes()}
              {this.props.media.views_counter > 0 && (
                <Text
                // style={{ fontSize: '1rem', color: 'gray' }}
                >
                  {' '}
                  {I18n.t('qso.audioPlays', {
                    count: this.props.media.views_counter + 1
                  })}
                </Text>
              )}
              {/* {onlyForRegistered && (
                  <Link
                    to={{
                      pathname: '/login',
                      state: { from: this.props.location.pathname }
                    }}
                  >
                    {'  '}
                    {t('auth.loginRequired')}
                  </Link>
                )} */}
            </Text>
          </View>
          // </Fragment>
        );
      }
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  token: state.sqso.jwtToken,
  // isAuthenticated: state.userData.isAuthenticated,
  currentQRA: state.sqso.qra
  // qraUserData: state.userData.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(FeedAudio);
