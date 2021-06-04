//import Amplify, { Auth, API, Storage } from 'aws-amplify'
import { Auth } from 'aws-amplify';
import React, { Component } from 'react';
import {
  Dimensions, Image,











  Keyboard, KeyboardAvoidingView, StyleSheet, Text,






  TextInput, TouchableOpacity,





  TouchableWithoutFeedback, View
} from 'react-native';
//import {FileSystem } from 'expo';
import { connect } from 'react-redux';
import {
  setToken, updateCommentInMemory,
  updateMediaDescription
} from '../../actions';
import awsconfig from '../../aws-exports';
import { hasAPIConnection } from '../../helper';
import I18n from '../../utils/i18n';
import PlayMediaAudioPreview from './PlayMediaAudioPreview';


//Amplify.configure(awsconfig);
Auth.configure(awsconfig);

class EditMedia extends React.PureComponent {
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

    this.state = {
      people: [],
      errorMessage: '',
      isFetching: true.imageurl,
      tok: '',
      description: this.props.desc,
      nointernet: false,
      notvideorewarded: false,
      prereward: false
      // rotateShow: true
    };
  }

  componentDidMount = async () => {
    session = await Auth.currentSession();

    //  session = await Auth.currentAuthenticatedUser();
    //  console.log("Su token DID MOUNT es: " + session.idToken.jwtToken);
    this.props.setToken(session.idToken.jwtToken);
  };

  savedescription = async () => {
    //     console.log('savedescription')
    if (await hasAPIConnection()) {
      //  this.props.deletedFlag(false,'');

      // chequeo si se creo QSO en BD
      if (!this.props.sqlrdsid || this.props.status !== 'sent') {
        // no tiene QSO creado o no fuen enviado aun con exito con lo cual actualizo el comentario
        // de la memoria de mediafiles solamente
        console.log('updateCommentInMemory');
        desc = { description: this.state.description };
        this.props.updateCommentInMemory(this.props.name, desc);
        this.props.close();
      } else {
        // hay un QSO creado en BD y ya se envio este media con lo cual hay que actualizar
        // el comentario en el backend
        console.log('updateCommentInBackEnd');
        this.props.updateMediaDescription(
          this.props.idmedia,
          this.state.description,
          this.props.name,
          this.props.jwtToken
        );
        this.props.close();
      }

      // this.props.deletePost(this.props.sqlrdsid,this.props.jwtToken);
    } else this.setState({ nointernet: true });
  };

  closeVariosModales = () => {
    this.setState({ nointernet: false });
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center'}}
        behavior="padding"
        enabled
        keyboardVerticalOffset={46}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1, marginTop: 20}}>
            {/* <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              {(this.props.type === 'image' || this.props.type === 'profile') && 
                <Image
                  style={styles.faceImageStyle}
                  source={{ uri: this.props.url }}
                  resizeMethod="resize"
                  resizeMode="contain"
                />
              
          }
                
           {this.props.type === 'audio'  && 
                // <Image style={styles.faceImageStyleAudio}
                //             source={require('../../images/audio.png')}
                //                 /> }
                <View>
                  {/* <View>
                <Text style={{ color: 'white', fontSize: 14}}>You can play the audio before send it</Text> 
                </View> */}
                  {/* <View style={{ marginTop: 12 }}>
                    <PlayMediaAudioPreview url={this.props.url} />
                  </View>
                </View>
              }
             {(this.props.type === 'video')  && 
                    <Image style={styles.videoImageStyle}
                     source={require('../../images/video1.png')}
                         />
                        }

            </View> */} 
            <View style={{ flex: 0.5 }}>
              {this.props.type !== 'profile' && (
                <View style={{ flex: 0.7 }}>
                  <TextInput
                    placeholder={I18n.t('EditMediaDescription')}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    multiline={true}
                    //numberOfLines={2}
                    // onFocus={() => this.setState({rotateShow: false})}
                    // onBlur={() => this.setState({rotateShow: true})}
                    style={styles.input}
                    value={this.state.description}
                    onChangeText={(text) =>
                      this.setState({ description: text })
                    }
                  />
                </View>
              )}

              {this.props.type !== 'profile' ? (
                <View style={{ flex: 0.3, flexDirection: 'row' }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    {/* <TouchableOpacity  style={{ height: 50 }} onPress={() => this.subo_s3()} > */}
                    <TouchableOpacity
                      style={{ width: 70 }}
                      onPress={() => this.props.close()}>
                      <Text
                        style={{
                          color: '#c0c0c0',
                          fontWeight: 'bold',
                          fontSize: 16
                        }}>
                        {I18n.t('EditMediaCancel')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                      style={{ height: 50, width: 90 }}
                      onPress={() => this.savedescription()}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 18
                        }}>
                        {I18n.t('EditMediaSave')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <TouchableOpacity
                      style={{ width: 65, marginLeft: 10 }}
                      onPress={() => this.props.close()}>
                      <Text
                        style={{
                          color: '#c0c0c0',
                          fontWeight: 'bold',
                          fontSize: 18
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                      style={{ height: 40, marginRight: 10 }}
                      onPress={() => this.subo_Profile_Photo_s3()}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 18
                        }}>
                        {I18n.t('EditMediaSend')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  faceImageStyle: {
    //  width: 150,
    //  height: 150,
    width: 172.5,
    height: 172.5

    //   borderRadius: 30
  },
  faceImageStyleAudio: {
    width: 65,
    height: 65,
    borderRadius: 30
  },
  name: {
    fontSize: 16,
    marginLeft: 5,
    padding: 5,
    fontWeight: 'bold',
    color: 'orange'
  },
  input: {
    minHeight: 95,
    borderRadius: 22,
    backgroundColor: 'rgb(36,54,101)',
    marginBottom: 5,
    marginTop: 15,
    color: '#FFF',
    fontSize: 16.5,
    paddingHorizontal: 5
    //   width: 100
  },
  videoImageStyle:
  {
   width: 60,
   height: 60,
   //marginLeft: 9
  // borderRadius: 30,
  // marginTop: 10
    },
});

const mapStateToProps = (state) => {
  // return {  isTransitioning: state.nav.isTransitioning,
  //     index: state.nav.routes[0].index,
  //     sqso: state.sqso };
  return {
    jwtToken: state.sqso.jwtToken
  };
};

const mapDispatchToProps = {
  updateCommentInMemory,
  updateMediaDescription,
  setToken
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMedia);