import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';

class QSOLikeTextModalItem extends React.PureComponent {
  constructor() {
    super();
    this.followed = null;
    this.state = { followed: null };
  }
  componentDidMount() {
    // if (!__DEV__)
    //   window.gtag('event', 'qsoLikeModalOpen_WEBPRD', {
    //     event_category: 'qso',
    //     event_label: 'qsoLikeModalOpen'
    //   });
    // this.setState({ likes: this.props.qso ? this.props.qso.likes : [] });
  }
  // static getDerivedStateFromProps(props, prevState) {
  //   if (props.qso.likes && props.qso.likes.length !== prevState.likes.length)
  //     return { likes: props.qso.likes };
  //   return null;
  // }
  handleButtonClick(idqra) {
    if (!this.props.token) return null;

    if (!this.followed) {
      // if (!__DEV__)
      //   window.gtag('event', 'qraFollowLike_WEBPRD', {
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
  render() {
    const { l } = this.props;

    if (
      this.followed !== true &&
      this.followed !== false &&
      this.state.followed === this.followed
    ) {
      this.followed = this.props.followings.some(
        (o) => o.idqra_followed === l.idqra
      );
    }

    return (
      <View key={l.qra} style={styles.itemView}>
        <View style={styles.avatarView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('QRAProfile', {
                qra: l.qra,
                screen: 'PROFILE'
              });
              this.props.closeModal();
            }}>
            <Avatar
              size="small"
              rounded
              source={
                l.avatarpic
                  ? {
                      uri: l.avatarpic
                    }
                  : require('../../images/emptyprofile.png')
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.name}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('QRAProfile', {
                qra: l.qra,
                screen: 'PROFILE'
              });
              this.props.closeModal();
            }}>
            <Text style={{ fontSize: 15 }}>{l.qra}</Text>

            <Text style={{ fontSize: 10 }}>
              {l.firstname + ' ' + l.lastname}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.follow}>
          {!this.followed && l.qra !== this.props.currentQRA && (
            <Button
              containerStyle={{ padding: 0, margin: 0 }}
              raised
              onPress={() => this.handleButtonClick(l.qra)}
              title={
                this.props.followers.some((o) => o.qra === l.qra)
                  ? I18n.t('qra.followToo')
                  : I18n.t('qra.follow')
              }
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemView: {
    flex: 1,
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start'
    // alignSelf: 'flex-start'
    // height: 10
  },
  name: {
    // flex: 1,
    // flexDirection: 'row',
    alignSelf: 'flex-start',
    flexGrow: 1
  },
  follow: {
    // flex: 1
    // flexDirection: 'row'
    alignSelf: 'flex-end'
  },
  avatarView: {
    // flex: 1
    // flexDirection: 'row',
    // alignItems: 'flex-start',
    // alignSelf: 'flex-start'
  }
});
const mapStateToProps = (state) => ({
  currentQRA: state.sqso.qra,

  followers: state.sqso.currentQso.followers,
  followings: state.sqso.currentQso.followings,

  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(QSOLikeTextModalItem)
);
