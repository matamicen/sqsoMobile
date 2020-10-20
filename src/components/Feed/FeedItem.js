import React from 'react';
import FeedItemQSO from './FeedItemQSO';
class FeedItem extends React.PureComponent {
  render() {
    switch (this.props.type) {
      case 'POST':
      case 'QAP':
      case 'FLDDAY':
      //   return (
      //     <FeedItemPost
      //       key={this.props.qso.idqsos}
      //       qso={this.props.qso}
      //       measure={this.props.measure}
      //       recalculateRowHeight={this.props.recalculateRowHeight}
      //       index={this.props.index}
      //     />
      //   );
      case 'QSO':
        return (
          <FeedItemQSO
            key={this.props.qso.idqsos}
            qso={this.props.qso}
            currentIndex={this.props.currentIndex}
            currentVisibleIndex={this.props.currentVisibleIndex}
            // measure={this.props.measure}
            // recalculateRowHeight={this.props.recalculateRowHeight}
            index={this.props.index}
          />
        );
      // case 'LISTEN':
      //   return (
      //     <FeedItemQSO
      //       key={this.props.qso.idqsos}
      //       qso={this.props.qso}
      //       measure={this.props.measure}
      //       recalculateRowHeight={this.props.recalculateRowHeight}
      //       index={this.props.index}
      //     />
      //   );

      // case 'SHARE':
      //   return (
      //     <FeedItemRepost
      //       key={this.props.qso.idqsos}
      //       qso={this.props.qso}
      //       measure={this.props.measure}
      //       recalculateRowHeight={this.props.recalculateRowHeight}
      //       index={this.props.index}
      //     />
      //   );
      // case 'AD':
      //   if (props.index === 0) {
      //     return (
      //       <Fragment>
      //         <div style={{ textAlign: '-webkit-center' }}>
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
      //         </div>
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
