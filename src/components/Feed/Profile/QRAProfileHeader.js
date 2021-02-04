import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import I18n from '../../../utils/i18n';
import { MY_COUNTRIES_DATA } from './countries.js';
import analytics from '@react-native-firebase/analytics';
class QRAProfileHeader extends React.PureComponent {
  state = { showModal: false };
  close = () => this.setState({ showModal: false });
  open = () => {
    if (this.props.qraInfo && this.props.qraInfo.profilepic) {
      if (!__DEV__) analytics().logEvent('profilepicOpenModal_APPPRD');

      this.setState({ showModal: true });
    }
  };
  country2emoji(country_code) {
    var OFFSET = 127397;
    var cc = country_code.toUpperCase();
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      } else {
        return Array.from(arr);
      }
    }
    return /^[A-Z]{2}$/.test(cc)
      ? String.fromCodePoint.apply(
          String,
          _toConsumableArray(
            [].concat(_toConsumableArray(cc)).map(function (c) {
              return c.charCodeAt() + OFFSET;
            })
          )
        )
      : null;
  }
  render() {
    let buttonText;

    if (this.props.followed) {
      buttonText = I18n.t('qra.unfollow');
    } else {
      buttonText = this.props.followers.some(
        (o) => o.qra === this.props.qraInfo.qra
      )
        ? I18n.t('qra.followToo')
        : I18n.t('qra.follow');
    }

    var result = this.props.qraInfo
      ? MY_COUNTRIES_DATA.filter((obj) => {
          return obj.key === this.props.qraInfo.country;
        })
      : null;

    return (
      <View style={styles.header}>
        <View style={styles.container}>
          <View style={styles.avatar}>
            <TouchableOpacity
              // style={styles.button}
              onPress={() => this.open()}>
              <Avatar
                size="large"
                rounded
                source={
                  this.props.qraInfo.profilepic
                    ? {
                        uri: this.props.qraInfo.profilepic
                      }
                    : require('../../../images/emptyprofile.png')
                }
              />
            </TouchableOpacity>
          </View>
          <View style={styles.detail}>
            <View style={styles.qra}>
              <Text style={styles.qraText}>
                <Text>{this.props.qraInfo.qra}</Text>
                <Text style={styles.flagText}>
                  {this.props.qraInfo.country !== '' &&
                    this.props.qraInfo.country !== null && (
                      <Text>
                        {this.country2emoji(this.props.qraInfo.country)}
                      </Text>
                    )}
                  <Text>{result.length > 0 ? result[0].text : null}</Text>
                </Text>
              </Text>
            </View>

            <View style={styles.name}>
              <Text style={styles.nameText}>
                {this.props.qraInfo.firstname &&
                  this.props.qraInfo.firstname + ' '}
                {this.props.qraInfo.lastname && this.props.qraInfo.lastname}
              </Text>
            </View>

            <View style={styles.kpi}>
              {this.props.qraInfo.views_counter !== null && (
                <View>
                  <Text>
                    {I18n.t('qra.views')}: {this.props.qraInfo.views_counter}
                  </Text>
                </View>
              )}
              {this.props.qraInfo.qsos_counter !== null && (
                <View>
                  <Text>
                    {I18n.t('qra.qsos')}: {this.props.qraInfo.qsos_counter}
                  </Text>
                </View>
              )}
              {this.props.qraInfo.followers_counter !== null && (
                <View>
                  <Text>
                    <Text>
                      {I18n.t('qra.followers')}:
                      {this.props.qraInfo.followers_counter}
                    </Text>
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {this.props.qraInfo.qra !== this.props.currentQRA && (
          <View style={styles.follow}>
            <Button
              containerStyle={{ padding: 0, margin: 0 }}
              // size="small"
              // positive={!props.following.some(o => o.qra === this.props.qraInfo.qra)}
              // // positive={!this.props.followed}
              fluid
              onPress={() => this.props.onPress()}
              title={buttonText}
            />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  avatar: { flex: 1, flexBasis: 80, flexGrow: 0, flexShrink: 0 },
  name: {
    // flex: 1
    height: 27
  },
  qra: {
    // flex: 1
    height: 30
  },
  qraText: {
    fontSize: 25
  },
  nameText: {
    fontSize: 18
  },
  flagText: {
    fontSize: 15
  },
  detail: {
    flex: 1,
    flexDirection: 'column'
  },
  follow: {
    // flex: 1,
    // alignSelf: 'flex-start',
    // justifyContent: 'flex-start',
    marginTop: 80,
    width: '100%',
    height: 100
  },
  kpi: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 12,
    fontSize: 15,
    marginRight: 5
  },
  container: {
    flex: 1,
    flexDirection: 'row'

    // justifyContent: 'center'
    // alignItems: 'center'
    // flexGrow: 1
    // marginTop: Constants.statusBarHeight
  },

  header: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
});
export default QRAProfileHeader;
