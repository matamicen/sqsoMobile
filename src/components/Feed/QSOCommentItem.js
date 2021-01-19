//import i18n from 'i18next';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import FeedOptionsMenu from './FeedOptionsMenu';

class Comment extends React.PureComponent {
  render() {
    let element = [];

    let message = this.props.comment;
    // let message = 'Hola <MENTION>@MM</MENTION>info@mm.com';
    // console.log(message);
    let commentSplit = message.split(/<MENTION>([^<.*>;]*)<\/MENTION>/gim);
    // console.log(commentSplit);
    element = commentSplit.map((word, i) => {
      if (word[0] === '@' && word.match(/@([a-zA-Z0-9]+)/)) {
        return React.createElement(
          TouchableOpacity,
          {
            key: i,
            onPress: () => {
              this.props.closeModal();
              this.props.actions.clearQRA();
              this.props.actions.doFetchQRA(word.substring(1));
              this.props.navigation.navigate('QRAProfile', {
                screen: 'PROFILE',
                qra: word.substring(1)
              });
            }
          },
          [React.createElement(Text, { key: i }, [word])]
        );
      } else {
        return React.createElement(Text, { key: i }, [word]);
      }
    });

    return element;
  }
}
class QSOCommentItem extends React.PureComponent {
  constructor() {
    super();
    this.followed = null;
    this.state = {
      comment: null,
      followed: null,
      followings: []
    };
  }
  handleButtonClick(idqra) {
    if (!this.followed) {
      // if (!__DEV__)
      //   window.gtag('event', 'qraFollowComment_WEBPRD', {
      //     event_category: 'User',
      //     event_label: 'follow'
      //   });
      this.props.actions.doFollowQRA(this.props.token, idqra);
      this.followed = true;
      this.setState({ followed: this.followed });
    } else {
      this.props.actions.doUnfollowQRA(this.props.token, idqra);
      this.followed = false;
      this.setState({ followed: this.followed });
    }
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.followings !== this.state.followings)
      this.setState({ followings: this.props.following });
    // this.props.recalculateRowHeight();
  };
  render() {
    var date = new Date(this.props.comment.datetime);
    var timestamp = '';
    // if (
    //   this.followed !== true &&
    //   this.followed !== false &&
    //   this.state.followed === this.followed
    // ) {
    this.followed = this.props.followings.some(
      (o) => o.idqra_followed === this.props.comment.idqra
    );
    // }
    if (this.props.comment.datetime) {
      timestamp =
        date.toLocaleDateString(I18n.locale, { month: 'short' }) +
        I18n.t('global.at') +
        date.getUTCHours() +
        ':' +
        (date.getMinutes() < 10 ? '0' : '') +
        date.getMinutes();
    }

    return (
      <View style={styles.container}>
        <View style={styles.commentHeader}>
          <View style={styles.avatar}>
            <TouchableOpacity
              onPress={() => {
                this.props.actions.clearQRA();
                this.props.actions.doFetchQRA(this.props.comment.qra);
                this.props.closeModal();
                this.props.navigation.navigate('QRAProfile', {
                  qra: this.props.comment.qra,
                  screen: 'PROFILE'
                });
              }}>
              <Avatar
                size="medium"
                rounded
                source={
                  this.props.comment.avatarpic
                    ? {
                        uri: this.props.comment.avatarpic
                      }
                    : require('../../images/emptyprofile.png')
                }
              />
            </TouchableOpacity>
            {/* <TextToFollow qra={this.props.comment.qra} /> */}
          </View>
          <View style={styles.action}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  this.props.closeModal();
                  this.props.actions.clearQRA();
                  this.props.actions.doFetchQRA(
                    this.props.comment.qra,
                    this.props.token
                  );
                  this.props.navigation.navigate('QRAProfile', {
                    qra: this.props.comment.qra,
                    screen: 'PROFILE'
                  });
                }}>
                <Text style={styles.headerText}>
                  <Text> {this.props.comment.qra.toUpperCase()} </Text>
                  <Text>{this.props.comment.firstname}</Text>
                  <Text> {this.props.comment.lastname} </Text>
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.headerDetail}>
              <Text style={styles.headerDetailText}>{timestamp}</Text>
            </View>
          </View>

          {!this.followed && this.props.comment.qra !== this.props.currentQRA && (
            <View style={styles.follow}>
              <Button
                raised
                buttonStyle={{ width: 80 }}
                containerStyle={{ width: 80 }}
                onPress={() => this.handleButtonClick(this.props.comment.qra)}
                title={
                  this.props.followers.some(
                    (o) => o.qra === this.props.comment.qra
                  )
                    ? I18n.t('qra.followToo')
                    : I18n.t('qra.follow')
                }
              />
            </View>
          )}

          <View style={styles.menu}>
            <FeedOptionsMenu
              comment={this.props.comment}
              comment_owner={this.props.comment.qra}
              idqsos={this.props.idqsos}
              idqso_shared={this.props.qso.idqso_shared}
              idcomment={this.props.comment.idqsos_comments}
              optionsCaller="FeedComment"
              message={this.props.comment.comment}
            />
          </View>
        </View>
        <View style={styles.message}>
          <Text style={{ fontSize: 18 }}>
            {/* <ConvertToComp response={message} /> */}
            <Comment
              comment={this.props.comment.comment}
              navigation={this.props.navigation}
              closeModal={() => {
                this.props.closeModal();
              }}
            />
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  bold: { fontWeight: 'bold' },
  headerText: {
    fontSize: 14
  },
  headerDetailText: { fontSize: 12 },
  headerDetail: {},
  commentHeader: {
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
    width: 80,
    flexGrow: 0,
    flexBasis: 80
    // flexDirection: 'column'
  },
  action: {
    flex: 1,
    flexDirection: 'column',

    flexGrow: 1
    // flexShrink: 0
  },
  actionHeader: {
    flex: 1,
    width: 130,
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
  message: {
    flex: 1,
    width: '100%'
  }
});
const selectorFeedType = (state, ownProps) => {
  let qso;
  if (ownProps.feedType === 'MAIN')
    qso = state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'PROFILE')
    qso = state.sqso.feed.qra.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'FIELDDAYS')
    qso = state.sqso.feed.fieldDays.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'DETAIL') qso = state.sqso.feed.qso;

  return qso;
};
const mapStateToProps = (state, ownProps) => ({
  token: state.sqso.jwtToken,
  currentQRA: state.sqso.qra,

  qso: selectorFeedType(state, ownProps),
  followers: state.sqso.currentQso.followers,
  followings: state.sqso.currentQso.followings
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(QSOCommentItem)
);
