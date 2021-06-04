import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, TouchableOpacity, Dimensions, Modal,
Platform  } from 'react-native';
import { connect } from 'react-redux';
import { uploadMediaToS3 } from '../../actions';
import PropTypes from 'prop-types';
// import * as Progress from 'react-native-progress';
import PlayMediaAudioPost from './PlayMediaAudioPost';
import EditMedia from './EditMedia';
import DeleteMedia from './DeleteMedia';
import I18n from '../../utils/i18n';
import { hasAPIConnection } from '../../helper';
import VariosModales from './VariosModales';
import {  RNFFmpeg } from 'react-native-ffmpeg';


class Media extends React.PureComponent {
  constructor(props) {
    super(props);

    this.width = Dimensions.get("window").width; //full width
    this.height = Dimensions.get("window").height; //full height
    laresta = Dimensions.get("window").width * 0.1;
    restaWidth = Dimensions.get("window").width - laresta;
    console.log("laresta:" + laresta);
    console.log(restaWidth);

    this.state = {
      people: [],
      errorMessage: "",
      isFetching: true,
      editar: false,
      deleteMedia: false,
      nointernet: false,
    };
  }

  componentDidMount() {
    //  this.props.fetchPeople();
  }

  LlamoAPI = () => {
    //  this.props.fetchPeople();
    //this.props.navigation.navigate('CameraScreen');
  };

  closeModalEdit = () => {
    this.setState({ editar: false });
  };
  openModalEdit = async () => {
    if (await hasAPIConnection()) this.setState({ editar: true });
    else this.setState({ nointernet: true });
  };
  openDeleteMedia = () => {
    //  console.log('open delete media')
    this.setState({ deleteMedia: true });
  };
  CloseDeleteMedia = () => {
    this.setState({ deleteMedia: false });
    
  };

  stopFFmpegCompression = () => {

    RNFFmpeg.cancel();
 
      }

  closeVariosModales = () => {
    this.setState({ nointernet: false });
  };

  onPressItem = (
    fileName2,
    description,
    fileaux,
    fileauxProfileAvatar,
    sqlrdsid,
    size,
    type,
    rdsUrlS3,
    urlNSFW,
    urlAvatar,
    date,
    width,
    height,
    qra,
    rectime
  ) => {
    console.log(
      "presiono:" +
        fileName2 +
        " " +
        description +
        " " +
        fileaux +
        " " +
        sqlrdsid +
        " " +
        size +
        " " +
        type +
        " " +
        rdsUrlS3
    );
    this.props.uploadMediaToS3(
      fileName2,
      fileaux,
      fileauxProfileAvatar,
      sqlrdsid,
      description,
      size,
      type,
      rdsUrlS3,
      urlNSFW,
      urlAvatar,
      date,
      width,
      height,
      this.props.rdsurls3,
      qra,
      rectime,
      this.props.jwtToken
    );
    //  this.props.uploadMediaToS3(fileName2, fileaux, fileauxProfileAvatar, this.props.sqlrdsid, this.state.description,this.size, this.props.sqsomedia.type, rdsUrl,urlNSFW, urlAvatar, fecha, this.width, this.height);
    //  <Media name={name} imageurl={url} fileauxProfileAvatar={fileauxProfileAvatar} sqlrdsid= {sqlrdsid} description={description} type={type} size={size}
    //  status={status} progress={progress} sent={sent} rdsUrlS3={rdsUrlS3} urlNSFW={urlNSFW} urlAvatar={urlAvatar} date={date} width={width} height={height} />
  };

  render() {
    console.log("RENDER MEDIA");
    console.log("imagen type:" + this.props.url + this.props.type);
    console.log("screen WIDTH:" + this.width);

    // se genera a proposito un item VACIO en mediafiles para que ocupe lugar en el body cuando
    // no hay media enviada y el usuario puede salir del teclado en iOS si se equivoca presionano justamente
    // esa area. Se hizo asi porque el TouchwithFeedback no anda si hay un FLATLIST en el medio, entonces se
    // puso el touckWithFeedback en mediaFiles para cada item

    return this.props.type !== "vacio" ? (
      // <View style={{ flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          borderRadius: 5,
          height: 106,
          marginTop: 5,
        }}
      >
        <View
          style={{
            flex: 0.75,
            flexDirection: "row",
            marginTop: 6,
            marginLeft: 6,
            width: this.restaWidth
          }}
        >
          <View style={{ flex: 0.25 }}>
            {(this.props.type === "image" || this.props.type === "profile") && 
              <Image
                style={styles.mediaStyle}
                resizeMethod="resize"
                 source={{ uri: this.props.imageurl }}
                
                
              />
            
            }
            {(this.props.type === "audio") && 
              <PlayMediaAudioPost url={this.props.imageurl} />
            
            }
            {(this.props.type === "video") &&  
                  <View>
                  <Image
                   style={styles.mediaStyle}
                   resizeMethod="resize"
                   source={{ uri: this.props.videoimagepreview }}
                   
                 />
                    <Image style={styles.videoImageStyle}
                     source={require('../../images/video1.png')}
                         />
                 </View>
            
  }
            
            
   
          </View>
          <View style={{ flex: 0.7, width: this.restaWidth }}>
          <View style={{ flex: 0.20, alignItems: "flex-start" }}>
            <Text
              style={{ fontSize: 14, color: "#243665", fontWeight: "bold" }}
            >
              {I18n.t("MediaDescription")}
            </Text>
          </View>
          <View style={{ flex: 0.80, alignItems: "flex-start" }}>
            {this.props.description ? (
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  fontWeight: "bold",
                  marginLeft: Platform.OS === "ios" ? 1 : 1,
                }}
              >
                {this.props.description.substr(0, 80)}...
              </Text>
            ) : (
              <Text style={{ fontSize: 14, color: "grey", fontWeight: "bold" }}>
                {I18n.t("MediaEmptyDescription")}
              </Text>
            )}
          </View>






          </View> 
        </View>
        <View style={{ flex: 0.27, flexDirection: "row", marginLeft: 6 }}>
          <View style={{ flex: 0.80, alignItems: "flex-start" }}>
            { (this.props.status==='inappropriate content') &&
             <Text style={styles.inapropiate} > {I18n.t("MediaInappropiate")}</Text> } 
          </View>
          <View style={{ flex: 0.1, alignItems: "center" }}>
            {this.props.status !== "inappropriate content" && (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  alignContent: "center",
                  height: 50,
                }}
                onPress={() => this.openModalEdit()}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  resizeMethod="resize"
                  source={require("../../images/edit2.png")}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ flex: 0.1, alignItems: "center" }}>
            {this.props.status !== "inappropriate content" && (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  alignContent: "center",
                  height: 50,
                }}
                onPress={() => this.openDeleteMedia()}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  resizeMethod="resize"
                  source={require("../../images/delete2.png")}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Modal
          visible={this.state.editar}
          position={"top"}
          transparent={true}
          onRequestClose={() => console.log("Close was requested")}
        >
          {/* <KeyboardAvoidingView behavior="padding"  > */}
          <View
            style={{
              padding: 10,
              backgroundColor: "rgba(36,54,101,0.97)",
              marginTop: Platform.OS === "ios" ? 37 : 5,
              left: 15,
              right: 35,
              width: this.width - 35,

              height: 350,
              //  height: 320,
              paddingVertical: 5,
              //   position: 'absolute',

              //  alignItems: 'center',
              borderRadius: 12,
            }}
          >
            <EditMedia
              desc={this.props.description}
              url={this.props.imageurl}
              type={this.props.type}
              sqlrdsid={this.props.sqlrdsid}
              idmedia={this.props.idmedia}
              name={this.props.name}
              status={this.props.status}
              close={this.closeModalEdit.bind()}
            />
          </View>
        </Modal>

        {this.state.deleteMedia && (
          <DeleteMedia
            sqlrdsid={this.props.sqlrdsid}
            idmedia={this.props.idmedia}
            name={this.props.name}
            type={this.props.type}
            mediafiles={this.props.mediafiles}
            closeDelete={this.CloseDeleteMedia.bind()}
            stopffmpegcompression={this.stopFFmpegCompression.bind()}
            desc={this.props.type === "audio" ? "audio" : "photo"}
          />
        )}

        {this.state.nointernet && (
          <VariosModales
            show={this.state.nointernet}
            modalType="nointernet"
            closeInternetModal={this.closeVariosModales.bind()}
          />
        )}
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, flexDirection: "row", marginTop: 6, height: 170 }}
        >
          <Text style={styles.status}> </Text>
        </View>
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
       mediaStyle:
       {
        width: 58,
        height: 58,
        borderRadius: 30,
       // marginTop: 10
         },
         videoImageStyle:
         {
          width: 40,
          height: 40,
          marginLeft: 9
         // borderRadius: 30,
         // marginTop: 10
           },
    name:{
        fontSize: 12,
        marginLeft: 5,
        padding: 2,
        fontWeight: 'bold',        
        color: 'orange'        
    },
    status:{
      fontSize: 14,
      marginTop: 2,
      alignItems: 'flex-end',
      // textAlign: 'right',
      // marginRight: 2,
     // padding: 2,
     // fontWeight: 'bold',        
      // color: 'grey'   
      color: 'black'     
  },
  waiting:{
    fontSize: 14,
    marginTop: 2,
   // alignItems: 'flex-end',
    // textAlign: 'right',
    // marginRight: 2,
   // padding: 2,
   // fontWeight: 'bold',        
    // color: 'grey' 
    fontWeight: 'bold',  
    color: 'red'     
},
  inapropiate:{
    fontSize: 14,
    marginTop: 2,
    textAlign: 'right',
   
   // padding: 2,
   // fontWeight: 'bold',        
    color: 'red'        
}
  });

  Media.propTypes = {
    imageurl: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string
  };



 const mapStateToProps = state => {
    return { jwtToken: state.sqso.jwtToken,
        rdsurls3: state.sqso.urlRdsS3,
    };
};


const mapDispatchToProps = {
    uploadMediaToS3
   }

export default connect(mapStateToProps, mapDispatchToProps)(Media);