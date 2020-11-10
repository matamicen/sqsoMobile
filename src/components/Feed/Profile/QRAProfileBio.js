import crashlytics from '@react-native-firebase/crashlytics';
import { Storage } from 'aws-amplify';
import React, { Fragment } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import I18n from '../../../utils/i18n';
class QRAProfileBio extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      openPornConfirm: false
    };
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
        {this.props.currentQRA === this.props.qraInfo.qra && (
          <View>
            <Button
              fluid
              onPress={() =>
                this.props.navigation.navigate('QRAProfileBioEdit')
              }
              title={I18n.t('qra.editBio')}
            />
          </View>
        )}
        <ScrollView style={{ flex: 1, margin: 2 }}>
          <HTMLView
            value={this.props.qraInfo.bio}
            // stylesheet={styles}
          />
        </ScrollView>

        {/* </Segment> */}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({});
const mapStateToProps = (state, ownProps) => ({
  //state: state,
  currentQRA: state.sqso.qra,
  qso: state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos),
  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(QRAProfileBio);
// export default connect(mapStateToProps, mapDispatchToProps, null, {
//   pure: false
// })(QRAProfileBio);
