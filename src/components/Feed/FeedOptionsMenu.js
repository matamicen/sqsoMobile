import API from '@aws-amplify/api';
import crashlytics from '@react-native-firebase/crashlytics';
import { Formik } from 'formik';
import analytics from '@react-native-firebase/analytics';
import React, { Fragment } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { Button, Icon, Overlay, Text } from 'react-native-elements';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
const { SlideInMenu } = renderers;
// import QslCardPrint from './qslCard';

const ReportContent = (props) => (
  <Overlay
    animationType="slide"
    isVisible={props.showReportContent}
    onBackdropPress={() => props.closeOverlay()}
    backdropStyle={{ opacity: 1 }}
    width="auto"
    height="auto"
    borderRadius={8}
    overlayStyle={styles.overlayStyle}>
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            alignSelf: 'flex-end'
          }}>
          <Icon
            name="close"
            type="font-awesome"
            onPress={() => props.closeOverlay()}
          />
        </View>

        <Text h4>{I18n.t('reportContent.helpUnderstandWhatsHappening')}</Text>

        <Formik
          initialValues={{ comment: '' }}
          onSubmit={(values, actions) => {
            switch (props.optionsCaller) {
              case 'FeedComment':
                props.handleOnSubmitReportComment(values);
                break;
              case 'FeedItem':
                props.handleOnSubmitReportQso(values);
                break;
              default:
            }
          }}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleBlur,
            handleSubmit
          }) => (
            <View style={styles.formik}>
              <View style={styles.view}>
                <TextInput
                  name="comments"
                  placeholder={I18n.t('reportContent.whyRemoveContent')}
                  multiline
                  numberOfLines={4}
                  onBlur={handleBlur('comment')}
                  style={{ borderWidth: 1, width: '100%' }}
                  onChangeText={handleChange('comments')}
                  value={values.comments}
                  autoFocus
                />
              </View>
              <View style={styles.view}>
                <TextInput
                  name="email"
                  placeholder={I18n.t('auth.labelEmail')}
                  onBlur={handleBlur('email')}
                  style={{ borderWidth: 1, width: '100%' }}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  autoFocus
                />
              </View>
              {/* <ReCAPTCHA
    sitekey="6Lf1VL8UAAAAAEyE2sQHbSr-tbH3_fwZqxEXEg-l"
    onChange={(response) =>
      this.setState({ recaptchaToken: response })
    }
  /> */}
              {/* <Form.Input
  type="hidden"
  name="idmedia"
  value={this.props.idqsos_media}
/> */}
              <View style={styles.view}>
                <Button
                  buttonStyle={styles.button}
                  size="small"
                  title={I18n.t('global.submit')}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  </Overlay>
);
class FeedOptionsMenu extends React.PureComponent {
  state = {
    showReportContent: false,
    showMessage: false,
    recaptchaToken: null,
    openMenu: false,
    comments: ''
  };
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  openReportedContent = () => this.setState({ showReportContent: true });
  closeReportedContent = () => this.setState({ showReportContent: false });
  open = () => this.setState({ showMessage: true });
  close = () => {
    this.setState({ showMessage: false });
    this.setState({ showReportContent: false });
  };
  deleteMedia() {
    this.props.actions.doDeleteMedia(
      this.props.idqsos_media,
      this.props.idqsos,
      this.props.token
    );
  }

  deleteComment() {
    this.props.actions.doCommentDelete(
      this.props.idcomment,
      this.props.idqsos,
      this.props.token,
      this.props.idqso_shared
    );
  }
  deleteQso() {
    this.props.actions.doDeleteQso(this.props.idqsos, this.props.token);
  }
  printQSLCard() {
    // this.props.actions.doQslCardPrint(this.props.idqso, this.props.token);
    // QslCardPrint(this.props);
  }
  handleOnSubmitReportComment(values) {
    // if (!__DEV__)
    //   window.gtag('event', 'reportContent_APPPRD', {
    //     event_category: 'QSO',
    //     event_label: 'reportComment'
    //   });
    if (!__DEV__) analytics().logEvent('reportContent_APPPRD');
    var datetime = new Date();
    // e.preventDefault();
    if (
      !values.comments
      // ||
      // !e.target.email.value ||
      // !this.state.recaptchaToken
    )
      // eslint-disable-next-line no-alert
      alert(I18n.t('reportContent.fillFields'));
    else {
      this.setState({ recaptchaToken: null });
      let apiName = 'superqso';
      let path = '/content-reported';
      let myInit = {
        body: {
          idqso: this.props.idqsos,
          idcomment: this.props.idcomment,
          detail: values.comments,
          datetime: datetime,
          email: values.email
        }, // replace this with attributes you need
        headers: {
          // Authorization: this.props.token
        } // OPTIONAL
      };
      API.post(apiName, path, myInit)
        .then((response) => {
          if (response.body.error > 0) {
          } else {
            this.setState({ showReportContent: false, openMenu: false });
            //ReactG.event({ category: "QSO", action: "contentReported" });
          }
        })
        .catch((error) => {
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__) {
            console.log('Unable to refresh Token');
            console.log(error);
            crashlytics().recordError(new Error('ReportComment_DEV'));
          } else {
            crashlytics().recordError(new Error('ReportComment_PRD'));
          }
        });
    }
  }
  handleOnSubmitReportQso(values) {
    // e.preventDefault();

    // if (!__DEV__)
    // window.gtag('event', 'reportContent_APPPRD', {
    //   event_category: 'QSO',
    //   event_label: 'reportQSO'
    // });
    if (!__DEV__) analytics().logEvent('reportContent_APPPRD');
    var datetime = new Date();

    if (
      !values.comments
      // ||
      // !e.target.email.value ||
      // !this.state.recaptchaToken
    )
      alert(I18n.t('reportContent.fillFields'));
    else {
      this.setState({ recaptchaToken: null });
      let apiName = 'superqso';
      let path = '/content-reported';
      let myInit = {
        body: {
          idqso: this.props.idqsos,
          detail: values.comments,
          datetime: datetime,
          email: values.email
        }, // replace this with attributes you need
        headers: {
          // Authorization: this.props.token
        } // OPTIONAL
      };
      API.post(apiName, path, myInit)
        .then((response) => {
          if (response.error > 0) {
          } else {
            this.setState({ showReportContent: false, openMenu: false });
          }
        })
        .catch((error) => {
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__) {
            console.log('Unable to refresh Token');
            console.log(error);
            crashlytics().recordError(new Error('ReportPost_DEV'));
          } else {
            crashlytics().recordError(new Error('ReportPost_PRD'));
          }
        });
    }
  }
  handleOnSubmitReportMedia(e) {
    // if (!__DEV__)
    //   window.gtag('event', 'reportMedia_APPPRD', {
    //     event_category: 'QSO',
    //     event_label: 'reportMedia'
    //   });
    if (!__DEV__) analytics().logEvent('reportContent_APPPRD');
    var datetime = new Date();
    // e.preventDefault();
    if (
      !e.target.comments.value ||
      // !e.target.email.value ||
      !this.state.recaptchaToken
    )
      alert(I18n.t('reportContent.fillFields'));
    else {
      this.setState({ recaptchaToken: null });
      let apiName = 'superqso';
      let path = '/content-reported';
      let myInit = {
        body: {
          idqso: this.props.idqsos,
          idmedia: e.target.idmedia.value,
          detail: e.target.comments.value,
          datetime: datetime,
          email: e.target.email.value
        }, // replace this with attributes you need
        headers: {
          // Authorization: this.props.token
        } // OPTIONAL
      };
      API.post(apiName, path, myInit)
        .then((response) => {
          if (response.body.error > 0) {
          } else {
            this.open();
          }
        })
        .catch((error) => {
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__) {
            console.log('Unable to refresh Token');
            console.log(error);
            crashlytics().recordError(new Error('ReportMedia_DEV'));
          } else {
            crashlytics().recordError(new Error('ReportMedia_PRD'));
          }
        });
    }
  }
  render() {
    let name;
    if (this.props.optionsCaller === 'FeedComment') {
      name = this.props.idqsos + '-' + this.props.idcomment;
    } else {
      name = this.props.idqsos + this.props.optionsCaller;
    }

    return (
      <Fragment>
        <Icon
          size={30}
          name="ellipsis-v"
          type="font-awesome"
          onPress={() => {
            this.setState({ openMenu: true });
          }}
        />

        <Menu
          onBackdropPress={() => this.setState({ openMenu: false })}
          opened={this.state.openMenu}
          name={name.toString()}
          renderer={SlideInMenu}
          // onSelect={(value) => this.selectNumber(value)}
        >
          <MenuTrigger style={styles.trigger} />
          <MenuOptions
            customStyles={{
              optionText: [styles.text, styles.slideInOption]
            }}>
            {/* FEED ITEM DELETE COMMENT*/}
            {this.props.optionsCaller === 'FeedComment' &&
              this.props.currentQRA === this.props.comment_owner && (
                <MenuOption
                  onSelect={() => {
                    this.deleteComment();
                    this.setState({ openMenu: false });
                  }}
                  text={I18n.t('reportContent.deleteComment')}
                />
              )}
            {/* END FEED ITEM DELETE COMMENT*/}
            {/*  FEED ITEM REPORT COMMENT */}
            {this.props.optionsCaller === 'FeedComment' &&
              this.props.comment_owner !== this.props.currentQRA && (
                <MenuOption
                  onSelect={() => this.setState({ showReportContent: true })}
                  text={I18n.t('reportContent.reportContent')}
                />
              )}
            {/* END FEED ITEM REPORT COMMENT */}

            {/* FEED ITEM DELETE QSO*/}
            {this.props.optionsCaller === 'FeedItem' &&
              this.props.currentQRA === this.props.qso_owner && (
                <MenuOption
                  onSelect={() => {
                    this.deleteQso();
                    this.setState({ openMenu: false });
                  }}
                  text={I18n.t('reportContent.deleteQSO')}
                />
              )}
            {/* END FEED ITEM DELETE QSO*/}
            {/* FEED ITEM REPORT QSO*/}
            {this.props.optionsCaller === 'FeedItem' &&
              this.props.currentQRA !== this.props.qso_owner && (
                <MenuOption
                  onSelect={() => this.setState({ showReportContent: true })}
                  text={I18n.t('reportContent.reportContent')}
                />
              )}
            {/* END FEED ITEM REPORT QSO*/}
            {/* FEED IMAGE REPORT CONTENT */}
            {this.props.optionsCaller === 'FeedImage' &&
              // this.props.currentQRA &&
              this.props.currentQRA !== this.props.qso_owner && (
                <MenuOption
                  onSelect={() => this.setState({ showReportContent: true })}
                  text={I18n.t('reportContent.reportPhoto')}
                />
              )}
            {/* END FEED IMAGE REPORT CONTENT */}
            {/* FEED IMAGE DELETE CONTENT */}
            {/* {this.props.optionsCaller === 'FeedImage' &&
            this.props.currentQRA === this.props.qso_owner && (
              <Dropdown.Item
                icon="delete"
                text={I18n.t('reportContent.deletePhoto')}
                onClick={this.deleteMedia.bind(this)}
              />
            )} */}
            {/* END FEED IMAGE DELETE CONTENT */}
            {/* FEED AUDIO REPORT CONTENT */}

            {/* {this.props.optionsCaller === 'FeedAudio' &&
            // this.props.currentQRA &&
            this.props.currentQRA !== this.props.qso_owner && (
              <Modal
                open={showReportContent}
                onOpen={this.openReportedContent}
                onClose={this.closeReportedContent}
                size="tiny"
                closeIcon
                trigger={
                  <Dropdown.Item
                    icon="warning"
                    text={I18n.t('reportContent.reportAudio')}
                  />
                }>
                <Modal.Header>
                  {I18n.t('reportContent.helpUnderstandWhatsHappening')}
                </Modal.Header>
                <Modal.Content>
                  <Form onSubmit={(e) => this.handleOnSubmitReportMedia(e)}>
                    <Form.TextArea
                      required
                      name="comments"
                      label={I18n.t('reportContent.labelComments')}
                      placeholder={I18n.t('reportContent.whyRemoveAudio')}
                    />
                    <Form.Input
                      name="email"
                      label={I18n.t('auth.labelEmail')}
                    />
                    <Form.Input
                      type="hidden"
                      name="idmedia"
                      value={this.props.idqsos_media}
                    />
                    <Form.Field>
                      <ReCAPTCHA
                        sitekey="6Lf1VL8UAAAAAEyE2sQHbSr-tbH3_fwZqxEXEg-l"
                        onChange={(response) =>
                          this.setState({ recaptchaToken: response })
                        }
                      />
                    </Form.Field>
                    <Form.Button>{I18n.t('global.submit')}</Form.Button>

                    <Modal
                      dimmer={false}
                      open={showMessage}
                      onOpen={this.open}
                      onClose={this.close}
                      size="small">
                      <Modal.Header>
                        {I18n.t('reportContent.reportAudio')}
                      </Modal.Header>
                      <Modal.Content>
                        <p>{I18n.t('reportContent.audioReported')}</p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          icon="check"
                          content={I18n.t('global.close')}
                          onClick={this.close}
                        />
                      </Modal.Actions>
                    </Modal>
                  </Form>
                </Modal.Content>
              </Modal>
            )} */}
            {/* END FEED AUDIO REPORT CONTENT */}
            {/* FEED AUDIO DELETE CONTENT */}
            {/* {this.props.optionsCaller === 'FeedAudio' &&
            this.props.currentQRA === this.props.qso_owner && (
              <Dropdown.Item
                icon="delete"
                text={I18n.t('reportContent.deleteAudio')}
                onClick={this.deleteMedia.bind(this)}
              />
            )} */}
            {/* END FEED AUDIO DELETE CONTENT */}
            {/* FEED ITEM QR CODE */}
            {/* {this.props.optionsCaller === 'FeedItem' &&
            this.props.currentQRA === this.props.qso_owner && (
              <Fragment>

                <Modal
                  size="tiny"
                  closeIcon
                  open={showReportContent}
                  onOpen={this.openReportedContent}
                  onClose={this.closeReportedContent}
                  trigger={
                    <Dropdown.Item
                      icon="warning"
                      text={I18n.t('reportContent.reportContent')}
                    />
                  }>
                  <Modal.Header>
                    {I18n.t('reportContent.helpUnderstandWhatsHappening')}
                  </Modal.Header>
                  <Modal.Content>
                    <Form onSubmit={(e) => this.handleOnSubmitReportQso(e)}>
                      <Form.TextArea
                        required
                        name="comments"
                        label={I18n.t('reportContent.labelComments')}
                        placeholder={I18n.t('reportContent.whyRemoveContent')}
                        autoFocus
                      />
                      <Form.Input
                        name="email"
                        label={I18n.t('auth.labelEmail')}
                      />
                      <Form.Field>
                        <ReCAPTCHA
                          sitekey="6Lf1VL8UAAAAAEyE2sQHbSr-tbH3_fwZqxEXEg-l"
                          onChange={(response) =>
                            this.setState({ recaptchaToken: response })
                          }
                        />
                      </Form.Field>
                      <Form.Button>{I18n.t('global.submit')}</Form.Button>
                    </Form>
                    <Modal
                      open={showMessage}
                      onOpen={this.open}
                      onClose={this.close}
                      size="small">
                      <Modal.Header>
                        {I18n.t('reportContent.reportContent')}
                      </Modal.Header>
                      <Modal.Content>
                        <p>{I18n.t('reportContent.contentReported')}</p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          icon="check"
                          content={I18n.t('global.close')}
                          onClick={this.close}
                        />
                      </Modal.Actions>
                    </Modal>
                  </Modal.Content>
                </Modal>
              </Fragment>
            )} */}
            {/* END FEED ITEM QR CODE */}

            {/* FEED ITEM PRINT QSL CARD*/}
            {/* {this.props.optionsCaller === 'FeedItem' && this.props.QslCard && (
            <Modal
              trigger={
                <Dropdown.Item
                  icon="print"
                  text={I18n.t('reportContent.printQSLCard')}
                />
              }
              header={I18n.t('reportContent.QSLCard')}
              content={I18n.t('reportContent.disablePopUps')}
              onActionClick={this.printQSLCard.bind(this)}
              actions={[
                {
                  key: 'done',
                  content: I18n.t('reportContent.printQSLCard'),
                  positive: true
                }
              ]}
            />
          )} */}
            {/* END FEED ITEM QSL CARD*/}
          </MenuOptions>
          {this.state.showReportContent && (
            <ReportContent
              optionsCaller={this.props.optionsCaller}
              showReportContent={this.state.showReportContent}
              closeOverlay={() => this.setState({ showReportContent: false })}
              handleOnSubmitReportQso={(values) =>
                this.handleOnSubmitReportQso(values)
              }
              handleOnSubmitReportComment={(values) =>
                this.handleOnSubmitReportComment(values)
              }
            />
          )}
        </Menu>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  overlayStyle: {
    position: 'absolute',
    flex: 1,
    top: 50,
    // bottom: 50,
    width: '80%'
    // height: '80%'
  },
  formik: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  view: {
    flex: 1
  },
  button: {},
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightgray'
  },
  topbar: {
    flexDirection: 'row',
    backgroundColor: 'dimgray',
    paddingTop: 15
  },
  trigger: {
    padding: 5,
    margin: 5
  },
  triggerText: {
    color: 'white'
  },
  disabled: {
    color: '#ccc'
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  logView: {
    flex: 1,
    flexDirection: 'column'
  },
  logItem: {
    flexDirection: 'row',
    padding: 8
  },
  slideInOption: {
    padding: 5
  },
  text: {
    fontSize: 30,
    backgroundColor: 'gray'
  }
});
const mapStateToProps = (state) => ({
  token: state.sqso.jwtToken,
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(FeedOptionsMenu);
