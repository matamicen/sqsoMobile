import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  NavigationActions,
  withNavigation,
  DrawerActions
} from 'react-navigation';
import I18n from '../../utils/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.push(route);
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
                  this.props.actions.doFetchPublicFeed(this.props.currentQRA);
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());

                  this.props.navigation.navigate('Home');
                }}>
                {I18n.t('HomeTitle')}
              </Text>
            </View>
          </View>
          <View>
            {/* <Text style={styles.sectionHeadingStyle}>Section 2</Text> */}
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={() => {
                  this.props.actions.doFetchFieldDaysFeed();
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
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());
                  this.props.navigation.navigate('editInfo');
                }}>
                {I18n.t('navBar.editProfile')}
              </Text>
            </View>
          </View>
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
    padding: 10
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
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(SideMenu)
);
