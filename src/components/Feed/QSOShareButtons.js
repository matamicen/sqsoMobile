import React from 'react';
import { Button, Icon } from 'react-native-elements';
import Share from 'react-native-share';
import global_config from '../../global_config.json';
import I18n from '../../utils/i18n';
import analytics from '@react-native-firebase/analytics';
class QSOShareButtons extends React.PureComponent {
  share = () => {
    // const url = 'https://www.superqso.com/qso/e2166569-599b-11ea-9581-0a96c372e817';
    // const url = 'http://superqso-dev.us-east-1.elasticbeanstalk.com/qso/'+this.props.sharerluid;
    const url = global_config.urlWeb + '/qso/' + this.props.idqso;
    const title = this.props.title;
    const message = I18n.t('ShareMessage');
    const options = {
      title,
      subject: title,
      message: `${title} ${url}`
    };

    Share.open(options);
    if (!__DEV__) analytics().logEvent('qsoShare_APPPRD');
  };
  render() {
    return (
      <Button
        type="clear"
        icon={<Icon name="share-alt" type="font-awesome" />}
        onPress={() => this.share()}
      />
    );
  }
}

export default QSOShareButtons;
