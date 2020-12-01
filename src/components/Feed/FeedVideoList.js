import React from 'react';
import { View } from 'react-native';
import FeedVideo from './FeedVideo';

class FeedVideoList extends React.PureComponent {
  render() {
    if (this.props.mediaList.length > 0) {
      return (
        <View>
          <FeedVideo
            idqsos={this.props.mediaList[0].idqso}
            idqsos_media={this.props.mediaList[0].idqsos_media}
            feedType={this.props.feedType}
            qso_owner={this.props.qso_owner}
          />
        </View>
      );
    } else {
      return null;
    }
  }
}

export default FeedVideoList;
