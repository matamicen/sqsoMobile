/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import AsyncStorage from '@react-native-community/async-storage';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
//import Amplify, { Auth, API, Storage } from 'aws-amplify';
import { API, Auth, Storage } from 'aws-amplify';
//import Amplify, { Auth, API, Storage } from 'aws-amplify';
import { Buffer } from 'buffer';
import { NetInfo, Platform } from 'react-native';
import Upload from 'react-native-background-upload';
import RNIap, { acknowledgePurchaseAndroid } from 'react-native-iap';
import Toast from 'react-native-root-toast';
import RNFetchBlob from 'rn-fetch-blob';
import { APP_VERSION } from '../appVersion';
import awsconfig from '../aws-exports';
import global_config from '../global_config.json';
import { getDateQslScan, versionCompare } from '../helper';
import I18n from '../utils/i18n';
import {
  ACT_INDICATOR_IMAGE_ENABLED,
  ACT_INDICATOR_POST_QSO_NEW_FALSE,
  LATEST_USERS_RECEIVE,
  ACT_INDICATOR_POST_QSO_NEW_TRUE,
  ADD_CALLSIGN,
  ADD_MEDIA,
  ADD_QRA,
  AUDIO_RECORDING_PERMISSION_FALSE,
  AUDIO_RECORDING_PERMISSION_TRUE,
  CAMERA_PERMISSION_FALSE,
  CAMERA_PERMISSION_TRUE,
  CHANGE_QSO_TYPE,
  CLEAR_QRA,
  CLOSE_MODALCONFIRM_PHOTO,
  CLOSE_MODAL_RECORDING,
  COMMENT_ADD,
  COMMENT_ADD_UPDATE,
  COMMENT_DELETE,
  CONFIRMED_PURCHASE_FLAG,
  COPY_CALLSIGN_TO_QSOQRAS,
  DELETE_MEDIA_MEMORY,
  DELETE_QSO,
  FETCHING_API_FAILURE,
  FETCHING_API_REQUEST,
  FETCHING_API_SUCCESS,
  FOLLOWERS_ALREADY_CALLED,
  FOLLOWINGS_SELECTED,
  FOLLOW_RECEIVE,
  INSERT_FOLLOWERS,
  INSERT_FOLLOWINGS,
  MANAGE_LOCATION_PERMISSIONS,
  MANAGE_NOTIFICATIONS,
  MANAGE_PUSH_TOKEN,
  NEW_QSO_ACTIVE_FALSE,
  NEW_QSO_ACTIVE_TRUE,
  ON_PROGRESS_FALSE,
  ON_PROGRESS_TRUE,
  OPEN_MODALCONFIRM_PHOTO,
  OPEN_MODAL_RECORDING,
  PAUSE_VIDEO,
  PROFILE_PICTURE_REFRESH,
  QRA_SEARCH,
  QRA_SEARCH_LOCAL,
  QSO_UNLIKE,
  QSO_LIKE,
  QSO_QRA_DELETE,
  QSO_SCREEN_DIDMOUNT,
  QSO_SENT_UPDATES_AND_SQLRDSID,
  RECEIVE_FEED,
  RECEIVE_FIELDDAYS,
  RECEIVE_FOLLOWERS,
  RECEIVE_QRA,
  RECEIVE_QRA_ERROR,
  RECEIVE_QSO,
  RECEIVE_QSO_ERROR,
  RECEIVE_USER_BIO,
  RECEIVE_USER_DATA_INFO,
  REFRESH_FOLLOWINGS,
  REQUEST_FEED,
  REQUEST_FIELDDAYS,
  REQUEST_QRA,
  REQUEST_QSO,
  REQUEST_USERINFO,
  RESET_FOR_SIGN_OUT,
  RESET_QSO,
  SEND_ACTUAL_MEDIA,
  SET_BAND,
  SET_CONFIRM_PROFILE_PHOTO_MODAL,
  SET_DELETED_FLAG,
  SET_EXTERNAL_SHARE_URL,
  SET_JUSTPUBLISHED,
  SET_LOCATION,
  SET_MODE,
  SET_MUSTUPGRADEAPP,
  SET_PRESSHOME,
  SET_PROFILE_MODAL_STAT,
  SET_QRA,
  SET_QSOCALLSIGNS,
  SET_QSODATE,
  SET_QSOUTC,
  SET_RESTORE_CALL,
  SET_RST,
  SET_SENDING_PROFILE_PHOTO_MODAL,
  SET_SHARE_URL_GUID,
  SET_STOPALLAUDIOS,
  SET_SUBSCRIPTION_INFO,
  SET_TOKEN,
  SET_UPLOAD_VIDEO_ERROR_MESSAGE,
  SET_URL_RDS_S3,
  SET_USER_INFO,
  SET_VIDEO_UPLOAD_PROGRESS,
  SET_WEBVIEW,
  SET_WELCOME_USER_FIRST_TIME,
  UPDATE_COMMENT_MEMORY,
  UPDATE_LINK_QSO,
  UPDATE_MEDIA,
  UPDATE_ONLYONE_QSOQRA_SENT_STATUS,
  UPDATE_QRA_URL,
  UPDATE_QSL_SCAN,
  UPDATE_QSL_SCAN_RESULT,
  UPDATE_QSOQRA_SENT_STATUS,
  UPDATE_QSO_HEADER_STATUS,
  SET_FEEDTOUCHABLE
} from './types';

// Analytics.addPluggable(new AWSKinesisProvider());

//Amplify.configure(awsconfig)
Auth.configure(awsconfig);
API.configure(awsconfig);
Storage.configure(awsconfig);
// Analytics.configure(awsconfig);

export const setStopAllAudios = (status) => {
  return {
    type: SET_STOPALLAUDIOS,
    payload: status
  };
};

export const welcomeUserFirstTime = (status) => {
  return {
    type: SET_WELCOME_USER_FIRST_TIME,
    payload: status
  };
};

export const fetchingApiRequest = (apiName) => {
  return {
    type: FETCHING_API_REQUEST,
    apiName: apiName
  };
};
export const fetchingApiSuccess = (apiName, json) => {
  return {
    type: FETCHING_API_SUCCESS,
    apiName: apiName,
    payload: json
  };
};
export const fetchingApiFailure = (apiName, error) => {
  return {
    type: FETCHING_API_FAILURE,
    apiName: apiName,
    payload: error
  };
};
export const cambioqsotype = (typetochange) => {
  return {
    type: CHANGE_QSO_TYPE,
    typetochange: typetochange
  };
};
export const setBand = (band) => {
  return {
    type: SET_BAND,
    band: band
  };
};
export const setRst = (rst, digital) => {
  return {
    type: SET_RST,
    rst: rst,
    digital: digital
    // rstbeforechange: rstbeforechange
  };
};
export const setMode = (mode) => {
  return {
    type: SET_MODE,
    mode: mode
  };
};

export const setQsoDate = (dateFormat, param) => {
  return {
    type: SET_QSODATE,
    date: dateFormat,
    param: param
  };
};

export const setQsoUtc = (utcFormat, param) => {
  return {
    type: SET_QSOUTC,
    utc: utcFormat,
    param: param
  };
};

export const setVideoUploadProgress = (percentage) => {
  return {
    type: SET_VIDEO_UPLOAD_PROGRESS,
    progress: percentage
  };
};

export const setExternalShreUrl = (status) => {
  return {
    type: SET_EXTERNAL_SHARE_URL,
    status: status
  };
};

export const setWebView = (websession, weburl) => {
  return {
    type: SET_WEBVIEW,
    webviewsession: websession,
    webviewurl: weburl
  };
};

export const setUpgradeApp = (status) => {
  return {
    type: SET_MUSTUPGRADEAPP,
    mustupgradeapp: status
  };
};

export const setPressHome = (cant) => {
  return {
    type: SET_PRESSHOME,
    presshome: cant
  };
};

export const setJustPublished = (stat) => {
  return {
    type: SET_JUSTPUBLISHED,
    status: stat
  };
};

export const setSendingProfilePhotoModal = (status) => {
  return {
    type: SET_SENDING_PROFILE_PHOTO_MODAL,
    status: status
  };
};

export const setConfirmProfilePhotoModal = (status) => {
  return {
    type: SET_CONFIRM_PROFILE_PHOTO_MODAL,
    status: status
  };
};

export const setProfileModalStat = (param, status) => {
  return {
    type: SET_PROFILE_MODAL_STAT,
    param: param,
    status: status
  };
};

export const profilePictureRefresh = (urlProfile) => {
  return {
    type: PROFILE_PICTURE_REFRESH,
    urlprofile: urlProfile
    // status: status
  };
};

export const addQra = (newqra) => {
  return {
    type: ADD_QRA,
    newqra: newqra
  };
};

export const addCallsign = (newCallsign) => {
  return {
    type: ADD_CALLSIGN,
    newcallsign: newCallsign
  };
};

COPY_CALLSIGN_TO_QSOQRAS;

export const copyQsoCallSignsToQsoQras = (qsocallsigns) => {
  return {
    type: COPY_CALLSIGN_TO_QSOQRAS,
    qsocallsigns: qsocallsigns
  };
};

export const setQsoCallsigns = (param, callsign) => {
  return {
    type: SET_QSOCALLSIGNS,
    param: param,
    callsign: callsign
  };
};

export const updateQraUrl = (qra, url) => {
  return {
    type: UPDATE_QRA_URL,
    qra: qra,
    url: url
  };
};

// export const fetchPeople = () => {
//   return async dispatch => {
//     dispatch(fetchingPeopleRequest());
//     try {
//         console.log("ejecuta llamada API");
//         let response = await fetch("https://randomuser.me/api/?results=10");
//         let json = await response.json();
//         dispatch(fetchingPeopleSuccess(json.results));
//      } catch (error){
//          dispatch(fetchingPeopleFailure(error));
//      }
//   };
// };

export const addMedia = (newmedia) => {
  return {
    type: ADD_MEDIA,
    newmedia: newmedia
  };
};

export const closeModalConfirmPhoto = (phototype) => {
  return {
    type: CLOSE_MODALCONFIRM_PHOTO,
    phototype: phototype
  };
};

export const closeModalRecording = () => {
  return {
    type: CLOSE_MODAL_RECORDING
  };
};

export const openModalRecording = () => {
  return {
    type: OPEN_MODAL_RECORDING
  };
};

export const openModalConfirmPhoto = (height) => {
  return {
    type: OPEN_MODALCONFIRM_PHOTO,
    height: height
  };
};

export const sendActualMedia = (media) => {
  return {
    type: SEND_ACTUAL_MEDIA,
    mediatosend: media
  };
};

export const actindicatorImageEnabled = () => {
  return {
    type: ACT_INDICATOR_IMAGE_ENABLED
  };
};

export const cameraPermissionTrue = () => {
  return {
    type: CAMERA_PERMISSION_TRUE
  };
};

export const setUploadVideoError = (message) => {
  return {
    type: SET_UPLOAD_VIDEO_ERROR_MESSAGE,
    message: message
  };
};

export const cameraPermissionFalse = () => {
  return {
    type: CAMERA_PERMISSION_FALSE
  };
};

export const audiorecordingPermissionTrue = () => {
  return {
    type: AUDIO_RECORDING_PERMISSION_TRUE
  };
};

export const audiorecordingPermissionFalse = () => {
  return {
    type: AUDIO_RECORDING_PERMISSION_FALSE
  };
};

export const manageLocationPermissions = (parametro, status) => {
  return {
    type: MANAGE_LOCATION_PERMISSIONS,
    param: parametro,
    payload: status
  };
};

export const qsoScreenDidMountFirsTime = (status) => {
  return {
    type: QSO_SCREEN_DIDMOUNT,
    payload: status
  };
};

export const newqsoactiveTrue = () => {
  return {
    type: NEW_QSO_ACTIVE_TRUE
  };
};

export const newqsoactiveFalse = () => {
  return {
    type: NEW_QSO_ACTIVE_FALSE
  };
};

export const actindicatorPostQsoNewTrue = () => {
  return {
    type: ACT_INDICATOR_POST_QSO_NEW_TRUE
  };
};

export const actindicatorPostQsoNewFalse = () => {
  return {
    type: ACT_INDICATOR_POST_QSO_NEW_FALSE
  };
};

export const setShareUrlGuid = (guid) => {
  return {
    type: SET_SHARE_URL_GUID,
    urlguid: guid
  };
};

export const onprogressTrue = () => {
  return {
    type: ON_PROGRESS_TRUE
  };
};

export const onprogressFalse = () => {
  return {
    type: ON_PROGRESS_FALSE
  };
};

export const fetchQraProfileUrl = (qra, type, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('fetchQraProfileUrl'));
    console.log('ejecuta llamada API URL PROFILE');
    try {
      console.log('Antes1 GET PROFILE URL');
      // var session = await Auth.currentSession();
      // console.log("Su token es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/qra-get-profile-pic';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
          qra: qra
        }
      };

      console.log('llamo api URL!');
      var respuesta = await API.post(apiName, path, myInit);

      if (respuesta.body.error === 0) {
        ////console.log("respuesta API:" + JSON.stringify(respuesta));
        //console.log('respuesta API url:' + JSON.stringify(respuesta));
        var url = {
          url: respuesta.body.message.url_avatar,
          following: respuesta.body.message.following
        };
        //   console.log("la url que envio:" + url);
        //   console.log("EL QRA:" + qra);
        dispatch(fetchingApiSuccess('fetchQraProfileUrl', respuesta.body));

        if (type === 'profile')
          dispatch(
            profilePictureRefresh(respuesta.body.message.url_avatar, true)
          );
        else dispatch(updateQraUrl(qra, url));
      }
    } catch (error) {
      console.log('Api catch error:', error);
      dispatch(fetchingApiFailure('fetchQraProfileUrl', error));
      // Handle exceptions

      // como fallo el la URL de get profile borro el QRA de la lista de QsoQras y actualizo el JwtToken
      var session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      dispatch(updateQraUrl('deleteLast', url));
      crashlytics().setUserId(qra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__)
        crashlytics().recordError(new Error('fetchQraProfileUrl_DEV'));
      else crashlytics().recordError(new Error('fetchQraProfileUrl_PRD'));
    }
  };
};

export const setQra = (qra) => {
  return {
    type: SET_QRA,
    qra: qra
  };
};

export const setLocation = (lat, lon) => {
  return {
    type: SET_LOCATION,
    lat: lat,
    lon: lon
  };
};

export const updateQsoStatusSentAndSqlRdsId = (
  sqlrdsid,
  typestatus,
  bandstatus,
  modestatus
) => {
  return {
    type: QSO_SENT_UPDATES_AND_SQLRDSID,
    sqlrdsid: sqlrdsid,
    typestatus: typestatus,
    bandstatus: bandstatus,
    modestatus: modestatus
  };
};

export const postQsoNew = (
  bodyqsonew,
  qsoqras,
  mediafiles,
  videoCompressed,
  jwtToken
) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('postQsoNew'));
    console.log('ejecuta llamada API Qso NEW');
    try {
      console.log('Antes1 QSO new');
      console.log(bodyqsonew);
      //  console.log("RST: "+ JSON.stringify(bodyqsonew.rst));
      let tiempo1;
      let tiempo2;
      let resu;
      let respuesta;
      // session = await Auth.currentSession();
      // console.log("Su token Qso New es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/qsonew';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: bodyqsonew
      };

      tiempo1 = Date.now();
      respuesta = await API.post(apiName, path, myInit);
      //console.log('llamo api QsoNEW!');
      //console.log(respuesta);

      //console.log('EL QSO Number es:' + respuesta.body.message);
      dispatch(fetchingApiSuccess('postQsoNew', respuesta));

      if (respuesta.body.error === 0) {
        //  dispatch(actindicatorPostQsoNewFalse());

        // actualizo el monthly_qso_new en el reducer (user Info)
        dispatch(setUserInfo('monthly_qso_new', respuesta.body.message));

        //console.log('error es 0 y sqlrdsid: ' + respuesta.body.message);
        let aux_sqlrdsid = respuesta.body.message.newqso;

        dispatch(setShareUrlGuid(respuesta.body.message.guid_url));

        //#PUBLISH
        // await dispatch(postQsoQras("ALLQSONEW",respuesta.body.message.newqso, qsoqras,jwtToken));
        //#PUBLISH
        console.log('mediafiles length:' + mediafiles.length);

        if (mediafiles.length > 0) {
          // quiere decir que el usuario saco fotos o grabo audios antes de generarse el sqlrdsid
          update = { sqlrdsid: aux_sqlrdsid, status: 'inprogress' };
          await dispatch(updateMedia('', update, 'sqlrdsid'));
          mediafiles.map((x) => {
            console.log('entro MAP');
            // no permito que se envie el profile porque este ya fue enviado por el usuario
            // pudo haber pasado que el usuario empezo un QSO y luego cambio la foto de su profile
            // entonces cuando sigue con su QSO y el sistema intenta enviar toda la media del QSO evito que
            // se envie el profile.
            // Si el video aun no termino de comprimirse no se puede SUBIR
            if (x.type !== 'profile') {
              // if (x.type==='video' && videoCompressed)
              //    dispatch(uploadMediaToS3(x.name, x.url,x.fileauxProfileAvatar, aux_sqlrdsid, x.description, x.size, x.type, x.rdsUrlS3, x.urlNSFW, x.urlAvatar,  x.date, x.width, x.height,'',x.qra,x.rectime,jwtToken));
              if (x.type === 'audio' || x.type === 'image')
                dispatch(
                  uploadMediaToS3(
                    x.name,
                    x.url,
                    x.fileauxProfileAvatar,
                    aux_sqlrdsid,
                    x.description,
                    x.size,
                    x.type,
                    x.rdsUrlS3,
                    x.urlNSFW,
                    x.urlAvatar,
                    x.date,
                    x.width,
                    x.height,
                    '',
                    x.qra,
                    x.rectime,
                    jwtToken
                  )
                );
            }
            // console.log(x.url)
            //  <Media name={name} imageurl={url} fileauxProfileAvatar={fileauxProfileAvatar} sqlrdsid= {sqlrdsid} description={description} type={type} size={size}
            //  status={status} progress={progress} sent={sent} rdsUrlS3={rdsUrlS3} urlNSFW={urlNSFW} urlAvatar={urlAvatar} date={date} width={width} height={height} />
          });
        }

        //         if(__DEV__)
        //         analytics().logEvent("QSO_DEV", {"SQLRDSID" : respuesta.body.message.newqso, "QRA" : bodyqsonew.qra_owner,
        //         "TYPE" : bodyqsonew.type, "MODE" : bodyqsonew.mode, "BAND" : bodyqsonew.band});
        // else
        //     analytics().logEvent("QSO_PRD", {"SQLRDSID" : respuesta.body.message.newqso, "QRA" : bodyqsonew.qra_owner,
        //       "TYPE" : bodyqsonew.type, "MODE" : bodyqsonew.mode, "BAND" : bodyqsonew.band});
      }

      //#PUBLISH
      //  dispatch(actindicatorPostQsoNewFalse());

      if (bodyqsonew.type === 'POST')
        dispatch(
          updateQsoStatusSentAndSqlRdsId(
            respuesta.body.message.newqso,
            true,
            false,
            false
          )
        );
      else
        dispatch(
          updateQsoStatusSentAndSqlRdsId(
            respuesta.body.message.newqso,
            true,
            true,
            true
          )
        );
    } catch (error) {
      console.log('Api qsonew catch error :');
      console.log(error);
      dispatch(fetchingApiFailure('postQsoNew', error));

      // por si sale por Token Expired, renuevo token y llamo a la API de nuevo
      var session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      // #PUBLICAR remuevo el envio automatico del PostQsoNew, ahora el boton Publicar primero chequea que haya sqlrdsId y si no hay llama a postqsoNew,
      // en la mayoria de casos ya deberia etar creado porque se crea al confirmar una foto o un audio, pero si fallo en ese momento por alguna razon (internet)
      // Publicar chequea eso y llama de nuevo a postQsoNew.
      // dispatch(postQsoNew(bodyqsonew,qsoqras,mediafiles,session.idToken.jwtToken));

      crashlytics().setUserId(bodyqsonew.qra_owner);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) crashlytics().recordError(new Error('postQsoNew_DEV'));
      else crashlytics().recordError(new Error('postQsoNew_PRD'));

      // Handle exceptions
    }
  };
};

// esta API no se usa mas desde que esta el boton PUBLISH
export const postQsoQras = (type, qsoHeader, sqlRdsId, qsoqras, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('postQsoQras'));
    //console.log('ejecuta llamada API POSTqsoQRAS');
    try {
      // session = await Auth.currentSession();
      // //console.log("Su token es: " + session.idToken.jwtToken);
      var arr = [];
      var reformattedArray = qsoqras.map(function (obj) {
        // rObj[obj.clave] = obj.valor;
        arr.push(obj.qra);
      });

      //console.log('SIN FORMATEAR: ' + JSON.stringify(qsoqras));
      //console.log('reformateado: ' + JSON.stringify(arr));

      let apiName = 'superqso';
      let path = '/qsoqraadd';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: { qso: sqlRdsId, qras: arr }
      };

      // ALL quiere decir que se agrego un callsign despues de haberse creado el QSO
      // entonces es una modificacion del post ya publicado con lo cual AVISO con TOAST
      if (type === 'ALL')
        this.toast(I18n.t('qsoActionsPublishingCallsigns'), 2500);

      var respuesta = await API.post(apiName, path, myInit);
      //console.log('llamo api! QSO_QRA_ADD');
      //console.log(respuesta);
      // //console.log("EL QSO Number es:" + respuesta.message);
      dispatch(fetchingApiSuccess('postQsoQras', respuesta));

      if (respuesta.body.error === 0) {
        // dispatch(updateSqlRdsId(respuesta.message));
        //console.log(
        //   'error es 0 y SALIDA de QsoQraADD: ' +
        //     JSON.stringify(respuesta.body.message)
        // );
        //  console.log("FOLLOWING: "+respuesta.message[0].following )

        if (type === 'ALL' || type === 'ALLQSONEW') {
          // actualizo el status de todos los QRAs del QSO como SENT ya que fue enviado a AWS
          //console.log('actualizo TODOS los QRAs');
          var status = { sent: true };
          dispatch(updateQsoQraStatus(status));
        } else {
          // Actualizo solo el QRA que se envio, que es uno solo
          //console.log('actualizo solo un QRA');
          var status = { sent: true };
          dispatch(updateQsoOnlyOneQraStatus(status, arr[0]));
        }

        // llamo a postQsoEdit para pasarle datos de header a la publicacion y flag de publicada
        dispatch(postQsoEdit(qsoHeader, '', jwtToken));
      }
    } catch (error) {
      console.log('Api catch error:', error);
      dispatch(fetchingApiFailure('postQsoQras', error));

      // crashlytics().setUserId(bodyqsonew.qra_owner);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) crashlytics().recordError(new Error('postQsoQras_DEV'));
      else crashlytics().recordError(new Error('postQsoQras_PRD'));
      // Handle exceptions
    }
  };
};

export const updateQsoQraStatus = (status) => {
  return {
    type: UPDATE_QSOQRA_SENT_STATUS,
    sentStatus: status
  };
};

export const updateQsoOnlyOneQraStatus = (status, qra) => {
  return {
    type: UPDATE_ONLYONE_QSOQRA_SENT_STATUS,
    sentStatus: status,
    qra: qra
  };
};

export const qsoPublish = (qsoHeader, qsoqras, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('postQsoPublish'));
    //console.log('ejecuta llamada API QsoPublish');
    try {
      // session = await Auth.currentSession();
      //  //console.log("Su token es: " + session.idToken.jwtToken);

      // formateo qsoqras
      var arr = [];
      var reformattedArray = qsoqras.map(function (obj) {
        // rObj[obj.clave] = obj.valor;
        arr.push(obj.qra);
      });

      //  session = await Auth.currentSession();
      //  dispatch(setToken(session.idToken.jwtToken));

      //console.log('SIN FORMATEAR: ' + JSON.stringify(qsoHeader));

      let apiName = 'superqso';
      let path = '/qsoPublish';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
          mode: qsoHeader.mode,
          band: qsoHeader.band,
          rst: qsoHeader.rst,
          db: qsoHeader.db,
          qso: qsoHeader.sqlrdsid,
          type: qsoHeader.type,
          realDateTime: qsoHeader.realDateTime,
          activityBegin: qsoHeader.activityBegin,
          activityEnd: qsoHeader.activityEnd,
          qras: arr
          // "draft" : 0
        }
      };

      console.log('qsoHeader.realDateTime: ' + qsoHeader.realDateTime);

      var respuesta = await API.post(apiName, path, myInit);
      //console.log('llamo api! QSO_PUBLISH');

      //  //console.log(respuesta);
      dispatch(fetchingApiSuccess('postQsoPublish', respuesta));

      if (respuesta.body.error === 0) {
        // dispatch(updateSqlRdsId(respuesta.message));
        // console.log(
        //   'error es 0 y SALIDA de postQsoPublish: ' +
        //     JSON.stringify(respuesta.body.message)
        // );

        // activo el flag de publicacion y cierra la publicacion actual
        // en la pantalla de QsoScreen redirecciona a Home en el RENDER por el cambio de estado en una variable dentro de actindicatorPostQsoNewFalse()
        dispatch(actindicatorPostQsoNewFalse());
        dispatch(setJustPublished(true));

        setTimeout(() => {
          dispatch(newqsoactiveFalse()); // cierra la publicacion para que el usuario pueda elegir una nueva
          dispatch(resetQso()); // resetea la publicacion
          this.toast(I18n.t('Refreshing'), 3000);
        }, 150);

        // actualizo el status de todos los QRAs del QSO como SENT ya que fue enviado a AWS

        // No tiene sentido actualizar los status si esta API ya envia todo el POST y lo resetea
        // console.log("actualizo el QsoHeaderStatus");
        // dispatch(updateQsoHeaderStatusTrue());

        //  if(__DEV__)
        //     analytics().logEvent("QSO_PUBLISH_DEV", {"SQLRDSID" : qsoHeader.sqlrdsid, "QRA" : qsoHeader.qra,
        //     "TYPE" : qsoHeader.type, "MODE" : qsoHeader.mode, "BAND" : qsoHeader.band});
        //  else
        if (!__DEV__) {
          analytics().logEvent('QSO_PUBLISH_PRD', {
            SQLRDSID: qsoHeader.sqlrdsid,
            QRA: qsoHeader.qra,
            TYPE: qsoHeader.type,
            MODE: qsoHeader.mode,
            BAND: qsoHeader.band
          });
        } else console.log('NO Recording analytics QSO_PUBLISH');
      }
    } catch (error) {
      console.log('Api catch error:', error);
      dispatch(fetchingApiFailure('postQsoPublish', error));

      crashlytics().setUserId(qsoHeader.qra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) crashlytics().recordError(new Error('postQsoPublish_DEV'));
      else crashlytics().recordError(new Error('postQsoPublish_PRD'));

      // Handle exceptions
    }
  };
};

// esta API no se usa mas desde que esta el boton PUBLISH
export const postQsoEdit = (qsoHeader, attribute, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('postQsoEdit'));
    console.log('ejecuta llamada API QsoEdit');
    try {
      // session = await Auth.currentSession();
      //  console.log("Su token es: " + session.idToken.jwtToken);

      console.log('SIN FORMATEAR: ' + JSON.stringify(qsoHeader));

      let apiName = 'superqso';
      let path = '/qsoedit';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
          mode: qsoHeader.mode,
          band: qsoHeader.band,
          rst: qsoHeader.rst,
          db: qsoHeader.db,
          qso: qsoHeader.sqlrdsid,
          type: qsoHeader.type
          // "draft" : 0
        }
      };

      if (attribute === 'type')
        this.toast(I18n.t('qsoActionsPublishingPostType'), 2500);
      if (attribute === 'mode')
        this.toast(I18n.t('qsoActionsPublishingMode'), 2500);
      if (attribute === 'band')
        this.toast(I18n.t('qsoActionsPublishingBand'), 2500);

      var respuesta = await API.post(apiName, path, myInit);
      console.log('llamo api! QSO_EDIT');

      //  console.log(respuesta);
      dispatch(fetchingApiSuccess('postQsoEdit', respuesta));

      if (respuesta.body.error === 0) {
        // dispatch(updateSqlRdsId(respuesta.message));
        console.log(
          'error es 0 y SALIDA de QsoEDITQ: ' +
            JSON.stringify(respuesta.body.message)
        );

        // activo el flag de publicacion y cierra la publicacion actual
        // en la pantalla de QsoScreen redirecciona a Home en el RENDER por el cambio de estado en una variable dentro de actindicatorPostQsoNewFalse()
        dispatch(actindicatorPostQsoNewFalse());
        dispatch(setJustPublished(true));

        setTimeout(() => {
          dispatch(newqsoactiveFalse()); // cierra la publicacion para que el usuario pueda elegir una nueva
          dispatch(resetQso()); // resetea la publicacion
        }, 150);

        // actualizo el status de todos los QRAs del QSO como SENT ya que fue enviado a AWS
        console.log('actualizo el QsoHeaderStatus');

        //  if(__DEV__)
        //     analytics().logEvent("QSOEDIT_DEV", {"SQLRDSID" : qsoHeader.sqlrdsid, "QRA" : qsoHeader.qra,
        //     "TYPE" : qsoHeader.type, "MODE" : qsoHeader.mode, "BAND" : qsoHeader.band});
        //  else
        if (!__DEV__)
          analytics().logEvent('QSOEDIT_PRD', {
            SQLRDSID: qsoHeader.sqlrdsid,
            QRA: qsoHeader.qra,
            TYPE: qsoHeader.type,
            MODE: qsoHeader.mode,
            BAND: qsoHeader.band
          });

        // console.log("Recording analytics QSO edit")

        dispatch(updateQsoHeaderStatusTrue());
      }
    } catch (error) {
      console.log('Api catch error:', error);
      dispatch(fetchingApiFailure('postQsoEdit', error));

      crashlytics().setUserId(qsoHeader.qra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) crashlytics().recordError(new Error('postQsoEdit_DEV'));
      else crashlytics().recordError(new Error('postQsoEdit_PRD'));

      // Handle exceptions
    }
  };
};

export const updateQsoHeaderStatusTrue = () => {
  return {
    type: UPDATE_QSO_HEADER_STATUS
  };
};

export const resetQso = (qsotype) => {
  return {
    type: RESET_QSO,
    qsotype: qsotype
  };
};

export const resetForSignOut = () => {
  return {
    type: RESET_FOR_SIGN_OUT
  };
};

export const deleteMediaInMemory = (name) => {
  return {
    type: DELETE_MEDIA_MEMORY,
    name: name
  };
};

export const updateCommentInMemory = (name, description) => {
  return {
    type: UPDATE_COMMENT_MEMORY,
    name: name,
    description: description
  };
};

export const updateMediaStatus = (filename, status) => {
  return {
    type: UPDATE_MEDIA_STATUS,
    filename: filename,
    status: status
  };
};

export const updateMedia = (filename, update, updateType) => {
  return {
    type: UPDATE_MEDIA,
    filename: filename,
    update: update,
    updatetype: updateType
  };
};

export const deleteQsoQra = (qra) => {
  return {
    type: QSO_QRA_DELETE,
    qra: qra
  };
};

export const manage_notifications = (notiftype, notif, date) => {
  return {
    type: MANAGE_NOTIFICATIONS,
    notifType: notiftype,
    notifications: notif,
    date: date
  };
};

export const managePushToken = (token, qra, state) => {
  return {
    type: MANAGE_PUSH_TOKEN,
    qratoken: qra,
    pushtoken: token,
    tokenstate: state
  };
};

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    jwttoken: token
  };
};

export const deletedFlag = (flag, message) => {
  return {
    type: SET_DELETED_FLAG,
    flag: flag,
    message: message
  };
};

export const setUserInfo = (mode, userInfo) => {
  return {
    type: SET_USER_INFO,
    mode: mode,
    userinfo: userInfo
  };
};

export const postSetProfilePicNSFW = (
  rdslurl,
  urlNSFW,
  urlAvatar,
  filename2,
  fileaux,
  fileauxProfileAvatar,
  identityId,
  qra,
  jwtToken
) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('postSetProfilePicNSFW'));
    console.log('urlNSFW a chequear: ' + urlNSFW);
    try {
      // session = await Auth.currentSession();
      // console.log("Su token es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/qra-set-profile-pic';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
          url: urlNSFW,
          url_avatar: '',
          mode: 'NSFW'
        }
      };

      var respuesta = await API.post(apiName, path, myInit);
      //   console.log("llamo api SetProfilePic!");

      dispatch(fetchingApiSuccess('postSetProfilePicNSFW', respuesta));
      console.log('devuelve SetProfilePic: ' + JSON.stringify(respuesta));

      if (respuesta.body.error === 0) {
        // dispatch(updateSqlRdsId(respuesta.message));
        console.log('PROFILE NO ES PORNO');
        console.log('error es 0 y sqlrdsid: ' + respuesta.message);

        const customPrefix = {
          public: 'myPublicPrefix/',
          protected: '1/',
          private: 'myPrivatePrefix/'
        };

        // subo foto bajo nombre profile.jpg y el avatar tambien ya que no es porno el TMP que envie
        let folder;
        let timeStamp = Date.now();
        let fileauxFinal = fileaux;
        if (Platform.OS === 'ios') {
          fileauxFinal = fileaux.replace('file:///', '');
        }
        console.log('contenido fileauxFinal: ' + fileauxFinal);

        // Envio el profile.jpg

        folder = 'profile/profile_' + timeStamp + '.jpg';
        //folder = 'profile/profile.jpg';

        enBlob = RNFetchBlob.fs
          .readFile(fileauxFinal, 'base64')
          .then((data) => Buffer.from(data, 'base64'));
        //   return this.readFile(fileauxFinal)
        enBlob
          .then((buffer) =>
            Storage.vault.put(folder, buffer, {
              customPrefix,
              level: 'protected'
            })
          )
          .then((result) => {
            console.log('resultado:' + result.key);

            // actualizo SENT como TRUE en mediafile para ese file.
            console.log('actualizo a 0.9');
            update = { sent: true, progress: 0.8 };
            dispatch(updateMedia(fileName2, update, 'item'));

            console.log('subio1 profile.jpg');

            //  console.log("llama a postSetProfilePic");
            //  dispatch(postSetProfilePic(rdslurl, urlAvatar, fileName2));

            // ahora envio el AVATAR
            let urlprofile;
            let urlprofileAvatar;
            let fileauxFinal = fileauxProfileAvatar;
            if (Platform.OS == 'ios') {
              fileauxFinal = fileauxProfileAvatar.replace('file:///', '');
            }
            console.log('contenido fileauxFinal: ' + fileauxFinal);

            folder = 'profile/profile_av_' + timeStamp + '.jpg';
            //folder = 'profile/profile_avatar.jpg';

            enBlob = RNFetchBlob.fs
              .readFile(fileauxFinal, 'base64')
              .then((data) => Buffer.from(data, 'base64'));
            //   return this.readFile(fileauxFinal)
            enBlob
              .then((buffer) =>
                Storage.vault.put(folder, buffer, {
                  customPrefix,
                  level: 'protected'
                })
              )
              .then((result) => {
                console.log('resultado:' + result.key);

                // actualizo SENT como TRUE en mediafile para ese file.
                console.log('actualizo a 0.9');
                update = { sent: true, progress: 0.95 };
                dispatch(updateMedia(fileName2, update, 'item'));

                console.log('subio1 AVATAR');

                console.log('llama a postSetProfilePic');

                urlprofile =
                  identityId + 'profile/profile_' + timeStamp + '.jpg';
                urlprofileAvatar =
                  identityId + 'profile/profile_av_' + timeStamp + '.jpg';

                dispatch(
                  postSetProfilePic(
                    urlprofile,
                    urlprofileAvatar,
                    fileName2,
                    jwtToken
                  )
                );
              })
              .catch((err) => {
                console.log(JSON.stringify(err));
                console.log('fallo el UPLOAD profile_avatar.jpg');

                update = { status: 'failed' };
                dispatch(updateMedia(fileName2, update, 'item'));

                crashlytics().setUserId(qra);
                crashlytics().log('error: ' + JSON.stringify(err));
                if (__DEV__)
                  crashlytics().recordError(new Error('Upload_Avatar_DEV'));
                else crashlytics().recordError(new Error('Upload_Avatar_PRD'));
              });
          })
          .catch((err) => {
            console.log(JSON.stringify(err));
            console.log('fallo el UPLOAD profile.jpg');

            update = { status: 'failed' };
            dispatch(updateMedia(fileName2, update, 'item'));

            crashlytics().setUserId(qra);
            crashlytics().log('error: ' + JSON.stringify(err));
            if (__DEV__)
              crashlytics().recordError(new Error('Upload_profile.jpg_DEV'));
            else crashlytics().recordError(new Error('Upload_profile.jpg_PRD'));
          });

        //   update = {"status": 'sent', "progress": 1}
        //     dispatch(updateMedia(filename2, update));
        //     dispatch(profilePictureRefresh());
      } else {
        if (respuesta.body.error === 1 && respuesta.body.message === 'NSFW') {
          update = { status: 'inappropriate content' };
          // avisa al modal de espera que la photo profile es NSFW
          dispatch(setProfileModalStat('nsfw', 2));
        } else {
          var update = { status: 'failed' };
          // avisa al modal de espera que la photo profile fallo
          dispatch(setProfileModalStat('failed', 3));
        }

        dispatch(updateMedia(filename2, update, 'item'));
      }
    } catch (error) {
      console.log('Api catch error:', error);
      var update = { status: 'failed' };
      dispatch(updateMedia(filename2, update, 'item'));
      dispatch(fetchingApiFailure('postSetProfilePicNSFW', error));
      // Handle exceptions
      crashlytics().setUserId(qra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__)
        crashlytics().recordError(new Error('postSetProfilePicNSFW_DEV'));
      else crashlytics().recordError(new Error('postSetProfilePicNSFW_PRD'));
    }
  };
};

export const postSetProfilePic = (url, urlNSFWavatar, filename2, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('postSetProfilePic'));
    console.log('ejecuta llamada API SetProfilePic');
    try {
      const identityID = await AsyncStorage.getItem('identity');
      // session = await Auth.currentSession();
      // console.log("Su token es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/qra-set-profile-pic';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
          url: url,
          url_avatar: urlNSFWavatar,
          mode: 'PERSIST',
          identityId: identityID
        }
      };

      var respuesta = await API.post(apiName, path, myInit);
      console.log('llamo api SetProfilePic!');

      dispatch(fetchingApiSuccess('postSetProfilePic', respuesta));
      console.log('devuelve SetProfilePic: ' + JSON.stringify(respuesta));

      if (respuesta.body.error === 0) {
        // dispatch(updateSqlRdsId(respuesta.message));
        console.log('PROFILE PERSISTIO');
        console.log('error es 0 y sqlrdsid: ' + respuesta.message);

        //  var update = {"status": "sent", "progress": 1}
        var update = { status: 'sent', progress: 1 };
        dispatch(updateMedia(filename2, update, 'item'));
        dispatch(profilePictureRefresh(urlNSFWavatar));

        // bajo el modal de espera de uplaod de photo profile
        //  dispatch(setProfileModalStat('modal',1));
        dispatch(setSendingProfilePhotoModal(false));
        dispatch(setProfileModalStat('ambos', 0));
      } else {
        if (respuesta.body.error === 1 && respuesta.body.message === 'NSFW')
          var update = { status: 'inappropriate content' };
        else var update = { status: 'failed' };

        dispatch(updateMedia(filename2, update, 'item'));
      }
    } catch (error) {
      console.log('Api catch error:', error);
      var update = { status: 'failed' };
      dispatch(updateMedia(filename2, update, 'item'));
      dispatch(fetchingApiFailure('postSetProfilePic', error));
      // Handle exceptions
      // crashlytics().setUserId(qra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__)
        crashlytics().recordError(new Error('postSetProfilePic_DEV'));
      else crashlytics().recordError(new Error('postSetProfilePic_PRD'));
    }
  };
};

export const get_notifications = (jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('get_notifications'));
    console.log('ejecuta llamada API get_notifications');
    try {
      // session = await Auth.currentSession();
      // console.log("Su token es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/qra-notification';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        } // OPTIONAL
        // body: {

        //      }
      };

      var respuesta = await API.get(apiName, path, myInit);
      // console.log('llamo api get_notifications!');

      dispatch(fetchingApiSuccess('get_notifications', respuesta));
      // console.log('devuelve get_notifications: ' + JSON.stringify(respuesta));

      if (respuesta.body.error === 0) {
        // dispatch(manage_notifications('ADD',respuesta.body.message));
        var ultimaFechaDeIngreso = await AsyncStorage.getItem('ultimafecha');
        if (ultimaFechaDeIngreso === null) {
          var formateo = new Date();
          AsyncStorage.setItem('ultimafecha', formateo.toString());
        } else formateo = new Date(ultimaFechaDeIngreso);

        console.log('ultimafecha getnotifications: ' + formateo);
        dispatch(
          manage_notifications(
            'CALCULOUNREAD',
            respuesta.body.message,
            formateo
          )
        );
      }
    } catch (error) {
      console.log('Api get_notifications catch error:', error);
      dispatch(fetchingApiFailure('get_notifications', error));
      // Actualzio jwtToken por si fallo por Token Expired
      var session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      // crashlytics().setUserId(qra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__)
        crashlytics().recordError(new Error('get_notifications_DEV'));
      else crashlytics().recordError(new Error('get_notifications_PRD'));
    }
  };
};

export const set_notification_read = (notifActivity, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('set_notification_read'));
    console.log('ejecuta llamada API set_notifications');
    console.log('numero de activity:' + notifActivity);
    try {
      // session = await Auth.currentSession();
      // console.log("Su token es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/qra-notification/set-read';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
          //  "idqra_notifications" : notifId
          idactivity: notifActivity
        }
      };

      var respuesta = await API.post(apiName, path, myInit);
      console.log('llamo api set_notifications!');

      dispatch(fetchingApiSuccess('set_notification_read', respuesta));
      console.log('devuelve set_notifications: ' + JSON.stringify(respuesta));

      if (respuesta.body.error === 0) {
        // no importa el resultado porque la igual se la borro antes de redux a la notification
        // esto es para avisar al server, si llega a fallar mala leche, no pasa nada.
      }
    } catch (error) {
      console.log('Api set_notifications catch error:', error);
      dispatch(fetchingApiFailure('set_notification_read', error));
      var session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      // crashlytics().setUserId(qra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__)
        crashlytics().recordError(new Error('set_notifications_DEV'));
      else crashlytics().recordError(new Error('set_notifications_PRD'));
    }
  };
};

export const postPushToken = (token, qra, deviceType, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('postPushToken'));
    // console.log('ejecuta llamada API postPushToken');
    try {
      // se llama aca por si se vencio el token, hay que evitar que falle esta api
      // porque se puede perder la relacion TOKEN de Push con el usuario
      // hay un PLAN B en LoginForm pero es mejor que no falle aca cuando hace SignOut porque
      // el equipo quedaria enviando PUSH a este dispositivo y el usuario no logueo.
      var session = await Auth.currentSession();
      // console.log("Su token es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/push-device';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: session.idToken.jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
          qra: qra,
          token: token,
          device_type: deviceType
        }
      };

      // console.log('llamo api postPushToken!');
      // console.log('qra:' + qra);
      // console.log('deviceType:' + deviceType);
      // console.log('token:' + token);

      var respuesta = await API.post(apiName, path, myInit);

      dispatch(fetchingApiSuccess('postPushToken', respuesta));
      // console.log('devuelve postPushToken: ' + JSON.stringify(respuesta));

      if (respuesta.body.error === 0) {
        // dispatch(updateSqlRdsId(respuesta.message));
        AsyncStorage.setItem('qratoken', qra);
        // console.log('Grabo TokenPush en backend');
        //console.log("error es 0 y sqlrdsid: "+respuesta.message);

        //  var update = {"status": "sent", "progress": 1}
        //  var update = {"status": 'sent', "progress": 1}
        //     dispatch(updateMedia(filename2, update,'item'));
        //     dispatch(profilePictureRefresh());
        // stat = {"sent": true, "progress": 0.8}
        // this.props.updateMediaSent(fileName2,stat);
      } else {
        console.log('Error al Grabar TokenPush en backend');
        // if (respuesta.body.error===1 && respuesta.body.message==='NSFW')
        //   var update = {status: 'inappropriate content'}
        // else
        //    var update = {status: 'failed'}

        // dispatch(updateMedia(filename2, update,'item' ));
      }
    } catch (error) {
      console.log('Api postPushToken catch error:', error);
      // var update = {status: 'failed'}
      // dispatch(updateMedia(filename2, update,'item' ));
      dispatch(fetchingApiFailure('postPushToken', error));
      crashlytics().setUserId(qra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) crashlytics().recordError(new Error('postPushToken_DEV'));
      else crashlytics().recordError(new Error('postPushToken_PRD'));

      // Handle exceptions
    }
  };
};

export const postAddMedia = (mediaToadd, filename2, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('postAddMedia'));
    console.log('ejecuta llamada API Add Media');
    console.log(jwtToken);
    try {
      // var session = await Auth.currentSession();
      // console.log("Su token es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/qsomediaadd';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: mediaToadd
      };

      console.log('URL media es: ' + mediaToadd.url);
      var respuesta = await API.post(apiName, path, myInit);
      console.log('llamo api MediaAdd!');

      dispatch(fetchingApiSuccess('postAddMedia', respuesta));
      console.log('devuelve addmedia: ' + JSON.stringify(respuesta));

      // var auxUrl = mediaToadd.url.replace("https://d3gbqmcrekpw4.cloudfront.net", "");
      var auxUrl = mediaToadd.url.replace(
        'https://d1v72vqgluf2qt.cloudfront.net/protected/',
        ''
      );
      console.log('el auxurl:' + auxUrl);
      if (respuesta.body.error === 0) {
        // dispatch(updateSqlRdsId(respuesta.message));
        console.log('error es 0 y sqlrdsid: ' + respuesta.message);

        //  var update = {"status": "sent", "progress": 1}
        var update = {
          status: 'sent',
          progress: 1,
          idmedia: respuesta.body.message
        };
        dispatch(updateMedia(filename2, update, 'item'));
        // stat = {"sent": true, "progress": 0.8}
        // this.props.updateMediaSent(fileName2,stat);
        // analytics().logEvent("Media_1", {"QRA": mediaToadd.qra, "SQLRDSID" : mediaToadd.sqlrdsid, "QSOTYPE": mediaToadd.qsotype,
        // "BAND": mediaToadd.band, "MODE": mediaToadd.mode, "TYPE" : mediaToadd.type, "SIZE" : mediaToadd.datasize, "URL" : mediaToadd.url, "RECTIME": mediaToadd.rectime});

        //  if(__DEV__)
        //     analytics().logEvent("MEDIA_DEV", {"QRA": mediaToadd.qra, "SQLRDSID" : mediaToadd.qso,
        //    "TYPE" : mediaToadd.type, "SIZE" : mediaToadd.datasize, "URL" : auxUrl, "RECTIME": mediaToadd.rectime, "PORN" : 'false'});
        //  else
        if (!__DEV__)
          analytics().logEvent('MEDIA_PRD', {
            QRA: mediaToadd.qra,
            SQLRDSID: mediaToadd.qso,
            TYPE: mediaToadd.type,
            SIZE: mediaToadd.datasize,
            URL: auxUrl,
            RECTIME: mediaToadd.rectime,
            PORN: 'false'
          });
      } else {
        if (respuesta.body.error === 1 && respuesta.body.message === 'NSFW') {
          var update = { status: 'inappropriate content' };
          // if(__DEV__)
          //   analytics().logEvent("MEDIA_DEV", {"QRA": mediaToadd.qra, "SQLRDSID" : mediaToadd.qso,
          //   "TYPE" : mediaToadd.type, "SIZE" : mediaToadd.datasize, "URL" : auxUrl, "RECTIME": 0, "PORN" : 'true'});
          // else
          if (!__DEV__)
            analytics().logEvent('MEDIA_PRD', {
              QRA: mediaToadd.qra,
              SQLRDSID: mediaToadd.qso,
              TYPE: mediaToadd.type,
              SIZE: mediaToadd.datasize,
              URL: auxUrl,
              RECTIME: 0,
              PORN: 'true'
            });
        } else var update = { status: 'failed' };
        dispatch(updateMedia(filename2, update, 'item'));
      }
    } catch (error) {
      console.log('Api catch error:', error);
      var update = { status: 'failed' };
      dispatch(updateMedia(filename2, update, 'item'));
      dispatch(fetchingApiFailure('postAddMedia', error));
      // Actualzio jwtToken por si fallo por Token Expired
      var session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      // Handle exceptions
      // crashlytics().setUserId(qra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) crashlytics().recordError(new Error('postAddMedia_DEV'));
      else crashlytics().recordError(new Error('postAddMedia_PRD'));
    }
  };
};

export const uploadVideoToS3 = (
  fileName2,
  fileaux,
  fileauxProfileAvatar,
  sqlrdsid,
  description,
  size,
  type,
  rdsUrlS3,
  urlNSFW,
  urlAvatar,
  date,
  width,
  height,
  identityId,
  qra,
  rectime,
  jwtToken
) => {
  return async (dispatch) => {
    //  dispatch(fetchingApiRequest());
    // let nombre = 'pepe_'+Date.now()+'.mp4';

    console.log('ejecuta UPLOAD VIDEO a S3 desde ACTION');
    try {
      // llama API pre signed
      let apiName = 'superqso';
      let path = '/s3presignedpost';
      let myInit = {
        headers: {
          Authorization: jwtToken,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: {
          name: fileName2
        }
      };

      respuesta = await API.post(apiName, path, myInit);

      console.log(respuesta);

      if (respuesta.body.error === false) {
        //  if (1===3)
        auxfile = fileaux.replace('file://', '');
        console.log('fileaux antes de startupload: ' + auxfile);
        const fileInfo = await Upload.getFileInfo(auxfile);
        console.log(fileInfo);
        console.log('fileinfoMimetype: ' + fileInfo.mimeType);
        const options = {
          url: respuesta.body.data.url,
          field: 'file',
          path: auxfile,
          method: 'POST',
          type: 'multipart',
          maxRetries: 2, // set retry count (Android only). Default 2
          headers: {
            'content-type': fileInfo.mimeType
          },
          parameters: {
            'content-type': fileInfo.mimeType,
            key: respuesta.body.data.fields.key,
            bucket: respuesta.body.data.fields.bucket,
            'X-Amz-Algorithm': respuesta.body.data.fields['X-Amz-Algorithm'],
            'X-Amz-Credential': respuesta.body.data.fields['X-Amz-Credential'],
            'X-Amz-Date': respuesta.body.data.fields['X-Amz-Date'],
            'X-Amz-Security-Token':
              respuesta.body.data.fields['X-Amz-Security-Token'],
            Policy: respuesta.body.data.fields.Policy,
            'X-Amz-Signature': respuesta.body.data.fields['X-Amz-Signature']
          },

          // Below are options only supported on Android
          notification: {
            enabled: true
          },
          useUtf8Charset: true
        };

        const identityID = await AsyncStorage.getItem('identity');

        Upload.startUpload(options)
          .then((uploadId) => {
            console.log('Upload started');
            Upload.addListener('progress', uploadId, (data) => {
              console.log(`Progress: ${data.progress}%`);
              if (data.progress > 96) data.progress = 96;
              dispatch(setVideoUploadProgress(Math.floor(data.progress / 1)));
            });
            Upload.addListener('error', uploadId, (data) => {
              console.log(`Error BackgroundUpload: ${data.error}%`);
              dispatch(setVideoUploadProgress(-1));
              dispatch(
                setUploadVideoError(I18n.t('QsoScrUploadingVideoError'))
              );
            });
            Upload.addListener('cancelled', uploadId, (data) => {
              console.log('Cancelled!');
              dispatch(setVideoUploadProgress(-1));
              dispatch(
                setUploadVideoError(I18n.t('QsoScrUploadingVideoError'))
              );
            });
            Upload.addListener('completed', uploadId, (data) => {
              // data includes responseCode: number and responseBody: Object
              console.log('Completed!');
              videoPreviewURL = '';
              folder = 'videos/' + fileName2;
              videoName = folder.replace('.mp4', '.jpg');
              videoPreviewURL = rdsUrlS3.replace('.mp4', '.jpg');

              // actualizo SENT como TRUE en mediafile para ese file.
              update = { sent: true, progress: 0.7 };
              dispatch(updateMedia(fileName2, update, 'item'));

              const customPrefix = {
                public: 'myPublicPrefix/',
                protected: '1/',
                private: 'myPrivatePrefix/'
              };

              // console.log('upload media identityid:' +identityID)

              // Imagen de Preview de Video simplemente la ubico en el mismo bucket mismo nombre de archivo de video pero con extension jpg
              //       videoName =  folder.replace(".mp4", '.jpg');
              //       videoPreviewURL = rdsUrlS3.replace(".mp4", '.jpg');

              let fileauxPreviewImage = fileauxProfileAvatar;
              if (Platform.OS === 'ios') {
                fileauxPreviewImage = fileauxProfileAvatar.replace(
                  'file:///',
                  ''
                );
              }

              enBlob = RNFetchBlob.fs
                .readFile(fileauxPreviewImage, 'base64')
                .then((data) => Buffer.from(data, 'base64'));

              enBlob
                .then((buffer) =>
                  Storage.vault.put(videoName, buffer, {
                    customPrefix,
                    level: 'protected'
                  })
                )
                .catch((error) => {
                  console.log('Foto Preview upload to s3 failed!');
                  dispatch(setVideoUploadProgress(-1));
                  dispatch(
                    setUploadVideoError(I18n.t('QsoScrUploadingVideoError'))
                  );
                })
                .then((result) => {
                  console.log('envio imagePreview:' + result.key);

                  console.log('222 llamo api de media');
                  // procedo a llamar API de addmedia al RDS
                  // fileInfo.size es el verdadero size del archivo despues de comprimir
                  mediaToRds = {
                    qso: sqlrdsid,
                    type: type,
                    datasize: fileInfo.size,
                    datetime: date,
                    width: width,
                    height: height,
                    url: rdsUrlS3,
                    description: description,
                    identityId: identityID,
                    qra: qra,
                    rectime: rectime,
                    videoPreview: videoPreviewURL
                  };

                  dispatch(postAddMedia(mediaToRds, fileName2, jwtToken));
                  // console.log("LLLLLLLLLLL LLamo recien a media: "+ fileName2);
                });
            });
          })
          .catch((err) => {
            console.log('Upload error!', err);
            // por una lado se envia el codigo de error por el procentaje y por otor lado el mensaje
            // porque sino el DidUpdate de QsoScreen no renderea y no actualiza.
            dispatch(setVideoUploadProgress(-1));
            dispatch(setUploadVideoError(I18n.t('QsoScrUploadingVideoError')));
          });
      } else {
        // hubo un error en la llamda de pre signed
        // por una lado se envia el codigo de error por el procentaje y por otor lado el mensaje
        // porque sino el DidUpdate de QsoScreen no renderea y no actualiza.
        dispatch(setVideoUploadProgress(-1));
        dispatch(setUploadVideoError(I18n.t('QsoScrUploadingVideoError')));
      }

      //     let folder;
      //     videoPreviewURL = '';

      //       // const response = await fetch(fileaux);
      //       // const blobi = await response.blob();
      //       update = {"sent": true, "progress": 0.45}
      //       // dispatch(updateMedia(fileName2,update,'item')); descomentar

      //    //agrego native
      //       let fileauxFinal = fileaux;
      //       if (Platform.OS == 'ios')
      //       {
      //         fileauxFinal =  fileaux.replace("file:///", '');
      //       }
      //       console.log('contenido fileauxFinal: '+fileauxFinal);

      //          if (type==='image') folder = 'images/'+fileName2;
      //          if (type==='audio') folder = 'audios/'+fileName2;
      //          if (type==='video') folder = 'videos/'+fileName2;

      //         // if (type==='profile') folder = 'profile/tmp/profile.jpg';
      //         if (type==='profile') folder = 'profile/tmp/'+fileName2;

      //       console.log('folder:'+ folder);
      // //  let a = {"folder": folder}

      // const customPrefix = {
      //   public: 'myPublicPrefix/',
      //   protected: '1/',
      //   private: 'myPrivatePrefix/'
      // };

      // const identityID = await AsyncStorage.getItem('identity');
      // console.log('upload media identityid:' +identityID)

      //, contentType: 'image/png'
      //    enBlob = RNFetchBlob.fs.readFile(fileauxFinal, 'base64').
      //    then(data => Buffer.from(data, 'base64'));
      //   //  console.log(enBlob.buffer);
      //   //  console.log(enBlob)
      // //   return this.readFile(fileauxFinal)
      //    enBlob
      //    .then(buffer =>

      //    Storage.vault.put(folder, buffer, { customPrefix, level: 'protected' }))
      //    .then (result => {
      //             console.log('resultado:'+result.key);
      //           // actualizo SENT como TRUE en mediafile para ese file.
      //           update = {"sent": true, "progress": 0.7}
      //           dispatch(updateMedia(fileName2,update,'item'));

      // si es video subo la imagen del preview que tengo el path en fileauxProfileAvatar
      //     if (type==='video')
      //     {
      //       // simplemente la ubico en el mismo bucket mismo nombre de archivo de video pero con extension jpg
      //       videoName =  folder.replace(".mp4", '.jpg');
      //       videoPreviewURL = rdsUrlS3.replace(".mp4", '.jpg');
      //         enBlob = RNFetchBlob.fs.readFile(fileauxProfileAvatar, 'base64').
      //         then(data => Buffer.from(data, 'base64'));

      //         enBlob
      //  .then(buffer =>
      //         Storage.vault.put(videoName, buffer, { customPrefix, level: 'protected' }))
      //         .then (result => {
      //                  console.log('envio imagePreview:'+result.key);
      //         })

      //       }

      //                 // procedo a llamar API de addmedia al RDS
      //                 mediaToRds = {
      //                   "qso":  sqlrdsid,
      //                   "type": type ,
      //                   "datasize": size,
      //                   "datetime": date,
      //                   "width": width,
      //                   "height": height,
      //                   "url":  rdsUrlS3,
      //                   "description": description,
      //                   "identityId" : identityID,
      //                   "qra": qra,
      //                   "rectime" : rectime,
      //                   "videoPreview" : videoPreviewURL

      //               }
      //            if (type !== 'profile')
      //            {
      //              console.log('imprimo jwt token:');
      //              console.log(jwtToken);
      //               dispatch(postAddMedia(mediaToRds, fileName2,jwtToken));
      //               console.log("LLLLLLLLLLL LLamo recien a media: "+ fileName2);

      // // anda bien Kinesis con el codigo de aca abajo, pasa que vamos a usar Firebase para analytics.

      //             //   console.log('llamo kinesis addmedia')
      //             //   let tiempo = Date.now()
      //             //   resultki = Analytics.record({
      //             //     data: {

      //             //         // The data blob to put into the record
      //             //  //      QRA: 'LU8AJ', timeStamp: tiempo, mediatype: type, url: rdsUrlS3
      //             //  errornumber: '200', errordesc: 'errordesc',  version: 'APP_VER', qra: 'LU9DO', platform: 'Platf.OS', platformversion: 'Platf.Ver' ,timestamp: 'tiempo'

      //             //     },
      //             //     // OPTIONAL
      //             //     partitionKey: 'myPartitionKey',
      //             //     streamName: 'analytic_stream'
      //             // }, 'AWSKinesis');

      //             // console.log('resultado kinesis addmedia:'+ JSON.stringify(resultki));
      //             // console.log('tiempo addmedia:'+tiempo)

      //            }else
      //            {
      //             // modifico la URL debido a que es PROFILE y el primer llamado lo sube a la carpeta
      //             // TMP para verificar si es NSFW
      //             // let cant = rdsUrlS3.lenght - 4;
      //             // console.log('texto menos 4 caracteres: '+rdsUrlS3.substr(0,cant) + ' verdadero '+ rdsUrlS3);
      //             console.log("LLama postSetProfilePicNSFW: ");

      //             dispatch(postSetProfilePicNSFW(rdsUrlS3, urlNSFW, urlAvatar,  fileName2, fileaux, fileauxProfileAvatar,identityId,qra,jwtToken));

      //            }

      // })

      // .catch(err => {
      //   console.log(JSON.stringify(err));
      //   console.log("fallo el UPLOAD UPLOAD UPLOADS3");
      //   console.log("nombre filename:" + fileName2);

      //   update = {"status": 'failed'}
      //   dispatch(updateMedia(fileName2,update,'item'));
      // //  // actualizo token por las dudas que haya fallado por Token Expired
      // //   session = await Auth.currentSession();
      // //   dispatch(setToken(session.idToken.jwtToken));

      // });
    } catch (error) {
      console.log('Api VIDEO UPLOAD S3 catch error:', error);

      update = { status: 'failed' };
      dispatch(updateMedia(fileName2, update, 'item'));
      dispatch(setVideoUploadProgress(-1));
      dispatch(setUploadVideoError(I18n.t('QsoScrUploadingVideoError')));

      // actualizo token por las dudas que haya fallado por Token Expired
      session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));

      //dispatch(fetchingApiFailure(error));
      // Handle exceptions
      crashlytics().setUserId(qra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) crashlytics().recordError(new Error('uploadVideoToS3_DEV'));
      else crashlytics().recordError(new Error('uploadVideoToS3_PRD'));
    }
  };
};

export const uploadMediaToS3 = (
  fileName2,
  fileaux,
  fileauxProfileAvatar,
  sqlrdsid,
  description,
  size,
  type,
  rdsUrlS3,
  urlNSFW,
  urlAvatar,
  date,
  width,
  height,
  identityId,
  qra,
  rectime,
  jwtToken
) => {
  return async (dispatch) => {
    //  dispatch(fetchingApiRequest());
    console.log('ejecuta UPLOAD a S3 desde ACTION');
    try {
      let folder;
      videoPreviewURL = '';

      // const response = await fetch(fileaux);
      // const blobi = await response.blob();
      update = { sent: true, progress: 0.45 };
      dispatch(updateMedia(fileName2, update, 'item'));

      //agrego native
      let fileauxFinal = fileaux;
      if (Platform.OS == 'ios') {
        fileauxFinal = fileaux.replace('file:///', '');
      }
      console.log('contenido fileauxFinal: ' + fileauxFinal);

      if (type === 'image') folder = 'images/' + fileName2;
      if (type === 'audio') folder = 'audios/' + fileName2;
      if (type === 'video') folder = 'videos/' + fileName2;

      // if (type==='profile') folder = 'profile/tmp/profile.jpg';
      if (type === 'profile') folder = 'profile/tmp/' + fileName2;

      console.log('folder:' + folder);
      //  let a = {"folder": folder}

      const customPrefix = {
        public: 'myPublicPrefix/',
        protected: '1/',
        private: 'myPrivatePrefix/'
      };

      const identityID = await AsyncStorage.getItem('identity');
      console.log('upload media identityid:' + identityID);

      //, contentType: 'image/png'
      enBlob = RNFetchBlob.fs
        .readFile(fileauxFinal, 'base64')
        .then((data) => Buffer.from(data, 'base64'));
      //  console.log(enBlob.buffer);
      //  console.log(enBlob)
      //   return this.readFile(fileauxFinal)
      enBlob
        .then((buffer) =>
          Storage.vault.put(folder, buffer, {
            customPrefix,
            level: 'protected'
          })
        )
        .then((result) => {
          console.log('resultado:' + result.key);
          // actualizo SENT como TRUE en mediafile para ese file.
          update = { sent: true, progress: 0.7 };
          dispatch(updateMedia(fileName2, update, 'item'));

          // si es video subo la imagen del preview que tengo el path en fileauxProfileAvatar
          if (type === 'video') {
            // simplemente la ubico en el mismo bucket mismo nombre de archivo de video pero con extension jpg
            videoName = folder.replace('.mp4', '.jpg');
            videoPreviewURL = rdsUrlS3.replace('.mp4', '.jpg');
            enBlob = RNFetchBlob.fs
              .readFile(fileauxProfileAvatar, 'base64')
              .then((data) => Buffer.from(data, 'base64'));

            enBlob
              .then((buffer) =>
                Storage.vault.put(videoName, buffer, {
                  customPrefix,
                  level: 'protected'
                })
              )
              .then((result) => {
                console.log('envio imagePreview:' + result.key);
              });
          }

          // procedo a llamar API de addmedia al RDS
          mediaToRds = {
            qso: sqlrdsid,
            type: type,
            datasize: size,
            datetime: date,
            width: width,
            height: height,
            url: rdsUrlS3,
            description: description,
            identityId: identityID,
            qra: qra,
            rectime: rectime,
            videoPreview: videoPreviewURL
          };
          if (type !== 'profile') {
            console.log('imprimo jwt token:');
            console.log(jwtToken);
            dispatch(postAddMedia(mediaToRds, fileName2, jwtToken));
            console.log('LLLLLLLLLLL LLamo recien a media: ' + fileName2);

            // anda bien Kinesis con el codigo de aca abajo, pasa que vamos a usar Firebase para analytics.

            //   console.log('llamo kinesis addmedia')
            //   let tiempo = Date.now()
            //   resultki = Analytics.record({
            //     data: {

            //         // The data blob to put into the record
            //  //      QRA: 'LU8AJ', timeStamp: tiempo, mediatype: type, url: rdsUrlS3
            //  errornumber: '200', errordesc: 'errordesc',  version: 'APP_VER', qra: 'LU9DO', platform: 'Platf.OS', platformversion: 'Platf.Ver' ,timestamp: 'tiempo'

            //     },
            //     // OPTIONAL
            //     partitionKey: 'myPartitionKey',
            //     streamName: 'analytic_stream'
            // }, 'AWSKinesis');

            // console.log('resultado kinesis addmedia:'+ JSON.stringify(resultki));
            // console.log('tiempo addmedia:'+tiempo)
          } else {
            // modifico la URL debido a que es PROFILE y el primer llamado lo sube a la carpeta
            // TMP para verificar si es NSFW
            // let cant = rdsUrlS3.lenght - 4;
            // console.log('texto menos 4 caracteres: '+rdsUrlS3.substr(0,cant) + ' verdadero '+ rdsUrlS3);
            console.log('LLama postSetProfilePicNSFW: ');

            dispatch(
              postSetProfilePicNSFW(
                rdsUrlS3,
                urlNSFW,
                urlAvatar,
                fileName2,
                fileaux,
                fileauxProfileAvatar,
                identityId,
                qra,
                jwtToken
              )
            );
          }
        });

      // .catch(err => {
      //   console.log(JSON.stringify(err));
      //   console.log("fallo el UPLOAD UPLOAD UPLOADS3");
      //   console.log("nombre filename:" + fileName2);

      //   update = {"status": 'failed'}
      //   dispatch(updateMedia(fileName2,update,'item'));
      // //  // actualizo token por las dudas que haya fallado por Token Expired
      // //   session = await Auth.currentSession();
      // //   dispatch(setToken(session.idToken.jwtToken));

      // });
    } catch (error) {
      console.log('Api UPLOAD S3 catch error:', error);

      update = { status: 'failed' };
      dispatch(updateMedia(fileName2, update, 'item'));

      // actualizo token por las dudas que haya fallado por Token Expired
      session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));

      //dispatch(fetchingApiFailure(error));
      // Handle exceptions
      crashlytics().setUserId(qra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) crashlytics().recordError(new Error('uploadMediaToS3_DEV'));
      else crashlytics().recordError(new Error('uploadMediaToS3_PRD'));
    }
  };
};

toast = async (message, timer) => {
  // Add a Toast on screen.
  let toast = Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    }
  });

  // Toast.hide(toast);
  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
  setTimeout(function () {
    Toast.hide(toast);
  }, timer);
};

export const updateMediaDescription = (mediaid, descrip, name, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('updateMediaDescription'));
    console.log('ejecuta llamada API updateMediaDescription');
    try {
      console.log(mediaid + ' ' + descrip + ' ' + name);

      let apiName = 'superqso';
      let path = '/qsomediadesc';
      let myInit = {
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        },
        body: {
          idmedia: mediaid,
          description: descrip
        }
      };

      this.toast(I18n.t('qsoActionsPublishingDescription'), 2500);

      var respuesta = await API.post(apiName, path, myInit);
      console.log('llamo api updateMediaDescription');

      console.log(JSON.stringify(respuesta));

      dispatch(fetchingApiSuccess('updateMediaDescription', respuesta));

      if (respuesta.body.error === 0) {
        // dispatch(updateSqlRdsId(respuesta.message));
        console.log(
          'error es 0 y SALIDA de updateMediaDescription: ' +
            JSON.stringify(respuesta.body.message)
        );

        //actualizo el comentario de la memoria del mediafiles porque ya se actualizo en el server backend
        var desc = { description: descrip };
        dispatch(updateCommentInMemory(name, desc));
      } else {
        dispatch(
          deletedFlag(
            true,
            'We could not delete the media, please try later or delete from www.superqso.com'
          )
        );
        // crashlytics().log('error: ' + JSON.stringify(error) + ' sqlrdsid: '+ sqlrdsid) ;
        if (__DEV__)
          crashlytics().recordError(new Error('updateMediaDescriptionAPI_DEV'));
        else
          crashlytics().recordError(new Error('updateMediaDescriptionAPI_PRD'));
      }
    } catch (error) {
      console.log('Api catch updateMediaDescription error:', error);
      dispatch(fetchingApiFailure('updateMediaDescription', error));
      dispatch(
        deletedFlag(
          true,
          'We could not delete the post, please try later or delete from www.superqso.com'
        )
      );
      // Handle exceptions
      //crashlytics().setUserId(qra);

      crashlytics().log(
        'error: ' + JSON.stringify(error) + ' sqlrdsid: ' + sqlrdsid
      );
      if (__DEV__)
        crashlytics().recordError(new Error('updateMediaDescription_DEV'));
      else crashlytics().recordError(new Error('updateMediaDescription_PRD'));
    }
  };
};

export const deleteMedia = (mediaid, nameMedia, type, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('DeletePost'));
    console.log('ejecuta llamada API DeletePost');
    try {
      let apiName = 'superqso';
      let path = '/qsomediaadd';
      let myInit = {
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        },
        body: {
          idmedia: mediaid
        }
      };

      // this.toast('Deleting '+type+' from the web ...',2500);
      this.toast(
        type === 'photo'
          ? I18n.t('qsoActionsDeletingPhoto')
          : I18n.t('qsoActionsDeletingAudio'),
        2500
      );
      var respuesta = await API.del(apiName, path, myInit);
      console.log('llamo api deleteMedia');

      console.log(JSON.stringify(respuesta));

      dispatch(fetchingApiSuccess('DeleteMedia', respuesta));

      if (respuesta.body.error === 0) {
        // dispatch(updateSqlRdsId(respuesta.message));
        console.log(
          'error es 0 y SALIDA de DeleteMedia: ' +
            JSON.stringify(respuesta.body.message)
        );

        //borro de mediafiles la mdeia borrada por la API en backend

        dispatch(deleteMediaInMemory(nameMedia));

        // dispatch(newqsoactiveFalse());
        // dispatch(resetQso());
      } else {
        dispatch(
          deletedFlag(
            true,
            'We could not delete the media, please try later or delete from www.superqso.com'
          )
        );
        // crashlytics().log('error: ' + JSON.stringify(error) + ' sqlrdsid: '+ sqlrdsid) ;
        if (__DEV__) crashlytics().recordError(new Error('DeleteMediaAPI_DEV'));
        else crashlytics().recordError(new Error('DeleteMediaAPI_PRD'));
      }
    } catch (error) {
      console.log('Api catch DELETE_POST error:', error);
      dispatch(fetchingApiFailure('DeletePost', error));
      dispatch(
        deletedFlag(
          true,
          'We could not delete the post, please try later or delete from www.superqso.com'
        )
      );
      // Handle exceptions
      //crashlytics().setUserId(qra);
      crashlytics().log(
        'error: ' + JSON.stringify(error) + ' sqlrdsid: ' + sqlrdsid
      );
      if (__DEV__) crashlytics().recordError(new Error('DeleteMedia_DEV'));
      else crashlytics().recordError(new Error('DeleteMedia_PRD'));
    }
  };
};

export const deletePost = (sqlrdsid, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('DeletePost'));
    console.log('ejecuta llamada API DeltePost');
    try {
      let apiName = 'superqso';
      let path = '/qsonew';
      let myInit = {
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        },
        body: {
          qso: sqlrdsid
        }
      };

      this.toast(I18n.t('qsoActionsDeletingCompletePost'), 2000);
      var respuesta = await API.del(apiName, path, myInit);
      console.log('llamo api deletePOST');

      dispatch(fetchingApiSuccess('DeletePost', respuesta));

      if (respuesta.body.error === 0) {
        // dispatch(updateSqlRdsId(respuesta.message));
        console.log(
          'error es 0 y SALIDA de DeletePost: ' +
            JSON.stringify(respuesta.body.message)
        );

        dispatch(newqsoactiveFalse());
        dispatch(resetQso());
        // no aparece este mensaje en el modal porque al limpiar el QSO, limpia todo y no llega a aparecer.
        // pero si falla el delete si aparece el mensaje de error
        // dispatch(deletedFlag(false,''));

        // actualizo el status de todos los QRAs del QSO como SENT ya que fue enviado a AWS
        // console.log("actualizo el QsoQras");

        // dispatch(deleteQsoQra(qra));
      } else {
        dispatch(
          deletedFlag(
            true,
            'We could not delete the post, please try later or delete from www.superqso.com'
          )
        );
        // crashlytics().log('error: ' + JSON.stringify(error) + ' sqlrdsid: '+ sqlrdsid) ;
        if (__DEV__) crashlytics().recordError(new Error('DeletePostAPI_DEV'));
        else crashlytics().recordError(new Error('DeletePostAPI_PRD'));
      }
    } catch (error) {
      console.log('Api catch DELETE_POST error:', error);
      dispatch(fetchingApiFailure('DeletePost', error));
      dispatch(
        deletedFlag(
          true,
          'We could not delete the post, please try later or delete from www.superqso.com'
        )
      );
      // Handle exceptions
      //crashlytics().setUserId(qra);
      crashlytics().log(
        'error: ' + JSON.stringify(error) + ' sqlrdsid: ' + sqlrdsid
      );
      if (__DEV__) crashlytics().recordError(new Error('DeletePost_DEV'));
      else crashlytics().recordError(new Error('DeletePost_PRD'));
    }
  };
};

export const QsoQraDelete = (sqlrdsid, qra, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('QsoQraDelete'));
    console.log('ejecuta llamada API QsoQraDELETE');
    try {
      // var session = await Auth.currentSession();
      //  console.log("Su token es: " + session.idToken.jwtToken);

      //     console.log("SIN FORMATEAR: "+ JSON.stringify(qsoHeader));

      let apiName = 'superqso';
      let path = '/qsoqradel';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
          qso: sqlrdsid,
          qras: [qra]
        }
      };

      this.toast(I18n.t('qsoActionsDeletingCallsign'), 2500);
      var respuesta = await API.post(apiName, path, myInit);
      console.log('llamo api! QsoQraDELETE');

      dispatch(fetchingApiSuccess('QsoQraDelete', respuesta));

      if (respuesta.body.error === 0) {
        // dispatch(updateSqlRdsId(respuesta.message));
        console.log(
          'error es 0 y SALIDA de QsoQraDELETE: ' +
            JSON.stringify(respuesta.body.message)
        );

        // actualizo el status de todos los QRAs del QSO como SENT ya que fue enviado a AWS
        console.log('actualizo el QsoQras');

        dispatch(deleteQsoQra(qra));
      }
    } catch (error) {
      console.log('Api catch DELETE_QSO_QRA error:', error);
      dispatch(fetchingApiFailure('QsoQraDelete', error));
      // Handle exceptions
      //crashlytics().setUserId(qra);
      crashlytics().log(
        'error: ' + JSON.stringify(error) + ' sqlrdsid: ' + sqlrdsid
      );
      if (__DEV__) crashlytics().recordError(new Error('QsoQraDelete_DEV'));
      else crashlytics().recordError(new Error('QsoQraDelete_PRD'));
    }
  };
};

export const setUrlRdsS3 = (identityid, urlrds) => {
  return {
    type: SET_URL_RDS_S3,
    identityid: identityid,
    urlrds: urlrds
  };
};

export const followAdd = (LoggeduserQra, qra, date, jwtToken, qra_avatar) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('followAdd'));
    console.log('ejecuta llamada API followAdd');
    try {
      // var session = await Auth.currentSession();
      // console.log("Su token es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/qra-follower';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
          qra: qra,
          datetime: date
        }
      };

      // actualizo como que el QRA se agrego al Follow para que la UX sea rapida
      // y despues la API lo impacta en la base de datos de forma asincrona.
      following = { following: 'TRUE' };
      dispatch(updateQraUrl(qra, following));
      follow_one = { qra: qra, avatarpic: qra_avatar };
      //follow_one = {"idqrafollowers":398,"idqra":489,"idqra_followed":441,"datetime":"2016-04-28T14:12:00.000Z","qra":"LU9FFF","profilepic":"https://d3gbqmcrekpw4.cloudfront.net/protected/us-east-1%3Aa50c88c0-9448-4d32-8fae-329cd0485888/profile/profile.jpg","avatarpic":"https://d3gbqmcrekpw4.cloudfront.net/protected/us-east-1%3Aa50c88c0-9448-4d32-8fae-329cd0485888/profile/profile_avatar.jpg"}
      console.log(follow_one);
      dispatch(insertFollowings(follow_one, 'ONE'));

      var respuesta = await API.post(apiName, path, myInit);
      console.log('llamo api Follow ADD!');
      //console.log("respuesta API:" + JSON.stringify(respuesta));
      console.log(
        'respuesta API Follow Add:' + JSON.stringify(respuesta.body.message)
      );
      console.log(
        'FOLLOW ANTES de ENTRAR porque ERROR === 0 ' + respuesta.body.error
      );
      if (respuesta.body.error === 0) {
        console.log('FOLLOW entro porque ERROR === 0 ' + respuesta.body.error);
        //  following = {"following": 'TRUE'}
        //  dispatch(updateQraUrl(qra,following));
        dispatch(insertFollowings(respuesta.body.message, 'ALL'));

        // if(__DEV__)
        //     analytics().logEvent("FOLLOW_DEV", {"QRA" : LoggeduserQra, "FOLLOWQRA" : qra});
        // else
        if (!__DEV__)
          analytics().logEvent('FOLLOW_PRD', {
            QRA: LoggeduserQra,
            FOLLOWQRA: qra
          });
      }
      dispatch(fetchingApiSuccess('followAdd', respuesta));
    } catch (error) {
      console.log('Api catch error Follow ADD:', error);
      dispatch(fetchingApiFailure('followAdd', error));

      // es probable que haya fallado por vencimiento de TOKEN y como es Follow y ya se le aviso al usuario que
      // lo esta siguiendo se refresca el token y se llama a la API de nuevo pot ultima vez.
      var session = await Auth.currentSession();
      // console.log('Su token es: ' + session.idToken.jwtToken);
      dispatch(setToken(session.idToken.jwtToken));
      dispatch(
        followAddSecondChance(
          LoggeduserQra,
          qra,
          date,
          session.idToken.jwtToken,
          qra_avatar
        )
      );
      // Handle exceptions
      crashlytics().setUserId(LoggeduserQra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) crashlytics().recordError(new Error('followAdd_DEV'));
      else crashlytics().recordError(new Error('followAdd_PRD'));
    }
  };
};

export const followAddSecondChance = (
  LoggeduserQra,
  qra,
  date,
  jwtToken,
  qra_avatar
) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('followAddSecondChance'));
    console.log('ejecuta llamada API followAdd SecondChance');
    try {
      // var session = await Auth.currentSession();
      // console.log("Su token es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/qra-follower';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
          qra: qra,
          datetime: date
        }
      };

      // actualizo como que el QRA se agrego al Follow para que la UX sea rapida
      // y despues la API lo impacta en la base de datos de forma asincrona.

      // following = {"following": 'TRUE'}
      // dispatch(updateQraUrl(qra,following));
      //   follow_one = {"qra": qra, "avatarpic": qra_avatar}

      //  console.log(follow_one);
      //   dispatch(insertFollowings(follow_one,'ONE'));

      var respuesta = await API.post(apiName, path, myInit);
      console.log('llamo api Follow ADD SecondChance !');
      //console.log("respuesta API:" + JSON.stringify(respuesta));
      console.log(
        'respuesta API Follow Add SecondChance :' +
          JSON.stringify(respuesta.body.message)
      );
      console.log(
        'FOLLOW ANTES de ENTRAR SecondChance porque ERROR === 0 ' +
          respuesta.body.error
      );
      if (respuesta.body.error === 0) {
        console.log(
          'FOLLOW SecondChance entro porque ERROR === 0 ' + respuesta.body.error
        );
        //  following = {"following": 'TRUE'}
        //  dispatch(updateQraUrl(qra,following));
        dispatch(insertFollowings(respuesta.body.message, 'ALL'));

        //  if(__DEV__)
        //   analytics().logEvent("FOLLOW_DEV", {"QRA" : LoggeduserQra, "FOLLOWQRA" : qra});
        // else
        if (!__DEV__)
          analytics().logEvent('FOLLOW_PRD', {
            QRA: LoggeduserQra,
            FOLLOWQRA: qra
          });
      }
      dispatch(fetchingApiSuccess('followAddSecondChance', respuesta));
    } catch (error) {
      console.log('Api catch error Follow ADD SecondChance:', error);
      dispatch(fetchingApiFailure('followAddSecondChance', error));
      following = { following: 'FALSE' };
      dispatch(updateQraUrl(qra, following));
      // Handle exceptions
      crashlytics().setUserId(LoggeduserQra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__)
        crashlytics().recordError(new Error('followAddSecondChance_DEV'));
      else crashlytics().recordError(new Error('followAddSecondChance_PRD'));
    }
  };
};

export const unfollow = (LoggeduserQra, qra, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('unfollow'));
    console.log('ejecuta llamada API UnFollow');
    try {
      // var session = await Auth.currentSession();
      // console.log("Su token es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/qra-follower';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
          qra: qra
        }
      };

      // actualizo como que el QRA le hizo el UnFollow para que la UX sea rapida
      // y despues la API lo impacta en la base de datos de forma asincrona.
      following = { following: 'FALSE' };
      dispatch(updateQraUrl(qra, following));

      var respuesta = await API.del(apiName, path, myInit);
      // console.log('llamo api Follow ADD!');
      // console.log(respuesta);
      // //console.log("respuesta API:" + JSON.stringify(respuesta));
      // console.log(
      //   'respuesta API UnFollow Add:' + JSON.stringify(respuesta.body.message)
      // );
      // console.log(
      //   'unFOLLOW ANTES de ENTRAR porque ERROR === 0 ' + respuesta.body.error
      // );
      if (respuesta.body.error === 0) {
        console.log(
          'unFOLLOW entro porque ERROR === 0 ' + respuesta.body.error
        );
        // following = {"following": 'FALSE'}
        // dispatch(updateQraUrl(qra,following));
        dispatch(insertFollowings(respuesta.body.message, 'ALL'));

        //   if(__DEV__)
        //   analytics().logEvent("UNFOLLOW_DEV", {"QRA" : LoggeduserQra, "UNFOLLOWQRA" : qra});
        //  else
        if (!__DEV__)
          analytics().logEvent('UNFOLLOW_PRD', {
            QRA: LoggeduserQra,
            UNFOLLOWQRA: qra
          });
      }
      dispatch(fetchingApiSuccess('unfollow', respuesta));
    } catch (error) {
      console.log('Api catch error unFollow :', error);
      dispatch(fetchingApiFailure('unfollow', error));
      // Handle exceptions

      // por si se vencio el token lo actualizo para que no falle de nuevo
      var session = await Auth.currentSession();
      // console.log('Su token es: ' + session.idToken.jwtToken);
      dispatch(setToken(session.idToken.jwtToken));

      crashlytics().setUserId(LoggeduserQra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) crashlytics().recordError(new Error('unfollow_DEV'));
      else crashlytics().recordError(new Error('unfollow_PRD'));
    }
  };
};

export const getUserInfo = (jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('getUserInfo'));
    // console.log('ejecuta llamada API getUserInfo');
    // console.log('TOKEN getUserInfo:' + jwtToken);
    try {
      // var session = await Auth.currentSession();
      // console.log("Su token es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/user-info';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        } // OPTIONAL
        //   body: {

        //   }
      };

      var respuesta = await API.get(apiName, path, myInit);
      //  console.log('llamo api getUserInfo');
      //console.log("respuesta API:" + JSON.stringify(respuesta));
      // console.log('respuesta API getUserInfo:');
      // console.log(respuesta);

      if (respuesta.body.error === 0) {
        console.log('ejecuto bien user-info');
        var followings = respuesta.body.message.following;
        var followers = respuesta.body.message.followers;
        //   console.log("la url que envio:" + url);
        //   console.log("EL QRA:" + qra);
        dispatch(fetchingApiSuccess('getUserInfo', respuesta));
        //  dispatch(insertFollowingsFollowers(followings,followers));
        dispatch(setUserInfo('ALL', respuesta.body.message.qra));
        dispatch(insertFollowings(followings, 'ALL'));
        dispatch(insertFollowers(followers));
        if (respuesta.body.message.qra.avatarpic === null) avatar_profile = '';
        else var avatar_profile = respuesta.body.message.qra.avatarpic;

        dispatch(profilePictureRefresh(avatar_profile));
        // dispatch(manage_notifications('ADD',respuesta.body.message.notifications));
        var ultimaFechaDeIngreso = await AsyncStorage.getItem('ultimafecha');
        //  console.log('ultimaFechaDeIngreso log: ' + ultimaFechaDeIngreso);
        if (ultimaFechaDeIngreso === null) {
          var formateo = new Date();
          AsyncStorage.setItem('ultimafecha', formateo.toString());
        } else formateo = new Date(ultimaFechaDeIngreso);
        // formateo2 = new Date(respuesta.body.message.qra.last_login);
        //console.log('ultimafecha getuserInfo: ' + formateo);
        //console.log(respuesta.body.message.notifications);
        // console.log('ultimafecha getuserInfo lastLogin: '+ formateo2);
        dispatch(
          manage_notifications(
            'CALCULOUNREAD',
            respuesta.body.message.notifications,
            formateo
          )
        );
      }
    } catch (error) {
      console.log('Api getUserInfo catch error:', error);
      dispatch(fetchingApiFailure('getUserInfo', error));

      // Handle exceptions
      // crashlytics().setUserId(LoggeduserQra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) crashlytics().recordError(new Error('getUserInfo_DEV'));
      else crashlytics().recordError(new Error('getUserInfo_PRD'));
    }
  };
};

export const updateLocationBackend = (lat, lon, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('updateLocationBackend'));
    // console.log('ejecuta llamada API updateLocationBackend');
    // console.log('TOKEN updateLocationBackend:' + jwtToken);
    try {
      let apiName = 'superqso';
      let path = '/qra-info/location';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
          longitude: lon,
          latitude: lat
        }
      };

      var respuesta = await API.post(apiName, path, myInit);
      // console.log('llamo api updateLocationBackend');

      //   console.log('respuesta API updateLocationBackend:');
      //  console.log(respuesta);

      if (respuesta.body.error === 0) {
        dispatch(fetchingApiSuccess('updateLocationBackend', respuesta));
      }
    } catch (error) {
      console.log('Api updateLocationBackend catch error:', error);
      dispatch(fetchingApiFailure('updateLocationBackend', error));

      // Handle exceptions
      // crashlytics().setUserId(LoggeduserQra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__)
        crashlytics().recordError(new Error('updateLocationBackend_DEV'));
      else crashlytics().recordError(new Error('updateLocationBackend_PRD'));
    }
  };
};

export const insertFollowings = (followings, mode) => {
  return {
    type: INSERT_FOLLOWINGS,
    followings: followings,
    mode: mode
  };
};
export const insertFollowers = (followers) => {
  return {
    type: INSERT_FOLLOWERS,
    followers: followers
  };
};

export const followersAlreadyCalled = (status) => {
  return {
    type: FOLLOWERS_ALREADY_CALLED,
    status: status
  };
};

export const followingsSelected = (selected) => {
  return {
    type: FOLLOWINGS_SELECTED,
    selected: selected
  };
};

export const insertQraSearched = (qras) => {
  return {
    type: QRA_SEARCH,
    qras: qras
  };
};

export const updateLinkQso = (json, scanType) => {
  return {
    type: UPDATE_LINK_QSO,
    json: json,
    scanType: scanType
  };
};

export const getQrasFromSearch = (LoggeduserQra, qraTosearch, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('getQrasFromSearch'));
    console.log('ejecuta llamada API getQrasFromSearch');
    console.log(LoggeduserQra + ' ---- ' + qraTosearch);
    console.log(jwtToken);
    try {
      // var session = await Auth.currentSession();
      // console.log("Su token es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/qra-list-secured';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        },
        body: {
          qra: qraTosearch
        }
      };

      var respuesta = await API.post(apiName, path, myInit);
      if (respuesta.body.message.error === 0) {
        console.log(
          'respuesta API getQrasFromSearch:' + JSON.stringify(respuesta)
        );

        dispatch(insertQraSearched(respuesta.body.message.message));
        // if(__DEV__)
        //   analytics().logEvent("SEARCH_DEV", {"QRA" : LoggeduserQra, "SEARCHED" : qraTosearch});
        //  else
        if (!__DEV__)
          analytics().logEvent('SEARCH_PRD', {
            QRA: LoggeduserQra,
            SEARCHED: qraTosearch
          });
      } else {
        envio = [];
        dispatch(insertQraSearched(envio));
      }

      dispatch(fetchingApiSuccess('getQrasFromSearch', respuesta));
    } catch (error) {
      console.log('Api getQrasFromSearch catch error:', error);
      dispatch(fetchingApiFailure('getQrasFromSearch', error));
      // Handle exceptions

      // por si se vencio el token lo actualizo para que no falle de nuevo
      var session = await Auth.currentSession();
      console.log('Su token es: ' + session.idToken.jwtToken);
      dispatch(setToken(session.idToken.jwtToken));

      crashlytics().setUserId(LoggeduserQra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__)
        crashlytics().recordError(new Error('APIgetQrasFromSearch_DEV'));
      else crashlytics().recordError(new Error('APIgetQrasFromSearch_PRD'));
    }
  };
};

export const checkInternet = () => {
  return async (dispatch) => {
    let res = await NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('devuelve NetInfo:' + connectionInfo.type);
      salida = true;
      if (connectionInfo.type === 'none') {
        console.log('paso por NO hay wifi');
        salida = false;
      }
    });
    return salida;
  };
};

export const getQslScan = (QsoTosearch, ScanType, myQRA, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('getQslScan'));
    console.log('ejecuta llamada API getQSL SCAN');
    if (ScanType === 'qslScan') qslscan = true;
    else qslscan = false;

    try {
      // var session = await Auth.currentSession();
      // console.log("Su token es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/qso-detail-qr';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        },
        body: {
          qso: QsoTosearch,
          scan: qslscan
        }
      };

      var respuesta = await API.post(apiName, path, myInit);

      // {
      console.log('respuesta API getQSL SCAN:' + JSON.stringify(respuesta));
      if (respuesta.body.error === 0) {
        console.log('UPDATE SCANS: ' + respuesta.body.message);
        console.log(respuesta.body.message);
        dispatch(setUserInfo('scans_links', respuesta.body.message));
        respuesta.body.message.qso.datetime = getDateQslScan(
          respuesta.body.message.qso.datetime
        );

        if (respuesta.body.message.qso.type === 'SHARE')
          respuesta.body.message.qso.original[0].datetime = getDateQslScan(
            respuesta.body.message.qso.original[0].datetime
          );

        console.log(
          'respuesta DESPUES DE MODIF FECHA:' + JSON.stringify(respuesta)
        );

        if (ScanType === 'qslScan') {
          dispatch(updateQslScan(respuesta));
          // if(__DEV__)
          //  analytics().logEvent("SCANQR_DEV", {"QRA" : myQRA, "QSOSCANNED" : QsoTosearch});
          // else
          if (!__DEV__)
            analytics().logEvent('SCANQR_PRD', {
              QRA: myQRA,
              QSOSCANNED: QsoTosearch
            });
        } else {
          if (ScanType === 'mainQsoLink') {
            // Esta Scaneando algo relacionado con QsoLink (o Main o agreggadno un QSO al Link del Main)
            let qsolink = {
              idqsos: respuesta.body.message.qso.idqsos,
              qra: respuesta.body.message.qso.qra,
              mode: respuesta.body.message.qso.mode,
              band: respuesta.body.message.qso.band,
              type: respuesta.body.message.qso.type,
              profilepic: respuesta.body.message.qso.profilepic,
              avatarpic: respuesta.body.message.qso.avatarpic,
              qras: respuesta.body.message.qso.qras,
              datetime: respuesta.body.message.qso.datetime,
              error: 0,
              links: []
            };

            if (respuesta.body.message.qso.qra === myQRA)
              dispatch(updateLinkQso(qsolink, 'mainQsoLink'));
            else {
              jsonError = {
                code: 1,
                message: 'The Qso Scanned does not belong to you.'
              };
              dispatch(updateLinkQso(jsonError, 'linkQsoError'));
            }
          } else {
            // es un Qsolink para agregar al mainQso
            let qsolink = {
              idqsos: respuesta.body.message.qso.idqsos,
              qra: respuesta.body.message.qso.qra,
              mode: respuesta.body.message.qso.mode,
              band: respuesta.body.message.qso.band,
              type: respuesta.body.message.qso.type,
              profilepic: respuesta.body.message.qso.profilepic,
              avatarpic: respuesta.body.message.qso.avatarpic,
              qras: respuesta.body.message.qso.qras,
              datetime: respuesta.body.message.qso.datetime
            };

            if (respuesta.body.message.qso.qra !== myQRA)
              dispatch(updateLinkQso(qsolink, 'linkQso'));
            else {
              jsonError = {
                code: 1,
                message:
                  'The QSO you want to link in this STEP must be from other user, not yours.'
              };
              dispatch(updateLinkQso(jsonError, 'linkQsoError'));
            }
          }
        }
      } else {
        // body.error <> 0
        //respuesta.body.error = 1;
        if (ScanType === 'qslScan') dispatch(updateQslScan(respuesta));
        else {
          // let qsolink = {"qra": respuesta.body.message.qra, "mode": respuesta.body.message.mode, "band": respuesta.body.message.band, "type": respuesta.body.message.type,
          // "profilepic": respuesta.body.message.profilepic,  "avatarpic": respuesta.body.message.avatarpic,  "qras": respuesta.body.message.qras,
          //  "datetime": respuesta.body.message.datetime, "error": 1, message: "Sorry, the scanned Qso doesn't exist." }

          // dispatch(updateLinkQso(qsolink,'mainQsoLink'));
          jsonError = { code: 1, message: I18n.t('QSLSCANQR_DOESNTEXISTS') };
          dispatch(updateLinkQso(jsonError, 'linkQsoError'));
        }
      }

      dispatch(fetchingApiSuccess('getQslScan', respuesta));
    } catch (error) {
      console.log('Api get QSL Scan catch error:', error);
      dispatch(fetchingApiFailure('getQslScan', error));
      // Handle exceptions
      // por si se vencio el token lo actualizo para que no falle de nuevo
      var session = await Auth.currentSession();
      console.log('Su token es: ' + session.idToken.jwtToken);
      dispatch(setToken(session.idToken.jwtToken));
      crashlytics().setUserId(myQRA);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) crashlytics().recordError(new Error('APIgetQslScan_DEV'));
      else crashlytics().recordError(new Error('APIgetQslScan_PRD'));
    }
  };
};

export const linkQsos = (qra, json, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('linkQsos'));
    console.log('ejecuta llamada API qso-link');
    try {
      // var session = await Auth.currentSession();
      // console.log("Su token es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/qso-link';

      // armo el array de los qso a Linkear
      arraux = [];
      json.links.map((m, i) => {
        addItem = { qso: m.idqsos };
        arraux = [...arraux, addItem];
      });

      console.log('imprimo el arraux:');
      console.log(json.idqsos);
      console.log(arraux);

      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        },
        body: {
          qso: json.idqsos,
          qsos_rel: arraux
        }
      };

      var respuesta = await API.post(apiName, path, myInit);
      console.log(respuesta);
      if (respuesta.body.error === 0) {
        console.log('respuesta API qso-link:' + JSON.stringify(respuesta));
        console.log(respuesta.body);
        let qsolink = { error: 0 };

        dispatch(updateLinkQso(qsolink, 'linkQsoApiResult'));
        dispatch(setUserInfo('scans_links', respuesta.body.message));

        //  if(__DEV__)
        //    analytics().logEvent("LINKQSO_DEV", {"QRA" : qra, "ERROR" : 'false', "MESSAGE" : ' '});
        // else
        if (!__DEV__)
          analytics().logEvent('LINKQSO_PRD', {
            QRA: qra,
            ERROR: 'false',
            MESSAGE: ' '
          });
      } else {
        console.log('fallo el linkqso man!');
        console.log(respuesta);

        // comente todo pero va todo ...

        let men = '';
        // if (respuesta.body.message.code==='ER_DUP_ENTRY')
        //      men = 'This Qso has already Linked';
        //    else
        men = 'There was an error Linking the Qsos';

        console.log('imprimo en error de /qso-link :' + men);

        jsonError = { code: 1, message: men };
        dispatch(updateLinkQso(jsonError, 'linkQsoError'));
        // if(__DEV__)
        //   analytics().logEvent("LINKQSO_DEV", {"QRA" : qra, "ERROR" : 'true', "MESSAGE" : respuesta.body.message});
        // else
        if (!__DEV__)
          analytics().logEvent('LINKQSO_PRD', {
            QRA: qra,
            ERROR: 'true',
            MESSAGE: respuesta.body.message
          });
      }

      dispatch(fetchingApiSuccess('linkQsos', respuesta));
    } catch (error) {
      // por las dudas si fallo por token expired
      var session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));

      console.log('Api qso-link catch error:', error);
      dispatch(fetchingApiFailure('linkQsos', error));

      // envio mensaje de error para bajar el modal del LINKING QSO ya que queda colgada la APP
      jsonError = {
        code: 1,
        message: 'We could not link the Qsos, please try again'
      };
      dispatch(updateLinkQso(jsonError, 'linkQsoError'));
      // Handle exceptions
      crashlytics().setUserId(qra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) crashlytics().recordError(new Error('APIlinkQsos_DEV'));
      else crashlytics().recordError(new Error('APIlinkQsos_PRD'));
    }
  };
};

export const apiCheckVersion = () => {
  return async (dispatch) => {
    try {
      versionActual = APP_VERSION;
      console.log('esta por llamar a apiVersionCheck desde Action!:');

      //  ApiCall = await fetch('https://api.zxcvbnmasd.com/globalParamsPublic');
      url = global_config.apiEndpoint + '/globalParamsPublic';
      ApiCall = await fetch(url);
      const respuesta = await ApiCall.json();

      console.log('respuesta apiVersionCheck:');
      console.log(respuesta);

      if (respuesta.body.error === 0) {
        console.log('minVersion: ' + respuesta.body.message[0].value);
        v_required = respuesta.body.message[0].value;
        console.log('versionactual:' + versionActual);
        if (versionCompare(v_required, versionActual) === false) {
          // console.log('debe hacer Upgrade de la APP')
          // this.setState({stopApp: true, appNeedUpgrade: true, upgradeText: respuesta.body.message[1].value});
          // this.debeHacerUpgrade = true;
          console.log('necesita upgrade');
          res = { stop: true, message: respuesta.body.message[1].value };
          console.log(res);
          dispatch(setUpgradeApp(true));
          // return res;
        } else {
          // si falla por algun tipo de conectividad no le hago aparecer el cartel.
          console.log('NO necesita upgrade');
          res = {
            stop: false,
            message:
              'We have built new features in order to improve the user experience and we need to upgrade the App.<br/><br/>Please go to the Store and Upgrade.<br/><br/>Sorry for the inconvenient.<br/><br/>Thank you & 73!'
          };
          dispatch(setUpgradeApp(false));
          console.log(res);
          // return res;
        }
      }
    } catch (error) {
      console.log('Api apiVersionCheck catch error:', error);
      //  res = {stop: true, message: 'We have built new features in order to improve the user experience and we need to upgrade the App.<br/><br/>Please go to the Store and Upgrade.<br/><br/>Sorry for the inconvenient.<br/><br/>Thank you & 73!' }

      // Decidi no mostrar el mensaje de UPGRADE APP porque este catch sucede cuando no falla el llamado a la API por falta de internet o conectividad o algo por el estilo
      res = {
        stop: false,
        message:
          'We have built new features in order to improve the user experience and we need to upgrade the App.<br/><br/>Please go to the Store and Upgrade.<br/><br/>Sorry for the inconvenient.<br/><br/>Thank you & 73!'
      };
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) crashlytics().recordError(new Error('apiVersionCheck_DEV'));
      else crashlytics().recordError(new Error('apiVersionCheck_PRD'));

      return res;
    }
  };
};

export const postContactUs = (email, message, jwtToken) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('postContactUs'));
    console.log('ejecuta llamada API postContactUs');
    try {
      let apiName = 'superqso';
      let path = '/contactformsend';
      let myInit = {
        // OPTIONAL
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
          email: email,
          message: message
        }
      };

      var respuesta = await API.post(apiName, path, myInit);
      console.log('llamo api! postContactUs');

      dispatch(fetchingApiSuccess('postContactUs', respuesta));

      if (respuesta.body.error === 0) {
        console.log(
          'error es 0 y SALIDA de postContactUs: ' +
            JSON.stringify(respuesta.body.message)
        );

        console.log('ya envio el mail de contact Us');
        if (__DEV__)
          analytics().logEvent('CONTACTUS_DEV', {
            EMAIL: email,
            MESSAGE: message
          });
        else
          analytics().logEvent('CONTACTUS_PRD', {
            EMAIL: email,
            MESSAGE: message
          });
      } else {
        console.log(
          'hay error en llamado de API ->  de postContactUs: ' +
            JSON.stringify(respuesta.body.message)
        );
        crashlytics().log(
          'error: ' +
            JSON.stringify(respuesta.body.message) +
            ' email: ' +
            email
        );
        if (__DEV__)
          crashlytics().recordError(new Error('body_APIpostContactUs_DEV'));
        else crashlytics().recordError(new Error('body_APIpostContactUs_PRD'));
      }
    } catch (error) {
      console.log('Api catch error:', error);
      dispatch(fetchingApiFailure('postContactUs', error));
      // Handle exceptions
      // crashlytics().setUserId(qra);
      crashlytics().log('error: ' + JSON.stringify(error) + ' email: ' + email);
      if (__DEV__)
        crashlytics().recordError(new Error('catch_APIpostContactUs_DEV'));
      else crashlytics().recordError(new Error('catch_APIpostContactUs_PRD'));
    }
  };
};

export const confirmReceiptiOS = (
  qra,
  originalTranscationId,
  transactionReceipt,
  transactionId,
  environment,
  action
) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('confirmReceiptiOS'));
    console.log('ejecuta llamada API confirmReceiptiOS');
    try {
      let apiName = 'superqso';
      let path = '/iap/ios/verifyreceipt';
      let myInit = {
        // OPTIONAL
        headers: {
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
          qra: qra,
          env: environment,
          transactionId: transactionId,
          originalTransactionId: originalTranscationId,
          action: action,
          transactionReceipt: transactionReceipt
        }
      };

      var respuesta = await API.post(apiName, path, myInit);
      console.log('llamo api! confirmReceiptiOS');

      dispatch(fetchingApiSuccess('confirmReceiptiOS', respuesta));

      if (respuesta.body.error === 0) {
        var session = await Auth.currentSession();
        console.log('Su token es: ' + session.idToken.jwtToken);
        dispatch(setToken(session.idToken.jwtToken));

        console.log('el usuario es Premium ');
        // llamo a getUserInfo asi lo convierto en Premium
        if (action === 'BUY') {
          // respuesta = await API.post(apiName, path, myInit);
          console.log('ejecuto finishTransactionIOS: ' + transactionId);
          console.log('action QRA: ' + qra);
          console.log('action environment: ' + environment);

          RNIap.finishTransactionIOS(transactionId);
          dispatch(getUserInfo(session.idToken.jwtToken));

          //if (buystate){
          console.log('el calltype es BUY');
          dispatch(confirmedPurchaseFlag(true));

          // debo cambiar un flag en redux para que cambie en la pantalla
          // y que avise al usuario que ya es PREMIUM
          // el buy state en TRUE me asegura que el llamado fue hecho porque el usuario
          // acaba de comprar, si es FALSE es porque quedaron pendientes compras sin confirmar
          // y deben ser confirmadas a IOS pero no tengo que avisar nada al usuario, son llamadas
          // que vienen del purchaseUpdatedListener puesto en el QsoScreen.
          // }
        } else {
          // si entra aca es porque hizo un Restore Subscription y dio que el usuario tenia premium
          // llamo a getuserinfo y seteo flags para actualizar las pantallas
          dispatch(getUserInfo(session.idToken.jwtToken));
          dispatch(manageLocationPermissions('iapshowed', 0));
          console.log('ejecuto restoreCall now');

          dispatch(restoreCall(true, 'Your premium subscription is active!'));

          // console.log("el calltype es RESTORE");
          //     setTimeout(() => {
          //       // dentro de un timeout para simular que llamo a la API y que luego
          //       // baje el ActivityIndicator
          //      dispatch(manageLocationPermissions("iapshowed",0));

          //   }
          //   , 2000);
        }
      } else {
        console.log(
          'fallo la validacion del receipt por alguna razon. (Subscripcion cancelada, receipt trucho) '
        );
        if (action === 'RESTORE') {
          dispatch(manageLocationPermissions('iapshowed', 0));
          dispatch(
            restoreCall(true, 'Sorry, we did not find any active subscription.')
          );
        }
      }
    } catch (error) {
      console.log('Api catch confirmReceipt error:', error);
      //   dispatch(fetchingApiFailure('postContactUs',error));
      // Handle exceptions
      crashlytics().setUserId(qra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__)
        crashlytics().recordError(new Error('APIconfirmReceiptIOS_DEV'));
      else crashlytics().recordError(new Error('APIconfirmReceiptIOS_PRD'));
    }
  };
};

export const confirmReceiptAndroid = (
  qra,
  packageName,
  purchaseToken,
  productId,
  environment,
  action,
  ack
) => {
  return async (dispatch) => {
    dispatch(fetchingApiRequest('confirmReceiptAndroid'));
    console.log('ejecuta llamada API confirmReceiptAndroid');
    try {
      let apiName = 'superqso';
      let path = '/iap/android/verifyreceipt';
      let myInit = {
        // OPTIONAL
        headers: {
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
          qra: qra,
          env: environment,
          productId: productId,
          packageName: packageName,
          action: action,
          purchaseToken: purchaseToken
        }
      };

      var respuesta = await API.post(apiName, path, myInit);
      // console.log('llamo api! confirmReceiptAndroid');
      // console.log(respuesta);

      dispatch(fetchingApiSuccess('confirmReceiptAndroid', respuesta));

      if (respuesta.body.error === 0) {
        var session = await Auth.currentSession();
        // console.log('Su token es: ' + session.idToken.jwtToken);
        dispatch(setToken(session.idToken.jwtToken));

        // console.log('el usuario es Premium ');
        // llamo a getUserInfo asi lo convierto en Premium
        if (action === 'BUY') {
          // respuesta = await API.post(apiName, path, myInit);
          console.log('ejecuto ack: ' + purchaseToken);
          console.log('action QRA: ' + qra);
          console.log('action environment: ' + environment);

          try {
            const ackResult = await acknowledgePurchaseAndroid(purchaseToken);
            // console.log('ejecute acknowledgePurchaseAndroid ');
            dispatch(getUserInfo(session.idToken.jwtToken));
            // console.log('el calltype es BUY');
            setTimeout(() => {
              // console.log('bajo el iapmodal con delay 2000');
              dispatch(confirmedPurchaseFlag(true));
            }, 2000);

            //  console.log('ackResult', ackResult);
          } catch (error) {
            console.warn('error: ', error);

            crashlytics().setUserId(qra);
            crashlytics().log('error: ' + JSON.stringify(error));
            if (__DEV__)
              crashlytics().recordError(
                new Error('APIconfirmReceiptAndroid1_DEV')
              );
            else
              crashlytics().recordError(
                new Error('APIconfirmReceiptAndroid1_PRD')
              );
          }

          //if (buystate){

          // debo cambiar un flag en redux para que cambie en la pantalla
          // y que avise al usuario que ya es PREMIUM
          // el buy state en TRUE me asegura que el llamado fue hecho porque el usuario
          // acaba de comprar, si es FALSE es porque quedaron pendientes compras sin confirmar
          // y deben ser confirmadas a IOS pero no tengo que avisar nada al usuario, son llamadas
          // que vienen del purchaseUpdatedListener puesto en el QsoScreen.
          // }
        } else {
          // si entra aca es porque hizo un Restore Subscription y dio que el usuario tenia premium
          // llamo a getuserinfo y seteo flags para actualizar las pantallas

          // confirmo el token por el caso de que haya fallado la compra y el usuario se dirija directo a RESTORE PURCHASE
          // sin haber ejecutado de nuevo la APP porqu en ese caso el DidMount de QsoScreen le confirma la compra.
          if (!ack) {
            const ackResult = await acknowledgePurchaseAndroid(purchaseToken);
          }
          dispatch(getUserInfo(session.idToken.jwtToken));
          dispatch(manageLocationPermissions('iapshowed', 0));
          console.log('ejecuto restoreCall now');

          dispatch(restoreCall(true, 'Your premium subscription is active!'));

          // console.log("el calltype es RESTORE");
          //     setTimeout(() => {
          //       // dentro de un timeout para simular que llamo a la API y que luego
          //       // baje el ActivityIndicator
          //      dispatch(manageLocationPermissions("iapshowed",0));

          //   }
          //   , 2000);
        }
      } else {
        console.log(
          'fallo la validacion del receipt por alguna razon. (Subscripcion cancelada, receipt trucho) '
        );
        if (action === 'RESTORE') {
          dispatch(manageLocationPermissions('iapshowed', 0));
          dispatch(
            restoreCall(true, 'Sorry, we did not find any active subscription.')
          );
        }
      }
    } catch (error) {
      console.log('Api catch confirmReceiptAndroid error:', error);
      //   dispatch(fetchingApiFailure('postContactUs',error));
      // Handle exceptions
      crashlytics().setUserId(qra);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__)
        crashlytics().recordError(new Error('APIconfirmReceiptAndroid2_DEV'));
      else
        crashlytics().recordError(new Error('APIconfirmReceiptAndroid2_PRD'));
    }
  };
};

export const confirmedPurchaseFlag = (purchaseconfirmed) => {
  return {
    type: CONFIRMED_PURCHASE_FLAG,
    purchaseState: purchaseconfirmed
  };
};

export const restoreCall = (call, message) => {
  return {
    type: SET_RESTORE_CALL,
    call: call,
    message: message
  };
};

export const updateQslScan = (qslresult) => {
  return {
    type: UPDATE_QSL_SCAN,
    qslresult: qslresult
  };
};

export const updateQslScanResult = (result) => {
  return {
    type: UPDATE_QSL_SCAN_RESULT,
    result: result
  };
};

export const refreshFollowings = (status) => {
  return {
    type: REFRESH_FOLLOWINGS,
    status: status
  };
};

export const searchQrasLocal = (qratosearch, count) => {
  return {
    type: QRA_SEARCH_LOCAL,
    qratosearch: qratosearch,
    count: count
  };
};

export const setSubscriptionInfo = (productid, localizedprice) => {
  return {
    type: SET_SUBSCRIPTION_INFO,
    productid: productid,
    localizedprice: localizedprice
  };
};

// BEGIN NATIVE FEED
export const doFetchPublicFeed = (qra = null) => {
  // window.gtag('config', 'G-H8G28LYKBY', {
  //   custom_map: { dimension1: 'userQRA' }
  // });
  // if (!qra) {
  //   if (!__DEV__)
  //     window.gtag('event', 'getPublicFeed_WEBPRD', {
  //       event_category: 'User',
  //       event_label: 'getPublicFeed',
  //       userQRA: qra
  //     });
  // } else {
  //   if (!__DEV__)
  //     window.gtag('event', 'getUserFeed_WEBPRD', {
  //       event_category: 'User',
  //       event_label: 'getUserFeed',
  //       userQRA: qra
  //     });
  // }
  return async (dispatch) => {
    dispatch(fetchingApiRequest('doFetchPublicFeed'));

    dispatch(doRequestFeed());
    const apiName = 'superqso';
    const path = '/qso-public-list';
    // const myInit = {
    //   body: {}, // replace this with attributes you need
    //   headers: { 'Content-Type': 'application/json' } // OPTIONAL
    // };
    const myInit = {};
    API.get(apiName, path, myInit)
      .then((response) => {
        // console.log(response);
        if (response.body.error === 0) {
          dispatch(doReceiveFeed(response.body.message));
        } else console.log(response.body.message);
      })
      .catch(async (error) => {
        if (__DEV__) {
          console.log(error.message);
        } else {
          // crashlytics().setUserId(qra);
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__)
            crashlytics().recordError(new Error('getPublicFeed_WEBDEV'));
          else crashlytics().recordError(new Error('getPublicFeed_WEBPRD'));
          // Sentry.configureScope(function (scope) {
          //   scope.setExtra('ENV', process.env.REACT_APP_STAGE);
          // });
          // Sentry.captureException(error);
        }
      });
  };
};
export const doReceiveFeed = (qsos) => {
  return {
    type: RECEIVE_FEED,
    qsos: qsos,
    FetchingQSOS: false,
    qsosFetched: true
  };
};
export const doReceiveFieldDays = (qsos) => {
  return {
    type: RECEIVE_FIELDDAYS,
    fieldDays: qsos,
    FetchingFieldDays: false,
    fieldDaysFetched: true
  };
};
export const doRequestFeed = () => {
  return {
    type: REQUEST_FEED,
    FetchingQSOS: true,
    qsosFetched: false
  };
};
export const doRequestFieldDay = () => {
  return {
    type: REQUEST_FIELDDAYS,
    FetchingFieldDays: true,
    fieldDaysFetched: false
  };
};
export const doFollowFetch = () => {
  return async (dispatch) => {
    try {
      const apiName = 'superqso';
      const path = '/qra/recFollow';
      const myInit = {
        body: { query: 1 }, // replace this with attributes you need
        headers: {
          // Authorization: token
        } // OPTIONAL
      };
      API.post(apiName, path, myInit)
        .then((response) => {
          if (response.body.error === 0) {
            dispatch(doFollowReceive(response.body.message));
          } else console.log(response.body.message);
        })
        .catch(async (error) => {
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__)
            crashlytics().recordError(new Error('doFollowFetch_WEBDEV'));
          else crashlytics().recordError(new Error('doFollowFetch_WEBPRD'));
        });
      //   }
      // );
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      } else {
        crashlytics().log('error: ' + JSON.stringify(error));
        if (__DEV__)
          crashlytics().recordError(new Error('doFollowFetch_WEBDEV'));
        else crashlytics().recordError(new Error('doFollowFetch_WEBPRD'));
      }

      // dispatch(doLogout());
    }
  };
};
export const doFollowReceive = (follow) => {
  return {
    type: FOLLOW_RECEIVE,
    follow: follow
  };
};

export const doFollowQRA = (token, follower) => {
  return async (dispatch) => {
    try {
      let session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      const apiName = 'superqso';
      const path = '/qra-follower';
      const myInit = {
        body: {
          qra: follower,
          datetime: new Date()
        }, // replace this with attributes you need
        headers: {
          Authorization: session.idToken.jwtToken
        } // OPTIONAL
      };
      await API.post(apiName, path, myInit)
        .then((response) => {
          if (response.body.error === 0) {
            dispatch(doReceiveFollowers(response.body.message));
          } else if (__DEV__) {
            console.log(response.body.message);
          }
        })
        .catch(async (error) => {
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__)
            crashlytics().recordError(new Error('doFollowQRA_WEBDEV'));
          else crashlytics().recordError(new Error('doFollowQRA_WEBDEV'));
        });
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      } else {
        crashlytics().log('error: ' + JSON.stringify(error));
        if (__DEV__) crashlytics().recordError(new Error('doFollowQRA_WEBDEV'));
        else crashlytics().recordError(new Error('doFollowQRA_WEBPRD'));
      }

      // dispatch(doLogout());
    }
  };
};

export const doUnfollowQRA = (token, follower) => {
  // if (!__DEV__)
  //   window.gtag('event', 'qraUnfollow_WEBPRD', {
  //     event_category: 'User',
  //     event_label: 'unfollow'
  //   });

  return async (dispatch) => {
    try {
      let session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      const apiName = 'superqso';
      const path = '/qra-follower';
      const myInit = {
        body: {
          qra: follower
        }, // replace this with attributes you need
        headers: {
          Authorization: session.idToken.jwtToken
        } // OPTIONAL
      };
      API.del(apiName, path, myInit)
        .then((response) => {
          if (response.body.error > 0) console.error(response.body.message);
          else dispatch(doReceiveFollowers(response.body.message));
        })
        .catch(async (error) => {
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__)
            crashlytics().recordError(new Error('doUnfollowQRA_WEBDEV'));
          else crashlytics().recordError(new Error('doUnfollowQRA_WEBDEV'));
        });
      //   }
      // );
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      } else {
        crashlytics().log('error: ' + JSON.stringify(error));
        if (__DEV__)
          crashlytics().recordError(new Error('doUnfollowQRA_WEBDEV'));
        else crashlytics().recordError(new Error('doUnfollowQRA_WEBPRD'));
      }

      // dispatch(doLogout());
    }
  };
};
export const doReceiveFollowers = (following) => {
  return {
    type: RECEIVE_FOLLOWERS,
    following: following
  };
};
export const doQsoMediaPlay = (idMedia, token, idqso) => {
  // if (process.env.REACT_APP_STAGE === 'production')
  //   window.gtag('event', 'qsoMediaPlay_WEBPRD', {
  //     event_category: 'QSO',
  //     event_label: 'mediaPlay'
  //   });
  return async (dispatch) => {
    try {
      let session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      const apiName = 'superqso';
      const path = '/qso/media-play';
      const myInit = {
        body: {
          idmedia: idMedia,
          idqso: idqso
        }, // replace this with attributes you need
        headers: {
          Authorization: session.idToken.jwtToken
        } // OPTIONAL
      };
      API.post(apiName, path, myInit)
        .then((response) => {
          if (response.body.error > 0) console.error(response.body.message);
          else dispatch(doReceiveMediaCounter(response.body.message));
        })
        .catch(async (error) => {
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__)
            crashlytics().recordError(new Error('doQsoMediaPlay_WEBDEV'));
          else crashlytics().recordError(new Error('doQsoMediaPlay_WEBPRD'));
        });
      //   }
      // );
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      } else {
        crashlytics().log('error: ' + JSON.stringify(error));
        if (__DEV__)
          crashlytics().recordError(new Error('doQsoMediaPlay_WEBDEV'));
        else crashlytics().recordError(new Error('doQsoMediaPlay_WEBPRD'));
      }
    }
  };
};
export function doReceiveMediaCounter(data) {
  return {
    type: RECEIVE_QSO_MEDIA_COUNTER,
    monthly_audio_play: data
  };
}
export const doRepost = (idqso, token, qso) => {
  return async (dispatch) => {
    // if (process.env.REACT_APP_STAGE === 'production')
    //   window.gtag('event', 'repost_WEBPRD', {
    //     event_category: 'QSO',
    //     event_label: 'repost'
    //   });
    try {
      let session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      const apiName = 'superqso';
      const path = '/qso-share';
      var datetime = new Date();
      const myInit = {
        body: {
          qso: idqso,
          datetime: datetime,
          type: 'SHARE'
        }, // replace this with attributes you need
        headers: {
          Authorization: session.idToken.jwtToken
        } // OPTIONAL
      };
      
      API.post(apiName, path, myInit)
        .then((response) => {
          if (response.body.error !== 0) console.log(response.body.message);
          else {
            dispatch(doFetchPublicFeed());
            // qso.idqso_shared = qso.idqsos;
            // qso.idqsos = response.body.message;
            // qso.type = 'SHARE';
            this.toast(I18n.t('qso.qsoReposted'), 2500);
            // toast.success(i18n.t('qso.qsoReposted'), {
            //   position: toast.POSITION.BOTTOM_RIGHT,
            //   className: css({
            //     background: '#8BD8BD !important'
            //   })
            // });
            // dispatch(doAddRepostToFeed(qso)); #TODO
          }
        })
        .catch(async (error) => {
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__) crashlytics().recordError(new Error('doRepost_WEBDEV'));
          else crashlytics().recordError(new Error('doRepost_WEBDEV'));
        });
      //   }
      // );
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      } else {
        crashlytics().log('error: ' + JSON.stringify(error));
        if (__DEV__) crashlytics().recordError(new Error('doRepost_WEBDEV'));
        else crashlytics().recordError(new Error('doRepost_WEBDEV'));
      }
    }
  };
}

export function doLikeQSO(
  idqso,
  idqra,
  qra,
  firstname,
  lastname,
  avatarpic,
  idqso_shared
) {
  return {
    type: QSO_LIKE,
    idqso,
    idqra,
    qra,
    firstname,
    lastname,
    avatarpic,
    idqso_shared
  };
}
export function doUnlikeQSO(idqso, idqra, idqso_shared) {
  return {
    type: QSO_UNLIKE,
    idqso,
    idqra,
    idqso_shared
  };
}
export function doCommentDelete(idcomment, idqso, token, idqso_shared) {
  return async (dispatch) => {
    // if (process.env.REACT_APP_STAGE === 'production')
    //   window.gtag('event', 'qsoCommentDel_WEBPRD', {
    //     event_category: 'QSO',
    //     event_label: 'commentDel'
    //   });
    dispatch(doCommentDeleteResponse(idcomment, idqso, idqso_shared));
    try {
      let session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      const apiName = 'superqso';
      const path = '/qso-comment';
      const myInit = {
        body: {
          idcomment: idcomment,
          qso: idqso
        }, // replace this with attributes you need
        headers: {
          Authorization: session.idToken.jwtToken
        } // OPTIONAL
      };
      API.del(apiName, path, myInit)
        .then((response) => {
          if (response.body.error === 0) {
          } else console.log(response.body.message);
        })
        .catch(async (error) => {
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__)
            crashlytics().recordError(new Error('doCommentDelete_WEBDEV'));
          else crashlytics().recordError(new Error('doCommentDelete_WEBDEV'));
        });
      //   }
      // );
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      } else {
        crashlytics().log('error: ' + JSON.stringify(error));
        if (__DEV__)
          crashlytics().recordError(new Error('doCommentDelete_WEBDEV'));
        else crashlytics().recordError(new Error('doCommentDelete_WEBDEV'));
      }
    }
  };
}
export function doCommentAdd(idqso, comment, token, idqso_shared) {
  return async (dispatch) => {
    // if (process.env.REACT_APP_STAGE === 'production')
    //   window.gtag('event', 'qsoCommentAdd_WEBPRD', {
    //     event_category: 'QSO',
    //     event_label: 'commentAdd'
    //   });
    let m;
    const regex = /(?:^|[ ])@([a-zA-Z0-9]+)/;

    let message = comment.comment;

    do {
      m = regex.exec(comment.comment);
      if (m) {
        var oldWord = '@' + m[1];

        comment.comment = comment.comment.replace(
          new RegExp(oldWord, 'g'),
          '<MENTION>' + '@' + m[1] + '</MENTION>'
        );
      }
    } while (m);

    dispatch(doCommentAddResponse(idqso, comment, idqso_shared));
    try {
      let session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      const apiName = 'superqso';
      const path = '/qso-comment';
      const myInit = {
        body: {
          qso: idqso_shared ? idqso_shared : idqso,
          comment: message,
          datetime: comment.datetime
        }, // replace this with attributes you need
        headers: {
          Authorization: session.idToken.jwtToken
        } // OPTIONAL
      };
      API.post(apiName, path, myInit)
        .then((response) => {
          if (response.body.error === 0) {
            dispatch(
              doCommentAddApiResponse(
                idqso,
                comment,
                response.body.message,
                idqso_shared
              )
            );
          } else console.log(response.body.message);
        })
        .catch((error) => {
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__)
            crashlytics().recordError(new Error('doCommentAdd_WEBDEV'));
          else crashlytics().recordError(new Error('doCommentAdd_WEBDEV'));
        });
      //   }
      // );
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      } else {
        crashlytics().log('error: ' + JSON.stringify(error));
        if (__DEV__)
          crashlytics().recordError(new Error('doCommentAdd_WEBDEV'));
        else crashlytics().recordError(new Error('doCommentAdd_WEBDEV'));
      }
    }
  };
}
export function doCommentAddApiResponse(
  idqso = null,
  comment,
  idcomment,
  idqso_shared
) {
  return {
    type: COMMENT_ADD_UPDATE,
    idqso,
    comment: { ...comment, idqsos_comments: idcomment },
    idqsos_comments: idcomment,
    idqso_shared
  };
}
export function doCommentAddResponse(idqso, comment, idqso_shared) {
  return {
    type: COMMENT_ADD,
    idqso,
    comment,
    idqso_shared
  };
}
export function doCommentDeleteResponse(
  idcomment = null,
  idqso = null,
  idqso_shared
) {
  return {
    type: COMMENT_DELETE,
    idcomment,
    idqso,
    idqso_shared
  };
}
export function clearQRA() {
  return {
    type: CLEAR_QRA
  };
}
export function doFetchQRA(qra, token = null) {
  // window.gtag('config', 'G-H8G28LYKBY', {
  //   custom_map: { dimension3: 'qra' }
  // });

  // if (process.env.REACT_APP_STAGE === 'production')
  //   window.gtag('event', 'qraGetDetail_WEBPRD', {
  //     event_category: 'QRA',
  //     event_label: 'getDetail',
  //     qra: qra
  //   });

  return async (dispatch) => {
    try {
      let session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      const apiName = 'superqso';
      const path = '/qra-info/secured';
      const myInit = {
        body: {
          qra: qra
        }, // replace this with attributes you need
        headers: {
          Authorization: session.idToken.jwtToken
        } // PTIONAL
      };
      dispatch(doRequestQRA());
      API.post(apiName, path, myInit)
        .then((response) => {
          dispatch(doReceiveQRA(response.body.message, response.body.error));
        })
        .catch(async (error) => {
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__) {
            console.log(error.message);
            crashlytics().recordError(new Error('doCommentAdd_WEBDEV'));
          } else crashlytics().recordError(new Error('doCommentAdd_WEBDEV'));
        });
      //   }
      // );
    } catch (error) {
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) {
        console.log('Unable to refresh Token');
        console.log(error);
        crashlytics().recordError(new Error('doCommentAdd_WEBDEV'));
      } else crashlytics().recordError(new Error('doCommentAdd_WEBDEV'));

      // dispatch(doLogout());
    }
  };
}
export function doRequestQRA() {
  return {
    type: REQUEST_QRA,
    FetchingQRA: true,
    QRAFetched: false
  };
}
export function doReceiveQRA(data, error) {
  const { monthly_qra_views, ...qraData } = data;
  if (error === 0 && qraData.qra.disabled === 0) {
    return {
      type: RECEIVE_QRA,
      qra: qraData,
      FetchingQRA: false,
      monthly_qra_views: monthly_qra_views,
      QRAFetched: true
    };
  } else {
    if (error === 1) {
      return {
        type: RECEIVE_QRA_ERROR,
        error: data
      };
    } else {
      return {
        type: RECEIVE_QRA_ERROR,
        error: 'QRA is disabled temporarily'
      };
    }
  }
}

export function doRequestQSO() {
  return {
    type: REQUEST_QSO
  };
}
export function doFetchQSO(idqso, token = null) {
  // window.gtag('config', 'G-H8G28LYKBY', {
  //   custom_map: { dimension2: 'qso' }
  // });

  // if (process.env.REACT_APP_STAGE === 'production')
  //   window.gtag('event', 'qsoGetDetail_WEBPRD', {
  //     event_category: 'QSO',
  //     event_label: 'getDetail',
  //     qso: idqso
  //   });

  return async (dispatch) => {
    try {
      let session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      const apiName = 'superqso';
      const path = '/qso-detail/secured';
      const myInit = {
        body: {
          guid: idqso
        }, // replace this with attributes you need
        headers: {
          Authorization: session.idToken.jwtToken
        } // OPTIONAL
      };
      API.post(apiName, path, myInit)
        .then((response) => {
          dispatch(doReceiveQSO(response.body.message, response.body.error));
        })
        .catch(async (error) => {
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__) {
            console.log(error.message);
            crashlytics().recordError(new Error('doFetchQSO_WEBDEV'));
          } else crashlytics().recordError(new Error('doFetchQSO_WEBDEV'));
        });
      //   }
      // );
    } catch (error) {
      console.log('Unable to refresh Token');
      console.log(error);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) {
        console.log(error.message);
        crashlytics().recordError(new Error('doFetchQSO_WEBDEV'));
      } else crashlytics().recordError(new Error('doFetchQSO_WEBDEV'));
      // dispatch(doLogout());
    }
  };
}
export function doReceiveQSO(data, error) {
  const { monthly_qso_views, ...qsoData } = data;
  if (error === 0) {
    return {
      type: RECEIVE_QSO,
      qso: qsoData,
      monthly_qso_views: monthly_qso_views
    };
  } else {
    return {
      type: RECEIVE_QSO_ERROR,
      error: data
    };
  }
}
export function doSaveUserInfo(token, qra) {
  return async (dispatch) => {
    // if (process.env.REACT_APP_STAGE === 'production')
    //   window.gtag('event', 'UserInfoUpdate_WEBPRD', {
    //     event_category: 'User',
    //     event_label: 'UserInfoUpdate'
    //   });
    try {
      // const currentSession = await Auth.currentSession();
      // const token = await currentSession.getIdToken().getJwtToken();

      // dispatch(refreshToken(token));
      let session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      dispatch(doRequestUserInfo());
      dispatch(doReceiveUserDataInfo(qra));
      const apiName = 'superqso';
      const path = '/qra-info/info';
      const myInit = {
        body: {
          qra
        }, // replace this with attributes you need
        headers: {
          Authorization: session.idToken.jwtToken
        } // OPTIONAL
      };
      API.post(apiName, path, myInit)
        .then((response) => {
          if (response.body.error !== 0) {
            console.log(response.body.message);
          }
          // else dispatch(doReceiveUserDataInfo(response.body.message));
        })
        .catch(async (error) => {
          console.log(error);
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__) {
            console.log(error.message);
            crashlytics().recordError(new Error('doSaveUserInfo_DEV'));
          } else crashlytics().recordError(new Error('doSaveUserInfo_PRD'));
        });
      //   }
      // );
    } catch (error) {
      console.log(error);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) {
        console.log(error.message);
        crashlytics().recordError(new Error('doSaveUserInfo_DEV'));
      } else crashlytics().recordError(new Error('doSaveUserInfo_PRD'));
      // dispatch(doLogout());
    }
  };
}
export function doRequestUserInfo() {
  return {
    type: REQUEST_USERINFO,
    fetchingUser: true,
    userFetched: false
  };
}

export function doReceiveUserInfo(
  followers = null,
  following = null,
  qra = null,
  notifications = null
) {
  return {
    type: RECEIVE_USERINFO,
    followers: followers,
    following: following,
    notifications: notifications,
    qra: qra,
    fetchingUser: false,
    userFetched: true
  };
}
export function doReceiveUserDataInfo(qra) {
  return {
    type: RECEIVE_USER_DATA_INFO,
    qra: qra
  };
}
export function doSaveUserBio(token, bio, identityId) {
  return async (dispatch) => {
    // if (process.env.REACT_APP_STAGE === 'production')
    //   window.gtag('event', 'UserBioUpdate_WEBPRD', {
    //     event_category: 'User',
    //     event_label: 'UserBioUpdate'
    //   });
    try {
      let session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      dispatch(doReceiveUserBio(bio));
      const apiName = 'superqso';
      const path = '/qra-info/bio';
      const myInit = {
        body: {
          bio: bio,
          identityId: identityId
        }, // replace this with attributes you need
        headers: {
          Authorization: session.idToken.jwtToken
        } // OPTIONAL
      };

      API.post(apiName, path, myInit)
        .then((response) => {
          // if (response.body.error !== 0) console.log(response.body.message);
          // else);
        })
        .catch(async (error) => {
          console.log(error);
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__) {
            console.log(error.message);
            crashlytics().recordError(new Error('doSaveUserBio_WEBDEV'));
          } else crashlytics().recordError(new Error('doSaveUserBio_WEBPRD'));
        });
      //   }
      // );
    } catch (error) {
      console.log(error);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) {
        console.log(error.message);
        crashlytics().recordError(new Error('doSaveUserBio_WEBDEV'));
      } else crashlytics().recordError(new Error('doSaveUserBio_WEBPRD'));
    }
  };
}
export function doReceiveUserBio(bio) {
  return {
    type: RECEIVE_USER_BIO,
    bio: bio
  };
}
export function doPauseVideo(idqsos) {
  return {
    type: PAUSE_VIDEO,
    idqsos
  };
}
export function doFetchFieldDaysFeed(qra = null) {
  // console.log('doFetchPublicFeed');
  // window.gtag('config', 'G-H8G28LYKBY', {
  //   custom_map: { dimension1: 'userQRA' }
  // });

  // if (process.env.REACT_APP_STAGE === 'production')
  //   window.gtag('event', 'getFieldDaysFeed_WEBPRD', {
  //     event_category: 'User',
  //     event_label: 'getFieldDaysFeed',
  //     userQRA: qra
  //   });

  return async (dispatch) => {
    dispatch(doRequestFieldDay());
    const apiName = 'superqso';
    const path = '/qsoGetByType';
    const myInit = {
      body: { type: 'FLDDAY' }, // replace this with attributes you need
      headers: {} // OPTIONAL
    };
    API.post(apiName, path, myInit)
      .then((response) => {
        // console.log(response);
        if (response.body.error === 0) {
          dispatch(doReceiveFieldDays(response.body.message));
        } else console.log(response.body.message);
      })
      .catch((error) => {
        console.log(error);
        crashlytics().log('error: ' + JSON.stringify(error));
        if (__DEV__) {
          console.log(error.message);
          crashlytics().recordError(new Error('doFetchFieldDaysFeed_WEBDEV'));
        } else
          crashlytics().recordError(new Error('doFetchFieldDaysFeed_WEBPRD'));
      });
  };
}
export function doDeleteQso(idqso, token) {
  return async (dispatch) => {
    // if (process.env.REACT_APP_STAGE === 'production')
    //   window.gtag('event', 'qsoDelete_WEBPRD', {
    //     event_category: 'QSO',
    //     event_label: 'delete'
    //   });
    try {
      let session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      dispatch(doDeleteQsoResponse(idqso));
      const apiName = 'superqso';
      const path = '/qsonew';
      const myInit = {
        body: {
          qso: idqso
        }, // replace this with attributes you need
        headers: {
          Authorization: session.idToken.jwtToken
        } // OPTIONAL
      };
      API.del(apiName, path, myInit)
        .then((response) => {
          if (response.body.error === 0) {
            // this.toast(I18n.t('qso.qsoDeleted'), 2500);
            // dispatch(doDeleteQsoResponse(idqso));
          } else console.log(response.body.message);
        })
        .catch(async (error) => {
          console.log(error);
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__) {
            console.log(error.message);
            crashlytics().recordError(new Error('doDeleteQSO_WEBDEV'));
          } else crashlytics().recordError(new Error('doDeleteQSO_WEBPRD'));
        });
      //   }
      // );
    } catch (error) {
      console.log(error);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) {
        console.log(error.message);
        crashlytics().recordError(new Error('doDeleteQSO_WEBDEV'));
      } else crashlytics().recordError(new Error('doDeleteQSO_WEBPRD'));
    }
  };
}

export function doDeleteQsoResponse(idqso = null) {
  return {
    type: DELETE_QSO,
    idqso: idqso
  };
}

export const setFeedTouchable = (status) => {
  return {
    type: SET_FEEDTOUCHABLE,
    status: status
  };
};
export function doLatestUsersFetch() {
  return async (dispatch) => {
    // if (process.env.REACT_APP_STAGE === 'production')
    //   window.gtag('event', 'getLatestUsers_WEBPRD', {
    //     event_category: 'User',
    //     event_label: 'getLatestUsers'
    //   });
    try {
      // const currentSession = await Auth.currentSession();
      // const token = await currentSession.getIdToken().getJwtToken();
      // dispatch(refreshToken(token));
      // dispatch(doFollowRequest());
      const apiName = 'superqso';
      const path = '/qra/recFollow';
      const myInit = {
        body: { query: 2 }, // replace this with attributes you need
        headers: {
          // Authorization: token
        } // OPTIONAL
      };
      API.post(apiName, path, myInit)
        .then((response) => {
          if (response.body.error === 0) {
            dispatch(doLatestUsersReceive(response.body.message));
          } else console.log(response.body.message);
        })
        .catch(async (error) => {
          console.log(error);
          crashlytics().log('error: ' + JSON.stringify(error));
          if (__DEV__) {
            console.log(error.message);
            crashlytics().recordError(new Error('doLatestUsersFetch_WEBDEV'));
          } else
            crashlytics().recordError(new Error('doLatestUsersFetch_WEBPRD'));
        });
      //   }
      // );
    } catch (error) {
      console.log(error);
      crashlytics().log('error: ' + JSON.stringify(error));
      if (__DEV__) {
        console.log(error.message);
        crashlytics().recordError(new Error('doLatestUsersFetch_WEBDEV'));
      } else crashlytics().recordError(new Error('doLatestUsersFetch_WEBPRD'));
    }
  };
}
export function doLatestUsersReceive(follow) {
  return {
    type: LATEST_USERS_RECEIVE,
    follow: follow
  };
}
// END NATIVE FEED
