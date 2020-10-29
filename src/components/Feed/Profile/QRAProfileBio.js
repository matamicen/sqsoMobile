import API from '@aws-amplify/api';
import Storage from '@aws-amplify/storage';
import crashlytics from '@react-native-firebase/crashlytics';
import React, { Fragment } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import global_config from '../../../global_config.json';
import I18n from '../../../utils/i18n';
import QRAProfileBioEdit from './QRAProfileBioEdit';
class QRAProfileBio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      openPornConfirm: false
    };

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
            crashlytics().recordError(new Error('QRAProfileBio_DEV'));
          } else {
            crashlytics().recordError(new Error('QRAProfileBio_PRD'));
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
        // const currentSession = await Auth.currentSession();
        // const token = currentSession.getIdToken().getJwtToken();
        // this.props.actions.refreshToken(token);
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
  render() {
    const { edit } = this.state;
    const contentWidth = Dimensions.get('window').width;
    return (
      <Fragment>
        {/* <Segment raised> */}
        {this.props.currentQRA === this.props.qraInfo.qra && (
          <View>
            {/* <Button
              positive
              fluid
              size="mini"
              onClick={() => this.setState({ edit: true })}>
              {I18n.t('qra.editBio')}
            </Button> */}
          </View>
        )}
        <ScrollView style={{ flex: 1, margin: 2 }}>
          <HTMLView
            value={this.props.qraInfo.bio}
            // stylesheet={styles}
          />
        </ScrollView>

        {edit && (
          <QRAProfileBioEdit
            qraInfo={this.props.qraInfo}
            doSaveUserInfo={this.props.actions.doSaveUserInfo}
            modalOpen={edit}
            closeModal={() => this.setState({ edit: false })}
          />
        )}
        {/* </Segment> */}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({});
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
})(QRAProfileBio);
