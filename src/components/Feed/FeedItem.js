import React from 'react';
import FeedItemAd from './FeedItemAd';
import FeedItemFollow from './FeedItemFollow';
import FeedItemQSO from './FeedItemQSO';
import FeedItemRepost from './FeedItemRepost';
import FeedItemSearchQra from './FeedItemSearchQra'
import ActivitiesCarousel from './activitiesCarousel';
import { withNavigation } from 'react-navigation';
import { Button } from 'react-native-elements';
import { View, Text } from 'react-native';
import I18n from '../../utils/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import analytics from '@react-native-firebase/analytics';
class FeedItem extends React.Component {
  shouldComponentUpdate() {
    return this.props.type ? true : false;
  }
  render() {
    if (this.props.type)
      switch (this.props.type) {
        case 'POST':
        case 'QAP':
        case 'FLDDAY':
        case 'QSO':
        case 'LISTEN':
          return (
            <FeedItemQSO
              feedType={this.props.feedType}
              key={this.props.idqsos}
              // qso={this.props.qso}
              idqsos={this.props.idqsos}

              // index={this.props.index}
            />
          );

        case 'SHARE':
          return (
            <FeedItemRepost
              feedType={this.props.feedType}
              key={this.props.idqsos}
              idqsos={this.props.idqsos}
              // qso={this.props.qso}
              index={this.props.currentIndex}
              navigation={this.props.navigation}
            />
          );
        case 'AD':
          if (
            this.props.currentIndex === 0 &&
            this.props.feedType !== 'PROFILE'
            && this.props.feedType !== 'SEARCH'
          ) {
            return (
              <View>
                <Button
                  fluid
                  size="medium"
                  onPress={() => {
                    // if (!__DEV__)
                    // window.gtag('event', 'exploreUsersButton_APPPRD', {});
                    if (!__DEV__)
                      analytics().logEvent('exploreUsersButton_APPPRD');

                    this.props.navigation.navigate('ExploreUsers');
                  }}
                  title={I18n.t('exploreUsers.lookWhoInQSO')}
                />
              </View>
            );
          } else if (this.props.currentIndex === 4 && this.props.feedType !== 'PROFILE'
             && this.props.feedType !== 'SEARCH')
          
            return (
              <View>
                 <ActivitiesCarousel /> 
                  
                              <View
                  style={{
                    height: 20,
                    width: '100%',
                    backgroundColor: '#CED0CE'
                    // marginLeft: '14%'
                  }}
                />
                <FeedItemAd
                  feedType={this.props.feedType}
                  country={this.props.country}
                  currentIndex={this.props.currentIndex}
                  userinfo={this.props.userinfo}
                  feed={this.props.publicFeed}
                />
               
            </View>
            );
          else if (
            (this.props.currentIndex === 8 || this.props.currentIndex % 16 === 0) && this.props.feedType !== 'PROFILE'
              && this.props.feedType !== 'SEARCH')
           {
            return (
              <View>
                 <FeedItemFollow
                    source={this.props.source}
                    ad={this.props.ad}
                    index={this.props.currentIndex}
                  />
                  <View
                  style={{
                    height: 20,
                    width: '100%',
                    backgroundColor: '#CED0CE'
                    // marginLeft: '14%'
                  }}
                />
                  <FeedItemAd
                  feedType={this.props.feedType}
                  country={this.props.country}
                  currentIndex={this.props.currentIndex}
                  userinfo={this.props.userinfo}
                  feed={this.props.publicFeed}
                />
                               
                 
            </View>
            );
          } else if (this.props.currentIndex !== 0) {

           console.log('cuenta:' + this.props.currentIndex + 'da : '+ this.props.currentIndex%4) 
           console.log('esta en feed:'+ this.props.publicFeed + 'feedType:'+this.props.feedType)
            return (
              <FeedItemAd
                feedType={this.props.feedType}
                country={this.props.country}
                currentIndex={this.props.currentIndex}
                userinfo={this.props.userinfo}
                feed={this.props.publicFeed}
              />
            );
          } else {
            return null;
          }
        case 'QRA':
          return (
         
            <FeedItemSearchQra qra={this.props.qso}/>
          );
          // console.log('QRA');
          // break;
        default:
          return null;
      }
  }
}

const mapStateToProps = (state) => ({ country: state.sqso.userInfo.country,
                                   publicFeed: state.sqso.feed.publicFeed,
                                   userinfo: state.sqso.userInfo
                                  
                                  
                                  
                                  });
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(FeedItem)
);
