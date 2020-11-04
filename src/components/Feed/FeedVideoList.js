import React from 'react';
import { View } from 'react-native';
// import Item from 'semantic-ui-react/dist/commonjs/views/Item';
import FeedVideo from './FeedVideo';
// import './style.js';
class FeedVideoList extends React.PureComponent {
  render() {
    if (this.props.mediaList.length > 0) {
      return (
        <View>
          {/* {this.props.currentIndex === this.props.currentVisibleIndex && ( */}
          <FeedVideo
            media={this.props.mediaList[0]}
            // measure={() => {
            //   this.props.measure();
            // }}
            currentIndex={this.props.currentIndex}
            currentVisibleIndex={this.props.currentVisibleIndex}
            qso_owner={this.props.qso_owner}
            // recalculateRowHeight={this.props.recalculateRowHeight}
          />
          {/* )} */}
        </View>
      );
    } else {
      return null;
    }
  }
}

export default FeedVideoList;
