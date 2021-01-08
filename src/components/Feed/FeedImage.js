import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Image } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';

const slideWidth = Dimensions.get('window').width;

const sliderWidth = Dimensions.get('window').width;
let itemWidth = Dimensions.get('window').width;
const itemHeight = 380;
export const FeedImage = (props) => {
  itemWidth = props.type === 'SHARE' ? slideWidth - 50 : slideWidth;
  const _renderItem = ({ item, index }) => {
    if (item.type === 'image')
      return (
        <View
          style={{
            height: itemHeight,
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
                height: itemWidth > 270 ? Dimensions.get('window').height : 280,
                maxHeight: 370,
                // alignSelf: 'center',
                padding: 0,
                margin: 0,
                width: itemWidth
              }}
              source={{ uri: item.url }}
              resizeMethod="scale"
              resizeMode="contain"
              transition
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text>{item.description}</Text>
          </View>
        </View>
        // </View>
      );
  };

  return (
    <Carousel
      ref={(c) => {
        this._carousel = c;
      }}
      data={props.img}
      renderItem={_renderItem}
      sliderWidth={sliderWidth}
      itemWidth={sliderWidth}
      removeClippedSubviews={false}
      // initialNumToRender={0}
    />
  );
};
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
