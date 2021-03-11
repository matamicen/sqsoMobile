import React from 'react';
import I18n from '../../utils/i18n';
import { connect } from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import VideoPlayer from 'react-native-video-controls';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import moment from 'moment';
import 'moment/locale/es';
import {
  View,
  Linking,
  Alert,
  ActivityIndicator,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

import { withNavigation } from 'react-navigation';
import { Image, Card, Tile } from 'react-native-elements';

import Carousel, { Pagination } from 'react-native-snap-carousel';
if (I18n.locale.substring(0, 2) === 'es') moment.locale('es');
if (I18n.locale.substring(0, 2) === 'en') moment.locale('en');
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
            <Text key={word}>
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
const slideWidth = Dimensions.get('window').width;

class ActivitiesCarousel extends React.PureComponent {
  state = { showModal: false, activeSlide: 0, showVideo: false, paused: false };
  itemWidth = Dimensions.get('window').width;
  componentDidMount() {
    this.itemWidth = this.props.type === 'SHARE' ? slideWidth - 50 : slideWidth;
  }
  componentDidUpdate() {
    this.itemWidth = this.props.type === 'SHARE' ? slideWidth - 50 : slideWidth;
  }
  _renderItem(props) {
    let qso = props.item;
    var width = Dimensions.get('window').width;
    if (qso.type !== 'FLDDAY') return null;

    let mediaList = qso.media.filter(
      (media) => media.type === 'image' || media.type === 'video'
    );

    if (mediaList.length > 0) {
      if (mediaList[0].type === 'image')
        return (
          <View
            key={mediaList[0].idqsos_media}
            style={{
              alignSelf: 'center',
              // flex: 0.9,
              // width: 100,
              height: 300,
              margin: 0
            }}>
            <View
              style={{
                flex: 0.9,
                // justifyContent: 'center',
                alignItems: 'center',
                // width: this.itemWidth
                maxHeight: 250
              }}>
              <Image
                style={{
                  // flex: 1,
                  height:
                    this.itemWidth > 270
                      ? Dimensions.get('window').height
                      : 250,
                  maxHeight: 250,
                  // alignSelf: 'center',
                  padding: 0,
                  // margin: 300,
                  width: mediaList[0].width > width ? width : mediaList[0].width
                }}
                source={{ uri: mediaList[0].url }}
                resizeMethod="scale"
                resizeMode="contain"
                transition
                PlaceholderContent={<ActivityIndicator />}
                onPress={() => {
                  if (!__DEV__)
                    analytics().logEvent('activitiesCarouselPress_APPPRD');
                  this.props.navigation.navigate('QSODetail', {
                    QSO_GUID: qso.GUID_URL
                  });
                }}
              />
            </View>
            <View
              style={{
                flex: 0.1,
                // justifyContent: 'center',
                alignItems: 'center'
                // width: this.itemWidth
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 17,
                  paddingHorizontal: 5
                  // textAlign: 'center'
                }}>
                <Description
                  key={mediaList[0].idqsos_media}
                  description={mediaList[0].description}
                />
              </Text>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                {moment(qso.activityBegin).isSameOrBefore(Date.now()) &&
                  I18n.t('qso.startedAt', {
                    text: moment(qso.activityBegin).fromNow(true)
                  })}

                {moment(qso.activityBegin).isAfter(Date.now()) &&
                  I18n.t('qso.willStart', {
                    text: moment(qso.activityBegin).toNow(true)
                  })}
              </Text>
            </View>
          </View>
        );
      else if (mediaList[0].type === 'video') {
        var videoHeight = (mediaList[0].height * width) / mediaList[0].width;

        if (videoHeight > Dimensions.get('window').height - 177) {
          videoHeight = Dimensions.get('window').height - 177;
          width = (mediaList[0].width * videoHeight) / mediaList[0].height;
        }
        return (
          <View>
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
                  onPause={() =>
                    this.props.actions.doPauseVideo(mediaList[0].idqso)
                  }
                  navigator={this.props.navigator}
                  resizeMode="cover"
                  disableFullscreen
                  playInBackground={false}
                  playWhenInactive={false}
                  posterResizeMode="cover"
                  poster={mediaList[0].videoPreview}
                  // paused={props.paused}
                  paused={mediaList[0].paused ? true : false}
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
                    uri: mediaList[0].url
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
                    uri: mediaList[0].videoPreview
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
                      mediaList[0].idqsos_media,

                      mediaList[0].idqso
                    );
                    this.setState({ showVideo: true, paused: false });
                  }}
                  featured
                />
              </View>
            )}
            <View
              style={{
                flex: 0.1,
                justifyContent: 'center',
                alignItems: 'center'
                // width: this.itemWidth - 15
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 17,
                  paddingHorizontal: 5,
                  textAlign: 'center'
                }}>
                <Description
                  key={mediaList[0].idqsos_media}
                  description={mediaList[0].description}
                />
              </Text>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                {moment(qso.activityBegin).isSameOrBefore(Date.now()) &&
                  I18n.t('qso.startedAt', {
                    text: moment(qso.activityBegin).fromNow(true)
                  })}

                {moment(qso.activityBegin).isAfter(Date.now()) &&
                  I18n.t('qso.willStart', {
                    text: moment(qso.activityBegin).toNow(true)
                  })}
              </Text>
            </View>
          </View>
        );
      }
    } else return null;
  }
  pagination() {
    const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={this.props.fieldDays.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  render() {
    if (this.props.fieldDays.length > 1) {
      let sliderWidth = Dimensions.get('window').width;

      return (
        <Card containerStyle={{ margin: 0, padding: 5 }}>
          <Card.Title
            style={{
              backgroundColor: 'blue',
              color: 'white',
              fontSize: 17,
              paddingVertical: 5
            }}>
            {I18n.t('navBar.actCarouselTitle')}
          </Card.Title>
          {/* <Card.Divider /> */}
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            // layout="default"
            onScroll={() => {
              if (!__DEV__)
                analytics().logEvent('activitiesCarouselScroll_APPPRD');
            }}
            data={this.props.fieldDays}
            renderItem={this._renderItem.bind(this)}
            sliderWidth={sliderWidth}
            itemWidth={sliderWidth}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
            // removeClippedSubviews={false}
            // initialNumToRender={0}.bindd
          />
          <Pagination
            dotsLength={this.props.fieldDays.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{ backgroundColor: 'white' }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'black'
            }}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </Card>
      );
    } else return null;
  }
}
const styles = StyleSheet.create({
  card: {},

  buttons: {
    // flex: 1,
    margin: 0,
    padding: 0
    // flexBasis: 50,
    // flexDirection: 'column',
    // alignItems: 'flex-start'
  },
  kpi: {
    flex: 1,
    margin: 0,
    padding: 0,
    flexBasis: 50,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  avatar: {
    flex: 1,

    flexBasis: 60,
    flexGrow: 0,
    flexShrink: 0
  },
  name: {
    flex: 1,

    flexBasis: 90,
    flexGrow: 0,
    flexShrink: 0
  },
  header: {
    flex: 1,
    flexBasis: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
});

const mapStateToProps = (state) => ({
  FetchingQSOS: state.sqso.feed.FetchingFieldDays,
  qsosFetched: state.sqso.feed.fieldDaysFetched,
  currentQRA: state.sqso.qra,
  token: state.sqso.jwtToken,
  fieldDays: state.sqso.feed.fieldDays
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(ActivitiesCarousel)
);
