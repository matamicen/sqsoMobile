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
          nopuedecambiar: false,
          nointernet: false
        }
        this.puedecambiar = true;
        this.typetochange = '';
      }

  

   componentDidMount() {
    
      //  this.props.fetchPeople();
     
       }

       changeQsoType = async (typetochange) => {

        if (await hasAPIConnection())
        {
           if (typetochange==='POST')
               this.typetochange = 'ANY';
              else
              this.typetochange = typetochange;

        if(typetochange==='LISTEN'){
         if (this.props.qsotype==='POST')
           if (this.props.mediafiles.length>1) 
              this.puedecambiar = false; 
              else {
                await this.props.resetQso();
                this.props.cambioqsotype('LISTEN');
            }
         else
           this.props.cambioqsotype('LISTEN');
         
        }
        if(typetochange==='QSO'){
          if (this.props.qsotype==='POST')
            if (this.props.mediafiles.length>1) 
             this.puedecambiar = false; 
             else {
             await this.props.resetQso();  
             this.props.cambioqsotype('QSO');
            }
        else
          this.props.cambioqsotype('QSO');
        
       }
        if(typetochange==='POST'){

         // si quiere cambiar a ANY y ya hay alguna media creda no le deja cambiar
         // se pone mayor a 1 porque hay siempre una media creada en blanco por el tema
         // de poder tocar el boton en la pantalla y se baje el teclado
         // uso timeout para darle tiempoa cerrar este modal actual y abrir el del 
         // mensaje de que no puede cambiar
        
           if(this.props.mediafiles.length>1)
               this.puedecambiar = false; 
        else
          {
          await this.props.resetQso();
          this.props.cambioqsotype('POST');
          }
         
        }

        if (this.props.sqlrdsid!=='' && this.puedecambiar) {

          qsoHeader = { "mode" : this.props.mode,
                        "band" : this.props.band,
                        "rst" : this.props.rst,
                        "type" : typetochange,
                        "sqlrdsid" : this.props.sqlrdsid,
                        "qra": this.props.qra
                    }
          console.log("antes de enviar a API qdoHeader:"+ JSON.stringify(qsoHeader))
           this.props.postQsoEdit(qsoHeader,'type',this.props.jwtToken);   
        }

        this.closeQsoTypeModal();
        setTimeout(() => {
                  
          if (!this.puedecambiar) this.togglenopuedecambiarModal();
          this.puedecambiar = true; // vuelvo a poner el flag en true
          
        }
        , 100);
       
    
      }
        else this.setState({nointernet: true});
      
      }

      openQsoTypeModal = async () => {
        //this.props.cambioqsotype();
        // console.log('mediafiles: '+ this.props.mediafiles.length)
        if (await hasAPIConnection())
            this.setState({changeqsoModal: true});
          else 
             this.setState({nointernet: true}); 
        }

      closeQsoTypeModal = () => {
        this.setState({changeqsoModal: false})

      }

        togglenopuedecambiarModal = () => {
          // this.setState({nopuedecambiar: false})
          this.setState({nopuedecambiar: !this.state.nopuedecambiar})
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
                 <Image source={require('../../images/any.png')} style={{width: 50, height: 50} } 
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
                          
                  <Text style={{ color: '#4F4F4F', fontSize: 20, padding: 5 }}>Select the Post Type</Text>
                  

                  <View style={{ justifyContent: 'space-around', 
                      flex: 1, flexDirection: 'column' }}>
                   
                   { (this.props.qsotype==='QSO') ? 
                      <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('LISTEN') }> 
                      <View style={{flexDirection: 'row', flex:1}}>
                          <Image source={require('../../images/listenAzul1.png')} style={{width: 50, height: 50, flex: 0.3}} 
                          resizeMode="contain" />
                          <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7 , marginLeft: 10}}>Post other hams QSO that you are listening, they will be notified! </Text>
                      </View>
                      </TouchableOpacity>
                      : null }
                

                  { (this.props.qsotype==='QSO') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('POST') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                      <Image source={require('../../images/any.png')} style={{width: 50, height: 50, flex: 0.3} } 
                      resizeMode="contain" />
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>Post anything you want to share :)
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
                      <Image source={require('../../images/any.png')} style={{width: 50, height: 50, flex: 0.3} } 
                      resizeMode="contain" />
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>Post anything you want to share :)</Text>
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
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>Post other hams QSO that you are listening, they will be notified! </Text>
                
                    </View>  
                   </TouchableOpacity> 
                    : null }
    
                   </View>


                   <TouchableOpacity onPress={() => this.closeQsoTypeModal()} style={{ paddingTop: 4, paddingBottom: 4}}>
                      <Text style={{ color: '#999', fontSize: 18, textAlign: 'right'}}>Cancel</Text>
                      </TouchableOpacity>
                   
                  
                    </View>

               
               </Modal>
  
       {/* Modal que avisa que no puede cambiar a ANY si tiene media creada */}
               <Modal visible ={this.state.nopuedecambiar}  transparent={true} onRequestClose={() => console.log('Close was requested')}>
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
                      
                 
                  
                      <Text style={{ color: '#4F4F4F', fontSize: 16, padding: 5 }}>You have media created, so you can't change to {this.typetochange}, you must End this Post and Start a new Post to select {this.typetochange}. {"\n"}</Text> 
                     
                  <TouchableOpacity   onPress={() => this.togglenopuedecambiarModal()} style={{ paddingTop: 4, paddingBottom: 4, alignItems: 'center'}}>
                      <Text style={{ color: '#999', fontSize: 16}}>Close</Text>
                    </TouchableOpacity >
                  {/* <View style={{ justifyContent: 'space-around', 
                      flex: 1, flexDirection: 'column' }}>
                                       </View> */}

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
             mediafiles: state.sqso.currentQso.mediafiles,
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