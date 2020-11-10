import crashlytics from '@react-native-firebase/crashlytics';
import { Storage } from 'aws-amplify';
import React, { Fragment } from 'react';
import { Alert, Appearance, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import I18n from '../../../utils/i18n';
class QRAProfileBio extends React.PureComponent {
  richText = React.createRef();
  constructor(props) {
    super(props);
    const theme = props.theme || Appearance.getColorScheme();
    const contentStyle = this.createContentStyle(theme);
    this.state = {
      theme: theme,
      contentStyle,
      emojiVisible: false,
      disabled: true,
      bio: null,
      edit: false,
      openPornConfirm: false
    };
  }

  getImage(path) {
    return new Promise((resolve, reject) => {
      Storage.get(path, { level: 'protected' })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__) {
            console.log(error.message);
            crashlytics().recordError(new Error('QRAProfileBio_DEV'));
          } else {
            crashlytics().recordError(new Error('QRAProfileBio_PRD'));
          }

          reject(error);
        });
    });
  }

  confirmationAlert = () =>
    Alert.alert(
      I18n.t('qso.repost'),
      I18n.t('global.imageContainNudity'),
      [
        {
          text: I18n.t('global.cancel'),
          style: 'cancel'
        },
        { text: I18n.t('global.ok') }
      ],
      { cancelable: false }
    );
  createContentStyle(theme) {
    // Can be selected for more situations (cssText or contentCSSText).
    const contentStyle = {
      backgroundColor: '#000033',
      color: '#fff',
      placeholderColor: 'gray',
      // cssText: '#editor {background-color: #f3f3f3}', // initial valid
      contentCSSText: 'font-size: 16px; min-height: 200px; height: 100%;' // initial valid
    };
    if (theme === 'light') {
      contentStyle.backgroundColor = '#fff';
      contentStyle.color = '#000033';
      contentStyle.placeholderColor = '#a9a9a9';
    }
    return contentStyle;
  }

  render() {
    const { contentStyle, disabled } = this.state;
    const { backgroundColor } = contentStyle;
    const themeBg = { backgroundColor };
    // console.log(this.richText);
    // if (this.props.bio && this.richText.current)
    //   this.richText.current?.setContentHtml(this.props.bio);
    const source = this.props.qra.qra.bio
      ? {
          html:
            '<head><meta name=\'viewport\' content=\'width=640, user-scalable=no\'> </head>' +
            '<style> img { display: block; max-width: 100%; height: auto; } </style>' +
            '<style> div { word-wrap: break-word; max-width: 100%; overflow-wrap: break-word; } </style>' +
            '<body>' +
            this.props.qra.qra.bio +
            '</body></html>'
        }
      : {};
    return (
      <Fragment>
        {this.props.currentQRA === this.props.qraInfo.qra && (
          <View>
            <Button
              fluid
              onPress={() =>
                this.props.navigation.navigate('QRAProfileBioEdit')
              }
              title={I18n.t('qra.editBio')}
            />
          </View>
        )}

        <WebView
          style={{ flex: 1, width: '100%' }}
          scalesPageToFit={false}
          useWebKit={false} // mixedContentMode="compatibility" sharedCookiesEnabled
          thirdPartyCookiesEnabled
          originWhitelist={['*']}
          source={source}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#e5e5e5'
    fontSize: 30
  },
  scroll: {
    backgroundColor: '#ffffff'
  },
  rich: {
    minHeight: 300,
    flex: 1
  }
});
const mapStateToProps = (state, ownProps) => ({
  qra: state.sqso.feed.qra,
  currentQRA: state.sqso.qra,
  qso: state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos),
  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(QRAProfileBio)
);
// export default connect(mapStateToProps, mapDispatchToProps, null, {
//   pure: false
// })(QRAProfileBio);
