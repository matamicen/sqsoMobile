import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    Image,

    Modal,

    StyleSheet, Text,





    TouchableOpacity, View
} from 'react-native';
import { connect } from 'react-redux';
import { deleteQsoQra, followAdd, QsoQraDelete, unfollow } from '../../actions';
import { getDate, getFollowStatus, hasAPIConnection } from '../../helper';
import VariosModales from '../Qso/VariosModales';

class Qra extends Component {
  constructor(props) {
    super(props);

    // this.followstatus = '';

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
    // console.log('a ver si lo sigue:'+ getFollowStatus(this.props.followings, qra));
    // this.followstatus = getFollowStatus(this.props.followings, qra);

    followstat = await getFollowStatus(this.props.followings, qra);
    this.setState({ modaldeleteqra: true, followstatus: followstat });
  };

  closeModaldeleteqra = () => {
    console.log('click close QRA: ');
    this.setState({ modaldeleteqra: false });
  };

  follow = async (qra, qra_avatar) => {
    //  if(!this.props.isfetching){

    if (await hasAPIConnection()) {
      date = getDate();
      if (this.state.followstatus === 'false') {
        this.setState({ followstatus: 'true' });
        this.props.followAdd(
          this.props.userqra,
          qra,
          date,
          this.props.jwtToken,
          qra_avatar
        );
        // chequeo si la api fue exitosa y lo dio de alta en redux

        // saco estas dos lineas de abajo para darle mejor UX al usuario y que cambie al toque el Follow
        // si la API de follow fallara es mala suerte, no lo vera en los follwoing y lo debera hacer de nuevo en algun otro momento
        // followstat = await getFollowStatus(this.props.followings, qra);
        // if (followstat==="true") this.setState({followstatus: 'true'})
      } else {
        this.setState({ followstatus: 'false' });
        await this.props.unfollow(this.props.userqra, qra, this.props.jwtToken);
        //  followstat = await getFollowStatus(this.props.followings, qra);
        //  if (followstat==="false") this.setState({followstatus: 'false'})
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

  delete = (qra) => {
    // depende si el QSO esta Onprogress o si tiene un sqlrdsid creado borra llamando a la API o no.
    if (this.props.sqlrdsid !== '')
      this.props.QsoQraDelete(this.props.sqlrdsid, qra, this.props.jwtToken);
    else this.props.deleteQsoQra(qra);

    this.closeModaldeleteqra();
  };

  render() {
    //  console.log("RENDER QRA");

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
              left: 105,
              right: 15,
              width: 170,
              height: 190,
              paddingVertical: 5,
              //   position: 'absolute',

              //  alignItems: 'center',
              borderRadius: 12
            }}>
            <View style={{ flex: 1 }}>
              {/* <View style={{ marginTop: 10, flexDirection: 'row', padding:0}}> */}
              <View
                style={{
                  flex: 0.4,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 5
                }}>
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
              </View>

              <View
                style={{
                  flex: 0.1,
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}>
                {this.props.userqra !== this.props.qra ? (
                  <Text style={styles.name2}>{this.props.qra}</Text>
                ) : (
                  <Text style={styles.name2}>You</Text>
                )}
              </View>

              <View
                style={{
                  flex: 0.3,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 5
                }}>
                {this.state.followstatus === 'false' &&
                  this.props.userqra !== this.props.qra && (
                    <TouchableOpacity
                      onPress={() =>
                        this.follow(this.props.qra, this.props.imageurl)
                      }>
                      <Text style={{ color: 'white', fontSize: 17 }}>
                        Follow
                      </Text>
                    </TouchableOpacity>
                  )}

                {/* {this.props.following==="TRUE" &&  */}
                {this.state.followstatus === 'true' &&
                  this.props.userqra !== this.props.qra && (
                    <TouchableOpacity
                      onPress={() => this.follow(this.props.qra)}>
                      <Text style={{ color: 'white', fontSize: 17 }}>
                        UnFollow
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
                  <Text style={{ color: 'grey', fontSize: 16 }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    width: 60,
    height: 60,
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
    // marginLeft: 11,
    // padding: 2,
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
    sqlrdsid: state.sqso.currentQso.sqlrdsId,
    followings: state.sqso.currentQso.followings,
    jwtToken: state.sqso.jwtToken,
    userqra: state.sqso.qra
  };
  //   isfetching: state.sqso.isFetching };
};

const mapDispatchToProps = {
  QsoQraDelete,
  deleteQsoQra,
  followAdd,
  unfollow
};

export default connect(mapStateToProps, mapDispatchToProps)(Qra);
