import { APP_VERSION } from './appVersion';
import awsconfig from './aws-exports';
import Analytics from '@aws-amplify/analytics';
import { AWSKinesisProvider } from 'aws-amplify';
import { Platform, Alert } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import global_config from './global_config.json';
// import firebase from '@react-native-firebase/app';
// import * as config from '@react-native-firebase/remote-config';
import I18n from './utils/i18n';
import RNFetchBlob from 'rn-fetch-blob';

Analytics.addPluggable(new AWSKinesisProvider());

Analytics.configure(awsconfig);

export const hola = (qsoqras) => {
  if (qsoqras.length > 0) {
    return 'ESTA CON COSAS';
  } else return 'ESTA EMPTY';
};

export const chau = () => {
  return 'chau';
};

check_begin_end_date = (
  activitydatebegin,
  activitydateend,
  activityutcbegin,
  activityutcend
) => {
  beginDateAndTime_aux = new Date();
  endDateAndTime_aux = new Date();
  beginDateAndTime_aux = activitydatebegin;
  endDateAndTime_aux = activitydateend;
  beginDateAndTime_aux.setHours(activityutcbegin.getHours());
  beginDateAndTime_aux.setMinutes(activityutcbegin.getMinutes());
  beginDateAndTime_aux.setSeconds(0);
  beginDateAndTime_aux.setMilliseconds(0); // si no se ponen milisegundos no compara bien
  endDateAndTime_aux.setHours(activityutcend.getHours());
  endDateAndTime_aux.setMinutes(activityutcend.getMinutes());
  endDateAndTime_aux.setSeconds(0);
  endDateAndTime_aux.setMilliseconds(0); // si no se ponen milisegundos no compara bien
  console.log('Final Start Date: ' + beginDateAndTime_aux);
  console.log('Final End Date: ' + endDateAndTime_aux);

  if (
    beginDateAndTime_aux.getFullYear() === 1900 ||
    endDateAndTime_aux.getFullYear() === 1900
  )
    return false; // false

  if (endDateAndTime_aux > beginDateAndTime_aux) {
    //  if(dates.compare(endDateAndTime_aux,beginDateAndTime_aux)>1)
    console.log('end es mayor que start OK');
    return true;
  } else {
    console.log('end date es menor que start date FAILED');
    return false; // false
  }
};

export const updateOnProgress = (
  qsotype,
  band,
  mode,
  qsoqras,
  mediafiles,
  activitydatebegin,
  activitydateend,
  activityutcbegin,
  activityutcend
) => {
  // saco el item de profile por si eluser se saco una foto cuando ya habia empezado un POST,
  // esto evita que pueda mandar un POST sin media
  console.log('mediafiles en updateOnPRogress');
  console.log(mediafiles);
  mediafilesSinProfile = [];

  //#PUBLISH para que no cuente como una media algo que es inapropiado sino puede postear un post vacio ya que el inaproipiado no aparece nunca en el feed
  mediafiles.map((item) => {
    if (item.type !== 'profile' && item.status !== 'inappropriate content') {
      mediafilesSinProfile = [...mediafilesSinProfile, item];
    }
  });

  let devuelvo;
  if (
    (qsotype === 'POST' || qsotype === 'QAP' || qsotype === 'FLDDAY') &&
    mediafilesSinProfile.length > 1
  ) {
    if (qsotype === 'FLDDAY') {
      if (
        check_begin_end_date(
          activitydatebegin,
          activitydateend,
          activityutcbegin,
          activityutcend
        )
      )
        return true;
      else return false;
    } else return true;
  } else {
    // se cambio a mediafiles.length > 1 porque se invento un media inicial vacio para que funcione la salida del teclado de iOS si se toca
    // el body de los Media (TouchwithoutFeedback)
    if (
      qsotype !== 'POST' &&
      qsotype !== 'QAP' &&
      qsotype !== 'FLDDAY' &&
      qsoqras.length > 0 &&
      band !== I18n.t('ReducerBand') &&
      mode !== I18n.t('ReducerMode') &&
      mediafilesSinProfile.length > 1
    ) {
      return true;
    } else {
      return false;
    }
  }
};

export const missingFieldsToPublish = (
  qsotype,
  band,
  mode,
  qsoqras,
  mediafiles,
  activitydatebegin,
  activitydateend,
  activityutcbegin,
  activityutcend
) => {
  // saco el item de profile por si eluser se saco una foto cuando ya habia empezado un POST,
  // esto evita que pueda mandar un POST sin media
  console.log('mediafiles en updateOnPRogress');
  console.log(mediafiles);
  mediafilesSinProfile = [];

  mediafiles.map((item) => {
    if (item.type !== 'profile' && item.status !== 'inappropriate content') {
      mediafilesSinProfile = [...mediafilesSinProfile, item];
    }
  });

  let devuelvo;
  if (qsotype === 'POST' || qsotype === 'QAP' || qsotype === 'FLDDAY') {
    if (mediafilesSinProfile.length < 2) {
      devuelvo = { message: I18n.t('MISSPOSTMEDIA') };
      return devuelvo;
    }
    if (
      !check_begin_end_date(
        activitydatebegin,
        activitydateend,
        activityutcbegin,
        activityutcend
      )
    ) {
      devuelvo = { message: I18n.t('MISSDATES') };
      return devuelvo;
    }
  } else {
    // se cambio a mediafiles.length > 1 porque se invento un media inicial vacio para que funcione la salida del teclado de iOS si se toca
    // el body de los Media (TouchwithoutFeedback)

    if (
      (qsotype === 'QSO' || qsotype === 'LISTEN') &&
      mediafilesSinProfile.length < 2
    ) {
      devuelvo = { message: I18n.t('MISSPOSTMEDIA') };
      return devuelvo;
    }
    if (
      (qsotype === 'QSO' || qsotype === 'LISTEN') &&
      band === I18n.t('ReducerBand')
    ) {
      devuelvo = { message: I18n.t('MISSBAND') };
      return devuelvo;
    }
    if (
      (qsotype === 'QSO' || qsotype === 'LISTEN') &&
      mode === I18n.t('ReducerMode')
    ) {
      devuelvo = { message: I18n.t('MISSMODE') };
      return devuelvo;
    }

    if ((qsotype === 'QSO' || qsotype === 'LISTEN') && qsoqras.length === 0) {
      devuelvo = { message: I18n.t('MISSQRAS') };
      return devuelvo;
    }
    //  if ((qsotype!=='POST' && qsotype!=='QAP' && qsotype!=='FLDDAY') && (qsoqras.length > 0) && (band !== I18n.t("ReducerBand")) && (mode !== I18n.t("ReducerMode")) && (mediafilesSinProfile.length > 1) )
    //  {
    //      return true;
    //  }
    //  else {
    //      return false;

    //  }
  }
};

export const getDate = () => {
  var day = '';
  var month = '';
  var hours = '';
  var minutes = '';
  var seconds = '';
  var now = new Date();
  var date = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  var monthaux = date.getMonth() + 1;
  var dayOfMonthaux = date.getDate();
  var year = date.getFullYear();
  var houraux = date.getHours();
  var minutesaux = date.getMinutes();
  var secondsaux = date.getSeconds();

  if (monthaux < 10) month = '0' + monthaux;
  else month = monthaux;
  if (dayOfMonthaux < 10) day = '0' + dayOfMonthaux;
  else day = dayOfMonthaux;
  if (houraux < 10) hours = '0' + houraux;
  else hours = houraux;
  if (minutesaux < 10) minutes = '0' + minutesaux;
  else minutes = minutesaux;
  if (secondsaux < 10) seconds = '0' + secondsaux;
  else seconds = secondsaux;

  devuelvo =
    year +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds;

  return devuelvo;
};

export const getDate2 = (qsoDate) => {
  var day = '';
  var month = '';
  var hours = '';
  var minutes = '';
  var seconds = '';
  // var now = new Date();
  // var date = new Date( now.getTime() + (now.getTimezoneOffset() * 60000));
  var date = qsoDate;
  var monthaux = date.getMonth() + 1;
  var dayOfMonthaux = date.getDate();
  var year = date.getFullYear();
  var houraux = date.getHours();
  var minutesaux = date.getMinutes();
  var secondsaux = date.getSeconds();

  if (monthaux < 10) month = '0' + monthaux;
  else month = monthaux;
  if (dayOfMonthaux < 10) day = '0' + dayOfMonthaux;
  else day = dayOfMonthaux;
  if (houraux < 10) hours = '0' + houraux;
  else hours = houraux;
  if (minutesaux < 10) minutes = '0' + minutesaux;
  else minutes = minutesaux;
  if (secondsaux < 10) seconds = '0' + secondsaux;
  else seconds = secondsaux;

  devuelvo =
    year +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds;

  return devuelvo;
};

export const getQsoDateTimeZoneIncluded = () => {
  dateNowAux = new Date();
  hourNow = dateNowAux.getHours();
  timeZoneOffset = Math.floor(dateNowAux.getTimezoneOffset() / 60);
  console.log('hour didMount:' + hourNow + ' timeZone: ' + timeZoneOffset);
  // horaoff = hour+Math.floor(dateNow.getTimezoneOffset()/60);
  // console.log('sumo:' + horaoff)
  dateNow = new Date(
    dateNowAux.getTime() + dateNowAux.getTimezoneOffset() * 60000
  );

  // recalculo fecha en base al offset del timeZone
  if (timeZoneOffset > 0) {
    // GMT (-)
    hourOff = 24 + timeZoneOffset;
    if (hourNow < hourOff)
      // mantiene el mismo dia
      // this.setState({date: dateNow, showDate: dateNow.toLocaleDateString(I18n.locale.substring(0, 2), {
      //     month: 'short'
      //   })})
      dateNow = dateNow;
    else {
      // se pasa al otro dia por el offset del timeZone
      dateNow.setDate(dateNow.getDate() + 1);
    }
  } else {
    hourOff = hourNow + timeZoneOffset;
    if (hourOff > 0)
      // mantiene el mismo dia
      // this.setState({date: dateNow,showDate: dateNow.toLocaleDateString(I18n.locale.substring(0, 2), {
      //     month: 'short'
      //   })})
      dateNow = dateNow;
    else {
      // se pasa al otro dia por el offset del timeZone
      dateNow.setDate(dateNow.getDate() - 1);
    }
  }
  return dateNow;
};

getDateHelper = () => {
  var day = '';
  var month = '';
  var hours = '';
  var minutes = '';
  var seconds = '';
  var now = new Date();
  var date = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  var monthaux = date.getMonth() + 1;
  var dayOfMonthaux = date.getDate();
  var year = date.getFullYear();
  var houraux = date.getHours();
  var minutesaux = date.getMinutes();
  var secondsaux = date.getSeconds();

  if (monthaux < 10) month = '0' + monthaux;
  else month = monthaux;
  if (dayOfMonthaux < 10) day = '0' + dayOfMonthaux;
  else day = dayOfMonthaux;
  if (houraux < 10) hours = '0' + houraux;
  else hours = houraux;
  if (minutesaux < 10) minutes = '0' + minutesaux;
  else minutes = minutesaux;
  if (secondsaux < 10) seconds = '0' + secondsaux;
  else seconds = secondsaux;

  devuelvo =
    year +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds;

  return devuelvo;
};

export const check_firstTime_OnProgress = (
  qsotype,
  band,
  mode,
  rst,
  db,
  qraowner,
  onprogress,
  sqlrdsid,
  latitude,
  longitude
) => {
  console.log('DENTRO de CHECK FIRST TIME');
  console.log('lat' + latitude);
  console.log('lon' + longitude);
  console.log('OnProgress: ' + onprogress);
  if (onprogress && sqlrdsid === '') {
    fechaqso = this.getDateHelper();
    console.log('FECHAAA: ' + fechaqso);

    if (qsotype === 'POST' || qsotype === 'QAP' || qsotype === 'FLDDAY') {
      db = '';
      rst = '';
      band = '';
      mode = '';
    }

    const data = {
      band: band,
      mode: mode,
      rst: rst,
      db: db,
      type: qsotype,
      longitude: longitude,
      latitude: latitude,
      datetime: fechaqso,
      qra_owner: qraowner
    };

    return data;
  }
};

export const getDateQslScan = (fecha) => {
  year = fecha.substr(0, 4);
  month = fecha.substr(5, 2);
  day = fecha.substr(8, 2);
  time = fecha.substr(11, 5);
  let monthString = 'pep';

  console.log('FECHAAA: ' + fecha + 'mes:' + month + ' ' + monthString);

  switch (month) {
    case '01':
      monthString = 'Jan';
      break;
    case '02':
      monthString = 'Feb';
      break;
    case '03':
      monthString = 'Mar';
      break;
    case '04':
      monthString = 'Apr';
      break;
    case '05':
      monthString = 'May';
      break;
    case '06':
      monthString = 'Jun';
      break;
    case '07':
      monthString = 'Jul';
      break;
    case '08':
      monthString = 'Ago';
      break;
    case '09':
      monthString = 'Sep';
      break;
    case '10':
      monthString = 'Oct';
      break;
    case '11':
      monthString = 'Nov';
      break;
    case '12':
      monthString = 'Dec';
      break;
  }

  console.log('FECHAAA: ' + fecha + 'monthString:' + monthString);

  return monthString + ' ' + day + ',' + ' ' + year + ' ' + time;
};

export const getFollowStatus = (followings, qratosearch) => {
  if (followings.length > 0) {
    devuelvo = 'false';

    followings.map((item) => {
      if (item.qra === qratosearch) {
        devuelvo = 'true';
      }
    });

    return devuelvo;
  } else return 'empty';
};

export async function hasAPIConnection() {
  // se ve inestable remote config (a veces trae de una los parametros la primera vez q se ejecuta la APP y a veces no,
  // y cuando se hace update de un cambio en la consola, la primera vez no lo trael al cambio, si la segunda)
  // para A/B testing esta bien, pero para esto de chequear internet le va a molestar al ausuario si llegase a fallar

  // console.log('bring remote config urlsInternet');

  // const remoteConfig = firebase.remoteConfig();
  // remoteConfig.settings = {
  //   //   minimumFetchIntervalMillis: 100,
  // };

  //   remoteConfig.setDefaults({
  //     urlInternet1: 'https://www.google.com?',
  //     urlInternet2: 'https://www.bing.com?',
  // });

  const timeout = 4000; // 2500

  var fechaEnMiliseg = String(Date.now());
  var url1 = 'https://www.google.com?';
  var url2 = 'https://www.facebook.com/?';

  const myNewStr = fechaEnMiliseg.substr(12, 1);
  console.log('INTERNET CHECK NOW: ' + fechaEnMiliseg);
  console.log('substring:' + myNewStr);
  try {
    return await new Promise((resolve, reject) => {
      if (myNewStr >= 0 && myNewStr <= 4) {
        console.log('elif menor q 4');

        setTimeout(() => {
          reject();
        }, timeout);

        // remoteConfig.fetch(0).then(
        //   remoteConfig.fetchAndActivate().then((spot) => {
        //     // remoteConfig.Activate().then((spot) => {

        //     configData = remoteConfig.getValue("urlInternet1");
        //    if (configData.source==='default')
        //    {
        //      console.log('DENTRO url1 lo obtuvo por default#');
        //      console.log(configData.value)
        //      url1 = configData.value;
        //    }
        //      else{
        //      console.log('DENTRO url1 lo obtuvo por remote');
        //      console.log(configData);
        //      let obj = JSON.parse(configData.value);
        //      console.log(obj.url);
        //      url1 = obj.url;

        //      }

        fetch(url1 + fechaEnMiliseg)
          .then((response) => {
            resolve(response.ok);
          })
          .catch(() => {
            // crashlytics().setUserId(this.props.qra);
            crashlytics().log('error: ');
            if (__DEV__)
              crashlytics().recordError(new Error('hasAPIConnection1_DEV'));
            else crashlytics().recordError(new Error('hasAPIConnection1_PRD'));
            reject();
          });

        // })).catch((err) => {

        //   console.log('catch fetch URL remoteConfig: '+err)
        // })
      }

      if (myNewStr >= 5 && myNewStr <= 9) {
        console.log('elif menor q a 8');

        setTimeout(() => {
          reject();
        }, timeout);

        // remoteConfig.fetch(0).then(
        //   remoteConfig.fetchAndActivate().then((spot) => {
        //    // remoteConfig.Activate().then((spot) => {

        //     configData = remoteConfig.getValue("urlInternet2");
        //     if (configData.source==='default')
        //     {
        //       console.log('url2 lo obtuvo por default#');
        //       console.log(configData.value)
        //       url2 = configData.value;
        //     }
        //       else{
        //       console.log('url 2lo obtuvo por remote');
        //       console.log(configData);
        //       let obj = JSON.parse(configData.value);
        //       console.log(obj.url);
        //       url2 = obj.url;

        //       }

        fetch(url2 + '' + fechaEnMiliseg)
          .then((response) => {
            resolve(response.ok);
          })
          .catch(() => {
            crashlytics().log('error: ');
            if (__DEV__)
              crashlytics().recordError(new Error('hasAPIConnection2_DEV'));
            else crashlytics().recordError(new Error('hasAPIConnection2_PRD'));

            reject();
          });

        // })).catch((err) => {

        //   console.log('catch fetch URL remoteConfig: '+err)
        // })
      }
    });
  } catch (e) {
    console.log('catch global hasInternet: ' + e);
    return false;
  }
}

export const kinesis_catch = (errnumber, errordesc, qra) => {
  console.log('llamo kinesis desde helper');
  let tiempo = Date.now();
  //let ostype = Platform.OS;
  resultki = Analytics.record(
    {
      data: {
        // The data blob to put into the record
        errorNumber: errnumber,
        errorDesc: errordesc,
        version: APP_VERSION,
        qra: qra,
        platform: Platform.OS,
        platformVersion: Platform.Version,
        timeStamp: tiempo
      },
      // OPTIONAL
      partitionKey: 'myPartitionKey',
      streamName: 'analytic_stream'
    },
    'AWSKinesis'
  );
};

export const devuelveSoloUnType = (mediafiles, type) => {
  soloUnType = [];
  mediafiles.map((item) => {
    if (item.type === type) {
      soloUnType = [...soloUnType, item];
    }
  });
  return soloUnType;
};

export const ValidacionAddCallsign = (qsoqras, qraLogged, callToAdd) => {
  esValido = true;

  var re = /^[a-zA-Z0-9]+$/;

  len = callToAdd.length;
  console.log('len: ' + len);
  qsoqras.map((item) => {
    if (item.qra === callToAdd) esValido = false;
  });
  if (qraLogged === callToAdd || callToAdd === '' || len < 3) esValido = false;

  if (!re.exec(callToAdd)) esValido = false;

  return esValido;
};

export const checkMediaSentOfFreeUser = (mediafiles, type, maxPerQso) => {
  if (followings.length > 0) {
    mediaCount = 0;

    mediafiles.map((item) => {
      if (item.type === type) {
        if (item.status !== 'inappropriate content')
          mediaCount = mediaCount + 1;
      }
    });

    if (mediaCount < maxPerQso) return true;
    else return false;
  } else return true;
};

export const showVideoReward = (userInfo, spot, mediafiles) => {
  console.log(
    'monthly: ' +
      userInfo.monthly_qso_new +
      ' from: ' +
      userInfo.account_type.app_qso_new_reward_from +
      'To: ' +
      userInfo.account_type.app_qso_new_reward_to +
      '  every:' +
      userInfo.account_type.app_qso_new_reward_every
  );

  if (spot === 'newqso')
    if (
      userInfo.monthly_qso_new >=
        userInfo.account_type.app_qso_new_reward_from &&
      userInfo.monthly_qso_new <= userInfo.account_type.app_qso_new_reward_to
    ) {
      auxQsoNew =
        userInfo.monthly_qso_new +
        userInfo.account_type.app_qso_new_reward_every -
        userInfo.account_type.app_qso_new_reward_from;
      if (
        auxQsoNew % userInfo.account_type.app_qso_new_reward_every === 0 ||
        userInfo.monthly_qso_new ===
          userInfo.account_type.app_qso_new_reward_from
      ) {
        console.log('es TRUE');
        return true;
      } else {
        console.log('es FALSE');
        return false;
      }
    } else {
      console.log('es FALSE');
      return false;
    }

  if (spot === 'audio') {
    console.log('entro audio reward');
    currentQty = 0;
    // cuento cuantos audios tiene en el QSO actual
    mediafiles.map((item) => {
      if (item.type === 'audio') currentQty++;
    });

    if (
      currentQty >= userInfo.account_type.app_qso_audio_add_reward_from &&
      currentQty <= userInfo.account_type.app_qso_audio_add_reward_to
    ) {
      auxCurrentQty =
        currentQty +
        userInfo.account_type.app_qso_audio_add_reward_every -
        userInfo.account_type.app_qso_audio_add_reward_from;
      console.log(' auxCurrentQty: ' + auxCurrentQty);

      if (
        auxCurrentQty % userInfo.account_type.app_qso_audio_add_reward_every ===
          0 ||
        currentQty === userInfo.account_type.app_qso_audio_add_reward_from
      ) {
        console.log('videoaudio es TRUE');
        return true;
      } else {
        console.log('videoaudio es FALSE');
        return false;
      }
    } else {
      console.log('es FALSE');
      return false;
    }
  }

  if (spot === 'image') {
    console.log('entro image reward');
    currentQty = 0;
    // cuento cuantas photos tiene en el QSO actual
    mediafiles.map((item) => {
      if (item.type === 'image') currentQty++;
    });

    if (
      currentQty >= userInfo.account_type.app_qso_photo_add_reward &&
      currentQty <= userInfo.account_type.app_qso_photo_add_reward_to
    ) {
      auxCurrentQty =
        currentQty +
        userInfo.account_type.app_qso_photo_add_reward_every -
        userInfo.account_type.app_qso_photo_add_reward;
      console.log(' auxCurrentQty: ' + auxCurrentQty);

      if (
        auxCurrentQty % userInfo.account_type.app_qso_photo_add_reward_every ===
          0 ||
        currentQty === userInfo.account_type.app_qso_photo_add_reward
      ) {
        console.log('videoimage es TRUE');
        return true;
      } else {
        console.log('videoimage es FALSE');
        return false;
      }
    } else {
      console.log('es FALSE');
      return false;
    }
  }

  if (spot === 'scanqr') {
    console.log('VideoReward monthly Scans: ' + userInfo.monthly_scans);
    if (
      userInfo.monthly_scans >=
        userInfo.account_type.app_qso_scan_reward_from &&
      userInfo.monthly_scans <= userInfo.account_type.app_qso_scan_reward_to
    ) {
      auxCurrentScans =
        userInfo.monthly_scans +
        userInfo.account_type.app_qso_scan_reward_every -
        userInfo.account_type.app_qso_scan_reward_from;
      console.log(' auxCurrentScans: ' + auxCurrentScans);

      if (
        auxCurrentScans % userInfo.account_type.app_qso_scan_reward_every ===
          0 ||
        userInfo.monthly_scans ===
          userInfo.account_type.app_qso_scan_reward_from
      ) {
        console.log('videoimage es TRUE');
        return true;
      } else {
        console.log('videoimage es FALSE');
        return false;
      }
    } else {
      console.log('es FALSE');
      return false;
    }
  }

  if (spot === 'linkqso') {
    console.log('VideoReward monthly QsoLinks: ' + userInfo.monthly_links);

    if (
      userInfo.monthly_links >=
        userInfo.account_type.app_qso_link_reward_from &&
      userInfo.monthly_links <= userInfo.account_type.app_qso_link_reward_to
    ) {
      auxCurrentLinks =
        userInfo.monthly_links +
        userInfo.account_type.app_qso_link_reward_every -
        userInfo.account_type.app_qso_link_reward_from;
      console.log(' auxCurrentLinks: ' + auxCurrentLinks);

      if (
        auxCurrentLinks % userInfo.account_type.app_qso_link_reward_every ===
          0 ||
        userInfo.monthly_links ===
          userInfo.account_type.app_qso_link_reward_from
      ) {
        console.log('videoimage LinkQso es TRUE');
        return true;
      } else {
        console.log('videoimage LinkQso es FALSE');
        return false;
      }
    } else {
      console.log('videoimage LinkQso es FALSE');
      return false;
    }
  }
};

export const showIntersitial = (userInfo, spot, mediafiles) => {
  if (spot === 'newqso')
    if (
      userInfo.monthly_qso_new >=
        userInfo.account_type.app_qso_new_intersitial_from &&
      userInfo.monthly_qso_new <=
        userInfo.account_type.app_qso_new_intersitial_to
    ) {
      auxQsoNew =
        userInfo.monthly_qso_new +
        userInfo.account_type.app_qso_new_intersitial_every -
        userInfo.account_type.app_qso_new_intersitial_from;
      if (
        auxQsoNew % userInfo.account_type.app_qso_new_intersitial_every === 0 ||
        userInfo.monthly_qso_new ===
          userInfo.account_type.app_qso_new_intersitial_from
      ) {
        console.log('es TRUE');
        return true;
      } else {
        console.log('es FALSE');
        return false;
      }
    } else {
      console.log('es FALSE');
      return false;
    }

  if (spot === 'audio') {
    console.log('entro audio intersitial');
    currentQty = 0;
    // cuento cuantos audios tiene en el QSO actual
    mediafiles.map((item) => {
      if (item.type === 'audio') currentQty++;
    });

    if (
      currentQty >= userInfo.account_type.app_qso_audio_add_intersitial_from &&
      currentQty <= userInfo.account_type.app_qso_audio_add_intersitial_to
    ) {
      auxCurrentQty =
        currentQty +
        userInfo.account_type.app_qso_audio_add_intersitial_every -
        userInfo.account_type.app_qso_audio_add_intersitial_from;
      console.log(' auxCurrentQty: ' + auxCurrentQty);

      if (
        auxCurrentQty %
          userInfo.account_type.app_qso_audio_add_intersitial_every ===
          0 ||
        currentQty === userInfo.account_type.app_qso_audio_add_intersitial_from
      ) {
        console.log('videoaudio es TRUE');
        return true;
      } else {
        console.log('videoaudio es FALSE');
        return false;
      }
    } else {
      console.log('es FALSE');
      return false;
    }
  }

  if (spot === 'image') {
    console.log('entro image intersitial');
    currentQty = 0;
    // cuento cuantas photos tiene en el QSO actual
    mediafiles.map((item) => {
      if (item.type === 'image') currentQty++;
    });

    if (
      currentQty >= userInfo.account_type.app_qso_photo_add_intersitial &&
      currentQty <= userInfo.account_type.app_qso_photo_add_intersitial_to
    ) {
      auxCurrentQty =
        currentQty +
        userInfo.account_type.app_qso_photo_add_intersitial_every -
        userInfo.account_type.app_qso_photo_add_intersitial;
      console.log(' auxCurrentQty: ' + auxCurrentQty);

      if (
        auxCurrentQty %
          userInfo.account_type.app_qso_photo_add_intersitial_every ===
          0 ||
        currentQty === userInfo.account_type.app_qso_photo_add_intersitial
      ) {
        console.log('intersitial es TRUE');
        return true;
      } else {
        console.log('intersitial es FALSE');
        return false;
      }
    } else {
      console.log('es FALSE');
      return false;
    }
  }

  if (spot === 'video') return false;

  if (spot === 'scanqr') {
    console.log('Intersitial monthly Scans: ' + userInfo.monthly_scans);

    if (
      userInfo.monthly_scans >=
        userInfo.account_type.app_qso_scan_intersitial_from &&
      userInfo.monthly_scans <=
        userInfo.account_type.app_qso_scan_intersitial_to
    ) {
      auxCurrentScans =
        userInfo.monthly_scans +
        userInfo.account_type.app_qso_scan_intersititial_every -
        userInfo.account_type.app_qso_scan_intersitial_from;
      console.log(' auxCurrentScans: ' + auxCurrentScans);

      if (
        auxCurrentScans %
          userInfo.account_type.app_qso_scan_intersititial_every ===
          0 ||
        userInfo.monthly_scans ===
          userInfo.account_type.app_qso_scan_intersitial_from
      ) {
        console.log('intersitial scanQr es TRUE');
        return true;
      } else {
        console.log('intersitial scanQr es FALSE');
        return false;
      }
    } else {
      console.log('intersitial scanQr FALSE');
      return false;
    }
  }

  if (spot === 'linkqso') {
    console.log('Intersitial monthly QsoLinks: ' + userInfo.monthly_links);

    if (
      userInfo.monthly_links >=
        userInfo.account_type.app_qso_link_intersitial_from &&
      userInfo.monthly_links <=
        userInfo.account_type.app_qso_link_intersitial_to
    ) {
      auxCurrentLinks =
        userInfo.monthly_links +
        userInfo.account_type.app_qso_link_intersitial_every -
        userInfo.account_type.app_qso_link_intersitial_from;
      console.log(' auxCurrentLinks: ' + auxCurrentLinks);

      if (
        auxCurrentLinks %
          userInfo.account_type.app_qso_link_intersitial_every ===
          0 ||
        userInfo.monthly_links ===
          userInfo.account_type.app_qso_link_intersitial_from
      ) {
        console.log('intersitial LinkQso es TRUE');
        return true;
      } else {
        console.log('intersitial  LinkQso es FALSE');
        return false;
      }
    } else {
      console.log('intersitial LinkQso es FALSE');
      return false;
    }
  }
};

export const todaMediaEnviadaAS3 = (mediafiles) => {
  // soloUnType = [];
  contNoEnviada = 0;
  contEnviada = 0;
  mediafiles.map((item) => {
    if (
      item.status !== 'sent' &&
      item.type !== 'vacio' &&
      item.status !== 'inappropriate content'
    ) {
      contNoEnviada++;
    }
    if (
      item.status === 'sent' &&
      item.type !== 'vacio' &&
      item.status !== 'inappropriate content'
    ) {
      contEnviada++;
    }
  });

  // estos if son porque puede haber una media de contenido inapropiado sola, entonces si bien si hay muchas medias y hay una inapropidada el post se publica igual
  // hay que chequear que si hay solo una media inapropiada o muchas que haya por lo menos una media enviada para poder hacer el POST,
  if (contNoEnviada > 0) return false;
  else if (contEnviada > 0) return true;
  else return false;
};

// return true if 'installed' (considered as a JRE version string) is
// greater than or equal to 'required' (again, a JRE version string).
export const versionCompare = (requiered, installed) => {
  const oldParts = requiered.split('.');
  const newParts = installed.split('.');
  for (var i = 0; i < newParts.length; i++) {
    const a = parseInt(newParts[i]) || 0;
    const b = parseInt(oldParts[i]) || 0;
    // if (a === b) return true
    if (a > b) return true;
    if (a < b) return false;
  }
  // return false
  return true;
};

// esta rutina traduce los push para ANDROID (ios lo hace nativo desde xcode) y tambien arma las notificaciones
// traducidas par android y ios que se muetsra en la bandeja de notificaciones si la APP esta en FOREGROUND.
export const armoPushNotifyLocalNotif = (
  title_loc_key,
  loc_key,
  title_loc_args,
  loc_args
) => {
  titleLocArgs = [];
  locArgs = [];
  pushTitle = '';
  pushMessage = '';
  bandejaNotifLocal = '';
  activityType = '';
  qsoguid = '';
  // if (Platform.OS==='android'){
  //     titleLocArgs = JSON.parse(title_loc_args);
  //     locArgs = JSON.parse(loc_args);
  //   }else
  //   {
  //     titleLocArgs = title_loc_args;
  //     locArgs = loc_args;
  //   }
  titleLocArgs = title_loc_args;
  locArgs = loc_args;

  console.log('helper titleLocArgs:' + titleLocArgs);
  console.log('helper locArgs:' + locArgs);
  console.log('helper titleLocKey:' + title_loc_key);
  console.log('helper LocKey:' + loc_key);

  if (title_loc_key === 'PUSH_FOLLOWSYOU_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key);
    bandejaNotifLocal = pushTitle;
  }

  if (title_loc_key === 'PUSH_COMMENTEDPARTICPATING_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    console.log('pushTitle dentroIF: ' + pushTitle);
    pushMessage = I18n.t(loc_key, { comment: locArgs[0] });
    console.log('pushMessage dentroIF: ' + pushMessage);
    bandejaNotifLocal = pushTitle + ' | ' + pushMessage;
    locArgs = locArgs[1]; // pasa el GUID
  }

  if (title_loc_key === 'PUSH_NEWPOSTANY_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key);
    bandejaNotifLocal = pushTitle;
  }

  if (title_loc_key === 'PUSH_TAGYOUNEWPOSTANY_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key);
    bandejaNotifLocal = pushTitle;
  }

  if (title_loc_key === 'PUSH_WORKEDQSO_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key, {
      mode: locArgs[0],
      band: locArgs[1],
      utc: locArgs[2]
    });
    bandejaNotifLocal = pushTitle + ' ' + pushMessage;
    // aca cambio el locArgs = locArgs[3]
    locArgs = locArgs[3]; // pasa el GUID
  }

  if (title_loc_key === 'PUSH_INCLUDEDYOUWORKEDQSO_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key, { mode: locArgs[0], band: locArgs[1] });
    bandejaNotifLocal = pushTitle + ' ' + pushMessage;
  }

  if (title_loc_key === 'PUSH_LISTENEDQSO_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key, {
      mode: locArgs[0],
      band: locArgs[1],
      utc: locArgs[2]
    });
    bandejaNotifLocal = pushTitle + ' ' + pushMessage;
    locArgs = locArgs[3]; // pasa el GUID
  }

  if (title_loc_key === 'PUSH_LISTENEDYOUQSO_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key, { mode: locArgs[0], band: locArgs[1] });
    bandejaNotifLocal = pushTitle + ' ' + pushMessage;
    locArgs = locArgs[3]; // pasa el GUID
  }

  if (title_loc_key === 'PUSH_NEWFLDDAY_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key);
    bandejaNotifLocal = pushTitle;
    locArgs = locArgs[0]; // pasa el GUID
  }

  if (title_loc_key === 'PUSH_TAGYOUNEWFLDDAY_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key);
    bandejaNotifLocal = pushTitle;
  }

  if (title_loc_key === 'PUSH_NEWQAP_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key);
    bandejaNotifLocal = pushTitle;
  }

  if (title_loc_key === 'PUSH_TAGYOUNEWQAP_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key);
    bandejaNotifLocal = pushTitle;
  }

  if (title_loc_key === 'PUSH_REPOSTQSO_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key);
    bandejaNotifLocal = pushTitle;
    locArgs = locArgs[1]; // pasa el GUID
  }

  if (title_loc_key === 'PUSH_REPOSTLISTEN_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key);
    bandejaNotifLocal = pushTitle;
    console.log('le paso este guid: ' + locArgs[1]);
    locArgs = locArgs[1]; // pasa el GUID
  }

  if (title_loc_key === 'PUSH_REPOSTANY_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key);
    bandejaNotifLocal = pushTitle;
    console.log('le paso este guid: ' + locArgs[0]);
    locArgs = locArgs[0]; // pasa el GUID
  }

  if (title_loc_key === 'PUSH_REPOSTFLDDAY_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key);
    bandejaNotifLocal = pushTitle;
    locArgs = locArgs[0]; // pasa el GUID
  }

  if (title_loc_key === 'PUSH_REPOSTQAP_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key);
    bandejaNotifLocal = pushTitle;
    locArgs = locArgs[0]; // pasa el GUID
  }

  if (title_loc_key === 'PUSH_MARKETING_TITLE') {
    pushTitle = I18n.t(title_loc_key, { line1: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key, { line2: locArgs[0] });
    bandejaNotifLocal = pushTitle + ' ' + pushMessage;
  }

  if (title_loc_key === 'PUSH_MENTION_TITLE') {
    pushTitle = I18n.t(title_loc_key, { callsign: titleLocArgs[0] });
    pushMessage = I18n.t(loc_key, { comment: locArgs[0] });
    bandejaNotifLocal = pushTitle + ' | ' + pushMessage;
    locArgs = locArgs[1]; // pasa el GUID
  }

  // console.log('antes del crash ')
  // if (locArgs !== undefined)
  //  console.log('no es undefined')
  //  else
  //  console.log('es undefined')

  //  console.log('despues del crash ')
  if (locArgs !== undefined && title_loc_key !== 'PUSH_MARKETING_TITLE') {
    // si no es undefined porque se envio el parametro QSOGUID
    // si existe QSOGUID es porque es una publicacion
    activityType = 109; // le pongo  activity Type 109 que sea publicacion asi va al QsoDetail en el click de la notificacion
    qsoguid = locArgs;
  } else {
    // si viene vacio el QSOGUID es PROFILE o push de Marketing
    if (title_loc_key === 'PUSH_MARKETING_TITLE') activityType = 110;
    // con 110 cuando hace click en la notificacion o va a ningun lado
    else activityType = 108; // pongo un activity type 108 que sea de PROFILE asi va al profile del usuario cuando hace click en la notificacion

    qsoguid = '';
  }

  console.log('helper bandeja:' + bandejaNotifLocal);
  return {
    pushTitle: pushTitle,
    pushMessage: pushMessage,
    bandejaNotifLocal: bandejaNotifLocal,
    QsoGuid: qsoguid,
    activityType: activityType
  };
};

export const percentageCalculator = (initialTime, totalTime) => {
  t2 = new Date();
  dif = initialTime.getTime() - t2.getTime();
  Seconds_from_T1_to_T2 = dif / 1000;
  Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
  porcentage = (Seconds_Between_Dates * 100) / totalTime;
  aux = Math.trunc(porcentage);

  return aux;
};

export const addMediaCheck = (mediatypetoadd, mediafiles) => {
  // saco el item de profile por si eluser se saco una foto cuando ya habia empezado un POST,
  // esto evita que pueda mandar un POST sin media

  checkpassed = true;

  mediafiles.map((item) => {
    //  if(item.type !== 'profile' && item.status!=='inappropriate content') {
    //    mediafilesSinProfile =  [...mediafilesSinProfile,item]
    //  }
    if (
      (item.type === 'audio' || item.type === 'image') &&
      mediatypetoadd === 'video'
    )
      checkpassed = false;
    if (
      item.type === 'video' &&
      (mediatypetoadd === 'audio' ||
        mediatypetoadd === 'image' ||
        mediatypetoadd === 'video')
    )
      // se agrego video porque si ya hay un video no se puede enviar un segundo video.
      checkpassed = false;
  });

  console.log('mediaCheck:' + checkpassed);

  return checkpassed;
};

export async function createSQSOfolder() {
  return await new Promise((resolve, reject) => {
    // este async es para pdoer usar un await dentro de un promise y no usar los .then ...
    (async () => {
      if (Platform.OS === 'android')
        qsopath = RNFetchBlob.fs.dirs.DCIMDir + '/sqso';
      else qsopath = RNFetchBlob.fs.dirs.DocumentDir + '/sqso';
      // qsopath = RNFetchBlob.fs.dirs.DownloadDir+'/sqso';

      const assetsDirExists = await RNFetchBlob.fs.isDir(qsopath);
      if (!assetsDirExists) {
        console.log('creo el dir');
        //  RNFetchBlob.fs.mkdir(RNFetchBlob.fs.dirs.DCIMDir+'/sqso')
        RNFetchBlob.fs
          .mkdir(qsopath)
          .then((res) => {
            console.log('App directory created..');
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            reject(false);
          });
      } else console.log('el dir existe');

      return resolve(true);
    })();
  });
}


export const userNotValidated = () => {

  Alert.alert(
    I18n.t("USER_NOT_VALIDATED"),
    I18n.t("USER_NOT_VALIDATED_TEXT"),
    // 'Usuario no validado',
    // 'No se puede realizar esta acción ya que su usuario todavía no fue validado. Por favor envie una constancia de la licencia a  info@superqso.com. Este tramite puede demorar 24hs',
    [
      {
        text: I18n.t("USER_NOT_VALIDATED_CLOSE"),
        onPress: () => console.log('ok'),
        style: 'cancel',
      }
      
    ],
   )


 
  return true;
};
