import API from '@aws-amplify/api';
import * as Sentry from '@sentry/browser';
import React, { Fragment } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from 'react-native-elements';
//import I18n from '../../utils/i18n';;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import * as Actions from '../../actions';
import QslCardPrint from './qslCard';
class FeedOptionsMenu extends React.Component {
  state = {
    showReportContent: false,
    showMessage: false,
    recaptchaToken: null,
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
      this.props.idqso,
      this.props.token
    );
  }

  deleteComment() {
    this.props.actions.doCommentDelete(
      this.props.idcomment,
      this.props.idqso,
      this.props.token
    );
  }
  deleteQso() {
    this.props.actions.doDeleteQso(this.props.idqso, this.props.token);
  }
  printQSLCard() {
    this.props.actions.doQslCardPrint(this.props.idqso, this.props.token);
    QslCardPrint(this.props);
  }
  handleOnSubmitReportComment(e) {
    const { t } = this.props;
    if (!__DEV__)
      window.gtag('event', 'reportContent_WEBPRD', {
        event_category: 'QSO',
        event_label: 'reportComment'
      });
    var datetime = new Date();
    // e.preventDefault();
    if (
      !e.target.comments.value ||
      // !e.target.email.value ||
      !this.state.recaptchaToken
    )
      alert(t('reportContent.fillFields'));
    else {
      this.setState({ recaptchaToken: null });
      let apiName = 'superqso';
      let path = '/content-reported';
      let myInit = {
        body: {
          idqso: this.props.idqso,
          idcomment: this.props.idcomment,
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
            //ReactG.event({ category: "QSO", action: "contentReported" });
          }
        })
        .catch((error) => {
          if (__DEV__) {
            console.log(error);
          } else {
            Sentry.configureScope(function (scope) {
              scope.setExtra('ENV', process.env.REACT_APP_STAGE);
            });
            Sentry.captureException(error);
          }
        });
    }
  }
  handleOnSubmitReportQso(e) {
    // e.preventDefault();
    const { t } = this.props;
    if (!__DEV__)
      window.gtag('event', 'reportContent_WEBPRD', {
        event_category: 'QSO',
        event_label: 'reportQSO'
      });
    var datetime = new Date();

    if (
      !e.target.comments.value ||
      // !e.target.email.value ||
      !this.state.recaptchaToken
    )
      alert(t('reportContent.fillFields'));
    else {
      this.setState({ recaptchaToken: null });
      let apiName = 'superqso';
      let path = '/content-reported';
      let myInit = {
        body: {
          idqso: this.props.idqso,
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
          if (response.error > 0) {
          } else {
            this.open();
          }
        })
        .catch((error) => {
          if (__DEV__) {
            console.log(error);
          } else {
            Sentry.configureScope(function (scope) {
              scope.setExtra('ENV', process.env.REACT_APP_STAGE);
            });
            Sentry.captureException(error);
          }
        });
    }
  }
  handleOnSubmitReportMedia(e) {
    const { t } = this.props;
    if (!__DEV__)
      window.gtag('event', 'reportMedia_WEBPRD', {
        event_category: 'QSO',
        event_label: 'reportMedia'
      });
    var datetime = new Date();
    // e.preventDefault();
    if (
      !e.target.comments.value ||
      // !e.target.email.value ||
      !this.state.recaptchaToken
    )
      alert(t('reportContent.fillFields'));
    else {
      this.setState({ recaptchaToken: null });
      let apiName = 'superqso';
      let path = '/content-reported';
      let myInit = {
        body: {
          idqso: this.props.idqso,
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
          if (__DEV__) {
            console.log(error);
          } else {
            Sentry.configureScope(function (scope) {
              scope.setExtra('ENV', process.env.REACT_APP_STAGE);
            });
            Sentry.captureException(error);
          }
        });
    }
  }
  render() {
    const { showMessage, showReportContent } = this.state;
    const { t } = this.props;
    return (
      <Dropdown
        icon="ellipsis vertical"
        size="tiny"
        className="icon"
        pointing="right">
        <Dropdown.Menu>
          {/* FEED IMAGE REPORT CONTENT */}
          {this.props.optionsCaller === 'FeedImage' &&
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
                    text={t('reportContent.reportPhoto')}
                  />
                }>
                <Modal.Header>
                  {t('reportContent.helpUnderstandWhatsHappening')}
                </Modal.Header>
                <Modal.Content>
                  <Form onSubmit={(e) => this.handleOnSubmitReportMedia(e)}>
                    <Form.TextArea
                      required
                      name="comments"
                      label={t('reportContent.labelComments')}
                      placeholder={t('reportContent.whyRemovePhoto')}
                    />
                    <Form.Input name="email" label={t('auth.labelEmail')} />
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
                    <Form.Button>{t('global.submit')}</Form.Button>

                    <Modal
                      // dimmer={false}
                      open={showMessage}
                      onOpen={this.open}
                      onClose={this.close}
                      size="small">
                      <Modal.Header>
                        {t('reportContent.reportPhoto')}
                      </Modal.Header>
                      <Modal.Content>
                        <p>{t('reportContent.photoReported')}</p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          icon="check"
                          content={t('global.close')}
                          onClick={this.close}
                        />
                      </Modal.Actions>
                    </Modal>
                  </Form>
                </Modal.Content>
              </Modal>
            )}
          {/* END FEED IMAGE REPORT CONTENT */}
          {/* FEED IMAGE DELETE CONTENT */}
          {this.props.optionsCaller === 'FeedImage' &&
            this.props.currentQRA === this.props.qso_owner && (
              <Dropdown.Item
                icon="delete"
                text={t('reportContent.deletePhoto')}
                onClick={this.deleteMedia.bind(this)}
              />
            )}
          {/* END FEED IMAGE DELETE CONTENT */}
          {/* FEED AUDIO REPORT CONTENT */}

          {this.props.optionsCaller === 'FeedAudio' &&
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
                    text={t('reportContent.reportAudio')}
                  />
                }>
                <Modal.Header>
                  {t('reportContent.helpUnderstandWhatsHappening')}
                </Modal.Header>
                <Modal.Content>
                  <Form onSubmit={(e) => this.handleOnSubmitReportMedia(e)}>
                    <Form.TextArea
                      required
                      name="comments"
                      label={t('reportContent.labelComments')}
                      placeholder={t('reportContent.whyRemoveAudio')}
                    />
                    <Form.Input name="email" label={t('auth.labelEmail')} />
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
                    <Form.Button>{t('global.submit')}</Form.Button>

                    <Modal
                      dimmer={false}
                      open={showMessage}
                      onOpen={this.open}
                      onClose={this.close}
                      size="small">
                      <Modal.Header>
                        {t('reportContent.reportAudio')}
                      </Modal.Header>
                      <Modal.Content>
                        <p>{t('reportContent.audioReported')}</p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          icon="check"
                          content={t('global.close')}
                          onClick={this.close}
                        />
                      </Modal.Actions>
                    </Modal>
                  </Form>
                </Modal.Content>
              </Modal>
            )}
          {/* END FEED AUDIO REPORT CONTENT */}
          {/* FEED AUDIO DELETE CONTENT */}
          {this.props.optionsCaller === 'FeedAudio' &&
            this.props.currentQRA === this.props.qso_owner && (
              <Dropdown.Item
                icon="delete"
                text={t('reportContent.deleteAudio')}
                onClick={this.deleteMedia.bind(this)}
              />
            )}
          {/* END FEED AUDIO DELETE CONTENT */}
          {/* FEED ITEM QR CODE */}
          {this.props.optionsCaller === 'FeedItem' &&
            this.props.currentQRA === this.props.qso_owner && (
              <Fragment>
                {/* <Modal
                size="tiny"
                closeIcon
                trigger={
                  <Dropdown.Item
                    icon="qrcode"
                    text={t('reportContent.showQRCode')}
                  />
                }
              >
                <Modal.Header>{t('reportContent.QRCode')}</Modal.Header>
                <Modal.Content>
                  <Grid centered>
                    <Segment raised>
                      <QRCode value={this.props.guid} />
                    </Segment>
                  </Grid>
                </Modal.Content>
              </Modal> */}
                <Modal
                  size="tiny"
                  closeIcon
                  open={showReportContent}
                  onOpen={this.openReportedContent}
                  onClose={this.closeReportedContent}
                  trigger={
                    <Dropdown.Item
                      icon="warning"
                      text={t('reportContent.reportContent')}
                    />
                  }>
                  <Modal.Header>
                    {t('reportContent.helpUnderstandWhatsHappening')}
                  </Modal.Header>
                  <Modal.Content>
                    <Form onSubmit={(e) => this.handleOnSubmitReportQso(e)}>
                      <Form.TextArea
                        required
                        name="comments"
                        label={t('reportContent.labelComments')}
                        placeholder={t('reportContent.whyRemoveContent')}
                        autoFocus
                      />
                      <Form.Input name="email" label={t('auth.labelEmail')} />
                      <Form.Field>
                        <ReCAPTCHA
                          sitekey="6Lf1VL8UAAAAAEyE2sQHbSr-tbH3_fwZqxEXEg-l"
                          onChange={(response) =>
                            this.setState({ recaptchaToken: response })
                          }
                        />
                      </Form.Field>
                      <Form.Button>{t('global.submit')}</Form.Button>
                    </Form>
                    <Modal
                      open={showMessage}
                      onOpen={this.open}
                      onClose={this.close}
                      size="small">
                      <Modal.Header>
                        {t('reportContent.reportContent')}
                      </Modal.Header>
                      <Modal.Content>
                        <p>{t('reportContent.contentReported')}</p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          icon="check"
                          content={t('global.close')}
                          onClick={this.close}
                        />
                      </Modal.Actions>
                    </Modal>
                  </Modal.Content>
                </Modal>
              </Fragment>
            )}
          {/* END FEED ITEM QR CODE */}
          {/* FEED ITEM DELETE QSO*/}
          {this.props.optionsCaller === 'FeedItem' &&
            this.props.currentQRA === this.props.qso_owner && (
              <Dropdown.Item
                icon="delete"
                text={t('reportContent.deleteQSO')}
                onClick={this.deleteQso.bind(this)}
              />
            )}
          {/* END FEED ITEM DELETE QSO*/}
          {/* FEED ITEM PRINT QSL CARD*/}
          {this.props.optionsCaller === 'FeedItem' && this.props.QslCard && (
            <Modal
              trigger={
                <Dropdown.Item
                  icon="print"
                  text={t('reportContent.printQSLCard')}
                />
              }
              header={t('reportContent.QSLCard')}
              content={t('reportContent.disablePopUps')}
              onActionClick={this.printQSLCard.bind(this)}
              actions={[
                {
                  key: 'done',
                  content: t('reportContent.printQSLCard'),
                  positive: true
                }
              ]}
            />
          )}
          {/* END FEED ITEM QSL CARD*/}
          {/* FEED ITEM REPORT QSO*/}
          {this.props.optionsCaller === 'FeedItem' &&
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
                    text={t('reportContent.reportContent')}
                  />
                }>
                <Modal.Header>
                  {t('reportContent.helpUnderstandWhatsHappening')}
                </Modal.Header>
                <Modal.Content>
                  <Form onSubmit={(e) => this.handleOnSubmitReportQso(e)}>
                    <Form.TextArea
                      required
                      name="comments"
                      label={t('reportContent.labelComments')}
                      placeholder={t('reportContent.whyRemoveContent')}
                    />
                    <Form.Input name="email" label={t('auth.labelEmail')} />
                    <Form.Field>
                      <ReCAPTCHA
                        sitekey="6Lf1VL8UAAAAAEyE2sQHbSr-tbH3_fwZqxEXEg-l"
                        onChange={(response) =>
                          this.setState({ recaptchaToken: response })
                        }
                      />
                    </Form.Field>
                    <Form.Button>{t('global.submit')}</Form.Button>

                    <Modal
                      open={showMessage}
                      onOpen={this.open}
                      onClose={this.close}
                      size="small">
                      <Modal.Header>
                        {t('reportContent.reportContent')}
                      </Modal.Header>
                      <Modal.Content>
                        <p>{t('reportContent.contentReported')}</p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          icon="check"
                          content={t('global.close')}
                          onClick={this.close}
                        />
                      </Modal.Actions>
                    </Modal>
                  </Form>
                </Modal.Content>
              </Modal>
            )}
          {/* END FEED ITEM REPORT QSO*/}
          {/*  FEED ITEM REPORT COMMENT */}
          {this.props.optionsCaller === 'FeedComment' &&
            // this.props.currentQRA &&
            this.props.comment_owner !== this.props.currentQRA && (
              <Modal
                open={showReportContent}
                onOpen={this.openReportedContent}
                onClose={this.closeReportedContent}
                size="tiny"
                closeIcon
                trigger={
                  <Dropdown.Item
                    icon="warning"
                    text={t('reportContent.reportContent')}
                  />
                }>
                <Modal.Header>
                  {t('reportContent.helpUnderstandWhatsHappening')}
                </Modal.Header>
                <Modal.Content>
                  <Form onSubmit={(e) => this.handleOnSubmitReportComment(e)}>
                    <Form.TextArea
                      required
                      name="comments"
                      label={t('reportContent.labelComments')}
                      placeholder={t('reportContent.whyRemoveContent')}
                    />
                    <Form.Input name="email" label={t('qra.email')} />
                    <Form.Field>
                      <ReCAPTCHA
                        sitekey="6Lf1VL8UAAAAAEyE2sQHbSr-tbH3_fwZqxEXEg-l"
                        onChange={(response) =>
                          this.setState({ recaptchaToken: response })
                        }
                      />
                    </Form.Field>
                    <Form.Button>{t('global.submit')}</Form.Button>

                    <Modal
                      open={showMessage}
                      onOpen={this.open}
                      onClose={this.close}
                      size="small">
                      <Modal.Header>
                        {t('reportContent.reportComment')}
                      </Modal.Header>
                      <Modal.Content>
                        <p>{t('reportContent.commentReported')}</p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          icon="check"
                          content={t('global.close')}
                          onClick={this.close}
                        />
                      </Modal.Actions>
                    </Modal>
                  </Form>
                </Modal.Content>
              </Modal>
            )}
          {/* END FEED ITEM REPORT COMMENT */}
          {/* FEED ITEM DELETE COMMENT*/}
          {this.props.optionsCaller === 'FeedComment' &&
            this.props.currentQRA === this.props.comment_owner && (
              <Dropdown.Item
                icon="delete"
                text={t('reportContent.deleteComment')}
                onClick={this.deleteComment.bind(this)}
              />
            )}
          {/* END FEED ITEM DELETE COMMENT*/}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.sqso.jwtToken,
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(withTranslation()(FeedOptionsMenu));
