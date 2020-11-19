import crashlytics from '@react-native-firebase/crashlytics';
import { API, Auth, Storage } from 'aws-amplify';
import { Buffer } from 'buffer';
import React from 'react';
import {
  Alert,
  Appearance,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar
} from 'react-native-pell-rich-editor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RNFetchBlob from 'rn-fetch-blob';
import * as Actions from '../../../actions';
import global_config from '../../../global_config.json';
import I18n from '../../../utils/i18n';
import { EmojiView } from './emoji';
import { InsertLinkModal } from './insertLink';
const phizIcon = require('./phiz.png');
const htmlIcon = require('./h5.png');

const strikethrough = require('./strikethrough.png');
class QRAProfileBioEdit extends React.Component {
  richText = React.createRef();
  linkModal = React.createRef();

  constructor(props) {
    super(props);

    const theme = props.theme || Appearance.getColorScheme();
    const contentStyle = this.createContentStyle(theme);
    this.state = {
      theme: theme,
      contentStyle,
      emojiVisible: false,
      disabled: false
    };
  }

  componentDidMount() {
    Appearance.addChangeListener(this.themeChange);
    Keyboard.addListener('keyboardDidShow', this.onKeyBoard);
  }

  componentWillUnmount() {
    Appearance.removeChangeListener(this.themeChange);
    Keyboard.removeListener('keyboardDidShow', this.onKeyBoard);
  }
  onKeyBoard = () => {
    TextInput.State.currentlyFocusedInput() &&
      this.setState({ emojiVisible: false });
  };

  editorInitializedCallback() {
    this.richText.current?.registerToolbar(function (items) {
      console.log(
        'Toolbar click, selected items (insert end callback):',
        items
      );
    });
  }

  /**
   * theme change to editor color
   * @param colorScheme
   */
  themeChange({ colorScheme }) {
    const theme = colorScheme;
    const contentStyle = this.createContentStyle(theme);
    this.setState({ theme, contentStyle });
  }

  async save() {
    const { identityId } = await Auth.currentCredentials();

    var idenId = identityId.replace(':', '%3A');
    // Get the data here and call the interface to save the data
    let html = await this.richText.current?.getContentHtml();

    this.props.actions.doSaveUserBio(this.props.token, html, idenId);
    this.props.navigation.navigate('Home');
  }

  /**
   * editor change data
   * @param {string} html
   */
  handleChange(html) {
    // console.log('editor data:', html);
  }

  /**
   * editor height change
   * @param {number} height
   */
  handleHeightChange(height) {
    console.log('editor height change:', height);
  }

  insertEmoji(emoji) {
    this.richText.current?.insertText(emoji);
    this.richText.current?.blurContentEditor();
  }

  handleEmoji() {
    const { emojiVisible } = this.state;
    Keyboard.dismiss();
    this.richText.current?.blurContentEditor();
    this.setState({ emojiVisible: !emojiVisible });
  }

  // insertVideo() {
  //   this.richText.current?.insertVideo(
  //     'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4'
  //   );
  // }

  insertHTML() {
    this.richText.current?.insertHTML(
      '<span style="color: blue; padding:0 10px;">HTML</span>'
    );
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
  async uploadImageCallBack(fileName, path) {
    if (Platform.OS === 'ios') {
      path = path.replace('file:///', '');
    }

    folder = 'bio/' + fileName;

    let folder = 'bio/' + fileName;
    const customPrefix = {
      public: 'myPublicPrefix/',
      protected: '1/',
      private: 'myPrivatePrefix/'
    };
    const { identityId } = await Auth.currentCredentials();

    var identityID = identityId.replace(':', '%3A');

    return new Promise(async (resolve, reject) => {
      try {
        let enBlob = RNFetchBlob.fs
          .readFile(path, 'base64')
          .then((data) => Buffer.from(data, 'base64'));

        enBlob
          .then((buffer) =>
            Storage.vault.put(folder, buffer, {
              customPrefix,
              level: 'protected'
            })
          )
          .then(async (result) => {
            let filepath;

            filepath =
              global_config.s3Cloudfront + identityID + '/' + result.key;
            //CHECK NSFW

            let session = await Auth.currentSession();
            this.props.actions.setToken(session.idToken.jwtToken);
            let apiName = 'superqso';
            path = '/nsfw-check';
            let myInit = {
              body: {
                url: filepath
              },
              headers: {
                Authorization: session.idToken.jwtToken
              }
            };
            API.post(apiName, path, myInit)
              .then((response) => {
                console.log('nsfw');
                console.log(response);
                if (response.body.error > 0) {
                  //NSFW
                  Storage.remove(result.key, { level: 'protected' })
                    .then((result) => resolve(true))
                    .catch((error) => {
                      crashlytics().log('error: ' + JSON.stringify(error));
                      if (__DEV__) {
                        console.log(error.message);
                        crashlytics().recordError(
                          new Error('QRAProfileBio_DEV')
                        );
                      } else {
                        crashlytics().recordError(
                          new Error('QRAProfileBio_PRD')
                        );
                      }

                      reject(error);
                    });
                  // this.setState({ openPornConfirm: true });
                  this.confirmationAlert();
                }
                //SFW
                else resolve(filepath);
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
        // });
      } catch (error) {
        crashlytics().log('error: ' + JSON.stringify(error));
        if (__DEV__) {
          console.log(error.message);
          crashlytics().recordError(new Error('QRAProfileBio_DEV'));
        } else {
          crashlytics().recordError(new Error('QRAProfileBio_PRD'));
        }
      }
    });
  }

  onPressAddImage() {
    // ImagePicker.showImagePicker(
    //   {
    //     title: 'Select Profile Picture',
    //     mediaType: 'photo',
    //     storageOptions: {
    //       cameraRoll: false,
    //       privateDirectory: true
    //     },
    //     takePhotoButtonTitle: null, // Remove this button
    //     chooseFromLibraryButtonTitle: null, // Remove this button
    //     customButtons: [
    //       { name: 'camera', title: 'Take Photo...' },
    //       { name: 'gallery', title: 'Choose from Library...' }
    //     ]
    //   },
    //   async (response) => {
    //     if (response.didCancel) {
    //       console.log('User cancelled image picker.');
    //     } else if (response.error) {
    //       console.log('ImagePicker error: ', response.error);
    //     } else if (response.customButton === 'camera') {
    //       ImageCropPicker.openCamera({
    //         // cropping: true,
    //         // width: 500,
    //         // height: 500,
    //         // cropperCircleOverlay: true,
    //         compressImageMaxWidth: 640,
    //         compressImageMaxHeight: 480,
    //         // freeStyleCropEnabled: true,
    //         includeBase64: true
    //       }).then(async (image) => {
    //         var uri = image.path;

    //         var fileName2 = uri.replace(/^.*[\\\/]/, '');

    //         let imageSrc = await this.uploadImageCallBack(fileName2, uri);

    //         if (imageSrc) this.richText.current?.insertImage(imageSrc);
    //         // let imageSrc = `data:${image.mime};base64,${image.data}`;

    //         // this.richText.current.insertImage({ src: imageSrc });
    //         this.richText.current?.blurContentEditor();
    //       });
    //     } else if (response.customButton === 'gallery') {
    ImageCropPicker.openPicker({
      includeBase64: true,
      compressImageQuality: 0.5
    }).then(async (image) => {
      var uri = image.path;

      var fileName2 = uri.replace(/^.*[\\\/]/, '');

      let imageSrc = await this.uploadImageCallBack(fileName2, uri);

      if (imageSrc) this.richText.current?.insertImage(imageSrc);
      this.richText.current.blurContentEditor();
    });
    // }
    // }
    // );
  }

  onInsertLink() {
    // this.richText.current?.insertLink('Google', 'http://google.com');
    this.linkModal.current?.setModalVisible(true);
  }

  onLinkDone({ title, url }) {
    this.richText.current?.insertLink(title, url);
  }

  createContentStyle(theme) {
    // Can be selected for more situations (cssText or contentCSSText).
    const contentStyle = {
      backgroundColor: '#000033',
      color: '#fff',
      placeholderColor: 'gray',
      // cssText: '#editor {background-color: #f3f3f3}', // initial valid
      contentCSSText:
        'font-size: 16px;width: 100%;  min-height: 200px; height: 100%;' // initial valid
    };
    if (theme === 'light') {
      contentStyle.backgroundColor = '#fff';
      contentStyle.color = '#000033';
      contentStyle.placeholderColor = '#a9a9a9';
    }
    return contentStyle;
  }

  onDisabled() {
    this.setState({ disabled: !this.state.disabled });
  }

  render() {
    const { contentStyle, emojiVisible, disabled } = this.state;
    const { backgroundColor, color, placeholderColor } = contentStyle;
    const themeBg = { backgroundColor };
    return (
      <SafeAreaView style={[styles.container, themeBg]}>
        {/* <StatusBar barStyle={theme !== 'dark' ? 'dark-content' : 'light-content'} /> */}
        <InsertLinkModal
          placeholderColor={placeholderColor}
          color={color}
          backgroundColor={backgroundColor}
          onDone={() => this.onLinkDone}
          ref={this.linkModal}
        />
        <View style={styles.nav}>
          {/* <Button title={'HOME'} onPress={() => this.onHome} /> */}
          <Button fluid title="Save" onPress={this.save.bind(this)} />
        </View>
        <ScrollView
          style={[styles.scroll, themeBg]}
          keyboardDismissMode={'none'}>
          <RichEditor
            // initialFocus={true}
            disabled={disabled}
            editorStyle={contentStyle} // default light style
            containerStyle={themeBg}
            scrollEnabled={false}
            ref={this.richText}
            style={[styles.rich, themeBg]}
            placeholder={'please input content'}
            initialContentHTML={this.props.qra.bio}
            editorInitializedCallback={() => this.editorInitializedCallback}
            onChange={() => this.handleChange}
            onHeightChange={() => this.handleHeightChange}
          />
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <RichToolbar
            allowFileAccess={true}
            style={[styles.richBar, themeBg]}
            editor={this.richText}
            disabled={disabled}
            iconTint={color}
            selectedIconTint={'#2095F2'}
            disabledIconTint={'#8b8b8b'}
            onPressAddImage={this.onPressAddImage.bind(this)}
            onInsertLink={this.onInsertLink.bind(this)}
            iconSize={40} // default 50
            actions={[
              'insertVideo',
              ...defaultActions,
              actions.setStrikethrough,
              actions.heading1,
              actions.heading4,
              actions.removeFormat,
              'insertEmoji',
              'insertHTML'
            ]} // default defaultActions
            iconMap={{
              insertEmoji: phizIcon,
              [actions.removeFormat]: ({ tintColor }) => (
                <Text style={[styles.tib, { color: tintColor }]}>C</Text>
              ),
              [actions.setStrikethrough]: strikethrough,
              [actions.heading1]: ({ tintColor }) => (
                <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
              ),
              [actions.heading4]: ({ tintColor }) => (
                <Text style={[styles.tib, { color: tintColor }]}>H3</Text>
              ),
              insertHTML: htmlIcon
              // insertVideo: videoIcon
            }}
            insertEmoji={() => this.handleEmoji}
            insertHTML={() => this.insertHTML}
            // insertVideo={() => this.insertVideo}
          />
          {emojiVisible && <EmojiView onSelect={() => this.insertEmoji} />}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5
  },
  rich: {
    minHeight: 300,
    flex: 1
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  richBar: {
    height: 50,
    backgroundColor: '#F5FCFF'
  },
  scroll: {
    backgroundColor: '#ffffff'
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e8e8e8',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 15
  },

  input: {
    flex: 1
  },

  tib: {
    textAlign: 'center',
    color: '#515156'
  }
});
// const selectorFeedType = (state, ownProps) => {
//   if (ownProps.feedType === 'MAIN')
//     return state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos);
//   else if (ownProps.feedType === 'PROFILE')
//     return state.sqso.feed.qra.qsos.find((q) => q.idqsos === ownProps.idqsos);
//   else if (ownProps.feedType === 'FIELDDAYS')
//     return state.sqso.feed.fieldDays.find((q) => q.idqsos === ownProps.idqsos);
//   else return null;
// };
const mapStateToProps = (state, ownProps) => ({
  qra: state.sqso.userInfo,
  currentQRA: state.sqso.qra,
  // qso: selectorFeedType(state, ownProps),

  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(QRAProfileBioEdit);
// export default connect(mapStateToProps, mapDispatchToProps, null, {
//   pure: false
// })(QRAProfileBioEdit);
