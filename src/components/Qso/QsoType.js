import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, TouchableOpacity, Modal, 
  TouchableHighlight  } from 'react-native';
import { connect } from 'react-redux';
import { cambioqsotype, postQsoEdit, resetQso } from '../../actions';
import { hasAPIConnection } from '../../helper';
import VariosModales from './VariosModales';



class QsoType extends Component {

    constructor(props) {
        super(props);
        this.state = {
          changeqsoModal: false,
          nointernet: false
        }
      }

  

   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }

       changeQsoType = async (typetochange) => {

        if (await hasAPIConnection())
        {

        if(typetochange==='LISTEN'){
         if (this.props.qsotype==='POST') await this.props.resetQso();
           this.props.cambioqsotype('LISTEN');
         
        }
        if(typetochange==='QSO'){
        if (this.props.qsotype==='POST') await this.props.resetQso();
          this.props.cambioqsotype('QSO');
        }
        if(typetochange==='POST'){
         await this.props.resetQso();
         this.props.cambioqsotype('POST');
         
        }

        if (this.props.sqlrdsid!=='') {

          qsoHeader = { "mode" : this.props.mode,
                        "band" : this.props.band,
                        "rst" : this.props.rst,
                        "type" : typetochange,
                        "sqlrdsid" : this.props.sqlrdsid,
                        "qra": this.props.qra
                    }
          console.log("antes de enviar a API qdoHeader:"+ JSON.stringify(qsoHeader))
           this.props.postQsoEdit(qsoHeader,this.props.jwtToken);   
        }

        this.closeQsoTypeModal();
      }
        else this.setState({nointernet: true});
      
      }

      openQsoTypeModal = async () => {
        //this.props.cambioqsotype();
        if (await hasAPIConnection())
            this.setState({changeqsoModal: true});
          else 
             this.setState({nointernet: true}); 
        }

      closeQsoTypeModal = () => {
        this.setState({changeqsoModal: false})
      }

      closeVariosModales = () => {
        this.setState({nointernet: false}); 
      }

   


    render() { console.log("RENDER qso Header ... QSOTYPE: "+ this.props.qsotype);
           
              
        return( <View style={{marginLeft: 5} }>

              { (this.props.qsotype==='QSO') ?
              <TouchableOpacity  style={{}}  onPress={ () => this.openQsoTypeModal() }> 
                 <Image source={require('../../images/qsoAzul1.png')} style={{width: 50, height: 50} } 
                 resizeMode="contain" /> 
              </TouchableOpacity> 
                

               :  (this.props.qsotype==='LISTEN') ? 
               <TouchableOpacity  style={{}}  onPress={ () => this.openQsoTypeModal() }> 
                 <Image source={require('../../images/listenAzul1.png')} style={{width: 50, height: 50} } 
                 resizeMode="contain" />
                 </TouchableOpacity>
                  :

                (this.props.qsotype==='POST') ? 
                 <TouchableOpacity  style={{}}  onPress={ () => this.openQsoTypeModal() }> 
                 <Image source={require('../../images/postAzul1.png')} style={{width: 50, height: 50} } 
                 resizeMode="contain" />
                 </TouchableOpacity> 
                 
                 : null
                }

{(this.state.nointernet) && 
  <VariosModales show={this.state.nointernet} modalType="nointernet" closeInternetModal={this.closeVariosModales.bind()} />
}
<Modal visible ={this.state.changeqsoModal}  transparent={true} onRequestClose={() => console.log('Close was requested')}>
                    <View style={{
                      //  margin:20,
                          padding:15, 
                      //    backgroundColor:  '#ffffff',
                          backgroundColor: '#f5f5f5',
                          top: 90,
                          left: 22,
                          right: 22,
                          position: 'absolute',
                          borderBottomLeftRadius: 22,
                          borderBottomRightRadius: 22,
                          borderTopLeftRadius: 22,
                          borderTopRightRadius: 22,
                                                    
                        //  alignItems: 'center'                      
                          }}>
                          
                  <Text style={{ color: '#4F4F4F', fontSize: 20, padding: 5 }}>Select the Log Type</Text>
                  

                  <View style={{ justifyContent: 'space-around', 
                      flex: 1, flexDirection: 'column' }}>
                   
                   { (this.props.qsotype==='QSO') ? 
                      <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('LISTEN') }> 
                      <View style={{flexDirection: 'row', flex:1}}>
                          <Image source={require('../../images/listenAzul1.png')} style={{width: 50, height: 50, flex: 0.3}} 
                          resizeMode="contain" />
                          <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7 , marginLeft: 10}}>You do not participate in the QSO but help other hams Logging their QSOs! They will be notified! </Text>
                      </View>
                      </TouchableOpacity>
                      : null }
                

                  { (this.props.qsotype==='QSO') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('POST') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                      <Image source={require('../../images/postAzul1.png')} style={{width: 50, height: 50, flex: 0.3} } 
                      resizeMode="contain" />
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>Log anything you want to share :)
                      </Text>
                    </View>  
                   </TouchableOpacity> 
                    : null }
                  
                  { (this.props.qsotype==='LISTEN') ? 
                      <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('QSO') }> 
                      <View style={{flexDirection: 'row', flex:1}}>
                          <Image source={require('../../images/qsoAzul1.png')} style={{width: 50, height: 50, flex: 0.3}} 
                          resizeMode="contain" />
                          <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7 , marginLeft: 10}}>You participate in the QSO</Text>
                      </View>
                      </TouchableOpacity>
                      : null }
                

                  { (this.props.qsotype==='LISTEN') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('POST') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                      <Image source={require('../../images/postAzul1.png')} style={{width: 50, height: 50, flex: 0.3} } 
                      resizeMode="contain" />
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>Log anything you want to share :)</Text>
                    </View>  
                   </TouchableOpacity> 
                    : null }

                      { (this.props.qsotype==='POST') ? 
                      <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('QSO') }> 
                      <View style={{flexDirection: 'row', flex:1}}>
                          <Image source={require('../../images/qsoAzul1.png')} style={{width: 50, height: 50, flex: 0.3}} 
                          resizeMode="contain" />
                          <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>You participate in the QSO</Text>
                      </View>
                      </TouchableOpacity>
                      : null }
                

                  { (this.props.qsotype==='POST') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('LISTEN') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                      <Image source={require('../../images/listenAzul1.png')} style={{width: 50, height: 50, flex: 0.3} } 
                      resizeMode="contain" />
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>You do not participate in the QSO but help other hams Logging their QSOs! They will be notified! </Text>
                
                    </View>  
                   </TouchableOpacity> 
                    : null }
    
                   </View>


                   <TouchableOpacity onPress={() => this.closeQsoTypeModal()} style={{ paddingTop: 4, paddingBottom: 4}}>
                      <Text style={{ color: '#999', fontSize: 18, textAlign: 'right'}}>Cancel</Text>
                      </TouchableOpacity>
                   
                  
                    </View>

               
               </Modal>
  

            
            </View>
       
        )} 

 }

 const styles = StyleSheet.create({
   content: {
    marginTop: 30,
    marginLeft: 10,
    flexDirection: 'row'
   

    

    }
});

QsoType.propTypes = {
   
  };


 const mapStateToProps = state => {
    return { qsotype: state.sqso.currentQso.qsotype, 
             band: state.sqso.currentQso.band,
             mode: state.sqso.currentQso.mode,
             rst: state.sqso.currentQso.rst,
             qra: state.sqso.qra, 
             qsoqras: state.sqso.currentQso.qsoqras,
             sqlrdsid: state.sqso.currentQso.sqlrdsId,
             jwtToken: state.sqso.jwtToken
           
    };
};


const mapDispatchToProps = {
  cambioqsotype,
  postQsoEdit,
  resetQso
   
   }

export default connect(mapStateToProps, mapDispatchToProps)(QsoType);