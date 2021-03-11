import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import { userNotValidated } from '../../helper';
import analytics from '@react-native-firebase/analytics';
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
class QSOLikeTextModalItem extends React.PureComponent {
  constructor() {
    super();
    this.followed = null;
    this.state = { followed: null };
  }
  componentDidMount() {
    // if (!__DEV__)
    //   window.gtag('event', 'qsoLikeModalOpen_APPPRD', {
    //     event_category: 'qso',
    //     event_label: 'qsoLikeModalOpen'
    //   });
    // this.setState({ likes: this.props.qso ? this.props.qso.likes : [] });
    if (!__DEV__) analytics().logEvent('qsoLikeModalOpen_APPPRD');
  }
  // static getDerivedStateFromProps(props, prevState) {
  //   if (props.qso.likes && props.qso.likes.length !== prevState.likes.length)
  //     return { likes: props.qso.likes };
  //   return null;
  // }
  handleButtonClick(idqra) {
    if (!this.props.token) return null;
    if (this.props.userinfo.pendingVerification) userNotValidated();
    else {
      if (!this.followed) {
        // if (!__DEV__)
        //   window.gtag('event', 'qraFollowLike_APPPRD', {
        //     event_category: 'User',
        //     event_label: 'follow'
        //   });
        if (!__DEV__) analytics().logEvent('qraFollowLike_APPPRD');
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
              this.props.actions.clearQRA();
              this.props.actions.doFetchQRA(l.qra);
              this.props.navigation.navigate('QRAProfile', {
                qra: l.qra,
                screen: 'PROFILE'
              });
              this.props.closeModal();
            }}>
            <Avatar
              size="medium"
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
              this.props.actions.clearQRA();
              this.props.actions.doFetchQRA(l.qra);
              this.props.navigation.navigate('QRAProfile', {
                qra: l.qra,
                screen: 'PROFILE'
              });
              this.props.closeModal();
            }}>
            <Text numberOfLines={1} style={{ fontSize: 16 }}>
              <Text style={{ fontSize: 17 }}>{l.qra}</Text>
              <Text style={{ fontSize: 13 }}>
                {l.country !== '' && l.country !== null && (
                  <Text>{country2emoji(l.country)}</Text>
                )}
              </Text>
            </Text>

            <Text numberOfLines={1} style={{ fontSize: 15 }}>
              {l.firstname + ' ' + l.lastname}
            </Text>
          </TouchableOpacity>
        </View>

        {!this.followed && l.qra !== this.props.currentQRA && (
          <View style={styles.follow}>
            <Button
              buttonStyle={{ width: 80 }}
              containerStyle={{ width: 80 }}
              raised
              onPress={() => this.handleButtonClick(l.qra)}
              title={
                this.props.followers.some((o) => o.qra === l.qra)
                  ? I18n.t('qra.followToo')
                  : I18n.t('qra.follow')
              }
            />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemView: {
    flex: 1,
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2,
    paddingHorizontal: 0
    // alignSelf: 'flex-start'
    // height: 10
  },
  name: {
    // flex: 1,
    // flexDirection: 'row',
    marginTop: 5,
    marginLeft: 8,
    // alignSelf: 'flex-start',
    flexGrow: 1,
    flexShrink: 1
  },
  follow: {
    // flex: 1,
    flexGrow: 0,
    flexBasis: 80,
    flexShrink: 0
    // flexDirection: 'row'
  },
  avatarView: {
    // flex: 1,
    flexGrow: 0,
    flexBasis: 45,
    flexShrink: 0
    // flexDirection: 'row',
    // alignItems: 'flex-start',
    // alignSelf: 'flex-start'
  }
});
const mapStateToProps = (state) => ({
  currentQRA: state.sqso.qra,
  userinfo: state.sqso.userInfo,
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
