import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
  deletedFlag,
  deletePost,
  deleteQsoQra,
  followAdd,
  getUserInfo,
  QsoQraDelete,
  unfollow
} from '../../actions';
import { getDate, getFollowStatus, hasAPIConnection } from '../../helper';
import I18n from '../../utils/i18n';
import VariosModales from './VariosModales';

class Qra extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      errorMessage: '',
      isFetching: true,
      modaldeleteqra: false,
      followstatus: 'empty',
      nointernet: false,
      warningMessage: false
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
    if (
      this.props.following === 'NOT_EXIST' &&
      this.props.sqlrdsid.length === 0
    )
      this.setState({ modaldeleteqra: true, followstatus: 'NOT_EXIST' });
    else {
      followstat = await getFollowStatus(this.props.followings, qra);
      this.setState({ modaldeleteqra: true, followstatus: followstat });
    }
  };

  closeModaldeleteqra = () => {
    console.log('click close QRA: ');
    this.props.deletedFlag(false, '');
    this.setState({ warningMessage: false, modaldeleteqra: false });
  };
  deletePost = async () => {
    if (await hasAPIConnection()) {
      this.props.deletedFlag(false, '');
      //  this.setState({warningMessage: false});
      this.props.deletePost(this.props.sqlrdsid, this.props.jwtToken);
    } else this.setState({ nointernet: true });
  };

  follow = async (qra, qra_avatar) => {
    //  if(!this.props.isfetching){

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
        // si la API de follow fallara es mala suerte, no lo vera en los follwoing y lo debera hacer de nuevo en algun otro moment
        //  followstat = await getFollowStatus(this.props.followings, qra);
        //  if (followstat==="true") this.setState({followstatus: 'true'})
      } else {
        this.setState({ followstatus: 'false' });
        await this.props.unfollow(this.props.userqra, qra, this.props.jwtToken);
        // followstat = await getFollowStatus(this.props.followings, qra);
        // if (followstat==="false") this.setState({followstatus: 'false'})
      }
    } else {
      this.setState({ modaldeleteqra: false, nointernet: true });
    }

    //      this.props.getUserInfo();
    //     }else console.log('intento llamar dos veces follow')
  };

  closeVariosModales = () => {
    this.setState({ nointernet: false });
  };

  delete = async (qra) => {
    //#Publish no tiene sentido chequear internet ni si tiene sqlrdsid ya que siempre se borra de memoria ahora, los qras son enviados al final cuando se Publica
    // y si no ingreso QRAS el boton Publicar va a hacer la validacion

    // depende si el QSO esta Onprogress o si tiene un sqlrdsid creado borra llamando a la API o no.
    // if (await hasAPIConnection())
    // {
    // if (this.props.sqlrdsid !== ''){
    //      console.log('cantidad qras: '+this.props.qsoqras.length)
    //      if (this.props.qsoqras.length===1 && this.props.qsotype!=='POST')
    //        this.setState({warningMessage: true});
    //        else{
    //          this.props.QsoQraDelete(this.props.sqlrdsid,qra,this.props.jwtToken);
    //          this.closeModaldeleteqra();
    //        }
    //     }
    //      else{
    this.props.deleteQsoQra(qra);
    this.closeModaldeleteqra();
    //   }

    // }else
    // this.setState({nointernet: true});
    //#Publish
  };

  render() {
    //console.log('RENDER QRA');

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
              left: 40,
              right: 15,
              //  width: 170,
              width: 320,
              height: 190,
              paddingVertical: 5,
              //   position: 'absolute',

              //  alignItems: 'center',
              borderRadius: 12
            }}>
            {!this.state.warningMessage ? (
              <View style={{ flex: 1, alignItems: 'center', marginTop: 5 }}>
                <View style={{ flex: 0.4, flexDirection: 'row' }}>
                  {/* <Qra qra={this.props.qra} imageurl={this.props.imageurl} /> */}
                  {this.props.imageurl !== null ? (
                    <Image
                      style={styles.faceImageStyle}
                      resizeMethod="resize"
                      source={{ uri: this.props.imageurl }}
                    />
                  ) : (
                    <Image
                      source={require('../../images/emptyprofile.png')}
                      style={styles.faceImageStyle}
                    />
                  )}

                  <TouchableOpacity
                    style={{ marginTop: 5, padding: 5, marginLeft: 5 }}
                    onPress={() => this.delete(this.props.qra)}>
                    <Image
                      source={require('../../images/removecircle.png')}
                      style={{ width: 24, height: 24, marginLeft: 10 }}
                      resizeMode="contain"
                    />
                    <Text style={{ color: 'grey', fontSize: 16 }}>
                      {I18n.t('QraDelete')}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 0.15, marginRight: 68 }}>
                  <Text style={styles.name2}>{this.props.qra}</Text>
                </View>

                <View style={{ flex: 0.25, marginRight: 68 }}>
                  {this.state.followstatus === 'false' && (
                    <TouchableOpacity
                      onPress={() =>
                        this.follow(this.props.qra, this.props.imageurl)
                      }>
                      <Text style={{ color: 'white', fontSize: 17 }}>
                        {I18n.t('QraFollow')}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {/* {this.props.following==="TRUE" &&  */}
                  {this.state.followstatus === 'true' && (
                    <TouchableOpacity
                      onPress={() =>
                        this.follow(this.props.qra, this.props.imageurl)
                      }>
                      <Text style={{ color: 'white', fontSize: 17 }}>
                        {I18n.t('QraUnFollow')}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View
                  style={{
                    flex: 0.2,
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}>
                  <TouchableOpacity onPress={() => this.closeModaldeleteqra()}>
                    <Text style={{ color: 'grey', fontSize: 16 }}>
                      {I18n.t('QraCancel')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{ flex: 1, alignItems: 'center', marginTop: 3 }}>
                {!this.props.deletedflag ? (
                  <View
                    style={{
                      flex: 0.8,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 18,
                        alignItems: 'center'
                      }}>
                      {I18n.t('QraWarning')}
                    </Text>
                    <Text style={{ color: 'white', fontSize: 16 }}>
                      {I18n.t('QraTheEntirePost')}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 0.8,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <Text
                      style={{
                        color: 'yellow',
                        fontSize: 18,
                        alignItems: 'center'
                      }}>
                      {I18n.t('QraMessage')}
                    </Text>
                    <Text style={{ color: 'white', fontSize: 16 }}>
                      {this.props.deletepostmessage}
                    </Text>
                  </View>
                )}

                <View
                  style={{
                    flex: 0.2,
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <TouchableOpacity
                      onPress={() => this.closeModaldeleteqra()}>
                      <Text style={{ color: 'grey', fontSize: 16 }}>
                        {I18n.t('QraCancel')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {!this.props.deletedflag && (
                    <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                      <TouchableOpacity onPress={() => this.deletePost()}>
                        <Text style={{ color: 'grey', fontSize: 16 }}>
                          {I18n.t('QraDeletePost')}{' '}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            )}
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
    // color: '#333333'
    color: '#243665'
  },
  name2: {
    fontSize: 12,
    //   marginLeft: 3,
    // padding: 2,
    fontWeight: 'bold',
    // color: 'orange'
    color: '#8BD8BD'
  }
});

Qra.propTypes = {
  imageurl: PropTypes.string,
  qra: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    sqlrdsid: state.sqso.currentQso.sqlrdsId,
    followings: state.sqso.currentQso.followings,
    jwtToken: state.sqso.jwtToken,
    userqra: state.sqso.qra,
    qsotype: state.sqso.currentQso.qsotype,
    qsoqras: state.sqso.currentQso.qsoqras,
    deletedflag: state.sqso.currentQso.deletedFlag,
    deletepostmessage: state.sqso.currentQso.deletedFlagMessage
  };
  //   isfetching: state.sqso.isFetching };
};

const mapDispatchToProps = {
  QsoQraDelete,
  deleteQsoQra,
  followAdd,
  unfollow,
  getUserInfo,
  deletePost,
  deletedFlag
};

export default connect(mapStateToProps, mapDispatchToProps)(Qra);
