import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
// import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
// import './style.js';

export default class FeedVideo extends React.PureComponent {
  state = {
    showVideo: false
  };
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
  componentDidUpdate(props) {
    if (props.currentIndex !== props.currentVisibleIndex) {
      this.setState({ showVideo: false });
    } else this.setState({ showVideo: true });
  }
  render() {
    var width = Dimensions.get('window').width;
    var videoHeight =
      (this.props.media.height * width) / this.props.media.width;

    if (videoHeight > Dimensions.get('window').height - 177) {
      videoHeight = Dimensions.get('window').height - 177;
      width = (this.props.media.width * videoHeight) / this.props.media.height;
    }
    return (
      <View
        style={
          (styles.container,
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: videoHeight
          })
        }>
        {/* <View style={{ width: '100%' }} ref={componentRef}> */}
        {this.state.showVideo && (
          // <Video
          <VideoPlayer
            // ref={(ref) => {
            //   this.player = ref;
            // }}
            // id="my-video"
            // className="video-js"
            // controls
            // fullscreen={true}
            navigator={this.props.navigator}
            resizeMode="cover"
            playInBackground={false}
            playWhenInactive={false}
            posterResizeMode="cover"
            poster={this.props.media.videoPreview}
            // paused={props.paused}
            paused={false}
            style={
              (styles.backgroundVideo,
              {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width,
                height: videoHeight
              })
            }
            source={{
              uri: this.props.media.url
            }}
            // onLayout={this.handleVideoLayout}
            // style={styles.backgroundVideo}
          />
        )}
        {!this.state.showVideo && (
          <ImageBackground
            // style={{ width, height: videoHeight - 20 }}
            style={{
              flex: 1,
              width,
              height: videoHeight,
              justifyContent: 'center'
            }}
            source={{
              uri: this.props.media.videoPreview
            }}
            blurRadius={1}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Icon
                raised
                name="play"
                type="font-awesome"
                onPress={() => this.setState({ showVideo: true })}
              />
            </View>
          </ImageBackground>
        )}
        {/* <source src={props.media.url} type="video/mp4" /> */}
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  backgroundVideo: {
    // position: 'absolute'
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0
  }
});