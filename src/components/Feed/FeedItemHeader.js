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
import moment from 'moment';
const country2emoji = (country_code) => {
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
};
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
        text = I18n.t('qso.workedAQSO', {
          // QRA: this.props.qso.qra
        });
        shareText = I18n.t('qso.checkOutQSO');
        break;
      case 'LISTEN':
        text = I18n.t('qso.listenedQSO', {
          // QRA: this.props.qso.qra
        });
        shareText = I18n.t('qso.checkOutQSO');
        break;
      case 'SHARE':
        switch (this.props.qso.original[0].type) {
          case 'QSO':
            text = I18n.t('qso.repostedQSO', {
              // QRA: this.props.qso.qra
            });
            shareText = I18n.t('qso.checkOutQSO');
            break;
          case 'LISTEN':
            text = I18n.t('qso.repostedLISTEN', {
              // QRA: this.props.qso.qra
            });
            shareText = I18n.t('qso.checkOutQSO');
            break;
          case 'SHARE':
            text = I18n.t('qso.repostedQSO', {
              // QRA: this.props.qso.qra
            });
            shareText = I18n.t('qso.checkOutPost', {
              // QRA: this.props.qso.qra
            });
            break;
          case 'POST':
            text = I18n.t('qso.repostedPOST', {
              // QRA: this.props.qso.qra
            });
            shareText = I18n.t('qso.checkOutPost', {
              // QRA: this.props.qso.qra
            });
            break;
          case 'QAP':
            text = I18n.t('qso.repostedQAP', {
              // QRA: this.props.qso.qra
            });
            // shareText = t('qso.checkOutQAP');
            break;
          case 'FLDDAY':
            text = I18n.t('qso.repostedFLDDAY', {
              // QRA: this.props.qso.qra
            });
            // shareText = t('qso.checkOutFLDDAY');
            break;
          default:
        }

        shareText = I18n.t('qso.checkOutPost');
        break;
      case 'POST':
        text = I18n.t('qso.createdPost', {
          // QRA: this.props.qso.qra
        });
        shareText = I18n.t('qso.checkOutPost');
        break;
      case 'QAP':
        text = I18n.t('qso.createdQAP', {
          // QRA: this.props.qso.qra
        });
        // shareText = t('qso.checkOutQAP');
        break;
      case 'FLDDAY':
        text = I18n.t('qso.createdFLDDAY', {
          // QRA: this.props.qso.qra
        });
        // shareText = t('qso.checkOutFLDDAY');
        break;
      default:
    }
    var date = new Date(
      this.props.qso.realDateTime
        ? this.props.qso.realDateTime
        : this.props.qso.datetime
    );
    var startDate = new Date(this.props.qso.activityBegin);
    var endDate = new Date(this.props.qso.activityEnd);
    return (
      <View style={styles.header}>
        <View style={styles.avatar}>
          <View>
            <TouchableOpacity
              // style={styles.button}
              onPress={() => {
                this.props.actions.clearQRA();
                this.props.actions.doFetchQRA(this.props.qso.qra);
                this.props.navigation.push('QRAProfile', {
                  qra: this.props.qso.qra,
                  screen: 'PROFILE'
                });
              }}>
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
              onPress={() => {
                this.props.actions.clearQRA();
                this.props.actions.doFetchQRA(this.props.qso.qra);
                this.props.navigation.push('QRAProfile', {
                  qra: this.props.qso.qra,
                  screen: 'PROFILE'
                });
              }}>
              <Text style={styles.actionHeaderText}>
                {this.props.qso.qra}
                <Text style={{ fontSize: 13 }}>
                  {this.props.qso.country !== '' &&
                    this.props.qso.country !== null && (
                      <Text>{country2emoji(this.props.qso.country)}</Text>
                    )}
                </Text>
                {text}
              </Text>
            </TouchableOpacity>
            {/* <Text style={styles.actionHeaderText}>{text}</Text> */}
          </View>
          <View style={styles.actionDetail}>
            {/* Header for others than FLDDAY */}
            {this.props.qso.type !== 'FLDDAY' && (
              <Text style={styles.actionDetailText}>
                {this.props.qso.mode && (
                  <Fragment>
                    <Text style={styles.bold}>{I18n.t('qso.mode')}:</Text>
                    <Text>{this.props.qso.mode} </Text>
                  </Fragment>
                )}
                {this.props.qso.band && (
                  <Fragment>
                    <Text style={styles.bold}>{I18n.t('qso.band')}:</Text>
                    <Text>{this.props.qso.band} </Text>
                  </Fragment>
                )}
                {this.props.qso.db && (
                  <Fragment>
                    <Text style={styles.bold}>dB:</Text>
                    <Text>{this.props.qso.db} </Text>
                  </Fragment>
                )}
                {this.props.qso.type !== 'SHARE' && this.props.qso.rst && (
                  <Fragment>
                    <Text style={styles.bold}>RST:</Text>
                    <Text>{this.props.qso.rst} </Text>
                  </Fragment>
                )}
                <Text style={styles.bold}>{I18n.t('qso.date')}:</Text>
                <Text>
                  {' '}
                  {moment(new Date(date)).utc().format('lll')}
                  {' UTC'}
                </Text>
              </Text>
            )}
            {/* Header for fieldDay */}
            {this.props.qso.type === 'FLDDAY' && (
              <View style={{ textAlign: 'left', margin: 0, padding: 0 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  {moment(this.props.qso.activityBegin).isSameOrBefore(
                    Date.now()
                  ) &&
                    I18n.t('qso.startedAt', {
                      text: moment(this.props.qso.activityBegin).fromNow(true)
                    })}

                  {moment(this.props.qso.activityBegin).isAfter(Date.now()) &&
                    I18n.t('qso.willStart', {
                      text: moment(this.props.qso.activityBegin).toNow(true)
                    })}
                </Text>
                <Text style={{ textAlign: 'left', margin: 0, padding: 0 }}>
                  <Text style={styles.bold}>{I18n.t('qso.start')}:</Text>
                  <Text>
                    {' '}
                    {moment(new Date(startDate)).utc().format('lll')}
                    {' UTC'}
                  </Text>
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    margin: 0,
                    padding: 0
                  }}>
                  <Text style={styles.bold}> {I18n.t('qso.end')}:</Text>
                  <Text>
                    {' '}
                    {moment(new Date(endDate)).utc().format('lll')}
                    {' UTC'}
                  </Text>
                </Text>
              </View>
            )}
          </View>
        </View>
        {!this.props.original && (
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
    flexWrap: 'wrap',
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
  else if (ownProps.feedType === 'PROFILE' && !ownProps.original)
    qso = state.sqso.feed.qra.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'PROFILE' && ownProps.original)
    qso = state.sqso.feed.qra.qsos.find((q) => q.idqsos === ownProps.idqsos)
      .original[0];
  else if (ownProps.feedType === 'FIELDDAYS')
    qso = state.sqso.feed.fieldDays.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'DETAIL' && !ownProps.original)
    qso = state.sqso.feed.qso;
  else if (ownProps.feedType === 'DETAIL' && ownProps.original)
    qso = state.sqso.feed.qso.original[0];
  else if (ownProps.feedType === 'SEARCH' && !ownProps.original)
    qso = state.sqso.feed.searchedResults.find(
      (q) => q.idqsos === ownProps.idqsos
    );
  else if (ownProps.feedType === 'SEARCH' && ownProps.original)
    qso = state.sqso.feed.searchedResults.find(
      (q) => q.idqsos === ownProps.idqsos
    ).original[0];
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
