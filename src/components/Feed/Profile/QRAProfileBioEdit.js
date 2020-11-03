import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
// import * as Sentry from '@sentry/browser';
import crashlytics from '@react-native-firebase/crashlytics';
// import { ContentState, convertToRaw, EditorState } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import React, { Fragment } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import global_config from '../../../global_config.json';

class QRAProfileBioEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    let editorState;
    if (this.props.qraInfo.bio) {
      const contentBlock = htmlToDraft(this.props.qraInfo.bio);
      // const contentBlock = stateFromHTML(this.props.qraInfo.bio)
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        editorState = EditorState.createWithContent(contentState);
      }
    }
    this.state = {
      edit: false,
      openPornConfirm: false,
      editorState: editorState
    };

    this.handleOnSaveBio = this.handleOnSaveBio.bind(this);
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
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
  handleOnSaveBio = () => {
    this.props.actions.doSaveUserBio(
      this.props.token,
      draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
      this.props.identityId
    );
    this.props.closeModal();
  };
  onEditorStateChange = (editorState) => {
    this.setState({ editorState: editorState });
  };
  render() {
    const { editorState } = this.state;

    return (
      <Fragment>
        <Modal
          centered={false}
          size="small"
          open={this.props.modalOpen}
          onClose={() => this.props.closeModal()}>
          <Header content={I18n.t('qra.editBio')} />
          <Modal.Content>
            <Container>
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                  inline: {
                    inDropdown: true
                  },
                  list: {
                    inDropdown: true
                  },
                  textAlign: {
                    inDropdown: true
                  },
                  link: {
                    inDropdown: true
                  },
                  history: {
                    inDropdown: true
                  },
                  image: {
                    urlEnabled: false,
                    previewImage: true,
                    alignmentEnabled: true,
                    uploadCallback: this.uploadImageCallBack,
                    alt: {
                      present: true,
                      mandatory: false
                    },
                    defaultSize: {
                      height: 'auto',
                      width: '100%'
                    }
                  }
                }}
              />
            </Container>
          </Modal.Content>
          <Modal.Actions>
            <Button
              positive
              icon="save"
              type="submit"
              labelPosition="right"
              content={I18n.t('qra.saveBio')}
              onClick={this.handleOnSaveBio}
            />
            <Button
              icon="check"
              content={I18n.t('global.cancel')}
              onClick={() => this.props.closeModal()}
            />
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  //state: state,
  currentQRA: state.sqso.qra,
  // identityId: state.userData.identityId,

  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(QRAProfileBioEdit);