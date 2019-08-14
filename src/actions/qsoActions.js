import {FETCHING_API_REQUEST,
        FETCHING_API_SUCCESS,
        FETCHING_API_FAILURE,
        SET_BAND,
        SET_MODE, ADD_QRA, ADD_MEDIA, CLOSE_MODALCONFIRM_PHOTO,
        OPEN_MODALCONFIRM_PHOTO, SEND_ACTUAL_MEDIA,
        ACT_INDICATOR_IMAGE_ENABLED,
        CAMERA_PERMISSION_FALSE,
        CAMERA_PERMISSION_TRUE, AUDIO_RECORDING_PERMISSION_TRUE,
        AUDIO_RECORDING_PERMISSION_FALSE,
        NEW_QSO_ACTIVE_TRUE, NEW_QSO_ACTIVE_FALSE,
        CHANGE_QSO_TYPE, ON_PROGRESS_TRUE, ON_PROGRESS_FALSE,
        UPDATE_QRA_URL, SET_QRA, QSO_SENT_UPDATES_AND_SQLRDSID,
        UPDATE_QSOQRA_SENT_STATUS, UPDATE_ONLYONE_QSOQRA_SENT_STATUS,
        UPDATE_QSO_HEADER_STATUS, RESET_QSO, 
        UPDATE_MEDIA, CLOSE_MODAL_RECORDING, OPEN_MODAL_RECORDING,
        ACT_INDICATOR_POST_QSO_NEW_TRUE, ACT_INDICATOR_POST_QSO_NEW_FALSE,
        QSO_QRA_DELETE, SET_URL_RDS_S3, INSERT_FOLLOWINGS, INSERT_FOLLOWERS,
        FOLLOWERS_ALREADY_CALLED, FOLLOWINGS_SELECTED, QRA_SEARCH,
        UPDATE_QSL_SCAN, UPDATE_QSL_SCAN_RESULT,
        REFRESH_FOLLOWINGS, QRA_SEARCH_LOCAL, PROFILE_PICTURE_REFRESH,
        SET_LOCATION, SET_STOPALLAUDIOS, UPDATE_LINK_QSO, LINK_QSOS, SET_TOKEN,
        RESET_FOR_SIGN_OUT, MANAGE_PUSH_TOKEN,
        MANAGE_NOTIFICATIONS, SET_USER_INFO, MANAGE_LOCATION_PERMISSIONS,
        QSO_SCREEN_DIDMOUNT  } from './types';

import awsconfig from '../aws-exports';
//import Amplify, { Auth, API, Storage } from 'aws-amplify';
import { Auth, Analytics } from 'aws-amplify';
import { API } from 'aws-amplify';
import { Storage } from 'aws-amplify';


import { NetInfo, Platform, Alert, AsyncStorage } from 'react-native';
import { getDateQslScan } from '../helper';
import { Buffer } from 'buffer';
import RNFetchBlob from 'rn-fetch-blob';

// Analytics.addPluggable(new AWSKinesisProvider());

//Amplify.configure(awsconfig)
Auth.configure(awsconfig);
API.configure(awsconfig);
Storage.configure(awsconfig);
Analytics.configure(awsconfig);



export const setStopAllAudios = (status) => {
    return {
        type: SET_STOPALLAUDIOS,
        payload: status
    };
}


export const fetchingApiRequest = (apiName) => {
    return {
        type: FETCHING_API_REQUEST,
        apiName: apiName
    };
}
export const fetchingApiSuccess = (apiName,json) => {
    return {
        type: FETCHING_API_SUCCESS,
        apiName: apiName,
        payload: json
    };
}
export const fetchingApiFailure = (apiName,error) => {
    return {
        type: FETCHING_API_FAILURE,
        apiName: apiName,
        payload: error
    };
}
export const cambioqsotype = (typetochange) => {
    return {
        type: CHANGE_QSO_TYPE,
        typetochange: typetochange 
    };
}
export const setBand = (band) => {
    return {
        type: SET_BAND,
        band: band
    };
}
export const setMode = (mode) => {
    return {
        type: SET_MODE,
        mode: mode
    };
}

export const profilePictureRefresh = (urlProfile) => {
    return {
        type: PROFILE_PICTURE_REFRESH,
        urlprofile: urlProfile
        // status: status
       
    };
}

export const addQra = (newqra) => {
    return {
        type: ADD_QRA,
        newqra: newqra
    };
}

export const updateQraUrl = (qra,url) => {
    return {
        type: UPDATE_QRA_URL,
        qra: qra,
        url: url
    };
}

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
}

export const closeModalConfirmPhoto = (phototype) => {
    return {
        type: CLOSE_MODALCONFIRM_PHOTO,   
        phototype: phototype
            
    };
}

export const closeModalRecording = () => {
    return {
        type: CLOSE_MODAL_RECORDING       
    };
}

export const openModalRecording = () => {
    return {
        type: OPEN_MODAL_RECORDING       
    };
}

export const openModalConfirmPhoto = (height) => {
    return {
        type: OPEN_MODALCONFIRM_PHOTO, 
        height: height      
    };
}

export const sendActualMedia = (media) => {
    return {
        type: SEND_ACTUAL_MEDIA,       
        mediatosend: media
    };
}

export const actindicatorImageEnabled = () => {
    return {
        type: ACT_INDICATOR_IMAGE_ENABLED       
       
    };
}

export const cameraPermissionTrue = () => {
    return {
        type: CAMERA_PERMISSION_TRUE       
       
    };
}

export const cameraPermissionFalse = () => {
    return {
        type: CAMERA_PERMISSION_FALSE       
       
    };
}


export const audiorecordingPermissionTrue = () => {
    return {
        type: AUDIO_RECORDING_PERMISSION_TRUE       
       
    };
}

export const audiorecordingPermissionFalse = () => {
    return {
        type: AUDIO_RECORDING_PERMISSION_FALSE      
       
    };
}

export const manageLocationPermissions = (parametro,status) => {
  return {
      type: MANAGE_LOCATION_PERMISSIONS,  
      param: parametro, 
      payload: status   
     
  };
}

export const qsoScreenDidMountFirsTime = (status) => {
  return {
      type: QSO_SCREEN_DIDMOUNT,   
      payload: status   
     
  };
}

export const newqsoactiveTrue = () => {
    return {
        type: NEW_QSO_ACTIVE_TRUE       
       
    };
}

export const newqsoactiveFalse = () => {
    return {
        type: NEW_QSO_ACTIVE_FALSE       
       
    };
}

export const actindicatorPostQsoNewTrue = () => {
    return {
        type: ACT_INDICATOR_POST_QSO_NEW_TRUE       
       
    };
}

export const actindicatorPostQsoNewFalse = () => {
    return {
        type: ACT_INDICATOR_POST_QSO_NEW_FALSE      
       
    };
}


export const onprogressTrue = () => {
    return {
        type: ON_PROGRESS_TRUE       
       
    };
}

export const onprogressFalse = () => {
    return {
        type: ON_PROGRESS_FALSE
       
    };
}


export const fetchQraProfileUrl = (qra,type,jwtToken) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('fetchQraProfileUrl'));
      console.log("ejecuta llamada API URL PROFILE");  
    try {
        console.log("Antes1 GET PROFILE URL" );
        // session = await Auth.currentSession();
        // console.log("Su token es: " + session.idToken.jwtToken);
        let apiName = 'superqso';
        let path = '/qra-get-profile-pic';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }, // OPTIONAL
          body: {
            "qra": qra
          }
        }

        console.log("llamo api URL!");
      respuesta = await API.post(apiName, path, myInit);

      if (respuesta.body.error===0)
     {
          //console.log("respuesta API:" + JSON.stringify(respuesta));
          console.log("respuesta API url:" + JSON.stringify(respuesta));
          url = {"url": respuesta.body.message.url_avatar, "following": respuesta.body.message.following} 
        //   console.log("la url que envio:" + url);
        //   console.log("EL QRA:" + qra);
          dispatch(fetchingApiSuccess('fetchQraProfileUrl',respuesta.body));

          if (type==='profile')
          dispatch(profilePictureRefresh(respuesta.body.message.url_avatar,true));
          else
          dispatch(updateQraUrl(qra,url));
          
        }

  }

    catch (error) {
      console.log('Api catch error:', error);
      dispatch(fetchingApiFailure('fetchQraProfileUrl',error));
      // Handle exceptions

      // como fallo el la URL de get profile borro el QRA de la lista de QsoQras y actualizo el JwtToken
      session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      dispatch(updateQraUrl('deleteLast',url));
    }
         
      
    };
  };

  export const setQra = (qra) => {
    return {
        type: SET_QRA,
        qra: qra
    };
}

export const setLocation = (lat,lon) => {
    return {
        type: SET_LOCATION,
        lat: lat,
        lon: lon
    };
}


export const updateQsoStatusSentAndSqlRdsId = (sqlrdsid,typestatus, bandstatus, modestatus) => {
    return {
        type: QSO_SENT_UPDATES_AND_SQLRDSID,
        sqlrdsid: sqlrdsid,
        typestatus: typestatus,
        bandstatus: bandstatus,
        modestatus: modestatus
    };
}

export const postQsoNew = (bodyqsonew,qsoqras,mediafiles,jwtToken) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('postQsoNew'));
      console.log("ejecuta llamada API Qso NEW");  
    try {
       console.log("Antes1 QSO new" ); 
        // session = await Auth.currentSession();
        // console.log("Su token Qso New es: " + session.idToken.jwtToken);
        let apiName = 'superqso';
        let path = '/qsonew';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }, // OPTIONAL
          body: bodyqsonew
          
        }


      respuesta =  await API.post(apiName, path, myInit);
      console.log("llamo api QsoNEW!");
      console.log(respuesta);
    
      console.log("EL QSO Number es:" + respuesta.body.message);
      dispatch(fetchingApiSuccess('postQsoNew',respuesta));
     
      if (respuesta.body.error===0)
      {

      //  dispatch(actindicatorPostQsoNewFalse());

         // actualizo el monthly_qso_new en el reducer (user Info)
         dispatch(setUserInfo('monthly_qso_new',respuesta.body.message));
       
        console.log("error es 0 y sqlrdsid: "+respuesta.body.message);
        let aux_sqlrdsid = respuesta.body.message.newqso;
      if (bodyqsonew.type==='POST')
         dispatch(updateQsoStatusSentAndSqlRdsId (respuesta.body.message.newqso,true,false,false));
      else
        dispatch(updateQsoStatusSentAndSqlRdsId (respuesta.body.message.newqso,true,true,true));
        await dispatch(postQsoQras("ALL",respuesta.body.message.newqso, qsoqras,jwtToken));
          console.log('mediafiles length:'+mediafiles.length);
         
       
          if (mediafiles.length>0)
          { // quiere decir que el usuario saco fotos o grabo audios antes de generarse el sqlrdsid
            update = {"sqlrdsid": aux_sqlrdsid, "status": 'inprogress'}
            await dispatch(updateMedia('',update,'sqlrdsid'));
              mediafiles.map(x => {
                console.log('entro MAP');
               dispatch(uploadMediaToS3(x.name, x.url,x.fileauxProfileAvatar, aux_sqlrdsid, x.description, x.size, x.type, x.rdsUrlS3, x.urlNSFW, x.urlAvatar,  x.date, x.width, x.height,'',jwtToken));
               // console.log(x.url)
              //  <Media name={name} imageurl={url} fileauxProfileAvatar={fileauxProfileAvatar} sqlrdsid= {sqlrdsid} description={description} type={type} size={size}
              //  status={status} progress={progress} sent={sent} rdsUrlS3={rdsUrlS3} urlNSFW={urlNSFW} urlAvatar={urlAvatar} date={date} width={width} height={height} />
            
              });
           }

      }

      dispatch(actindicatorPostQsoNewFalse());

     
    }
    catch (error) {
      console.log('Api catch error:', error);
      dispatch(fetchingApiFailure('postQsoNew',error));

      // Handle exceptions
    }
         
      
    };
  };

  export const postQsoQras = (type, sqlRdsId, qsoqras,jwtToken) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('postQsoQras'));
      console.log("ejecuta llamada API POSTqsoQRAS");  
    try {
        // session = await Auth.currentSession();
        // console.log("Su token es: " + session.idToken.jwtToken);
        var arr = [];
        var reformattedArray = qsoqras.map(function(obj){ 
            
           // rObj[obj.clave] = obj.valor;
           arr.push(obj.qra);
            
         });

         console.log("SIN FORMATEAR: "+ JSON.stringify(qsoqras));
         console.log("reformateado: "+ JSON.stringify(arr));

        let apiName = 'superqso';
        let path = '/qsoqraadd';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }, // OPTIONAL
          body: {"qso": sqlRdsId,
                "qras": arr                }
          
        }


      respuesta = await API.post(apiName, path, myInit);
      console.log("llamo api! QSO_QRA_ADD");
      console.log(respuesta)
     // console.log("EL QSO Number es:" + respuesta.message);
      dispatch(fetchingApiSuccess('postQsoQras',respuesta));
     
     
      if (respuesta.body.error===0)
      {
       // dispatch(updateSqlRdsId(respuesta.message));
        console.log("error es 0 y SALIDA de QsoQraADD: "+JSON.stringify(respuesta.body.message));
      //  console.log("FOLLOWING: "+respuesta.message[0].following )

        if (type==='ALL')
        {
        // actualizo el status de todos los QRAs del QSO como SENT ya que fue enviado a AWS
        console.log("actualizo TODOS los QRAs");
        status = {"sent": true}
        dispatch(updateQsoQraStatus(status));
        }else 
        { // Actualizo solo el QRA que se envio, que es uno solo
            console.log("actualizo solo un QRA");
            status = {"sent": true}
            dispatch(updateQsoOnlyOneQraStatus(status, arr[0]));
        }

      }
     
    }
    catch (error) {
      console.log('Api catch error:', error);
      dispatch(fetchingApiFailure('postQsoQras',error));
      // Handle exceptions
    }
         
      
    };
  };

  export const updateQsoQraStatus = (status) => {
    return {
        type: UPDATE_QSOQRA_SENT_STATUS,
        sentStatus: status
    };
}

export const updateQsoOnlyOneQraStatus = (status, qra) => {
    return {
        type: UPDATE_ONLYONE_QSOQRA_SENT_STATUS,
        sentStatus: status,
        qra: qra
    };
}

export const postQsoEdit = (qsoHeader,jwtToken) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('postQsoEdit'));
      console.log("ejecuta llamada API QsoEdit");  
    try {
        // session = await Auth.currentSession();
      //  console.log("Su token es: " + session.idToken.jwtToken);
  

         console.log("SIN FORMATEAR: "+ JSON.stringify(qsoHeader));
     

        let apiName = 'superqso';
        let path = '/qsoedit';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }, // OPTIONAL
          body: {
                "mode": qsoHeader.mode,
                "band": qsoHeader.band,
                "qso": qsoHeader.sqlrdsid,
                "type": qsoHeader.type               }
          
        }


      respuesta = await API.post(apiName, path, myInit);
      console.log("llamo api! QSO_EDIT");
    
     
      dispatch(fetchingApiSuccess('postQsoEdit',respuesta));
     
      if (respuesta.error==='0')
      {
       // dispatch(updateSqlRdsId(respuesta.message));
        console.log("error es 0 y SALIDA de QsoEDITQ: "+JSON.stringify(respuesta.message));

       
        // actualizo el status de todos los QRAs del QSO como SENT ya que fue enviado a AWS
        console.log("actualizo el QsoHeaderStatus");
        
        dispatch(updateQsoHeaderStatusTrue());
        

      }
     
    }
    catch (error) {
      console.log('Api catch error:', error);
      dispatch(fetchingApiFailure('postQsoEdit',error));
      // Handle exceptions
    }
         
      
    };
  };


  export const updateQsoHeaderStatusTrue = () => {
    return {
        type: UPDATE_QSO_HEADER_STATUS
    };
}

export const resetQso = () => {
    return {
        type: RESET_QSO
    };
}

export const resetForSignOut = () => {
  return {
      type: RESET_FOR_SIGN_OUT
  };
}

export const updateMediaStatus = (filename,status) => {
    return {
        type: UPDATE_MEDIA_STATUS,
        filename: filename,
        status: status
    };
}

export const updateMedia = (filename,update,updateType) => {
    return {
        type: UPDATE_MEDIA,
        filename: filename,
        update: update,
        updatetype: updateType
    };
}

export const deleteQsoQra = (qra) => {
    return {
        type: QSO_QRA_DELETE,
        qra: qra
    };
}


export const manage_notifications = (notiftype, notif) => {
  return {
      type: MANAGE_NOTIFICATIONS,
      notifType: notiftype,
      notifications: notif
  };
}



export const managePushToken = (token, qra, state) => {
  return {
      type: MANAGE_PUSH_TOKEN,
      qratoken: qra,
      pushtoken: token,
      tokenstate: state
  };
}



export const setToken = (token) => {
  return {
      type: SET_TOKEN,
      jwttoken: token
  };
}

export const setUserInfo = (mode, userInfo) => {
  return {
      type: SET_USER_INFO,
      mode: mode,
      userinfo: userInfo
  };
}



export const postSetProfilePicNSFW = (rdslurl, urlNSFW, urlAvatar, filename2,fileaux ,fileauxProfileAvatar,identityId,jwtToken) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('postSetProfilePicNSFW'));
    //   console.log("ejecuta llamada API SetProfilePic");  
    try {
        // session = await Auth.currentSession();
        // console.log("Su token es: " + session.idToken.jwtToken);
        let apiName = 'superqso';
        let path = '/qra-set-profile-pic';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }, // OPTIONAL
          body: {
            "url":  urlNSFW,
            "url_avatar": '',
            "mode": 'NSFW' 
               }
          
        }


      respuesta = await API.post(apiName, path, myInit);
    //   console.log("llamo api SetProfilePic!");
    
      
      dispatch(fetchingApiSuccess('postSetProfilePicNSFW',respuesta));
      console.log("devuelve SetProfilePic: "+JSON.stringify(respuesta));
     
      if (respuesta.body.error===0)
      {
       // dispatch(updateSqlRdsId(respuesta.message));
       console.log('PROFILE NO ES PORNO');
        console.log("error es 0 y sqlrdsid: "+respuesta.message);



               // subo foto bajo nombre profile.jpg y el avatar tambien ya que no es porno el TMP que envie
       let folder;
       let timeStamp = Date.now();
       let fileauxFinal = fileaux;
        if (Platform.OS == 'ios')
        {
          fileauxFinal =  fileaux.replace("file:///", '');
        }
        console.log('contenido fileauxFinal: '+fileauxFinal);

     // Envio el profile.jpg     

           folder = 'profile/profile_'+timeStamp+'.jpg';
         //folder = 'profile/profile.jpg';

               enBlob = RNFetchBlob.fs.readFile(fileauxFinal, 'base64').then(data => new Buffer(data, 'base64'));
               //   return this.readFile(fileauxFinal)
                  enBlob
                  .then(buffer => Storage.vault.put(folder, buffer, { level: 'protected' }))
                  .then (result => {
                           console.log('resultado:'+result.key);
         
         
                         // actualizo SENT como TRUE en mediafile para ese file.
                         console.log("actualizo a 0.9");
                         update = {"sent": true, "progress": 0.8}
                         dispatch(updateMedia(fileName2,update,'item'));

                         console.log("subio1 profile.jpg");
                   
             
                  
                    //  console.log("llama a postSetProfilePic");
                    //  dispatch(postSetProfilePic(rdslurl, urlAvatar, fileName2));
                    
                     

// ahora envio el AVATAR
                     let urlprofile;
                     let urlprofileAvatar;
                     let fileauxFinal = fileauxProfileAvatar;
                     if (Platform.OS == 'ios')
                     {
                       fileauxFinal =  fileauxProfileAvatar.replace("file:///", '');
                     }
                     console.log('contenido fileauxFinal: '+fileauxFinal);
         
                     folder = 'profile/profile_av_'+timeStamp+'.jpg';
                   //folder = 'profile/profile_avatar.jpg';

                     enBlob = RNFetchBlob.fs.readFile(fileauxFinal, 'base64').then(data => new Buffer(data, 'base64'));
                     //   return this.readFile(fileauxFinal)
                        enBlob
                        .then(buffer => Storage.vault.put(folder, buffer, { level: 'protected' }))
                        .then (result => {
                                 console.log('resultado:'+result.key);
               
               
                               // actualizo SENT como TRUE en mediafile para ese file.
                               console.log("actualizo a 0.9");
                               update = {"sent": true, "progress": 0.95}
                               dispatch(updateMedia(fileName2,update,'item'));
      
                               console.log("subio1 AVATAR");
                   
                        
                           console.log("llama a postSetProfilePic");
                           
                           urlprofile = identityId+'profile/profile_'+timeStamp+'.jpg';
                           urlprofileAvatar = identityId+'profile/profile_av_'+timeStamp+'.jpg';


                           dispatch(postSetProfilePic(urlprofile, urlprofileAvatar, fileName2, jwtToken));
                          
                           
               
                      
               
                   
                   
                             
                   
                               
                               })
                               .catch(err => {
                                 console.log(JSON.stringify(err));
                                 console.log("fallo el UPLOAD profile_avatar.jpg");
                                
                             
                                 update = {"status": 'failed'}
                                 dispatch(updateMedia(fileName2,update,'item'));
                                       
                               });











         
             
             
                       
             
                         
                         })
                         .catch(err => {
                           console.log(JSON.stringify(err));
                           console.log("fallo el UPLOAD profile.jpg");
                          
                       
                           update = {"status": 'failed'}
                           dispatch(updateMedia(fileName2,update,'item'));
                                 
                         });
         






   
    //   update = {"status": 'sent', "progress": 1}
    //     dispatch(updateMedia(filename2, update));
    //     dispatch(profilePictureRefresh());
     

      }else
      {
        if (respuesta.body.error===1 && respuesta.body.message==='NSFW') 
          update = {status: 'inappropriate content'}
        else
           update = {status: 'failed'}
       
        dispatch(updateMedia(filename2, update,'item' ));
      }
     
    }
    catch (error) {
      console.log('Api catch error:', error);
      update = {status: 'failed'}
      dispatch(updateMedia(filename2, update,'item' ));
      dispatch(fetchingApiFailure('postSetProfilePicNSFW',error));
      // Handle exceptions
    }
         
      
    };
  };

export const postSetProfilePic = (url,urlNSFWavatar, filename2, jwtToken) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('postSetProfilePic'));
      console.log("ejecuta llamada API SetProfilePic");  
    try {
      const identityID = await AsyncStorage.getItem('identity');
        // session = await Auth.currentSession();
        // console.log("Su token es: " + session.idToken.jwtToken);
        let apiName = 'superqso';
        let path = '/qra-set-profile-pic';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }, // OPTIONAL
          body: {
            "url":  url,
            "url_avatar": urlNSFWavatar,
            "mode": 'PERSIST',
            "identityId": identityID
               }
          
        }


      respuesta = await API.post(apiName, path, myInit);
      console.log("llamo api SetProfilePic!");
    
      
      dispatch(fetchingApiSuccess('postSetProfilePic',respuesta));
      console.log("devuelve SetProfilePic: "+JSON.stringify(respuesta));
     
      if (respuesta.body.error===0)
      {
       // dispatch(updateSqlRdsId(respuesta.message));
       console.log('PROFILE PERSISTIO');
        console.log("error es 0 y sqlrdsid: "+respuesta.message);

      //  update = {"status": "sent", "progress": 1}
      update = {"status": 'sent', "progress": 1}
        dispatch(updateMedia(filename2, update,'item'));
        dispatch(profilePictureRefresh(urlNSFWavatar));
        // stat = {"sent": true, "progress": 0.8}
        // this.props.updateMediaSent(fileName2,stat);

      }else
      {
        if (respuesta.body.error===1 && respuesta.body.message==='NSFW') 
          update = {status: 'inappropriate content'}
        else
           update = {status: 'failed'}
       
        dispatch(updateMedia(filename2, update,'item' ));
      }
     
    }
    catch (error) {
      console.log('Api catch error:', error);
      update = {status: 'failed'}
      dispatch(updateMedia(filename2, update,'item' ));
      dispatch(fetchingApiFailure('postSetProfilePic',error));
      // Handle exceptions
    }
         
      
    };
  };


  export const get_notifications = (jwtToken) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('get_notifications'));
      console.log("ejecuta llamada API get_notifications");  
    try {
        // session = await Auth.currentSession();
        // console.log("Su token es: " + session.idToken.jwtToken);
        let apiName = 'superqso';
        let path = '/qra-notification';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }, // OPTIONAL
          // body: {
           
          //      }
          
        }


      respuesta = await API.get(apiName, path, myInit);
      console.log("llamo api get_notifications!");
    
      
      dispatch(fetchingApiSuccess('get_notifications',respuesta));
      console.log("devuelve get_notifications: "+JSON.stringify(respuesta));
     
      if (respuesta.body.error===0)
      {

        dispatch(manage_notifications('ADD',respuesta.body.message));


      }
     
    }
    catch (error) {
      console.log('Api get_notifications catch error:', error);
      dispatch(fetchingApiFailure('get_notifications',error));
      // Actualzio jwtToken por si fallo por Token Expired
      session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
     
    }
         
      
    };
  };

  export const set_notification_read = (notifActivity,jwtToken) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('set_notification_read'));
      console.log("ejecuta llamada API set_notifications");  
      console.log('numero de activity:' + notifActivity);
    try {
        // session = await Auth.currentSession();
        // console.log("Su token es: " + session.idToken.jwtToken);
        let apiName = 'superqso';
        let path = '/qra-notification/set-read';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }, // OPTIONAL
           body: {
                 //  "idqra_notifications" : notifId
                 "idactivity" : notifActivity
                }
          
        }


      respuesta = await API.post(apiName, path, myInit);
      console.log("llamo api set_notifications!");
    
      
      dispatch(fetchingApiSuccess('set_notification_read',respuesta));
      console.log("devuelve set_notifications: "+JSON.stringify(respuesta));
     
      if (respuesta.body.error===0)
      {  // no importa el resultado porque la igual se la borro antes de redux a la notification
         // esto es para avisar al server, si llega a fallar mala leche, no pasa nada.

       

      }
     
    }
    catch (error) {
      console.log('Api set_notifications catch error:', error);
      dispatch(fetchingApiFailure('set_notification_read',error));
      session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
     
     
    }
         
      
    };
  };

 

    export const postPushToken = (token, qra, deviceType,jwtToken) => {
      return async dispatch => {
        dispatch(fetchingApiRequest('postPushToken'));
        console.log("ejecuta llamada API postPushToken");  
      try {
          // session = await Auth.currentSession();
          // console.log("Su token es: " + session.idToken.jwtToken);
          let apiName = 'superqso';
          let path = '/push-device';
          let myInit = { // OPTIONAL
            headers: {
              'Authorization': jwtToken,
              'Content-Type': 'application/json'
            }, // OPTIONAL
            body: {
              "qra": qra,
              "token": token,
              "device_type": deviceType
                 }
            
          }
  
  
        respuesta = await API.post(apiName, path, myInit);
        console.log("llamo api postPushToken!");
      
        
        dispatch(fetchingApiSuccess('postPushToken',respuesta));
        console.log("devuelve postPushToken: "+JSON.stringify(respuesta));
       
        if (respuesta.body.error===0)
        {
         // dispatch(updateSqlRdsId(respuesta.message));
          AsyncStorage.setItem('qratoken', qra);
         console.log('Grabo TokenPush en backend');
          //console.log("error es 0 y sqlrdsid: "+respuesta.message);
  
        //  update = {"status": "sent", "progress": 1}
      //  update = {"status": 'sent', "progress": 1}
     //     dispatch(updateMedia(filename2, update,'item'));
     //     dispatch(profilePictureRefresh());
          // stat = {"sent": true, "progress": 0.8}
          // this.props.updateMediaSent(fileName2,stat);
  
        }else
        {
          console.log('Error al Grabar TokenPush en backend');
          // if (respuesta.body.error===1 && respuesta.body.message==='NSFW') 
          //   update = {status: 'inappropriate content'}
          // else
          //    update = {status: 'failed'}
         
          // dispatch(updateMedia(filename2, update,'item' ));
        }
       
      }
      catch (error) {
        console.log('Api postPushToken catch error:', error);
        // update = {status: 'failed'}
        // dispatch(updateMedia(filename2, update,'item' ));
         dispatch(fetchingApiFailure('postPushToken',error));
        // Handle exceptions
      }
           
        
      };
    };


export const postAddMedia = (mediaToadd, filename2, jwtToken) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('postAddMedia'));
      console.log("ejecuta llamada API Add Media");  
    try {
        // session = await Auth.currentSession();
        // console.log("Su token es: " + session.idToken.jwtToken);
        let apiName = 'superqso';
        let path = '/qsomediaadd';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }, // OPTIONAL
          body: mediaToadd
          
        }

        console.log("URL media es: "+mediaToadd.url);
      respuesta = await API.post(apiName, path, myInit);
      console.log("llamo api MediaAdd!");
    
      
      dispatch(fetchingApiSuccess('postAddMedia',respuesta));
      console.log("devuelve addmedia: "+JSON.stringify(respuesta));
     
      if (respuesta.body.error===0)
      {
       // dispatch(updateSqlRdsId(respuesta.message));
        console.log("error es 0 y sqlrdsid: "+respuesta.message);

      //  update = {"status": "sent", "progress": 1}
      update = {"status": 'sent', "progress": 1}
        dispatch(updateMedia(filename2, update,'item'));
        // stat = {"sent": true, "progress": 0.8}
        // this.props.updateMediaSent(fileName2,stat);

      }else
      {
        if (respuesta.body.error===1 && respuesta.body.message==='NSFW') 
        update = {status: 'inappropriate content'}
        else
        update = {status: 'failed'}
        dispatch(updateMedia(filename2, update,'item' ));
      }
     
    }
    catch (error) {
      console.log('Api catch error:', error);
      update = {status: 'failed'}
      dispatch(updateMedia(filename2, update,'item' ));
      dispatch(fetchingApiFailure('postAddMedia',error));
      // Actualzio jwtToken por si fallo por Token Expired
      session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));
      // Handle exceptions
    }
         
      
    };
  };

 // fileauxProfileAvatar
 
export const uploadMediaToS3 = (fileName2, fileaux,fileauxProfileAvatar, sqlrdsid, description, size, type, rdsUrlS3, urlNSFW, urlAvatar,  date, width, height,identityId,jwtToken) => {
    return async dispatch => {
    //  dispatch(fetchingApiRequest());
      console.log("ejecuta UPLOAD a S3 desde ACTION");  
    try {
      let folder;

        // const response = await fetch(fileaux);
        // const blobi = await response.blob();
        update = {"sent": true, "progress": 0.45}
        dispatch(updateMedia(fileName2,update,'item'));

     //agrego native
        let fileauxFinal = fileaux;
        if (Platform.OS == 'ios')
        {
          fileauxFinal =  fileaux.replace("file:///", '');
        }
        console.log('contenido fileauxFinal: '+fileauxFinal);

           if (type==='image') folder = 'images/'+fileName2;
          else folder = 'audios/'+fileName2;
          

          if (type==='profile') folder = 'profile/tmp/profile.jpg';
      
        console.log('folder:'+ folder);
  //  let a = {"folder": folder}

  const identityID = await AsyncStorage.getItem('identity');
  console.log('upload media identityid:' +identityID)

//, contentType: 'image/png'
         enBlob = RNFetchBlob.fs.readFile(fileauxFinal, 'base64').
         then(data => new Buffer(data, 'base64'));
        //  console.log(enBlob.buffer);
        //  console.log(enBlob)
      //   return this.readFile(fileauxFinal)
         enBlob
         .then(buffer => 
         
         Storage.vault.put(folder, buffer, { level: 'protected' }))
         .then (result => {
                  console.log('resultado:'+result.key);
                // actualizo SENT como TRUE en mediafile para ese file.
                update = {"sent": true, "progress": 0.7}
                dispatch(updateMedia(fileName2,update,'item'));

                
    
                // procedo a llamar API de addmedia al RDS
                mediaToRds = {
                  "qso":  sqlrdsid,
                  "type": type ,
                  "datasize": size,
                  "datetime": date,   
                  "width": width,
                  "height": height,   
                  "url":  rdsUrlS3,
                  "description": description,
                  "identityId" : identityID
              }
           if (type !== 'profile')
           {
              dispatch(postAddMedia(mediaToRds, fileName2,jwtToken));
              console.log("LLLLLLLLLLL LLamo recien a media: "+ fileName2);



              console.log('llamo kinesis addmedia')
              let tiempo = Date.now()
              resultki = Analytics.record({
                data: { 
                     
                    // The data blob to put into the record
             //      QRA: 'LU8AJ', timeStamp: tiempo, mediatype: type, url: rdsUrlS3 
             errornumber: '200', errordesc: 'errordesc',  version: 'APP_VER', qra: 'LU9DO', platform: 'Platf.OS', platformversion: 'Platf.Ver' ,timestamp: 'tiempo'
                   
                },
                // OPTIONAL
                partitionKey: 'myPartitionKey', 
                streamName: 'analytic_stream'
            }, 'AWSKinesis');
          
            console.log('resultado kinesis addmedia:'+ JSON.stringify(resultki));
            console.log('tiempo addmedia:'+tiempo)


           }else
           {
            // modifico la URL debido a que es PROFILE y el primer llamado lo sube a la carpeta
            // TMP para verificar si es NSFW
            // let cant = rdsUrlS3.lenght - 4;
            // console.log('texto menos 4 caracteres: '+rdsUrlS3.substr(0,cant) + ' verdadero '+ rdsUrlS3);
            console.log("LLama postSetProfilePicNSFW: ");
            
            dispatch(postSetProfilePicNSFW(rdsUrlS3, urlNSFW, urlAvatar,  fileName2, fileaux, fileauxProfileAvatar,identityId,jwtToken));
           

           }

         
              
    
                
                })
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


              
    }
    catch (error) {
      console.log('Api UPLOAD S3 catch error:', error);


      update = {"status": 'failed'}
      dispatch(updateMedia(fileName2,update,'item'));

      // actualizo token por las dudas que haya fallado por Token Expired
      session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));

      //dispatch(fetchingApiFailure(error));
      // Handle exceptions
    }
         
      
    };
  };




export const QsoQraDelete = (sqlrdsid, qra, jwtToken) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('QsoQraDelete'));
      console.log("ejecuta llamada API QsoQraDELETE");  
    try {
        // session = await Auth.currentSession();
      //  console.log("Su token es: " + session.idToken.jwtToken);
  

    //     console.log("SIN FORMATEAR: "+ JSON.stringify(qsoHeader));
     

        let apiName = 'superqso';
        let path = '/qsoqradel';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }, // OPTIONAL
          body: {
            "qso":  sqlrdsid ,
            "qras": [qra]    
               }
          
        }


      respuesta = await API.post(apiName, path, myInit);
      console.log("llamo api! QsoQraDELETE");
      
    
     
      dispatch(fetchingApiSuccess('QsoQraDelete',respuesta));
     
      if (respuesta.body.error===0)
      {
       // dispatch(updateSqlRdsId(respuesta.message));
        console.log("error es 0 y SALIDA de QsoQraDELETE: "+JSON.stringify(respuesta.body.message));
       

       
        // actualizo el status de todos los QRAs del QSO como SENT ya que fue enviado a AWS
        console.log("actualizo el QsoQras");
        
        dispatch(deleteQsoQra(qra));
        

      }
     
    }
    catch (error) {
      console.log('Api catch DELETE_QSO_QRA error:', error);
      dispatch(fetchingApiFailure('QsoQraDelete',error));
      // Handle exceptions
    }
         
      
    };
  };

  export const setUrlRdsS3 = (identityid, urlrds) => {
    return {
        type: SET_URL_RDS_S3,
        identityid: identityid,
        urlrds: urlrds

    };
}

export const followAdd = (qra, date,jwtToken,qra_avatar) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('followAdd'));
      console.log("ejecuta llamada API followAdd");  
    try {
        // session = await Auth.currentSession();
        // console.log("Su token es: " + session.idToken.jwtToken);
        let apiName = 'superqso';
        let path = '/qra-follower';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }, // OPTIONAL
          body: {
            "qra": qra,
            "datetime": date
          }
        }

      // actualizo como que el QRA se agrego al Follow para que la UX sea rapida
      // y despues la API lo impacta en la base de datos de forma asincrona.
      following = {"following": 'TRUE'} 
      dispatch(updateQraUrl(qra,following));
       follow_one = {"qra": qra, "avatarpic": qra_avatar}
      //follow_one = {"idqrafollowers":398,"idqra":489,"idqra_followed":441,"datetime":"2016-04-28T14:12:00.000Z","qra":"LU9FFF","profilepic":"https://d3gbqmcrekpw4.cloudfront.net/protected/us-east-1%3Aa50c88c0-9448-4d32-8fae-329cd0485888/profile/profile.jpg","avatarpic":"https://d3gbqmcrekpw4.cloudfront.net/protected/us-east-1%3Aa50c88c0-9448-4d32-8fae-329cd0485888/profile/profile_avatar.jpg"}
       console.log(follow_one);
        dispatch(insertFollowings(follow_one,'ONE'));


      respuesta = await API.post(apiName, path, myInit);
      console.log("llamo api Follow ADD!");
      //console.log("respuesta API:" + JSON.stringify(respuesta));
      console.log("respuesta API Follow Add:" + JSON.stringify(respuesta.body.message));
      console.log("FOLLOW ANTES de ENTRAR porque ERROR === 0 " + respuesta.body.error);
      if (respuesta.body.error===0)
      {
        console.log("FOLLOW entro porque ERROR === 0 " + respuesta.body.error);
   //  following = {"following": 'TRUE'} 
   //  dispatch(updateQraUrl(qra,following));
      dispatch(insertFollowings(respuesta.body.message,'ALL'));
     
    //   console.log("la url que envio:" + url);
    //   console.log("EL QRA:" + qra);
      }
      dispatch(fetchingApiSuccess('followAdd',respuesta));
      
      
    }
    catch (error) {
      console.log('Api catch error Follow ADD:', error);
      dispatch(fetchingApiFailure('followAdd',error));

      // es probable que haya fallado por vencimiento de TOKEN y como es Follow y ya se le aviso al usuario que 
      // lo esta siguiendo se refresca el token y se llama a la API de nuevo pot ultima vez.
       session = await Auth.currentSession();
       console.log("Su token es: " + session.idToken.jwtToken);
       dispatch(followAddSecondChance(qra, date,session.idToken.jwtToken,qra_avatar))
      // Handle exceptions
    }
         
      
    };
  };



  export const followAddSecondChance = (qra, date,jwtToken,qra_avatar) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('followAddSecondChance'));
      console.log("ejecuta llamada API followAdd SecondChance");  
    try {
        // session = await Auth.currentSession();
        // console.log("Su token es: " + session.idToken.jwtToken);
        let apiName = 'superqso';
        let path = '/qra-follower';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }, // OPTIONAL
          body: {
            "qra": qra,
            "datetime": date
          }
        }

      // actualizo como que el QRA se agrego al Follow para que la UX sea rapida
      // y despues la API lo impacta en la base de datos de forma asincrona.
     
      // following = {"following": 'TRUE'} 
      // dispatch(updateQraUrl(qra,following));
    //   follow_one = {"qra": qra, "avatarpic": qra_avatar}
    
      //  console.log(follow_one);
      //   dispatch(insertFollowings(follow_one,'ONE'));


      respuesta = await API.post(apiName, path, myInit);
      console.log("llamo api Follow ADD SecondChance !");
      //console.log("respuesta API:" + JSON.stringify(respuesta));
      console.log("respuesta API Follow Add SecondChance :" + JSON.stringify(respuesta.body.message));
      console.log("FOLLOW ANTES de ENTRAR SecondChance porque ERROR === 0 " + respuesta.body.error);
      if (respuesta.body.error===0)
      {
        console.log("FOLLOW SecondChance entro porque ERROR === 0 " + respuesta.body.error);
   //  following = {"following": 'TRUE'} 
   //  dispatch(updateQraUrl(qra,following));
      dispatch(insertFollowings(respuesta.body.message,'ALL'));
     
    //   console.log("la url que envio:" + url);
    //   console.log("EL QRA:" + qra);
      }
      dispatch(fetchingApiSuccess('followAddSecondChance',respuesta));
      
      
    }
    catch (error) {
      console.log('Api catch error Follow ADD SecondChance:', error);
      dispatch(fetchingApiFailure('followAddSecondChance',error));
      following = {"following": 'FALSE'} 
      dispatch(updateQraUrl(qra,following));
      // Handle exceptions
    }
         
      
    };
  };


  export const unfollow = (qra,jwtToken) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('unfollow'));
      console.log("ejecuta llamada API UnFollow");  
    try {
        // session = await Auth.currentSession();
        // console.log("Su token es: " + session.idToken.jwtToken);
        let apiName = 'superqso';
        let path = '/qra-follower';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }, // OPTIONAL
          body: {
            "qra": qra
            
          }
        }


      // actualizo como que el QRA le hizo el UnFollow para que la UX sea rapida
      // y despues la API lo impacta en la base de datos de forma asincrona.
      following = {"following": 'FALSE'} 
      dispatch(updateQraUrl(qra,following));

      respuesta = await API.del(apiName, path, myInit);
      console.log("llamo api Follow ADD!");
      console.log(respuesta);
      //console.log("respuesta API:" + JSON.stringify(respuesta));
      console.log("respuesta API UnFollow Add:" + JSON.stringify(respuesta.body.message));
      console.log("unFOLLOW ANTES de ENTRAR porque ERROR === 0 " + respuesta.body.error);
      if (respuesta.body.error===0)
      {
        console.log("unFOLLOW entro porque ERROR === 0 " + respuesta.body.error);
      // following = {"following": 'FALSE'} 
      // dispatch(updateQraUrl(qra,following));
      dispatch(insertFollowings(respuesta.body.message,'ALL'));
    
      }
      dispatch(fetchingApiSuccess('unfollow',respuesta));
      
      
    }
    catch (error) {
      console.log('Api catch error unFollow :', error);
      dispatch(fetchingApiFailure('unfollow',error));
      // Handle exceptions
    }
         
      
    };
  };




  export const getUserInfo = (jwtToken) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('getUserInfo'));
      console.log("ejecuta llamada API getUserInfo"); 
      console.log("TOKEN getUserInfo:"+jwtToken); 
    try {
        // session = await Auth.currentSession();
        // console.log("Su token es: " + session.idToken.jwtToken);
        let apiName = 'superqso';
        let path = '/user-info';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }, // OPTIONAL
        //   body: {
           
        //   }
        }

        
      respuesta = await API.get(apiName, path, myInit);
      console.log("llamo api getUserInfo");
      //console.log("respuesta API:" + JSON.stringify(respuesta));
      console.log("respuesta API getUserInfo:");
      console.log(respuesta);
      
      if (respuesta.body.error===0)
      {  
          
          followings = respuesta.body.message.following;
          followers = respuesta.body.message.followers;
        //   console.log("la url que envio:" + url);
        //   console.log("EL QRA:" + qra);
          dispatch(fetchingApiSuccess('getUserInfo',respuesta));
        //  dispatch(insertFollowingsFollowers(followings,followers));
            dispatch(setUserInfo('ALL',respuesta.body.message.qra))
            dispatch(insertFollowings(followings,'ALL'));
            dispatch(insertFollowers(followers));
            if (respuesta.body.message.qra.avatarpic===null) 
              avatar_profile = '';
            else 
              avatar_profile = respuesta.body.message.qra.avatarpic;

            dispatch(profilePictureRefresh(avatar_profile));
            dispatch(manage_notifications('ADD',respuesta.body.message.notifications));
      }
       

      
    }
    catch (error) {
      console.log('Api getUserInfo catch error:', error);
      dispatch(fetchingApiFailure('getUserInfo',error));

      // Handle exceptions
      }    
    };
  };

  export const updateLocationBackend = (lat,lon,jwtToken) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('updateLocationBackend'));
      console.log("ejecuta llamada API updateLocationBackend"); 
      console.log("TOKEN updateLocationBackend:"+jwtToken); 
    try {

        let apiName = 'superqso';
        let path = '/qra-info/location';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }, // OPTIONAL
           body: {
            "longitude": lon,
            "latitude": lat
           }
        }

        
      respuesta = await API.post(apiName, path, myInit);
      console.log("llamo api updateLocationBackend");
     
      console.log("respuesta API updateLocationBackend:");
      console.log(respuesta);

      if (respuesta.body.error===0)
      {
     
         dispatch(fetchingApiSuccess('updateLocationBackend',respuesta));
      }
    
      
    }
    catch (error) {
      console.log('Api updateLocationBackend catch error:', error);
      dispatch(fetchingApiFailure('updateLocationBackend',error));

      // Handle exceptions
      }    
    };
  };

export const insertFollowings = (followings,mode) => {
    return {
        type: INSERT_FOLLOWINGS,
        followings: followings,
        mode: mode
        
    };
}
export const insertFollowers = (followers) => {
    return {
        type: INSERT_FOLLOWERS,      
        followers: followers
    };
}

export const followersAlreadyCalled = (status) => {
    return {
        type: FOLLOWERS_ALREADY_CALLED,
        status: status
    };
}

export const followingsSelected = (selected) => {
    return {
        type: FOLLOWINGS_SELECTED,
        selected: selected
    };
}

export const insertQraSearched = (qras) => {
    return {
        type: QRA_SEARCH,
        qras: qras
    };
}

export const updateLinkQso = (json, scanType) => {
  return {
      type: UPDATE_LINK_QSO,
      json: json,
      scanType: scanType
  };
}






export const getQrasFromSearch = (qraTosearch,jwtToken) => {
    return async dispatch => {
      dispatch(fetchingApiRequest('getQrasFromSearch'));
      console.log("ejecuta llamada API getQrasFromSearch");  
    try {
        // session = await Auth.currentSession();
        // console.log("Su token es: " + session.idToken.jwtToken);
        let apiName = 'superqso';
        let path = '/qra-list-secured';
        let myInit = { // OPTIONAL
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          },
          body: {
            "qra": qraTosearch
            
          }
        }

      
       
      respuesta = await API.post(apiName, path, myInit);
      if (respuesta.body.message.error===0)
      {
            console.log("respuesta API getQrasFromSearch:" + JSON.stringify(respuesta));
                  
            dispatch(insertQraSearched(respuesta.body.message.message));
      }else{
           envio = [];
           dispatch(insertQraSearched(envio));
        }
 
      dispatch(fetchingApiSuccess('getQrasFromSearch',respuesta));
      
    }
    catch (error) {
      console.log('Api getQrasFromSearch catch error:', error);
      dispatch(fetchingApiFailure('getQrasFromSearch',error));
      // Handle exceptions
    }    
    };
  };


  export const checkInternet = () => {
    return async dispatch => {
       let res = await NetInfo.getConnectionInfo().then((connectionInfo) => { 
           console.log('devuelve NetInfo:'+connectionInfo.type); 
           salida = true;
          if (connectionInfo.type==='none'){
              console.log('paso por NO hay wifi');
              salida = false;}


       })
       return salida;

      };          
    };

    export const getQslScan = (QsoTosearch,ScanType,myQRA,jwtToken) => {
        return async dispatch => {
          dispatch(fetchingApiRequest('getQslScan'));
          console.log("ejecuta llamada API getQSL SCAN");  
          if (ScanType==='qslScan')
                qslscan = true;
              else
                qslscan = false;

        try {
            // session = await Auth.currentSession();
            // console.log("Su token es: " + session.idToken.jwtToken);
            let apiName = 'superqso';
            let path = '/qso-detail-qr';
            let myInit = { // OPTIONAL
              headers: {
               'Authorization': jwtToken,
                'Content-Type': 'application/json'
              },
              body: {
                "qso": QsoTosearch,
                "scan": qslscan
                
              }
            }
    
          
           
          respuesta = await API.post(apiName, path, myInit);
            
            // {
                console.log("respuesta API getQSL SCAN:" + JSON.stringify(respuesta));
                if (respuesta.body.error===0)
                  { console.log('UPDATE SCANS: '+respuesta.body.message);
                  console.log(respuesta.body.message);
                    dispatch(setUserInfo('scans_links',respuesta.body.message));
                    respuesta.body.message.qso.datetime = getDateQslScan(respuesta.body.message.qso.datetime);
                    
                    if (respuesta.body.message.qso.type==='SHARE')
                      respuesta.body.message.qso.original[0].datetime = getDateQslScan(respuesta.body.message.qso.original[0].datetime);

                    console.log("respuesta DESPUES DE MODIF FECHA:" + JSON.stringify(respuesta));
               
                     if (ScanType==='qslScan')
                         dispatch(updateQslScan(respuesta));
                       else
                       {
                        if (ScanType==='mainQsoLink'){
                        // Esta Scaneando algo relacionado con QsoLink (o Main o agreggadno un QSO al Link del Main)
                          let qsolink = {"idqsos": respuesta.body.message.qso.idqsos, "qra": respuesta.body.message.qso.qra, "mode": respuesta.body.message.qso.mode, "band": respuesta.body.message.qso.band, "type": respuesta.body.message.qso.type,
                          "profilepic": respuesta.body.message.qso.profilepic,  "avatarpic": respuesta.body.message.qso.avatarpic,  "qras": respuesta.body.message.qso.qras, 
                           "datetime": respuesta.body.message.qso.datetime, "error": 0, links: [] }

                           if (respuesta.body.message.qso.qra===myQRA)
                             dispatch(updateLinkQso(qsolink,'mainQsoLink'));
                             else
                             {  
                               jsonError = {code: 1, message: "The Qso Scanned does not belong to you."}
                               dispatch(updateLinkQso(jsonError,'linkQsoError'));
                            }
                        }
                            else
                            { // es un Qsolink para agregar al mainQso
                              let qsolink = {"idqsos": respuesta.body.message.qso.idqsos, "qra": respuesta.body.message.qso.qra, "mode": respuesta.body.message.qso.mode, "band": respuesta.body.message.qso.band, "type": respuesta.body.message.qso.type,
                          "profilepic": respuesta.body.message.qso.profilepic,  "avatarpic": respuesta.body.message.qso.avatarpic,  "qras": respuesta.body.message.qso.qras, 
                           "datetime": respuesta.body.message.qso.datetime }
                       
                           if (respuesta.body.message.qso.qra!==myQRA)
                                   dispatch(updateLinkQso(qsolink,'linkQso'));
                                else
                                   {  
                                    jsonError = {code: 1, message: "The QSO you want to link in this STEP must be from other user, not yours."}
                                    dispatch(updateLinkQso(jsonError,'linkQsoError'));
                                 }   
                            }

                        

                          

                       }  


                  }
                else
                 { // body.error <> 0
                  //respuesta.body.error = 1;
                  if (ScanType==='qslScan') 
                    dispatch(updateQslScan(respuesta));
                  else
                  {
                    // let qsolink = {"qra": respuesta.body.message.qra, "mode": respuesta.body.message.mode, "band": respuesta.body.message.band, "type": respuesta.body.message.type,
                    // "profilepic": respuesta.body.message.profilepic,  "avatarpic": respuesta.body.message.avatarpic,  "qras": respuesta.body.message.qras, 
                    //  "datetime": respuesta.body.message.datetime, "error": 1, message: "Sorry, the scanned Qso doesn't exist." }

                    // dispatch(updateLinkQso(qsolink,'mainQsoLink'));
                    jsonError = {code: 1, message: "Sorry, the scanned Qso doesn't exist."}
                    dispatch(updateLinkQso(jsonError,'linkQsoError'));
                  }


                 }

            

       
          
    
          dispatch(fetchingApiSuccess('getQslScan',respuesta));
          
        }
        catch (error) {
          console.log('Api get QSL Scan catch error:', error);
          dispatch(fetchingApiFailure('getQslScan',error));
          // Handle exceptions
        }    
        };
      };




export const linkQsos = (json,jwtToken) => {
  return async dispatch => {
    dispatch(fetchingApiRequest('linkQsos'));
    console.log("ejecuta llamada API qso-link");  
  try {
      // session = await Auth.currentSession();
      // console.log("Su token es: " + session.idToken.jwtToken);
      let apiName = 'superqso';
      let path = '/qso-link';


      // armo el array de los qso a Linkear
        arraux = [];
        json.links.map((m, i) => {

         addItem = {"qso": m.idqsos}  
         arraux = [...arraux,addItem];


        })

        console.log('imprimo el arraux:' );
        console.log(json.idqsos);
        console.log(arraux);



      let myInit = { // OPTIONAL
        headers: {
          'Authorization': jwtToken,
          'Content-Type': 'application/json'
        },
        body: {
          "qso": json.idqsos,
          "qsos_rel": arraux
          
        }
      }

    
     
    respuesta = await API.post(apiName, path, myInit);
    if (respuesta.body.error===0)
    {
          console.log("respuesta API qso-link:" + JSON.stringify(respuesta));
          console.log(respuesta.body);
          let qsolink = { "error": 0 }

           
             dispatch(updateLinkQso(qsolink,'linkQsoApiResult'));
             dispatch(setUserInfo('scans_links',respuesta.body.message));
            

                
          
    }else{
         let men = '';
        if (respuesta.body.message.code==='ER_DUP_ENTRY')
             men = 'This Qso has already Linked';
           else
             men = 'There was an error Linking the Qsos: '+respuesta.body.message;

             console.log('imprimo en error de /qso-link :' + men )
        
        //  let qsolink = { "error": 1, "message": men }
         jsonError = {code: 1, message: men}
           dispatch(updateLinkQso(jsonError,'linkQsoError'));

      //   dispatch(updateLinkQso(qsolink,'linkQsoApiResult'));
      }

    dispatch(fetchingApiSuccess('linkQsos',respuesta));
    
  }
  catch (error) {
     // por las dudas si fallo por token expired
      session = await Auth.currentSession();
      dispatch(setToken(session.idToken.jwtToken));

    console.log('Api qso-link catch error:', error);
    dispatch(fetchingApiFailure('linkQsos',error));

    // envio mensaje de error para bajar el modal del LINKING QSO ya que queda colgada la APP
    jsonError = {code: 1, message: 'We could not link the Qsos, please try again'}
    dispatch(updateLinkQso(jsonError,'linkQsoError'));
    // Handle exceptions
  }    
  };
};

export const postContactUs = (email,message,jwtToken) => {
  return async dispatch => {
    dispatch(fetchingApiRequest('postContactUs'));
    console.log("ejecuta llamada API postContactUs");  
  try {
     
      let apiName = 'superqso';
      let path = '/contactformsend';
      let myInit = { // OPTIONAL
        headers: {
          'Authorization': jwtToken,
          'Content-Type': 'application/json'
        }, // OPTIONAL
        body: {
        
                "email": email,
                "message": message
                     
              }
        
      }


    respuesta = await API.post(apiName, path, myInit);
    console.log("llamo api! postContactUs");
  
   
    dispatch(fetchingApiSuccess('postContactUs',respuesta));
   
    if (respuesta.body.error===0)
    {
     
      console.log("error es 0 y SALIDA de postContactUs: "+JSON.stringify(respuesta.body.message));
      
      console.log("ya envio el mail de contact Us");  

    }else
      console.log("hay error en llamado de API ->  de postContactUs: "+JSON.stringify(respuesta.body.message));

   
  }
  catch (error) {
    console.log('Api catch error:', error);
    dispatch(fetchingApiFailure('postContactUs',error));
    // Handle exceptions
  }
       
    
  };
};
    

      export const updateQslScan = (qslresult) => {
        return {
            type: UPDATE_QSL_SCAN,
            qslresult: qslresult
        };
    }

    export const updateQslScanResult = (result) => {
        return {
            type: UPDATE_QSL_SCAN_RESULT,
            result: result
        };
    }

    
    export const refreshFollowings = (status) => {
        return {
            type: REFRESH_FOLLOWINGS,
            status: status
        };
    }
    
    export const searchQrasLocal = (qratosearch,count) => {
        return {
            type: QRA_SEARCH_LOCAL,
            qratosearch: qratosearch,
            count: count
        };
    }