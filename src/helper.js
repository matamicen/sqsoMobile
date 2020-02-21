import {APP_VERSION} from './appVersion';
import awsconfig from './aws-exports';
import Analytics from '@aws-amplify/analytics';
import { AWSKinesisProvider } from 'aws-amplify';
import {  Platform } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

Analytics.addPluggable(new AWSKinesisProvider());

Analytics.configure(awsconfig);

export const hola=(qsoqras)=>{

    if ( (qsoqras.length > 0))
 {     return 'ESTA CON COSAS';
    } else 
  return 'ESTA EMPTY';
}

export const chau=()=>{
  return 'chau';
}

export const updateOnProgress=(qsotype,band,mode,qsoqras,mediafiles)=>{
 let devuelvo;
    if(qsotype==='POST' && mediafiles.length > 0){
      
      return true;
    }
    else {
      // se cambio a mediafiles.length > 1 porque se invento un media inicial vacio para que funcione la salida del teclado de iOS si se toca
      // el body de los Media (TouchwithoutFeedback)
        if ((qsotype!=='POST') && (qsoqras.length > 0) && (band !== 'Band') && (mode !== 'Mode') && (mediafiles.length > 1) )
        { 
            return true;
        } 
        else {
            return false; 
        
        }

    }
   
  }

  export const getDate =  () => {
    var day = '';
    var month = '';
    var hours = '';
    var minutes = '';
    var seconds = '';
    var now = new Date();
    var date = new Date( now.getTime() + (now.getTimezoneOffset() * 60000));
    var monthaux = date.getMonth() + 1;
    var dayOfMonthaux = date.getDate();
    var year = date.getFullYear();
    var houraux = date.getHours();
    var minutesaux = date.getMinutes();
    var secondsaux = date.getSeconds();

    if (monthaux<10) month = '0'+monthaux
      else
        month = monthaux;
    if (dayOfMonthaux<10) day = '0'+dayOfMonthaux
      else
       day = dayOfMonthaux;
    if (houraux<10) hours = '0'+houraux
       else
        hours = houraux;
    if (minutesaux<10) minutes = '0'+minutesaux
        else
         minutes  = minutesaux;
    if (secondsaux<10) seconds = '0'+secondsaux
        else
        seconds  = secondsaux;


    devuelvo = year + '-' + month + '-' + day + ' ' + hours+':'+minutes+':'+seconds;


    return devuelvo;

   }


   getDateHelper =  () => {
    var day = '';
    var month = '';
    var hours = '';
    var minutes = '';
    var seconds = '';
    var now = new Date();
    var date = new Date( now.getTime() + (now.getTimezoneOffset() * 60000));
    var monthaux = date.getMonth() + 1;
    var dayOfMonthaux = date.getDate();
    var year = date.getFullYear();
    var houraux = date.getHours();
    var minutesaux = date.getMinutes();
    var secondsaux = date.getSeconds();

    if (monthaux<10) month = '0'+monthaux
      else
        month = monthaux;
    if (dayOfMonthaux<10) day = '0'+dayOfMonthaux
      else
       day = dayOfMonthaux;
    if (houraux<10) hours = '0'+houraux
       else
        hours = houraux;
    if (minutesaux<10) minutes = '0'+minutesaux
        else
         minutes  = minutesaux;
    if (secondsaux<10) seconds = '0'+secondsaux
        else
        seconds  = secondsaux;


    devuelvo = year + '-' + month + '-' + day + ' ' + hours+':'+minutes+':'+seconds;


    return devuelvo;

   }

  export const check_firstTime_OnProgress=(qsotype,band,mode,qraowner,onprogress,sqlrdsid,latitude,longitude)=>{
     console.log("DENTRO de CHECK FIRST TIME");
     console.log("OnProgress: "+ onprogress);
    if (onprogress && sqlrdsid===''){

     
      fechaqso = this.getDateHelper();
      console.log("FECHAAA: " + fechaqso);


      const data = {
        "band" : band,
        "mode" : mode,
        "type" : qsotype,
        "longitude" : longitude,
        "latitude": latitude,
        "datetime": fechaqso,
        "qra_owner": qraowner
      };

      return data;
    }


  }

  export const getDateQslScan =  (fecha) => {

    year = fecha.substr(0,4);
    month = fecha.substr(5,2);
    day = fecha.substr(8,2);
    time = fecha.substr(11, 5);
    let monthString = 'pep';

    console.log('FECHAAA: '+fecha + 'mes:'+month + ' '+ monthString );

    switch(month) {
        case '01': monthString = 'Jan';break;
        case '02': monthString = 'Feb';break;
        case '03': monthString = 'Mar';break;
        case '04': monthString = 'Apr';break;
        case '05': monthString = 'May';break;
        case '06': monthString = 'Jun';break;
        case '07': monthString = 'Jul';break;
        case '08': monthString = 'Ago';break;
        case '09': monthString = 'Sep';break;
        case '10': monthString = 'Oct';break;
        case '11': monthString = 'Nov';break;
        case '12': monthString = 'Dec';break;
        


    }

    console.log('FECHAAA: '+fecha + 'monthString:'+monthString );


   return monthString + ' '+ day + ','+ ' '+year+' '+time;

  }

  export const getFollowStatus =  (followings,qratosearch) => {

  if (followings.length>0)
  {  
    devuelvo = 'false';

    followings.map(item => {
      if(item.qra === qratosearch){
        devuelvo = 'true' 
      }
      
    })

    return devuelvo;
  }
  else return 'empty';


  }
  // , {method: Method.HEAD}
  export async function hasAPIConnection() {
    const timeout = 2500

   // var now2 = new Date();
   // now2.replace(/\s/g, '');
   var fechaEnMiliseg = String(Date.now());

     // now2.replace(' ','');
   // var now3 = now2.replace(/\s+/g, '');

   const myNewStr = fechaEnMiliseg.substr(12, 1);
    console.log('INTERNET CHECK NOW: '+fechaEnMiliseg)
    console.log('substring:' + myNewStr);
    try {
        return await new Promise((resolve, reject) => {

        //  console.log('substring:' + fechaEnMiliseg.substring(13, 1));
        if (myNewStr >=0 && myNewStr <=3)
        {
          console.log('elif menor q 4');
            setTimeout(() => {reject()}, timeout)
            fetch('https://www.google.com?'+fechaEnMiliseg)
                .then((response) => { 
                resolve(response.ok)})
                .catch(() => {
                 // crashlytics().setUserId(this.props.qra);
                  crashlytics().log('error: ') ;
                  crashlytics().recordError(new Error('hasAPIConnection1'));
                  reject()
                })
        }
        
        if (myNewStr >= 4 && myNewStr <= 7)
          {
            console.log('elif menor q a 8');
            setTimeout(() => {reject()}, timeout)
            fetch('https://www.bing.com?'+fechaEnMiliseg)
                .then((response) => { 
                resolve(response.ok)})
                .catch(() => {
                  
                  crashlytics().log('error: ') ;
                  crashlytics().recordError(new Error('hasAPIConnection2'));
                  
                  reject()
                })
              }

              if (myNewStr >= 8 && myNewStr <= 9)
              {
                console.log('elif menor q a 10');
                setTimeout(() => {reject()}, timeout)
                fetch('https://www.yahoo.com?'+fechaEnMiliseg)
                    .then((response) => { 
                    resolve(response.ok)})
                    .catch(() => {
                      
                      crashlytics().log('error: ') ;
                      crashlytics().recordError(new Error('hasAPIConnection3'));
                      
                      
                      reject()})
                  }

        })
      
    } catch (e) {
        return false
    }
}

export const kinesis_catch =  (errnumber, errordesc, qra) => {

    console.log('llamo kinesis desde helper')
      let tiempo = Date.now();
      //let ostype = Platform.OS;
      resultki = Analytics.record({
        data: { 
            
            // The data blob to put into the record
          errorNumber: errnumber, errorDesc: errordesc,  version: APP_VERSION, qra: qra, platform: Platform.OS, platformVersion: Platform.Version ,timeStamp: tiempo
          
        },
        // OPTIONAL
        partitionKey: 'myPartitionKey', 
        streamName: 'analytic_stream'
    }, 'AWSKinesis');

}

export const checkMediaSentOfFreeUser =  (mediafiles,type,maxPerQso) => {

  if (followings.length>0)
  {  
    mediaCount = 0;

    mediafiles.map(item => {
      if(item.type === type) {
        if (item.status!=='inappropriate content')
            mediaCount = mediaCount + 1;  
      } 
    })
    
    if (mediaCount<maxPerQso)
        return true;
      else
        return false;
  }
  else return true;


  }

  export const showVideoReward =  (userInfo,spot,mediafiles) => {


    console.log('monthly: '+userInfo.monthly_qso_new + ' from: '+userInfo.account_type.app_qso_new_reward_from + 'To: '+userInfo.account_type.app_qso_new_reward_to + '  every:'+userInfo.account_type.app_qso_new_reward_every)
  
    if (spot==='newqso')
      if (userInfo.monthly_qso_new >= userInfo.account_type.app_qso_new_reward_from 
        && userInfo.monthly_qso_new <= userInfo.account_type.app_qso_new_reward_to)
        {
          auxQsoNew = userInfo.monthly_qso_new + userInfo.account_type.app_qso_new_reward_every - userInfo.account_type.app_qso_new_reward_from;
          if (auxQsoNew % userInfo.account_type.app_qso_new_reward_every === 0 || userInfo.monthly_qso_new===userInfo.account_type.app_qso_new_reward_from)
          {
            console.log('es TRUE')
            return true;
          }else {
            console.log('es FALSE')
            return false;
                }
        }
        else {
          console.log('es FALSE')
          return false;
        }

        if (spot==='audio')
       {  

        console.log('entro audio reward')
        currentQty = 0;
        // cuento cuantos audios tiene en el QSO actual
        mediafiles.map(item => {
          if (item.type==='audio')
              currentQty++;
         })

       
        
        if (currentQty >= userInfo.account_type.app_qso_audio_add_reward_from 
              && currentQty <= userInfo.account_type.app_qso_audio_add_reward_to)
              {
             
                auxCurrentQty = currentQty + userInfo.account_type.app_qso_audio_add_reward_every - userInfo.account_type.app_qso_audio_add_reward_from;
                console.log(' auxCurrentQty: '+auxCurrentQty);
                
                if (auxCurrentQty % userInfo.account_type.app_qso_audio_add_reward_every === 0 || currentQty===userInfo.account_type.app_qso_audio_add_reward_from)
                 {  console.log('videoaudio es TRUE')
                    return true;
                  }else
                  {
                    console.log('videoaudio es FALSE')
                    return false;

                  }
              }
              else {
                console.log('es FALSE')
                return false;
              }

            }

   if (spot==='image')
   {
    console.log('entro image reward')
      currentQty = 0;
      // cuento cuantas photos tiene en el QSO actual
      mediafiles.map(item => {
       if (item.type==='image')
           currentQty++;
      })

     

              if (currentQty >= userInfo.account_type.app_qso_photo_add_reward 
                  && currentQty <= userInfo.account_type.app_qso_photo_add_reward_to)
                  {
                    
                    auxCurrentQty = currentQty + userInfo.account_type.app_qso_photo_add_reward_every - userInfo.account_type.app_qso_photo_add_reward;
                    console.log(' auxCurrentQty: '+auxCurrentQty);

                    if (auxCurrentQty % userInfo.account_type.app_qso_photo_add_reward_every === 0 || currentQty===userInfo.account_type.app_qso_photo_add_reward)
                    {  console.log('videoimage es TRUE')
                       return true;
                     }else
                     {
                       console.log('videoimage es FALSE')
                       return false;
   
                     }
                  }
                  else {
                    console.log('es FALSE')
                    return false;
                  }

       }

       if (spot==='scanqr')
       {
        console.log('VideoReward monthly Scans: '+userInfo.monthly_scans);
        if (userInfo.monthly_scans >= userInfo.account_type.app_qso_scan_reward_from 
          && userInfo.monthly_scans <= userInfo.account_type.app_qso_scan_reward_to)
          {
                    
            auxCurrentScans = userInfo.monthly_scans + userInfo.account_type.app_qso_scan_reward_every - userInfo.account_type.app_qso_scan_reward_from;
            console.log(' auxCurrentScans: '+auxCurrentScans);

            if (auxCurrentScans % userInfo.account_type.app_qso_scan_reward_every === 0 || userInfo.monthly_scans===userInfo.account_type.app_qso_scan_reward_from)
            {  console.log('videoimage es TRUE')
               return true;
             }else
             {
               console.log('videoimage es FALSE')
               return false;

             }
          }
          else {
            console.log('es FALSE')
            return false;
          }
        }


          if (spot==='linkqso')
          {
            console.log('VideoReward monthly QsoLinks: '+userInfo.monthly_links);
            
            if (userInfo.monthly_links >= userInfo.account_type.app_qso_link_reward_from 
              && userInfo.monthly_links <= userInfo.account_type.app_qso_link_reward_to)
              {
                    
                auxCurrentLinks = userInfo.monthly_links + userInfo.account_type.app_qso_link_reward_every - userInfo.account_type.app_qso_link_reward_from;
                console.log(' auxCurrentLinks: '+auxCurrentLinks);
    
                if (auxCurrentLinks % userInfo.account_type.app_qso_link_reward_every === 0 || userInfo.monthly_links===userInfo.account_type.app_qso_link_reward_from)
                {  console.log('videoimage LinkQso es TRUE')
                   return true;
                 }else
                 {
                   console.log('videoimage LinkQso es FALSE')
                   return false;
    
                 }
              }
              else {
                console.log('videoimage LinkQso es FALSE')
                return false;
              }
             }

         
  

    

  
    }

 
    export const showIntersitial =  (userInfo,spot,mediafiles) => {
  
     
  if (spot==='newqso')
      if (userInfo.monthly_qso_new >= userInfo.account_type.app_qso_new_intersitial_from 
          && userInfo.monthly_qso_new <= userInfo.account_type.app_qso_new_intersitial_to)
          {
            auxQsoNew = userInfo.monthly_qso_new + userInfo.account_type.app_qso_new_intersitial_every - userInfo.account_type.app_qso_new_intersitial_from;
            if (auxQsoNew % userInfo.account_type.app_qso_new_intersitial_every === 0 || userInfo.monthly_qso_new===userInfo.account_type.app_qso_new_intersitial_from)
            {
              console.log('es TRUE')
              return true;
            }else {
              console.log('es FALSE')
              return false;
                  }
          }
          else {
            console.log('es FALSE')
            return false;
          }


      if (spot==='audio')
       {  

        console.log('entro audio intersitial')
        currentQty = 0;
        // cuento cuantos audios tiene en el QSO actual
        mediafiles.map(item => {
          if (item.type==='audio')
              currentQty++;
         })


        if (currentQty >= userInfo.account_type.app_qso_audio_add_intersitial_from 
              && currentQty <= userInfo.account_type.app_qso_audio_add_intersitial_to)
              {
             
                auxCurrentQty = currentQty + userInfo.account_type.app_qso_audio_add_intersitial_every - userInfo.account_type.app_qso_audio_add_intersitial_from;
                console.log(' auxCurrentQty: '+auxCurrentQty);
                
                if (auxCurrentQty % userInfo.account_type.app_qso_audio_add_intersitial_every === 0 || currentQty===userInfo.account_type.app_qso_audio_add_intersitial_from)
                 {  console.log('videoaudio es TRUE')
                    return true;
                  }else
                  {
                    console.log('videoaudio es FALSE')
                    return false;

                  }
              }
              else {
                console.log('es FALSE')
                return false;
              }

            }

   if (spot==='image')
   {
    console.log('entro image intersitial')
      currentQty = 0;
      // cuento cuantas photos tiene en el QSO actual
      mediafiles.map(item => {
       if (item.type==='image')
           currentQty++;
      })

              if (currentQty >= userInfo.account_type.app_qso_photo_add_intersitial 
                  && currentQty <= userInfo.account_type.app_qso_photo_add_intersitial_to)
                  {
                    
                    auxCurrentQty = currentQty + userInfo.account_type.app_qso_photo_add_intersitial_every - userInfo.account_type.app_qso_photo_add_intersitial;
                    console.log(' auxCurrentQty: '+auxCurrentQty);

                    if (auxCurrentQty % userInfo.account_type.app_qso_photo_add_intersitial_every === 0 || currentQty===userInfo.account_type.app_qso_photo_add_intersitial)
                    {  console.log('intersitial es TRUE')
                       return true;
                     }else
                     {
                       console.log('intersitial es FALSE')
                       return false;
   
                     }
                  }
                  else {
                    console.log('es FALSE')
                    return false;
                  }

       }

       if (spot==='scanqr')
      {
       console.log('Intersitial monthly Scans: '+userInfo.monthly_scans);
       
       if (userInfo.monthly_scans >= userInfo.account_type.app_qso_scan_intersitial_from 
         && userInfo.monthly_scans <= userInfo.account_type.app_qso_scan_intersitial_to)
         {
                    
          auxCurrentScans = userInfo.monthly_scans + userInfo.account_type.app_qso_scan_intersititial_every - userInfo.account_type.app_qso_scan_intersitial_from;
          console.log(' auxCurrentScans: '+auxCurrentScans);

          if (auxCurrentScans % userInfo.account_type.app_qso_scan_intersititial_every === 0 || userInfo.monthly_scans===userInfo.account_type.app_qso_scan_intersitial_from)
          {  console.log('intersitial scanQr es TRUE')
             return true;
           }else
           {
             console.log('intersitial scanQr es FALSE')
             return false;

           }
        }
         else {
           console.log('intersitial scanQr FALSE')
           return false;
         }
        }

         if (spot==='linkqso')
         {
          console.log('Intersitial monthly QsoLinks: '+userInfo.monthly_links);
          
          if (userInfo.monthly_links >= userInfo.account_type.app_qso_link_intersitial_from 
            && userInfo.monthly_links <= userInfo.account_type.app_qso_link_intersitial_to)
            {
                    
              auxCurrentLinks = userInfo.monthly_links + userInfo.account_type.app_qso_link_intersitial_every - userInfo.account_type.app_qso_link_intersitial_from;
              console.log(' auxCurrentLinks: '+auxCurrentLinks);
  
              if (auxCurrentLinks % userInfo.account_type.app_qso_link_intersitial_every === 0 || userInfo.monthly_links===userInfo.account_type.app_qso_link_intersitial_from)
              {  console.log('intersitial LinkQso es TRUE')
                 return true;
               }else
               {
                 console.log('intersitial  LinkQso es FALSE')
                 return false;
  
               }
            }
            else {
              console.log('intersitial LinkQso es FALSE')
              return false;
            }
           }
   
  

        
    
    }

    