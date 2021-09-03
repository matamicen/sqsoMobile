import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Modal,
  Linking,
  Alert,
  Platform,
  TouchableOpacity
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Image, Icon } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';

// import { Auth } from '@aws-amplify/auth';
// import Amplify from "@aws-amplify/core"
// import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
// import awsconfig from '../../aws-exports';
import TranslatedDescription from './TranslatedDescription';

// Auth.configure(awsconfig);
// Amplify.configure(awsconfig);

// estos dos de abajo ambien andan si comento el Amplify.addPluggable(....)
// Amplify.register(Predictions);
// Predictions.addPluggable(new AmazonAIPredictionsProvider());

// Amplify.addPluggable(new AmazonAIPredictionsProvider());


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
const slideWidth = Dimensions.get('window').width;

const sliderWidth = Dimensions.get('window').width;

const itemHeight = 380;
class FeedImage extends React.PureComponent {
  itemWidth = Dimensions.get('window').width;
  state = { showModal: false, activeSlide: 0, showTranslation: false, descriptionTranslated: '' };
  componentDidMount() {
    this.itemWidth = this.props.type === 'SHARE' ? slideWidth - 50 : slideWidth;
  }
  componentDidUpdate() {
    this.itemWidth = this.props.type === 'SHARE' ? slideWidth - 50 : slideWidth;
  }
  _renderItem = ({ item, index }) => {
    if (item.type === 'image')
      return (
        <View
          style={{
            // height: itemHeight,
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            padding: 0,
            margin: 0
          }}>
          <View
            style={{
              flex: 0.9,
              alignSelf: 'flex-start',
              padding: 0,
              margin: 0
            }}>
            <Image
              style={{
                flex: 1,
                height:
                  this.itemWidth > 270 ? Dimensions.get('window').height : 280,
                maxHeight: 370,
                // alignSelf: 'center',
                padding: 0,
                margin: 0,
                width: this.itemWidth
              }}
              source={{ uri: item.url }}
              resizeMethod="scale"
              resizeMode="contain"
              transition
              PlaceholderContent={<ActivityIndicator />}
              onPress={() => this.setState({ showModal: true })}
            />
          </View>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'center',
              width:
                this.props.type === 'SHARE'
                  ? this.itemWidth - 15
                  : this.itemWidth - 15
            }}>
            <Text
              style={{
                fontSize: 18.5,
                paddingHorizontal: 5,
                textAlign: 'center'
              }}>
              <Description description={item.description} />
            </Text>
            <TranslatedDescription description={item.description} />
     
            
          </View>
        </View>
        // </View>
      );
  };

  

  showFooter(currentIndex) {
    return (
      <View style={{ height: 100, backgroundColor: 'black' }}>
        <Text style={{ fontSize: 18.5, color: 'white', textAlign: 'center' }}>
          <Description description={this.props.img[currentIndex].description} />
        </Text>
      </View>
    );
  }
  showHeader() {
    return (
      <View
        style={{
          alignSelf: 'flex-end'
        }}>
        <Icon
          name="close"
          type="font-awesome"
          size={40}
          color={'white'}
          onPress={() => this.setState({ showModal: false })}
        />
      </View>
    );
  }
  pagination() {
    const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={this.props.img.length}
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
    return (
      <View>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.props.img}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={sliderWidth}
          removeClippedSubviews={false}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
        />
        <Pagination
          dotsLength={this.props.img.length}
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
        <Modal
          visible={this.state.showModal}
          // transparent={true}
          onRequestClose={() => this.setState({ showModal: false })}>
          <View
            style={{
              flex: 1,
              width: '100%',
              marginTop: Platform.OS === 'ios' ? 32 : 0
            }}>
            <ImageViewer
              imageUrls={this.props.img}
              renderHeader={this.showHeader.bind(this)}
              footerContainerStyle={{ width: '100%' }}
              renderFooter={(currentIndex) => this.showFooter(currentIndex)}
              // visible={this.props.showModal}
              // transparent={true}
              //   onRequestClose={() => this.setState({ showModal: false })
              // }
            />
          </View>
          {/* </View> */}
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state, ownProps) => ({
  token: state.sqso.jwtToken,

  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(FeedImage);
