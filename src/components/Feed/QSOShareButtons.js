import React from 'react';
//import { withTranslation } from 'react-i18next';
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'react-share';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
// import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
const QSOShareButtons = ({ idqso, t, title }) => {
  return (
    <Button>
      <View style={{ display: 'grid', justifyItems: 'center' }}>
        <Dropdown
          // text="Filter Posts"
          icon="share alternate"
          floating
          // labeled
          // button
          className="icon"
          style={{ zIndex: 10, textAlign: 'center', alignSelf: 'center' }}>
          <Dropdown.Menu>
            <Dropdown.Item
              style={{ display: 'flex', justifyContent: 'center' }}>
              <View className="socialDesktop">
                <WhatsappShareButton
                  title={title}
                  url={window.location.origin + '/qso/' + idqso}
                  beforeOnClick={() => {
                    if (!__DEV__)
                      window.gtag('event', 'qsoShareWAPP_WEBPRD', {
                        event_category: 'QSO',
                        event_label: 'shareWAPP'
                      });
                  }}>
                  <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>

                <FacebookShareButton
                  quote={title}
                  url={window.location.origin + '/qso/' + idqso}
                  beforeOnClick={() => {
                    if (!__DEV__)
                      window.gtag('event', 'qsoShareFB_WEBPRD', {
                        event_category: 'QSO',
                        event_label: 'shareFB'
                      });
                  }}>
                  <FacebookIcon size={40} round={true} />
                </FacebookShareButton>

                <TwitterShareButton
                  title={title}
                  url={window.location.origin + '/qso/' + idqso}
                  beforeOnClick={() => {
                    if (!__DEV__)
                      window.gtag('event', 'qsoShareTW_WEBPRD', {
                        event_category: 'QSO',
                        event_label: 'shareTW'
                      });
                  }}>
                  <TwitterIcon size={40} round={true} />
                </TwitterShareButton>
              </View>
              <View className="socialMobile">
                <a
                  href={
                    'whatsapp://send?text=' +
                    encodeURIComponent(
                      title + ' ' + window.location.origin + '/qso/' + idqso
                    )
                  }
                  onClick={() => {
                    if (!__DEV__)
                      window.gtag('event', 'qsoShareWAPP_WEBPRD', {
                        event_category: 'QSO',
                        event_label: 'shareWAPP'
                      });
                  }}
                  data-action="share/whatsapp/share">
                  {' '}
                  <WhatsappIcon size={40} round={true} />
                </a>
                <FacebookShareButton
                  quote={title}
                  url={window.location.origin + '/qso/' + idqso}
                  beforeOnClick={() => {
                    if (!__DEV__)
                      window.gtag('event', 'qsoShareFB_WEBPRD', {
                        event_category: 'QSO',
                        event_label: 'shareFB'
                      });
                  }}>
                  <FacebookIcon size={40} round={true} />
                </FacebookShareButton>
                <a
                  href={
                    'https://twitter.com/intent/tweet?url=' +
                    encodeURIComponent(
                      window.location.origin + '/qso/' + idqso
                    ) +
                    '&text=' +
                    encodeURIComponent(title)
                  }
                  onClick={() => {
                    if (!__DEV__)
                      window.gtag('event', 'qsoShareTW_WEBPRD', {
                        event_category: 'QSO',
                        event_label: 'shareTW'
                      });
                  }}>
                  <TwitterIcon size={40} round={true} />
                </a>
              </View>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <span style={{ fontSize: '1rem' }}>{t('qso.share')}</span>
      </View>
    </Button>
  );
};

export default withTranslation()(QSOShareButtons);
