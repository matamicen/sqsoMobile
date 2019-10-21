import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';
import firebase from "react-native-firebase";
import {
   
    manageLocationPermissions,
    confirmedPurchaseFlag
    
  } from "../../actions";
  import VariosModales from "./VariosModales";
  import Iap from './Iap';


class AdInter extends Component {


  constructor(props) {
    super(props);
    
    this.state = {
       waitingModal: false,
       iapModal: false
      
    };
  }

  componentDidMount() {
    
  
        console.log("paso por intersitial AdInter Component con TEST en IOS");
    
        //  const advert = firebase.admob().interstitial('ca-app-pub-7987914246691031/5729668166');
        // const advert = firebase.admob().interstitial('ca-app-pub-3940256099942544/4411468910');
        if (Platform.OS === "ios") {
          this.advertInter = firebase
            .admob()
       //     .interstitial("ca-app-pub-7016811987787025/4660891787"); // este es verdadero
            .interstitial("ca-app-pub-3940256099942544/4411468910"); // este es de TEST

         
        } else {
          this.advertInter = firebase
            .admob()
        //    .interstitial("ca-app-pub-7016811987787025/7562044412"); // este es verdadero
            .interstitial("ca-app-pub-3940256099942544/1033173712"); //test para android
        }
    
        try {
       //   this.setState({ waitingModal: true });
       this.props.confirmedPurchaseFlag(false);
       setTimeout(() => {
         // le da tiempo a que purschaseflag en REDUX sea FALSE 
         // porque si estaba en TRUE porque se habia ejecutado con anterioridad el listener del purchase
         // y se abre rapido el modal del IAP se puede cerrar.
        this.setState({ iapModal: true });    
       }
       , 50);
       

          const AdRequest = firebase.admob.AdRequest;
          const request = new AdRequest();
          request.addKeyword("foo").addKeyword("bar");
    
          // Load the advert with our AdRequest
          this.advertInter.loadAd(request.build());

          // le doy 5 segundos maximo para q cargue el AD, si pasan esos 5 seg es porque no encontro aun ad
          // entonces le doy el beneficio porque no es cupa suya
          // setTimeout(() => {
          //   if (this.advertInter.isLoaded()) {
          //    // advert.show();
          //   } else {
          //     // Unable to show interstitial - not loaded yet.
          //       console.log('no pudo cargar el AD de Inter');
          //       if (this.props.closead==='newqso')
          //       this.props.newqso();
          //       if (this.props.closead==='sendmedia')
          //       this.props.subos3();
          //       if (this.props.closead==='scanqr')
          //       this.props.showscanresults('qslScan');
          //       if (this.props.closead==='linkqso')
          //       this.props.linkqso();

                
          //   }
          // }, 5000);
    
          this.advertInter.on("onAdLoaded", () => {
            console.log("JJJ Advert intersitial is ready to show.");
            //   this.advertInter.show();
        //    this.setState({ waitingModal: false });
            console.log('primero bajo el waitingModal');
            
            this.intersitialLoaded = true;
        //    alert("intersitial loaded!");
        
        // setTimeout(() => {
            
        //     console.log('JJJ muestro inter con delay de 50');
        //     this.advertInter.show();
            
        //   }
        //   , 50);
           
           
          });
    
          this.advertInter.on("onAdClosed", event => {
            console.log("Se cerro el AD: ", event);
            this.intersitialLoaded = false;
         //   this.props.newqso();
              if (this.props.closead==='newqso')
                  this.props.newqso();
              if (this.props.closead==='sendmedia')
                  this.props.subos3();
              if (this.props.closead==='scanqr')
                  this.props.showscanresults('qslScan');
              if (this.props.closead==='linkqso')
                 this.props.linkqso();


              
            //   //  vuelvo a cargar la publicidad por si luego envia otro media o hace otro qsoNew
            //       this.loadInter();
          });
    
          this.advertInter.on("onAdOpened", event => {
            console.log("se muestra el AD: ", event);
            this.intersitialLoaded = false;
           this.props.manageLocationPermissions("adshowed", true);
    
            //    this.loadInter();
          });
    
          this.advertInter.on("onAdLeftApplication", event => {
            console.log("se va de la APP porque hizo click?: ", event);
            this.intersitialLoaded = false;
          //  this.newqso_after_ad();
           
            // if (this.closeAd==='newqso')
            // this.newqso_after_ad();
        // if (this.closeAd==='sendmedia')
        //     this.subo_s3();
        
        //  vuelvo a cargar la publicidad por si luego envia otro media o hace otro qsoNew
         //   this.loadInter();
    
    
            //  this.loadInter();
          });
        } catch (err) {
          alert("intersitial loaded failed: " + err);
        }
    


     }

// closeWaitingModal = () =>{

//   this.setState({waitingModal: false});
//   if (this.intersitialLoaded)
//       setTimeout(() => {

//        // Este tiemout se utiliza porque iOS necesita unos milisegundos que se baje 
//       // el Modal anterior para poder abrir el nuevo, en este caso el anterior es waitingModal
//         // Android no tiene problemas con esto.
                
//         console.log('muestro inter con delay de 50');
//         this.advertInter.show();
        
//       }
//       , 50);
  
//   else {
//     // Unable to show interstitial - not loaded yet.
//    // es porque no encontro aun ad
//     // entonces le doy el beneficio porque no es culpa suya
//       console.log('no pudo cargar el AD de Inter');
//       if (this.props.closead==='newqso')
//       this.props.newqso();
//       if (this.props.closead==='sendmedia')
//       this.props.subos3();
//       if (this.props.closead==='scanqr')
//       this.props.showscanresults('qslScan');
//       if (this.props.closead==='linkqso')
//       this.props.linkqso();

      
//   }
// }

// openIap = () =>{
 
//   this.props.confirmedPurchaseFlag(false);
//   this.setState({waitingModal: false});

//   setTimeout(() => {

//     // Este tiemout se utiliza porque iOS necesita unos milisegundos que se baje 
//    // el Modal anterior para poder abrir el nuevo, en este caso el anterior es waitingModal
//      // Android no tiene problemas con esto.
             
//      this.setState({ iapModal: true});
     
//    }
//    , 50);

// }

closeIapModal = () =>{

  this.setState({iapModal: false});
  

  // chequea si cerro el IAP porque compro o porque no compro
  if (this.props.confirmedpurchaseflag)
  { // Quiere decir que compro entonces envia el media directo 
      if (this.props.closead==='newqso')
      this.props.newqso();
      if (this.props.closead==='sendmedia')
      this.props.subos3();
      if (this.props.closead==='scanqr')
      this.props.showscanresults('qslScan');
      if (this.props.closead==='linkqso')
      this.props.linkqso();

      this.props.confirmedPurchaseFlag(false);


  }else
  if (this.intersitialLoaded)
      setTimeout(() => {

       // Este tiemout se utiliza porque iOS necesita unos milisegundos que se baje 
      // el Modal anterior para poder abrir el nuevo, en este caso el anterior es waitingModal
        // Android no tiene problemas con esto.
                
        console.log('muestro inter con delay de 50');
        this.advertInter.show();
        
      }
      , 50);
  // setTimeout(() => {

  //   // no compro entonces abre el WaitingModl de nuevo para que vea el AD
  //   // Este tiemout se utiliza porque iOS necesita unos milisegundos que se baje 
  //  // el Modal anterior para poder abrir el nuevo, en este caso el anterior es waitingModal
  //    // Android no tiene problemas con esto.
             
  //    this.setState({ waitingModal: true});
     
  //  }
  //  , 50);

}
     
render() { console.log("RENDER adInter SCREEN!" );
    

return <View>
{/*   
{(this.state.waitingModal) && 
<VariosModales
            show={this.state.waitingModal}
            modalType="waitingAdmodal"
            closewaitingmodal={this.closeWaitingModal.bind()}
            openiap={this.openIap.bind()}
          //  message="Free User: Speed up your user expierence without Ads, you could be Premium user any time!"
           
          /> 
} */}
{(this.state.iapModal) && 
  <Iap  closeiapmodal={this.closeIapModal.bind()} />
  // <VariosModales
  //             show={this.state.iapModal}
  //             modalType="iapModal"
  //             closeiapmodal={this.closeIapModal.bind()}
  //           //  message="Free User: Speed up your user expierence without Ads, you could be Premium user any time!"
             
  //           /> 

  }

</View>; 
} 

}


 const mapStateToProps = state => {
    return {  
      confirmedpurchaseflag: state.sqso.confirmedPurchaseFlag

        
     };
};


const mapDispatchToProps = {
    
    manageLocationPermissions,
    confirmedPurchaseFlag
   }

export default connect(mapStateToProps, mapDispatchToProps)(AdInter);