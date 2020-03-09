import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
// import NativeButton from 'apsl-react-native-button';
import RNIap, {
  Product,
  ProductPurchase,
  acknowledgePurchaseAndroid,
  purchaseUpdatedListener,
  purchaseErrorListener,
  PurchaseError,
} from 'react-native-iap';
import { connect } from 'react-redux';
import { confirmReceiptiOS, manageLocationPermissions, restoreCall, confirmReceiptAndroid } from '../../actions';
import crashlytics from '@react-native-firebase/crashlytics';

// App Bundle > com.dooboolab.test

const itemSkus = Platform.select({
  ios: [
    'com.cooni.point1000', 'com.cooni.point5000', // dooboolab
  ],
  android: [
    'android.test.purchased', 'android.test.canceled', 'android.test.refunded', 'android.test.item_unavailable',
    // 'point_1000', '5000_point', // dooboolab
  ],
});

const itemSubs = Platform.select({
  ios: [
    'PremiumMonthly', // dooboolab
  ],
  android: [
    // 'test.sub1', // subscription
    '001'
  ],
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

class RestoreSubscription extends Component {
  constructor(props) {
    super(props);

  //  this.buystate = false;

    this.state = {
      productList: [],
      receipt: '',
      availableItemsMessage: '',
      localizedPrice: '',
      showOkBePremium: false   
    };

    
  }

  async componentDidMount() {
    try {
    //  this.props.pressPurchaseButton(true);
    
    
      const result = await RNIap.initConnection();
      // busco codigos de subscripcion para iOS sino me falla el GetSubscription
          
      // const products = await RNIap.getSubscriptions(itemSubs);
      // console.log('busco codigos de subscripciones');
    // console.log(products);
    // this.setState({localizedPrice: products[0].localizedPrice});


   // chequeo si el usuario ya es premium y toca Restore, si fuese asi evito llamar a todo 
   // el chequeo y le aviso que ya es premium. 
if (this.props.userinfo.account_type.idaccount_types===2)
     this.props.restoreCall(true,'Your premium subscription is active.')
  else
      {
        this.props.manageLocationPermissions("iapshowed",1);

        if (Platform.OS==='ios')
            this.getPurchaseHistory();
      if (Platform.OS==='android')
      {
       // this.getPurchaseHistory();
        this.getAvailablePurchase();
      }

  }




      // await RNIap.consumeAllItemsAndroid();
      // console.log('result', result);
    
     
      

    } catch (err) {
      console.warn(err.code, err.message);
      crashlytics().setUserId(this.props.qra);
      crashlytics().log('error: ' + err) ;
      if(__DEV__)
      crashlytics().recordError(new Error('RestoreSubcription1_DEV'));
      else
      crashlytics().recordError(new Error('RestoreSubcription1_PRD'));
    }

    
    // purchaseUpdateSubscription = purchaseUpdatedListener(async(purchase) => {

    //   // this.setState({tranid: purchase.transactionId});
    //   console.log('purchaseUpdatedListener');
    //   console.log(purchase);

    //   // aca tengo que llamar a la API backend para validar el receipt y una vez validado
    //   // debo llamar a 
      
    //   if (purchase.purchaseStateAndroid === 1 && !purchase.isAcknowledgedAndroid) {
    //     try {
    //      const ackResult = await acknowledgePurchaseAndroid(purchase.purchaseToken);
    //       console.log('ackResult', ackResult);
    //     } catch (ackErr) {
    //       console.warn('ackErr', ackErr);
    //     }
    //   }
    //   if (Platform.OS==='ios')
    //   {

        
    //     console.log('IAP: llamo confirmReceipt action: '+purchase.transactionId);
    //     this.props.confirmReceiptiOS(purchase.transactionId,this.buystate);
    //  //   this.props.confirmReceipt();
    //   //  RNIap.finishTransactionIOS(purchase.transactionId);

    //   }
   //   this.setState({ receipt: purchase.transactionReceipt }, () => this.goNext());
    // });

    // purchaseErrorSubscription = purchaseErrorListener((error) => {
    //   console.log('purchaseErrorListener', error);
    //   // Alert.alert('purchase error', JSON.stringify(error));
    // });
  }



 

  // goNext = () => {
  //   Alert.alert('Receipt', this.state.receipt);
  // }

//   getItems = async() => {
//     try {
//       const products = await RNIap.getProducts(itemSkus);
//       // const products = await RNIap.getSubscriptions(itemSkus);
//       console.log('Products', products);
//       this.setState({ productList: products });
//     } catch (err) {
//       console.warn(err.code, err.message);
//     }
//   }

  getSubscriptions = async() => {
    try {
      const products = await RNIap.getSubscriptions(itemSubs);
      console.log('Products', products);
      this.setState({ productList: products });
    } catch (err) {
      console.warn(err.code, err.message);
      crashlytics().setUserId(this.props.qra);
      crashlytics().log('error: ' + err) ;
      if(__DEV__)
       crashlytics().recordError(new Error('getSubscriptions_DEV'));
      else
      crashlytics().recordError(new Error('getSubscriptions_PRD'));
    }
  }

  getPurchaseHistory = async() => {
    try {
       
      console.info('Get available purchases (non-consumable or unconsumed consumable)');
       const purchases = await RNIap.getPurchaseHistory();
    

      const sortedAvailablePurchases = purchases.sort(
        (a, b) => b.transactionDate - a.transactionDate
      );
   //   const latestAvailableReceipt = sortedAvailablePurchases[0].transactionReceipt;
   //   console.info('Available purchases :: ', purchases);
    //  console.log('purchases:');

      console.log('SORTED purchase HISTORY:');
      sortedAvailablePurchases.map((purch2, j) => {
        console.log('productID:'+ purch2.productId);
        console.log('TransactionID:'+ purch2.transactionId);
        console.log('transactionDate:'+ purch2.transactionDate);
        console.log('originalTransactionDateIOS:'+ purch2.originalTransactionDateIOS);
        console.log('originalTransactionIdentifierIOS:'+ purch2.originalTransactionIdentifierIOS);
        });

    

      if (purchases && purchases.length > 0) {
        console.log('purchases completo PurchaseHistory:');
          console.log(purchases);
          console.log('hya compras y la ultima compra fue:');
          console.log(purchases[0].originalTransactionIdentifierIOS);
          console.log(purchases[0].transactionId);
          console.log(purchases[0].transactionReceipt);
          // le tengo que pasar el id original, usuario logueado y receipt
          // para que la API valide con ese ID si existe y no esta vencida la subscrripcion
          // y si el usuario coincide devuele ok y queda todo igual, pero si no coincide debe
          // poner al nuevo QRA como PREMIUM para ese id original de transaccion y al otro dejarlo sin nada.
          // puede pasar que no encuentre el id original en el backend porque nunca lo dio de alta cuando 
          // se compro por error de backend o conexion al momento de enviar el receipt, en ese caso
          // debera llamar a la API validadno el RECIPT recibido y seguie el mismo precediemitno de validacion
          // si encuentra para ese receipt/original id un EXPIRE DATE que no haya vencido entonces darlos de alta
          // y cambiarlo como PREMIUM al usuario.

        
          
          if (Platform.OS==='ios') 
            this.props.confirmReceiptiOS(this.props.qra,purchases[0].originalTransactionIdentifierIOS,purchases[0].transactionReceipt,purchases[0].transactionId,this.props.env,'RESTORE');



        // this.setState({
        //   availableItemsMessage: `Got ${purchases.length} items.`,
        //   receipt: purchases[0].transactionReceipt,
        // });
      }
      else
         console.log('no hay PurchaseHistory');
    } catch (err) {
      console.warn(err.code, err.message);
      crashlytics().setUserId(this.props.qra);
      crashlytics().log('error: ' + err) ;
      if(__DEV__)
      crashlytics().recordError(new Error('getPurchaseHistory_DEV'));
      else
      crashlytics().recordError(new Error('getPurchaseHistory_PRD'));
      Alert.alert(err.message);
    }
  }


  getAvailablePurchase = async() => {
    try {
       
      console.info('Get available purchases (non-consumable or unconsumed consumable)');
     //  const purchases = await RNIap.getPurchaseHistory();
       const purchases = await RNIap.getAvailablePurchases();
    

      const sortedAvailablePurchases = purchases.sort(
        (a, b) => b.transactionDate - a.transactionDate
      );
   //   const latestAvailableReceipt = sortedAvailablePurchases[0].transactionReceipt;
   //   console.info('Available purchases :: ', purchases);
    //  console.log('purchases:');

      console.log('SORTED AVAILABLE purchases:');
      sortedAvailablePurchases.map((purch2, j) => {
        console.log('productID:'+ purch2.productId);
        console.log('TransactionID:'+ purch2.transactionId);
        console.log('transactionDate:'+ purch2.transactionDate);
        console.log('originalTransactionDateIOS:'+ purch2.originalTransactionDateIOS);
        console.log('originalTransactionIdentifierIOS:'+ purch2.originalTransactionIdentifierIOS);
        });

    

      if (purchases && purchases.length > 0) {
        console.log('purchases completo AVAILABLE:');
          console.log(purchases);
          console.log('hya compras y la ultima compra fue:');
          console.log(purchases[0].originalTransactionIdentifierIOS);
          console.log(purchases[0].transactionId);
       //   console.log(purchases[0].transactionReceipt);
          // le tengo que pasar el id original, usuario logueado y receipt
          // para que la API valide con ese ID si existe y no esta vencida la subscrripcion
          // y si el usuario coincide devuele ok y queda todo igual, pero si no coincide debe
          // poner al nuevo QRA como PREMIUM para ese id original de transaccion y al otro dejarlo sin nada.
          // puede pasar que no encuentre el id original en el backend porque nunca lo dio de alta cuando 
          // se compro por error de backend o conexion al momento de enviar el receipt, en ese caso
          // debera llamar a la API validadno el RECIPT recibido y seguie el mismo precediemitno de validacion
          // si encuentra para ese receipt/original id un EXPIRE DATE que no haya vencido entonces darlos de alta
          // y cambiarlo como PREMIUM al usuario.

        
          
        
  //        this.props.confirmReceiptiOS(purchases[0].originalTransactionIdentifierIOS,purchases[0].transactionReceipt,purchases[0].transactionId,this.props.env,'restore');
         
      if (Platform.OS==='android') 
      {
             console.log('entro a restore de ANDROID');

              purchaseJson = JSON.parse(purchases[0].transactionReceipt);
              console.log('purchase json');
              console.log(purchaseJson);

              purchaseToken = purchaseJson.purchaseToken;
              qra = this.props.qra;
              packageName = purchaseJson.packageName;
              productId = purchaseJson.productId;
              environment = this.props.env;
              action = 'RESTORE';
              ack = purchases[0].isAcknowledgedAndroid;

              console.log('purchasetoken:'+purchaseToken);
              console.log('qra:'+qra);
              console.log('packageName:'+packageName);
              console.log('productId:'+productId);
              console.log('environment:'+environment);
              console.log('action:'+action);
              

              this.props.confirmReceiptAndroid(qra,packageName,purchaseToken,productId,environment,action,ack)

            }


        // this.setState({
        //   availableItemsMessage: `Got ${purchases.length} items.`,
        //   receipt: purchases[0].transactionReceipt,
        // });
      }
      else{
       console.log('viene vacio el purchaseAvailable');
       if (Platform.OS==='android') 
       {
            this.props.manageLocationPermissions("iapshowed",0); 
            this.props.restoreCall(true,'Sorry, we did not find any active subscription.')
 
         }
      }
       
    } catch (err) {
      console.warn(err.code, err.message);
      crashlytics().setUserId(this.props.qra);
      crashlytics().log('error: ' + err) ;
      if(__DEV__)
      crashlytics().recordError(new Error('getAvailablePurchase_DEV'));
      else
      crashlytics().recordError(new Error('getAvailablePurchase_PRD'));

      Alert.alert(err.message);
    }
  }

  
  render() {
    

    return (
      <Modal
            visible={true}
            transparent={true}
            onRequestClose={() => console.log("Close was requested")}
          >
            <View
              style={{
                //  margin:20,
                padding: 20,
                backgroundColor:"rgba(0,0,0,0.90)",
                top: 100,
                left: 30,
                right: 30,
                position: "absolute",
                borderBottomLeftRadius: 22,
                borderBottomRightRadius: 22,
                borderTopLeftRadius: 22,
                borderTopRightRadius: 22

                //  alignItems: 'center'
              }}
            >
             

              <View style={{ flex: 1, alignItems: "center" }}>
                {/* <Image
                  source={require("../../images/noInternet.png")}
                  style={{ width: 60, height: 60 }}
                  resizeMode="contain"
                /> */}
                <View style={{ flex: 0.30, alignItems: "center" }}>
                <Text style={{ color: "#999", fontSize: 20, padding: 10 }}>
                  {/* Dear Ham: */}
                   Searching Purchases ...
                  
                </Text>
                <Text>

                </Text>
                {(this.props.restorecalled) &&
                       <Text style={{ color: "#FFFFFF", fontSize: 15 }}>
                          {this.props.restoremessage}
                       </Text>

                      }
                </View >
              
                <View style={{  flex: 0.2, alignItems: "center", padding: 5,
                        opacity: this.props.iapshowed }} >
                  
                       <ActivityIndicator   animating={true} size="small" color='white' />
                       <Text>

                       </Text>
                      
                   
                   </View>

             <View style={{ flex: 0.5}}>
                
           <TouchableOpacity
                   onPress={() => this.props.closerestoremodal()}
                  
                 >
                   <Text style={{ color: "#999", fontSize: 14 }}>Close</Text>
                 </TouchableOpacity>

                 </View>
           
              </View>
            </View>
          </Modal>
      
    );
  }
}



const mapStateToProps = state => {

      return {  
        jwtToken: state.sqso.jwtToken,
        userinfo: state.sqso.userInfo,
        confirmedpurchaseflag: state.sqso.confirmedPurchaseFlag,
        productid: state.sqso.productId,
        localizedprice: state.sqso.localizedPrice,
        iapshowed: state.sqso.iapShowed,
        env: state.sqso.env,
        qra: state.sqso.qra,
        restorecalled: state.sqso.restoreCalled,
        restoremessage: state.sqso.restoreMessage


         };
};

 
const mapDispatchToProps = {
  confirmReceiptiOS,
  manageLocationPermissions,
  restoreCall,
  confirmReceiptAndroid
 }

// export default Iap;
export default connect(mapStateToProps, mapDispatchToProps)(RestoreSubscription);