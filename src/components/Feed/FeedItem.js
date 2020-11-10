import React from 'react';
import FeedItemQSO from './FeedItemQSO';
class FeedItem extends React.Component {
  // state = {
  //   qso: {}
  // };
  // componentDidUpdate(prevProps, prevState) {
  // console.log(this.props.qso.likes);
  // console.log(prevProps.qso.likes);
  // if (this.props.qso && this.props.qso !== prevProps.qso) {
  //   this.setState({ qso: this.props.qso });
  // }
  // }
  shouldComponentUpdate() {
    return this.props.type ? true : false;
  }
  render() {
    console.log('render FeedItem');
    switch (this.props.type) {
      case 'POST':
      case 'QAP':
      case 'FLDDAY':
      case 'QSO':
      case 'LISTEN':
        return (
          <FeedItemQSO
            key={this.props.idqsos}
            // qso={this.props.qso}
            idqsos={this.props.idqsos}
            currentIndex={this.props.currentIndex}
            currentVisibleIndex={this.props.currentVisibleIndex}
            // measure={this.props.measure}
            // recalculateRowHeight={this.props.recalculateRowHeight}
            // index={this.props.index}
          />
        );
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
