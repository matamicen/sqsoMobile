import React from 'react';
import { View } from 'react-native';
import FeedVideo from './FeedVideo';

class FeedVideoList extends React.PureComponent {
  render() {
    if (this.props.mediaList) {
      return (
        <View>
          <FeedVideo
            idqsos={this.props.idqsos}
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
