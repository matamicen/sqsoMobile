import { BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import React from 'react';
import { Platform, View } from 'react-native';
var adUnitId;

export default function FeedItemAdd() {
  if (Platform.OS === 'ios') {
    adUnitId = 'ca-app-pub-1064314468310203/4085699021';
  } else {
    adUnitId = 'ca-app-pub-1064314468310203/8095250311';
  }
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
