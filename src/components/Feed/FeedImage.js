import React, { useRef } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
// import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import * as Actions from '../../actions';
import './style.js';

const styles = {
  margin: '0px',
  paddingTop: '0px',
  paddingBottom: '0px'
};
// declare component
// const Right = (props) => (
//   <div
//     className="slick-next"
//     style={{
//       ...props.style,
//       display: 'block',
//       right: '-10px'
//     }}
//     onClick={props.onClick}>
//     <Button circular icon="arrow circle right" />
//   </div>
// );

// const Left = (props) => (
//   <div
//     className="slick-prev"
//     style={{ ...props.style, display: 'block', left: '-25px' }}
//     onClick={props.onClick}>
//     <Button circular icon="arrow circle left" />
//   </div>
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
// class FeedImage extends React.Component {
export const FeedImage = (props) => {
  // const [showModal, setModal] = useState(false);
  const horizontalMargin = 5;
  //const slideWidth = 280;
  // const slideWidth = 320;
  const slideWidth = Dimensions.get('window').width - 30;

  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = slideWidth + horizontalMargin * 2;
  const itemHeight = 230;
  // const itemHeight = 220;
  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     showModal: false,
  //     error: null
  //   };
  // }
  const componentRef = useRef();
  // const { imageWidth } = useResize(componentRef, props.measure);
  // useEffect(() => {
  //   props.measure();
  // });
  // var settings = {
  //   infinite: true,
  //   dots: false,
  //   // arrows: true,
  //   // adaptiveHeight: true,
  //   speed: 150,
  //   centerPadding: '0px',
  //   centerMode: true,
  //   nextArrow: <Right />,
  //   prevArrow: <Left />
  // };
  const _renderItem = ({ item, index }) => {
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
    // <div style={{ width: '100%' }} ref={componentRef}>
    //   <Segment basic style={styles}>
    //     <Slider {...settings}>
    //       {props.img.map((m) => (
    //         <div key={m.idqsos_media}>
    //           <h3>
    //             <img
    //               // className="image"
    //               src={m.url}
    //               key={m.idqsos_media}
    //               alt={m.description ? m.description : 'no description'}
    //               onClick={() => {
    //                 if (!__DEV__)
    //                   window.gtag('event', 'qsoImageModalOpen_WEBPRD', {
    //                     event_category: 'qso',
    //                     event_label: 'imageModalOpen'
    //                   });
    //                 setModal(true);
    //               }}
    //               onLoad={() => props.measure()}
    //               style={{
    //                 // objectFit: 'contain',
    //                 // width: '100%',
    //                 width: { imageWidth },
    //                 height: (m.height * imageWidth) / m.width,
    //                 margin: '0 auto'
    //               }}
    //             />

    //             <p style={{ textAlign: 'center' }}>{m.description}</p>
    //           </h3>
    //         </div>
    //       ))}
    //     </Slider>

    //     <Modal
    //       centered={false}
    //       closeIcon={{
    //         style: { top: '0.0535rem', right: '0rem' },
    //         color: 'black',
    //         name: 'close'
    //       }}
    //       open={showModal}
    //       onClose={() => setModal(false)}
    //       style={{ height: '90%', overflowY: 'auto' }}>
    //       <Modal.Content image>
    //         <Modal.Description>
    //           {props.img.map((m) => (
    //             <div key={m.idqsos_media} style={{ padding: '1vh' }}>
    //               {props.isAuthenticated && (
    //                 <div
    //                   style={{
    //                     float: 'right'
    //                   }}>
    //                   <FeedOptionsMenu
    //                     idqsos_media={m.idqsos_media}
    //                     qso_owner={props.qso_owner}
    //                     idqso={props.idqso}
    //                     optionsCaller="FeedImage"
    //                   />
    //                 </div>
    //               )}
    //               <Image
    //                 key={m.idqsos_media}
    //                 centered
    //                 rounded
    //                 alt={m.description ? m.description : 'no description'}
    //                 size="large"
    //                 src={m.url}
    //                 style={{
    //                   objectFit: 'contain',
    //                   width: '100%',
    //                   margin: '0 auto'
    //                 }}
    //               />

    //               <p style={{ fontSize: '1rem', textAlign: 'center' }}>
    //                 {m.description}
    //               </p>
    //             </div>
    //           ))}
    //         </Modal.Description>
    //       </Modal.Content>
    //     </Modal>
    //   </Segment>
    // </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.sqso.jwtToken,
  // isAuthenticated: state.userData.isAuthenticated,
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(FeedImage);
