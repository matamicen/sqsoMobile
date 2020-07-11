import React, { Component } from 'react';
import { Text, Image, View, Button, ActivityIndicator, StyleSheet, TouchableOpacity, Modal, 
  TouchableHighlight  } from 'react-native';
import { connect } from 'react-redux';
import { cambioqsotype, postQsoEdit, resetQso } from '../../actions';
import { hasAPIConnection } from '../../helper';
import VariosModales from './VariosModales';
import I18n from '../../utils/i18n';



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
          this.typetochange = typetochange;

                if (typetochange==='POST')
               this.typetochange = I18n.t("QsoTypePOST");
                if (typetochange==='QAP')
               this.typetochange = I18n.t("QsoTypeQAP");         
                if (typetochange==='FLDDAY')
               this.typetochange = I18n.t("QsoTypeFLDDAY");        
               if (typetochange==='LISTEN')
               this.typetochange = I18n.t("QsoTypeLISTEN");               
               

        if(typetochange==='LISTEN'){
         if (this.props.qsotype==='POST' || this.props.qsotype==='QAP' || this.props.qsotype==='FLDDAY')
           if (this.props.mediafiles.length>1) 
              this.puedecambiar = false; 
              else {
                await this.props.resetQso('LISTEN');
                // this.props.cambioqsotype('LISTEN'); no haria falta por lo inicia resetQSO
            }
         else
           this.props.cambioqsotype('LISTEN');
         
        }
        if(typetochange==='QSO'){
          if (this.props.qsotype==='POST' || this.props.qsotype==='QAP' || this.props.qsotype==='FLDDAY')
            if (this.props.mediafiles.length>1) 
             this.puedecambiar = false; 
             else {
             await this.props.resetQso('QSO');  
            //  this.props.cambioqsotype('QSO'); no haria falta por lo inicia resetQSO
            }
        else
          this.props.cambioqsotype('QSO');
        
       }
        if(typetochange==='POST' || typetochange==='QAP' || typetochange==='FLDDAY'){
          yacambio = false;

          if (this.props.qsotype==='POST' || this.props.qsotype==='QAP' || this.props.qsotype==='FLDDAY')
             {
               this.props.cambioqsotype(typetochange);
               yacambio = true;
             }
         

         // si quiere cambiar a ANY y ya hay alguna media creda no le deja cambiar
         // se pone mayor a 1 porque hay siempre una media creada en blanco por el tema
         // de poder tocar el boton en la pantalla y se baje el teclado
         // uso timeout para darle tiempoa cerrar este modal actual y abrir el del 
         // mensaje de que no puede cambiar
        
         if (yacambio===false)
         {

              if(this.props.mediafiles.length>1)
                  this.puedecambiar = false; 
            else
              {
              // await this.props.resetQso('POST');
              await this.props.resetQso(typetochange);
              // this.props.cambioqsotype('POST'); no haria falta por lo inicia resetQSO
              }
         }
         
        }

        if (this.props.sqlrdsid!=='' && this.puedecambiar) {

          if (typetochange==='POST' || typetochange==='QAP' || typetochange==='FLDDAY')
          {
            bandAux = '';
            modeAux = '';
            rstAux = '';
            dbAux = '';
          }
          else
          {
            bandAux = this.props.band;
            modeAux = this.props.mode;
            rstAux = this.props.rst;
            dbAux = this.props.db;

          }

          qsoHeader = { "mode" : modeAux,
                        "band" : bandAux,
                        "rst" : rstAux,
                        "type" : typetochange,
                        "sqlrdsid" : this.props.sqlrdsid,
                        "qra": this.props.qra,
                        "db" : dbAux
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
                 <Image source={require('../../images/qso12.png')} style={{width: 50, height: 50} } 
                 resizeMode="contain" /> 

              </TouchableOpacity> 
                

               :  (this.props.qsotype==='LISTEN') ? 
               <TouchableOpacity  style={{}}  onPress={ () => this.openQsoTypeModal() }> 
           
                          {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/escucha10.png')} style={{width: 50, height: 50}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/swl12.png')} style={{width: 50, height: 50}} 
                            resizeMode="contain" />
                          }
                 </TouchableOpacity>
                  :

                (this.props.qsotype==='POST') ? 
                 <TouchableOpacity  style={{}}  onPress={ () => this.openQsoTypeModal() }> 
               
                           {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/otro12.png')} style={{width: 50, height: 50}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/other12.png')} style={{width: 50, height: 50}} 
                            resizeMode="contain" />
                          }
                 </TouchableOpacity> 
                    :

                    (this.props.qsotype==='FLDDAY') ? 
                     <TouchableOpacity  style={{}}  onPress={ () => this.openQsoTypeModal() }> 
               
                             {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/activacion12.png')} style={{width: 50, height: 50}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/fieldday12.png')} style={{width: 50, height: 50}} 
                            resizeMode="contain" />
                          }
                     </TouchableOpacity> 
                    :

                    (this.props.qsotype==='QAP') ? 
                     <TouchableOpacity  style={{}}  onPress={ () => this.openQsoTypeModal() }> 
                       <Image source={require('../../images/qap12.png')} style={{width: 50, height: 50} } 
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
                          
                  <Text style={{ color: 'black', fontSize: 20, padding: 5 }}>{I18n.t("QsoTypeSelect")}</Text>
                  {/* color: '#4F4F4F' */}

                  <View style={{ justifyContent: 'space-around', 
                      flex: 1, flexDirection: 'column' }}>
                   
                   { (this.props.qsotype==='QSO') ? 
                      <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('LISTEN') }> 
                      <View style={{flexDirection: 'row', flex:1}}>
                          {/* <Image source={require('../../images/swl.png')} style={{width: 50, height: 50, flex: 0.3}}  */}
                          {/* resizeMode="contain" /> */}
                            {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/escucha9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/swl9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }

                          <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7 , marginLeft: 10}}>{I18n.t("QsoTypeSWLdesc")} </Text>
                      </View>
                      </TouchableOpacity>
                      : null }
                

              { (this.props.qsotype==='QSO') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('FLDDAY') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                      {/* <Image source={require('../../images/any.png')} style={{width: 50, height: 50, flex: 0.3} } 
                      resizeMode="contain" /> */}
                            {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/activacion8.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/fieldday8.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeANYdescFieldDay")}
                      </Text>
                    </View>  
                   </TouchableOpacity> 
                    : null }



              { (this.props.qsotype==='QSO') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('QAP') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                      <Image source={require('../../images/qap9.png')} style={{width: 50, height: 50, flex: 0.3} } 
                      resizeMode="contain" />
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeANYdescQAP")}
                      </Text>
                    </View>  
                   </TouchableOpacity> 
                    : null }

              { (this.props.qsotype==='QSO') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('POST') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                      {/* <Image source={require('../../images/any.png')} style={{width: 50, height: 50, flex: 0.3} } 
                      resizeMode="contain" /> */}
                             {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/otro9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/other9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeANYdescOther")}
                      </Text>
                    </View>  
                   </TouchableOpacity> 
                    : null }
                    
                  
                  { (this.props.qsotype==='LISTEN') ? 
                      <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('QSO') }> 
                      <View style={{flexDirection: 'row', flex:1}}>
                          <Image source={require('../../images/qso9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                          resizeMode="contain" />
                          <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7 , marginLeft: 10}}>{I18n.t("QsoTypeQSOdesc")}</Text>
                      </View>
                      </TouchableOpacity>
                      : null }

              { (this.props.qsotype==='LISTEN') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('FLDDAY') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                   {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/activacion8.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/fieldday8.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeANYdescFieldDay")}</Text>
                    </View>  
                   </TouchableOpacity> 
                    : null }                      


              { (this.props.qsotype==='LISTEN') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('QAP') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                      <Image source={require('../../images/qap9.png')} style={{width: 50, height: 50, flex: 0.3} } 
                      resizeMode="contain" />
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeANYdescQAP")}</Text>
                    </View>  
                   </TouchableOpacity> 
                    : null }                

                  { (this.props.qsotype==='LISTEN') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('POST') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                       {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/otro9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/other9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeANYdescOther")}</Text>
                    </View>  
                   </TouchableOpacity> 
                    : null }




                      { (this.props.qsotype==='POST') ? 
                      <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('QSO') }> 
                      <View style={{flexDirection: 'row', flex:1}}>
                          <Image source={require('../../images/qso9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                          resizeMode="contain" />
                          <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeQSOdesc")}</Text>
                      </View>
                      </TouchableOpacity>
                      : null }
                

                  { (this.props.qsotype==='POST') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('LISTEN') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                      {/* <Image source={require('../../images/swl.png')} style={{width: 50, height: 50, flex: 0.3} } 
                      resizeMode="contain" /> */}
                            {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/escucha9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/swl9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeSWLdesc")} </Text>
                
                    </View>  
                   </TouchableOpacity> 
                    : null }

              { (this.props.qsotype==='POST') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('FLDDAY') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                   {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/activacion8.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/fieldday8.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeANYdescFieldDay")} </Text>
                
                    </View>  
                   </TouchableOpacity> 
                    : null } 

                   { (this.props.qsotype==='POST') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('QAP') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                      <Image source={require('../../images/qap9.png')} style={{width: 50, height: 50, flex: 0.3} } 
                      resizeMode="contain" />
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeANYdescQAP")} </Text>
                
                    </View>  
                   </TouchableOpacity> 
                    : null }       


              { (this.props.qsotype==='FLDDAY') ? 
                      <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('QSO') }> 
                      <View style={{flexDirection: 'row', flex:1}}>
                          <Image source={require('../../images/qso9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                          resizeMode="contain" />
                          <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeQSOdesc")}</Text>
                      </View>
                      </TouchableOpacity>
                      : null }
                

                  { (this.props.qsotype==='FLDDAY') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('LISTEN') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                   {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/escucha9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/swl9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeSWLdesc")} </Text>
                
                    </View>  
                   </TouchableOpacity> 
                    : null }


                   { (this.props.qsotype==='FLDDAY') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('QAP') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                      <Image source={require('../../images/qap9.png')} style={{width: 50, height: 50, flex: 0.3} } 
                      resizeMode="contain" />
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeANYdescQAP")} </Text>
                
                    </View>  
                   </TouchableOpacity> 
                    : null }   

                { (this.props.qsotype==='FLDDAY') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('POST') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                   {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/otro9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/other9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeANYdescOther")} </Text>
                
                    </View>  
                   </TouchableOpacity> 
                    : null } 


            { (this.props.qsotype==='QAP') ? 
                      <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('QSO') }> 
                      <View style={{flexDirection: 'row', flex:1}}>
                          <Image source={require('../../images/qso9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                          resizeMode="contain" />
                          <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeQSOdesc")}</Text>
                      </View>
                      </TouchableOpacity>
                      : null }
                

                  { (this.props.qsotype==='QAP') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('LISTEN') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                   {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/escucha9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/swl9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeSWLdesc")} </Text>
                
                    </View>  
                   </TouchableOpacity> 
                    : null }


                   { (this.props.qsotype==='QAP') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('FLDDAY') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                   {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/activacion8.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/fieldday8.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeANYdescFieldDay")} </Text>
                
                    </View>  
                   </TouchableOpacity> 
                    : null }   

                { (this.props.qsotype==='QAP') ? 
                   <TouchableOpacity  style={{marginLeft:1, padding: 5 }}  onPress={ () => this.changeQsoType('POST') }> 
                   <View style={{flexDirection: 'row', flex:1}}>
                   {(I18n.locale.substring(0, 2)==='es') &&
                            <Image source={require('../../images/otro9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                           {(I18n.locale.substring(0, 2)==='en') &&
                            <Image source={require('../../images/other9.png')} style={{width: 50, height: 50, flex: 0.3}} 
                            resizeMode="contain" />
                          }
                      <Text style={{ color: '#4F4F4F', fontSize: 16, flex: 0.7, marginLeft: 10 }}>{I18n.t("QsoTypeANYdescOther")} </Text>
                
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
                          // backgroundColor: '#f5f5f5',
                          backgroundColor: 'grey',
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
                      
                 
                  
                      <Text style={{ color: 'black', fontSize: 16, padding: 5 }}>{I18n.t("QsoTypecannotchange1")} {this.typetochange}, {I18n.t("QsoTypecannotchange2")} {this.typetochange}. {"\n"}{I18n.t("QsoTypecannotchange3")}</Text> 
                     
                  <TouchableOpacity   onPress={() => this.togglenopuedecambiarModal()} style={{ paddingTop: 4, paddingBottom: 4, alignItems: 'center'}}>
                      <Text style={{ color: 'black', fontSize: 16}}>{I18n.t("QsoTypeclose")}</Text>
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
             db: state.sqso.currentQso.db,
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