import React, { Component } from 'react';
//import {FileSystem } from 'expo';
import { connect } from 'react-redux';
import { addMedia, updateMedia, closeModalConfirmPhoto, postAddMedia, uploadMediaToS3, sendActualMedia,
  onprogressTrue ,  onprogressFalse, actindicatorPostQsoNewTrue, postQsoNew,
  manageLocationPermissions } from '../../actions';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput,
  TouchableHighlight, KeyboardAvoidingView, Platform, Dimensions   } from 'react-native';
import { getDate} from '../../helper';
//import Amplify, { Auth, API, Storage } from 'aws-amplify'
import { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports'
import ImageResizer from 'react-native-image-resizer';
import { updateOnProgress, check_firstTime_OnProgress, checkMediaSentOfFreeUser } from '../../helper';
import ImagePicker from 'react-native-image-crop-picker';
// import firebase from 'react-native-firebase';
import VariosModales from "./VariosModales";


//Amplify.configure(awsconfig);
Auth.configure(awsconfig);

class Muestro extends Component {

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
          prereward: false
        };
      }

  

   componentDidMount = async () => {

  // this.loadVideoReward();
    
     
       }


    //    loadVideoReward = async () => {

    //     //  let advert;
    
    //       if (Platform.OS === 'ios'){
    //         this.advertVideoRewardMuestro = firebase.admob().rewarded('ca-app-pub-7016811987787025/5828178381'); 
    //        } else
    //        {
    //         this.advertVideoRewardMuestro = firebase.admob().rewarded('ca-app-pub-7016811987787025/1688132132');
    //          }
           
    //       // const advert = firebase.admob().rewarded('ca-app-pub-3940256099942544/5224354917');
    // try {
    //       const AdRequestM = firebase.admob.AdRequest;
    //       const requestM = new AdRequestM();
    //       requestM.addKeyword('foo').addKeyword('bar');
          
    //       // Load the advert with our AdRequest
    //       this.advertVideoRewardMuestro.loadAd(requestM.build());
          
    //       this.advertVideoRewardMuestro.on('onAdLoaded', () => {
    //         console.log('Advert video rewardedM is ready to show.');
    //         this.videorewardMuestro = true;
    //         alert('video rewardM loaded!');
    //     //    this.advertVideoRewardMuestro.show();
    //       });
          
    //       this.advertVideoRewardMuestro.on('onRewarded', (event) => {
    //         console.log('The user watched the entire video M and will now be rewarded!', event);
    //         this.videorewardMuestro = false;
    //         this.usergotreward = true;
    //         this.subo_s3();
    //         // this.loadVideoReward();
    //       });
          
    //       this.advertVideoRewardMuestro.on('onAdClosed', (event) => {
    //          console.log('Se cerro el AD M: ', event);
    //          this.videorewardMuestro = false;
    //            if (!this.usergotreward)
    //              {  
    //              this.setState({notvideorewarded: true})
    //              this.loadVideoReward();
    //             }
    //         //  this.loadVideoReward();
    //        });
    
    //        this.advertVideoRewardMuestro.on('onAdOpened', (event) => {
    //         console.log('se muestra el AD M: ', event);
    //         this.videorewardMuestro = false;
    //         this.usergotreward = false;
         
    //         this.props.manageLocationPermissions('adshowed',true);
          
    //       });
    
    //       this.advertVideoRewardMuestro.on('onAdLeftApplication', (event) => {
    //         console.log('se va de la APP porque hizo click?: ', event);
    //         this.videorewardMuestro = false;
    //         this.usergotreward = true;
    //        // this.subo_s3();


    //         // this.loadVideoReward();
  
    //       });
      
    //     } catch (err) {
    //       alert('video reward failed to load: '+ err);
  
    //       }
    
       
    
    //       // advert.show();
    //      }


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
          valor = this.width;
        else
          valor = this.height;

        coef = valor / 650;
        if (coef < 1) coef = 1;
        console.log(' Coeficiente :'+ coef);

        nuevoWidth = this.width /  coef; //5.6// 5.2;
        nuevoHeight = this.height / coef; //5.6 //5.2;

        // nuevoWidth = this.width / 5.6//5.2;
        // nuevoHeight = this.height /  5.6 //5.2;
        compressRate = 86;
        // nuevoWidthAvatar = this.widthAvatar / 30.0;
        // nuevoHeightAvatar = this.heightAvatar / 30.0;
        if ( Platform.OS === 'ios')
        {

        // nuevoWidthAvatar = this.widthAvatar / 21.0;
        // nuevoHeightAvatar = this.heightAvatar / 21.0;
        nuevoWidthAvatar = this.widthAvatar / 7.0;
        nuevoHeightAvatar = this.heightAvatar / 7.0;
        }else
        {
        nuevoWidthAvatar = this.widthAvatar / 6.0;
        nuevoHeightAvatar = this.heightAvatar / 6.0;
      }


        if (this.props.sqsomedia.type==='profile'){
          // esto es para genrar el Profile.jpg para mostrar en el perfil con mas definicion
              if ( Platform.OS === 'ios')
            {
              nuevoWidth = this.width / 10.0;
              nuevoHeight = this.height / 10.0;
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
          });
  
        }

       

      }

      // showadtest = async () => {
      //  if (this.firstTimePreReward)
      //  {
      //        this.firstTimePreReward = false;
      //        this.setState({prereward:true})
      //  }
      //   else
      //      this.advertVideoRewardMuestro.show();
      // //  this.advertVideoRewardMuestro.show();
        
      // }

      send_and_check_ad = async () => {
        this.props.closeModalConfirmPhoto();



        // if (this.props.sqsomedia.type!=='profile' && !checkMediaSentOfFreeUser(this.props.mediafiles,this.props.sqsomedia.type,2) && this.props.userinfo.subscription_type === 'FREE' )
        //    this.props.openPremium();
        // else{

        console.log("subo a s3 con BLOB");

        console.log('var12 antes: '+this.var12);

        if (this.props.sqsomedia.type==='image' || this.props.sqsomedia.type==='profile') {
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

        } else
          {
           fileaux =  this.props.sqsomedia.url;
           this.size = this.props.sqsomedia.size;
           fileauxProfileAvatar = '';

          }


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
              
              fileName2 = 'profile.jpg'+ new Date().getTime();
            }
          
       
        rdsUrl = this.props.rdsurls3+folder;
        urlNSFW = this.props.rdsurls3+'profile/tmp/profile.jpg';
        urlAvatar = this.props.rdsurls3+'profile/profile_avatar.jpg';
       




        console.log('RDSurl: '+rdsUrl);

      // fecha = this.getDate();
       fecha = getDate();
       console.log('la fecha es:' + fecha);
      //  console.log('jaja: '+  this.props.sqsomedia.width + this.props.sqsomedia.height  )

     //  console.log('SIZE 3:'+ this.width+ ' '+this.height);
      //  Image.getSize(fileaux, (width, height) => {console.log('SIZE 2: ancho: '+width + ' alto:'+height)});

        // agrego a array de media del store
          // envio = {name: fileName2, url: fileaux, sqlrdsid: this.props.sqlrdsid , description: this.state.description , type: this.props.sqsomedia.type, sent: false ,
          //    status: 'inprogress', progress: 0.3, size: this.props.sqsomedia.size, rdsUrlS3: rdsUrl, date: fecha, width: this.props.sqsomedia.width, height: this.props.sqsomedia.height  } 
             
          if (this.props.sqlrdsid==='' && this.props.sqsomedia.type!=='profile')
                this.stat = 'waiting';
              else
                this.stat = 'inprogress';
           
                console.log('tengo qra: '+this.props.sqsomedia.qra);

             envio = {name: fileName2, url: fileaux, fileauxProfileAvatar: this.compressImageURLProfileAvatar, sqlrdsid: this.props.sqlrdsid , description: this.state.description , type: this.props.sqsomedia.type, sent: false ,
              status: this.stat, progress: 0.3, size: this.size, rdsUrlS3: rdsUrl, urlNSFW: urlNSFW, urlAvatar: urlAvatar, date: fecha, width: this.width, height: this.height, qra: this.props.sqsomedia.qra, rectime: this.props.sqsomedia.rectime  } 
                    
               
              
       
             setTimeout(() => {
              this.props.send_data_to_qsoscreen(envio, fileauxProfileAvatar);
             }
            , 50)
        //     this.props.send_data_to_qsoscreen(envio, fileauxProfileAvatar);

      }

      subo_s3 = async () => {

        // let fileaux;
        // let fileauxProfileAvatar;
        // let auxWidth;
        // let fileName2;
        // let rdsUrl;
        // let urlNSFW;
        // let urlAvatar;
        // let folder;
        // let fecha;
        // let envio;

        this.props.closeModalConfirmPhoto();

        if (this.props.sqsomedia.type!=='profile' && !checkMediaSentOfFreeUser(this.props.mediafiles,this.props.sqsomedia.type,2) && this.props.userinfo.subscription_type === 'FREE' )
           this.props.openPremium();
        else{

        console.log("subo a s3 con BLOB");

        console.log('var12 antes: '+this.var12);

        if (this.props.sqsomedia.type==='image' || this.props.sqsomedia.type==='profile') {
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

        } else
          {
           fileaux =  this.props.sqsomedia.url;
           this.size = this.props.sqsomedia.size;
           fileauxProfileAvatar = '';

          }


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
              
              fileName2 = 'profile.jpg'+ new Date().getTime();
            }
          
       
        rdsUrl = this.props.rdsurls3+folder;
        urlNSFW = this.props.rdsurls3+'profile/tmp/profile.jpg';
        urlAvatar = this.props.rdsurls3+'profile/profile_avatar.jpg';
       




        console.log('RDSurl: '+rdsUrl);

      // fecha = this.getDate();
       fecha = getDate();
       console.log('la fecha es:' + fecha);
      //  console.log('jaja: '+  this.props.sqsomedia.width + this.props.sqsomedia.height  )

     //  console.log('SIZE 3:'+ this.width+ ' '+this.height);
      //  Image.getSize(fileaux, (width, height) => {console.log('SIZE 2: ancho: '+width + ' alto:'+height)});

        // agrego a array de media del store
          // envio = {name: fileName2, url: fileaux, sqlrdsid: this.props.sqlrdsid , description: this.state.description , type: this.props.sqsomedia.type, sent: false ,
          //    status: 'inprogress', progress: 0.3, size: this.props.sqsomedia.size, rdsUrlS3: rdsUrl, date: fecha, width: this.props.sqsomedia.width, height: this.props.sqsomedia.height  } 
             
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
       
       
          // const response = await fetch(fileaux);
          // const blobi = await response.blob();
          
          // this.props.uploadMediaToS3(fileName2, fileaux, this.props.sqlrdsid, this.state.description,this.props.sqsomedia.size, this.props.sqsomedia.type, rdsUrl, fecha, this.props.sqsomedia.width, this.props.sqsomedia.height);
          
      if (this.stat==='inprogress')    // los envia si ya tienen SqlRdsId sino los deja en waiting
          this.props.uploadMediaToS3(fileName2, fileaux, fileauxProfileAvatar, this.props.sqlrdsid, this.state.description,this.size, this.props.sqsomedia.type, rdsUrl,urlNSFW, urlAvatar, fecha, this.width, this.height,this.props.rdsurls3,this.props.sqsomedia.qra,'0',this.props.jwtToken);
         else{
             // puede ser que ya este ingresado BAND, MODE y QRA y el ultimo paso que hizo fue agregar MEDIA
             // entonces hay que chequear si esta listo para crear el QSO y enviar todo junto
             console.log('mediafile Local:'+mediafileLocal);
             console.log(mediafileLocal);
             if (ONPROGRESS=updateOnProgress(this.props.qsotype,this.props.band,this.props.mode,this.props.qsoqras,mediafileLocal))
                await this.props.onprogressTrue();
               else
                 this.props.onprogressFalse();

                 console.log('onprogress '+ONPROGRESS)

                 if (ONPROGRESS) {
                  data = check_firstTime_OnProgress(this.props.qsotype,this.props.band,this.props.mode,
                                               this.props.qra,ONPROGRESS,this.props.sqlrdsid, this.props.latitude,
                                               this.props.longitude);
                       console.log("Data to Send API: "+ JSON.stringify(data));  
                      this.props.actindicatorPostQsoNewTrue();
                      this.props.postQsoNew(data,this.props.qsoqras,mediafileLocal,this.props.jwtToken);
                      
                 }else console.log("Todavia no esta OnProgreSSS como para llamar a PostNewQso");

             }
          //this.props.navigation.navigate("Root");
        
             }
      }

     

      signOut = () => {
        Auth.signOut()
          .then(data => console.log(JSON.stringify(data)))
          .catch(err => console.log(err));
    
    
      }

      info = async () => {
        try {
          session = await Auth.currentSession();
         // session2 = await Auth.currentCredentials();
          console.log("Su token es: " + session.idToken.jwtToken);
         // console.log("Sus credenciales SON: " + JSON.stringify(session2));
          this.setState({ tok: session.idToken.jwtToken })
        }
        catch (e) {
          console.log('caught error', e);
          // Handle exceptions
        }
        //console.log("Su token es: "+ session.idToken.jwtToken);   
      }

      closeVariosModales = (param) => {
        this.setState({ nointernet: false, notvideorewarded: false, prereward: false });
        console.log("param de close modal: "+ param);
        if (param==='prereward')  
           this.advertVideoRewardMuestro.show();
      };

    render() { 
        // this.props.imageurl
        console.log("RENDER MUESTRO, mediatosend: " +JSON.stringify(this.props.sqsomedia));
           
   
              
        return( 
          
        <View style={{flex:1}}>
            
            <View style={{flex:this.props.height===320 ? 0.75 : 0.5, justifyContent: 'center', alignItems: 'center'}}>
            { (this.props.sqsomedia.type==='image' || this.props.sqsomedia.type==='profile') ?
             <Image style={styles.faceImageStyle}
            source={{ uri: this.props.sqsomedia.url }}
            resizeMethod="resize"
            resizeMode="contain"
          />
          :
          <Image style={styles.faceImageStyleAudio}
                      source={require('../../images/audio.png')}
                          /> }
                          {/* && Platform.OS==='android' */}
            {/* { ((this.props.sqsomedia.type==='image' || this.props.sqsomedia.type==='profile') && Platform.OS === 'android') && */}
          { (this.props.sqsomedia.type==='image' ) &&
                   <TouchableOpacity  onPress={() => this.rotateImage()} >
                           <Image style={{ width: 26, height: 26,  marginTop: 5, marginLeft: 9}}
                      source={require('../../images/rotate.png')}
                          /> 

                         <Text style={{ color: 'orange', fontWeight: 'bold', fontSize: 13}}>Rotate</Text>
                    </TouchableOpacity>
            }

          </View>
        
            <View style={{ flex:this.props.height===320 ? 0.25 : 0.5, flexDirection: 'row'}}>
{/* width: this.widthScreen-80 */}
            { (this.props.sqsomedia.type!=='profile') &&
  
             <View style={{ flex:0.7 }}>

              
                  <TextInput 
                  placeholder="description (Optional)"
                  
                  underlineColorAndroid='transparent'
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  
                  style={styles.input}
                  value={this.state.description}
                    onChangeText={(text) => this.setState({description: text})} />
            

             </View>
            }
            
             { (this.props.sqsomedia.type!=='profile') ?
              <View style={{flex:0.3}}>
                    {/* <TouchableOpacity  style={{ height: 50 }} onPress={() => this.subo_s3()} > */}
                    <TouchableOpacity  style={{ height: 50, width: 60 }} onPress={() => this.send_and_check_ad()} >
                      <Text style={{ color: '#c0c0c0', fontWeight: 'bold', fontSize: 20, marginTop: 15, marginLeft: 5}}>Send</Text>
                    </TouchableOpacity>
                </View>  
                :
                <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity  style={{ height: 40 }} onPress={() => this.subo_s3()} >
                       <Text style={{ color: '#c0c0c0', fontWeight: 'bold', fontSize: 16}}>Send Profile Photo</Text>
                    </TouchableOpacity>
                    </View>  

            }
                   
        </View>
{(this.state.notvideorewarded) && 
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
}

         </View>
         
            
           
       
        )} 

 }

 
const styles = StyleSheet.create({
       faceImageStyle: {
       width: 150,
       height: 150,
       
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
      height: 40,
      borderRadius: 22,  
      backgroundColor: 'rgba(255,255,255,0.2)',
      marginBottom: 5,
      marginTop: 15,
      color: '#FFF',
      fontSize: 16,
      paddingHorizontal: 5,
      width: 200
            }
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
    manageLocationPermissions
   }

export default connect(mapStateToProps, mapDispatchToProps)(Muestro);

