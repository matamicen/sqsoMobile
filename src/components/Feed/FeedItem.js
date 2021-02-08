import React from 'react';
import FeedItemAd from './FeedItemAd';
import FeedItemFollow from './FeedItemFollow';
import FeedItemQSO from './FeedItemQSO';
import FeedItemRepost from './FeedItemRepost';
import { withNavigation } from 'react-navigation';
import { Button } from 'react-native-elements';
import { View } from 'react-native';
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
            />
          );
        case 'AD':
          if (this.props.currentIndex === 0) {
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
          } else if (
            this.props.currentIndex === 4 ||
            this.props.currentIndex % 16 === 0
          )
            return (
              <FeedItemFollow
                source={this.props.source}
                ad={this.props.ad}
                index={this.props.currentIndex}
              />
            );
          else {
            return (
              <FeedItemAd
                feedType={this.props.feedType}
                country={this.props.country}
              />
            );
          }
        default:
          return null;
      }
  }
}

const mapStateToProps = (state) => ({ country: state.sqso.userInfo.country });
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(FeedItem)
);
