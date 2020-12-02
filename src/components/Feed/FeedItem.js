import React from 'react';
import FeedItemQSO from './FeedItemQSO';
import FeedItemRepost from './FeedItemRepost';
class FeedItem extends React.Component {
  shouldComponentUpdate() {
    return this.props.type ? true : false;
  }
  render() {
    if (this.props.type)
      switch (this.props.type) {
        case 'AD':
          return null;
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
              index={this.props.index}
            />
          );

        //   if (props.index === 0) {
        //     return (
        //       <Fragment>
        //         <View style={{ textAlign: '-webkit-center' }}>
        //           <Button
        //             style={{ width: '90%' }}
        //             positive
        //             fluid
        //             size="medium"
        //             onClick={() => {
        //               if (!__DEV__)
        //                 window.gtag('event', 'exploreUsersButton_WEBPRD', {});
        //               props.history.push('/explore');
        //             }}>
        //             {this.props.t('exploreUsers.lookWhoInQSO')}
        //           </Button>
        //         </View>
        //       </Fragment>
        //     );
        //   } else if (props.index === 4 || props.index % 16 === 0)
        //     return (
        //       <FeedItemFollow
        //         source={this.props.source}
        //         ad={this.props.ad}
        //         measure={this.props.measure}
        //         recalculateRowHeight={this.props.recalculateRowHeight}
        //         index={this.props.index}
        //       />
        //     );
        //   else {
        //     return (
        //       <FeedItemAd
        //         source={this.props.source}
        //         ad={this.props.ad}
        //         measure={this.props.measure}
        //         recalculateRowHeight={this.props.recalculateRowHeight}
        //         index={this.props.index}
        //       />
        //     );
        //   }
        default:
          return null;
      }
  }
}

export default FeedItem;
