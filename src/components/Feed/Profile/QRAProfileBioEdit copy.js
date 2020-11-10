import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import crashlytics from '@react-native-firebase/crashlytics';
import React from 'react';
import {
  Appearance,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from 'react-native-elements';
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar
} from 'react-native-pell-rich-editor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import global_config from '../../../global_config.json';
import { EmojiView } from './emoji';
import { InsertLinkModal } from './insertLink';

const phizIcon = require('./phiz.png');
const htmlIcon = require('./h5.png');
const videoIcon = require('./video.png');
const strikethrough = require('./strikethrough.png');
class QRAProfileBioEdit extends React.PureComponent {
  // richText = React.createRef();
  linkModal = React.createRef();
  constructor(props) {
    super(props);
    let editorState;
    if (this.props.qraInfo.bio) {
      // const contentBlock = htmlToDraft(this.props.qraInfo.bio);
      // // const contentBlock = stateFromHTML(this.props.qraInfo.bio)
      // if (contentBlock) {
      //   const contentState = ContentState.createFromBlockArray(
      //     contentBlock.contentBlocks
      //   );
      //   editorState = EditorState.createWithContent(contentState);
      // }
    }
    const theme = props.theme || Appearance.getColorScheme();
    const contentStyle = this.createContentStyle(theme);
    this.state = {
      edit: false,
      openPornConfirm: false,
      editorState: editorState,
      theme: theme,
      contentStyle,
      emojiVisible: false,
      disabled: false
    };

    this.handleOnSaveBio = this.handleOnSaveBio.bind(this);
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    super(props);
    // const that = this;

    // that.state = {
    //   theme: theme,
    //   contentStyle,
    //   emojiVisible: false,
    //   disabled: false
    // };
    // that.onHome = ::that.onHome;
    // that.save = ::that.save;
    // that.onTheme = ::that.onTheme;
    // that.onPressAddImage = ::that.onPressAddImage;
    // that.onInsertLink = ::that.onInsertLink;
    // that.onLinkDone = ::that.onLinkDone;
    // that.themeChange = ::that.themeChange;
    // that.handleChange = ::that.handleChange;
    // that.handleHeightChange = ::that.handleHeightChange;
    // that.insertEmoji = ::that.insertEmoji;
    // that.insertHTML = ::that.insertHTML;
    // that.insertVideo = ::that.insertVideo;
    // that.handleEmoji = ::that.handleEmoji;
    // that.onDisabled = ::that.onDisabled;
    // that.editorInitializedCallback = ::that.editorInitializedCallback;
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
    // Get the data here and call the interface to save the data
    let html = await this.richText.current?.getContentHtml();
    // console.log(html);
    alert(html);
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

  insertVideo() {
    this.richText.current?.insertVideo(
      'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4'
    );
  }

  insertHTML() {
    this.richText.current?.insertHTML(
      '<span style="color: blue; padding:0 10px;">HTML</span>'
    );
  }

  onPressAddImage() {
    // insert URL
    this.richText.current?.insertImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png'
    );
    // insert base64
    // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
    // this.richText.current?.blurContentEditor();
  }

  onInsertLink() {
    // this.richText.current?.insertLink('Google', 'http://google.com');
    this.linkModal.current?.setModalVisible(true);
  }

  onLinkDone({ title, url }) {
    this.richText.current?.insertLink(title, url);
  }

  onHome() {
    this.props.navigation.push('index');
  }

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

  onTheme() {
    let { theme } = this.state;
    theme = theme === 'light' ? 'dark' : 'light';
    let contentStyle = this.createContentStyle(theme);
    this.setState({ theme, contentStyle });
  }

  onDisabled() {
    this.setState({ disabled: !this.state.disabled });
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
            crashlytics().recordError(new Error('QRAProfileBioEdit_DEV'));
          } else {
            crashlytics().recordError(new Error('QRAProfileBioEdit_PRD'));
          }
          reject(error);
        });
    });
  }
  uploadImageCallBack(file) {
    const customPrefix = {
      public: 'myPublicPrefix/',
      protected: '1/',
      private: 'myPrivatePrefix/'
    };
    return new Promise(async (resolve, reject) => {
      try {
        // const cognitoUser = Auth.currentAuthenticatedUser();
        // const currentSession = cognitoUser.signInUserSession;
        // cognitoUser.refreshSession(
        //   currentSession.refreshToken,
        //   (error, session) => {
        //     if (__DEV__) {
        //       console.log('Unable to refresh Token');
        //       console.log(error);
        //     } else {
        //       Sentry.configureScope(function(scope) {
        //         scope.setExtra('ENV', process.env.REACT_APP_STAGE);
        //       });
        //       Sentry.captureException(error);
        //     }
        //     // console.log('session', err, session);
        //     let token = session.idToken.jwtToken;
        const currentSession = await Auth.currentSession();
        const token = currentSession.getIdToken().getJwtToken();
        this.props.actions.refreshToken(token);
        let folder = 'bio/' + file.name;

        Storage.put(folder, file, {
          customPrefix: customPrefix,
          level: 'protected',
          contentType: 'image/png'
        })
          .then((result) => {
            let filepath;

            filepath =
              global_config.s3Cloudfront +
              '/1/' +
              encodeURIComponent(this.props.identityId) +
              '/' +
              encodeURIComponent(result.key);
            //CHECK NSFW
            let apiName = 'superqso';
            let path = '/nsfw-check';
            let myInit = {
              body: {
                url: filepath
              },
              headers: {
                Authorization: token
              }
            };
            API.post(apiName, path, myInit)
              .then((response) => {
                if (response.body.error > 0) {
                  //NSFW
                  Storage.remove(result.key, { level: 'protected' })
                    .then((result) => resolve(true))
                    .catch((error) => {
                      crashlytics().log('error: ' + JSON.stringify(error));
                      if (__DEV__) {
                        console.log(error.message);
                        crashlytics().recordError(
                          new Error('QRAProfileBioEdit_DEV')
                        );
                      } else {
                        crashlytics().recordError(
                          new Error('QRAProfileBioEdit_PRD')
                        );
                      }
                      reject(error);
                    });
                  this.setState({ openPornConfirm: true });
                }
                //SFW
                else
                  resolve({
                    data: {
                      link: filepath
                    }
                  });
              })
              .catch((error) => {
                crashlytics().log('error: ' + JSON.stringify(error));
                if (__DEV__) {
                  console.log(error.message);
                  crashlytics().recordError(new Error('QRAProfileBioEdit_DEV'));
                } else {
                  crashlytics().recordError(new Error('QRAProfileBioEdit_PRD'));
                }
                reject(error);
              });
          })
          .catch((error) => {
            crashlytics().log('error: ' + JSON.stringify(error));
            if (__DEV__) {
              console.log(error.message);
              crashlytics().recordError(new Error('QRAProfileBioEdit_DEV'));
            } else {
              crashlytics().recordError(new Error('QRAProfileBioEdit_PRD'));
            }
            reject(error);
          });
        // });
      } catch (error) {
        console.log('Unable to refresh Token');
        crashlytics().log('error: ' + JSON.stringify(error));
        if (__DEV__) {
          console.log(error.message);
          crashlytics().recordError(new Error('QRAProfileBioEdit_DEV'));
        } else {
          crashlytics().recordError(new Error('QRAProfileBioEdit_PRD'));
        }
      }
    });
  }

  close = () => this.setState({ edit: false });
  open = () => this.setState({ edit: true });
  handleOnSaveBio = async () => {
    const { identityId } = await Auth.currentCredentials();
    console.log('PASO POR SIGNIN la credencial es:' + identityId);
    var idenId = identityId.replace(':', '%3A');
    this.props.actions.doSaveUserBio(
      this.props.token,
      // draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
      idenId
    );
    this.props.closeModal();
  };
  onEditorStateChange = (editorState) => {
    this.setState({ editorState: editorState });
  };
  // render() {
  //   const { editorState } = this.state;

  //   return (
  //     <Fragment>
  //       <Modal
  //         centered={false}
  //         size="small"
  //         open={this.props.modalOpen}
  //         onClose={() => this.props.closeModal()}>
  //         <Header content={I18n.t('qra.editBio')} />
  //         <Modal.Content>
  //           <Container>
  //             <Editor
  //               editorState={editorState}
  //               wrapperClassName="demo-wrapper"
  //               editorClassName="demo-editor"
  //               onEditorStateChange={this.onEditorStateChange}
  //               toolbar={{
  //                 inline: {
  //                   inDropdown: true
  //                 },
  //                 list: {
  //                   inDropdown: true
  //                 },
  //                 textAlign: {
  //                   inDropdown: true
  //                 },
  //                 link: {
  //                   inDropdown: true
  //                 },
  //                 history: {
  //                   inDropdown: true
  //                 },
  //                 image: {
  //                   urlEnabled: false,
  //                   previewImage: true,
  //                   alignmentEnabled: true,
  //                   uploadCallback: this.uploadImageCallBack,
  //                   alt: {
  //                     present: true,
  //                     mandatory: false
  //                   },
  //                   defaultSize: {
  //                     height: 'auto',
  //                     width: '100%'
  //                   }
  //                 }
  //               }}
  //             />
  //           </Container>
  //         </Modal.Content>
  //         <Modal.Actions>
  //           <Button
  //             positive
  //             icon="save"
  //             type="submit"
  //             labelPosition="right"
  //             content={I18n.t('qra.saveBio')}
  //             onClick={this.handleOnSaveBio}
  //           />
  //           <Button
  //             icon="check"
  //             content={I18n.t('global.cancel')}
  //             onClick={() => this.props.closeModal()}
  //           />
  //         </Modal.Actions>
  //       </Modal>
  //     </Fragment>
  //   );
  // }
  render() {
    // let that = this;
    const { contentStyle, theme, emojiVisible, disabled } = this.state;
    const { backgroundColor, color, placeholderColor } = contentStyle;
    const themeBg = { backgroundColor };
    return (
      <SafeAreaView style={[styles.container, themeBg]}>
        <StatusBar
          barStyle={theme !== 'dark' ? 'dark-content' : 'light-content'}
        />
        <InsertLinkModal
          placeholderColor={placeholderColor}
          color={color}
          backgroundColor={backgroundColor}
          onDone={() => this.onLinkDone}
          ref={(r) => (this.linkModal = r)}
        />
        <View style={styles.nav}>
          <Button title={'HOME'} onPress={() => this.onHome} />
          <Button title="Save" onPress={() => this.save} />
        </View>
        <ScrollView
          style={[styles.scroll, themeBg]}
          keyboardDismissMode={'none'}>
          <View>
            <View style={styles.item}>
              <Button title={theme} onPress={() => this.onTheme} />
              <Button
                title={disabled ? 'enable' : 'disable'}
                onPress={() => this.onDisabled}
              />
            </View>
          </View>
          <RichEditor
            // initialFocus={true}
            disabled={disabled}
            editorStyle={contentStyle} // default light style
            containerStyle={themeBg}
            ref={(r) => (this.richText = r)}
            style={[styles.rich, themeBg]}
            placeholder={'please input content'}
            initialContentHTML={this.props.qraInfo.bio}
            editorInitializedCallback={() => this.editorInitializedCallback}
            onChange={() => this.handleChange}
            onHeightChange={() => this.handleHeightChange}
          />
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <RichToolbar
            style={[styles.richBar, themeBg]}
            editor={this.richText}
            disabled={disabled}
            iconTint={color}
            selectedIconTint={'#2095F2'}
            disabledIconTint={'#8b8b8b'}
            onPressAddImage={() => this.onPressAddImage}
            onInsertLink={() => this.onInsertLink}
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
              insertHTML: htmlIcon,
              insertVideo: videoIcon
            }}
            insertEmoji={() => this.handleEmoji}
            insertHTML={() => this.insertHTML}
            insertVideo={() => this.insertVideo}
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
const mapStateToProps = (state, ownProps) => ({
  //state: state,
  currentQRA: state.sqso.qra,
  qso: state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos),
  identityId: state.sqso.feed.userData.identityId,

  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: true
})(QRAProfileBioEdit);
