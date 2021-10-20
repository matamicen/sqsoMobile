import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet
} from 'react-native';
import {   useSelector, useDispatch  } from 'react-redux';
// import { bindActionCreators} from 'redux';
// import * as Actions from '../../../actions';
import I18n from '../../../utils/i18n';
import { withNavigation } from 'react-navigation';
import { Button, Avatar, Card, Icon } from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';
import {clearQRA, doFetchQRA, doLatestUsersFetch, doLatestUsersFetchByCountry} from '../../../actions/qsoActions';


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

function ExploreUsers ({
  active,
  users,
  followed,
  followers,
  following,
  doFollow,
  currentQRA,
  navigation,
  actions
}) {

  const __blockedUsers = useSelector( (state) => state.sqso.currentQso.blockedUsers)
  // const blockedUsers = blocked['blockedUsers'];
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [showFlag, setShowFlag] = useState(false);
  const [cca2, setcca2] = useState('');
  const [countryName, setcountryName] = useState(I18n.t('exploreUsers.clear'));



 

  return (
    <View style={{ flex: 1 }}>
      <View style={{flexDirection: 'row', flex: 0.10 }}>
        <View style={{ margin:5,
                         padding:Platform.OS === 'android' ? 7: 15, 
                         backgroundColor: '#243665',
                         bottom: 10,
                         left: 2,
                         top: 1,
                         right: 38,
                        //  position: 'absolute',
                        //  alignItems: 'center',
                         borderBottomLeftRadius: 22,
                         borderBottomRightRadius: 22,
                         borderTopLeftRadius: 22,
                         borderTopRightRadius: 22, 
                         flex:0.22   
                                          
                          }}>

      <TouchableOpacity
        style={{ height: 60, width:80   }}
                          onPress={() => {
                            // actions.doLatestUsersFetchByCountry('IT');
                            setShowFlag(true)
                          }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('exploreUsers.country')}</Text>

         </TouchableOpacity>
         </View>
       
         <View style={{flex: 0.62, top: 16 }}>
          <TouchableOpacity
                          onPress={() => {
                            // actions.doLatestUsersFetchByCountry('IT');
                            setShowFlag(true)
                          }}>
            <Text style={{ fontSize: 16, padding:Platform.OS === 'android' ? 1: 7 }} >{countryName}</Text>
            </TouchableOpacity>
         </View>
        
         <View style={{ margin:5,
                         padding:Platform.OS === 'android' ? 7: 15, 
                          backgroundColor: '#243665',
                         bottom: 3,
                         left: 1,
                         right: 20,
                         top: 2,
                        //  position: 'absolute',
                          alignItems: 'center',
                         borderBottomLeftRadius: 22,
                         borderBottomRightRadius: 22,
                         borderTopLeftRadius: 22,
                         borderTopRightRadius: 22, 
                         flex:0.16   
                                          
                          }}>
                       
            <TouchableOpacity
            style={{ height: 60, width:80 ,  alignItems: 'center',}}
                              onPress={() => {
                                // actions.doLatestUsersFetch({blockedUsers});
                                dispatch(doLatestUsersFetch(currentQRA,__blockedUsers));
                                setcountryName('all')
                                // setShowFlag(true)
                              }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('exploreUsers.clear')}</Text>

            </TouchableOpacity>
         </View>
         { showFlag &&
         <CountryPicker
                        withEmoji={false}
                        withCloseButton={true}
                        withFlag={true}
                        //    countryCode={this.state.countryCode}
                        withFilter={true}
                        visible={true}
                        //  theme="black"
                        // withCallingCode
                        onSelect={(value) => {
                          // this.setState({
                          //   countryCode: country.cca2,
                          //   callingCode: `+ ${country.callingCode}`,
                          // });

                          // this.setState({
                          //   cca2: value.cca2,
                          //   callingCode: value.callingCode,
                          //   country: value.name,
                          //   showFlag: false
                          // });
                          console.log(value);
                          setShowFlag(false)
                          setCount(count + 5)
                          setcca2(value.cca2)
                          setcountryName(value.name)
                          // actions.doLatestUsersFetchByCountry(value.cca2,{blockedUsers});
                          dispatch(doLatestUsersFetchByCountry(value.cca2,__blockedUsers));
                        }}
                        onClose = { () => {
                          setShowFlag(false);
                          // setcountryName('');
                          console.log('cerro')} }
                        // ref={ref => {this.countryPicker = ref}}
                      />
              }
                 </View>
       <View style={{flex: 0.90 }}>
      <FlatList
        numColumns={2}
        contentContainerStyle={{
          alignItems: 'center',

          justifyContent: 'space-evenly',
          flexDirection: 'column'
          // flexWrap: 'wrap'
        }}
        data={users}
        renderItem={({ item, index }) => {
          let qra = item;

          if (currentQRA !== qra.qra)
            return (
              <View
                key={index}
                style={{
                  // flex: 1,
                  // width: 100,
                  height: 195,
                  margin: 3
                }}>
                <Card
                  containerStyle={{
                    height: 195,
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
                            // actions.clearQRA();
                            dispatch(clearQRA());
                            // actions.doFetchQRA(qra.qra);
                            dispatch(doFetchQRA(qra.qra));
                            navigation.push('QRAProfile', {
                              qra: qra.qra,
                              screen: 'PROFILE'
                            });
                          }}>
                          <Avatar
                            size="medium"
                            rounded
                            source={
                              qra.avatarpic
                                ? {
                                    uri: qra.avatarpic
                                  }
                                : require('../../../images/emptyprofile.png')
                            }
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.name}>
                        <TouchableOpacity
                          onPress={() => {
                            // actions.clearQRA();
                            dispatch(clearQRA());
                            // actions.doFetchQRA(qra.qra);
                            dispatch(doFetchQRA(qra.qra));
                            navigation.push('QRAProfile', {
                              qra: qra.qra,
                              screen: 'PROFILE'
                            });
                          }}>
                          <Text numberOfLines={1} style={{ fontSize: 16 }}>
                            {qra.qra}
                            <Text style={styles.flagText}>
                              {qra.country !== '' && qra.country !== null && (
                                <Text>{country2emoji(qra.country)}</Text>
                              )}
                            </Text>
                          </Text>

                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 13
                            }}>
                            {qra.firstname ? qra.firstname : ''}
                          </Text>

                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 13
                            }}>
                            {qra.lastname ? qra.lastname : ''}
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
                          {qra.qsos_counter}{' '}
                          {I18n.t('exploreUsers.qsosCreated')}
                        </Text>
                      </View> */}
                      <View>
                        <Text style={{ fontSize: 13 }}>
                          <Icon
                            name="users"
                            size={16}
                            type="font-awesome"
                            containerStyle={{ width: 20 }}
                          />

                          {I18n.t('qra.followers', {
                            COUNT: qra.followers_counter
                          })}
                        </Text>
                        <Text style={{ fontSize: 13 }}>
                          <Icon
                            name="users"
                            size={16}
                            type="font-awesome"
                            containerStyle={{ width: 20 }}
                          />

                          {I18n.t('qra.followingCounter', {
                            COUNT: qra.following_counter
                          })}
                        </Text>
                      </View>
                    </View>
                    {/* <Card.Divider style={styles.divider} /> */}
                    <View style={styles.buttons}>
                      {following.some((o) => o.qra === qra.qra) ||
                      followed.some((o) => o === qra.qra) ? (
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
                          onPress={() => doFollow(qra.qra)}
                          style={{
                            // paddingLeft: 10,
                            // paddingRight: 10,
                            margin: 0,
                            padding: 0
                          }}
                          title={
                            followers.some((o) => o.qra === qra.qra)
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
          else return null;
        }}
      />
      {/* <ScrollView contentContainerStyle={{}}>
        {/* <Header as="h1" attached="top" textAlign="center">
        {I18n.t('navBar.exploreUsers')}
      </Header> */}
      {/* <View
          style={{
            // width: null,
            flexDirection: 'row',
            justifyContent: 'center',
            // flexGrow: 1,
            flexWrap: 'wrap'
            // alignItems: 'flex-start'
          }}>
          {users.map((qra, i) => )}
        </View>
      </ScrollView> */}
      {/* */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flagText: {
    fontSize: 15
  },
  card: {},
  divider: { height: 1, margin: 0, padding: 0 },
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
    flexBasis: 70,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  avatar: {
    flex: 1,

    flexBasis: 60,
    flexGrow: 0,
    flexShrink: 0
  },
  name: {
    flex: 1,

    flexBasis: 90,
    flexGrow: 0,
    flexShrink: 0
  },
  header: {
    flex: 1,
    flexBasis: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
});
// const mapStateToProps = (state) => ({
//   // blockedusers: state.sqso.currentQso.blockedUsers
// });
// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(Actions, dispatch)
// });
// export default withNavigation(
//   connect(mapStateToProps, mapDispatchToProps)(ExploreUsers)
 

// );
export default withNavigation(ExploreUsers);