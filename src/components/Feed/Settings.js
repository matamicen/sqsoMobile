import React, { Fragment } from 'react';
import { ActivityIndicator, View,Text , TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../utils/i18n';
import { bindActionCreators } from 'redux';

import * as Actions from '../../actions';
import Qra from '../Profile/Qra';

import analytics from '@react-native-firebase/analytics';

class Settings extends React.PureComponent {
  constructor() {
    super();
    this.state = { followed: [] };
  }

  doFollow = (param) => {
 
    // if (!__DEV__) analytics().logEvent('qraFollowExplore_APPPRD');
    // if (this.props.userinfo.pendingVerification) userNotValidated();
    // else {
    //   this.setState({ followed: [...this.state.followed, param] });
    //   this.props.actions.doFollowQRA(this.props.token, param);
    // }
  };
  // doUnfollow = param => {

  //     this.props.actions.doUnfollowQRA(this.props.token, param);

  _keyExtractor = (item) => item.idqra_blocked;

  _renderItem = ({ item }) => {
    const { blockedbyme,idqra_blocked, qrablocked, profilepic } = item;

    return (
      (blockedbyme !== 'iwasblocked') &&
      <View>
        {/* <View style={{ paddingRight: 5, width: 88, paddingBottom: 5 }}> */}
         <View style={{
          flexDirection: 'row',
          // backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          flex: 1
          // marginTop: 15,
          // opacity: this.state.indicator
        }}>
          <View>
          <Qra
            qra={qrablocked}
            imageurl={profilepic}
            navigation={this.props.navigation}
          />
          </View>
          <View style={{marginLeft: 15}}>
          <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => 
                        {
                          // this.props.actions.blockUnblockUser(
                          //   this.props.qraInfo.qra.qra,'UNBLOCK',this.props.jwtToken)
                          this.props.actions.blockUnblockUser(qrablocked,'UNBLOCK',this.props.jwtToken)
                            user = {"idqra_unblock": idqra_blocked}
                            this.props.actions.updateBlockUsers(user,'UNBLOCK')
                          // this.props.navigation.navigate('Home')}
                        }}>
                        <Text style={styles.buttonText}>
                        {I18n.t('qra.UnblockUser')}
                        </Text>
                      </TouchableOpacity>
          </View>
        </View>
       </View>
    );
  };

  render() {
console.log(this.props.blockedusers)
      return (
        <View  style={{
          flexDirection: 'column',
          // backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          flex: 1
          // marginTop: 15,
          // opacity: this.state.indicator
        }}>
      
        <View  style={{flex: 0.1}}>
          <Text style={{fontSize: 18}}>{I18n.t('qra.blockTitle')}</Text>
        </View>
        <View  style={{flex: 0.8}}>
       {this.props.blockedusers.length > 0 ?
        <FlatList
            style={styles.qralist}
            contentContainerStyle={{
              paddingTop: 10
            }}
            data={this.props.blockedusers}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            // numColumns={3}
          />
          :
          <Text>{I18n.t('qra.NoBlockUsers')}</Text>
  }
        </View>
   
       </View>
      )
   
  }
  
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#243665',
    paddingVertical: 5,
    borderRadius: 22,
    width: 165,
    height: 42,
    marginLeft: 0,
    marginTop: 0
  },
  buttonText: {
    textAlign: 'center',
    // color: '#FFFFFF',
    color: 'white',
    marginTop: 3,
    fontSize: 18
    //  fontWeight: '700'
  }
  })

const mapStateToProps = (state, ownProps) => ({
  // followFetched: state.sqso.feed.followFetched,
  // followFetching: state.sqso.feed.followFetching,
  // latestUsers: state.sqso.feed.latestUsers,
  // followers: state.sqso.currentQso.followers,
  // followings: state.sqso.currentQso.followings,
  // userinfo: state.sqso.userInfo,
  // currentQRA: state.sqso.qra,
  blockedusers: state.sqso.currentQso.blockedUsers,
  jwtToken: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
