import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';
import firebase from "react-native-firebase";
import {
   
    manageLocationPermissions
    
  } from "../../actions";
  import VariosModales from "./VariosModales";


class AdVideoReward extends Component {


  constructor(props) {
    super(props);
    this.usergotreward = false;
    
    this.state = {
        waitingModal: false,
        prevideorewarded: false
    };
  }

  componentDidMount() {
    
  
        console.log("paso por intersitial AdSVideoRward Component con test en IOS");
    
        if (Platform.OS === "ios") {
            this.advertVideoReward = firebase
              .admob()
            //  .rewarded("ca-app-pub-7016811987787025/5828178381"); // este es verdadero
              .rewarded("ca-app-pub-3940256099942544/1712485313"); // test ios

          } else {
            this.advertVideoReward = firebase
              .admob()
             // .rewarded("ca-app-pub-7016811987787025/1688132132"); // este es verdadero
              .rewarded("ca-app-pub-3940256099942544/5224354917"); // test para android
          }
      
          // const advert = firebase.admob().rewarded('ca-app-pub-3940256099942544/5224354917');
          try {
            this.setState({ waitingModal: true });
            const AdRequest = firebase.admob.AdRequest;
            const request = new AdRequest();
            request.addKeyword("foo").addKeyword("bar");
      
            // Load the advert with our AdRequest
            this.advertVideoReward.loadAd(request.build());

           // le doy 5 segundos maximo para q cargue el AD, si pasan esos 5 seg es porque no encontro aun ad
          // entonces le doy el beneficio porque no es cupa suya
          
          // setTimeout(() => {
            //   if (this.advertVideoReward.isLoaded()) {
            //    // advert.show();
            //   } else {
            //     // Unable to show interstitial - not loaded yet.
            //       console.log('no pudo cargar el AD de Video');
            //       if (this.props.closead==='newqso')
            //       this.props.newqso();
            //       if (this.props.closead==='sendmedia')
            //       this.props.subos3();
            //       if (this.props.closead==='scanqr')
            //       this.props.showscanresults('qslScan');

                  
            //   }
            // }, 5000);


      
            this.advertVideoReward.on("onAdLoaded", () => {
              console.log("Advert video rewarded is ready to show.");
              this.videorewardLoaded = true;
            //  alert("video reward loaded!");
             //     this.advertVideoReward.show();
           //       this.setState({ waitingModal: false, prevideorewarded: true });

            });
      
            this.advertVideoReward.on("onRewarded", event => {
              console.log(
                "The user watched the entire video and will now be rewarded!",
                event
              );
              this.videorewardLoaded = false;
              this.usergotreward = true;
        //       if (this.closeAd==='newqso')
        //          this.newqso_after_ad();
        //   if (this.closeAd==='sendmedia')
        //          this.subo_s3();
                 if (this.props.closead==='newqso')
                 this.props.newqso();
                 if (this.props.closead==='sendmedia')
                 this.props.subos3();
                 if (this.props.closead==='scanqr')
              //   this.props.showscanresults('qslScan');
                 this.props.showscanresults();
                


            //     this.setState({ waitingModal: false, prevideorewarded:false });
             
      
          //    this.newqso_after_ad();
              // this.loadVideoReward();
            //  this.loadVideoReward();
            });
      
            this.advertVideoReward.on("onAdClosed", event => {
              console.log("Se cerro el AD: ", event);
              this.videorewardLoaded = false;
             
              if (this.props.closead==='linkqso' && this.usergotreward)
                 {
                 
                   this.props.linkqso();
                 }
                 else
                  this.props.notrewared();
           //   this.loadVideoReward();
              // if (!this.usergotreward)
              //      this.setState({notvideorewarded: true})
            });
      
            this.advertVideoReward.on("onAdOpened", event => {
              console.log("se muestra el AD: ", event);
              this.videorewardLoaded = false;
              this.props.manageLocationPermissions("adshowed", true);
              this.usergotreward = false;
              // this.loadVideoReward();
              // this.loadVideoReward();
            });
      
            this.advertVideoReward.on("onAdLeftApplication", event => {
              console.log("se va de la APP porque hizo click?: ", event);
              this.videorewardLoaded = false;
             // this.newqso_after_ad();
              // this.loadVideoReward();
            });
          } catch (err) {
            alert("video reward failed to load: " + err);
          }
        
     }

     closeVariosModales = (param) => {
        this.setState({ waitingModal: false, prevideorewarded:false });
    
        if (param==='yes')
        setTimeout(() => {
                
          console.log('FFF muestro video con delay de 50');
          this.advertVideoReward.show();
          
         }
        , 50);

        if (param==='no')
            
           this.props.notrewared();
     
              console.log("no quiere ver video Reward:" + param);
        
      };

      closeWaitingModal = () =>{

      
        this.setState({ waitingModal: false});
        if (this.videorewardLoaded){
         
          // Este tiemout se utiliza porque iOS necesita unos milisegundos que se baje 
          // el Modal anterior para poder abrir el nuevo, en este caso el anterior es waitingModal
          // Android no tiene problemas con esto.
          setTimeout(() => {
                  
              console.log('prevideoreward en true con delay de 50');
              this.setState({ prevideorewarded: true });
              
            }
            , 50);
        }
                   
        else {
          // Unable to show interstitial - not loaded yet.
         // es porque no encontro aun ad
          // entonces le doy el beneficio porque no es culpa suya
            console.log('no pudo cargar el AD de Inter');
            if (this.props.closead==='newqso')
            this.props.newqso();
            if (this.props.closead==='sendmedia')
            this.props.subos3();
            if (this.props.closead==='scanqr')
            this.props.showscanresults('qslScan');
            if (this.props.closead==='linkqso')
            this.props.linkqso();
      
            
        }
      }

render() { console.log("RENDER adInter SCREEN!" );
    

return <View>
 {(this.state.waitingModal) && 
<VariosModales
            show={this.state.waitingModal}
            modalType="waitingAdmodal"
            closewaitingmodal={this.closeWaitingModal.bind()}
         //   message="Free User: Speed up your user expierence without Ads, you could be Premium user any time!"
           
          /> 
  } 
{  (this.state.prevideorewarded) && 
  <VariosModales
            show={this.state.prevideorewarded}
            modalType="prevideorewarded"
            sender={this.props.closead}
            closeInternetModal={this.closeVariosModales.bind() }
          /> 
 }

</View>; 
} 

}


 const mapStateToProps = state => {
    return {  

        
     };
};


const mapDispatchToProps = {
    
    manageLocationPermissions
   }

export default connect(mapStateToProps, mapDispatchToProps)(AdVideoReward);