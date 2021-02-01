import { BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import React from 'react';
import { Platform, View, Linking } from 'react-native';
import global_config from '../../global_config.json';
import { Image } from 'react-native-elements';
var adUnitId;

export default function FeedItemAdd(props) {
  if (Platform.OS === 'ios') {
    adUnitId = 'ca-app-pub-1064314468310203/4085699021';
  } else {
    adUnitId = 'ca-app-pub-1064314468310203/8095250311';
  }

  if (props.feedType === 'DETAIL' && props.country === 'AR') {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center'
        }}>
        <Image
          style={{
            flex: 1,
            height: 230,
            //   this.itemWidth > 270 ? Dimensions.get('window').height : 280,
            // maxHeight: 370,
            // alignSelf: 'center',

            padding: 0,
            margin: 0,
            width: 280
          }}
          onPress={() => {
            Linking.canOpenURL('https://logdeargentina.com.ar/')
              .then((supported) => {
                if (!supported) {
                  console.log(
                    "Can't handle url: " + 'https://logdeargentina.com.ar/'
                  );
                } else {
                  return Linking.openURL('https://logdeargentina.com.ar/');
                }
              })
              .catch((err) => console.error('An error occurred', err));
          }}
          source={{ uri: global_config.s3Cloudfront + 'lda2.png' }}
          resizeMethod="scale"
          resizeMode="contain"
        />
      </View>
    );
  } else
    return (
      <View
        style={{
          zIndex: 0,
          justifyContent: 'center',
          alignSelf: 'center'
        }}>
        <BannerAd
          style={{ zIndex: 0 }}
          unitId={adUnitId}
          size={BannerAdSize.MEDIUM_RECTANGLE}
          requestOptions={
            {
              // requestNonPersonalizedAdsOnly: true
            }
          }
        />
      </View>
    );
}
