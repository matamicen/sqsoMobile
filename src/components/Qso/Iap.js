import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button
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
import { confirmReceiptAPI, pressPurchaseButton } from '../../actions';

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

class Iap extends Component {
  constructor(props) {
    super(props);

  //  this.buystate = false;

    this.state = {
      productList: [],
      receipt: '',
      availableItemsMessage: '',
      localizedPrice: ''   
    };

    
  }

  async componentDidMount() {
    try {
    //  this.props.pressPurchaseButton(true);
    
      const result = await RNIap.initConnection();
      await RNIap.consumeAllItemsAndroid();
      console.log('result', result);
      // busco codigos de subscripcion para iOS sino me falla el GetSubscription
      
      const products = await RNIap.getSubscriptions(itemSubs);
      console.log('busco codigos de subscripciones');
     // console.log(products);
    // this.setState({localizedPrice: products[0].localizedPrice});
     
      

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
    }
  }

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
      Alert.alert(err.message);
    }
  }

  // Version 3 apis
  requestPurchase = async(sku) => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  requestSubscription = async(sku) => {
    try {

        RNIap.requestSubscription(sku);   

    } catch (err) {
      Alert.alert(err.message);
    }
  }



  render() {
    const { productList, receipt, availableItemsMessage} = this.state;
    const receipt100 = receipt.substring(0, 100);

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
                backgroundColor:"rgba(0,0,0,0.85)",
                top: 90,
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


        
        <View >
          <Text style={ styles.headerTxt} >react-native-iap V3</Text>
         
         {/* Cierro el modal porque se confirmo la compra */}
          {(this.props.confirmedpurchaseflag) && this.props.closeiap()  
          // <Text style={ styles.headerTxt} >Compra Confirmada!</Text>
          }

        </View>
      
        <View>
       
            <View style={{ height: 50 }} />
            <Button
              onPress={this.getAvailablePurchases}
              title="Get available purchases"
            //   activeOpacity={0.5}
            //   style={styles.btn}
            //   textStyle={styles.txt}
            >Get available purchases</Button>

            <Text style={{ margin: 5, fontSize: 15, alignSelf: 'center' }} >{availableItemsMessage}</Text>

            <Text style={{ margin: 5, fontSize: 9, alignSelf: 'center' }} >{receipt100}</Text>

            <Button
            //   onPress={() => this.getItems()}
              onPress={() => this.getSubscriptions()}
              title="Get Products"
            //   activeOpacity={0.5}
            //   style={styles.btn}
            //   textStyle={styles.txt}
            >Get Products ({productList.length})</Button>
            {
              productList.map((product, i) => {
                return (
                  <View key={i} style={{
                    flexDirection: 'column',
                  }}>
                    <Text style={{
                      marginTop: 20,
                      fontSize: 12,
                      color: 'black',
                      minHeight: 100,
                      alignSelf: 'center',
                      paddingHorizontal: 20,
                    }} >{JSON.stringify(product)}</Text>
                    <Button
                      // onPress={() => this.requestPurchase(product.productId)}
                      title="Request purchase for above product"
                      onPress={() => this.requestSubscription(product.productId)}
                      // onPress={() => this.buyItem(product.productId)}
                      // onPress={() => this.buySubscribeItem(product.productId)}
                    
                    
                    //   activeOpacity={0.5}
                    //   style={styles.btn}
                    //   textStyle={styles.txt}
                    >Request purchase for above product</Button>

                    
                          
                  </View>
                );
              })
            }
        

        
        <TouchableOpacity
                          onPress={() => { 
                            this.requestSubscription('PremiumMonthly')
                          }} 
                        
                        > 
                          <Text style={{ fontSize: 13, color: '#999'}} >BUY</Text>
                        </TouchableOpacity>
          <TouchableOpacity
                          onPress={() => { 
                            this.props.closeiap()  
                          }} 
                         // style={{ paddingTop: 8, paddingBottom: 4, marginRight: 15}}
                        > 
                          <Text style={{ fontSize: 13, color: '#999'}} >Close</Text>
                        </TouchableOpacity>
          </View>

       </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.select({
      ios: 0,
      android: 24,
    }),
    paddingTop: Platform.select({
      ios: 0,
      android: 24,
    }),
    backgroundColor: 'white',
  },
  header: {
    flex: 20,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTxt: {
    fontSize: 26,
    color: 'green',
  },
  content: {
    flex: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  btn: {
    height: 48,
    width: 240,
    alignSelf: 'center',
    backgroundColor: '#00c40f',
    borderRadius: 0,
    borderWidth: 0,
  },
  txt: {
    fontSize: 16,
    color: 'white',
  },
});

const mapStateToProps = state => {

      return {  
        jwtToken: state.sqso.jwtToken,
        userinfo: state.sqso.userInfo,
        confirmedpurchaseflag: state.sqso.confirmedPurchaseFlag

         };
};


const mapDispatchToProps = {
  confirmReceiptAPI,
  pressPurchaseButton
  
 }

// export default Iap;
export default connect(mapStateToProps, mapDispatchToProps)(Iap);