import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, Modal, StyleSheet, TextInput,
     TouchableOpacity } from 'react-native';
     import {Keyboard} from 'react-native'
     import { connect } from 'react-redux';
import { addQra, onprogressTrue, onprogressFalse, fetchQraProfileUrl, postQsoNew, postQsoQras,
  actindicatorPostQsoNewTrue } from '../../actions';
import PropTypes from 'prop-types';
import { updateOnProgress, check_firstTime_OnProgress} from '../../helper';
import { hasAPIConnection } from '../../helper';
import VariosModales from './VariosModales';


class QsoEnterQra extends Component {

    constructor(props) {
        super(props);

        this.arrAux = [];
        
        this.state = {
       //   pickerSelection: 'Choose Band',
         // pickerDisplayed: false
         qra: '',
         envio: {name: 'LW8PPP', url: 'https://s3.amazonaws.com/sqso/us-east-1%3A29a10ff3-e4d7-45cf-a432-7821674b8d77/profile/profile.jpg'},
         nointernet: false,
         size: 12,
         changeColor: true
         
        };
      }

    componentDidMount() {
 
       }

    
       addQra = async () => {
     //     this.setState({pickerSelection: value});


    if (await hasAPIConnection())
        {
        // chequea el haya una API en ejecucion
        if(!this.props.isfetching && this.state.qra !== '' && this.state.qra.toUpperCase() !== this.props.qra.toUpperCase())
        { 
           console.log("ejecuta addQRA");
          

   //       qra = {name: this.state.qra.toUpperCase(), url: 'https://randomuser.me/api/portraits/med/men/72.jpg'} 
          qra = {qra: this.state.qra.toUpperCase(), url: 'empty', sent: 'false', deleted: 'false', deletedSent: 'false', following: ''} 
    
          // hay que darle tiempo a que agregue el QRA al store asi despues chequea bien el onProgress
           this.props.addQra(qra);
           this.arrAux[0] = '1';
           this.arrAux[1] = '2';

          // update si el QSO esta onProress 
          if (ONPROGRESS=updateOnProgress(this.props.qsotype,this.props.band,this.props.mode,this.arrAux,this.props.mediafiles))
                  await this.props.onprogressTrue();
             else
                   this.props.onprogressFalse();

              
                  console.log("QRA OWNER:"+this.props.qra);

         // busco URL del profile
           this.props.fetchQraProfileUrl(this.state.qra.toUpperCase(),'qra',this.props.jwtToken);

          
          if (this.props.sqlrdsid===''){
            
            // chequeo si esta OnProgress para poder obtener el SqlRdsID de AWS RDS
          if (ONPROGRESS) {
           data = check_firstTime_OnProgress(this.props.qsotype,this.props.band,this.props.mode,this.props.rst,
                                        this.props.qra,ONPROGRESS,this.props.sqlrdsid,this.props.latitude,
                                        this.props.longitude);
                console.log("Data to Send API: "+ JSON.stringify(data));  
              
               this.props.actindicatorPostQsoNewTrue();
               this.props.postQsoNew(data,this.props.qsoqras,this.props.mediafiles,this.props.jwtToken);
               
          }else console.log("Todavia no esta OnProgreSSS como para llamar a PostNewQso");
            
          }else {
             qraToAddRds = [];
             qraToAddRds.push(qra);
             await this.props.postQsoQras("OnlyOneQra",this.props.sqlrdsid,qraToAddRds,this.props.jwtToken);
               }         
        }
        else console.log("se esta ejecutando una API o no se ingreso un QRA, no permite ejecutar otra api al mismo tiempo");

          Keyboard.dismiss();
          this.setState({qra: '', size: 12, changeColor: true});
         
      }
          else this.setState({nointernet: true});
        
    }

    closeVariosModales = () => {
      this.setState({nointernet: false}); 
    }

    enterQraStyle = () => {
      return {
        flex: 1,
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        borderRadius: 22,
        paddingLeft: 5,
         backgroundColor: '#f5f5f5',
      //  backgroundColor: 'grey',
        marginRight: 5,
        marginTop:2,
        marginBottom: 2,
        marginLeft: 4,
        fontSize: this.state.size,
        color: '#424242'
      }
    }
   

    render() { console.log("RENDER Enter QRA" );
    
              return <View style={{flexDirection: 'row',  backgroundColor: '#fff'}}>  
                    
                 <View style={styles.searchSection}>
                   {/* <TextInput style={{height: 20, width:50, fontSize: 16, marginTop: 8}} */}
                   <TextInput
                    style={this.enterQraStyle()}
                   placeholder="enter callsign" 
                   placeholderTextColor = "#D50000"
                   underlineColorAndroid="transparent"
                   value={this.state.qra}
                    onChangeText={(text) => {
                      if (text.length===0)
                         this.setState({qra: text, size: 12}) 
                       else
                         this.setState({qra: text, size: 16}) 
                         if (text.length>3)
                            this.setState({changeColor: false})   
                            if (text.length<4)
                            this.setState({changeColor: true})   
                  }}
                    onSubmitEditing={() => this.addQra() }
                    keyboardType={Platform.OS==='android' ? 'visible-password' : 'default'}
                    // underlineColorAndroid="transparent"
                     />
                     
                  {(this.state.changeColor) ?
                      <TouchableOpacity  style={{  height: 50, width:50 }} onPress={ () => this.addQra() }>
                    <Image source={require('../../images/personadd.png')}  style={{width: 32, height: 32, marginTop: 7, marginLeft: 7 } } 
                 resizeMode="contain" />              
                 </TouchableOpacity>
                 :

                 <TouchableOpacity  style={{  height: 50, width:50 }} onPress={ () => this.addQra() }>
                    <Image source={require('../../images/personaddAzul4.png')}  style={{width: 32, height: 32, marginTop: 7, marginLeft: 7 } } 
                 resizeMode="contain" />              
                 </TouchableOpacity>
               }
                      
                </View>
               
          {(this.state.nointernet) && 
           <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
            }
       
                                                 


                          </View>
       
     } 

 }

 const styles = StyleSheet.create({
 
  searchSection: {
    flex: 1,
    marginTop: 3 ,
    height: 39,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
   // backgroundColor: 'grey',
},
searchIcon: {
    padding: 10,
},
input: {
    flex: 1,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    borderRadius: 22,
    paddingLeft: 5,
     backgroundColor: '#f5f5f5',
   // backgroundColor: 'grey',
    marginRight: 10,
    marginTop:2,
    marginBottom: 2,
    marginLeft: 4,
   
    
   
    color: '#424242',
},

});

 QsoEnterQra.propTypes = {
   
};


 const mapStateToProps = state => {
    return {    
         band: state.sqso.currentQso.band,
         mode: state.sqso.currentQso.mode,
         rst: state.sqso.currentQso.rst,
         qsotype: state.sqso.currentQso.qsotype,
         qsoqras: state.sqso.currentQso.qsoqras,
         sqlrdsid: state.sqso.currentQso.sqlrdsId,
         isfetching: state.sqso.isfetching,
         qra: state.sqso.qra,
         onprogress: state.sqso.currentQso.onProgress,
         latitude: state.sqso.currentQso.latitude,
         longitude: state.sqso.currentQso.longitude,
         mediafiles: state.sqso.currentQso.mediafiles,
         jwtToken: state.sqso.jwtToken
       };
};


const mapDispatchToProps = {
    addQra,
    onprogressTrue,
    onprogressFalse,
    fetchQraProfileUrl,
    postQsoNew,
    postQsoQras,
    actindicatorPostQsoNewTrue
   }

export default connect(mapStateToProps, mapDispatchToProps)(QsoEnterQra);

