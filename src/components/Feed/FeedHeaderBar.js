import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Avatar, Icon, Button } from 'react-native-elements';
import { DrawerActions, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import FeedHeaderSearch from './FeedHeaderSearch';
class FeedHeaderBar extends React.Component {
  render() {
    return (
      <View style={{ height: 110, zIndex: 999 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',

            height: 20,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            zIndex: 999
          }}>
          <View
            style={{
              flex: 1,
              flexBasis: 60,
              flexGrow: 0,
              flexShrink: 0,
              marginTop: 5,
              marginLeft: 5
            }}>
            <Avatar
              size="medium"
              rounded
              source={require('../../images/superqsoIconAzul.png')}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexGrow: 1,
              zIndex: 999
            }}>
            <FeedHeaderSearch
              navigate={(qra) => {
                this.props.actions.clearQRA();
                this.props.actions.doFetchQRA(qra);
                this.props.navigation.push('QRAProfile', {
                  qra,
                  screen: 'PROFILE'
                });
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexBasis: 40,
              flexGrow: 0,
              marginTop: 12,
              marginRight: 5,
              zIndex: 999
            }}>
            <Icon
              size={30}
              name="navicon"
              type="font-awesome"
              onPress={() => {
                this.props.navigation.dispatch(DrawerActions.openDrawer());
              }}
            />
          </View>
        </View>
        <View style={{ paddingBottom: 10,  zIndex: 1 }}
         pointerEvents={this.props.feedtouchable ? 'auto' : 'none'}>
          {this.props.publicFeed && (
            <Button
              fluid
              raised
              titleStyle={{ fontSize: 17 }}
              buttonStyle={{ backgroundColor: 'green' }}
              size="medium"
              onPress={() => {
                if (!__DEV__) analytics().logEvent('swichToUserFeed_APPPRD');
                if (this.props.following_counter === 0)
                  Alert.alert(I18n.t('navBar.noFollowingMessage'));
                else {
                  this.props.actions.doClearFeed();
                  this.props.actions.doFetchUserFeed(this.props.currentQRA);
                }
              }}
              title={I18n.t('navBar.onlyFollowFeed')}
            />
          )}
          {!this.props.publicFeed && (
            <Button
              fluid
              raised
              titleStyle={{ fontSize: 17 }}
              buttonStyle={{ backgroundColor: 'green' }}
              size="medium"
              onPress={() => {
                if (!__DEV__) analytics().logEvent('swichToPublicFeed_APPPRD');
                this.props.actions.doClearFeed();
                this.props.actions.doFetchPublicFeed();
              }}
              title={I18n.t('navBar.allUsersFeed')}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    zIndex: 999
    // padding: 16,
    // marginTop: 40
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    zIndex: 999
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16
  }
});
const mapStateToProps = (state) => ({
  FetchingQSOS: state.sqso.feed.FetchingQSOS,
  publicFeed: state.sqso.feed.publicFeed,
  qsosFetched: state.sqso.feed.qsosFetched,
  following_counter: state.sqso.userInfo.following_counter,
  //   authenticating: state.sqso.feeduserData.authenticating,
  currentQRA: state.sqso.qra,
  feedtouchable: state.sqso.feed.FeedTouchable,

  token: state.sqso.jwtToken,
  qsos: state.sqso.feed.qsos
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(FeedHeaderBar)
);
