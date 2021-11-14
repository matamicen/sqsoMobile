import { BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import React from 'react';
import { Platform, View, Linking } from 'react-native';
import global_config from '../../global_config.json';
import { Image } from 'react-native-elements';
import analytics from '@react-native-firebase/analytics';
var adUnitId;

export default function FeedItemAdd(props) {
  if (Platform.OS === 'ios') {
    adUnitId = 'ca-app-pub-1064314468310203/4085699021';
  } else {
    adUnitId = 'ca-app-pub-1064314468310203/8095250311';
  }

  const adNumber = (String(Date.now()).substr(12, 1) % 2);
  // console.log('INTERNET CHECK NOW: ' + fechaEnMiliseg);
  console.log('substring:' + adNumber);
  console.log('feedtype:' + props.feedType);
  // console.log('substring div:' + myNewStr % 2);

  // const adToshow = props.userinfo.ads.feedRegional[props.currentIndex].adimageurl
   let adToshow = ''
   let urllink = ''

  if (props.feed === 'GLOBAL'){
       adToshow = props.userinfo.ads.feedGlobal[props.currentIndex].adimageurl
       urllink = props.userinfo.ads.feedGlobal[props.currentIndex].urllink 
  }
  if (props.feed === 'REGIONAL'){
       adToshow = props.userinfo.ads.feedRegional[props.currentIndex].adimageurl
       urllink = props.userinfo.ads.feedRegional[props.currentIndex].urllink 
      }
  if (props.feed === 'FOLLOWING'){
       adToshow = props.userinfo.ads.feedFollowing[props.currentIndex].adimageurl
       urllink = props.userinfo.ads.feedFollowing[props.currentIndex].urllink 
      }
  if (props.feed === 'QAP'){
      adToshow = props.userinfo.ads.feedCQ[props.currentIndex].adimageurl
      urllink = props.userinfo.ads.feedCQ[props.currentIndex].urllink 
  }
  
      if (props.feedType === 'PROFILE'){
        adToshow = props.userinfo.ads.feedProfile[props.currentIndex].adimageurl
        urllink = props.userinfo.ads.feedProfile[props.currentIndex].urllink
      }


  if (props.feedType === 'DETAIL' && props.country === 'AR') {
    console.log('entro ahora ad AR')
   
    return (
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center'
        }}>
        <Image
          style={{
            flex: 1,
            height: 250,
            //   this.itemWidth > 270 ? Dimensions.get('window').height : 280,
            // maxHeight: 370,
            // alignSelf: 'center',

            padding: 0,
            margin: 0,
            width: 250
          }}
          onPress={() => {
            if (!__DEV__) analytics().logEvent('LDA_APPPRD');
            Linking.canOpenURL('https://www.clarin.com')
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
  } else if (props.feedType === 'DETAIL' && props.country === 'JP')
    return (
      <View
        style={{
          zIndex: 0,
          justifyContent: 'center',
          alignSelf: 'center'
        }}>
      
        <Image
          style={{
            flex: 1,
            height: 280,
            padding: 0,
            margin: 0,
            width: 280
          }}
          onPress={() => {
            if (!__DEV__) analytics().logEvent('JH9KIO_JP_APPPRD');

            Linking.canOpenURL('https://www.clarin.com')
              .then((supported) => {
                if (!supported) {
                  console.log(
                    "Can't handle url: " + 'https://www.youtube.com/channel/UCE-xEJhqJu0kvy4KnfZcu0g'
                  );
                } else {
                  return Linking.openURL('https://www.youtube.com/channel/UCE-xEJhqJu0kvy4KnfZcu0g');
                }
              })
              .catch((err) => console.error('An error occurred', err));
          }}
          // source={{ uri: global_config.s3Cloudfront + 'lda2.png' }}
          source={{ uri: 'https://d1dwfud4bi54v7.cloudfront.net/jh9kio_ad_jp_'+ adNumber + '.jpg' }}

          resizeMethod="scale"
          resizeMode="contain"
        />
      </View>
    );
    else if (props.feedType === 'DETAIL')
    return (
      <View
        style={{
          zIndex: 0,
          justifyContent: 'center',
          alignSelf: 'center'
        }}>
      
        <Image
          style={{
            flex: 1,
            height: 280,
            padding: 0,
            margin: 0,
            width: 280
          }}
          onPress={() => {

            if (!__DEV__) analytics().logEvent('JH9KIO_US_APPPRD');
            Linking.canOpenURL('https://www.clarin.com')
          
              .then((supported) => {
                if (!supported) {
                  console.log(
                    "Can't handle url: " + 'https://www.youtube.com/channel/UCE-xEJhqJu0kvy4KnfZcu0g f2'
                  );
                } else {
                  return Linking.openURL('https://www.youtube.com/channel/UCE-xEJhqJu0kvy4KnfZcu0g');
                }
              })
              .catch((err) => console.error('An error occurred', err));
          }}
          // source={{ uri: global_config.s3Cloudfront + 'lda2.png' }}
          source={{ uri: 'https://d1dwfud4bi54v7.cloudfront.net/jh9kio_ad_en_' + adNumber + '.jpg' }}

          resizeMethod="scale"
          resizeMode="contain"
        />
      </View>
    );
    else
    {
      console.log('CurrentIndex:'+props.currentIndex)
      console.log('AD REGIONAL id AD:'+props.userinfo.ads.feedRegional[props.currentIndex].idad)
      console.log('AD REGIONAL 4:'+props.userinfo.ads.feedRegional[props.currentIndex].vendorname)
      // .qra.ads.feedRegional[4]
    return (
      <View
        style={{
          zIndex: 0,
          justifyContent: 'center',
          alignSelf: 'center'
        }}>
               <Image
          style={{
          
            height: Platform.OS === 'ios' ? 390: 395,
            padding: 0,
            margin: 0,
            width: Platform.OS === 'ios' ? 390: 395,
            // width: 415
          }}
          onPress={() => {
            if (!__DEV__) analytics().logEvent('feed_IDad_'+props.userinfo.ads.feedRegional[props.currentIndex].idad);

            Linking.canOpenURL('https://www.clarin.com')
              .then((supported) => {
                if (!supported) {
                  console.log(
                    "Can't handle url: " + 'https://www.youtube.com/channel/UCE-xEJhqJu0kvy4KnfZcu0g'
                  );
                } else {
                  // return Linking.openURL('https://www.youtube.com/channel/UCE-xEJhqJu0kvy4KnfZcu0g');
                  // return Linking.openURL(props.userinfo.ads.feedRegional[props.currentIndex].urllink);
                  return Linking.openURL(urllink);
                }
              })
              .catch((err) => console.error('An error occurred', err));
          }}
          // source={{ uri: global_config.s3Cloudfront + 'lda2.png' }}
          // source={{ uri: 'https://d1dwfud4bi54v7.cloudfront.net/jh9kio_ad_jp_0.jpg' }}
          source={{ uri: adToshow }}

          resizeMethod="scale"
          resizeMode="contain"
        />
        {/* <BannerAd
          style={{ zIndex: 0 }}
          unitId={adUnitId}
          size={BannerAdSize.MEDIUM_RECTANGLE}
          requestOptions={
            {
              // requestNonPersonalizedAdsOnly: true
            }
          }
        /> */}
      </View>
    );
        }

}
