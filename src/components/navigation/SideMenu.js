import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import I18n from '../../utils/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import analytics from '@react-native-firebase/analytics';
import Share from 'react-native-share';

class SideMenu extends Component {
  // navigateToScreen = (route) => () => {
  //   const navigateAction = NavigationActions.navigate({
  //     routeName: route
  //   });
  //   this.props.navigation.push(route);
  // };

  share = () => {
    // const url = 'https://www.superqso.com/qso/e2166569-599b-11ea-9581-0a96c372e817';
    // const url = 'http://superqso-dev.us-east-1.elasticbeanstalk.com/qso/'+this.props.sharerluid;
    const url = 'https://www.superqso.com';
      // global_config.dynamic_link +
      // 'QSO=' +
      // this.props.idqso +
      // global_config.dynamic_apn +
      // global_config.dynamic_ibi +
      // global_config.dynamic_afl +
      // '/qso/' +
      // this.props.idqso +
      // global_config.dynamic_isi +
      // global_config.dynamic_ifl +
      // '/qso/' +
      // this.props.idqso +
      // global_config.dynamic_ofl +
      // '/qso/' +
      // this.props.idqso;
    // const title = this.props.currentQRA + ' invites you to SuperQSO, "The Facebook for Hams" is now available Worldwide';
    const title =  I18n.t('ShareInviteFriend', { callsign: this.props.currentQRA })
    // const message = I18n.t('ShareMessage');
    const options = {
      title,
      subject: 'title2',
      // message: `${title}`
      message: `${title} ${url}`
    };

    Share.open(options);
    if (!__DEV__) analytics().logEvent('inviteFriendsDrawer_APPPRD');
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            {/* <Text style={styles.sectionHeadingStyle}>Section 1</Text> */}
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={() => {
                  if (!__DEV__)
                    analytics().logEvent('drawerHomePressed_APPPRD');

                  this.props.navigation.dispatch(DrawerActions.closeDrawer());

                  this.props.navigation.navigate('Home');
                }}>
                {I18n.t('HomeTitle')}
              </Text>
            </View>
          </View>
          <View>
            {/* <Text style={styles.sectionHeadingStyle}>Section 1</Text> */}
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={() => {
                  if (!__DEV__)
                    analytics().logEvent('drawerLatestUsersPressed_APPPRD');
                  this.props.actions.doLatestUsersFetch(this.props.blockedusers);
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());

                  this.props.navigation.navigate('ExploreUsers');
                }}>
                {I18n.t('navBar.exploreUsers')}
              </Text>
            </View>
          </View>
          <View>
            {/* <Text style={styles.sectionHeadingStyle}>Section 2</Text> */}
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={() => {
                  if (!__DEV__)
                    analytics().logEvent('drawerFieldDaysPressed_APPPRD');
                  this.props.actions.doFetchFieldDaysFeed(this.props.blockedusers);
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());

                  this.props.navigation.navigate('FieldDays');
                }}>
                {I18n.t('navBar.lastFieldDays')}
              </Text>
            </View>
          </View>
          <View>
            {/* <Text style={styles.sectionHeadingStyle}>Section 2</Text> */}
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={() => {
                  if (!__DEV__)
                    analytics().logEvent('drawerMyPostsPressed_APPPRD');
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());
                  this.props.navigation.navigate('QRAProfile');
                }}>
                {I18n.t('navBar.myPosts')}
              </Text>
            </View>
          </View>
          <View>
            {/* <Text style={styles.sectionHeadingStyle}>Section 2</Text> */}
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={() => {
                  if (!__DEV__)
                    analytics().logEvent('drawerEditBioPressed_APPPRD');
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());
                  this.props.navigation.navigate('editBio');
                }}>
                {I18n.t('navBar.editBio')}
              </Text>
            </View>
          </View>
          <View>
            {/* <Text style={styles.sectionHeadingStyle}>Section 2</Text> */}
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={() => {
                  if (!__DEV__)
                    analytics().logEvent('drawerEditInfoPressed_APPPRD');
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());
                  this.props.navigation.navigate('editInfo');
                }}>
                {I18n.t('navBar.editProfile')}
              </Text>
            </View>
          </View>
          {/* <View>
            
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.inviteStyle}
                onPress={() => {
                  // if (!__DEV__)
                  //   analytics().logEvent('drawerInviteFriendPressed_APPPRD');
                  // this.props.navigation.dispatch(DrawerActions.closeDrawer());
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());
                  this.share();
                 

                  // this.props.navigation.navigate('editInfo');
                }}>
                  {I18n.t('InviteFriend')}
              </Text>
            </View>
            
          </View> */}
        </ScrollView>
        {/* <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View> */}
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  navItemStyle: {
    padding: 10,
    fontSize: 20
  },
  inviteStyle: {
    padding: 10,
    fontSize: 20,
    color: '#243665',
    fontWeight: 'bold'
  },
  navSectionStyle: {
    // backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  }
});

const mapStateToProps = (state) => ({
  currentQRA: state.sqso.qra,
  blockedusers: state.sqso.currentQso.blockedUsers
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(SideMenu)
);
