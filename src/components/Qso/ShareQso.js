import React, { Component } from 'react';
import {
  View,
  Platform,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Share from 'react-native-share';
import analytics from '@react-native-firebase/analytics';
import I18n from '../../utils/i18n';
import global_config from '../../global_config.json';

class ShareQso extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fadeValue: new Animated.Value(0),
      xValue: new Animated.Value(0),
      springValue: new Animated.Value(0.3),
      rotateValue: new Animated.Value(0)
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.rotateAnimation();
    }, 1500);
  }

  rotateAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.fadeValue, {
        toValue: 1,
        duration: 600
      }),
      Animated.spring(this.state.springValue, {
        toValue: 1,
        friction: 1.3
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 100,
        duration: 600,
        asing: Easing.linear
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 0,
        duration: 0
      })
    ]).start(() => {});
  };

  share = () => {
    // const url = 'https://www.superqso.com/qso/e2166569-599b-11ea-9581-0a96c372e817';
    // const url = 'http://superqso-dev.us-east-1.elasticbeanstalk.com/qso/'+this.props.sharerluid;
    const url =
      global_config.dynamic_link +
      'QSO=' +
      this.props.sharerluid +
      global_config.dynamic_apn +
      global_config.dynamic_ibi +
      global_config.dynamic_afl +
      '/qso/' +
      this.props.sharerluid +
      global_config.dynamic_isi +
      global_config.dynamic_ifl +
      +'/qso/' +
      this.props.sharerluid +
      global_config.dynamic_ofl +
      +'/qso/' +
      this.props.sharerluid;
    const title = I18n.t('ShareTitle');
    const message = I18n.t('ShareMessage');
    const options = {
      title,
      subject: title,
      message: `${message} ${url}`
    };
    // const options = Platform.select({
    //   ios: {
    //     activityItemSources: [
    //       {
    //         placeholderItem: { type: 'url', content: url },
    //         item: {
    //           default: { type: 'url', content: url },
    //         },
    //         subject: {
    //           default: title,
    //         },
    //         linkMetadata: { originalUrl: url, url, title },
    //       },
    //       {
    //         placeholderItem: { type: 'text', content: message },
    //         item: {
    //           default: { type: 'text', content: message },
    //           message: null, // Specify no text to share via Messages app.
    //         },
    //       },
    //     ],
    //   },
    //   default: {
    //     title,
    //     subject: title,
    //     message: `${message} ${url}`,
    //   },
    // });

    Share.open(options);

    //     if(__DEV__)
    //     analytics().logEvent("SHARE_DEV", {"QRA" : this.props.qra, "SQLRDSID" : this.props.sqlrdsid, "BAND" : this.props.band, "MODE" : this.props.mode, "URLSHARE": this.props.sharerluid});
    // else
    if (!__DEV__)
      analytics().logEvent('SHARE_PRD', {
        QRA: this.props.qra,
        SQLRDSID: this.props.sqlrdsid,
        BAND: this.props.band,
        MODE: this.props.mode,
        URLSHARE: this.props.sharerluid
      });
  };

  render() {
    console.log('RENDER share SCREEN!');
    const interpolatedRotateAnimation = this.state.rotateValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '720deg']
    });

    return (
      <View>
        {/* style={{ width: 65 }} */}
        <Animated.View
          style={[
            styles.animationView,
            { opacity: this.state.fadeValue }
            // {transform: [{scale: this.state.springValue}], alignSelf: 'center'}
            // {left: this.state.xValue}
          ]}>
          <TouchableOpacity onPress={() => this.share()}>
            <Animated.View style={[styles.button, { alignSelf: 'center' }]}>
              <Animated.Image
                source={require('../../images/share3.png')}
                style={[
                  styles.imageView,
                  //  {opacity: this.state.fadeValue},
                  { left: this.state.xValue },
                  // {transform: [{scale: this.state.springValue}], alignSelf: 'center'}
                  {
                    transform: [{ rotate: interpolatedRotateAnimation }],
                    alignSelf: 'center'
                  }
                ]}
              />
              {/* <Image
                  source={require("../../images/share3.png")}
                  style={{ width: 33, height: 33, marginLeft: 15, marginTop: 2 }}
                  resizeMode="contain"
                /> */}
              {/* <Text style={{ fontSize: 13, color: "black", marginLeft: 8 }}>
                    Share
                  </Text> */}
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.share()}>
            <Animated.View
              style={[
                {
                  transform: [{ scale: this.state.springValue }],
                  alignSelf: 'center'
                }
              ]}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  marginLeft: 6,
                  marginTop: 0
                }}>
                {I18n.t('ShareShare')}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationView: {
    // position: "absolute",
    //  marginTop: 85,
    // right: 180
    // width: 100,
    // height: 100,
    //  backgroundColor: 'skyblue',
  },
  imageView: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  button: {
    // width: 70,
    // height: 70,
    // alignItems: "center",
    // justifyContent: "center",
    // shadowColor: "#333",
    // shadowOpacity: .1,
    // shadowOffset: {x:2, y:0},
    // shadowRadius: 2,
    // borderRadius: 35,
    // backgroundColor: '#243665'
  }
});

const mapStateToProps = (state) => {
  return {
    sharerluid: state.sqso.currentQso.shareUrlGuid
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShareQso);
