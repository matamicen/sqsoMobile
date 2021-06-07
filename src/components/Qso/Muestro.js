import React, { Component } from 'react';
//import {FileSystem } from 'expo';
import { connect } from 'react-redux';
import { addMedia, updateMedia, closeModalConfirmPhoto, postAddMedia, uploadMediaToS3, sendActualMedia,
  onprogressTrue ,  onprogressFalse, actindicatorPostQsoNewTrue, postQsoNew,
  manageLocationPermissions, setSendingProfilePhotoModal, setConfirmProfilePhotoModal,
  setProfileModalStat  } from '../../actions';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput,
  TouchableHighlight, KeyboardAvoidingView, Platform, Dimensions, TouchableWithoutFeedback,
  Keyboard   } from 'react-native';
import { getDate} from '../../helper';
//import Amplify, { Auth, API, Storage } from 'aws-amplify'
import { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports'
import ImageResizer from 'react-native-image-resizer';
import { updateOnProgress, check_firstTime_OnProgress, checkMediaSentOfFreeUser } from '../../helper';
import ImagePicker from 'react-native-image-crop-picker';
// import firebase from 'react-native-firebase';
import VariosModales from "./VariosModales";
import crashlytics from '@react-native-firebase/crashlytics';
import PlayMediaAudioPreview from './PlayMediaAudioPreview';
import I18n from '../../utils/i18n';


//Amplify.configure(awsconfig);
Auth.configure(awsconfig);

class Muestro extends React.PureComponent {

    constructor(props) {
        super(props);

        this.width = 0;
        this.height = 0;
        this.widthAvatar = 0;
        this.heightAvatar = 0;
        this.rotateCount = 0;
        this.stat = '';

        this.size = 0;
        this.compressRotation = 86;
        this.compressImageURL = '';
        this.compressImageURLProfileAvatar = '';
        this.var12 = 'pepe';

    this.widthScreen = Dimensions.get('window').width; //full width
    this.heightScreen = Dimensions.get('window').height; //full height

    // this.advertVideoRewardMuestro = null;
    // this.videorewardMuestro = false;
    // this.usergotreward = false;
    // this.firstTimePreReward = true;
        
        this.state = {
          people: [],
          errorMessage: "",
          isFetching: true.imageurl,
          tok: '',
          description: '',
          nointernet: false,
          notvideorewarded: false,
          prereward: false,
          descScreen: false
         // rotateShow: true
        };
      }

  

   componentDidMount = async () => {

  
    
     
       }


    

      rotateImage = async () => {
         const dim = await this.getDimensions(this.props.sqsomedia.url);
         this.rotateCount = this.rotateCount + 1;

        if (this.compressRotation==86){
          // const dim = await this.getDimensions(this.props.sqsomedia.url);
          console.log(' entro 1era vez Compress Rotation: '+this.width + ' ' + this.height);

          if (this.width > this.height) 
                valor = this.width;
              else
                valor = this.height;

         coef = valor / 650;
         if (coef < 1) coef = 1;
         console.log(' Coeficiente :'+ coef);
         coefRotate = coef / 1.65;
        

         if (Platform.OS==='android') 
             coefRotate = coef;

             console.log(' coefRotate :'+ coefRotate);
        
   
        nuevoWidth = this.width /  coefRotate; //5.6// 5.2;
        nuevoHeight = this.height / coefRotate; //5.6 //5.2;
        // nuevoWidthAvatar = this.widthAvatar / 30.0;
        // nuevoHeightAvatar = this.heightAvatar / 30.0;
        nuevoWidthAvatar = this.widthAvatar / 2.0;
        nuevoHeightAvatar = this.heightAvatar / 2.0;

        }else{
         
       if (Platform.OS==='android')
       {
          nuevoWidth = this.width;
          nuevoHeight = this.height;  
       }else{
        nuevoWidth = this.height;
        nuevoHeight =   this.width;

       }

          nuevoWidthAvatar = this.widthAvatar;
          nuevoHeightAvatar = this.heightAvatar;
          console.log(' entro 2da vez Compress Rotation: '+this.width + ' ' + this.height);
        }
    
        auxoriginalphoto=this.props.sqsomedia.url;
        await ImageResizer.createResizedImage(this.props.sqsomedia.url, nuevoWidth , nuevoHeight, 'JPEG',86, 90).then((response) => {
          // response.uri is the URI of the new image that can now be displayed, uploaded...
          // response.path is the path of the new image
          // response.name is the name of the new image with the extension
          // response.size is the size of the new image
       //   data.uri = response.uri;
       console.log('Compress Rotation: '+this.compressRotation); 
       console.log('TERMINO PRIMER ROTATE '+this.compressRotation); 
       this.compressRotation = 100;
          this.compressImageURL = response.uri;
          this.size = response.size;
          this.width = nuevoWidth;
          this.height = nuevoHeight;
          console.log(' Compress Rotation Rotate resize ImageResizer: ' + JSON.stringify(response));


  


        envio = {name: 'fileName2', url: this.compressImageURL, type: this.props.sqsomedia.type, sent: 'false', size: this.size , width: this.width, height: this.height, qra: this.props.qra, rectime: '0' } 
 
        this.props.sendActualMedia(envio);

        }).catch((err) => {
          // Oops, something went wrong. Check that the filename is correct and
          // inspect err to get more details.
          crashlytics().setUserId(this.props.qra);
          crashlytics().log('error: ' + JSON.stringify(err)) ;
          if(__DEV__)
          crashlytics().recordError(new Error('createResizeImg1_DEV'));
          else
          crashlytics().recordError(new Error('createResizeImg1_PRD'));
        });


        if (this.props.sqsomedia.type==='profile')
        {
          console.log('TERMINO ENTRA avatar '+this.compressRotation); 
          // genero el avatar del profile
          await ImageResizer.createResizedImage(auxoriginalphoto, nuevoWidthAvatar , nuevoHeightAvatar, 'JPEG',86 , 90).then((response) => {
          
            this.compressImageURLProfileAvatar = response.uri;
           // this.size = response.size;
            this.widthAvatar = nuevoWidthAvatar;
            this.heightAvatar = nuevoHeightAvatar;
            console.log(' Compress Rotation Rotate resize AVATAR: ' + JSON.stringify(response));

  
          }).catch((err) => {
            // Oops, something went wrong. Check that the filename is correct and
            // inspect err to get more details.
            crashlytics().setUserId(this.props.qra);
            crashlytics().log('error: ' + JSON.stringify(err)) ;
            if(__DEV__)
            crashlytics().recordError(new Error('createResizImg2_DEV'));
            else
            crashlytics().recordError(new Error('createResizImg2_PRD'));
          });
  
        }

        


      }


      getDimensions = (laUrl) => new Promise((resolve) => {
 
        Image.getSize(laUrl, (width, height) => {
         //   console.log('SIZE 4: ancho: '+width + ' alto:'+height);
            this.width = width;
            this.widthAvatar = width;
            this.height = height;
            this.heightAvatar = height;
            console.log('getdimension  w: '+this.width+ ' '+width+  'h:'+this.height +'  '+height )
            
                  resolve(1234)
             });
     
       })


      compressImage = async () => {
        this.var12 = 'Jose';
        inicial = new Date();
        const dim = await this.getDimensions(this.props.sqsomedia.url)
        final = new Date();
        total = final - inicial;
        
        console.log('dim'+dim);
        console.log('tardoMuestro en total obtener info de foto: '+ total + ' width:'+ this.width + ' height:'+ this.height)
       
        
          if (this.width > this.height) 
          {
            valor = this.width;
            if (this.props.sqsomedia.gallery && this.props.sqsomedia.type==='image')
            {
            // cuando viene de la galeria se la mas definicion porque salian medias mal las verticales
            // por ahi con las fotos de camara hagamos lo mismo en un futuro 
            // capaz tiene mas importancia un POST ANY donde se publican FLYERS de activacion etc que salgan 
            // con buena definicion

            // cuanto mas bajo es este numero mas chica es la definicion de la foto, pero si se achica
            // mucho se empiezan a perder colores, entonces hay q jugar con la dimension de la foto y la compresion
            if (Platform.OS==='ios')
            {
                  coef = valor / 570; // estaba 570, 490, taba 478
                  console.log('gallery IOS_ROTATE')
                }
            else
                  coef = valor / 700; // 725 estaba 650 estaba 570 estaba 450 android, taba 570
         
              }
                  else
              coef = valor / 690; // esta coeficiente es para todas las fotos que no vienen de la galeria
                                  // posiblemente en un futuro alla q bajar esta valor para achicar mas las fotos
                                  // para una ahorro en tranferencia de datos en aws mas que en s3 de alamcenamiento
         }
        else{
          valor = this.height;
          // if (this.props.sqsomedia.gallery)
          //   //  coef = valor / 1045;
          //   // aca se le dio mas deficinion porque las verticales salen muy mal 
          //   // cuando se hace click en la foto y se agranda, en un futuro hay que hacer diferencia entre las
          //   // verticales y horizontales, porque por este tema estamos aumentando promedio 30k por foto vertical
          //   // para darle mas calidad y no se rompa en el modal, esto alenta el feed y aumenta el costo de S3 y Transferecia
            
          //    coef = valor / 850; 
          //   else

          if (this.props.sqsomedia.gallery && this.props.sqsomedia.type==='image')
          // le doy mas deficinion a las fotos que vienen de la galeria porque 
          // suelen publicar activaciones con letra chica y esta bueno que se vean
            coef = valor / 920;
          else
            coef = valor / 690;

        }

  
        // coef = valor / 650;
        if (coef < 1) coef = 1;
        console.log('Coeficiente :'+ coef);
        console.log('width: '+this.width + '  height: ' +this.height)

   

        nuevoWidth = this.width /  coef; //5.6// 5.2;
        nuevoHeight = this.height / coef; //5.6 //5.2;

        // nuevoWidth = this.width / 5.6//5.2;
        // nuevoHeight = this.height /  5.6 //5.2;

        compressRate = 86;  // 86 es la compresion default para imagenes/profile sacados con camara

        if (this.props.sqsomedia.gallery && this.props.sqsomedia.type==='image')
        {  // esta es una imagen obtenida desde la galeria
          if (Platform.OS==='ios') 
             compressRate = 80; // ios comprimo mas porque vienen con mucha definicion
          else
             compressRate = 86;
         
        }
        // nuevoWidthAvatar = this.widthAvatar / 30.0;
        // nuevoHeightAvatar = this.heightAvatar / 30.0;
        if ( Platform.OS === 'ios')
        {

        // nuevoWidthAvatar = this.widthAvatar / 21.0;
        // nuevoHeightAvatar = this.heightAvatar / 21.0;
        nuevoWidthAvatar = this.widthAvatar / 10.0;
        nuevoHeightAvatar = this.heightAvatar / 10.0;
        }else
        {
        nuevoWidthAvatar = this.widthAvatar / 6.0;
        nuevoHeightAvatar = this.heightAvatar / 6.0;
      }


        if (this.props.sqsomedia.type==='profile'){
          // esto es para genrar el Profile.jpg para mostrar en el perfil con mas definicion
              if ( Platform.OS === 'ios')
            {
              nuevoWidth = this.width / 5.0
              nuevoHeight = this.height / 5.0;
            }else{
              nuevoWidth = this.width / 3.0;
              nuevoHeight = this.height / 3.0;
            }
              compressRate = 86;
        }
    
        auxoriginalphoto=this.props.sqsomedia.url;
        inicial = new Date();
        
        await ImageResizer.createResizedImage(this.props.sqsomedia.url, nuevoWidth , nuevoHeight, 'JPEG', compressRate).then((response) => {
          // response.uri is the URI of the new image that can now be displayed, uploaded...
          // response.path is the path of the new image
          // response.name is the name of the new image with the extension
          // response.size is the size of the new image
       //   data.uri = response.uri;
    
          this.compressImageURL = response.uri;
  //    this.compressImageURL = this.props.sqsomedia.url
          this.size = response.size;
          this.width = nuevoWidth;
          this.height = nuevoHeight;
          console.log('resize ImageResizer: ' + JSON.stringify(response));
         

        // envio = {name: 'fileName2', url: this.compressImageURL, type: 'image', sent: 'false', size: this.size , width: this.width, height: this.height } 
 
        // this.props.sendActualMedia(envio);


        }).catch((err) => {
          // Oops, something went wrong. Check that the filename is correct and
          // inspect err to get more details.
          crashlytics().setUserId(this.props.qra);
          crashlytics().log('error: ' + JSON.stringify(err)) ;
          if(__DEV__)
          crashlytics().recordError(new Error('createResizImg3_DEV'));
          else
          crashlytics().recordError(new Error('createResizImg3_PRD'));
        });
        final = new Date();
        total = final - inicial;
        console.log('tardoMuestro en total en achicar la imagen: '+ total)



        if (this.props.sqsomedia.type==='profile')
        {
           // esto es para genrar el Profile_avatar.jpg para mostrar en los vatars con menor definicion
          console.log('TERMINO ENTRA avatar '+this.compressRotation); 
          // genero el avatar del profile
          //iba 86
          await ImageResizer.createResizedImage(auxoriginalphoto, nuevoWidthAvatar , nuevoHeightAvatar, 'JPEG',86).then((response) => {
          
            this.compressImageURLProfileAvatar = response.uri;
                
           // this.size = response.size;
            this.widthAvatar = nuevoWidthAvatar;
            this.heightAvatar = nuevoHeightAvatar;
            console.log(' Compress Rotation Rotate resize AVATAR: ' + JSON.stringify(response));

  
          }).catch((err) => {
            // Oops, something went wrong. Check that the filename is correct and
            // inspect err to get more details.
            crashlytics().setUserId(this.props.qra);
            crashlytics().log('error: ' + JSON.stringify(err)) ;
            if(__DEV__)
            crashlytics().recordError(new Error('createResiImg4_DEV'));
            else
            crashlytics().recordError(new Error('createResiImg4_PRD'));
          });
  
        }

       

      }

  
    //Por aca se envian las fotos y audio del QSP solamente
      send_and_check_ad = async () => {
        this.props.closeModalConfirmPhoto();


        console.log("subo a s3 con BLOB");

        console.log('var12 antes: '+this.var12);

        // if (this.props.sqsomedia.type==='image' || this.props.sqsomedia.type==='profile') {
       if (this.props.sqsomedia.type==='image') {

        if (!this.props.sqsomedia.gallery) {
            //  if the media is a photo -> Compress Imgae
        if (this.compressRotation===86){ 
          console.log('entro a comprimir valor de compressRotation: '+ this.compressRotation);
           await this.compressImage();
             }else
             {
                  if (this.rotateCount>1 && Platform.OS==='ios')
                  {
                    // Si es IOS y roto mas de una vez, no hay que hacer nada, el Width y el Height no 
                    // se deben intercambiar
                  }
                else
                  {
                    // switch de width con height porque la foto fue girada y el feed necesita calcular el espacio
                  auxWidth = this.width;
                  this.width = this.height;
                  this.height = auxWidth;

                  }
             }
            // fileaux =  this.props.sqsomedia.url;
            fileaux = this.compressImageURL;
            fileauxProfileAvatar =  this.compressImageURLProfileAvatar;
            }
            else
            { // Vino la imagen de la galeria de fotos
              // fileaux =  this.props.sqsomedia.url;
              // // fileauxProfileAvatar =  this.compressImageURLProfileAvatar; 
              // fileauxProfileAvatar = '';
              // this.width = this.props.sqsomedia.width;
              // this.height = this.props.sqsomedia.height;
              // this.size = this.props.sqsomedia.size;
              await this.compressImage();
              fileaux = this.compressImageURL;
              fileauxProfileAvatar = '';

            }

        } 

       if (this.props.sqsomedia.type==='audio') {
            // pasa por aca si el media es un AUDIO
           fileaux =  this.props.sqsomedia.url;
           this.size = this.props.sqsomedia.size;
           fileauxProfileAvatar = '';

          }

          if (this.props.sqsomedia.type==='video') {
            // toda esta info se obtiene luego de comprimrir el video
            fileaux =  this.props.qra + '_' + new Date().getTime()+'.mp4'; // le asigno un nombre univoco al video
            fileauxProfileAvatar = '';
            this.size = this.props.sqsomedia.size;
            this.width = this.props.sqsomedia.width;
            this.height = this.props.sqsomedia.height;
          }



        fileName2 = fileaux.replace(/^.*[\\\/]/, '');

        if (this.props.sqsomedia.type==='image') 
             folder = 'images/'+fileName2;
           
        if (this.props.sqsomedia.type==='audio')
          folder = 'audios/'+fileName2;

          if (this.props.sqsomedia.type==='video')
          folder = 'videos/'+fileName2; // lo voy a llenar despues de comprimir que tengo el nombre final del video


          // se comento esto porque nunca va a ser profile, en este metodo  vienen solo las IMAGE y AUDIO
          // if (this.props.sqsomedia.type==='profile') 
          //   { 
          //     folder = 'profile/profile.jpg';
          //     // para que no se repita el nombre en la lista de enviados si sue mas de 1 vez su profile picture 
          //     //  fileNameaux = fileName2+''+ new Date().getTime();
          //     //  fileName2 = fileNameaux;
              
          //     fileName2 = 'profile.jpg'+ new Date().getTime();
          //   }
          
       
        rdsUrl = this.props.rdsurls3+folder;
        urlNSFW = this.props.rdsurls3+'profile/tmp/profile.jpg';
        urlAvatar = this.props.rdsurls3+'profile/profile_avatar.jpg';
       


       fecha = getDate();
       console.log('la fecha es:' + fecha);
   
          // limpiado codigo, siempre va a ser distinto de profile porque en este metodo no vienen profiles
          // if (this.props.sqlrdsid==='' && this.props.sqsomedia.type!=='profile')
          if (this.props.sqlrdsid==='')
                this.stat = 'waiting';
              else
                this.stat = 'inprogress';
           
                console.log('tengo qra: '+this.props.sqsomedia.qra);

             envio = {name: fileName2, url: fileaux, fileauxProfileAvatar: this.compressImageURLProfileAvatar, sqlrdsid: this.props.sqlrdsid , description: this.state.description , type: this.props.sqsomedia.type, sent: false ,
              status: this.stat, progress: 0.3, size: this.size, rdsUrlS3: rdsUrl, urlNSFW: urlNSFW, urlAvatar: urlAvatar, date: fecha, width: this.width, height: this.height, qra: this.props.sqsomedia.qra, rectime: this.props.sqsomedia.rectime, 
              duration: this.props.sqsomedia.duration, videoImagePreview: this.props.sqsomedia.previewCompressed  } 
                    
               
              
       
             setTimeout(() => {
              this.props.send_data_to_qsoscreen(envio, fileauxProfileAvatar);
             }
            , 50)
    
      }


      //Por aca se envian las fotos de profile solamente
      subo_Profile_Photo_s3 = async () => {


        // this.props.closeModalConfirmPhoto();
        this.props.setConfirmProfilePhotoModal(false);

        setTimeout(() => {
          // abro modal de statua de envio de photo del profile
        this.props.setSendingProfilePhotoModal(true);
        }
        , 150);
        

        // este if de abajo no hace falta porque este metodo es exclusivo de PROFILE
      //  if (this.props.sqsomedia.type==='image' || this.props.sqsomedia.type==='profile') {
        //  if the media is a photo -> Compress Imgae
        if (this.compressRotation===86){ 
          console.log('entro a comprimir valor de compressRotation: '+ this.compressRotation);
           await this.compressImage();
             }else
             {
                  if (this.rotateCount>1 && Platform.OS==='ios')
                  {
                    // Si es IOS y roto mas de una vez, no hay que hacer nada, el Width y el Height no 
                    // se deben intercambiar
                  }
                else
                  {
                    // switch de width con height porque la foto fue girada y el feed necesita calcular el espacio
                  auxWidth = this.width;
                  this.width = this.height;
                  this.height = auxWidth;

                  }
             }
            // fileaux =  this.props.sqsomedia.url;
            fileaux = this.compressImageURL;
            fileauxProfileAvatar =  this.compressImageURLProfileAvatar;

            // saco esto porque nunca viene audio por aca porque este metodo es exclusivo de profile
        // } else
        //   {
        //    fileaux =  this.props.sqsomedia.url;
        //    this.size = this.props.sqsomedia.size;
        //    fileauxProfileAvatar = '';

        //   }


        console.log('var12 despues: '+this.var12);


       
    //  fileaux =  this.props.sqsomedia.url;
   
      console.log("fileaux uri:"+ fileaux);

        fileName2 = fileaux.replace(/^.*[\\\/]/, '');

        if (this.props.sqsomedia.type==='image') {
             folder = 'images/'+fileName2;
           
        }
          else folder = 'audios/'+fileName2;


          if (this.props.sqsomedia.type==='profile') 
            { 
              folder = 'profile/profile.jpg';
              // para que no se repita el nombre en la lista de enviados si sue mas de 1 vez su profile picture 
              //  fileNameaux = fileName2+''+ new Date().getTime();
              //  fileName2 = fileNameaux;
              
              fileName2 = 'profile_'+ new Date().getTime() + '.jpg';
            }
          
       
        rdsUrl = this.props.rdsurls3+folder;
        // urlNSFW = this.props.rdsurls3+'profile/tmp/profile.jpg';
        urlNSFW = this.props.rdsurls3+'profile/tmp/'+fileName2;
        urlAvatar = this.props.rdsurls3+'profile/profile_avatar.jpg';
       




        console.log('RDSurl: '+rdsUrl);

      // fecha = this.getDate();
       fecha = getDate();
       console.log('la fecha es:' + fecha);
      
          if (this.props.sqlrdsid==='' && this.props.sqsomedia.type!=='profile')
                this.stat = 'waiting';
              else
                this.stat = 'inprogress';

             envio = {name: fileName2, url: fileaux, fileauxProfileAvatar: this.compressImageURLProfileAvatar, sqlrdsid: this.props.sqlrdsid , description: this.state.description , type: this.props.sqsomedia.type, sent: false ,
              status: this.stat, progress: 0.3, size: this.size, rdsUrlS3: rdsUrl, urlNSFW: urlNSFW, urlAvatar: urlAvatar, date: fecha, width: this.width, height: this.height, qra: this.props.sqsomedia.qra, rectime: '0' } 
                    
               console.log("voy a impirmir ENVIO:");
               console.log(envio);
                   this.props.addMedia(envio);
                   // creo mediafilelocal porque trada en actualizar REDUX entonces si es el caso
                   // donde debe crear el QSO le envio del mediafileLocal, ver mas abajo.
                   mediafileLocal = [ envio ];

        // Fin de agrego a array de media del store
       
       
    
      // if (this.stat==='inprogress')  {  // los envia si ya tienen SqlRdsId sino los deja en waiting
          this.props.uploadMediaToS3(fileName2, fileaux, fileauxProfileAvatar, this.props.sqlrdsid, this.state.description,this.size, this.props.sqsomedia.type, rdsUrl,urlNSFW, urlAvatar, fecha, this.width, this.height,this.props.rdsurls3,this.props.sqsomedia.qra,'0',this.props.jwtToken);
          // hago un timeout por si se queda colgado el upload asi el usuario
          // por lo menos puede hacer un close del modal de espera y no tiene que resetear la APP           
          setTimeout(() => {
            // hablitio el cancel button para darle escapatoria del modal si en 10 segundos no se
            // subio la foto o fallo el envio o lo que sea.    
            this.props.setProfileModalStat('cancelButton',1);
            
          }
          , 10000);
      
            //    }  else{  // no entra nunca mas por aca ya que manda solo fotos de profile este metodo, ver de borrar esto con cuidado

            //  // puede ser que ya este ingresado BAND, MODE y QRA y el ultimo paso que hizo fue agregar MEDIA
            //  // entonces hay que chequear si esta listo para crear el QSO y enviar todo junto
            //  console.log('mediafile Local:'+mediafileLocal);
            //  console.log(mediafileLocal);
            //  if (ONPROGRESS=updateOnProgress(this.props.qsotype,this.props.band,this.props.mode,this.props.qsoqras,mediafileLocal))
            //     await this.props.onprogressTrue();
            //    else
            //      this.props.onprogressFalse();

            //      console.log('onprogress '+ONPROGRESS)

            //      if (ONPROGRESS) {
            //       data = check_firstTime_OnProgress(this.props.qsotype,this.props.band,this.props.mode,this.props.rst,
            //                  this.props.db,this.props.qra,ONPROGRESS,this.props.sqlrdsid, this.props.latitude,
            //                                    this.props.longitude);
            //            console.log("Data to Send API: "+ JSON.stringify(data));  
            //           this.props.actindicatorPostQsoNewTrue();
            //           this.props.postQsoNew(data,this.props.qsoqras,mediafileLocal,this.props.jwtToken);
                      
            //      }else console.log("Todavia no esta OnProgreSSS como para llamar a PostNewQso");

            //  }
          //this.props.navigation.navigate("Root");
        
            //  }
      }

     


      // closeVariosModales = (param) => {
      //   this.setState({ nointernet: false, notvideorewarded: false, prereward: false });
      //   console.log("param de close modal: "+ param);
      //   if (param==='prereward')  
      //      this.advertVideoRewardMuestro.show();
      // };

    render() { 
        // this.props.imageurl
        console.log("RENDER MUESTRO, mediatosend: " +JSON.stringify(this.props.sqsomedia));
        // const encodedData = this.props.sqsomedia.base64preview;
   
              
        return( 
           <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', }} behavior="padding" enabled   keyboardVerticalOffset={46}
           >
         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> 
        <View style={{flex:1, marginTop: 5}}>
        { (this.props.sqsomedia.type!=='profile') ?
              <View style={{flex:0.2, flexDirection: 'row', justifyContent:'flex-end'}}>
                 <View style={{flex:0.5}}>
                    {/* <TouchableOpacity  style={{ height: 50 }} onPress={() => this.subo_s3()} > */}
                    {(!this.state.descScreen) ?
                    <TouchableOpacity style={{ width: 70 }} onPress={() => this.props.close()}>
                      <Text style={{ color: "#c0c0c0", fontWeight: "bold", fontSize: 16 }}>
                        {I18n.t("MuestroCancel")}
                      </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{ width: 70 }} onPress={() => this.setState({descScreen:false})}>
                      <Text style={{ color: "#c0c0c0", fontWeight: "bold", fontSize: 16 }}>
                        {I18n.t("EditMediaBack")}
                      </Text>
                    </TouchableOpacity>
                    }
                  </View>
                  {(!this.state.descScreen) ?
                    <View style={{flex:0.5, alignItems: "flex-end"}}>
                    <TouchableOpacity  style={{ height: 50, width: 90 }} onPress={() => this.setState({descScreen: true})} >
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{I18n.t("EditMediaContinue")}</Text>
                    </TouchableOpacity>
                   </View>
                   :
                   <View style={{flex:0.5, alignItems: "flex-end"}}>
                    <TouchableOpacity  style={{ height: 50, width: 90 }} onPress={() => this.send_and_check_ad()} >
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{I18n.t("MuestroSend")}</Text>
                    </TouchableOpacity>
                   </View>
                  }
                  
                </View>  
                :
                
                <View style={{ flex:1 , flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <View style={{ flex:0.5}}>
                  <TouchableOpacity style={{ width: 85, marginLeft: 10 }} onPress={() => this.props.close()}   >
                          <Text
                            style={{ color: "#c0c0c0", fontWeight: "bold", fontSize: 18}}   >
                            {I18n.t("MuestroCancel")}
                          </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex:0.5, alignItems: 'flex-end'}}>
                    <TouchableOpacity  style={{ height: 40, marginRight: 10 }} onPress={() => this.subo_Profile_Photo_s3()} >
                       <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18}}>{I18n.t("MuestroUpdatePhoto")}</Text>
                    </TouchableOpacity>
                       
                    </View>
               
                    </View>  

            }
            {(!this.state.descScreen) && 
                  <View style={{flex:this.props.height===490 ? 0.75 : 0.5, justifyContent: 'center', alignItems: 'center', marginTop: 35}}>
            
                    
                    { ((this.props.sqsomedia.type==='image' || this.props.sqsomedia.type==='profile') && !this.state.descScreen) &&
                    <Image style={styles.faceImageStyle}
                    source={{ uri: this.props.sqsomedia.url }}
                    resizeMethod="resize"
                    resizeMode="contain"
                  />
                    }
                
                  {/* // <Image style={styles.faceImageStyleAudio}
                  //             source={require('../../images/audio.png')}
                  //                 />  */}
                  { (this.props.sqsomedia.type==='audio' && !this.state.descScreen) &&
                  <View style={{marginTop: 12}}>
                      <View>
                        <Text style={{ color: 'white', fontSize: 14}}>{I18n.t("MuestroYouCanPlay")}</Text> 
                        </View>
                    <View style={{ marginTop: 12}}>
                      <PlayMediaAudioPreview url={this.props.sqsomedia.url}  /> 
                    </View>
                
                </View> }

                { (this.props.sqsomedia.type==='video' && !this.state.descScreen) &&
                  <View style={{marginTop: 35}}>
          

                    <View style={{flex:this.props.height===490 ? 0.75 : 0.5, justifyContent: 'center', alignItems: 'center'}}>
                    {/* <View style={{flex:0.75, justifyContent: 'center', alignItems: 'center'}}>      */}
                          <Image style={styles.faceImageStyle}
                          // source={{ uri: `data:image/png;base64,${encodedData}` }}
                          source={{ uri: this.props.sqsomedia.previewCompressed }}
                          resizeMethod="resize"
                          resizeMode="contain"
                          />
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 55}}>
                        {/* <Text style={{ color: 'white', fontSize: 14}}>{I18n.t("MuestroYouCanPlay")}</Text>  */}
                        <Image style={styles.faceImageStyleAudio}
                            source={require('../../images/video1.png')}
                                />
                        </View>

            
             </View> }

                                      {/* && Platform.OS==='android' */}
                        {/* { ((this.props.sqsomedia.type==='image' || this.props.sqsomedia.type==='profile') && Platform.OS === 'android') && */}
                  {/* No muestro ROTATE si viene de la galeria porque la libreria de la galeria ya tiene editor de foto y rotacion */}
                  { (this.props.sqsomedia.type==='image' && !this.props.sqsomedia.gallery && !this.state.descScreen) &&
                          <TouchableOpacity style={{height:50}}onPress={() => this.rotateImage()} >
                            <View style={{ flexDirection: 'row'}}>
                                  <Image style={{ width: 15, height: 15,  marginTop: 3, marginLeft: 3}}
                              source={require('../../images/rotate.png')}
                                  /> 

                                <Text style={{ color: 'orange', fontSize: 11, marginTop: 3}}> {I18n.t("MuestroRotate")}</Text>
                            </View>     
                            </TouchableOpacity>
                    }

                  </View>
            }
            <View style={{ flex:this.props.height===490 ? 1 : 1}}>
{/* width: this.widthScreen-80 */}
            { (this.props.sqsomedia.type!=='profile' && this.state.descScreen) &&
  
             <View style={{ flex:1, marginTop: 5 }}>

              
              <TextInput 
                  placeholder={I18n.t("MuestroDescription")}
                  multiline
                  underlineColorAndroid='transparent'
                 placeholderTextColor="rgba(255,255,255,0.7)"
                  // placeholderTextColor='rgba(36,54,101,0.93)'
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  numberOfLines={2}
                  // onFocus={() => this.setState({rotateShow: false})}
                  // onBlur={() => this.setState({rotateShow: true})}
                  style={styles.input}
                  value={this.state.description}
                    onChangeText={(text) => this.setState({description: text})} />    
            

             </View>
            }
            
             
                   
        </View>
{/* {(this.state.notvideorewarded) && 
                <VariosModales
                    show={this.state.notvideorewarded}
                    modalType="notvideorewarded"
                    message="Free User: You need to watch the Ad video to send this media."
                    closeInternetModal={this.closeVariosModales.bind()}
                  /> 
}
{(this.state.prereward) && 
              <VariosModales
                    show={this.state.prereward}
                    modalType="prereward"
                    message="Free User: We are going to show you a video reward, if you watch your media will be sent to the server"
                    closeInternetModal={this.closeVariosModales.bind()}
                  /> 
} */}

         </View>
         </TouchableWithoutFeedback>
         </KeyboardAvoidingView>

      
         
            
           
       
        )} 

 }

 
const styles = StyleSheet.create({
       faceImageStyle: {
      //  width: 150,
      //  height: 150,
      width: 175,
       height: 175
       
    //   borderRadius: 30
       },
       faceImageStyleAudio: {
        width: 65,
        height: 65,
        borderRadius: 30
         },
    name:{
        fontSize: 16,
        marginLeft: 5,
        padding: 5,
        fontWeight: 'bold',        
        color: 'orange'        
    },
    input: {
      minHeight: 38,
      height: 'auto',
      borderRadius: 22,  
      // backgroundColor: 'rgba(255,255,255,0.2)',
      // backgroundColor: 'black',
      backgroundColor: 'rgba(36,54,101,1)',
      marginBottom: 5,
      marginTop: 0,
      color: '#FFF',
      fontSize: 19,
      paddingHorizontal: 5,
   //   width: 100
            },
  });

  


  const mapStateToProps = state => {
    // return {  isTransitioning: state.nav.isTransitioning,
    //     index: state.nav.routes[0].index,
    //     sqso: state.sqso };
        return {  
          sqsomedia: state.sqso.currentQso.mediatosend,
          sqlrdsid: state.sqso.currentQso.sqlrdsId,
          rdsurls3: state.sqso.urlRdsS3,
          jwtToken: state.sqso.jwtToken,
          mediafiles: state.sqso.currentQso.mediafiles,
          userinfo: state.sqso.userInfo,

          band: state.sqso.currentQso.band,
          mode: state.sqso.currentQso.mode,
          rst: state.sqso.currentQso.rst,
          db: state.sqso.currentQso.db,
          qsotype: state.sqso.currentQso.qsotype,
          qsoqras: state.sqso.currentQso.qsoqras,
         // sqlrdsid: state.sqso.currentQso.sqlrdsId,
          latitude: state.sqso.currentQso.latitude,
          longitude: state.sqso.currentQso.longitude,
          isfetching: state.sqso.isfetching,
          qra: state.sqso.qra,   
          mediafiles: state.sqso.currentQso.mediafiles
       //   jwtToken: state.sqso.jwtToken


           };
};


const mapDispatchToProps = {
    addMedia,
    updateMedia,
    closeModalConfirmPhoto,
    postAddMedia,
    uploadMediaToS3,
    sendActualMedia,
    onprogressTrue ,
    onprogressFalse,
    actindicatorPostQsoNewTrue,
    postQsoNew,
    manageLocationPermissions,
    setSendingProfilePhotoModal,
    setConfirmProfilePhotoModal,
    setProfileModalStat
   }

export default connect(mapStateToProps, mapDispatchToProps)(Muestro);

