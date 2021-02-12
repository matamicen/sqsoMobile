import React from 'react';
import I18n from '../../utils/i18n';
import { connect } from 'react-redux';
import analytics from '@react-native-firebase/analytics';

import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
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
import { Image, Card } from 'react-native-elements';

import Carousel from 'react-native-snap-carousel';
class Link extends React.PureComponent {
  openUrl(url) {
    url = url.toUpperCase();

    if (!url.startsWith('HTTP://') && !url.startsWith('HTTPS://')) {
      url = 'http://' + url;
    }
    Linking.openURL(url);
    Linking.canOpenURL(url, (supported) => {
      if (!supported) {
        Alert.alert("Can't handle url: " + url);
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
  itemWidth = Dimensions.get('window').width;
  componentDidMount() {
    this.itemWidth = this.props.type === 'SHARE' ? slideWidth - 50 : slideWidth;
  }
  componentDidUpdate() {
    this.itemWidth = this.props.type === 'SHARE' ? slideWidth - 50 : slideWidth;
  }
  _renderItem(props) {
    let qso = props.item;
    if (qso.type !== 'FLDDAY') return null;

    let picList = qso.media.filter((media) => media.type === 'image');

    if (picList.length > 0) {
      return (
        <View
          key={picList[0].idqsos_media}
          style={{
            // flex: 1,
            // width: 100,
            height: 300,
            margin: 0
          }}>
          <View style={styles.card}>
            <Image
              style={{
                // flex: 1,
                height:
                  this.itemWidth > 270 ? Dimensions.get('window').height : 280,
                maxHeight: 300,
                alignSelf: 'center',
                padding: 0,
                // margin: 300,
                width: picList[0].width > 270 ? 270 : picList[0].width
              }}
              source={{ uri: picList[0].url }}
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
            {/* <View
              style={{
                flex: 0.1,
                justifyContent: 'center',
                alignItems: 'center',
                width: this.itemWidth - 15
              }}>
              <Text
                style={{
                  fontSize: 17,
                  paddingHorizontal: 5,
                  textAlign: 'center'
                }}>
                <Description
                  key={picList[0].idqsos_media}
                  description={picList[0].description}
                />
              </Text>
            </View> */}
          </View>
        </View>
      );
    } else return null;
  }

  render() {
    if (this.props.fieldDays.length > 1) {
      let sliderWidth = Dimensions.get('window').width;

      return (
        <Card containerStyle={{ margin: 0, padding: 5 }}>
          <Card.Title>{I18n.t('navBar.actCarouselTitle')}</Card.Title>
          <Card.Divider />
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            layout="default"
            data={this.props.fieldDays}
            renderItem={this._renderItem.bind(this)}
            sliderWidth={sliderWidth}
            itemWidth={270}
            // removeClippedSubviews={false}
            // initialNumToRender={0}.bindd
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