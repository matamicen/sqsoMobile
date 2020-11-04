import React from 'react';
import { Button, Icon } from 'react-native-elements';
import Share from 'react-native-share';
import global_config from '../../global_config.json';
import I18n from '../../utils/i18n';
class QSOShareButtons extends React.PureComponent {
  share = () => {
    // const url = 'https://www.superqso.com/qso/e2166569-599b-11ea-9581-0a96c372e817';
    // const url = 'http://superqso-dev.us-east-1.elasticbeanstalk.com/qso/'+this.props.sharerluid;
    const url = global_config.urlWeb + 'qso/' + this.props.idqso;
    const title = this.props.title;
    const message = I18n.t('ShareMessage');
    const options = {
      title,
      subject: title,
      message: `${title} ${url}`
    };

    Share.open(options);

    // if (!__DEV__)
    //                   window.gtag('event', 'qsoShareWAPP_WEBPRD', {
    //                     event_category: 'QSO',
    //                     event_label: 'shareWAPP'
    //                   });    // if (!__DEV__)
    //   analytics().logEvent('SHARE_PRD', {
    //     QRA: this.props.qra,
    //     SQLRDSID: this.props.sqlrdsid,
    //     BAND: this.props.band,
    //     MODE: this.props.mode,
    //     URLSHARE: this.props.sharerluid
    //   });
  };
  render() {
    return (
      // <Button>
      //   <View style={{ display: 'grid', justifyItems: 'center' }}>
      //     <Dropdown
      //       // text="Filter Posts"
      //       icon="share alternate"
      //       floating
      //       // labeled
      //       // button
      //       className="icon"
      //       style={{ zIndex: 10, textAlign: 'center', alignSelf: 'center' }}>
      //       <Dropdown.Menu>
      //         <Dropdown.Item
      //           style={{ display: 'flex', justifyContent: 'center' }}>
      //           <View className="socialDesktop">
      //             <WhatsappShareButton
      //               title={title}
      //               url={window.location.origin + '/qso/' + idqso}
      //               beforeOnClick={() => {
      //                 if (!__DEV__)
      //                   window.gtag('event', 'qsoShareWAPP_WEBPRD', {
      //                     event_category: 'QSO',
      //                     event_label: 'shareWAPP'
      //                   });
      //               }}>
      //               <WhatsappIcon size={40} round={true} />
      //             </WhatsappShareButton>

      //             <FacebookShareButton
      //               quote={title}
      //               url={window.location.origin + '/qso/' + idqso}
      //               beforeOnClick={() => {
      //                 if (!__DEV__)
      //                   window.gtag('event', 'qsoShareFB_WEBPRD', {
      //                     event_category: 'QSO',
      //                     event_label: 'shareFB'
      //                   });
      //               }}>
      //               <FacebookIcon size={40} round={true} />
      //             </FacebookShareButton>

      //             <TwitterShareButton
      //               title={title}
      //               url={window.location.origin + '/qso/' + idqso}
      //               beforeOnClick={() => {
      //                 if (!__DEV__)
      //                   window.gtag('event', 'qsoShareTW_WEBPRD', {
      //                     event_category: 'QSO',
      //                     event_label: 'shareTW'
      //                   });
      //               }}>
      //               <TwitterIcon size={40} round={true} />
      //             </TwitterShareButton>
      //           </View>
      //           <View className="socialMobile">
      //             <a
      //               href={
      //                 'whatsapp://send?text=' +
      //                 encodeURIComponent(
      //                   title + ' ' + window.location.origin + '/qso/' + idqso
      //                 )
      //               }
      //               onClick={() => {
      //                 if (!__DEV__)
      //                   window.gtag('event', 'qsoShareWAPP_WEBPRD', {
      //                     event_category: 'QSO',
      //                     event_label: 'shareWAPP'
      //                   });
      //               }}
      //               data-action="share/whatsapp/share">
      //               {' '}
      //               <WhatsappIcon size={40} round={true} />
      //             </a>
      //             <FacebookShareButton
      //               quote={title}
      //               url={window.location.origin + '/qso/' + idqso}
      //               beforeOnClick={() => {
      //                 if (!__DEV__)
      //                   window.gtag('event', 'qsoShareFB_WEBPRD', {
      //                     event_category: 'QSO',
      //                     event_label: 'shareFB'
      //                   });
      //               }}>
      //               <FacebookIcon size={40} round={true} />
      //             </FacebookShareButton>
      //             <a
      //               href={
      //                 'https://twitter.com/intent/tweet?url=' +
      //                 encodeURIComponent(
      //                   window.location.origin + '/qso/' + idqso
      //                 ) +
      //                 '&text=' +
      //                 encodeURIComponent(title)
      //               }
      //               onClick={() => {
      //                 if (!__DEV__)
      //                   window.gtag('event', 'qsoShareTW_WEBPRD', {
      //                     event_category: 'QSO',
      //                     event_label: 'shareTW'
      //                   });
      //               }}>
      //               <TwitterIcon size={40} round={true} />
      //             </a>
      //           </View>
      //         </Dropdown.Item>
      //       </Dropdown.Menu>
      //     </Dropdown>
      //     <Text style={{ fontSize: '1rem' }}>{I18n.t('qso.share')}</Text>
      //   </View>
      // </Button>
      <Button
        type="clear"
        icon={<Icon name="share-alt" type="font-awesome" />}
        onPress={() => this.share()}
      />
    );
  }
}

export default QSOShareButtons;
