//import i18n from 'i18next';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
// import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Comment from 'semantic-ui-react/dist/commonjs/views/Comment';
import Item from 'semantic-ui-react/dist/commonjs/views/Item';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import FeedOptionsMenu from './FeedOptionsMenu';

var convertToComp = (response) => {
  return response;
};
class QSOCommentItem extends React.Component {
  constructor() {
    super();
    this.followed = null;
    this.state = {
      comment: null,
      followed: null
    };
  }
  handleButtonClick(idqra) {
    if (!this.props.userData.token) return null;
    if (this.props.userData.isAuthenticated) {
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
  }
  componentDidUpdate = () => {
    // this.props.recalculateRowHeight();
  };
  render() {
    const { t } = this.props;
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
            "}> <Text style={{ fontSize: '1.2' }}> " +
            '@' +
            qra[1] +
            '</Text>  </TouchableOpacity>'
        );
        console.log(message);
      }
    } while (withTags);
    console.log(message);
    var date = new Date(this.props.comment.datetime);
    var timestamp = '';
    if (
      this.props.isAuthenticated &&
      this.followed !== true &&
      this.followed !== false &&
      this.state.followed === this.followed
    ) {
      this.followed = this.props.userData.following.some(
        (o) => o.idqra_followed === this.props.comment.idqra
      );
    }
    if (this.props.comment.datetime) {
      timestamp =
        date.toLocaleDateString(I18n.locale, { month: 'short' }) +
        ' ' +
        date.getDate() +
        ', ' +
        date.getFullYear() +
        t('global.at') +
        date.getUTCHours() +
        ':' +
        (date.getMinutes() < 10 ? '0' : '') +
        date.getMinutes();
    }

    return (
      <Comment>
        <Comment.Content>
          <Item.Extra>
            <View
              style={{
                float: 'right'
              }}>
              {!this.followed &&
                this.props.comment.qra !== this.props.currentQRA && (
                  <Button
                    style={{
                      paddingLeft: '1em',
                      paddingRight: '1em'
                    }}
                    positive={!this.followed}
                    onClick={() =>
                      this.handleButtonClick(this.props.comment.qra)
                    }>
                    {this.props.followers.some(
                      (o) => o.qra === this.props.comment.qra
                    )
                      ? t('qra.followToo')
                      : t('qra.follow')}
                  </Button>
                )}

              <FeedOptionsMenu
                comment_owner={this.props.comment.qra}
                idqso={this.props.comment.idqso}
                idcomment={this.props.comment.idqsos_comments}
                optionsCaller="FeedComment"
              />
            </View>
          </Item.Extra>
          <Comment.Author>
            <View
              style={{
                display: 'flex',
                alignItems: 'center'
              }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('QRAProfile', {
                    qra: this.props.comment.qra
                  })
                }>
                <Avatar
                  size="small"
                  rounded
                  source={
                    this.props.comment.avatarpic
                      ? {
                          uri: this.props.comment.avatarpic
                        }
                      : require('../../images/emptyprofile.png')
                  }
                />{' '}
                <Text style={{ fontSize: '1.2rem' }}>
                  {this.props.comment.qra.toUpperCase()}{' '}
                  {this.props.comment.firstname} {this.props.comment.lastname}{' '}
                </Text>
              </TouchableOpacity>{' '}
              {/* <TextToFollow qra={this.props.comment.qra} /> */}
            </View>
          </Comment.Author>
          <Comment.Metadata>
            <Text
              style={{
                marginLeft: '1.5rem'
              }}>
              {timestamp}
            </Text>
          </Comment.Metadata>
          <Comment.Text>
            <Text style={{ fontSize: '1.1rem' }}>
              <View>
                <convertToComp response={message} />
              </View>
            </Text>
          </Comment.Text>
        </Comment.Content>
      </Comment>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.sqso.jwtToken,
  currentQRA: state.sqso.qra,
  userData: state.userData,
  followers: state.userData.followers,
  isAuthenticated: state.userData.isAuthenticated
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(QSOCommentItem);
