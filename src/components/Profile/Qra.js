import PropTypes from 'prop-types';
import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import {
  followAdd,
  // setWebView,
  unfollow,
  doFetchQRA,
  clearQRA
} from '../../actions';

import {
  getDate,
  getFollowStatus,
  hasAPIConnection,
  userNotValidated
} from '../../helper';
import I18n from '../../utils/i18n';
import VariosModales from '../Qso/VariosModales';

class Qra extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      errorMessage: '',
      isFetching: true,
      modaldeleteqra: false,
      followstatus: 'empty',
      nointernet: false
    };
  }

  componentDidMount() {
    //  this.props.fetchPeople();
  }

  LlamoAPI = () => {
    //  this.props.fetchPeople();
    //this.props.navigation.navigate('CameraScreen');
  };

  onPressItem = async (url, qra) => {
    console.log('click QRA: ' + url + ' ' + qra);
    // if (this.props.following==='NOT_EXIST' && this.props.sqlrdsid.length===0)
    if (this.props.following === 'NOT_EXIST')
      this.setState({ modaldeleteqra: true, followstatus: 'NOT_EXIST' });
    else {
      followstat = await getFollowStatus(this.props.followings, qra);
      this.setState({ modaldeleteqra: true, followstatus: followstat });
    }
  };

  closeModaldeleteqra = () => {
    console.log('click close QRA: ');
    this.setState({ modaldeleteqra: false });
  };

  follow = async (qra, qra_avatar) => {
    //  if(!this.props.isfetching){
    if (this.props.userinfo.pendingVerification) userNotValidated();
    else {
      if (await hasAPIConnection()) {
        date = getDate();
        if (this.state.followstatus === 'false') {
          this.setState({ followstatus: 'true' });
          await this.props.followAdd(
            this.props.userqra,
            qra,
            date,
            this.props.jwtToken,
            qra_avatar
          );
          // chequeo si la api fue exitosa y lo dio de alta en redux
          // saco estas dos lineas de abajo para darle mejor UX al usuario y que cambie al toque el Follow
          // si la API de follow fallara es mala suerte, no lo vera en los follwoing y lo debera hacer de nuevo en algun otro momento
          //  followstat = await getFollowStatus(this.props.followings, qra);
          //  if (followstat==="true") this.setState({followstatus: 'true'})
        } else {
          this.setState({ followstatus: 'false' });
          await this.props.unfollow(
            this.props.userqra,
            qra,
            this.props.jwtToken
          );
          // followstat = await getFollowStatus(this.props.followings, qra);
          // if (followstat==="false") this.setState({followstatus: 'false'})
        }
      } else {
        this.setState({ modaldeleteqra: false, nointernet: true });
      }
    }

    //      this.props.getUserInfo();
    //     }else console.log('intento llamar dos veces follow')
  };

  closeVariosModales = () => {
    this.setState({ nointernet: false });
  };

  // delete = (qra) => {
  // // depende si el QSO esta Onprogress o si tiene un sqlrdsid creado borra llamando a la API o no.
  // if (this.props.sqlrdsid !== '')
  //      this.props.QsoQraDelete(this.props.sqlrdsid,qra,this.props.jwtToken);
  //    else
  //      this.props.deleteQsoQra(qra);

  //  this.closeModaldeleteqra();
  //   }

  qraProfile = async (qra) => {
    // este se usa con el feed nativo
    if (await hasAPIConnection()) {
      setTimeout(() => {
        // this.props.navigation.navigate('Home', {
        //   // url: urlnotif
        // });
        this.props.clearQRA();
        this.props.doFetchQRA(this.props.qra);
        this.props.navigation.push('QRAProfile', {
          qra: this.props.qra,
          screen: 'PROFILE'
        });
      }, 100);
      this.closeModaldeleteqra();
    } else this.setState({ nointernet: true });
  };

  render() {
    // console.log("RENDER QRA");

    return (
      <View>
        {this.props.imageurl !== null ? (
          <TouchableOpacity
            onPress={() =>
              this.onPressItem(this.props.imageurl, this.props.qra)
            }>
            <Image
              style={styles.faceImageStyle}
              resizeMethod="resize"
              source={{ uri: this.props.imageurl }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              this.onPressItem(this.props.imageurl, this.props.qra)
            }
            underlayColor="white">
            <Image
              source={require('../../images/emptyprofile.png')}
              style={styles.faceImageStyle}
            />
          </TouchableOpacity>
        )}

        <Text style={styles.name}>{this.props.qra}</Text>

        <Modal
          visible={this.state.modaldeleteqra}
          position={'top'}
          transparent={true}
          animationType={'slide'}
          onRequestClose={() => console.log('Close was requested')}>
          {/* <KeyboardAvoidingView behavior="padding"  > */}
          <View
            style={{
              padding: 10,
              backgroundColor: 'rgba(0,0,0,0.85)',
              marginTop: 185,
              left: 95,
              right: 15,
              width: 225,
              height: 190,
              paddingVertical: 5,
              //   position: 'absolute',

              //  alignItems: 'center',
              borderRadius: 12
            }}>
            <View style={{ flex: 1 }}>
              {/* <View style={{ marginTop: 10, flexDirection: 'row', padding:0}}> */}
              <View style={{ flex: 0.4, flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 0.68, alignItems: 'flex-end' }}>
                  {/* <Qra qra={this.props.qra} imageurl={this.props.imageurl} /> */}
                  {this.props.imageurl !== null ? (
                    <TouchableOpacity
                      style={{}}
                      onPress={() => this.qraProfile(this.props.qra)}>
                      <Image
                        style={styles.faceImageStyle}
                        resizeMethod="resize"
                        source={{ uri: this.props.imageurl }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{}}
                      onPress={() => this.qraProfile(this.props.qra)}>
                      <Image
                        source={require('../../images/emptyprofile.png')}
                        style={styles.faceImageStyle}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{ flex: 0.32, alignItems: 'flex-end' }}>
                  <TouchableOpacity
                    style={{ alignItems: 'flex-end' }}
                    onPress={() => this.qraProfile(this.props.qra)}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'lightgrey',
                        marginTop: 12,
                        marginLeft: 5
                      }}>
                      {I18n.t('ProfileQraViewProfile')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flex: 0.1,
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}>
                <Text style={styles.name2}>{this.props.qra}</Text>
              </View>

              <View
                style={{
                  flex: 0.3,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 5
                }}>
                {this.state.followstatus === 'false' && (
                  <TouchableOpacity
                    onPress={() =>
                      this.follow(this.props.qra, this.props.imageurl)
                    }>
                    <Text style={{ color: 'white', fontSize: 17 }}>
                      {I18n.t('ProfileQraFollow')}
                    </Text>
                  </TouchableOpacity>
                )}

                {/* {this.props.following==="TRUE" &&  */}
                {this.state.followstatus === 'true' && (
                  <TouchableOpacity onPress={() => this.follow(this.props.qra)}>
                    <Text style={{ color: 'white', fontSize: 17 }}>
                      {I18n.t('ProfileQraUnFollow')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* style={{ marginTop: 13,  padding:5, marginLeft: 5}} */}

              <View
                style={{
                  flex: 0.2,
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}>
                <TouchableOpacity onPress={() => this.closeModaldeleteqra()}>
                  <Text style={{ color: 'grey', fontSize: 16 }}>
                    {I18n.t('ProfileQraCancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* </View> */}
          </View>
          {/* </KeyboardAvoidingView > */}
        </Modal>
        {this.state.nointernet && (
          <VariosModales
            show={this.state.nointernet}
            modalType="nointernet"
            closeInternetModal={this.closeVariosModales.bind()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  faceImageStyle: {
    width: 65,
    height: 65,
    borderRadius: 30
  },
  name: {
    fontSize: 12,
    marginLeft: 5,
    padding: 2,
    fontWeight: 'bold',
    //  color: 'orange'
    color: '#243665'
  },
  name2: {
    fontSize: 12,
    marginLeft: 0,
    padding: 2,
    fontWeight: 'bold',
    color: '#8BD8BD'
  }
});

Qra.propTypes = {
  imageurl: PropTypes.string,
  qra: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    //sqlrdsid: state.sqso.currentQso.sqlrdsId,
    followings: state.sqso.currentQso.followings,
    jwtToken: state.sqso.jwtToken,
    userqra: state.sqso.qra,
    // webviewsession: state.sqso.webviewSession,
    userinfo: state.sqso.userInfo
  };
  //   isfetching: state.sqso.isFetching };
};

const mapDispatchToProps = {
  doFetchQRA,
  clearQRA,
  followAdd,
  unfollow
  // setWebView
};

export default connect(mapStateToProps, mapDispatchToProps)(Qra);
