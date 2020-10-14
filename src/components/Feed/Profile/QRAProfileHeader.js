import React from 'react';
import { withTranslation } from 'react-i18next';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Flag from 'semantic-ui-react/dist/commonjs/elements/Flag';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import '../../styles/style.css';
import { MY_COUNTRIES_DATA } from './countries.js';
class QRAProfileHeader extends React.Component {
  state = { showModal: false };
  close = () => this.setState({ showModal: false });
  open = () => {
    if (this.props.qraInfo && this.props.qraInfo.profilepic) {
      if (process.env.REACT_APP_STAGE === 'production')
        window.gtag('event', 'profilePicModalOpen_WEBPRD', {

        });
      this.setState({ showModal: true });
    }
  };
  render() {
    const { t } = this.props;
    let buttonText;

    if (this.props.followed) {
      buttonText = t('qra.unfollow');
    } else {
      buttonText = this.props.followers.some(
        o => o.qra === this.props.qraInfo.qra
      )
        ? t('qra.followToo')
        : t('qra.follow');
    }

    var result = this.props.qraInfo
      ? MY_COUNTRIES_DATA.filter(obj => {
          return obj.key === this.props.qraInfo.country;
        })
      : null;

    return (
      <div className="profile-header">
        <Segment>
          <div className="inner">
            <div className="pic">
              <Image
                src={
                  this.props.qraInfo && this.props.qraInfo.profilepic
                    ? this.props.qraInfo.profilepic
                    : '/emptyprofile.png'
                }
                onClick={() => this.open()}
                centered
                size="small"
                circular
              />
            </div>
            <div className="detail">
              {/* <div> */}
              <h1 style={{ display: 'inline', marginRight: '2%' }}>
                <span className="qra">{this.props.qraInfo.qra}</span>
              </h1>
              <Flag
                name={
                  this.props.qraInfo.country !== '' &&
                  this.props.qraInfo.country !== null
                    ? this.props.qraInfo.country.toLowerCase()
                    : null
                }
              />
              <span>{result.length > 0 ? result[0].text : null}</span>
              {/* </div> */}
              <Divider
                hidden
                style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
              />
              <h2 style={{ margin: 'initial' }}>
                <div className="name">
                  {this.props.qraInfo.firstname &&
                    this.props.qraInfo.firstname + ' '}
                  {this.props.qraInfo.lastname && this.props.qraInfo.lastname}
                </div>
              </h2>

              <div className="kpi">
                {this.props.qraInfo.views_counter ? (
                  <div style={{ marginRight: '5%' }}>
                    {t('qra.views')}: {this.props.qraInfo.views_counter}
                  </div>
                ) : (
                  ''
                )}
                {this.props.qraInfo.qsos_counter ? (
                  <div style={{ marginRight: '5%' }}>
                    {t('qra.qsos')}: {this.props.qraInfo.qsos_counter}
                  </div>
                ) : (
                  ''
                )}
                {this.props.qraInfo.followers_counter ? (
                  <div style={{ marginRight: '5%' }}>
                    {t('qra.followers')}: {this.props.qraInfo.followers_counter}
                  </div>
                ) : (
                  ''
                )}
              </div>

              <Divider hidden style={{ marginBottom: '0vh' }} />
              <div className="follow">
                {this.props.isAuthenticated &&
                  this.props.userFetched &&
                  this.props.qraInfo.qra !== this.props.currentQRA && (
                    <Button
                      size="small"
                      // positive={!props.following.some(o => o.qra === this.props.qraInfo.qra)}
                      positive={!this.props.followed}
                      onClick={() => this.props.onClick()}
                      style={{ paddingLeft: '1em', paddingRight: '1em' }}
                    >
                      {buttonText}
                    </Button>
                  )}
              </div>
            </div>
          </div>
        </Segment>
        <Modal
          centered={false}
          closeIcon={{
            style: { top: '0.0535rem', right: '0rem' },
            color: 'black',
            name: 'close'
          }}
          open={this.state.showModal}
          onClose={this.close}
          // style={{ height: '90%', overflowY: 'auto' }}
          style={{ width: 'fit-content' }}
        >
          <Modal.Content >
            <Modal.Description>
              <div style={{ padding: '1vh' }}>
                <Image
                  centered
                  rounded
                  alt={'no description'}
                  // size="medium"
                  src={this.props.qraInfo.profilepic}
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    margin: '0 auto'
                  }}
                />
              </div>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default withTranslation()(QRAProfileHeader);
