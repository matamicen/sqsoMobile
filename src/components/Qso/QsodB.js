import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, Modal, StyleSheet, TouchableHighlight, TouchableOpacity,  Picker  } from 'react-native';
import { connect } from 'react-redux';
import { setBand, postQsoNew, onprogressTrue, onprogressFalse, postQsoEdit, actindicatorPostQsoNewTrue, setRst } from '../../actions';
import PropTypes from 'prop-types';
import { updateOnProgress, check_firstTime_OnProgress, hasAPIConnection } from '../../helper';
import VariosModales from './VariosModales';




class QsodB extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
       //   pickerSelection: 'Choose Band',
          pickerDisplayed: false,
          nointernet: false,
          //user: '6',
        //   rstR: '5',
        //   rstS: '9',
        //   rstT: ' ',
          db1: '-',
          db2: '0',
          db3: '7'
         
       
        };
     
      }

      componentDidMount() {
 
    }

    


      closeVariosModales = () => {
        this.setState({nointernet: false}); 
        // this.togglePicker();
      }


      togglePicker = () => {
          console.log("llamo togglepicker")
        this.setState({pickerDisplayed: !this.state.pickerDisplayed})
    }



    // ahora vienen los updates de dB de los modos digitales

    updatedb1 = async (db1) => {
      if (await hasAPIConnection())
      {  
         console.log('signo elegido: '+db1);
         if (this.state.db1!==db1) {
 
             console.log('signo elegido: '+db1);
             console.log('signo anterior: '+this.state.db1);
             this.setState({ db1: db1 })
             dbActual = db1+this.state.db2 + this.state.db3
            //  this.props.setRst(rstActual,this.props.digitalmode,this.props.rstbeforechangemode);
            this.props.setRst(dbActual,true); 
             if (this.props.sqlrdsid!==''){
 
              
 
                 qsoHeader = { "mode" : this.props.mode,
                 "band" : this.props.band,
                 "type" : this.props.qsotype,
                 "sqlrdsid" : this.props.sqlrdsid,
                 "qra": this.props.qra,
                 "rst" : '',
                 "db" : dbActual
               }
               console.log("antes de enviar a API qdoHeader:"+ JSON.stringify(qsoHeader))
 
                await this.props.postQsoEdit(qsoHeader,this.props.jwtToken);
             }
          
         }
 
     }else
     { this.togglePicker();
       this.setState({nointernet: true});
     }
      }
     
      updatedb2 = async (db2) => {
 
         if (await hasAPIConnection())
         {  
            if (this.state.db2!==db2) {
    
             console.log('db2 elegido: '+db2);
             console.log('db2 anterior: '+this.state.db2);
             this.setState({ db2: db2 })
             dbActual = this.state.db1+db2 + this.state.db3
             this.props.setRst(dbActual,true);
                
                if (this.props.sqlrdsid!==''){
    
       
 
         qsoHeader = { "mode" : this.props.mode,
         "band" : this.props.band,
         "type" : this.props.qsotype,
         "sqlrdsid" : this.props.sqlrdsid,
         "qra": this.props.qra,
         "rst" : '',
         "db" : dbActual
       }
       console.log("antes de enviar a API qdoHeader:"+ JSON.stringify(qsoHeader))
 
        await this.props.postQsoEdit(qsoHeader,this.props.jwtToken);
     }
 
  
   }
 
 
     }else
     { this.togglePicker();
     this.setState({nointernet: true});
     }
  }
 
  updatedb3 = async (db3) => {
     if (await hasAPIConnection())
     {  
        if (this.state.db3!==db3) {
     
         console.log('db3 elegido: '+db3);
         console.log('db3 anterior: '+this.state.db3);
         this.setState({ db3: db3 })
         // if (rstT===' ')
         //     rstActual = this.state.rstR+this.state.rstS;
         //  else
             dbActual = this.state.db1+this.state.db2+db3
         this.props.setRst(dbActual,true);
 
            
            if (this.props.sqlrdsid!==''){
 
                
 
                qsoHeader = { "mode" : this.props.mode,
                "band" : this.props.band,
                "type" : this.props.qsotype,
                "sqlrdsid" : this.props.sqlrdsid,
                "qra": this.props.qra,
                "rst" : '',
                "db" : dbActual
              }
              console.log("antes de enviar a API qdoHeader:"+ JSON.stringify(qsoHeader))
 
               await this.props.postQsoEdit(qsoHeader,this.props.jwtToken);
            }
         
        }
 
    }else
    { this.togglePicker();
      this.setState({nointernet: true});
    }
     }
    

    //  updaterstT = (rstT) => {
    //     console.log('T elegido: '+rstT);
    //     console.log('T anterior: '+this.state.rstT);
    //     this.setState({ rstT: rstT })
    //  }


    render() { console.log("RENDER qso BAND" );
              
              
              // 6 tenia android


        return <View style={{flex:1, flexDirection: 'row' }}>               
                                 
                                 {/* , marginLeft: 33 */}
           <View style={{ flex: 0.45,marginTop: 8, alignItems: 'flex-end' }}>
               <TouchableOpacity   onPress={() => this.togglePicker()}>                  
               {/* { (this.props.digitalmode) ?
               <Text style={{ fontSize: 17, color: '#999', marginTop: 0, marginLeft: 4  }} onPress={() => this.togglePicker()} >  dB</Text>
               : */}
               <Text style={{ fontSize: 19, color: '#999'  }} onPress={() => this.togglePicker()} >dB</Text>
               </TouchableOpacity >
             </View>
            {/* } */}
            <View style={{ flex: 0.55, marginTop: 8}}>
               <TouchableOpacity   onPress={() => this.togglePicker()}>        
                  <Text style={{ fontSize: 19, color: '#999' }} onPress={() => this.togglePicker()} > {this.props.db}</Text>
                  </TouchableOpacity >
             </View>
               <Modal visible ={this.state.pickerDisplayed} animationType={"slide"} transparent={true} onRequestClose={() => console.log('Close was requested')}>
                    <View style={{ margin:20,
                      padding:20, 
                         backgroundColor: '#efefef',
                         top: 15,
                        //  bottom: ,
                         left: 20,
                         right: 20,
                         position: 'absolute',
                        alignItems: 'center' ,
                         borderBottomLeftRadius: 22,
                         borderBottomRightRadius: 22,
                         borderTopLeftRadius: 22,
                         borderTopRightRadius: 22,                     
                          }}>
                          
                          <Text style={{ color: 'black', fontSize: 18, fontWeight: "bold"  }}>db</Text>
                        <View style={{flexDirection: 'row', marginTop: 6, flex:1, marginLeft: 10 }}>
                      
                <View style={{flex: 0.3}}>
                    {/* <View style={{flex: 0.2, alignItems: "center"}}>
                    {Platform.OS==='ios' ?
                      <Text style={{ color: 'black', fontSize: 16, fontWeight: "bold"  }}>d</Text>
                       :
                       <Text style={{ color: 'black', fontSize: 16, fontWeight: "bold", alignSelf: "flex-start", marginLeft: 7.5  }}>d</Text>
                             } 
                      </View>  */}
                    <View style={{flex: 0.8}}>
                 
                            <Picker   mode="dialog"
                                        style={{width: 75}}  selectedValue = {this.state.db1} onValueChange = {this.updatedb1}>
                                        <Picker.Item label = "-" value = "-" />
                                        <Picker.Item label = "+" value = "+" />
                                       
                            </Picker>
                      </View>
                  
                </View>
           
             <View style={{flex: 0.3}}>
                    {/* <View style={{flex: 0.2, alignItems: "center"}}>
                    {Platform.OS==='ios' ?
                      <Text style={{ color: 'black', fontSize: 16, fontWeight: "bold"  }}>S</Text>
                       :
                       <Text style={{ color: 'black', fontSize: 16, fontWeight: "bold", alignSelf: "flex-start", marginLeft: 7.5  }}>S</Text>
                             } 
                    </View>  */}
                    <View style={{flex: 0.8, alignItems: "flex-start"}}>
                       <Picker   mode="dialog"
                                     style={{width: 85}}  selectedValue = {this.state.db2} onValueChange = {this.updatedb2}>
                                    <Picker.Item label = "0" value = "0" />
                                    <Picker.Item label = "1" value = "1" />
                                    <Picker.Item label = "2" value = "2" />
                                    <Picker.Item label = "3" value = "3" />
                                    <Picker.Item label = "4" value = "4" />
                                    <Picker.Item label = "5" value = "5" />
                                    <Picker.Item label = "6" value = "6" />
                                    <Picker.Item label = "7" value = "7" />
                                    <Picker.Item label = "8" value = "8" />
                                    <Picker.Item label = "9" value = "9" />
                         </Picker> 
                     </View>
               </View> 
               <View style={{flex: 0.3}}>
               {/* <View style={{flex: 0.2, alignItems: "center"}}>
               {Platform.OS==='ios' ?
                      <Text style={{ color: 'black', fontSize: 16, fontWeight: "bold"  }}>T</Text>
                       :
                       <Text style={{ color: 'black', fontSize: 16, fontWeight: "bold", alignSelf: "flex-start", marginLeft: 7.5  }}>T</Text>
                             } 
                    </View>  */}
                    <View style={{flex: 0.8, alignItems: "flex-start"}}>
                       <Picker   mode="dialog"
                                     style={{width: 75}}  selectedValue = {this.state.db3} onValueChange = {this.updatedb3}>
                                    <Picker.Item label = "0" value = "0" />
                                    <Picker.Item label = "1" value = "1" />
                                    <Picker.Item label = "2" value = "2" />
                                    <Picker.Item label = "3" value = "3" />
                                    <Picker.Item label = "4" value = "4" />
                                    <Picker.Item label = "5" value = "5" />
                                    <Picker.Item label = "6" value = "6" />
                                    <Picker.Item label = "7" value = "7" />
                                    <Picker.Item label = "8" value = "8" />
                                    <Picker.Item label = "9" value = "9" />
                         </Picker> 
                    </View>
               </View>  
               </View>  

                           {/* } */}

                  
                    <TouchableOpacity   onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4, alignItems: 'center'}}>
                      <Text style={{ color: '#999'}}>Close</Text>
                    </TouchableOpacity >

                    </View>

               
               </Modal>
               {(this.state.nointernet) && 
               <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
               }
          

            </View>
       
     } 

 }

 const styles = StyleSheet.create({
    text: {
       fontSize: 30,
       alignSelf: 'center',
       color: 'red'
    }
 })

 const stylesPicker = StyleSheet.create({
    // placeholder: {
    // //   color: colors.PRIMARY_BLUE,
    // },
    // inputIOS: {
    //   color: colors.PRIMARY_BLUE,
    //   height: NAVBAR_HEIGHT,
    //   paddingLeft: 16,
    //   paddingRight: 16,
    // },
    inputAndroid: {
    //   color: colors.PRIMARY_BLUE,
       height: 50,
    //   paddingVertical: 1,
    //   paddingTop: 1,
       fontSize: 20
    
    //   paddingLeft: 16,
    //   paddingRight: 16,
    },
    // iconContainer: {
    //   alignItems: 'center',
    //   height: NAVBAR_HEIGHT,
    //   justifyContent: 'center',
    //   paddingRight: 16,
    // }
  });


 const mapStateToProps = state => {
    return {        
        band: state.sqso.currentQso.band,
        mode: state.sqso.currentQso.mode,
        rst: state.sqso.currentQso.rst,
        db: state.sqso.currentQso.db,
        // rstbeforechangemode: state.sqso.currentQso.rstBeforeChangeMode,
        digitalmode: state.sqso.currentQso.digitalMode,
        qsotype: state.sqso.currentQso.qsotype,
        qsoqras: state.sqso.currentQso.qsoqras,
        sqlrdsid: state.sqso.currentQso.sqlrdsId,
        latitude: state.sqso.currentQso.latitude,
        longitude: state.sqso.currentQso.longitude,
        isfetching: state.sqso.isfetching,
        qra: state.sqso.qra,   
        mediafiles: state.sqso.currentQso.mediafiles,
        jwtToken: state.sqso.jwtToken
    };
};


const mapDispatchToProps = {
    setBand,
    setRst,
    postQsoNew,
    onprogressTrue,
    onprogressFalse,
    postQsoEdit,
    actindicatorPostQsoNewTrue
    
   }

export default connect(mapStateToProps, mapDispatchToProps)(QsodB);

