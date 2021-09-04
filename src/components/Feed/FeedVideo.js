import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Linking,
  Alert
} from 'react-native';
import { Tile } from 'react-native-elements';
// import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import I18n from '../../utils/i18n';
import * as Actions from '../../actions';
import TranslatedDescription from './TranslatedDescription'
// import './style.js';
class Link extends React.PureComponent {
  openUrl(url) {
    // url = url.toUpperCase();

    if (
      !url.toUpperCase().startsWith('HTTP://') &&
      !url.toUpperCase().startsWith('HTTPS://')
    ) {
      url = 'http://' + url;
    }

    Linking.openURL(url);
    Linking.canOpenURL(url, (supported) => {
      if (!supported) {
        Alert.alert('Can\'t handle url: ' + url);
      } else {
        Linking.openURL(url);
      }
    });
  }
  render() {
    return (
      <Text
        style={{ color: 'blue' }}
        onPress={() => this.openUrl(this.props.url)}>
        {this.props.children}
      </Text>
    );
  }
}

class Description extends React.PureComponent {
  render() {
    // Check if nested content is a plain string
    if (typeof this.props.description === 'string') {
      // Split the content on space characters
      var words = this.props.description.split(/\s/);

      // Loop through the words
      var contents = words.map(function (word, i) {
        // Space if the word isn't the very last in the set, thus not requiring a space after it
        var separator = i < words.length - 1 ? ' ' : '';

        // The word is a URL, return the URL wrapped in a custom <Link> component
        if (word.match(/(^http[s]?:\/{2})|(^www)|(^\/{1,2})/gim)) {
          return (
            <Link key={i} url={word}>
              {word}
              {separator}
            </Link>
          );
        } else {
          return (
            <Text key={i}>
              {word}
              {separator}
            </Text>
          );
        }
      }, this);
      // The nested content was something else than a plain string
      // Return the original content wrapped in a <Text> component
    } else {
      console.log(
        'Attempted to use <HyperText> with nested components. ' +
          'This component only supports plain text children.'
      );
      return <Text>{this.props.children}</Text>;
    }

    // Return the modified content wrapped in a <Text> component
    return <Text>{contents}</Text>;
  }
}
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
            justifyContent: 'center',
            alignSelf: 'center',
            // height: videoHeight,
            width: Dimensions.get('window').width
          }
        }>
        {/* <View style={{ width: '100%' }} ref={componentRef}> */}
        {this.state.showVideo && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center'
            }}>
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
              disableFullscreen
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
              justifyContent: 'center',
              alignSelf: 'center',
              width,
              height: videoHeight
            }}>
            <Tile
              contentContainerStyle={{
                justifyContent: 'center',
                alignSelf: 'center'
              }}
              width={width}
              height={videoHeight}
              imageSrc={{
                uri: this.props.media.videoPreview
              }}
              // imageProps={
              //   PlaceholderContent={<ActivityIndicator />}
              // }
              icon={{
                size: 70,
                name: 'play-circle',
                type: 'font-awesome',
                color: 'white'
              }}
              onPress={() => {
                this.props.actions.doQsoMediaPlay(
                  this.props.media.idqsos_media,

                  this.props.media.idqso
                );
                this.setState({ showVideo: true, paused: false });
              }}
              featured
            />
          </View>
        )}
        {/* <source src={props.media.url} type="video/mp4" /> */}
        {/* </View> */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          {this.props.media.views_counter > 0 && (
            <Text style={{ fontSize: 17, paddingHorizontal: 5 }}>
              {this.props.media.description && (
             
                <Text style={{ fontSize: 19, paddingHorizontal: 5 }}>
                  <Description description={this.props.media.description} />{' '}
                  {' - '}
                </Text>
                
                
              )}

              {I18n.t('qso.audioPlays', {
                count: this.props.media.views_counter + 1
              })}
              
            </Text>
            
            
          )}

        {this.props.media.views_counter > 0 && 
          <TranslatedDescription description={this.props.media.description} />
        }


          {this.props.media.views_counter === 0 && (
            <View>
            <Text style={{ fontSize: 19, paddingHorizontal: 5 }}>
              <Description description={this.props.media.description} />
            </Text>
              <TranslatedDescription description={this.props.media.description} />
            </View>
          )}
        </View>
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
  else if (ownProps.feedType === 'SEARCH')
    qso = state.sqso.feed.searchedResults.find((q) => q.idqsos === ownProps.idqsos);
  
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
