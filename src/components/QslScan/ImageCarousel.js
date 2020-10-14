import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
//import { Text, Image, View, Button, ActivityIndicator, StyleSheet, FlatList  } from 'react-native';
import { connect } from 'react-redux';
import { devuelveSoloUnType } from '../../helper';
import I18n from '../../utils/i18n';

const horizontalMargin = 5;
//const slideWidth = 280;
// const slideWidth = 320;
const slideWidth = Dimensions.get('window').width - 30;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 230;
// const itemHeight = 220;

class ImageCarousel extends Component {
  constructor(props) {
    super(props);

    this.soloIm = devuelveSoloUnType(this.props.media, 'image');
  }

  componentDidMount() {
    //  this.props.fetchPeople();
    //console.log('sliderWidth: ' + sliderWidth);
  }

  _renderItem({ item, index }) {
    // console.log('varios: '+ item.type + ' '+ item.url)
    if (item.type === 'image')
      return (
        <View style={styles.slide}>
          {/* <View style={styles.slide}> */}
          <View style={styles.slideInnerContainer}>
            <View styles={{ flex: 0.95 }}>
              <Image
                style={styles.faceImageStyle}
                source={{ uri: item.url }}
                resizeMethod="resize"
                resizeMode="contain"
              />
            </View>
            <View
              styles={{
                flex: 0.05,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text styles={{ justifyContent: 'center', alignItems: 'center' }}>
                {item.description}
              </Text>
            </View>
          </View>
        </View>
      );
  }

  render() {
    return (
      <View>
        <Text style={{ color: 'grey' }}>
          {' '}
          {I18n.t('QSLSCANQR_PHOTOSTAKEN')}{' '}
          <Text style={{ color: 'blue' }}>{this.props.qra} </Text>
        </Text>

        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.soloIm}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          removeClippedSubviews={false}
          // initialNumToRender={0}
        />
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
  },
  faceImageStyle: {
    //    height: 350,
    //    width: 750
    // height: 216,
    // width: 384,
    //   height: 259.2,
    height: 200,
    // width: 460.8,
    width: itemWidth,
    borderRadius: 15

    //   borderRadius: 30
  },
  slide: {
    width: itemWidth,
    height: itemHeight,
    paddingHorizontal: horizontalMargin
    // other styles for the item container
  },
  slideInnerContainer: {
    width: slideWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // other styles for the inner container
  }
});

const mapStateToProps = (state) => {
  return {
    //   userqra: state.sqso.qra
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ImageCarousel);
