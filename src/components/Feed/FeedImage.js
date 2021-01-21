import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Modal,
  Platform
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Image, Icon } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';

const slideWidth = Dimensions.get('window').width;

const sliderWidth = Dimensions.get('window').width;

const itemHeight = 380;
class FeedImage extends React.PureComponent {
  itemWidth = Dimensions.get('window').width;
  state = { showModal: false, activeSlide: 0 };
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
                fontSize: 17,
                paddingHorizontal: 5,
                textAlign: 'center'
              }}>
              {item.description}
            </Text>
          </View>
        </View>
        // </View>
      );
  };
  showFooter(currentIndex) {
    return (
      <View style={{ height: 100, backgroundColor: 'black' }}>
        <Text style={{ fontSize: 17, color: 'white', textAlign: 'center' }}>
          {this.props.img[currentIndex].description}
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
