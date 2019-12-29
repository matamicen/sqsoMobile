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
import { confirmReceiptiOS, manageLocationPermissions } from '../../actions';
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

class Iap extends Component {
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
            
      const products = await RNIap.getSubscriptions(itemSubs);
      console.log('busco codigos de subscripciones');
      console.log(products);
      // this.setState({localizedPrice: products[0].localizedPrice});



      // await RNIap.consumeAllItemsAndroid();
      // console.log('result', result);
     
     
      

    } catch (err) {
      console.log('salio por catch didMount IAP');
      console.warn(err.code, err.message);
      crashlytics().setUserId(this.props.qra);
      crashlytics().log('error: ' + err) ;
      crashlytics().recordError(new Error('didMountIAP'));
    }

    setTimeout(() => {
                        
      console.log('delay para los free user y darle tiempo a q cargue el AD');
      this.setState({showOkBePremium: true});
      
    }
    , this.props.userinfo.account_type.app_waitingTimeAdMob);
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

  componentWillUnmount() {
    // if (purchaseUpdateSubscription) {
    //   purchaseUpdateSubscription.remove();
    //   purchaseUpdateSubscription = null;
    // }
    // if (purchaseErrorSubscription) {
    //   purchaseErrorSubscription.remove();
    //   purchaseErrorSubscription = null;
    // }
  }

 

  // goNext = () => {
  //   Alert.alert('Receipt', this.state.receipt);
  // }

  getItems = async() => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      // const products = await RNIap.getSubscriptions(itemSkus);
      console.log('Products', products);
      this.setState({ productList: products });
    } catch (err) {
      console.warn(err.code, err.message);
      crashlytics().setUserId(this.props.qra);
      crashlytics().log('error: ' + err) ;
      crashlytics().recordError(new Error('IAPgetItems'));
    }
  }

  getSubscriptions = async() => {
    try {
      const products = await RNIap.getSubscriptions(itemSubs);
      console.log('Products', products);
      this.setState({ productList: products });
    } catch (err) {
      console.warn(err.code, err.message);
      crashlytics().setUserId(this.props.qra);
      crashlytics().log('error: ' + err) ;
      crashlytics().recordError(new Error('IAPgetSubscriptions'));
    }
  }

  getAvailablePurchases = async() => {
    try {
      console.info('Get available purchases (non-consumable or unconsumed consumable)');
       const purchases = await RNIap.getPurchaseHistory();
    
      // console.log('purchased HISTORY');
      // purchasesHisotry.map((purch3, j) => {
      //   console.log('productID:'+ purch3.productId);
      //   console.log('TransactionID:'+ purch3.transactionId);
      //   console.log('transactionDate:'+ purch3.transactionDate);
      //   console.log('originalTransactionDateIOS:'+ purch3.originalTransactionDateIOS);
      //   console.log('originalTransactionIdentifierIOS:'+ purch3.originalTransactionIdentifierIOS);
      //   });
     
     
     
  //    const purchases = await RNIap.getAvailablePurchases();

      // console.log('UNSORTED purchases:');
      // purchases.map((purch, i) => {
      // console.log('productID:'+ purch.productId);
      // console.log('TransactionID:'+ purch.transactionId);
      // console.log('transactionDate:'+ purch.transactionDate);
      // console.log('originalTransactionDateIOS:'+ purch.originalTransactionDateIOS);
      // console.log('originalTransactionIdentifierIOS:'+ purch.originalTransactionIdentifierIOS);
      // });

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



      console.log("imprimo receipt [1]:");

      console.log(latestAvailableReceipt);
     const receiptBody = {
      'receipt-data': latestAvailableReceipt,
      'password': 'f73fc083d2b94b93bdbd2a1a7402aae5'
    };
    const result = await RNIap.validateReceiptIos(receiptBody, true);
    console.log("imprimo verificacion de receipt [1]:");
    console.log(result);
    
    const renewalHistory = result.latest_receipt_info
   // console.log(renewalHistory);
    
    //This returns the expiration date of the latest renewal of the latest purchase
     const expiration = renewalHistory[renewalHistory.length - 1].expires_date_ms
    //Boolean for whether it has expired. Can use in your app to enable/disable subscription
    // console.log(expiration > Date.now())
    console.log('expires_date: ',expiration);
    console.log(expiration > Date.now())
    
    
    console.log("fin valido receipt [1]:");

      

      if (purchases && purchases.length > 0) {
        this.setState({
          availableItemsMessage: `Got ${purchases.length} items.`,
          receipt: purchases[0].transactionReceipt,
        });
      }
    } catch (err) {
      console.warn(err.code, err.message);
      crashlytics().setUserId(this.props.qra);
      crashlytics().log('error: ' + err) ;
      crashlytics().recordError(new Error('IAPgetAvailablePurchases'));
       Alert.alert(err.message);
       
    }
  }

  // Version 3 apis
  requestPurchase = async(sku) => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.warn(err.code, err.message);
      crashlytics().setUserId(this.props.qra);
      crashlytics().log('error: ' + err) ;
      crashlytics().recordError(new Error('IAPrequestPurchase'));
    }
  }

  requestSubscription = async(sku) => {
    try {
      console.log('iapshowed mando TRUE');
      
        this.props.manageLocationPermissions("iapshowed",1);
        RNIap.requestSubscription(sku);   

    } catch (err) {
      crashlytics().setUserId(this.props.qra);
      crashlytics().log('error: ' + err) ;
      crashlytics().recordError(new Error('IAPrequestSubscription'));
      Alert.alert(err.message);
    }
  }

  buySubscription = async () => {
    if (Platform.OS==='android')
        this.requestSubscription('001')
      else
        this.requestSubscription('PremiumMonthly')
  }



  render() {
    const { productList, receipt, availableItemsMessage} = this.state;
    const receipt100 = receipt.substring(0, 100);

      {(this.props.confirmedpurchaseflag) && this.props.closeiapmodal()  
               
                }
       

    return (
      <Modal
            visible={true}
            transparent={true}
            onRequestClose={() => console.log("Close was requested")}
          >
            <View
              style={{
                //  margin:20,
                padding: 5,
                backgroundColor:"rgba(0,0,0,0.85)",
                top: 100,
                left: 25,
                right: 25,
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
                <View style={{ flex: 0.15, alignItems: "center" }}>
                <Text style={{ color: "#FFFFFF", fontSize: 20, padding: 10 }}>
                  {/* Dear Ham: */}
                  {this.props.userinfo.account_type.app_upgrade_t1}
                  
                </Text>
                </View >
              
                <View style={{  flex: 0.05, alignItems: "center", padding: 5,
                        opacity: this.props.iapshowed }} >
                  
                       <ActivityIndicator   animating={true} size="small" color='white' />
                   </View>
           
                <View style={{ flex: 0.2, alignItems: "center" }}>
                <Text style={{ color: "#FFFFFF", fontSize: 14, padding: 5 }}>
                   {/* Enjoy superQso at full scale!  */}
                   {this.props.userinfo.account_type.app_upgrade_t2}
                </Text>
                <Text style={{ color: "#999", fontSize: 14, padding: 5 }}>
                   {/* Became a PREMIUM member:  */}
                   {this.props.userinfo.account_type.app_upgrade_t3}
                </Text>
                </View>
 

                <View style={{ flex: 0.2, alignItems: "center" }}>
                <Text style={{ color: "#FFFFFF", fontSize: 14, padding: 1 }}>
                  {/* Speed up the App */}
                  {this.props.userinfo.account_type.app_upgrade_t4}
                </Text>
                <Text style={{ color: "#FFFFFF", fontSize: 14, padding: 1 }}>
                  {/* No Mobile/Web PopUp Ads */}
                  {this.props.userinfo.account_type.app_upgrade_t5}
                </Text>
           
                <Text style={{ color: "#FFFFFF", fontSize: 14, padding: 1 }}> 
                  {/* 10 audios & photos per QSO */}
                  {this.props.userinfo.account_type.app_upgrade_t6} 
                </Text>
              
                {/* <Text style={{ color: "#FFFFFF", fontSize: 14, padding: 1 }}> */}
                  {/* 3 minutes audios recording */}
                  {/* {this.props.userinfo.account_type.app_upgrade_t7} */}
                {/* </Text> */}
                <Text style={{ color: "#FFFFFF", fontSize: 14, padding: 1 }}>
                   {/* Unlimited QR Scans  */}
                   {this.props.userinfo.account_type.app_upgrade_t8}
                </Text>
                <Text style={{ color: "#FFFFFF", fontSize: 14, padding: 2 }}>
                  {/* Unlimited QsosLinks */}
                  {this.props.userinfo.account_type.app_upgrade_t9}
                </Text>
                <Text style={{ color: "#FFFFFF", fontSize: 14, padding: 2 }}>
                  {/* Unlimited Web Navigation */}
                  {this.props.userinfo.account_type.app_upgrade_t10}
                </Text>
                </View>
                { (this.state.showOkBePremium) && 
                <View style={{ flex: 0.2, flexDirection: 'row'}}>
                  <View style={{ flex: 0.5, alignItems: "center", marginTop: 12}}>
                 <TouchableOpacity
                   onPress={() => this.props.closeiapmodal()}
                  
                 >
                   <Text style={{ color: "#999", fontSize: 14 }}>Do not Upgrade</Text>
                 </TouchableOpacity>
                 </View> 
                 <View style={{ flex: 0.5, alignItems: "center", marginTop: 12}}>
                 
                 <TouchableOpacity
                   onPress={() =>  this.buySubscription() } >
               
                   <Text style={{ color: "#FFFFFF", fontSize: 14}}>Upgrade Premium</Text>
                   <Text style={{ color: "#FFFFFF", fontSize: 12, alignSelf:"center" }}>{this.props.localizedprice}/month</Text>
                 </TouchableOpacity>
                 </View> 

                 </View>
                 }
            
              
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
        qra: state.sqso.qra

         };
};


const mapDispatchToProps = {
  confirmReceiptiOS,
  manageLocationPermissions
  
 }

// export default Iap;
export default connect(mapStateToProps, mapDispatchToProps)(Iap);