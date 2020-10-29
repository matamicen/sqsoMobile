import React, { Fragment } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
// import './style.js';
import TextToFollow from './TextToFollow';
class FeedItemHeader extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let text;
    let shareText;

    switch (this.props.qso.type) {
      case 'QSO':
        text = I18n.t('qso.workedAQSO');
        shareText = I18n.t('qso.checkOutQSO');
        break;
      case 'LISTEN':
        text = I18n.t('qso.listenedQSO');
        shareText = I18n.t('qso.checkOutQSO');
        break;
      case 'SHARE':
        text = I18n.t('qso.repostedQSO');
        shareText = I18n.t('qso.checkOutPost');
        break;
      case 'POST':
        text = I18n.t('qso.createdPost');
        // shareText = t('qso.checkOutPost');
        break;
      case 'QAP':
        text = I18n.t('qso.createdQAP');
        // shareText = t('qso.checkOutQAP');
        break;
      case 'FLDDAY':
        text = I18n.t('qso.createdFLDDAY');
        // shareText = t('qso.checkOutFLDDAY');
        break;
      default:
    }
    var date = new Date(this.props.qso.datetime);

    return (
      <View style={styles.header}>
        <View style={styles.avatar}>
          <View>
            <TouchableOpacity
              // style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('QRAProfile', {
                  qra: this.props.qso.qra
                })
              }>
              <Avatar
                size="medium"
                rounded
                source={
                  this.props.qso.avatarpic
                    ? {
                        uri: this.props.qso.avatarpic
                      }
                    : require('../../images/emptyprofile.png')
                }
              />
            </TouchableOpacity>
          </View>
          <View style={styles.follow}>
            <TextToFollow qra={this.props.qso.qra} />
          </View>
        </View>
        <View style={styles.action}>
          <View style={styles.actionHeader}>
            <TouchableOpacity
              // style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('QRAProfile', {
                  qra: this.props.qso.qra
                })
              }>
              <Text style={styles.actionHeaderText}>{this.props.qso.qra}</Text>
            </TouchableOpacity>
            <Text style={styles.actionHeaderText}>{text}</Text>
          </View>
          <View style={styles.actionDetail}>
            <Text style={styles.actionDetailText}>
              {this.props.qso.mode && (
                <Fragment>
                  <Text style={styles.bold}>{I18n.t('qso.mode')}:</Text>
                  <Text>{this.props.qso.mode}</Text>
                </Fragment>
              )}
              {this.props.qso.band && (
                <Fragment>
                  <Text style={styles.bold}>{I18n.t('qso.band')}:</Text>
                  <Text>{this.props.qso.band}</Text>
                </Fragment>
              )}
              {this.props.qso.db && (
                <Fragment>
                  <Text style={styles.bold}>dB:</Text>
                  <Text>{this.props.qso.db}</Text>
                </Fragment>
              )}
              {this.props.qso.rst && (
                <Fragment>
                  <Text style={styles.bold}>RST:</Text>
                  <Text>{this.props.qso.db}</Text>
                </Fragment>
              )}
              <Text style={styles.bold}>{I18n.t('qso.date')}:</Text>
              <Text>
                {date.toLocaleDateString(I18n.locale.substring(0, 2), {
                  month: 'short'
                })}
              </Text>

              <Text style={styles.bold}> UTC:</Text>
              <Text>
                {date.getUTCHours() +
                  ':' +
                  (date.getMinutes() < 10 ? '0' : '') +
                  date.getMinutes()}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bold: { fontWeight: 'bold' },
  actionHeaderText: {
    fontSize: 20
  },
  actionDetailText: {},
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
    // flexGrow: 1
    // marginTop: Constants.statusBarHeight
  },
  avatar: {
    flex: 1,
    flexDirection: 'column',
    flexBasis: 60,
    flexGrow: 0,
    flexShrink: 0
    // marginTop: Constants.statusBarHeight
  },
  follow: {
    flex: 1,
    flexDirection: 'column'
  },
  action: {
    flex: 1,
    flexDirection: 'column',
    // flexBasis: 60,
    flexGrow: 1,
    flexShrink: 0
  },
  actionHeader: {
    flex: 1,
    // width: 100,
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0
    // marginTop: Constants.statusBarHeight
  },
  actionDetail: {
    flex: 1,
    // width: 100,
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0
    // marginTop: Constants.statusBarHeight
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20
  },
  title: {
    fontSize: 32
  }
});

const mapStateToProps = (state, ownProps) => ({
  token: state.sqso.jwtToken,
  qso: state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos)
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps, null, {
    pure: false
  })(FeedItemHeader)
);
