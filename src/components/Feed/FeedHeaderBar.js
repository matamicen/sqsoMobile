/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Alert, Text } from 'react-native';
import { Avatar, Icon, Button,TouchableOpacity } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import FeedHeaderSearch from './FeedHeaderSearch';
import { _ } from 'lodash';


// const all = async () =>{
//   // isSearching(true);
//   console.log('press all')
// }

class FeedHeaderBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        color0: '#243665',
        color1: 'grey',
        color2: 'grey',
        color3: 'grey',
        border0: 3,
        border1: 0,
        border2: 0,
        border3: 0,
        afterSearchTabs: false,
        followAllButtonsAndDrawer: true,
        opacity: 0.001



          }

          // this.searchIcon = this.searchIcon.bind(this); 
          this.searching = this.searching.bind(this);
          this.cancelSearch = this.cancelSearch.bind(this);
          this.startScreenHelp = this.startScreenHelp.bind(this)

  }

  static getDerivedStateFromProps(props, state) {
    console.log('getderived tabToGlobal: '+ props.tabtoglobal)
     if (props.tabtoglobal){  // si acaba de publicar entra aca
       props.actions.setTabToGlobal(false);

      return {
        followAllButtonsAndDrawer: false,  afterSearchTabs: true,
        color0: '#243665', border0: 3,
        color1: 'grey', color2: 'grey',color3: 'grey', border1: 0,border2: 0,
              border3: 0
      }
     } 

    console.log('getDerived headerbar')

    console.log('searchfeed props: '+props.searchfeed)
    if (props.searchfeed){
      
    //   if (_.isEmpty(props.global_aux)) { // si viene de search carga feed global
    //     props.actions.doClearFeed('GLOBAL');
    //     props.actions.doFetchPublicFeed(false);
    //  }
    //  else
    //   props.actions.doReceiveFeed(props.global_aux, 'GLOBAL', false)
    

    // return null
     return {
      followAllButtonsAndDrawer: false,  afterSearchTabs: true
    }
  }
    else
    return {
      followAllButtonsAndDrawer: true, afterSearchTabs: false, opacity:0.01
      // color0: '#243665', border0: 3,
      //   color1: 'grey', color2: 'grey',color3: 'grey', border1: 0,border2: 0,
      //         border3: 0
    }

   
  }

  componentDidMount() {
  
    // call this action in order to get focus and then dont fail in the first TAP that user do
    this.props.navigation.dispatch(DrawerActions.closeDrawer())

  }
 
  all() {
    console.log('all')
    this.props.actions.setSearchedResultsFilter('ALL');
    this.setState({color1: '#243665', border1: 3,
    color2: 'grey',color3: 'grey', border2: 0,
    border3: 0,
     })
  }

  posts() {
    console.log('post')
    this.props.actions.setSearchedResultsFilter('PUBS');
    this.setState({color1: 'grey', border1: 0,
    color2: '#243665',color3: 'grey', border2: 3,
    border3: 0,
     })
  }

  hams() {
    console.log('hams')
    this.props.actions.setSearchedResultsFilter('HAMS');
    this.setState({color1: 'grey', border1: 0,
    color2: 'grey',color3: '#243665', border2: 0,
    border3: 3,
     })
  }

  searchIcon() {
    console.log('serachIcon')
    console.log('states drawer y aftersearchtabs:' + this.state.followAllButtonsAndDrawer + this.state.afterSearchTabs);
    this.setState({followAllButtonsAndDrawer: false,  afterSearchTabs: true})

  }
  searching() {
    // set de default TAB ALL, every new search is ALL by default
    this.setState({followAllButtonsAndDrawer: false, afterSearchTabs: true, opacity:1,
      color1: '#243665', border1: 3,
      color2: 'grey',color3: 'grey', border2: 0,
      border3: 0 })

    //   if (_.isEmpty(this.props.global_aux)) { // si viene de search carga feed global
    //     this.props.actions.doClearFeed('GLOBAL');
    //     this.props.actions.doFetchPublicFeed(false,this.props.blockedusers);
    //  }
    //  else
    //   this.props.actions.doReceiveFeed(this.props.global_aux, 'GLOBAL', false,this.props.blockedusers)


        
        

  }

  cancelSearch() {
    // this.setState({followAllButtonsAndDrawer: true, afterSearchTabs: false,  opacity:0.01 })
    // this.props.actions.setSearchedResults([],false);
    this.setState({followAllButtonsAndDrawer: false, afterSearchTabs: true, opacity:1,
      color0: '#243665', color1: 'grey', border0: 3, border1: 0,
      color2: 'grey',color3: 'grey', border2: 0,
      border3: 0 })

      if (_.isEmpty(this.props.global_aux)) { // si viene de search carga feed global
        this.props.actions.doClearFeed('REGIONAL');
        this.props.actions.doFetchRegionalFeed(false,this.props.blockedusers);
     }
     else
      this.props.actions.doReceiveFeed(this.props.regional_aux, 'REGIONAL', false,this.props.blockedusers)
 

  }
 
  startScreenHelp(){
    this.props.navigation.dispatch(DrawerActions.openDrawer())

  }

  // componentDidUpdate(prevProps, prevState) {
  //   // if (this.props.follow !== prevProps.follow)
  //   //   this.setState({ follow: this.props.follow });
  //   console.log('didupdate header')
  //   console.log('searchfeed prevProps: '+prevProps.searchfeed)
  //   console.log('searchfeed prevState: '+prevState.searchfeed)

  // }

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
          {/* <View
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
              source={require('../../images/superqsologo2.png')}
            />
          </View> */}

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
              // searchicon={this.searchIcon.bind()}
              searching={this.searching.bind()}
              cancelsearch={this.cancelSearch.bind()}
              startscreenhelp={this.startScreenHelp.bind()}
            />
          </View>
          {(this.state.followAllButtonsAndDrawer) && 
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
         }
        </View>

       { (this.state.followAllButtonsAndDrawer) && 

     <View style={{ paddingBottom: 10, zIndex: 1, flexDirection: 'row' }} > 
         
          
     
         <View style={{ flex: 0.25, borderBottomWidth: this.state.border0, borderBottomColor: this.state.color0, alignItems: 'center' }}>
           
           <Text  style={{ color: this.state.color0, fontSize: 18}} 
           onPress={() => {
         
            this.setState({color0: '#243665', border0: 3,
            color1: 'grey', color2: 'grey',color3: 'grey', border1: 0, border2: 0,
            border3: 0,
             })
                    if (!__DEV__) analytics().logEvent('swichToPublicFeed_APPPRD');
                 if (_.isEmpty(this.props.global_aux)) { 
                    this.props.actions.doClearFeed('REGIONAL');
                    this.props.actions.doFetchRegionalFeed(false,this.props.blockedusers);
                 }
                 else
                  this.props.actions.doReceiveFeed(this.props.regional_aux, 'REGIONAL',false,this.props.blockedusers)
                 
                  }}>
                  {I18n.t('navBar.regional')}
           </Text>
          </View>

            <View style={{ flex: 0.25, borderBottomWidth: this.state.border1, borderBottomColor: this.state.color1, alignItems: 'center' }}>
           
             <Text  style={{ color: this.state.color1, fontSize: 18}} 
             onPress={() => {
           
              this.setState({color1: '#243665', border1: 3,
              color0: 'grey', color2: 'grey',color3: 'grey', border0: 0, border2: 0,
              border3: 0,
               })
                      if (!__DEV__) analytics().logEvent('swichToPublicFeed_APPPRD');
                   if (_.isEmpty(this.props.global_aux)) { 
                      this.props.actions.doClearFeed('GLOBAL');
                      this.props.actions.doFetchPublicFeed(false,this.props.blockedusers);
                   }
                   else
                    this.props.actions.doReceiveFeed(this.props.global_aux, 'GLOBAL',false,this.props.blockedusers)
                   
                    }}>
                    {I18n.t('navBar.global')}
             </Text>
            </View>

            <View style={{ flex: 0.25, borderBottomWidth: this.state.border2, borderBottomColor: this.state.color2, alignItems: 'center' }}>
           
            <Text  style={{ color: this.state.color2, fontSize: 18}} 
                           onPress={() => {
                            
                                    if (!__DEV__) analytics().logEvent('swichToFollowingFeed_APPPRD');
                                    if (this.props.following_counter === 0)
                                    // if (1===2)
                                      Alert.alert('',I18n.t('navBar.noFollowingMessage'));
                                    else {
                                      this.setState({color1: 'grey', border1: 0,
                                      color0: 'grey', color2: '#243665',color3: 'grey', border0: 0, border2: 3,
                                          border3: 0,
                                          })
                                      if (_.isEmpty(this.props.following_aux)) { 
                                        console.log('length:'+this.props.following_aux.length)
                                        this.props.actions.doClearFeed('FOLLOWING');
                                        this.props.actions.doFetchUserFeed(this.props.currentQRA,false,this.props.blockedusers);
                                      }
                                      else
                                       this.props.actions.doReceiveFeed(this.props.following_aux, 'FOLLOWING',false,this.props.blockedusers)
                                    }
                                  }}>    
              {I18n.t('navBar.following')}</Text>
           </View>

          <View style={{ flex: 0.25, borderBottomWidth: this.state.border3, borderBottomColor: this.state.color3, alignItems: 'center' }}>
           
           <Text  style={{ color: this.state.color3, fontSize: 18}}
              onPress={() => {
                this.setState({color1: 'grey', border1: 0,
                color0: 'grey', color2: 'grey',color3: '#243665', border0: 0, border2: 0,
                border3: 3,
                 })
                if (!__DEV__) analytics().logEvent('swichToQAPFeed_APPPRD');
             
                  if (_.isEmpty(this.props.qap_aux)) { 
                  this.props.actions.doClearFeed('QAP');
                  this.props.actions.doFetchPublicQAPfeed(false,this.props.blockedusers);
                  }
                  else
                   this.props.actions.doReceiveFeed(this.props.qap_aux, 'QAP', false,this.props.blockedusers)
          
              }}>          
               {I18n.t('navBar.QAP')}
           </Text>
          </View>
  
            </View>
  }


  
 {(this.state.afterSearchTabs) && 
   <View
          style={{ paddingBottom: 10, zIndex: 1, flexDirection: 'row' }}
          opacity={this.state.opacity}
          pointerEvents={this.props.feedtouchable ? 'auto' : 'none'}
          > 
         
          
            <View style={{ flex: 0.33, borderBottomWidth: this.state.border1, borderBottomColor: this.state.color1, alignItems: 'center' }}>
           
             <Text onPress={() => this.all()} style={{ color: this.state.color1, fontSize: 18}} >{I18n.t('search.all')}</Text>
          
            </View>

            <View style={{ flex: 0.33, borderBottomWidth: this.state.border2, borderBottomColor: this.state.color2, alignItems: 'center' }}>
           
            <Text onPress={() => this.posts()} style={{ color: this.state.color2, fontSize: 18}} >{I18n.t('search.posts')}</Text>
        
           </View>

          <View style={{ flex: 0.33, borderBottomWidth: this.state.border3, borderBottomColor: this.state.color3, alignItems: 'center' }}>
           
           <Text onPress={() => this.hams()} style={{ color: this.state.color3, fontSize: 18}} >{I18n.t('search.hams')}</Text>
        
          </View>
         


 




            </View>
  }





      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  FetchingQSOS: state.sqso.feed.FetchingQSOS,
  publicFeed: state.sqso.feed.publicFeed,
  qsosFetched: state.sqso.feed.qsosFetched,
  following_counter: state.sqso.userInfo.following_counter,
  //   authenticating: state.sqso.feeduserData.authenticating,
  currentQRA: state.sqso.qra,
  feedtouchable: state.sqso.feed.FeedTouchable,
  searchfeed: state.sqso.feed.searchfeed,
  token: state.sqso.jwtToken,
  qsos: state.sqso.feed.qsos,
  global_aux: state.sqso.feed.global_aux,
  following_aux: state.sqso.feed.following_aux,
  qap_aux: state.sqso.feed.qap_aux,
  regional_aux: state.sqso.feed.regional_aux,
  tabtoglobal: state.sqso.tabToGlobal,
  userinfo: state.sqso.userInfo,
  blockedusers: state.sqso.currentQso.blockedUsers
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(FeedHeaderBar)
);
