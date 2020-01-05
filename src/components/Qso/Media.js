import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, TouchableOpacity, Dimensions  } from 'react-native';
import { connect } from 'react-redux';
import { uploadMediaToS3 } from '../../actions';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';

class Media extends Component {

    constructor(props) {
        super(props);

        this.width = Dimensions.get('window').width; //full width
        this.height = Dimensions.get('window').height; //full height
        
        this.state = {
          people: [],
          errorMessage: "",
          isFetching: true
        };
      }

  

   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }

       LlamoAPI = () => {
      //  this.props.fetchPeople();
        //this.props.navigation.navigate('CameraScreen');
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
        
        <View style={{ flex: 1 }}>
               
               <View style={{flex: 1, flexDirection: 'row', marginTop: 6 }}>

                      { (this.props.type==='image' || this.props.type==='profile') ? <Image
                    style={styles.mediaStyle}
                    resizeMethod="resize"
                    source={{ uri: this.props.imageurl }}
                      />
                      
                      
                      : <Image
                      style={styles.mediaStyle}
                      source={require('../../images/audio.png')}
                          /> }
                    
                     
                    <View  style={{marginLeft: 25 }}>

                      <Progress.Bar
                          style={{marginTop: 23, height: 6, width: this.width-120}}
                          width={this.width-120}
                          unfilledColor="lightgrey"
                          borderRadius={0}
                      //   height={15}
                      //    color={['#F44336', '#2196F3', '#009688']}
                          color="lightgreen"
                          borderWidth={0}
                          progress={this.props.progress}
                          //indeterminate={true}
                        />

                            { (this.props.status==='sent') && 
                         <Text style={styles.status} > SENT </Text>
                        }
                       
                        { (this.props.status==='inprogress') && 
                         <Text style={styles.status} > IN PROGRESS </Text>
                         }

                          { (this.props.status==='failed') && 
                         <Text style={styles.status} > FAILED </Text>
                        }

                           { (this.props.status==='waiting') && 
                         <Text style={styles.status} > Enter callsign, Band and Mode</Text>
                        }


                          { (this.props.status==='inappropriate content') && 
                         <Text style={styles.inapropiate} > inappropriate content </Text>
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
                            <Text style={styles.status} > Send again </Text>
                            </TouchableOpacity>
                        }
                              
                        
                             

                    </View>
                    
                 

              </View>

            

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
        borderRadius: 30
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
      textAlign: 'right',
     // padding: 2,
     // fontWeight: 'bold',        
      color: 'grey'        
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