import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator,  PermissionsAndroid, TouchableOpacity,
        Platform } from 'react-native';
import { connect } from 'react-redux';
import { addMedia, sendActualMedia, actindicatorImageDisabled, openModalConfirmPhoto,
  closeModalRecording } from '../../actions';
import {
    Dimensions,
    
    Slider,
    StyleSheet,

    TouchableHighlight,

  } from 'react-native';
//  import Expo, { Asset, Audio, FileSystem, Font, Permissions } from 'expo';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import RNFetchBlob from 'rn-fetch-blob';
import crashlytics from '@react-native-firebase/crashlytics';
import I18n from '../../utils/i18n';

  
  const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
  const BACKGROUND_COLOR = '#FFF8ED';
  const LIVE_COLOR = '#FF0000';
  const DISABLED_OPACITY = 0.5;
  const RATE_SCALE = 3.0;

  const RECORDING_OPTIONS_MATIAS = {
    // android: {
    //   extension: '.mp4',
    //    outputFormat: Expo.Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    //    audioEncoder: Expo.Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    //   // outputFormat: Expo.Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
    //   // audioEncoder: Expo.Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
    //   sampleRate: 11025,
    //   numberOfChannels: 1,
    //   bitRate: 32000,
    // },
    // ios: {
    //  extension: '.mp4',
    //    outputFormat: Expo.Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
    //   // audioQuality: Expo.Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
    // //  extension: '.caf',
    //  // audioQuality: Expo.Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_LOW,
 
    //   sampleRate: 11025,
    //   numberOfChannels: 1,
    //   bitRate: 32000,
    //   linearPCMBitDepth: 16,
    //   linearPCMIsBigEndian: false,
    //   linearPCMIsFloat: false,
    // },
  };
  
class RecordAudio2 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.recording = null;
        this.sound = null;
        this.isSeeking = false;
        this.shouldPlayAtEndOfSeek = false;
        this.cancel = false;
        this.restar = 0;
        this.secondsAux = 0;
        this.multiplo60anterior = 0;
        this.currentRecordingTime = 0;
        this.audioFileSize = 0;
        // this.state = {
        //   haveRecordingPermissions: false,
        //   isLoading: false,
        //   isPlaybackAllowed: false,
        //   muted: false,
        //   soundPosition: null,
        //   soundDuration: null,
        //   recordingDuration: null,
        //   shouldPlay: false,
        //   isPlaying: false,
        //   isRecording: false,
        //   fontLoaded: false,
        //   shouldCorrectPitch: true,
        //   volume: 1.0,
        //   rate: 1.0,
        // };
      this.state = {
        currentTime: 0.0,
        minutes: 0,
        seconds: 0,
        restar: 0,
        secondsText: '00',
        recording: false,
        paused: false,
        stoppedRecording: false,
        finished: false,
        audioPath: AudioUtils.DocumentDirectoryPath + '/test2.mp4',
        hasPermission: undefined,
        pausedAudio: false,
        currentTimePlay: 0.0,
      };

     //   this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
    // this.recordingSettings = JSON.parse(JSON.stringify(RECORDING_OPTIONS_MATIAS));
     //Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        // // UNCOMMENT THIS TO TEST maxFileSize:
        // this.recordingSettings.android['maxFileSize'] = 12000;
      }


      prepareRecordingPath(audioPath){
        AudioRecorder.prepareRecordingAtPath(audioPath, {
          SampleRate: 22050,
          Channels: 1,
          AudioQuality: "Medium",
          AudioEncoding: "aac",
          AudioEncodingBitRate: 32000
        });
      }
        
    
     async componentDidMount() {
        // componentDidMount = async () => {
       
        this._checkPermission().then((hasPermission) => {
          this.setState({ hasPermission });
    
          if (!hasPermission) return;
    
          this.prepareRecordingPath(this.state.audioPath);
    
          AudioRecorder.onProgress = (data) => {
             
         //  console.log('progress audio: ');
         //  console.log(data);
         this.currentRecordingTime = Math.floor(data.currentTime);

            if (Math.floor(data.currentTime)===0) 
               console.log('es cero los segundos');
               else
      {
     
    // console.log('divido: '+ Math.floor(data.currentTime)/60);
    // console.log('Resto: '+Math.floor(data.currentTime)%60);

              if (Math.floor(data.currentTime)%60===0 && Math.floor(data.currentTime)!==this.multiplo60anterior)
             {
               console.log('es multiplo verdadero');
              this.setState({minutes: this.state.minutes + 1});
              this.restar = this.restar + 60;
              this.multiplo60anterior = Math.floor(data.currentTime);
            
            }
         
            this.secondsAux = Math.floor(data.currentTime) - this.restar;

            if (this.secondsAux<10) 
               this.setState({secondsText: '0'+ this.secondsAux});
            else 
              this.setState({secondsText: this.secondsAux});
     
            // console.log('Seconds: '+this.state.secondsText + ' Minutes: '+this.state.minutes);
            // console.log('secondsInt : '+this.secondsAux);
             if (this.secondsAux>this.props.userinfo.account_type.app_qso_audio_add_rec_time) this.stopRecording();
        
                 
          }

       };


    
          AudioRecorder.onFinished = (data) => {

            console.log('fin grabacion : '+this.currentRecordingTime);
           
            // Android callback comes in the form of a promise instead.
            if (Platform.OS === 'ios') {
               this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
               console.log('url de evento OnFinish:'+data.audioFileURL + ' ' + data.audioFileSize)
               
              //    fileaux =  data.audioFileURL;
              //    fileName2 = fileaux.replace(/^.*[\\\/]/, '');
         
              //    envio = {name: fileName2, url: fileaux, type: 'audio', sent: 'false', size: '777' } 
                 
              //    vari2 = await this.props.sendActualMedia(envio);
               
              //  this.props.openModalConfirmPhoto();
              //  this.props.closeModal();
            }
          };
          console.log('pasa por aca');
          this._record();
     });
         
        
      
      }
    
      // _askForPermissions = async () => {
      //   const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      //   this.setState({
      //     haveRecordingPermissions: response.status === 'granted',
      //   });
      // };

    
      // _updateScreenForSoundStatus = status => {
      //   if (status.isLoaded) {
      //     this.setState({
      //       soundDuration: status.durationMillis,
      //       soundPosition: status.positionMillis,
      //       shouldPlay: status.shouldPlay,
      //       isPlaying: status.isPlaying,
      //       rate: status.rate,
      //       muted: status.isMuted,
      //       volume: status.volume,
      //       shouldCorrectPitch: status.shouldCorrectPitch,
      //       isPlaybackAllowed: true,
      //     });
      //   } else {
      //     this.setState({
      //       soundDuration: null,
      //       soundPosition: null,
      //       isPlaybackAllowed: false,
      //     });
      //     if (status.error) {
      //       console.log(`FATAL PLAYER ERROR: ${status.error}`);
      //     }
      //   }
      // };
    
      // _updateScreenForRecordingStatus = status => {
      //   if (status.canRecord) {
      //     this.setState({
      //       isRecording: status.isRecording,
      //       recordingDuration: status.durationMillis,
      //     });
      //   } else if (status.isDoneRecording) {
      //     this.setState({
      //       isRecording: false,
      //       recordingDuration: status.durationMillis,
      //     });
      //     if (!this.state.isLoading) {
      //       this._stopRecordingAndEnablePlayback();
      //     }
      //   }
      // };
    
      async _stopPlaybackAndBeginRecording() {
        this.setState({
          isLoading: true,
        });
        // if (this.sound !== null) {
        //   await this.sound.unloadAsync();
        //   this.sound.setOnPlaybackStatusUpdate(null);
        //   this.sound = null;
        // }
        // await Audio.setAudioModeAsync({
        //   allowsRecordingIOS: true,
        //   interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        //   playsInSilentModeIOS: true,
        //   shouldDuckAndroid: true,
        //   interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        // });
        // if (this.recording !== null) {
        //   this.recording.setOnRecordingStatusUpdate(null);
        //   this.recording = null;
        // }
    
        // const recording = new Audio.Recording();
        // await recording.prepareToRecordAsync(this.recordingSettings);
        // recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);
    
        // this.recording = recording;
        // await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
        // this.setState({
        //   isLoading: false,
        // });
      }
    
    

async _record() {
  if (this.state.recording) {
    console.warn('Already recording!');
    return;
  }else{
   // audioname = getAudioName();
    var audioname = Date.now();
    console.log('el audio name recording: '+ audioname + '  mili:'+ audioname);
    pathcompleto = AudioUtils.DocumentDirectoryPath + '/'+this.props.sqlrdsid+'_'+audioname + '.mp4'
    this.setState({audioPath: pathcompleto});
    this.prepareRecordingPath(pathcompleto);

  }

  if (!this.state.hasPermission) {
    console.warn('Can\'t record, no permission granted!');
    return;
  }

  if(this.state.stoppedRecording){
    
    this.prepareRecordingPath(this.state.audioPath);
    
  }

  this.setState({recording: true, paused: false});

  try {
    console.log('comienzo a grabar');
    const filePath = await AudioRecorder.startRecording();
  } catch (error) {
    console.error(error);
    crashlytics().setUserId(this.props.qra);
    crashlytics().log('error: ' + JSON.stringify(error)) ;
    if(__DEV__)
    crashlytics().recordError(new Error('startRecording_DEV'));
    else
    crashlytics().recordError(new Error('startRecording_PRD'));
  }
}



// firstStop = async () => {


  
//   await this.props.closeModalRecording();

//   filepath = await this._stop();
//   fileaux =  filepath;
//   console.log("fileaux uri:"+ fileaux);

//   fileName2 = fileaux.replace(/^.*[\\\/]/, '');

//      envio = {name: fileName2, url: fileaux, type: 'audio', sent: 'false', size: '777' } 
    
//      vari2 = await this.props.sendActualMedia(envio);

//      await this.props.openModalConfirmPhoto();

   

// }

stopRecording = async () => {
  filepath = await this._stop();

  // this._stop().then(response => {
  //       console.log('termino el _stop path: '+JSON.stringify(response));
  //   })
 // console.log('stopRecording el path: '+filepath);
     
 // anda en ANDROID pero no en iOS porque no le llega a tiempo el filepath
      // fileaux =  filepath;
      // fileName2 = fileaux.replace(/^.*[\\\/]/, '');

      //   envio = {name: fileName2, url: fileaux, type: 'audio', sent: 'false', size: '777' } 
        
      //   vari2 = await this.props.sendActualMedia(envio);

 //       this.props.openModalConfirmPhoto();
 // this.props.closeModal();
  


}

_stop = async () => {
  if (!this.state.recording) {
    console.warn('Can\'t stop, not recording!');
    return;
  }

  await this.setState({stoppedRecording: true, recording: false, paused: false});
  //this.props.closeModalRecording();
  

  try {
    
    const filePath = await AudioRecorder.stopRecording();
    console.log('stringeo filePath: '+ JSON.stringify(filePath));
    //await this.envio(filePath);


   // filePath = await AudioRecorder.stopRecording();
  
    console.log('El filePath: '+filePath);

    if (Platform.OS === 'android') {
      await this._finishRecording(true, filePath);
    }

  
    return filePath;
  } catch (error) {
    crashlytics().setUserId(this.props.qra);
    crashlytics().log('error: ' + JSON.stringify(error)) ;
    if(__DEV__)
    crashlytics().recordError(new Error('stopRecording_DEV'));
    else
    crashlytics().recordError(new Error('stopRecording_PRD'));
    console.error(error);
  }
}



//_finishRecording(didSucceed, filePath, fileSize) {
  _finishRecording = async (didSucceed, filePath, fileSize) => {
  this.setState({ finished: didSucceed });
  console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
  console.log('filepath: ' + filePath)
  fileaux =  filePath;
  
  if (Platform.OS==='ios')
        filepathAux = fileaux.replace("file:///", '');
      else
      filepathAux = filePath;

  await RNFetchBlob.fs.stat(filepathAux)
      .then((stats) => { 
        console.log(stats)
        this.audioFileSize = stats.size
      })
      .catch((err) => {
        console.log('catch error RNFetchBlob.fs.stat')
        console.log(err);
        crashlytics().setUserId(this.props.qra);
        crashlytics().log('error: ' + JSON.stringify(err)) ;
        if(__DEV__)
        crashlytics().recordError(new Error('fs.stat_DEV'));
        else
        crashlytics().recordError(new Error('fs.stat_PRD'));
      })
  // if (Platform.OS === 'ios') {

  if (!this.cancel)
  {
  //  fileaux =  filePath;
                 fileName2 = fileaux.replace(/^.*[\\\/]/, '');
               
         
                 envio = {name: fileName2, url: fileaux, type: 'audio', sent: 'false', size: this.audioFileSize,qra: this.props.qra, rectime: this.currentRecordingTime  } 
                 
                 vari2 = await this.props.sendActualMedia(envio);
               
               this.props.openModalConfirmPhoto(240);
  }
               this.props.closeModal();
  // }

}

_checkPermission() {
  if (Platform.OS !== 'android') {
    return Promise.resolve(true);
  }

  const rationale = {
    'title': 'Microphone Permission',
    'message': 'AudioExample needs access to your microphone so you can record audio.'
  };

  return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
    .then((result) => {
      console.log('Permission result:', result);
      return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
    });
}

cancelRecording = async () => {
  this.cancel = true;
  this.stopRecording();

}

      render() {
        
         return <View style={{flex: 1}} >
           {/* ,justifyContent:"center", alignContent: "center" */}
          {/* <View style={{flex: 1, alignItems: "center", justifyContent: "space-between" }}> */}
          <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 36, color: 'red'}}>REC</Text>
          </View>
          <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: "center"}}>
             <Text style={{ fontSize: 24, color: '#999'}}> {this.state.minutes}:{this.state.secondsText}</Text>
           </View>
               {/* <TouchableOpacity style={{marginLeft:180}}  onPress={ () => this._record() }>
                    <Image source={require('../../images/mic.png')}  style={{width: 33, height: 33 } } 
                 resizeMode="contain" />    
                 <Text style={{ fontSize: 12, color: '#999'}}>Record</Text> 
                 
         
                </TouchableOpacity> */}

                 {/* <TouchableOpacity style={{marginLeft:180}}  onPress={ () => this.stopRecording() }> */}
                 <View style={{ flex: 0.35, flexDirection: 'row', justifyContent: "center" }}>
                    <TouchableOpacity onPress={ () => this.stopRecording() }> 
                        <Image source={require('../../images/stop5.png')}  style={{width: 37, height: 37 } } 
                    resizeMode="contain" />    
                    <Text style={{ fontSize: 12, color: '#999', marginLeft: 5}}>{I18n.t("PLAYMEDIASTOP")}</Text>          
                    </TouchableOpacity>
                 </View>
                 <View style={{ flex: 0.10, flexDirection: 'row', justifyContent: "center", marginTop: 5 }}>
                 <Text style={{ fontSize: 10, color: 'white'}}>{this.props.userinfo.account_type.app_qso_audio_add_rec_time_text}</Text> 
                 </View>
                
      
          </View>
       
      }



    }
    
    const styles = StyleSheet.create({
      emptyContainer: {
        alignSelf: 'stretch',
        backgroundColor: BACKGROUND_COLOR,
      },
      container: {
        flex: 1,
        flexDirection: 'column',
      //  justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: BACKGROUND_COLOR,
        minHeight: DEVICE_HEIGHT,
        maxHeight: DEVICE_HEIGHT,
      },
      noPermissionsText: {
        textAlign: 'center',
      },
      wrapper: {},
      halfScreenContainer: {
        flex: 1,
        flexDirection: 'column',
      //  justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        minHeight: DEVICE_HEIGHT / 2.0,
        maxHeight: DEVICE_HEIGHT / 2.0,
      },
      recordingContainer: {
        flex: 1,
        flexDirection: 'row',
     //   justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        // minHeight: ICON_RECORD_BUTTON.height,
        // maxHeight: ICON_RECORD_BUTTON.height,
      },
      recordingDataContainer: {
        flex: 1,
        flexDirection: 'column',
     //   justifyContent: 'space-between',
        alignItems: 'center',
        // minHeight: ICON_RECORD_BUTTON.height,
        // maxHeight: ICON_RECORD_BUTTON.height,
        // minWidth: ICON_RECORD_BUTTON.width * 3.0,
        // maxWidth: ICON_RECORD_BUTTON.width * 3.0,
      },
      recordingDataRowContainer: {
        flex: 1,
        flexDirection: 'row',
     //   justifyContent: 'space-between',
        alignItems: 'center',
        // minHeight: ICON_RECORDING.height,
        // maxHeight: ICON_RECORDING.height,
      },
      playbackContainer: {
        flex: 1,
        flexDirection: 'column',
     //   justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        // minHeight: ICON_THUMB_1.height * 2.0,
        // maxHeight: ICON_THUMB_1.height * 2.0,
      },
      playbackSlider: {
        alignSelf: 'stretch',
      },
      liveText: {
        color: LIVE_COLOR,
      },
      recordingTimestamp: {
        paddingLeft: 20,
      },
      playbackTimestamp: {
        textAlign: 'right',
        alignSelf: 'stretch',
        paddingRight: 20,
      },
      image: {
        backgroundColor: BACKGROUND_COLOR,
      },
      textButton: {
        backgroundColor: BACKGROUND_COLOR,
        padding: 10,
      },
      buttonsContainerBase: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
     //   justifyContent: 'space-between',
      },
      buttonsContainerTopRow: {
        // maxHeight: ICON_MUTED_BUTTON.height,
        alignSelf: 'stretch',
        paddingRight: 20,
      },
      playStopContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      //  justifyContent: 'space-between',
        // minWidth: (ICON_PLAY_BUTTON.width + ICON_STOP_BUTTON.width) * 3.0 / 2.0,
        // maxWidth: (ICON_PLAY_BUTTON.width + ICON_STOP_BUTTON.width) * 3.0 / 2.0,
      },
      volumeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    //    justifyContent: 'space-between',
        minWidth: DEVICE_WIDTH / 2.0,
        maxWidth: DEVICE_WIDTH / 2.0,
      },
      volumeSlider: {
        // width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width,
      },
      buttonsContainerBottomRow: {
        // maxHeight: ICON_THUMB_1.height,
        alignSelf: 'stretch',
        paddingRight: 20,
        paddingLeft: 20,
      },
      rateSlider: {
        width: DEVICE_WIDTH / 2.0,
      },
    });



 const mapStateToProps = state => {
    // return {  index: state.nav.index, };
    return {  audiorecordingpermission: state.sqso.audiorecordingpermission,
              sqlrdsid: state.sqso.currentQso.sqlrdsId,
              userinfo: state.sqso.userInfo,
              qra: state.sqso.qra, 
              
            };
};


const mapDispatchToProps = {
       addMedia,
       sendActualMedia, 
       actindicatorImageDisabled,
       openModalConfirmPhoto,
       closeModalRecording
   }

export default connect(mapStateToProps, mapDispatchToProps)(RecordAudio2);
