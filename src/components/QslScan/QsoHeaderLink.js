import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, TextInput, Platform  } from 'react-native';
import { connect } from 'react-redux';
import { fetchPeople } from '../../actions';
import QraLink from './QraLink';
import QsoQrasLink from './QsoQrasLink';
import QsoTypeLink from './QsoTypeLink';
import QsoBandLink from './QsoBandLink';
import QsoModeLink from './QsoModeLink';
import QsoDateLink from './QsoDateLink';
import QsoQtrLink from './QsoQtrLink';


class QsoHeaderLink extends React.PureComponent {

    constructor(props) {
        super(props);
        
        this.state = {
          people: [],
          errorMessage: "",
          isFetching: true,
          text: ''
        };
      }

  

   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }

       LlamoAPI = () => {
      //  this.props.fetchPeople();
        //this.props.navigation.navigate('CameraScreen');
      }


    render() { console.log("RENDER qso Header");
           
                           
              
        return(  <View style={styles.content} >
       
             <View style={{ flex:2.6}}>
               
                <View style={{flexDirection: 'row', flex:1}}>
                    <View style={{flex:0.20}}>
                        <QraLink qra={this.props.qra} imageurl={this.props.avatarpic} />  
                      </View>
                      <View style={{flex:0.15}}>
                        <QsoTypeLink type={this.props.type}/> 
                        </View>
                      <View style={{flex:0.64}}>  
                        {/* {  this.props.type!=='POST' ? */}
                        <QsoQrasLink qras={this.props.qras}/> 
                        {/* : null}  */}
                      </View> 
                  </View> 

              </View>

            <View style={{flex:1.40, marginTop: 0}}>
                  
                  <View style={{flex:1, flexDirection: 'row', marginTop: 0}}>
                    <View style={{flex:0.4, height: 25}} >
                    {  this.props.type!=='POST' ?
                      <QsoBandLink  band={this.props.band}/> : null} 
                      {/* <QsoDateLink datetime={this.props.datetime} /> */}
                    </View>
                    {/* <View style={{flex:0.5, alignItems: 'flex-end',height: 25}} > */}
                    <View style={{flex:0.6, alignItems: 'flex-end'}} >
                      <QsoDateLink datetime={this.props.datetime} />
                    </View>  
                  </View> 

                  <View style={{flex:1, flexDirection: 'row',  marginTop: 0}}>  
                        <View style={{flex:0.5,  height: 25}} > 
                        {  this.props.type!=='POST' ?
                            <QsoModeLink mode={this.props.mode} /> : null} 
                            {/* <QsoQtrLink datetime={this.props.datetime} /> */}
                        </View>    
                        <View style={{flex:0.5, alignItems: 'flex-end', height: 25}} >            
                            <QsoQtrLink datetime={this.props.datetime} />
                        </View >
                  </View>  
             </View>     
            
            </View>
           
       
        )} 

 }

 const styles = StyleSheet.create({
   content: {
      
    marginTop: Platform.OS === 'ios' ? 13 : 13,
    marginLeft: 1,
    marginRight: 1,
    flex: 4
    
    //flexDirection: 'row'
   
    }
});


 const mapStateToProps = state => {
    return {  
       
        sqsoqslscan: state.sqso.currentQso.qslscan.body.message
     };
};


const mapDispatchToProps = {
   
   }

export default connect(mapStateToProps, mapDispatchToProps)(QsoHeaderLink);