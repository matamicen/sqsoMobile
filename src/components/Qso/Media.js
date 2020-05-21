import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, TouchableOpacity, Dimensions, Modal  } from 'react-native';
import { connect } from 'react-redux';
import { uploadMediaToS3 } from '../../actions';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';
import PlayMediaAudioPost from './PlayMediaAudioPost';
import EditMedia from './EditMedia';
import DeleteMedia from './DeleteMedia';

class Media extends Component {

    constructor(props) {
        super(props);

        this.width = Dimensions.get('window').width; //full width
        this.height = Dimensions.get('window').height; //full height
        
        this.state = {
          people: [],
          errorMessage: "",
          isFetching: true,
          editar: false,
          deleteMedia: false
        };
      }

  

   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }

       LlamoAPI = () => {
      //  this.props.fetchPeople();
        //this.props.navigation.navigate('CameraScreen');
      }

      closeModalEdit = () => {
         this.setState({editar: false})
        }
      openModalEdit = () => {
         this.setState({editar: true})
       }
       openDeleteMedia = () => {
        //  console.log('open delete media')
        this.setState({deleteMedia: true})
      }
      CloseDeleteMedia = () => {
        this.setState({deleteMedia: false})
      }

      onPressItem = (fileName2, description, fileaux, fileauxProfileAvatar,  sqlrdsid, size, type, rdsUrlS3, urlNSFW,urlAvatar,  date, width,height,qra,rectime ) => {
       console.log('presiono:' + fileName2+ ' ' + description + ' ' + fileaux + ' ' + sqlrdsid + ' ' + size + ' ' + type + ' '+rdsUrlS3) ;
       this.props.uploadMediaToS3(fileName2, fileaux,fileauxProfileAvatar, sqlrdsid, description, size, type, rdsUrlS3, urlNSFW, urlAvatar, date, width, height,this.props.rdsurls3,qra, rectime, this.props.jwtToken);
     //  this.props.uploadMediaToS3(fileName2, fileaux, fileauxProfileAvatar, this.props.sqlrdsid, this.state.description,this.size, this.props.sqsomedia.type, rdsUrl,urlNSFW, urlAvatar, fecha, this.width, this.height);
    //  <Media name={name} imageurl={url} fileauxProfileAvatar={fileauxProfileAvatar} sqlrdsid= {sqlrdsid} description={description} type={type} size={size}
    //  status={status} progress={progress} sent={sent} rdsUrlS3={rdsUrlS3} urlNSFW={urlNSFW} urlAvatar={urlAvatar} date={date} width={width} height={height} />
    }


    render() { console.log("RENDER MEDIA");
    console.log("imagen type:" + this.props.url + this.props.type)
    console.log("screen WIDTH:" + this.width)
           
           
                           
        // se genera a proposito un item VACIO en mediafiles para que ocupe lugar en el body cuando 
        // no hay media enviada y el usuario puede salir del teclado en iOS si se equivoca presionano justamente
        // esa area. Se hizo asi porque el TouchwithFeedback no anda si hay un FLATLIST en el medio, entonces se
        // puso el touckWithFeedback en mediaFiles para cada item

        return( (this.props.type!=='vacio') ?
        // <View style={{ flex: 1, backgroundColor: 'white'}}>
        <View style={{ flex: 1, backgroundColor: '#f5f5f5', borderRadius:5, height:106, marginTop: 5 }}>
               
               <View style={{flex: 0.75, flexDirection: 'row', marginTop: 6, marginLeft: 6 }}>
                  <View style={{flex:0.25 }}>
                      { (this.props.type==='image' || this.props.type==='profile') ? <Image
                    style={styles.mediaStyle}
                    resizeMethod="resize"
                    source={{ uri: this.props.imageurl }}
                      />
                      
                      
                      : 
                      <PlayMediaAudioPost url={this.props.imageurl}  /> 
                      
                      
                      // <Image
                      // style={styles.mediaStyle}
                      // source={require('../../images/audio.png')}
                      //     /> 
                          
                          
                          }
                    
                    </View>
                    <View  style={{flex:0.70 }}>
                    <View style={{flex:0.2 }}>

                      <Progress.Bar
                          // style={{marginTop: 13, height: 6, width: this.width-125}}
                          style={{marginTop: 13, height: 6}}
                           width={this.width-142}
                          unfilledColor="lightgrey"
                          borderRadius={0}
                      //   height={15}
                      //    color={['#F44336', '#2196F3', '#009688']}
                          // color="#8BD8BD"
                          color="#243665"
                          borderWidth={0}
                          progress={this.props.progress}
                          //indeterminate={true}
                        />
                    </View>
                    <View  style={{flex:0.8, marginTop: 5, alignItems: 'flex-end' }}>
                            { (this.props.status==='sent') && 
                         <Text style={styles.status} >   SENT</Text>
                        }
                       
                        { (this.props.status==='inprogress') && 
                         <Text style={styles.status} >   IN PROGRESS</Text>
                         }

                          { (this.props.status==='failed') && 
                         <Text style={styles.status} >   FAILED </Text>
                        }

                            { (this.props.status==='waiting') && 
                         <Text style={styles.status} >  Enter callsign, Band and Mode</Text>
                        } 


                          { (this.props.status==='inappropriate content') && 
                         <Text style={styles.inapropiate} >   inappropriate content</Text>
                        }

                        {/* { (this.props.sent) ? 
                        // <TouchableHighlight onPress={() => this.onPressItem(this.props.name,this.props.description,this.props.imageurl,
                        //      this.props.sqlrdsid, this.props.size, this.props.type)} underlayColor="white">
                         <Text style={styles.status} > TRUE </Text>
                        //  </TouchableHighlight>
                         : */}

                         { (this.props.status==='failed' || this.props.status==='inprogress') && 
                            <TouchableOpacity onPress={() => this.onPressItem(this.props.name,this.props.description,this.props.imageurl,this.props.fileauxProfileAvatar,
                                this.props.sqlrdsid, this.props.size, this.props.type, this.props.rdsUrlS3,this.props.urlNSFW,this.props.urlAvatar, this.props.date, this.props.width, this.props.height,
                                this.props.qra, this.props.rectime)} underlayColor="white">
                            <Text style={styles.status} >   Send again</Text>
                            </TouchableOpacity>
                        }
                       </View>        
                        
                             

                    </View>
                    
                 

              </View>
              <View style={{flex: 0.27, flexDirection: 'row', marginLeft: 6}}>
             
              <View style={{flex: 0.22, alignItems: "flex-start"}}>
                <Text style={{fontSize: 14,color: '#243665',fontWeight: 'bold'}} >Description:</Text>
              </View>
              <View style={{flex: 0.58, alignItems: "flex-start"}}>
                {(this.props.description) ?
                <Text style={{fontSize: 14,color: 'black', fontWeight: 'bold'}} >{this.props.description}</Text>
                :
                <Text style={{fontSize: 14,color: 'grey', fontWeight: 'bold'}} >no description</Text>
                }
                </View>
              <View style={{flex: 0.10, alignItems: "center"}}>
              <TouchableOpacity  style={{alignItems:"center", alignContent:"center", height:50}}  onPress={() => this.openModalEdit()}  >
                  <Image
                        style={{ width: 20,
                          height: 20
                        }}
                        resizeMethod="resize"
                        source={require('../../images/edit2.png')}
                          />
                </TouchableOpacity>
                {/* <Text style={{fontSize: 14,color: 'black'}} >Edit</Text> */}
              </View>
              <View style={{flex: 0.10, alignItems: "center"}}>
              <TouchableOpacity  style={{alignItems:"center", alignContent:"center", height:50}}  onPress={() => this.openDeleteMedia()}  >
                  <Image
                        style={{ width: 20,
                          height: 20
                        }}
                        resizeMethod="resize"
                        source={require('../../images/delete2.png')}
                          />
                </TouchableOpacity>
                {/* <Text style={{fontSize: 14,color: 'black'}} >Edit</Text> */}
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
                backgroundColor: "rgba(0,0,0,0.85)",
                marginTop: 5,
                left: 15,
                right: 35,
                width: this.width - 35,

                height: 500,
           //  height: 320,
                paddingVertical: 5,
                //   position: 'absolute',

                //  alignItems: 'center',
                borderRadius: 12
              }}
            >
              
              <EditMedia desc={this.props.description} url={this.props.imageurl}  type={this.props.type}  close={this.closeModalEdit.bind()} />
            
       
            </View>
           
          </Modal>

          {(this.state.deleteMedia) &&
              <DeleteMedia  sqlrdsid={this.props.sqlrdsid} idmedia={this.props.idmedia} name={this.props.name} mediafiles={this.props.mediafiles} closeDelete={this.CloseDeleteMedia.bind()} desc={(this.props.type==='audio') ? 'audio' : 'photo' }/>
            }

            
            </View>
    

         :
         <View style={{ flex: 1 }}>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 6, height: 170 }}>
            <Text style={styles.status} >    </Text>

            </View>
           </View>
           
       
        )} 

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