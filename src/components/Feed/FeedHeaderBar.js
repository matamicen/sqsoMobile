/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Alert, Text, Animated, Dimensions } from 'react-native';
import { Avatar, Icon, Button,TouchableOpacity } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import FeedHeaderSearch from './FeedHeaderSearch';


// const all = async () =>{
//   // isSearching(true);
//   console.log('press all')
// }
const {width, height} = Dimensions.get('window');

class FeedHeaderBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        color1: '#243665',
        color2: 'grey',
        color3: 'grey',
        border1: 3,
        border2: 0,
        border3: 0,
        afterSearchTabs: false,
        followAllButtonsAndDrawer: true,
        opacity: 0.001,
        animatePosition: new Animated.ValueXY({x:height, y:width}),
        animateBorder: new Animated.Value(0),  



          }

          this.searchIcon = this.searchIcon.bind(this); 
          this.searching = this.searching.bind(this);
          this.cancelSearch = this.cancelSearch.bind(this);
          this.startScreenHelp = this.startScreenHelp.bind(this)

  }
 
  componentWillMount(){
    
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
    this.setState({followAllButtonsAndDrawer: false,  afterSearchTabs: true, opacity:0.01})

  }
  searching() {
    // set de default TAB ALL, every new search is ALL by default
    this.setState({followAllButtonsAndDrawer: false, afterSearchTabs: true, opacity:1,
      color1: '#243665', border1: 3,
      color2: 'grey',color3: 'grey', border2: 0,
      border3: 0 })

  }

  cancelSearch() {
    this.setState({followAllButtonsAndDrawer: true, afterSearchTabs: false })
 
  }
 
  startScreenHelp(){
    console.log('showtutorial header bar')
    this.props.actions.showTutorial();
    // Animated.sequence([
    //   Animated.timing(this.state.animatePosition,{
    //     toValue: {x:height-height*2.02, y:width-width*2.045},
    //     duration:2000
    //   }),
    //   Animated.timing(this.state.animateBorder,{
    //     toValue:750,
    //     duration:2000
    //   })
    
    // ]).start(() => {
    //   this.props.navigation.dispatch(DrawerActions.openDrawer()) 
    // });
    

  }

  componentDidMount() {
  
    // call this action in order to get focus and then dont fail in the first TAP that user do
    this.props.navigation.dispatch(DrawerActions.closeDrawer())

  }
  render() {
    return (
      <View style={{ height: 110, zIndex: 999 }}>
        <Animated.View
          style={{
            width: 1560,
            height: 1560,
            position: 'absolute',
            borderColor: 'rgba(35,54,101,0.8)',
            borderRadius: 10000,
            borderWidth: this.state.animateBorder,
            top: this.state.animatePosition.x,
            left: this.state.animatePosition.y,
            zIndex: 1000
          }}
        />
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
              searchicon={this.searchIcon.bind()}
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

        {(this.state.followAllButtonsAndDrawer) && 
        <View
          style={{ paddingBottom: 10, zIndex: 1 }}
          pointerEvents={this.props.feedtouchable ? 'auto' : 'none'}>
          {this.props.publicFeed && (
            <Button
              fluid
              raised
              titleStyle={{ fontSize: 17 }}
              buttonStyle={{ backgroundColor: '#243665' }}
              size="medium"
              onPress={() => {
                if (!__DEV__) analytics().logEvent('swichToUserFeed_APPPRD');
                if (this.props.following_counter === 0)
                  Alert.alert(I18n.t('navBar.noFollowingMessage'));
                else {
                  this.props.actions.doClearFeed(false);
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
              buttonStyle={{ backgroundColor: '#243665' }}
              size="medium"
              onPress={() => {
                if (!__DEV__) analytics().logEvent('swichToPublicFeed_APPPRD');
                this.props.actions.doClearFeed(true);
                this.props.actions.doFetchPublicFeed();
              }}
              title={I18n.t('navBar.allUsersFeed')}
            />
          )}
        </View>
  }
 {(this.state.afterSearchTabs) && 
   <View
          style={{ paddingBottom: 10, zIndex: 1, flexDirection: 'row' }}
          opacity={this.state.opacity}
          pointerEvents={this.props.feedtouchable ? 'auto' : 'none'}> 
         
          
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

  token: state.sqso.jwtToken,
  qsos: state.sqso.feed.qsos
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(FeedHeaderBar)
);
