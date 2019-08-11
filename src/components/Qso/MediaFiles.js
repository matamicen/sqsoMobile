import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, FlatList  } from 'react-native';
import { connect } from 'react-redux';
import { fetchPeople } from '../../actions';
import Media from './Media';
import PropTypes from 'prop-types';

class MediaFiles extends Component {

    constructor(props) {
        super(props);
        
         }

  

   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }

       LlamoAPI = () => {
      //  this.props.fetchPeople();
        //this.props.navigation.navigate('CameraScreen');
      }

  _keyExtractor = item => item.name;


  

  _renderItem = ({ item }) => {
    const { name, url,fileauxProfileAvatar, sqlrdsid, description , type, size, status, progress, sent, rdsUrlS3, urlNSFW, urlAvatar, date, width, height } = item;

    return (
      <View>
       <View style={{ paddingRight: 8 }}>
        <Media name={name} imageurl={url} fileauxProfileAvatar={fileauxProfileAvatar} sqlrdsid= {sqlrdsid} description={description} type={type} size={size}
         status={status} progress={progress} sent={sent} rdsUrlS3={rdsUrlS3} urlNSFW={urlNSFW} urlAvatar={urlAvatar} date={date} width={width} height={height} />
        </View>
       
      </View>
    );
  };


    render() { console.log("RENDER qso Mediafiles");
    console.log("Mediafiles:" +  JSON.stringify(this.props.mediafiles));
           
                           
              
        return( <View >
               
              <FlatList  style={styles.qralist }
               
                data={this.props.mediafiles}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                
               
               
                />

         </View>
            
           
       
        )} 

 }

 

 const styles = StyleSheet.create({
    
    qralist: {
        marginRight: 10 ,
        marginLeft: 10,
        marginTop: 3
      //  marginBottom: 70,
      // maxHeight: 150
     
     
    }
  });

  MediaFiles.propTypes = {
    
  };



 const mapStateToProps = state => {
    return {
        mediafiles: state.sqso.currentQso.mediafiles
      };
};


const mapDispatchToProps = {
   
   }

export default connect(mapStateToProps, mapDispatchToProps)(MediaFiles);