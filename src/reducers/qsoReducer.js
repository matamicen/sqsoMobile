import {FETCHING_API_REQUEST,
    FETCHING_API_SUCCESS,
    FETCHING_API_FAILURE,
    SET_BAND, SET_MODE, ADD_QRA, ADD_MEDIA, CLOSE_MODALCONFIRM_PHOTO,
    OPEN_MODALCONFIRM_PHOTO, SEND_ACTUAL_MEDIA,
    ACT_INDICATOR_IMAGE_ENABLED, CAMERA_PERMISSION_TRUE,
    CAMERA_PERMISSION_FALSE, AUDIO_RECORDING_PERMISSION_TRUE,
    AUDIO_RECORDING_PERMISSION_FALSE, NEW_QSO_ACTIVE_TRUE, NEW_QSO_ACTIVE_FALSE,
    CHANGE_QSO_TYPE, ON_PROGRESS_TRUE, ON_PROGRESS_FALSE, UPDATE_QRA_URL, SET_QRA,
    QSO_SENT_UPDATES_AND_SQLRDSID, UPDATE_QSOQRA_SENT_STATUS,
    UPDATE_ONLYONE_QSOQRA_SENT_STATUS, UPDATE_QSO_HEADER_STATUS, RESET_QSO,
    UPDATE_MEDIA,
    CLOSE_MODAL_RECORDING, OPEN_MODAL_RECORDING,
    ACT_INDICATOR_POST_QSO_NEW_FALSE, ACT_INDICATOR_POST_QSO_NEW_TRUE,
    QSO_QRA_DELETE, SET_URL_RDS_S3, INSERT_FOLLOWINGS, INSERT_FOLLOWERS, 
    FOLLOWERS_ALREADY_CALLED,
    FOLLOWINGS_SELECTED, QRA_SEARCH, UPDATE_QSL_SCAN, REFRESH_FOLLOWINGS, QRA_SEARCH_LOCAL,
    PROFILE_PICTURE_REFRESH, SET_LOCATION, SET_STOPALLAUDIOS, UPDATE_LINK_QSO, SET_TOKEN,
     RESET_FOR_SIGN_OUT, MANAGE_PUSH_TOKEN, MANAGE_NOTIFICATIONS,
     SET_USER_INFO, MANAGE_LOCATION_PERMISSIONS, QSO_SCREEN_DIDMOUNT, SET_WELCOME_USER_FIRST_TIME,
     CONFIRMED_PURCHASE_FLAG, SET_SUBSCRIPTION_INFO, SET_RESTORE_CALL,
     SET_SENDING_PROFILE_PHOTO_MODAL, SET_CONFIRM_PROFILE_PHOTO_MODAL,
     SET_PROFILE_MODAL_STAT  } from '../actions/types';
import { SectionList } from 'react-native';

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
    qsoScreenDidMountFirstTime: true,
    welcomeUserFirstTime: false,
    confirmedPurchaseFlag: false,
    productId: '',
    localizedPrice: 0,
    iapShowed: 0,
    version: '0.1.8',
    env: 'QA',
    restoreCalled: false,
    restoreMessage: '',
    sendingProfileModal: false,
    confirmProfileModal: false,
    sendingProfileModal_stat: 0,
    cancelButton_stat: 0,


    currentQso: {
        
        sqlrdsId: '',
        onProgress: false,
        datetime: '',
  //      qsoqras: [{name: 'LU8AJ', url: 'https://randomuser.me/api/portraits/thumb/men/81.jpg'},
   //               {name: 'LW5AAA', url: 'https://randomuser.me/api/portraits/med/men/72.jpg'}],
        qsoqras: [],
        qsotype: 'QSO',
        qsotypeSent: false,
        band: 'Band',
        bandSent: false,
        mode: 'Mode',
        modeSent: false,
        mediafiles: [ {name: 'vacio', type: 'vacio'}],
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
        qslscan: {
            "statusCode": 200,
            "headers": {
               
            },
            "body": {   
                 "error": 5,
                 "message": {  }
                    }
                 },
         qsolink: {
               
                         },
         qsolinkCodes: {code: 0, message: " "},
        refreshFollowings: false,
        latitude: 0,
        longitude: 0
            


             }
    
}

function filterQras(arr, qratosearch){
    return arr.filter (arr => {
        return arr.qra.includes(qratosearch)
    })
}

const qsoReducer = (state = initialState, action) => {
    let newStore;
    let auxcurrentQso;
     switch(action.type) {
         case FETCHING_API_REQUEST:
           {
               if (action.apiName==='getUserInfo')
                 {
                    //  return {...state, isFetchingUserInfo: true, userInfoApiSuccesMessage: '',
                    //   userInfoApiErrorMessage: '' };
                    newStore = Object.assign({}, state,
                        {
                            ...state,
                            isFetchingUserInfo: true, userInfoApiSuccesMessage: '',
                           userInfoApiErrorMessage: ''
                        });
                    return newStore; 
                }

           }

           return state;


         case FETCHING_API_FAILURE:
         
         if (action.apiName==='getUserInfo')
                 {
                    //  return {...state, isFetchingUserInfo: false,
                    //   userInfoApiErrorMessage: action.payload };

                      newStore = Object.assign({}, state,
                        {
                            ...state,
                            isFetchingUserInfo: false,
                            userInfoApiErrorMessage: action.payload,
                            errorApiMessage: action.payload
                        });
                    return newStore;
                }
                else
                {
                    newStore = Object.assign({}, state,
                        {
                            ...state,
                            isFetchingUserInfo: false,
                            errorApiMessage: action.payload
                        });
                    return newStore;
                    
                }

                return state;
         
        //  return {...state, isFetching: false, errorApiMessage: action.payload  };
     
         case FETCHING_API_SUCCESS:

         if (action.apiName==='getUserInfo')
         {
             console.log('trajo getUserInfo')
            //  return {...state, isFetchingUserInfo: false,
            //     userInfoApiSuccesMessage: action.payload,
            //     userInfoApiSuccesStatus: true };

                newStore = Object.assign({}, state,
                    {
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
          

           if (action.param==='didmount')
               { 
                   newStore = Object.assign({}, state,
                   {
                       ...state,
                       qsoScreenDidmount: action.payload
                      
                   });
                   return newStore;
                }
           
            // else
            // locationPermission
            if (action.param==='locationpermission')
            {
                newStore = Object.assign({}, state,
                    {
                        ...state,
                        currentLocationPermission: action.payload
                    
                    });
                    return newStore;
                }

            if (action.param==='adshowed'){

            
               newStore = Object.assign({}, state,
                    {
                         ...state,
                         adShowed: action.payload
                        
                     });

                     return newStore;
                    }


             if (action.param==='iapshowed'){

            
                newStore = Object.assign({}, state,
                         {
                                  ...state,
                                  iapShowed: action.payload
                                 
                              });
         
                              return newStore;
                             }
         

               return state;
    //    }


        //   return {...state, isFetching: false, apiSuccessMessage: action.payload };

        case QSO_SCREEN_DIDMOUNT:

     
                   newStore = Object.assign({}, state,
                   {
                       ...state,
                       qsoScreenDidMountFirstTime: action.payload
                      
                   });
                   return newStore;
               

          case CHANGE_QSO_TYPE:
         auxcurrentQso = {
            ...state.currentQso,
            qsotype: action.typetochange           
        };
        newStore = Object.assign({}, state,
            {
                ...state,
                currentQso: auxcurrentQso
            });
        return newStore;

        
        case CONFIRMED_PURCHASE_FLAG:
                      
     newStore = Object.assign({}, state,
        {
            ...state,
            confirmedPurchaseFlag: action.purchaseState
        });
    
           return newStore;

           case SET_RESTORE_CALL:
                      
            newStore = Object.assign({}, state,
               {
                   ...state,
                   restoreCalled: action.call,
                   restoreMessage: action.message
               });
           
                  return newStore;

      
         case SET_SUBSCRIPTION_INFO:
            
    
            newStore = Object.assign({}, state,
                {
                   ...state,
                   localizedPrice: action.localizedprice,
                   productId: action.productid
                });
               
             return newStore;

         
           

        case SET_BAND:
        auxcurrentQso = {
           ...state.currentQso,
           band: action.band,
           bandSent: false           
       };
       newStore = Object.assign({}, state,
           {
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
      newStore = Object.assign({}, state,
          {
              ...state,
              currentQso: auxcurrentQso
          });
      return newStore;

      case SET_WELCOME_USER_FIRST_TIME:
     
        newStore = Object.assign({}, state,
            {
                ...state,
                welcomeUserFirstTime: action.payload
            });
        return newStore;
      

      case ADD_QRA:
      console.log("desdeREDUCER!! : "+JSON.stringify(action.newqra));
      auxcurrentQso = {
         ...state.currentQso,
         qsoqras: [...state.currentQso.qsoqras, action.newqra]           
     };
     newStore = Object.assign({}, state,
         {
             ...state,
             currentQso: auxcurrentQso
         });
     return newStore; 

     case QSO_QRA_DELETE:
     
     arrqras = state.currentQso.qsoqras;
   
     console.log("REDUCER QRA enviado array antesde borrar: "+action.qra + JSON.stringify(arrqras));
     arrayQraFinal =  deleteSingleQra(arrqras, action.qra);


        function deleteSingleQra(arr, qratodelete){
            return arr.filter (arr => {
                return arr.qra !== qratodelete
            })
        }

        console.log("REDUCER QRA enviado array DESPUES de borrar: "+action.qra + JSON.stringify(arrayQraFinal));

     auxcurrentQso = {
        ...state.currentQso,
        qsoqras: arrayQraFinal,
        qraDeleted: true       
    };
    newStore = Object.assign({}, state,
        {
            ...state,
            currentQso: auxcurrentQso
        });
    return newStore; 


     case UPDATE_QRA_URL:
    // console.log("desdeREDUCER!! : "+JSON.stringify(action.newqra));
     
    var updatedItems1 = state.currentQso.qsoqras.map(item => {
        if(item.qra === action.qra){
          return { ...item, ...action.url }
        }
        return item
      })
      
      if (action.qra==='deleteLast')
      { 
         console.log('entro delete item');
        ;
         var i = state.currentQso.qsoqras.length;
         var items = state.currentQso.qsoqras;
        const filteredItems = items.slice(0, i-1).concat(items.slice(i, items.length))
        updatedItems1 = filteredItems;
       
      }


    // actualizo tambien la lsit de searched de QslScan por si hace un Follow desde ahi
      const updatedItems1_1 = state.currentQso.qraShow.map(item => {
        if(item.qra === action.qra){
          return { ...item, ...action.url }
        }
        return item
      })

      const updatedItems1_2 = state.currentQso.qraSearched.map(item => {
        if(item.qra === action.qra){
          return { ...item, ...action.url }
        }
        return item
      })
  //    return updatedItems
    
    auxcurrentQso = {
        ...state.currentQso,
        qsoqras: updatedItems1,
        qraShow: updatedItems1_1,  
        qraSearched: updatedItems1_2          
    };
    newStore = Object.assign({}, state,
        {
            ...state,
            currentQso: auxcurrentQso
        });
    return newStore; 



    case UPDATE_QSOQRA_SENT_STATUS:
    // console.log("desdeREDUCER!! : "+JSON.stringify(action.newqra));
     
    const updatedItems2 = state.currentQso.qsoqras.map(item => {
   //     if(item.qra === action.qra){
          return { ...item, ...action.sentStatus }
    //    }
        return item
      })
  //    return updatedItems
    
    auxcurrentQso = {
        ...state.currentQso,
        qsoqras: updatedItems2           
    };
    newStore = Object.assign({}, state,
        {
            ...state,
            currentQso: auxcurrentQso
        });
    return newStore; 

    case UPDATE_ONLYONE_QSOQRA_SENT_STATUS:
    // console.log("desdeREDUCER!! : "+JSON.stringify(action.newqra));
     
    const updatedItems3 = state.currentQso.qsoqras.map(item => {
        if(item.qra === action.qra){
          return { ...item, ...action.sentStatus }
        }
        return item
      })
  //    return updatedItems
    
    auxcurrentQso = {
        ...state.currentQso,
        qsoqras: updatedItems3           
    };
    newStore = Object.assign({}, state,
        {
            ...state,
            currentQso: auxcurrentQso
        });
    return newStore; 

    case UPDATE_MEDIA:
     console.log("Reducer UPDATE_MEDIA : "+JSON.stringify(action.updatetype));
     console.log("Reducer UPDATE_MEDIA2 : "+JSON.stringify(action.update));
    //  aux_status = 0;
     
   if (action.updatetype==='item') { 
            const updatedItems5 = state.currentQso.mediafiles.map(item => {

                if(item.name === action.filename){
                    console.log('itemUpd: '+JSON.stringify(item));
                   
                return { ...item, ...action.update }
                }
                return item
              
            })

                
    auxcurrentQso = {
        ...state.currentQso,
        mediafiles: updatedItems5           
    };
    newStore = Object.assign({}, state,
        {
            ...state,
            currentQso: auxcurrentQso
            // sendingProfileModal_stat: aux_status
        });

      }
      if (action.updatetype==='sqlrdsid') { 
          console.log('entro sqlrdsid reducer:' + JSON.stringify(action.update))
        const updatedItems5 = state.currentQso.mediafiles.map(item => {
          //  if(item.name === action.filename){
             if(item.type !== 'profile')
            return { ...item, ...action.update }
          //  }
            return item
        })

            
    auxcurrentQso = {
        ...state.currentQso,
        mediafiles: updatedItems5           
    };
    newStore = Object.assign({}, state,
        {
            ...state,
            currentQso: auxcurrentQso
        });
  }

  

  //    return updatedItems

    return newStore; 


     case ADD_MEDIA:
     console.log("desdeREDUCER ADD_MEDIA!! : ");
     console.log(action.newmedia);
    // var auxmedia = new Array();
     var auxmedia = state.currentQso.mediafiles;
     console.log('mediafiles cant: '+auxmedia.length);
    // si ya hay 3 medias, borro el ultimo item que era el espacio a proposito para generar area 
    // para el touchwithFeedback, asi no scrollea el body con tan pocas media
     if (auxmedia.length===3 && auxmedia[2].type==='vacio')
          popped = auxmedia.pop();
     auxcurrentQso = {
        ...state.currentQso,
        // mediafiles: [...state.currentQso.mediafiles, action.newmedia] 
        // mediafiles: [action.newmedia,...state.currentQso.mediafiles]    
          mediafiles: [action.newmedia,...auxmedia]          
    };
    newStore = Object.assign({}, state,
        {
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
    newStore = Object.assign({}, state,
        {
            ...state,
            currentQso: auxcurrentQso
        });
    return newStore; 

    case SET_PROFILE_MODAL_STAT:
       
    // uso esta action para manejar el status del MODAL y el boton de Cancel dentro del modal
    // el boton de cancel se activa despuesde X segundos por si falla el upload o lo que sea 
    // que el usuario pueda cerrar el modal e intentar de nuevo y no quede atrapado.

     if(action.param==='modal')  
       newStore = Object.assign({}, state,
             {
                 ...state,
                 sendingProfileModal_stat: action.status
             });
    if(action.param==='cancelButton')
        newStore = Object.assign({}, state,
            {
                ...state,
                cancelButton_stat: action.status
            });
    
     if(action.param==='ambos')
            newStore = Object.assign({}, state,
                {
                    ...state,
                    cancelButton_stat: action.status,
                    sendingProfileModal_stat: action.status
                });
     if(action.param==='nsfw')  
                newStore = Object.assign({}, state,
                      {
                          ...state,
                          sendingProfileModal_stat: action.status,
                          cancelButton_stat: 1
                      });
    if(action.param==='failed')  
                      newStore = Object.assign({}, state,
                            {
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
    newStore = Object.assign({}, state,
        {
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
     newStore = Object.assign({}, state,
         {
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
    newStore = Object.assign({}, state,
        {
            ...state,
            currentQso: auxcurrentQso
        });
    return newStore; 

    case SET_SENDING_PROFILE_PHOTO_MODAL:
        //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
        newStore = Object.assign({}, state,
            {
                ...state,
                sendingProfileModal: action.status  
            });
        return newStore; 

        case SET_CONFIRM_PROFILE_PHOTO_MODAL:
            //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
            newStore = Object.assign({}, state,
                {
                    ...state,
                    confirmProfileModal: action.status  
                });
            return newStore; 

        
    
  
    case SEND_ACTUAL_MEDIA:
   //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
     auxcurrentQso = {
        ...state.currentQso,
        mediatosend: action.mediatosend          
    };
    newStore = Object.assign({}, state,
        {
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
     newStore = Object.assign({}, state,
         {
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
     newStore = Object.assign({}, state,
         {
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
      newStore = Object.assign({}, state,
          {
              ...state,
              currentQso: auxcurrentQso
          });
      return newStore; 


     case CAMERA_PERMISSION_TRUE:
      //console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));
     
     newStore = Object.assign({}, state,
         {
             ...state,
             camerapermission: true
         });
     return newStore; 

     case CAMERA_PERMISSION_FALSE:
     //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      
      newStore = Object.assign({}, state,
          {
              ...state,
              camerapermission: false
          });
      return newStore; 

      case AUDIO_RECORDING_PERMISSION_TRUE:
     // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));
     
     newStore = Object.assign({}, state,
         {
             ...state,
             audiorecordingpermission: true
         });
     return newStore; 

     case AUDIO_RECORDING_PERMISSION_FALSE:
     // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));
     
     newStore = Object.assign({}, state,
         {
             ...state,
             audiorecordingpermission: false
         });
     return newStore; 

     case NEW_QSO_ACTIVE_TRUE:
     // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));
     
     newStore = Object.assign({}, state,
         {
             ...state,
             newqsoactive: true
         });
     return newStore; 


     case NEW_QSO_ACTIVE_FALSE:
     // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));
     
     newStore = Object.assign({}, state,
         {
             ...state,
             newqsoactive: false
         });
     return newStore; 


     case SET_STOPALLAUDIOS:
     // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));
     
     newStore = Object.assign({}, state,
         {
             ...state,
             stopAllAudios: action.payload
         });
     return newStore; 

     case SET_URL_RDS_S3:
     // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));
     
     newStore = Object.assign({}, state,
         {
             ...state,
             urlRdsS3: action.urlrds,
             identityId: action.identityid
         });
     return newStore; 

     case SET_TOKEN:
     // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));
     console.log("Reducer jwtToken:"+action.jwttoken);
     newStore = Object.assign({}, state,
         {
             ...state,
             jwtToken: action.jwttoken
         });
     return newStore; 


     case MANAGE_PUSH_TOKEN:
     // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));
    
     newStore = Object.assign({}, state,
         {
             ...state,
             pushToken: action.pushtoken
         });
     return newStore;

     case SET_USER_INFO:
     // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));
     console.log("Reducer User_Info:"+JSON.stringify(action.userinfo));
    if (action.mode==='ALL')
            { newStore = Object.assign({}, state,
                {
                    ...state,
                    userInfo: action.userinfo
                });
            return newStore;
         }
        
         if (action.mode==='scans_links')
          { 
             let modif = {"monthly_scans" : action.userinfo.monthly_scans, "monthly_links" : action.userinfo.monthly_links };
             auxUserInfo = {
                ...state.userInfo,
                monthly_scans: action.userinfo.monthly_scans,
                monthly_links: action.userinfo.monthly_links 

            };
             newStore = Object.assign({}, state,
            {
                ...state,
                userInfo: auxUserInfo
            });
        return newStore;

          }

          if (action.mode==='monthly_qso_new')
          { 
             let modif = {"monthly_qso_new" : action.userinfo.monthly_qso_new };
             auxUserInfo = {
                ...state.userInfo,
                monthly_qso_new: action.userinfo.monthly_qso_new,
              //  monthly_links: action.userinfo.monthly_links 

            };
             newStore = Object.assign({}, state,
            {
                ...state,
                userInfo: auxUserInfo
            });
        return newStore;

          }
            

     case PROFILE_PICTURE_REFRESH:
     // console.log("desdeREDUCER camera TRUE!! : "+JSON.stringify(action.newmedia));
     
     newStore = Object.assign({}, state,
         {
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
      newStore = Object.assign({}, state,
          {
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
      newStore = Object.assign({}, state,
          {
              ...state,
              currentQso: auxcurrentQso
          });
      return newStore; 

      case SET_QRA:
     //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));
      
      newStore = Object.assign({}, state,
          {
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
       newStore = Object.assign({}, state,
           {
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
        newStore = Object.assign({}, state,
            {
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
             qsotype: 'QSO',
             qsotypeSent: false,
             band: 'Band',
             bandSent: false,
             mode: 'Mode',
             modeSent: false,
             mediafiles: [ {name: 'vacio', type: 'vacio'}],
             modalconfirmphoto: false,
             mediatosend: {},
             activityindicatorImage: false,
            
             
 
         };
         newStore = Object.assign({}, state,
             {
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
          newStore = Object.assign({}, state,
              {
                  ...state,
                 userInfoApiSuccesStatus: false,
                  currentQso: auxcurrentQso
                 
              });

              return newStore; 

         case INSERT_FOLLOWINGS:
       
         auxcurrentQso = '';

         if (action.mode==='ALL')
                auxcurrentQso = {
                    ...state.currentQso,
                    followings:  action.followings
                        
                };
            else
            auxcurrentQso = {
                ...state.currentQso,
                followings:  [...state.currentQso.followings,action.followings]  
            };

        newStore = Object.assign({}, state,
            {
                ...state,
                currentQso: auxcurrentQso
            });
        return newStore; 


        case INSERT_FOLLOWERS:
       
        auxcurrentQso = {
           ...state.currentQso,
           followers: action.followers,           
       };
       newStore = Object.assign({}, state,
           {
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
        newStore = Object.assign({}, state,
            {
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
         newStore = Object.assign({}, state,
             {
                 ...state,
                 currentQso: auxcurrentQso
             });
         return newStore; 

         case QRA_SEARCH:
         //  console.log("desdeREDUCER!! : "+JSON.stringify(action.newmedia));

         QrasToShow =  filterQras(action.qras, state.currentQso.localSearch);
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

          newStore = Object.assign({}, state,
              {
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
        newStore = Object.assign({}, state,
            {
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
       newStore = Object.assign({}, state,
           {
               ...state,
               currentQso: auxcurrentQso
              

           });
       return newStore; 

       case QRA_SEARCH_LOCAL:
     
     arrsearched = state.currentQso.qraSearched;
     if (action.count<4) arrsearched = [];

   
     console.log("REDUCER QRAs searched LOCAL: "+ JSON.stringify(arrsearched));
     QrasToShow =  filterQras(arrsearched, action.qratosearch);
    // string.includes(substring);

        // function filterQras(arr, qratosearch){
        //     return arr.filter (arr => {
        //         return arr.qra.includes(qratosearch)
        //     })
        // }

        console.log("REDUCER QRA searched DESPUES de filtrar LOCAL: "+ JSON.stringify(QrasToShow));

     auxcurrentQso = {
        ...state.currentQso,
        qraShow: QrasToShow,
        localSearch: action.qratosearch
            
    };
    newStore = Object.assign({}, state,
        {
            ...state,
            currentQso: auxcurrentQso
        });
    return newStore; 


    case UPDATE_LINK_QSO:

  

    console.log('REDUCER ACTION ScantType: '+action.scanType)


    if (action.scanType==='clear')
    {
        auxcurrentQso = {
            ...state.currentQso,
            qsolink: {},
            qsolinkCodes: {code: 0, message: " "}
                
        };
        
    }
    if (action.scanType==='mainQsoLink' || action.scanType==='linkQsoApiResult')
     {    
         let men = " ";
           if (action.scanType==='linkQsoApiResult')
             { 
                 men = {code: 200, message: "These Qsos are succesuful Linked!"}
                 auxcurrentQso = {
                    ...state.currentQso,
                    qsolinkCodes: men
                    
                  };
             }
             else{
              men = {code: 0, message: " "}
              auxcurrentQso = {
                ...state.currentQso,
                qsolink: action.json,
                qsolinkCodes: men
                
              };

             }

               

                console.log('qsolinkcodes en Reducer: ' + men);
            }

     if (action.scanType==='linkQso')
      {

       // linkQsoAux = state.currentQso.qsolink.links;
        linkQsoAdded = [...state.currentQso.qsolink.links,action.json]
        linkaux = state.currentQso.qsolink;
        linkaux.links = linkQsoAdded;
        auxcurrentQso = {
            ...state.currentQso,
            qsolink: linkaux,
            qsolinkCodes: {code: 0, message: " "}         
        };

      }

      if (action.scanType==='linkQsoError' )
           if (action.json.code===300 || action.json.code===301)
          { if (action.json.code===300)
                auxcurrentQso = {
                    ...state.currentQso,
                    qsolink: {},
                    qsolinkCodes: action.json
                        
                };
                if (action.json.code===301)
                auxcurrentQso = {
                    ...state.currentQso,
                   
                    qsolinkCodes: action.json
                        
                };
            }
            else
            auxcurrentQso = {
                ...state.currentQso,
              
                qsolinkCodes: action.json
                    
            };
 
     

      
    
   newStore = Object.assign({}, state,
       {
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
    newStore = Object.assign({}, state,
        {
            ...state,
            currentQso: auxcurrentQso
        });
    return newStore; 


    case MANAGE_NOTIFICATIONS:
    let auxcurrentQso;
  
    if (action.notifType==='ADD')
      {
                auxcurrentQso = {
                ...state.currentQso,
                notifications: action.notifications     
            };
            auxUnread = action.notifications.length;
        }

        if (action.notifType==='ADDONE')
        {

            console.log('ENTRO ADDONE')
            let repetido = false;
            state.currentQso.notifications.map(item => {
                // if(item.idqra_notifications === action.notifications.idqra_notifications) {
                  if(item.idqra_activity === action.notifications.idqra_activity) {
                  //return { ...item, ...action.url }
                  repetido = true;
                }
               // return item
              })

              console.log('ESTADO de REPETIDO del  IDQRA: '+repetido)



          if (!repetido)
           { auxUnread = state.notificationsUnread + 1;
            let newarray = state.currentQso.notifications;
            newarray.unshift(action.notifications);

         

                  auxcurrentQso = {
                  ...state.currentQso,
                  notifications: newarray    
                 
              };
            }
            else
                    auxcurrentQso = {
                        ...state.currentQso,
                        notifications: state.currentQso.notifications    
                    
                    };

            //  notifications: [...state.currentQso.notifications, action.notifications]     
                 
          }   

     if (action.notifType==='SET_READ')

        {
            let modif = {"read" : 'read'};

            const updatedItems5 = state.currentQso.notifications.map(item => {
                // if(item.idqra_notifications === action.notifications){
                   if(item.idqra_activity === action.notifications){
                return { ...item, ...modif }
                }
                return item
            })


            auxcurrentQso = {
            ...state.currentQso,
            notifications: updatedItems5     
        };
        auxUnread = state.notificationsUnread - 1;

    }
    if (action.notifType==='NOTIF_BACKGROUND_FALSE')
    {  console.log('NOTIF_BACKGROUND_FALSE');
            auxcurrentQso = {
                ...state.currentQso,
                notifBackground: false     
            };
        }
        
    if (action.notifType==='SET_READ_URL')

    {
        console.log('NOTIF_BACKGROUND_TRUE');
        let modif = {"read" : 'read'};

        const updatedItems5 = state.currentQso.notifications.map(item => {
            if(item.idqra_activity === action.notifications){
            return { ...item, ...modif }
            }
            return item
        })


        auxcurrentQso = {
        ...state.currentQso,
        notifications: updatedItems5,
        notifBackground: true     
    };
    auxUnread = state.notificationsUnread - 1;

   }

   if (action.notifType==='DELETE_NOTIF')
    {
        console.log('Delete all notifcations');
      
        auxcurrentQso = {
        ...state.currentQso,
        notifications: []  
          };
          auxUnread = 0;
    

   }


   newStore = Object.assign({}, state,
       {
           ...state,
           notificationsUnread: auxUnread,
           currentQso: auxcurrentQso
       });
   return newStore;

 


        
        

  
         default:
         return state;   
             }
}

export default qsoReducer;

