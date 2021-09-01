import React from 'react';
import I18n from '../../utils/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { userNotValidated } from '../../helper';
import analytics from '@react-native-firebase/analytics';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

import { withNavigation } from 'react-navigation';
import { Button, Avatar, Card, Icon } from 'react-native-elements';

// import Carousel from 'react-native-snap-carousel';

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
class FeedItemSearchQra extends React.PureComponent {

    state = {
        followed: []
     
      };



      doFollow = (param) => {
        // if (!__DEV__)
        //   window.gtag('event', 'qraFollowRecommended_APPPRD', {
        //     event_category: 'User',
        //     event_label: 'follow'
        //   });
        if (!__DEV__) analytics().logEvent('qraFollowSearchCard_APPPRD');
        if (this.props.userinfo.pendingVerification) userNotValidated();
        else {
          this.setState({ followed: [...this.state.followed, param] });
          this.props.actions.doFollowQRA(this.props.token, param);
        }
      };
//   _renderItem(props) {
//     let qra = props.item;
//     return (
//       <View
//         key={qra.qra}
//         style={{
//           // flex: 1,
//           // width: 100,
//           height: 175,
//           margin: 3
//         }}>
//         <Card
//           containerStyle={{
//             height: 175,
//             borderRadius: 5,
//             // flex: 1,
//             // flexWrap: 'wrap',
//             // width: 390,
//             padding: 5,
//             margin: 0
//           }}>
//           <View style={styles.card}>
//             <View style={styles.header}>
//               <View style={styles.avatar}>
//                 <TouchableOpacity
//                   onPress={() => {
//                     this.props.actions.clearQRA();
//                     this.props.actions.doFetchQRA(qra.qra);
//                     this.props.navigation.push('QRAProfile', {
//                       qra: qra.qra,
//                       screen: 'PROFILE'
//                     });
//                   }}>
//                   <Avatar
//                     size="medium"
//                     rounded
//                     source={
//                       qra.avatarpic
//                         ? {
//                             uri: qra.avatarpic
//                           }
//                         : require('../../../images/emptyprofile.png')
//                     }
//                   />
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.name}>
//                 <TouchableOpacity
//                   onPress={() => {
//                     this.props.actions.clearQRA();
//                     this.props.actions.doFetchQRA(qra.qra);
//                     this.props.navigation.push('QRAProfile', {
//                       qra: qra.qra,
//                       screen: 'PROFILE'
//                     });
//                   }}>
//                   <Text numberOfLines={1} style={{ fontSize: 16 }}>
//                     {qra.qra}
//                     <Text style={styles.flagText}>
//                       {qra.country !== '' && qra.country !== null && (
//                         <Text>{country2emoji(qra.country)}</Text>
//                       )}
//                     </Text>
//                   </Text>

//                   <Text
//                     numberOfLines={1}
//                     style={{
//                       fontSize: 13
//                     }}>
//                     {qra.firstname ? qra.firstname : ''}
//                   </Text>

//                   <Text
//                     numberOfLines={1}
//                     style={{
//                       fontSize: 13
//                     }}>
//                     {qra.lastname ? qra.lastname : ''}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//             {/* <Card.Divider /> */}
//             <View style={styles.kpi}>
//               {/* <View>
//                 <Text style={{ fontSize: 13 }}>
//                   <Icon
//                     name="edit"
//                     size={16}
//                     type="font-awesome"
//                     containerStyle={{ width: 20 }}
//                   />
//                   {qra.qsos_counter} {I18n.t('exploreUsers.qsosCreated')}
//                 </Text>
//               </View> */}
//               <View>
//                 <Text style={{ fontSize: 13 }}>
//                   <Icon
//                     name="users"
//                     size={16}
//                     type="font-awesome"
//                     containerStyle={{ width: 20 }}
//                   />
//                   {I18n.t('qra.followers', { COUNT: qra.followers_counter })}
//                 </Text>
//               </View>
//               <View>
//                 <Text style={{ fontSize: 13 }}>
//                   <Icon
//                     name="users"
//                     size={16}
//                     type="font-awesome"
//                     containerStyle={{ width: 20 }}
//                   />
//                   {I18n.t('qra.followingCounter', {
//                     COUNT: qra.following_counter
//                   })}
//                 </Text>
//               </View>
//             </View>
//             {/* <Card.Divider style={styles.divider} /> */}
//             <View style={styles.buttons}>
//               {this.props.following.some((o) => o.qra === qra.qra) ||
//               this.props.followed.some((o) => o === qra.qra) ? (
//                 <Button
//                   fluid
//                   disabled
//                   style={{ paddingLeft: 10, paddingRight: 10 }}
//                   title={I18n.t('qra.following')}
//                 />
//               ) : (
//                 <Button
//                   fluid
//                   raised
//                   onPress={() => this.props.doFollow(qra.qra)}
//                   style={{
//                     // paddingLeft: 10,
//                     // paddingRight: 10,
//                     margin: 0
//                     // padding: 0
//                   }}
//                   title={
//                     this.props.followers.some((o) => o.qra === qra.qra)
//                       ? I18n.t('qra.followToo')
//                       : I18n.t('qra.follow')
//                   }
//                 />
//               )}
//             </View>
//           </View>
//         </Card>
//       </View>
//     );
//   }

  render() {

    //  let qra = props.item;
    // let qra = {qra: 'pepe', firstname: 'elias', lastname: 'shalom', country: ' US', followers_counter: 10, following_counter:15}
    return (
      <View
        key={this.props.qra.qra}
        style={{
          // flex: 1,
          // width: 100,
          height: 190,
          margin: 3
        }}>
        <Card
          containerStyle={{
            height: 190,
            borderRadius: 5,
            // flex: 1,
            // flexWrap: 'wrap',
            // width: 390,
            padding: 5,
            margin: 0
          }}>
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.avatar}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.actions.clearQRA();
                    this.props.actions.doFetchQRA(this.props.qra.qra);
                    this.props.navigation.push('QRAProfile', {
                      qra: this.props.qra.qra,
                      screen: 'PROFILE'
                    });
                  }}>
                  <Avatar
                    size="medium"
                    rounded
                    source={
                      this.props.qra.avatarpic
                        ? {
                            uri: this.props.qra.avatarpic
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
                    this.props.actions.doFetchQRA(this.props.qra.qra);
                    this.props.navigation.push('QRAProfile', {
                      qra: this.props.qra.qra,
                      screen: 'PROFILE'
                    });
                  }}>
                  <Text numberOfLines={1} style={{ fontSize: 21 }}>
                    {this.props.qra.qra}
                    <Text style={styles.flagText}>
                      {this.props.qra.country !== '' && this.props.qra.country !== null && (
                        <Text>{country2emoji(this.props.qra.country)}</Text>
                      )}
                    </Text>
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 19
                    }}>
                    {this.props.qra.firstname ? this.props.qra.firstname : ''}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 19
                    }}>
                    {this.props.qra.lastname ? this.props.qra.lastname : ''}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <Card.Divider /> */}
            <View style={styles.kpi}>
              {/* <View>
                <Text style={{ fontSize: 13 }}>
                  <Icon
                    name="edit"
                    size={16}
                    type="font-awesome"
                    containerStyle={{ width: 20 }}
                  />
                  {qra.qsos_counter} {I18n.t('exploreUsers.qsosCreated')}
                </Text>
              </View> */}
              <View>
                <Text style={{ fontSize: 16 }}>
                  <Icon
                    name="users"
                    size={16}
                    type="font-awesome"
                    containerStyle={{ width: 20 }}
                  />
                  {I18n.t('qra.followers', { COUNT: this.props.qra.followers_counter })}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 16 }}>
                  <Icon
                    name="users"
                    size={16}
                    type="font-awesome"
                    containerStyle={{ width: 20 }}
                  />
                  {I18n.t('qra.followingCounter', {
                    COUNT: this.props.qra.following_counter
                  })}
                </Text>
              </View>
            </View>
            {/* <Card.Divider style={styles.divider} /> */}
            {/* de aca para abajo va */}
            <View style={styles.buttons}>
                
              {this.props.following.some((o) => o.qra === this.props.qra.qra) ||
              this.state.followed.some((o) => o === this.props.qra.qra) ||
              (this.props.userinfo.qra === this.props.qra.qra)? (
                <Button
                  fluid
                  disabled
                  style={{ paddingLeft: 10, paddingRight: 10 }}
                  title={I18n.t('qra.following')}
                />
              ) : (
                <Button
                  fluid
                  raised
                  onPress={() => this.doFollow(this.props.qra.qra)}
                // onPress={() => console.log('pepe')}
                  style={{
                    // paddingLeft: 10,
                    // paddingRight: 10,
                    margin: 0
                    // padding: 0
                  }}
                  title={
                    this.props.followers.some((o) => o.qra === this.props.qra.qra)
                      ? I18n.t('qra.followToo')
                      : I18n.t('qra.follow')
                  }
                />
              )}
            </View>
          </View>
        </Card>
      </View>
    );
    
}

}

const styles = StyleSheet.create({
  card: {},

  buttons: {
    // flex: 1,
    margin: 0,
    padding: 0
    // flexBasis: 50,
    // flexDirection: 'column',
    // alignItems: 'flex-start'
  },
  kpi: {
    flex: 1,
    margin: 0,
    padding: 0,
    flexBasis: 50,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 15
  },
  avatar: {
    flex: 1,

    flexBasis: 60,
    flexGrow: 0,
    flexShrink: 0
  },
  flagText: {
    fontSize: 22
  },
  name: {
    flex: 1,

    flexBasis: 200,
    flexGrow: 0,
    flexShrink: 0
  },
  header: {
    flex: 1,
    flexBasis: 70,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
});

const mapStateToProps = (state) => ({

    // currentQRA: state.sqso.qra,
    // followFetched: state.sqso.feed.followFetched,
    // followFetching: state.sqso.feed.followFetching,
    // follow: state.sqso.feed.follow,
    following: state.sqso.currentQso.followings,
    followers: state.sqso.currentQso.followers,
    userinfo: state.sqso.userInfo,
    token: state.sqso.jwtToken


});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(FeedItemSearchQra)
);
