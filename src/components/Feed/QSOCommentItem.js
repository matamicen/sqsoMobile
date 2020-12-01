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
// import FeedOptionsMenu from './FeedOptionsMenu';

var ConvertToComp = (response) => {
  return response;
};
class QSOCommentItem extends React.PureComponent {
  constructor() {
    super();
    this.followed = null;
    this.state = {
      comment: null,
      followed: null
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
  componentDidUpdate = () => {
    // this.props.recalculateRowHeight();
  };
  render() {
    let withTags;
    const regex = /<(MENTION)>.*<\/\1>/;

    let message = this.props.comment.comment;

    do {
      withTags = regex.exec(message);
      if (withTags) {
        let qra;
        const regex2 = />@([a-zA-Z0-9]+)/;

        let message2 = withTags[0];
        qra = regex2.exec(message2);

        var oldWord = withTags[0];

        message = message.replace(
          new RegExp(oldWord, 'g'),
          '<TouchableOpacity ' +
            'onPress={() => ' +
            // eslint-disable-next-line quotes
            "this.props.navigation.navigate('QRAProfile', { " +
            'qra: ' +
            qra[1] +
            '}) ' +
            // eslint-disable-next-line quotes
            '}> <Text style={{ fontSize: 10 }}> ' +
            '@' +
            qra[1] +
            '</Text>  </TouchableOpacity>'
        );
      }
    } while (withTags);

    var date = new Date(this.props.comment.datetime);
    var timestamp = '';
    if (
      this.followed !== true &&
      this.followed !== false &&
      this.state.followed === this.followed
    ) {
      this.followed = this.props.following.some(
        (o) => o.idqra_followed === this.props.comment.idqra
      );
    }
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
              onPress={() =>
                this.props.navigation.navigate('QRAProfile', {
                  qra: this.props.comment.qra
                })
              }>
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
                onPress={() =>
                  this.props.navigation.navigate('QRAProfile', {
                    qra: this.props.comment.qra
                  })
                }>
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
          <View style={styles.follow}>
            {!this.followed &&
              this.props.comment.qra !== this.props.currentQRA && (
                <Button
                  containerStyle={{ padding: 0, margin: 0 }}
                  onPress={() => this.handleButtonClick(this.props.comment.qra)}
                  title={
                    this.props.followers.some(
                      (o) => o.qra === this.props.comment.qra
                    )
                      ? I18n.t('qra.followToo')
                      : I18n.t('qra.follow')
                  }
                />
              )}

            {/* <FeedOptionsMenu
              comment_owner={this.props.comment.qra}
              idqso={this.props.comment.idqso}
              idcomment={this.props.comment.idqsos_comments}
              optionsCaller="FeedComment"
            /> */}
          </View>
        </View>
        <View style={styles.message}>
          <Text style={{ fontSize: 15 }}>
            {/* <ConvertToComp response={message} /> */}
            {message}
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
    fontSize: 12
  },
  headerDetailText: { fontSize: 10 },
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
    flex: 1
    // flexDirection: 'column'
  },
  action: {
    flex: 1,
    flexDirection: 'column'
    // flexBasis: 60,
    // flexGrow: 1,
    // flexShrink: 0
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
  message: {
    flex: 1,
    width: '100%'
  }
});
const selectorFeedType = (state, ownProps) => {
  if (ownProps.feedType === 'MAIN')
    return state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'PROFILE')
    return state.sqso.feed.qra.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'FIELDDAYS')
    return state.sqso.feed.fieldDays.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'DETAIL') return state.sqso.feed.qso;
};
const mapStateToProps = (state, ownProps) => ({
  token: state.sqso.jwtToken,
  currentQRA: state.sqso.qra,

  qso: selectorFeedType(state, ownProps),
  followers: state.sqso.currentQso.followers,
  following: state.sqso.currentQso.followings
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(QSOCommentItem)
);
