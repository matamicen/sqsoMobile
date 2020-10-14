import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';
import Video from 'react-native-video';
import './style.js';

export default class FeedVideo extends React.PureComponent {
  // const width = Dimensions.get('window');

  // const [paused, setPaused] = useState(true);
  // const [startPosition, setStartPosition] = useState(null);
  // const [endPosition, setEndPosition] = useState(null);
  handleVideoLayout = (e) => {
    // const height = Dimensions.get('window');
    // setStartPosition(e.nativeEvent.layout.y - height + THRESHOLD);
    // setEndPosition(
    //   e.nativeEvent.layout.y + e.nativeEvent.layout.height - THRESHOLD
    // );
  };
  render() {
    const width = Dimensions.get('window').width;
    const videoHeight =
      (this.props.media.height * width) / this.props.media.width;
    return (
      <View style={(styles.container, { height: videoHeight })}>
        {/* <div style={{ width: '100%' }} ref={componentRef}> */}
        {this.props.currentIndex === this.props.currentVisibleIndex && (
          <Video
            // ref={(ref) => {
            //   this.player = ref;
            // }}
            // id="my-video"
            // className="video-js"
            controls
            // resizeMode="cover"
            // preload="metadata"
            // responsive="true"
            // width={width}
            // height={(props.media.height * width) / props.media.width}
            posterResizeMode="cover"
            poster={this.props.media.videoPreview}
            // paused={props.paused}
            paused={true}
            style={
              (styles.backgroundVideo, { width: '100%', height: videoHeight })
            }
            source={{
              uri: this.props.media.url
            }}
            // onLayout={this.handleVideoLayout}
            // style={styles.backgroundVideo}
          />
        )}
        {this.props.currentIndex !== this.props.currentVisibleIndex && (
          <Image
            style={{ width: '100%', height: videoHeight }}
            resizeMode="cover"
            source={{
              uri: this.props.media.videoPreview
            }}
            blurRadius={5}
          />
        )}
        {/* <source src={props.media.url} type="video/mp4" /> */}
        {/* </div> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
