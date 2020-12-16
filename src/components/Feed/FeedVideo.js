import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Tile } from 'react-native-elements';
// import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
// import './style.js';

class FeedVideo extends React.PureComponent {
  state = {
    showVideo: false,
    paused: false
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
    this.setState({ paused: props.media.paused ? true : false });
    if (this.player) this.player.paused = props.media.paused ? true : false;

    // if (props.currentIndex !== props.currentVisibleIndex) {
    //   this.setState({ showVideo: false });
    // } else this.setState({ showVideo: true });
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
          // (styles.container,
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: videoHeight,
            width
          }
        }>
        {/* <View style={{ width: '100%' }} ref={componentRef}> */}
        {this.state.showVideo && (
          <View>
            <VideoPlayer
              ref={(ref) => {
                this.player = ref;
              }}
              // id="my-video"
              // className="video-js"
              // controls
              // fullscreen={true}
              onPause={() => this.props.actions.doPauseVideo(this.props.idqsos)}
              navigator={this.props.navigator}
              resizeMode="cover"
              playInBackground={false}
              playWhenInactive={false}
              posterResizeMode="cover"
              poster={this.props.media.videoPreview}
              // paused={props.paused}
              paused={this.props.media.paused ? true : false}
              onLoad={() => {
                // this.setState({
                //   paused: true
                // });
              }}
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
          </View>
        )}
        {!this.state.showVideo && (
          <View
            style={{
              // flex: 1,
              // justifyContent: 'center',
              // alignItems: 'center',
              width,
              height: videoHeight
            }}>
            <Tile
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              width={width}
              height={videoHeight}
              imageSrc={{
                uri: this.props.media.videoPreview
              }}
              // imageProps={
              //   PlaceholderContent={<ActivityIndicator />}
              // }
              icon={{ size: 70, name: 'play-circle', type: 'font-awesome' }}
              onPress={() => this.setState({ showVideo: true, paused: false })}
              featured
            />
          </View>
        )}
        {/* <source src={props.media.url} type="video/mp4" /> */}
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: { flex: 1, justifyContent: 'center' },
  backgroundVideo: {
    // position: 'absolute'
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0
  }
});
const selectorFeedType = (state, ownProps) => {
  let qso;
  if (ownProps.feedType === 'MAIN')
    qso = state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'PROFILE')
    qso = state.sqso.feed.qra.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'FIELDDAYS')
    qso = state.sqso.feed.fieldDays.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'DETAIL') qso = state.sqso.feed.qso;
  else return null;
  if (qso)
    return qso.media.find((m) => (m.idqsos_media = ownProps.idqsos_media));
};
const mapStateToProps = (state, ownProps) => ({
  token: state.sqso.jwtToken,
  media: selectorFeedType(state, ownProps),
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(FeedVideo);
