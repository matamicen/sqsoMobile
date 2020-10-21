import React from 'react';
import { withTranslation } from 'react-i18next';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
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
      if (!__DEV__) window.gtag('event', 'profilePicModalOpen_WEBPRD', {});
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
        (o) => o.qra === this.props.qraInfo.qra
      )
        ? t('qra.followToo')
        : t('qra.follow');
    }

    var result = this.props.qraInfo
      ? MY_COUNTRIES_DATA.filter((obj) => {
          return obj.key === this.props.qraInfo.country;
        })
      : null;

    return (
      <View className="profile-header">
        <Segment>
          <View className="inner">
            <View className="pic">
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
            </View>
            <View className="detail">
              {/* <View> */}
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
              {/* </View> */}
              <Divider
                hidden
                style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
              />
              <h2 style={{ margin: 'initial' }}>
                <View className="name">
                  {this.props.qraInfo.firstname &&
                    this.props.qraInfo.firstname + ' '}
                  {this.props.qraInfo.lastname && this.props.qraInfo.lastname}
                </View>
              </h2>

              <View className="kpi">
                {this.props.qraInfo.views_counter ? (
                  <View style={{ marginRight: '5%' }}>
                    {t('qra.views')}: {this.props.qraInfo.views_counter}
                  </View>
                ) : (
                  ''
                )}
                {this.props.qraInfo.qsos_counter ? (
                  <View style={{ marginRight: '5%' }}>
                    {t('qra.qsos')}: {this.props.qraInfo.qsos_counter}
                  </View>
                ) : (
                  ''
                )}
                {this.props.qraInfo.followers_counter ? (
                  <View style={{ marginRight: '5%' }}>
                    {t('qra.followers')}: {this.props.qraInfo.followers_counter}
                  </View>
                ) : (
                  ''
                )}
              </View>

              <Divider hidden style={{ marginBottom: '0vh' }} />
              <View className="follow">
                {this.props.isAuthenticated &&
                  this.props.userFetched &&
                  this.props.qraInfo.qra !== this.props.currentQRA && (
                    <Button
                      size="small"
                      // positive={!props.following.some(o => o.qra === this.props.qraInfo.qra)}
                      positive={!this.props.followed}
                      onClick={() => this.props.onClick()}
                      style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                      {buttonText}
                    </Button>
                  )}
              </View>
            </View>
          </View>
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
          style={{ width: 'fit-content' }}>
          <Modal.Content>
            <Modal.Description>
              <View style={{ padding: '1vh' }}>
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
              </View>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </View>
    );
  }
}

export default withTranslation()(QRAProfileHeader);
