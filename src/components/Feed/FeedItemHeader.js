import React, { Fragment } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import FeedOptionsMenu from './FeedOptionsMenu';
// import './style.js';
import TextToFollow from './TextToFollow';

class FeedItemHeader extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }
  state = { openMenu: false };
  openMenu() {
    this.menu.open();
  }

  onRef = (r) => {
    this.menu = r;
  };
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
                this.props.navigation.push('QRAProfile', {
                  qra: this.props.qso.qra,
                  screen: 'PROFILE'
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
                this.props.navigation.push('QRAProfile', {
                  qra: this.props.qso.qra,
                  screen: 'PROFILE'
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
                  <Text>{this.props.qso.rst}</Text>
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
        {this.props.feedType !== 'REPOST' && (
          <View style={styles.menu}>
            <FeedOptionsMenu
              qso_owner={this.props.qso.qra}
              idqsos={this.props.idqsos}
              guid={this.props.qso.GUID_QR}
              qso={this.props.qso}
              optionsCaller="FeedItem"
              // QslCard={
              //   this.props.currentQRA === this.props.qso.qra ||
              //   this.props.qso.qras.some((o) => o.qra === this.props.currentQRA)
              // }
            />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  menu: { padding: 7 },
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
  },

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
    fontSize: 18
  }
});

const selectorFeedType = (state, ownProps) => {
  let qso = null;
  if (ownProps.feedType === 'MAIN' && !ownProps.original)
    qso = state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'MAIN' && ownProps.original)
    qso = state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos)
      .original[0];
  else if (ownProps.feedType === 'PROFILE')
    qso = state.sqso.feed.qra.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'FIELDDAYS')
    qso = state.sqso.feed.fieldDays.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'DETAIL' && !ownProps.original)
    qso = state.sqso.feed.qso;
  else if (ownProps.feedType === 'DETAIL' && ownProps.original)
    qso = state.sqso.feed.qso.original[0];
  return qso;
};
const mapStateToProps = (state, ownProps) => ({
  token: state.sqso.jwtToken,
  qso: selectorFeedType(state, ownProps)
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(FeedItemHeader)
);
// export default withNavigation(
//   connect(mapStateToProps, mapDispatchToProps, null, {
//     pure: false
//   })(FeedItemHeader)
// );
