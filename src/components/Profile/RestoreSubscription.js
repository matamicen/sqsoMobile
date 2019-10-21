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
import { confirmReceiptAPI, manageLocationPermissions } from '../../actions';


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
    '001',
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
    this.props.manageLocationPermissions("iapshowed",1);
    
      const result = await RNIap.initConnection();
      await RNIap.consumeAllItemsAndroid();
      console.log('result', result);
      // busco codigos de subscripcion para iOS sino me falla el GetSubscription
      
      const products = await RNIap.getSubscriptions(itemSubs);
      console.log('busco codigos de subscripciones');
     // console.log(products);
    // this.setState({localizedPrice: products[0].localizedPrice});

    this.getAvailablePurchases();
     
      

    } catch (err) {
      console.warn(err.code, err.message);
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
    //     this.props.confirmReceiptAPI(purchase.transactionId,this.buystate);
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
    }
  }

  getAvailablePurchases = async() => {
    try {
       
      console.info('Get available purchases (non-consumable or unconsumed consumable)');
       const purchases = await RNIap.getPurchaseHistory();
    

      const sortedAvailablePurchases = purchases.sort(
        (a, b) => b.transactionDate - a.transactionDate
      );
      const latestAvailableReceipt = sortedAvailablePurchases[0].transactionReceipt;
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
          console.log('hya compras y la ultima compra fue:');
          console.log(purchases[0].originalTransactionIdentifierIOS);
          // le tengo que pasar el id original, usuario logueado y receipt
          // para que la API valide con ese ID si existe y no esta vencida la subscrripcion
          // y si el usuario coincide devuele ok y queda todo igual, pero si no coincide debe
          // poner al nuevo QRA como PREMIUM para ese id original de transaccion y al otro dejarlo sin nada.
          // puede pasar que no encuentre el id original en el backend porque nunca lo dio de alta cuando 
          // se compro por error de backend o conexion al momento de enviar el receipt, en ese caso
          // debera llamar a la API validadno el RECIPT recibido y seguie el mismo precediemitno de validacion
          // si encuentra para ese receipt/original id un EXPIRE DATE que no haya vencido entonces darlos de alta
          // y cambiarlo como PREMIUM al usuario.
        
          this.props.confirmReceiptAPI(purchases[0].originalTransactionIdentifierIOS,'restore');
          



        // this.setState({
        //   availableItemsMessage: `Got ${purchases.length} items.`,
        //   receipt: purchases[0].transactionReceipt,
        // });
      }
    } catch (err) {
      console.warn(err.code, err.message);
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
                <Text style={{ color: "#FFFFFF", fontSize: 20, padding: 10 }}>
                  {/* Dear Ham: */}
                   Searching Purchases ...
                  
                </Text>
                </View >
              
                <View style={{  flex: 0.2, alignItems: "center", padding: 5,
                        opacity: this.props.iapshowed }} >
                  
                       <ActivityIndicator   animating={true} size="small" color='white' />
                       <Text>

                       </Text>
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

         };
};

 
const mapDispatchToProps = {
  confirmReceiptAPI,
  manageLocationPermissions
 }

// export default Iap;
export default connect(mapStateToProps, mapDispatchToProps)(RestoreSubscription);