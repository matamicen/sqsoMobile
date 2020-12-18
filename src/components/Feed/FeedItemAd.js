import { BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import React from 'react';
import { Platform, View } from 'react-native';
var adUnitId;

export default function FeedItemAdd() {
  if (Platform.OS === 'ios') {
    adUnitId = 'ca-app-pub-7016811987787025/5885684679';
  } else {
    adUnitId = 'ca-app-pub-7016811987787025/6306332985';
  }
  return (
    <View style={{ zIndex: 0, justifyContent: 'center', alignSelf: 'center' }}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.MEDIUM_RECTANGLE}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
      />
    </View>
  );
}
