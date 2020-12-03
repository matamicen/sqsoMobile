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


// const styles = {
//   margin: '0px',
//   paddingTop: '0px',
//   paddingBottom: '0px'
// };
// declare component
// const Right = (props) => (
//   <View
//     className="slick-next"
//     style={{
//       ...props.style,
//       display: 'block',
//       right: '-10px'
//     }}
//     onClick={props.onClick}>
//     <Button circular icon="arrow circle right" />
//   </View>
// );

// const Left = (props) => (
//   <View
//     className="slick-prev"
//     style={{ ...props.style, display: 'block', left: '-25px' }}
//     onClick={props.onClick}>
//     <Button circular icon="arrow circle left" />
//   </View>
// );
// const useResize = (myRef, measure) => {
//   const [imageWidth, setWidth] = useState(0);

//   const measureAgain = useCallback(measure, []);
//   useEffect(() => {
//     setWidth(myRef.current.offsetWidth);

//     const handleResize = () => {
//       measureAgain();
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [myRef, measureAgain]);

//   return { imageWidth };
// };
//  class FeedImage extends React.PureComponent {
const horizontalMargin = 5;

const slideWidth = Dimensions.get('window').width - 30;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 230;
export const FeedImage = (props) => {
  const _renderItem = ({ item, index }) => {
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
                transition
                PlaceholderContent={<ActivityIndicator />}
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
  };

  return (
    <View>
      <Carousel
        ref={(c) => {
          this._carousel = c;
        }}
        data={props.img}
        renderItem={_renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        removeClippedSubviews={false}
        // initialNumToRender={0}
      />
    </View>
  );
};
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
const mapStateToProps = (state) => ({
  token: state.sqso.jwtToken,

  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(FeedImage);
