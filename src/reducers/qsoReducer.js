/* eslint-disable no-undef */
import {
  ACT_INDICATOR_IMAGE_ENABLED,
  ACT_INDICATOR_POST_QSO_NEW_FALSE,
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
  CLEAR_QSO,
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
  QSO_DISLIKE,
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
  RECEIVE_QSO_MEDIA_COUNTER,
  RECEIVE_USERINFO,
  RECEIVE_USER_BIO,
  RECEIVE_USER_DATA_INFO,
  REFRESH_FOLLOWINGS,
  REPOST_QSO,
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
  UPDATE_QSOQRA_SENT_STATUS,
  UPDATE_QSO_HEADER_STATUS
} from '../actions/types';
import global_config from '../global_config.json';
import I18n from '../utils/i18n';

const initialState = {
  qra: '',
  isFetching: false,
  errorApiMessage: '',
  apiSuccessMessage: '',
  camerapermission: false,
  audiorecordingpermission: false,
  newqsoactive: false,
  urlRdsS3: '',
  identityId: '',
  profilePicRefresh: '',
  profileUrlCondition: true,
  stopAllAudios: false,
  jwtToken: '',
  pushToken: '',
  notificationsUnread: 0,
  userInfo: {},
  isFetchingUserInfo: false,
  userInfoApiSuccesMessage: '',
  userInfoApiSuccesStatus: false,
  userInfoApiErrorMessage: '',
  qsoScreenDidmount: true,
  currentLocationPermission: false,
  adShowed: false,
  photoFromGallery: 0,
  qsoScreenDidMountFirstTime: true,
  welcomeUserFirstTime: false,
  confirmedPurchaseFlag: false,
  productId: '',
  localizedPrice: 0,
  iapShowed: 0,
  env: 'QA',
  restoreCalled: false,
  restoreMessage: '',
  sendingProfileModal: false,
  confirmProfileModal: false,
  sendingProfileModal_stat: 0,
  cancelButton_stat: 0,
  webviewSession: '',
  webviewUrl: global_config.urlWeb,
  pressHome: 1,
  justPublished: false,
  externalShareUrl: false,
  mustUpgradeApp: false,

  currentQso: {
    sqlrdsId: '',
    onProgress: false,
    datetime: '',
    //      qsoqras: [{name: 'LU8AJ', url: 'https://randomuser.me/api/portraits/thumb/men/81.jpg'},
    //               {name: 'LW5AAA', url: 'https://randomuser.me/api/portraits/med/men/72.jpg'}],
    qsoqras: [],
    qsocallsigns: [],
    qsotype: 'QSO',
    qsotypeSent: false,
    band: I18n.t('ReducerBand'),
    bandSent: false,
    mode: I18n.t('ReducerMode'),
    modeSent: false,
    rst: '59',
    db: '-07',
    // rstBeforeChangeMode: '-07',
    digitalMode: false,
    mediafiles: [{ name: 'vacio', type: 'vacio' }],
    modalconfirmphoto: false,
    phototype: '',
    modalconfirmphotoHeight: 0,
    modalrecording: false,
    mediatosend: {},
    activityindicatorImage: false,
    activityindicatorPostQsoNew: false,
    qraDeleted: false,
    followings: [],
    followers: [],
    notifications: [],
    notifBackground: false,
    followersAlreadyCalled: false,
    followingsSelected: true,
    qraSearched: [],
    qraShow: [],
    localSearch: '',
    deletedFlag: false,
    deletedFlagMessage: '',
    qslscan: {
      statusCode: 200,
      headers: {},
      body: {
        error: 5,
        message: {}
      }
    },
    qsolink: {},
    qsolinkCodes: { code: 0, message: ' ' },
    refreshFollowings: false,
    latitude: 0,
    longitude: 0,
    shareUrlGuid: '',

    //  },
    videoPercentage: 0,
    videoUploadError: ''
  },
  feed: {
    userData: {
      currentQRA: null,
      token: null,
      qra: {
        accountType: null,
        profilepic: null,
        avatarpic: null
      },
      identityId: null,
      authenticating: false,

      following: [],
      followers: [],
      notifications: [],

      fetchingUser: false,
      userFetched: false
    },
    qsos: [],
    FetchingQSOS: false,
    qsosFetched: false,
    fieldDays: [],
    FetchingFieldDays: false,
    fieldDaysFetched: false,
    qso: null,
    qso_link: null,
    FetchingQSO: false,
    QSOFetched: false,
    qsoError: null,
    qra: null,
    FetchingQRA: false,
    QRAFetched: false,
    qraError: null,
    followFetched: false,
    followFetching: false,
    follow: null,
    latestUsers: null,
    embeddedSession: false
  }
};

function filterQras(arr, qratosearch) {
  return arr.filter((arr1) => {
    return arr1.qra.includes(qratosearch);
  });
}

const qsoReducer = (state = initialState, action) => {
  let newStore;
  let auxcurrentQso;
  switch (action.type) {
    case FETCHING_API_REQUEST:
      if (action.apiName === 'getUserInfo') {
        //  return {...state, isFetchingUserInfo: true, userInfoApiSuccesMessage: '',
        //   userInfoApiErrorMessage: '' };
        newStore = Object.assign({}, state, {
          ...state,
          isFetchingUserInfo: true,
          userInfoApiSuccesMessage: '',
          userInfoApiErrorMessage: ''
        });
        return newStore;
      }

      return state;

    case FETCHING_API_FAILURE:
      if (action.apiName === 'getUserInfo') {
        //  return {...state, isFetchingUserInfo: false,
        //   userInfoApiErrorMessage: action.payload };

        newStore = Object.assign({}, state, {
          ...state,
          isFetchingUserInfo: false,
          userInfoApiErrorMessage: action.payload,
          errorApiMessage: action.payload
        });
        return newStore;
      } else {
        newStore = Object.assign({}, state, {
          ...state,
          isFetchingUserInfo: false,
          errorApiMessage: action.payload
        });
        return newStore;
      }

    // return state;

    //  return {...state, isFetching: false, errorApiMessage: action.payload  };

    case FETCHING_API_SUCCESS:
      if (action.apiName === 'getUserInfo') {
        console.log('trajo getUserInfo');
        //  return {...state, isFetchingUserInfo: false,
        //     userInfoApiSuccesMessage: action.payload,
        //     userInfoApiSuccesStatus: true };

        newStore = Object.assign({}, state, {
          ...state,
          isFetchingUserInfo: false,
          userInfoApiSuccesMessage: action.payload,
          userInfoApiSuccesStatus: true
        });
        return newStore;
      }

      return state;

    case MANAGE_LOCATION_PERMISSIONS:
      // if (action.apiName==='getUserInfo')
      // {
      //     console.log('trajo getUserInfo')
      //  return {...state, isFetchingUserInfo: false,
      //     userInfoApiSuccesMessage: action.payload,
      //     userInfoApiSuccesStatus: true };

      if (action.param === 'didmount') {
        newStore = Object.assign({}, state, {
          ...state,
          qsoScreenDidmount: action.payload
        });
        return newStore;
      }

      // else
      // locationPermission
      if (action.param === 'locationpermission') {
        newStore = Object.assign({}, state, {
          ...state,
          currentLocationPermission: action.payload
        });
        return newStore;
      }

      if (action.param === 'adshowed') {
        newStore = Object.assign({}, state, {
          ...state,
          adShowed: action.payload
        });

        return newStore;
      }

      if (action.param === 'iapshowed') {
        newStore = Object.assign({}, state, {
          ...state,
          iapShowed: action.payload
        });

        return newStore;
      }

      if (action.param === 'photofromgallery') {
        newStore = Object.assign({}, state, {
          ...state,
          photoFromGallery: action.payload
        });
        return newStore;
      }

      return state;
    //    }

    //   return {...state, isFetching: false, apiSuccessMessage: action.payload };

    case QSO_SCREEN_DIDMOUNT:
      newStore = Object.assign({}, state, {
        ...state,
        qsoScreenDidMountFirstTime: action.payload
      });
      return newStore;

    case CHANGE_QSO_TYPE:
      auxcurrentQso = {
        ...state.currentQso,
        qsotype: action.typetochange
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case CONFIRMED_PURCHASE_FLAG:
      newStore = Object.assign({}, state, {
        ...state,
        confirmedPurchaseFlag: action.purchaseState
      });

      return newStore;

    case SET_RESTORE_CALL:
      newStore = Object.assign({}, state, {
        ...state,
        restoreCalled: action.call,
        restoreMessage: action.message
      });

      return newStore;

    case SET_SUBSCRIPTION_INFO:
      newStore = Object.assign({}, state, {
        ...state,
        localizedPrice: action.localizedprice,
        productId: action.productid
      });

      return newStore;

    case SET_UPLOAD_VIDEO_ERROR_MESSAGE:
      auxcurrentQso = {
        ...state.currentQso,
        videoUploadError: action.message
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case SET_BAND:
      auxcurrentQso = {
        ...state.currentQso,
        band: action.band,
        bandSent: false
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case SET_MODE:
      auxcurrentQso = {
        ...state.currentQso,
        mode: action.mode,
        modeSent: false
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case SET_RST:
      console.log('cambio RST REDUX: ' + action.rst);
      if (action.digital)
        auxcurrentQso = {
          ...state.currentQso,
          db: action.rst,
          rst: '',
          digitalMode: true
          // rstBeforeChangeMode: action.rstbeforechange
        };
      else
        auxcurrentQso = {
          ...state.currentQso,
          rst: action.rst,
          db: '',
          digitalMode: false
          // rstBeforeChangeMode: action.rstbeforechange
        };

      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case SET_WELCOME_USER_FIRST_TIME:
      newStore = Object.assign({}, state, {
        ...state,
        welcomeUserFirstTime: action.payload
      });

      return newStore;

    // este en teoria se deja de usar, porque los QRA se ingresan en el AddCallSign en un Array Auxiliar
    // y cauando el usuario confirme se agregan al array final de qsoqras
    case ADD_QRA:
      console.log('desdeREDUCER!! : ' + JSON.stringify(action.newqra));
      auxcurrentQso = {
        ...state.currentQso,
        qsoqras: [...state.currentQso.qsoqras, action.newqra]
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case SET_QSOCALLSIGNS:
      if (action.param === 'DELETEONE') {
        console.log('DELETEONE : ' + action.callsign);

        const arrayQsocallsignsFinal = state.currentQso.qsocallsigns.filter(
          (item) => item.qra !== action.callsign
        );

        auxcurrentQso = {
          ...state.currentQso,

          qsocallsigns: arrayQsocallsignsFinal
        };
      }

      if (action.param === 'DELETEALL') {
        auxcurrentQso = {
          ...state.currentQso,

          qsocallsigns: []
        };
      }

      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case COPY_CALLSIGN_TO_QSOQRAS:
      // copio los callsigns dados de alta + los callsigns existentes en qsoqras en AUX
      var aux = [...state.currentQso.qsoqras, ...action.qsocallsigns];
      // eleimino los duplicados en AUX por si el usuario repite los callsigns
      (keys = ['qra']),
        (filtered = aux.filter(
          ((s) => (o) =>
            ((k) => !s.has(k) && s.add(k))(keys.map((k) => o[k]).join('|')))(
            new Set()
          )
        ));

      // actualizo qsoqras con todos los nuevos asegurandome que ya no hay duplicados

      auxcurrentQso = {
        ...state.currentQso,

        qsoqras: filtered
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case ADD_CALLSIGN:
      console.log('desdeREDUCER!! : ' + JSON.stringify(action.newcallsign));
      auxcurrentQso = {
        ...state.currentQso,
        qsocallsigns: [...state.currentQso.qsocallsigns, action.newcallsign]
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case QSO_QRA_DELETE:
      arrqras = state.currentQso.qsoqras;

      console.log(
        'REDUCER QRA enviado array antesde borrar: ' +
          action.qra +
          JSON.stringify(arrqras)
      );
      arrayQraFinal = deleteSingleQra(arrqras, action.qra);

      function deleteSingleQra(arr, qratodelete) {
        return arr.filter((arr1) => {
          return arr1.qra !== qratodelete;
        });
      }

      console.log(
        'REDUCER QRA enviado array DESPUES de borrar: ' +
          action.qra +
          JSON.stringify(arrayQraFinal)
      );

      auxcurrentQso = {
        ...state.currentQso,
        qsoqras: arrayQraFinal,
        qraDeleted: true
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case UPDATE_QRA_URL:
      // console.log("desdeREDUCER!! : "+JSON.stringify(action.newqra));

      var updatedItems1 = state.currentQso.qsoqras.map((item) => {
        if (item.qra === action.qra) {
          return { ...item, ...action.url };
        }
        return item;
      });

      // actualizo la URL del callsign del array auxiliar del Modal de AddCallsign.js
      var updatedItemsCallsigns = state.currentQso.qsocallsigns.map((item) => {
        if (item.qra === action.qra) {
          return { ...item, ...action.url };
        }
        return item;
      });

      if (action.qra === 'deleteLast') {
        console.log('entro delete item');
        var i = state.currentQso.qsoqras.length;
        var items = state.currentQso.qsoqras;
        const filteredItems = items
          .slice(0, i - 1)
          .concat(items.slice(i, items.length));
        updatedItems1 = filteredItems;
      }

      // actualizo tambien la lsit de searched de QslScan por si hace un Follow desde ahi
      const updatedItems1_1 = state.currentQso.qraShow.map((item) => {
        if (item.qra === action.qra) {
          return { ...item, ...action.url };
        }
        return item;
      });

      const updatedItems1_2 = state.currentQso.qraSearched.map((item) => {
        if (item.qra === action.qra) {
          return { ...item, ...action.url };
        }
        return item;
      });
      //    return updatedItems

      auxcurrentQso = {
        ...state.currentQso,
        qsoqras: updatedItems1,
        qsocallsigns: updatedItemsCallsigns,
        qraShow: updatedItems1_1,
        qraSearched: updatedItems1_2
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case UPDATE_QSOQRA_SENT_STATUS:
      // console.log("desdeREDUCER!! : "+JSON.stringify(action.newqra));

      const updatedItems2 = state.currentQso.qsoqras.map((item) => {
        //     if(item.qra === action.qra){
        return { ...item, ...action.sentStatus };
        //    }
        // return item;
      });
      //    return updatedItems

      auxcurrentQso = {
        ...state.currentQso,
        qsoqras: updatedItems2
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case UPDATE_ONLYONE_QSOQRA_SENT_STATUS:
      // console.log("desdeREDUCER!! : "+JSON.stringify(action.newqra));

      const updatedItems3 = state.currentQso.qsoqras.map((item) => {
        if (item.qra === action.qra) {
          return { ...item, ...action.sentStatus };
        }
        return item;
      });
      //    return updatedItems

      auxcurrentQso = {
        ...state.currentQso,
        qsoqras: updatedItems3
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case UPDATE_MEDIA:
      // console.log(
      //   'Reducer UPDATE_MEDIA : ' + JSON.stringify(action.updatetype)
      // );
      // console.log('Reducer UPDATE_MEDIA2 : ' + JSON.stringify(action.update));
      //  aux_status = 0;

      if (action.updatetype === 'item') {
        var updatedItems5 = state.currentQso.mediafiles.map((item) => {
          if (item.name === action.filename) {
            console.log('itemUpd: ' + JSON.stringify(item));

            return { ...item, ...action.update };
          }
          return item;
        });

        auxcurrentQso = {
          ...state.currentQso,
          mediafiles: updatedItems5
        };
        newStore = Object.assign({}, state, {
          ...state,
          currentQso: auxcurrentQso
          // sendingProfileModal_stat: aux_status
        });
      }
      if (action.updatetype === 'sqlrdsid') {
        console.log('entro sqlrdsid reducer:' + JSON.stringify(action.update));
        const updatedItems5 = state.currentQso.mediafiles.map((item) => {
          //  if(item.name === action.filename){
          if (item.type !== 'profile') return { ...item, ...action.update };
          //  }
          return item;
        });

        auxcurrentQso = {
          ...state.currentQso,
          mediafiles: updatedItems5
        };
        newStore = Object.assign({}, state, {
          ...state,
          currentQso: auxcurrentQso
        });
      }

      //    return updatedItems

      return newStore;

    case ADD_MEDIA:
      console.log('desdeREDUCER ADD_MEDIA!! : ');
      console.log(action.newmedia);
      // var auxmedia = new Array();
      var auxmedia = state.currentQso.mediafiles;
      console.log('mediafiles cant: ' + auxmedia.length);
      // si ya hay 3 medias, borro el ultimo item que era el espacio a proposito para generar area
      // para el touchwithFeedback, asi no scrollea el body con tan pocas media
      if (auxmedia.length === 3 && auxmedia[2].type === 'vacio')
        popped = auxmedia.pop();
      auxcurrentQso = {
        ...state.currentQso,
        // mediafiles: [...state.currentQso.mediafiles, action.newmedia]
        // mediafiles: [action.newmedia,...state.currentQso.mediafiles]
        mediafiles: [action.newmedia, ...auxmedia]
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case CLOSE_MODALCONFIRM_PHOTO:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        modalconfirmphoto: false,
        phototype: action.phototype
      };
      // se agrego photGallery por si lo que tenia en MUESTRO es una foto de la galeria
      // inicializa el flag para que cuando venga de background se llamen las APIS
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso,
        photoFromGallery: 0
      });
      return newStore;

    case SET_DELETED_FLAG:
      auxcurrentQso = {
        ...state.currentQso,
        deletedFlag: action.flag,
        deletedFlagMessage: action.message
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case SET_PROFILE_MODAL_STAT:
      // uso esta action para manejar el status del MODAL y el boton de Cancel dentro del modal
      // el boton de cancel se activa despuesde X segundos por si falla el upload o lo que sea
      // que el usuario pueda cerrar el modal e intentar de nuevo y no quede atrapado.

      if (action.param === 'modal')
        newStore = Object.assign({}, state, {
          ...state,
          sendingProfileModal_stat: action.status
        });
      if (action.param === 'cancelButton')
        newStore = Object.assign({}, state, {
          ...state,
          cancelButton_stat: action.status
        });

      if (action.param === 'ambos')
        newStore = Object.assign({}, state, {
          ...state,
          cancelButton_stat: action.status,
          sendingProfileModal_stat: action.status
        });
      if (action.param === 'nsfw')
        newStore = Object.assign({}, state, {
          ...state,
          sendingProfileModal_stat: action.status,
          cancelButton_stat: 1
        });
      if (action.param === 'failed')
        newStore = Object.assign({}, state, {
          ...state,
          sendingProfileModal_stat: action.status,
          cancelButton_stat: 1
        });
      return newStore;

    case OPEN_MODALCONFIRM_PHOTO:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        modalconfirmphotoHeight: action.height,
        modalconfirmphoto: true
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case OPEN_MODAL_RECORDING:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        modalrecording: true
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case CLOSE_MODAL_RECORDING:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        modalrecording: false
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case SET_SENDING_PROFILE_PHOTO_MODAL:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      newStore = Object.assign({}, state, {
        ...state,
        sendingProfileModal: action.status
      });
      return newStore;

    case SET_CONFIRM_PROFILE_PHOTO_MODAL:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      newStore = Object.assign({}, state, {
        ...state,
        confirmProfileModal: action.status,
        photoFromGallery: 0
      });
      return newStore;

    case SEND_ACTUAL_MEDIA:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        mediatosend: action.mediatosend
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case ACT_INDICATOR_IMAGE_ENABLED:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        activityindicatorImage: true
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case ACT_INDICATOR_POST_QSO_NEW_TRUE:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        activityindicatorPostQsoNew: true
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case ACT_INDICATOR_POST_QSO_NEW_FALSE:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        activityindicatorPostQsoNew: false
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
        //   justPublished: true
      });
      return newStore;

    case SET_JUSTPUBLISHED:
      newStore = Object.assign({}, state, {
        ...state,

        justPublished: action.status
      });
      return newStore;

    case SET_EXTERNAL_SHARE_URL:
      newStore = Object.assign({}, state, {
        ...state,

        externalShareUrl: action.status
      });
      return newStore;

    case SET_SHARE_URL_GUID:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        shareUrlGuid: action.urlguid
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case CAMERA_PERMISSION_TRUE:
      //console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));

      newStore = Object.assign({}, state, {
        ...state,
        camerapermission: true
      });
      return newStore;

    case CAMERA_PERMISSION_FALSE:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));

      newStore = Object.assign({}, state, {
        ...state,
        camerapermission: false
      });
      return newStore;

    case AUDIO_RECORDING_PERMISSION_TRUE:
      // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));

      newStore = Object.assign({}, state, {
        ...state,
        audiorecordingpermission: true
      });
      return newStore;

    case AUDIO_RECORDING_PERMISSION_FALSE:
      // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));

      newStore = Object.assign({}, state, {
        ...state,
        audiorecordingpermission: false
      });
      return newStore;

    case NEW_QSO_ACTIVE_TRUE:
      // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));

      newStore = Object.assign({}, state, {
        ...state,
        newqsoactive: true
      });
      return newStore;

    case NEW_QSO_ACTIVE_FALSE:
      // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));

      newStore = Object.assign({}, state, {
        ...state,
        newqsoactive: false
      });
      return newStore;

    case SET_STOPALLAUDIOS:
      // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));

      newStore = Object.assign({}, state, {
        ...state,
        stopAllAudios: action.payload
      });
      return newStore;

    case SET_URL_RDS_S3:
      // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));

      newStore = Object.assign({}, state, {
        ...state,
        urlRdsS3: action.urlrds,
        identityId: action.identityid
      });
      return newStore;

    case SET_TOKEN:
      // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));
      console.log('Reducer jwtToken:' + action.jwttoken);
      newStore = Object.assign({}, state, {
        ...state,
        jwtToken: action.jwttoken
      });
      return newStore;

    case SET_PRESSHOME:
      newStore = Object.assign({}, state, {
        ...state,
        pressHome: action.presshome
      });
      return newStore;

    case MANAGE_PUSH_TOKEN:
      // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));

      newStore = Object.assign({}, state, {
        ...state,
        pushToken: action.pushtoken
      });
      return newStore;

    case SET_WEBVIEW:
      // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));
      // console.log("Reducer jwtToken:"+action.jwttoken);

      newStore = Object.assign({}, state, {
        ...state,
        // jwtToken: action.jwttoken,
        webviewSession: action.webviewsession,
        webviewUrl: action.webviewurl
      });

      return newStore;

    case SET_MUSTUPGRADEAPP:
      newStore = Object.assign({}, state, {
        ...state,

        mustUpgradeApp: action.mustupgradeapp
      });

      return newStore;

    case SET_USER_INFO:
      // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));
      console.log('Reducer User_Info:' + JSON.stringify(action.userinfo));
      if (action.mode === 'ALL') {
        newStore = Object.assign({}, state, {
          ...state,
          userInfo: action.userinfo
        });
        return newStore;
      }

      if (action.mode === 'scans_links') {
        let modif = {
          monthly_scans: action.userinfo.monthly_scans,
          monthly_links: action.userinfo.monthly_links
        };
        auxUserInfo = {
          ...state.userInfo,
          monthly_scans: action.userinfo.monthly_scans,
          monthly_links: action.userinfo.monthly_links
        };
        auxUserInfo = {
          ...state.userInfo,
          monthly_scans: action.userinfo.monthly_scans,
          monthly_links: action.userinfo.monthly_links
        };
        newStore = Object.assign({}, state, {
          ...state,
          userInfo: auxUserInfo
        });
        return newStore;
      }

      if (action.mode === 'monthly_qso_new') {
        let modif = { monthly_qso_new: action.userinfo.monthly_qso_new };
        auxUserInfo = {
          ...state.userInfo,
          monthly_qso_new: action.userinfo.monthly_qso_new
          //  monthly_links: action.userinfo.monthly_links
        };
        newStore = Object.assign({}, state, {
          ...state,
          userInfo: auxUserInfo
        });
        return newStore;
      }

    case PROFILE_PICTURE_REFRESH:
      // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));

      newStore = Object.assign({}, state, {
        ...state,
        //  profilePicRefresh: Date.now(),
        profilePicRefresh: action.urlprofile
      });
      return newStore;

    case ON_PROGRESS_TRUE:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        onProgress: true
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case ON_PROGRESS_FALSE:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        onProgress: false
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case SET_QRA:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));

      newStore = Object.assign({}, state, {
        ...state,
        qra: action.qra
      });
      return newStore;

    case QSO_SENT_UPDATES_AND_SQLRDSID:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        sqlrdsId: action.sqlrdsid,
        qsotypeSent: action.typestatus,
        bandSent: action.bandstatus,
        modeSent: action.modestatus
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case UPDATE_QSO_HEADER_STATUS:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        bandSent: true,
        modeSent: true,
        qsotypeSent: true
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case RESET_QSO:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        sqlrdsId: '',
        onProgress: false,
        datetime: '',
        qsoqras: [],
        qsocallsigns: [],
        qsotype: action.qsotype,
        qsotypeSent: false,
        band: I18n.t('ReducerBand'),
        bandSent: false,
        mode: I18n.t('ReducerMode'),
        modeSent: false,
        rst: '59',
        db: '-07',
        //  rstBeforeChangeMode: '-07',
        digitalMode: false,
        mediafiles: [{ name: 'vacio', type: 'vacio' }],
        modalconfirmphoto: false,
        mediatosend: {},
        activityindicatorImage: false,
        shareUrlGuid: '',
        deletedFlag: false
      };
      newStore = Object.assign({}, state, {
        ...state,

        currentQso: auxcurrentQso
      });
      return newStore;

    case RESET_FOR_SIGN_OUT:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        followings: [],
        followers: []
      };
      newStore = Object.assign({}, state, {
        ...state,
        userInfoApiSuccesStatus: false,
        currentQso: auxcurrentQso
      });

      return newStore;

    case INSERT_FOLLOWINGS:
      auxcurrentQso = '';

      if (action.mode === 'ALL')
        auxcurrentQso = {
          ...state.currentQso,
          followings: action.followings
        };
      else
        auxcurrentQso = {
          ...state.currentQso,
          followings: [...state.currentQso.followings, action.followings]
        };

      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case INSERT_FOLLOWERS:
      auxcurrentQso = {
        ...state.currentQso,
        followers: action.followers
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case FOLLOWERS_ALREADY_CALLED:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        followersAlreadyCalled: action.status
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case FOLLOWINGS_SELECTED:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      auxcurrentQso = {
        ...state.currentQso,
        followingsSelected: action.selected
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case QRA_SEARCH:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));

      QrasToShow = filterQras(action.qras, state.currentQso.localSearch);
      // string.includes(substring);

      //  function filterQras(arr, qratosearch){
      //      return arr.filter (arr => {
      //          return arr.qra.includes(qratosearch)
      //      })
      //  }

      auxcurrentQso = {
        ...state.currentQso,
        qraSearched: action.qras,
        qraShow: QrasToShow
      };

      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case UPDATE_QSL_SCAN:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));

      auxcurrentQso = {
        ...state.currentQso,
        qslscan: action.qslresult
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case REFRESH_FOLLOWINGS:
      //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));

      auxcurrentQso = {
        ...state.currentQso,
        refreshFollowings: action.status
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case QRA_SEARCH_LOCAL:
      arrsearched = state.currentQso.qraSearched;
      if (action.count < 4) arrsearched = [];

      console.log(
        'REDUCER QRAs searched LOCAL: ' + JSON.stringify(arrsearched)
      );
      QrasToShow = filterQras(arrsearched, action.qratosearch);
      // string.includes(substring);

      // function filterQras(arr, qratosearch){
      //     return arr.filter (arr => {
      //         return arr.qra.includes(qratosearch)
      //     })
      // }

      console.log(
        'REDUCER QRA searched DESPUES de filtrar LOCAL: ' +
          JSON.stringify(QrasToShow)
      );

      auxcurrentQso = {
        ...state.currentQso,
        qraShow: QrasToShow,
        localSearch: action.qratosearch
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case UPDATE_LINK_QSO:
      //console.log('REDUCER ACTION ScantType: ' + action.scanType);

      if (action.scanType === 'clear') {
        auxcurrentQso = {
          ...state.currentQso,
          qsolink: {},
          qsolinkCodes: { code: 0, message: ' ' }
        };
      }
      if (
        action.scanType === 'mainQsoLink' ||
        action.scanType === 'linkQsoApiResult'
      ) {
        let men = ' ';
        if (action.scanType === 'linkQsoApiResult') {
          men = { code: 200, message: 'These Qsos are succesuful Linked!' };
          auxcurrentQso = {
            ...state.currentQso,
            qsolinkCodes: men
          };
        } else {
          men = { code: 0, message: ' ' };
          auxcurrentQso = {
            ...state.currentQso,
            qsolink: action.json,
            qsolinkCodes: men
          };
        }

        console.log('qsolinkcodes en Reducer: ' + men);
      }

      if (action.scanType === 'linkQso') {
        // linkQsoAux = state.currentQso.qsolink.links;
        linkQsoAdded = [...state.currentQso.qsolink.links, action.json];
        linkaux = state.currentQso.qsolink;
        linkaux.links = linkQsoAdded;
        auxcurrentQso = {
          ...state.currentQso,
          qsolink: linkaux,
          qsolinkCodes: { code: 0, message: ' ' }
        };
      }

      if (action.scanType === 'linkQsoError')
        if (action.json.code === 300 || action.json.code === 301) {
          if (action.json.code === 300)
            auxcurrentQso = {
              ...state.currentQso,
              qsolink: {},
              qsolinkCodes: action.json
            };
          if (action.json.code === 301)
            auxcurrentQso = {
              ...state.currentQso,

              qsolinkCodes: action.json
            };
        } else
          auxcurrentQso = {
            ...state.currentQso,

            qsolinkCodes: action.json
          };

      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case SET_LOCATION:
      // console.log("desdeREDUCER!! : "+JSON.stringify(action.newqra));

      auxcurrentQso = {
        ...state.currentQso,
        latitude: action.lat,
        longitude: action.lon
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case DELETE_MEDIA_MEMORY:
      // borro el media que viene bajo la variable action.name
      const mediaUpdated = state.currentQso.mediafiles.filter(
        (item) => item.name !== action.name
      );

      auxcurrentQso = {
        ...state.currentQso,
        mediafiles: mediaUpdated
      };

      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case UPDATE_COMMENT_MEMORY:
      // borro el media que viene bajo la variable action.name
      var updatedItems5 = state.currentQso.mediafiles.map((item) => {
        if (item.name === action.name) {
          // console.log('updateComment: '+JSON.stringify(item));

          return { ...item, ...action.description };
        }
        return item;
      });

      auxcurrentQso = {
        ...state.currentQso,
        mediafiles: updatedItems5
      };
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
        // sendingProfileModal_stat: aux_status
      });

      return newStore;
    case SET_VIDEO_UPLOAD_PROGRESS:
      auxcurrentQso = {
        ...state.currentQso,
        videoPercentage: action.progress
      };

      newStore = Object.assign({}, state, {
        ...state,
        currentQso: auxcurrentQso
      });
      return newStore;

    case MANAGE_NOTIFICATIONS:
      // let auxcurrentQso;

      if (action.notifType === 'CALCULOUNREADPRESSNOTIFICATIONS') {
        cont = 0;
        today = new Date();

        // Esta rutina la marca como leida, le cambia el color
        // pero la fecha que recibe es la del asyncstorage anterior
        // esto permite dejarle al usuario en GRIS las notificaciones
        // cuando aprete la primera vez, si despues se va y apreta NOTIFICATIONS de nuevo
        // ya va a ser con la fecha nueva del asynstorage y ya no apaecen grisadas.
        updatedItems5 = action.notifications.map((item) => {
          date = new Date(item.DATETIME);
          // console.log('dateconvertida: ' + date);
          if (date > action.date) {
            modif = { read: 'unread' };

            // console.log(item.idqra_notifications);
            //   cont++;
            return { ...item, ...modif };
          } else {
            modif = { read: null };
            return { ...item, ...modif };
          }

          // return item;
        });

        // Esta rutina la marca como leida, le cambia el color

        action.notifications.map((item) => {
          date = new Date(item.DATETIME);
          // console.log('dateconvertida: ' + date);
          if (date > today) {
            cont++;
          }
        });

        // console.log('cant mess no leidos: ' + cont);
        //   AsyncStorage.setItem('ultimafecha', today);

        auxUnread = cont;
        auxcurrentQso = {
          ...state.currentQso,
          // notifications: action.notifications
          notifications: updatedItems5
        };
      }

      if (action.notifType === 'CALCULOUNREAD') {
        var cont = 0;

        // Esta rutina la marca como leida, le cambia el color
        updatedItems5 = action.notifications.map((item) => {
          date = new Date(item.DATETIME);
          // console.log('dateconvertida: ' + date);
          if (date > action.date) {
            modif = { read: 'unread' };

            // console.log(item.idqra_notifications);
            cont++;
            return { ...item, ...modif };
          } else {
            modif = { read: null };
            return { ...item, ...modif };
          }
          //    if(item.idqra_activity === action.notifications){
          // return { ...item, ...modif }
          // }
          // return item;
        });

        //console.log('cant mess no leidos: ' + cont);
        //   AsyncStorage.setItem('ultimafecha', today);

        var auxUnread = cont;
        auxcurrentQso = {
          ...state.currentQso,
          // notifications: action.notifications
          notifications: updatedItems5
        };
      }

      if (action.notifType === 'ADD') {
        auxcurrentQso = {
          ...state.currentQso,
          notifications: action.notifications
        };
        auxUnread = action.notifications.length;
      }

      if (action.notifType === 'ADDONE') {
        console.log('ENTRO ADDONE');
        let repetido = false;
        state.currentQso.notifications.map((item) => {
          // if(item.idqra_notifications === action.notifications.idqra_notifications) {
          if (item.idqra_activity === action.notifications.idqra_activity) {
            //return { ...item, ...action.url }
            repetido = true;
          }
          // return item
        });

        console.log('ESTADO de REPETIDO del  IDQRA: ' + repetido);

        if (!repetido) {
          auxUnread = state.notificationsUnread + 1;
          let newarray = state.currentQso.notifications;
          newarray.unshift(action.notifications);

          auxcurrentQso = {
            ...state.currentQso,
            notifications: newarray
          };
        } else
          auxcurrentQso = {
            ...state.currentQso,
            notifications: state.currentQso.notifications
          };

        //  notifications: [...state.currentQso.notifications, action.notifications]
      }

      if (action.notifType === 'SET_READ') {
        let modif = { read: 'unread' };

        // Esta rutina la marca como leida, le cambia el color
        // const updatedItems5 = state.currentQso.notifications.map(item => {
        //     // if(item.idqra_notifications === action.notifications){
        //        if(item.idqra_activity === action.notifications){
        //     return { ...item, ...modif }
        //     }
        //     return item
        // })

        // Con esta sentencia borra la notificacion del ARRAY
        // de esta manera el usuario ve de inmediato que se borro su notificacion
        updatedItems5 = state.currentQso.notifications.filter(
          (item) => item.idqra_activity !== action.notifications
        );

        auxcurrentQso = {
          ...state.currentQso,
          notifications: updatedItems5
        };
        auxUnread = state.notificationsUnread;
      }
      if (action.notifType === 'NOTIF_BACKGROUND_FALSE') {
        console.log('NOTIF_BACKGROUND_FALSE');
        auxcurrentQso = {
          ...state.currentQso,
          notifBackground: false
        };
      }

      if (action.notifType === 'NOTIF_BACKGROUND_TRUE') {
        console.log('NOTIF_BACKGROUND_TRUE');
        auxcurrentQso = {
          ...state.currentQso,
          notifBackground: true
        };
        auxUnread = state.notificationsUnread;
      }

      if (action.notifType === 'SET_READ_URL') {
        console.log('NOTIF_BACKGROUND_TRUE');
        let modif = { read: 'unread' };

        // const updatedItems5 = state.currentQso.notifications.map(item => {
        //     if(item.idqra_activity === action.notifications){
        //     return { ...item, ...modif }
        //     }
        //     return item
        // })

        // borro la notificaion leida
        updatedItems5 = state.currentQso.notifications.filter(
          (item) => item.idqra_activity !== action.notifications
        );

        auxcurrentQso = {
          ...state.currentQso,
          notifications: updatedItems5,
          notifBackground: true
        };
        // auxUnread = state.notificationsUnread;
        auxUnread = 0;
      }

      if (action.notifType === 'DELETE_NOTIF') {
        console.log('Delete all notifcations');

        auxcurrentQso = {
          ...state.currentQso,
          notifications: []
        };
        auxUnread = 0;
      }

      newStore = Object.assign({}, state, {
        ...state,
        notificationsUnread: auxUnread,
        currentQso: auxcurrentQso
      });
      return newStore;

    case REQUEST_FEED:
      newStore = Object.assign({}, state, {
        ...state,
        feed: { ...state.feed, FetchingQSOS: true, qsosFetched: false }
      });
      return newStore;
    case REQUEST_FIELDDAYS:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          FetchingFieldDays: true,
          fieldDaysFetched: false
        }
      });
      return newStore;
    case RECEIVE_FIELDDAYS:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          fieldDays: action.fieldDays,
          FetchingFieldDays: false,
          fieldDaysFetched: true
        }
      });
      return newStore;
    case RECEIVE_FEED:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          qsos: action.qsos,
          FetchingQSOS: false,
          qsosFetched: true
        }
      });
      return newStore;
    case FOLLOW_RECEIVE:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          follow: action.follow.filter((f) => {
            return !state.currentQSO.followings.some(
              (o) => o.idqra_followed === f.idqras
            );
          }),
          followFetched: true,
          followFetching: false
        }
      });

      return newStore;
    case RECEIVE_FOLLOWERS:
      console.log('RECEIVE_FOLLOWERS');
      newStore = Object.assign({}, state, {
        ...state,
        currentQso: {
          ...state.currentQso,
          followings: action.following
        },
        feed: {
          ...state.feed,
          qra: state.feed.qra
            ? {
                ...state.feed.qra,
                following:
                  state.feed.qra.qra.idqras === state.userInfo.idqras
                    ? action.following
                    : state.feed.qra.following
              }
            : null
        }
      });

      return newStore;
    case DELETE_QSO:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          qsos: state.feed.qsos.filter((qso) => qso.idqsos !== action.idqso),
          qra: state.feed.qra
            ? {
                ...state.feed.qra,
                qsos: state.feed.qra.qsos.filter((qso) => {
                  return qso.idqsos !== action.idqso;
                })
              }
            : state.feed.qra
        }
      });

      return newStore;
    case REPOST_QSO:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          qsos: [action.feed.qso, ...state.feed.qsos],
          qra: state.feed.qra
            ? {
                ...state.feed.qra,
                qsos:
                  state.feed.qra &&
                  state.userInfo.idqras === action.qso.idqra_owner
                    ? [action.qso, ...state.feed.qra.qsos]
                    : state.feed.qra.qsos
              }
            : null
        }
      });

      return newStore;
    case QSO_LIKE:
      console.log('QSO_LIKE');
      let like = {
        idqso: action.idqso,
        idqra: action.idqra,
        qra: action.qra,
        firstname: action.firstname,
        lastname: action.lastname,
        avatarpic: action.avatarpic
      };
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          qsos: state.feed.qsos.map((qso) => {
            if (qso.idqsos === action.idqso) {
              qso.likes = [...qso.likes, like];
            }
            return qso;
          }),
          qso_link:
            state.feed.qso_link && state.feed.qso_link.idqsos === action.idqso
              ? {
                  ...state.feed.qso_link,
                  likes: [...state.feed.qso_link.likes, like]
                }
              : state.feed.qso_link,
          qra: state.feed.qra
            ? {
                ...state.feed.qra,
                qsos:
                  state.feed.qra && state.feed.qra.qsos
                    ? state.feed.qra.qsos.map((qso) => {
                        if (qso.idqsos === action.idqso) {
                          qso.likes = [...qso.likes, like];
                        }
                        return qso;
                      })
                    : []
              }
            : null,

          qso:
            state.feed.qso && state.feed.qso.idqsos
              ? {
                  ...state.feed.qso,
                  likes: [...state.feed.qso.likes, like]
                }
              : {}
        }
      });

      return newStore;
    case QSO_DISLIKE:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          qsos: state.feed.qsos.map((qso) => {
            if (qso.idqsos === action.idqso) {
              qso.likes = qso.likes.filter(
                (like) => like.idqra !== action.idqra
              );
            }

            return qso;
          }),
          qso_link: state.feed.qso_link
            ? {
                ...state.feed.qso_link,
                likes: state.feed.qso_link.likes
                  ? state.feed.qso_link.likes.filter(
                      (like) => like.idqra !== action.idqra
                    )
                  : []
              }
            : null,
          qra: state.feed.qra
            ? {
                ...state.feed.qra,
                qsos:
                  state.feed.qra && state.feed.qra.qsos
                    ? state.feed.qra.qsos.map((qso) => {
                        if (qso.idqsos === action.idqso) {
                          qso.likes = qso.likes.filter(
                            (like) => like.idqra !== action.idqra
                          );
                        }
                        return qso;
                      })
                    : []
              }
            : null,
          qso:
            state.feed.qso && state.feed.qso.idqsos
              ? {
                  ...state.feed.qso,
                  likes: state.feed.qso.likes.filter(
                    (like) => like.idqra !== action.idqra
                  )
                }
              : {}
        }
      });
      return newStore;
    case COMMENT_ADD_UPDATE:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          qsos: state.feed.qsos.map((qso) => {
            if (qso.idqsos === action.idqso) {
              qso.comments = qso.comments.map((c) => {
                if (
                  c.qra === action.comment.qra &&
                  c.comment === action.comment.comment &&
                  c.datetime === action.comment.datetime
                )
                  return action.comment;
                else return c;
              });
            }

            return qso;
          }),
          qso_link: state.feed.qso_link
            ? {
                ...state.feed.qso_link,
                comments: state.feed.qso_link.comments
                  ? state.feed.qso_link.comments.map((c) => {
                      if (
                        c.qra === action.comment.qra &&
                        c.comment === action.comment.comment &&
                        c.datetime === action.comment.datetime
                      )
                        return action.comment;
                      else return c;
                    })
                  : []
              }
            : null,
          qra: state.feed.qra
            ? {
                ...state.feed.qra,
                qsos:
                  state.feed.qra && state.feed.qra.qsos
                    ? state.feed.qra.qsos.map((qso) => {
                        if (qso.idqsos === action.idqso) {
                          qso.comments = qso.comments.map((c) => {
                            if (
                              c.qra === action.comment.qra &&
                              c.comment === action.comment.comment &&
                              c.datetime === action.comment.datetime
                            )
                              return action.comment;
                            else return c;
                          });
                        }
                        return qso;
                      })
                    : []
              }
            : null,
          qso:
            state.feed.qso && state.feed.qso.idqsos
              ? {
                  ...state.feed.qso,
                  comments: state.feed.qso.comments.map((c) => {
                    if (
                      c.qra === action.comment.qra &&
                      c.comment === action.comment.comment &&
                      c.datetime === action.comment.datetime
                    )
                      return action.comment;
                    else return c;
                  })
                }
              : {}
        }
      });

      return newStore;
    case COMMENT_ADD:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          qsos: state.feed.qsos.map((qso) => {
            if (qso.idqsos === action.idqso) {
              qso.comments = [...qso.comments, action.comment];
            }
            return qso;
          }),
          qso_link:
            state.feed.qso_link && state.feed.qso_link.idqsos === action.idqso
              ? {
                  ...state.feed.qso_link,
                  comments: [...state.feed.qso_link.comments, action.comment]
                }
              : state.feed.qso_link,
          qra: state.feed.qra
            ? {
                ...state.feed.qra,
                qsos:
                  state.feed.qra && state.feed.qra.qsos
                    ? state.feed.qra.qsos.map((qso) => {
                        if (qso.idqsos === action.idqso) {
                          qso.comments = [...qso.comments, action.comment];
                        }
                        return qso;
                      })
                    : []
              }
            : null,

          qso:
            state.feed.qso && state.feed.qso.idqsos
              ? {
                  ...state.feed.qso,
                  comments: [...state.feed.qso.comments, action.comment]
                }
              : {}
        }
      });

      return newStore;
    case COMMENT_DELETE:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          qsos: state.feed.qsos.map((qso) => {
            if (qso.idqsos === action.idqso) {
              qso.comments = qso.comments.filter(
                (comment) => comment.idqsos_comments !== action.idcomment
              );
            }

            return qso;
          }),
          qso_link: state.feed.qso_link
            ? {
                ...state.feed.qso_link,
                comments: state.feed.qso_link.comments
                  ? state.feed.qso_link.comments.filter(
                      (comment) => comment.idqsos_comments !== action.idcomment
                    )
                  : []
              }
            : null,
          qra: state.feed.qra
            ? {
                ...state.feed.qra,
                qsos:
                  state.feed.feed.qra && state.feed.qra.qsos
                    ? state.feed.qra.qsos.map((qso) => {
                        if (qso.idqsos === action.idqso) {
                          qso.comments = qso.comments.filter(
                            (comment) =>
                              comment.idqsos_comments !== action.idcomment
                          );
                        }
                        return qso;
                      })
                    : []
              }
            : null,
          qso:
            state.feed.qso && state.feed.qso.idqsos
              ? {
                  ...state.feed.qso,
                  comments: state.feed.qso.comments.filter(
                    (comment) => comment.idqsos_comments !== action.idcomment
                  )
                }
              : {}
        }
      });

      return newStore;
    case CLEAR_QRA:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          qra: null,
          FetchingQRA: false,
          QRAFetched: false
        }
      });
      return newStore;
    case REQUEST_QRA:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          FetchingQRA: action.FetchingQRA,
          QRAFetched: action.QRAFetched,
          qraError: null
        }
      });
      return newStore;
    case RECEIVE_QRA:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          qra: action.qra,
          FetchingQRA: action.FetchingQRA,
          QRAFetched: action.QRAFetched,
          userData: {
            ...state.feed.userData,
            qra: {
              ...state.feed.userData.qra,
              monthly_qra_views: action.monthly_qra_views
            }
          }
        }
      });

      return newStore;
    case RECEIVE_QRA_ERROR:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          FetchingQRA: false,
          QRAFetched: true,
          qraError: action.error
        }
      });
      return newStore;
    case REQUEST_QSO:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,

          qso: null,
          FetchingQSO: true,
          QSOFetched: false
        }
      });
      return newStore;
    case CLEAR_QSO:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          qso: null,
          FetchingQSO: false,
          QSOFetched: false
        }
      });
      return newStore;
    case RECEIVE_QSO:
      console.log(action);
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          qso: action.qso,
          FetchingQSO: false,
          QSOFetched: true,
          qsoError: null,
          userData: {
            ...state.feed.userData,
            qra: {
              ...state.feed.userData.qra,
              monthly_qso_views: action.monthly_qso_views
            }
          }
        }
      });
      return newStore;
    case RECEIVE_QSO_ERROR:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          FetchingQSO: false,
          QSOFetched: true,
          qsoError: action.error
        }
      });
      return newStore;
    case RECEIVE_QSO_MEDIA_COUNTER:
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          userData: {
            ...state.userData,
            qra: {
              ...state.userData.qra,
              monthly_audio_play: action.monthly_audio_play
            }
          }
        }
      });
      return newStore;
    case REQUEST_USERINFO:
      let userInfo = {
        ...state.userData,
        fetchingUser: action.fetchingUser,
        userFetched: action.userFetched
      };
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          userData: userInfo
        }
      });
      return newStore;

    case RECEIVE_USERINFO:
      userInfo = {
        ...state.userData,
        following: action.following,
        followers: action.followers,
        notifications: action.notifications,
        qra: action.qra,
        fetchingUser: action.fetchingUser,
        userFetched: action.userFetched
      };
      newStore = Object.assign({}, state, {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.qra
        },
        feed: {
          ...state.feed,
          follow: state.feed.follow
            ? state.feed.follow.filter((f) => {
                return !action.following.some(
                  (o) => o.idqra_followed === f.idqras
                );
              })
            : [],
          userData: userInfo
        }
      });
      return newStore;
    case RECEIVE_USER_DATA_INFO: {
      newStore = Object.assign({}, state, {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.qra
        },
        feed: {
          ...state.feed,
          userData: {
            ...state.feed.userData,
            qra: state.feed.userData.qra
              ? { ...state.feed.userData.qra, ...action.qra }
              : { ...action.qra }
          },
          qra: {
            ...state.feed.qra,
            qra: state.feed.qra
              ? { ...state.feed.qra.qra, ...action.qra }
              : { ...action.qra }
          }
        }
      });
      return newStore;
    }
    case RECEIVE_USER_BIO: {
      const qra = {
        ...state.feed.qra,
        qra: state.feed.qra
          ? { ...state.feed.qra.qra, bio: action.bio }
          : { bio: action.bio }
      };
      newStore = Object.assign({}, state, {
        ...state,
        userInfo: {
          ...state.userInfo,
          bio: action.bio
        },
        feed: {
          ...state.feed,
          qra: qra
        }
      });
      return newStore;
    }
    case PAUSE_VIDEO: {
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          qsos: state.feed.qsos
            ? state.feed.qsos.map((qso) => {
                if (qso.idqsos === action.idqsos) {
                  qso.media = qso.media.map((m) => {
                    if (m.type === 'video') m.paused = true;
                    return m;
                  });
                }
                return qso;
              })
            : [],
          // qso_link:
          //   state.feed.qso_link && state.feed.qso_link.idqsos === action.idqso
          //     ? {
          //         ...state.feed.qso_link,
          //         likes: [...state.feed.qso_link.likes, like]
          //       }
          //     : state.feed.qso_link,
          qra: state.feed.qra
            ? {
                ...state.feed.qra,
                qsos:
                  state.feed.qra && state.feed.qra.qsos
                    ? state.feed.qra.qsos.map((qso) => {
                        if (qso.media)
                          qso.media = qso.media.map((m) => {
                            if (m.type === 'video') m.paused = true;
                            return m;
                          });
                        return qso;
                      })
                    : []
              }
            : null,

          qso:
            state.feed.qso && state.feed.qso.idqsos
              ? {
                  ...state.feed.qso,
                  media: state.feed.qso.media.map((m) => {
                    if (m.type === 'video') m.paused = true;
                    return m;
                  })
                }
              : null
        }
      });

      return newStore;
    }
    case DELETE_QSO: {
      newStore = Object.assign({}, state, {
        ...state,
        feed: {
          ...state.feed,
          qsos:
            state.feed.qsos &&
            state.feed.qsos.filter((qso) => qso.idqsos !== action.idqso),
          fieldDays:
            state.fieldDays.qsos &&
            state.fieldDays.qsos.filter((qso) => qso.idqsos !== action.idqso),
          qra: state.qra
            ? {
                ...state.qra,
                qsos: state.qra.qsos.filter((qso) => {
                  return qso.idqsos !== action.idqso;
                })
              }
            : state.qra
        }
      });

      return newStore;
    }
    default:
      return state;
  }
};

export default qsoReducer;
