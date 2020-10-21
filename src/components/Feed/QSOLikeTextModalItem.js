import React from 'react';
//import { withTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';

class QSOLikeTextModalItem extends React.Component {
  constructor() {
    super();
    this.followed = null;
    this.state = { followed: null };
  }
  componentDidMount() {
    if (!__DEV__)
      window.gtag('event', 'qsoLikeModalOpen_WEBPRD', {
        event_category: 'qso',
        event_label: 'qsoLikeModalOpen'
      });
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
      if (!__DEV__)
        window.gtag('event', 'qraFollowLike_WEBPRD', {
          event_category: 'User',
          event_label: 'follow'
        });
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
      <View key={l.qra} style={{ display: 'flex', paddingBottom: 10 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingRigth: 5
          }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('QRAProfile', {
                qra: l.qra
              })
            }>
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
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingRigth: 5
          }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('QRAProfile', {
                qra: l.qra
              })
            }>
            <Text style={{ fontSize: 15 }}>{l.qra}</Text>

            <Text style={{ fontSize: 10 }}>
              {l.firstname + ' ' + l.lastname}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            padding: 0
          }}>
          {this.props.isAuthenticated &&
            !this.followed &&
            l.qra !== this.props.userData.currentQRA && (
              <Button
                style={{
                  paddingLeft: 1,
                  paddingRight: 1
                }}
                positive={!this.followed}
                onClick={() => this.handleButtonClick(l.qra)}>
                <Text>
                  {this.props.followers.some((o) => o.qra === l.qra)
                    ? I18n.t('qra.followToo')
                    : I18n.t('qra.follow')}
                </Text>
              </Button>
            )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  currentQRA: state.sqso.qra,

  followers: state.sqso.currentQso.followers,
  followings: state.sqso.currentQso.followings,

  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QSOLikeTextModalItem);
