import React, { Component } from "react";
import {
  Text,
  TextInput,
  Image,
  View,
  Modal,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import Terms from './Terms';
import Privacy from './Privacy';

class VariosModales extends Component {
  constructor(props) {
    super(props);
    this.empty = "require('../../images/emptyprofile.png')";
   

    this.state = {
      show: false,
      watchvideo: true,
      showform : true,
      contactMessage: ' ',
      showOkBePremium: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { show: props.show
             };
  }

  //   componentWillReceiveProps(nextProps) {

  //     // console.log("El valor de profileurlcondition: " + nextProps.profileurlcondition);

  //     this.setState({
  //         nointernet: nextProps.nointernet
  //     });
  // }

  componentDidMount() {

    if (this.props.modalType === "waitingAdmodal")
            setTimeout(() => {
                        
              console.log('delay del OK y BE Premium');
              this.setState({showOkBePremium: true});
              
            }
            , 3000);
    
  }

  //   ImageLoading_Error = () => {

  //     this.setState({ imageLoading: false });

  // }

  render() {
    console.log("RENDER Varios Modales");
    
    

    if (this.props.modalType === "bepremium")
      return (
        <View>
          {/* {(this.props.modalType==='bepremium') ? */}

          <Modal
            visible={this.state.show}
            transparent={true}
            onRequestClose={() => console.log("Close was requested")}
          >
            <View
              style={{
                //  margin:20,
                padding: 20,
                backgroundColor: "#475788",
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
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  source={require("../../images/noInternet.png")}
                  style={{ width: 60, height: 60 }}
                  resizeMode="contain"
                />

                <Text style={{ color: "#FFFFFF", fontSize: 20, padding: 10 }}>
                  Be Premium {this.props.feature}
                </Text>

                <TouchableOpacity
                  onPress={() => this.props.closeInternetModal('bepremium')}
                  style={{ paddingTop: 8, paddingBottom: 4, flex: 0.5 }}
                >
                  <Text style={{ color: "#999", fontSize: 22 }}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );

    {
      /* : */
    }
    if (this.props.modalType === "nointernet")
      return (
        <View>
          <Modal
            visible={this.state.show}
            transparent={true}
            onRequestClose={() => console.log("Close was requested")}
          >
            <View
        
              style={{
                //  margin:20,
                padding: 20,
             //   backgroundColor: "#475788",
                 backgroundColor:"rgba(0,0,0,0.85)",
                top: 40,
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
                <Image
                  source={require("../../images/noInternet.png")}
                  style={{ width: 60, height: 60 }}
                  resizeMode="contain"
                />

                <Text style={{ color: "#FFFFFF", fontSize: 20, padding: 10 }}>
                  There is no Internet connection.
                </Text>

                <TouchableOpacity
                  onPress={() => this.props.closeInternetModal('nointernet')}
                  style={{ paddingTop: 8, paddingBottom: 4, flex: 0.5 }}
                >
                  <Text style={{ color: "#999", fontSize: 22 }}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );

      if (this.props.modalType === "notvideorewarded")
      return (
        <View>
          <Modal
            visible={this.state.show}
            transparent={true}
            onRequestClose={() => console.log("Close was requested")}
          >
            <View
              style={{
                //  margin:20,
                padding: 20,
                backgroundColor: "#475788",
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
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  source={require("../../images/noInternet.png")}
                  style={{ width: 60, height: 60 }}
                  resizeMode="contain"
                />

                <Text style={{ color: "#FFFFFF", fontSize: 20, padding: 10 }}>
                {this.props.message}
                  {/* Free User: You need to watch the Ad video to create a new qso. */}
                </Text>

                <TouchableOpacity
                  onPress={() => this.props.closeInternetModal('notvideorewarded')}
                  style={{ paddingTop: 8, paddingBottom: 4, flex: 0.5 }}
                >
                  <Text style={{ color: "#999", fontSize: 22 }}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );

      if (this.props.modalType === "prevideorewarded")
      return (
        this.state.watchvideo ? 
       <View>
          <Modal
            visible={this.state.show}
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
              <View style={{ flex: 1, alignItems: "center" }}>
                {/* <Image
                  source={require("../../images/noInternet.png")}
                  style={{ width: 60, height: 60 }}
                  resizeMode="contain"
                /> */}
                <View style={{ flex: 0.2, alignItems: "center" }}>
                <Text style={{ color: "#FFFFFF", fontSize: 20, padding: 10 }}>
                  Free User
                  
                </Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center" }}>
                { (this.props.sender==='linkqso') && 
                <Text style={{ color: "#FFFFFF", fontSize: 16, padding: 5 }}>
                   You have to watch a video reward to link these Qsos. 
              </Text> 
            }
                 { (this.props.sender==='sendmedia') && 
                <Text style={{ color: "#FFFFFF", fontSize: 16, padding: 5 }}>
                You have to watch a video reward to send the media to the cloud. 
                </Text>
                }
                 { (this.props.sender==='newqso') && 
                 <Text style={{ color: "#FFFFFF", fontSize: 16, padding: 5 }}>
                 You have to watch a video reward to create a NewQso. 
                 </Text>
                 }

                <Text style={{ color: "#999", fontSize: 14, padding: 5 }}>
                   {/* Became a PREMIUM member:  */}
                </Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center" }}>
                <Text style={{ color: "#FFFFFF", fontSize: 14, padding: 1 }}>
                  {/* Speed up the App */}
                </Text>
               
                </View>
             
                <View style={{ flex: 0.2, flexDirection: 'row'}}>
                  <View style={{ flex: 0.5, alignItems: "center", marginTop: 12}}>
                  <TouchableOpacity
                  onPress={() => this.setState({watchvideo: false}) }
                 
                >
                  <Text style={{ color: "#999", fontSize: 16 }}>Don't watch</Text>
                </TouchableOpacity>
                 </View> 
                 <View style={{ flex: 0.5, alignItems: "center", marginTop: 12}}>
                 <TouchableOpacity
                  onPress={() => { 
                    this.props.closeInternetModal("yes")      
                }}   >
                  <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Watch the video</Text>
                </TouchableOpacity>
                 </View> 

                 </View>
                 
              </View>
            </View>
          </Modal>
        </View>
       
      :
      <View>
          <Modal
            visible={this.state.show}
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

<View style={{ flex: 1, alignItems: "center" }}>
                {/* <Image
                  source={require("../../images/noInternet.png")}
                  style={{ width: 60, height: 60 }}
                  resizeMode="contain"
                /> */}
                <View style={{ flex: 0.2, alignItems: "center" }}>
                <Text style={{ color: "#FFFFFF", fontSize: 20, padding: 10 }}>
                  Free User
                  
                </Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center" }}>
               
                { (this.props.sender==='linkqso') &&
                <Text style={{ color: "#FFFFFF", fontSize: 16, padding: 5 }}>
                Are you sure to not link theses Qsos ?  
                </Text>
                }
                  { (this.props.sender==='sendmedia') &&
                <Text style={{ color: "#FFFFFF", fontSize: 16, padding: 5 }}>
                Are you sure to discard the media just created?  
                </Text>
                }
                    { (this.props.sender==='newqso') &&
                <Text style={{ color: "#FFFFFF", fontSize: 16, padding: 5 }}>
                  Are you sure to not start a New Qso ? 
                </Text>
                }
               
                

                <Text style={{ color: "#999", fontSize: 14, padding: 5 }}>
                   {/* Became a PREMIUM member:  */}
                </Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center" }}>
                <Text style={{ color: "#FFFFFF", fontSize: 14, padding: 1 }}>
                  {/* Speed up the App */}
                </Text>
               
                </View>
             
                <View style={{ flex: 0.2, flexDirection: 'row'}}>
                  <View style={{ flex: 0.5, alignItems: "center", marginTop: 12}}>

                  { (this.props.sender==='linkqso') && 
                  <TouchableOpacity
                  onPress={() => {
                    this.setState({watchvideo: true})
                    this.props.closeInternetModal("no")
                }}   >
                  
                  <Text style={{ color: "#999", fontSize: 15 }}>Don't link these Qsos.</Text>
                </TouchableOpacity>
                }

            { (this.props.sender==='sendmedia') && 
                <TouchableOpacity
                  onPress={() => {
                    this.setState({watchvideo: true})
                    this.props.closeInternetModal("no")
                }}   >
                  
                  <Text style={{ color: "#999", fontSize: 15 }}>Discard the Media</Text>
                </TouchableOpacity>

             }

        { (this.props.sender==='newqso') && 
                <TouchableOpacity
                  onPress={() => {
                    this.setState({watchvideo: true})
                    this.props.closeInternetModal("no")
                }}   >
                  
                  <Text style={{ color: "#999", fontSize: 15 }}>Don't start</Text>
                </TouchableOpacity>

             }



                 </View> 
                 <View style={{ flex: 0.5, alignItems: "center", marginTop: 12}}>
           { (this.props.sender==='linkqso') &&      
                 <TouchableOpacity
                  onPress={() => {
                    this.setState({watchvideo: true});
                    this.props.closeInternetModal("yes");
               }}
                  
                >
                  <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Links these Qsos.</Text>
                </TouchableOpacity>
           }
                 { (this.props.sender==='sendmedia') &&      
                <TouchableOpacity
                  onPress={() => {
                    this.setState({watchvideo: true});
                    this.props.closeInternetModal("yes");
               }}
                  
                >
                  <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Send the media</Text>
                </TouchableOpacity>
                }
                   { (this.props.sender==='newqso') &&      
                <TouchableOpacity
                  onPress={() => {
                    this.setState({watchvideo: true});
                    this.props.closeInternetModal("yes");
               }}
                  
                >
                  <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Create a NewQso</Text>
                </TouchableOpacity>
                }

                 </View> 

                 </View>
                 
              </View>
          
            </View>
          </Modal>
        </View>
       

      );


      if (this.props.modalType === "waitingAdmodal")
      return (
        <View>
          <Modal
            visible={this.state.show}
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
              <View style={{ flex: 1, alignItems: "center" }}>
                {/* <Image
                  source={require("../../images/noInternet.png")}
                  style={{ width: 60, height: 60 }}
                  resizeMode="contain"
                /> */}
                <View style={{ flex: 0.2, alignItems: "center" }}>
                <Text style={{ color: "#FFFFFF", fontSize: 20, padding: 10 }}>
                  {/* Dear Ham: */}
                  {this.props.userinfo.account_type.app_upgrade_t1}
                  
                </Text>
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
                <Text style={{ color: "#FFFFFF", fontSize: 14, padding: 1 }}>
                  {/* 3 minutes audios recording */}
                  {this.props.userinfo.account_type.app_upgrade_t7}
                </Text>
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
                   onPress={() => this.props.closewaitingmodal()}
                  
                 >
                   <Text style={{ color: "#999", fontSize: 16 }}>Do not Upgrade</Text>
                 </TouchableOpacity>
                 </View> 
                 <View style={{ flex: 0.5, alignItems: "center", marginTop: 12}}>
                 <TouchableOpacity
                   onPress={() => this.props.closewaitingmodal()}
                  
                 >
                   <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Upgrade Premium</Text>
                 </TouchableOpacity>
                 </View> 

                 </View>
                 }
              </View>
            </View>
          </Modal>
        </View>
      );

      if (this.props.modalType === "contactus")
      return (
        this.state.showform ? 
        <View>
          <Modal
            visible={this.state.show}
            transparent={true}
            onRequestClose={() => console.log("Close was requested")}
          >
            <View
              style={{
                //  margin:20,
                padding: 20,
             //   backgroundColor: "#475788",
                 backgroundColor:"rgba(0,0,0,0.85)",
                top: 30,
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
              <View style={{ flex: 1 }}>
              <View style={{ flex: 0.2, alignItems: "center" }}>
                    <Image
                      source={require("../../images/email3.png")}
                      style={{ width: 60, height: 60 }}
                      resizeMode="contain"
                    />

                    <Text style={{ color: "#FFFFFF", fontSize: 20}}>
                      Contact Us!
                      {/* Free User: You need to watch the Ad video to create a new qso. */}
                    </Text>
                </View>
                <View style={{ flex: 0.6 }}>
                    <Text style={{ color: "#FFFFFF", fontSize: 18, marginTop: 10, marginLeft:7}}>
                      Message
                      {/* Free User: You need to watch the Ad video to create a new qso. */}
                    </Text>

                    <TextInput 
                      ref={message => this.message  = message }
                      
                     // placeholder="message"
                     // underlineColorAndroid='transparent'
                    //  placeholderTextColor="rgba(255,255,255,0.7)"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      multiline={true}
                      numberOfLines={3}
                  //   onSubmitEditing={() => this.lastname.focus()} 
                      style={styles.input}
                      value={this.state.contactMessage }
                        onChangeText={(text) => this.setState({contactMessage : text})} />

                </View>

                <View style={{ flex: 0.2, flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flex: 0.5 }}>

                    <TouchableOpacity
                      onPress={() => this.props.closecontact()}
                      style={{ paddingTop: 8, paddingBottom: 4, flex: 0.5 }}
                    >
                      <Text style={{ color: "#999", fontSize: 20 }}>Cancel</Text>
                    </TouchableOpacity>
                   
                    </View>

                    <View style={{ flex: 0.5, alignItems: "flex-end" }}>
      
                        <TouchableOpacity
                          onPress={() => { 
                            this.props.sendemail(this.props.userinfo.email,this.state.contactMessage);
                            this.setState({showform:false});
                          }} 
                          style={{ paddingTop: 8, paddingBottom: 4, marginRight: 15}}
                        >
                          <Text style={{ color: "#FFF", fontSize: 20 }}>Send</Text>
                        </TouchableOpacity>
                    </View>

                </View>

              </View>
            </View>
          </Modal>
        </View>
        :
        <View>
          <Modal
            visible={this.state.show}
            transparent={true}
            onRequestClose={() => console.log("Close was requested")}
          >
            <View
              style={{
                //  margin:20,
                padding: 20,
             //   backgroundColor: "#475788",
                 backgroundColor:"rgba(0,0,0,0.85)",
                top: 40,
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
                <Image
                  source={require("../../images/email3.png")}
                  style={{ width: 60, height: 60 }}
                  resizeMode="contain"
                />

                <Text style={{ color: "#FFFFFF", fontSize: 20, padding: 10 }}>
                  Your message was sent! 
                </Text>
                <Text style={{ color: "#FFFFFF", fontSize: 14, padding: 10 }}>
                 We will contact you soon.  
                </Text>

                <TouchableOpacity
                  onPress={() => this.props.closecontact()}
                  style={{ paddingTop: 8, paddingBottom: 4, flex: 0.5 }}
                >
                  <Text style={{ color: "#999", fontSize: 22 }}>Close</Text>
                </TouchableOpacity>
               
              </View>
            </View>
          </Modal>
        </View>

      );

      if (this.props.modalType === "terms")
      return (
        this.state.showform ? 
        <View>
          <Modal
            visible={this.state.show}
            transparent={true}
            onRequestClose={() => console.log("Close was requested")}
          >
            <View
              style={{
                //  margin:20,
                padding: 20,
             //   backgroundColor: "#475788",
                 backgroundColor:"rgba(0,0,0,0.85)",
                top: 55,
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
              <View style={{ flex: 1 }}>
              <View style={{ flex: 0.2, alignItems: "center" }}>
                    <Image
                      source={require("../../images/hands5.png")}
                      style={{ width: 60, height: 60 }}
                      resizeMode="contain"
                    />

                    <Text style={{ color: "#FFFFFF", fontSize: 20}}>
                      Terms & Conditions 
                      {/* Free User: You need to watch the Ad video to create a new qso. */}
                    </Text>
                </View>
                <View style={{ flex: 0.6, margintTop: 6 }}>
                   

                    <ScrollView style={{ height: 180}}>
                  


                     <Terms />

                    </ScrollView>

                </View>

                <View style={{ flex: 0.2, flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flex: 0.5 }}>

                    <TouchableOpacity
                      onPress={() => this.props.closeterms()}
                      style={{ paddingTop: 8, paddingBottom: 4, flex: 0.5 }}
                    >
                      <Text style={{ color: "#999", fontSize: 22 }}>Denied</Text>
                    </TouchableOpacity>
                   
                    </View>

                    <View style={{ flex: 0.5, alignItems: "flex-end" }}>
      
                        <TouchableOpacity
                          onPress={() => { 
                            this.setState({showform:false});
                          }} 
                          style={{ paddingTop: 8, paddingBottom: 4, marginRight: 15}}
                        >
                          <Text style={{ color: "#FFF", fontSize: 22 }}>Accept</Text>
                        </TouchableOpacity>
                    </View>

                </View>

              </View>
            </View>
          </Modal>
        </View>
        :
        <View>
          <Modal
            visible={this.state.show}
            transparent={true}
            onRequestClose={() => console.log("Close was requested")}
          >
            <View
              style={{
                //  margin:20,
                padding: 20,
             //   backgroundColor: "#475788",
                 backgroundColor:"rgba(0,0,0,0.85)",
                top: 55,
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

<View style={{ flex: 1 }}>
              <View style={{ flex: 0.2, alignItems: "center" }}>
                    <Image
                      source={require("../../images/privacy2.png")}
                      style={{ width: 60, height: 60 }}
                      resizeMode="contain"
                    />

                    <Text style={{ color: "#FFFFFF", fontSize: 20}}>
                      Privacy 
                      {/* Free User: You need to watch the Ad video to create a new qso. */}
                    </Text>
                </View>
                <View style={{ flex: 0.6, margintTop: 6 }}>
                   

                    <ScrollView style={{ height: 180}}>
                  


                     <Privacy />

                    </ScrollView>

                </View>

                <View style={{ flex: 0.2, flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flex: 0.5 }}>

                    <TouchableOpacity
                      onPress={() => this.props.closeterms()}
                      style={{ paddingTop: 8, paddingBottom: 4, flex: 0.5 }}
                    >
                      <Text style={{ color: "#999", fontSize: 22 }}>Denied</Text>
                    </TouchableOpacity>
                   
                    </View>

                    <View style={{ flex: 0.5, alignItems: "flex-end" }}>
      
                        <TouchableOpacity
                          onPress={() => { 
                        
                            this.props.termsaccepted();
                          }} 
                          style={{ paddingTop: 8, paddingBottom: 4, marginRight: 15}}
                        >
                          <Text style={{ color: "#FFF", fontSize: 22 }}>Accept</Text>
                        </TouchableOpacity>
                    </View>

                </View>

              </View>
              
            </View>
          </Modal>
        </View>

      );




     return null;
  }
}

const styles = StyleSheet.create({
  faceImageStyle: {
    width: 65,
    height: 65,
    borderRadius: 30
  },
  name: {
    fontSize: 12,
    marginLeft: 5,
    padding: 2,
    fontWeight: "bold",
    color: "orange"
  },
  name2: {
    fontSize: 12,
    marginLeft: 11,
    padding: 2,
    fontWeight: "bold",
    color: "orange"
  },
  input: {
    height: 120,    
    width: 260,
    backgroundColor: 'rgba(0,0,0,0.7)',
   // backgroundColor: 'black',
    //marginBottom: 12,
    color: '#FFF',
  
 
    fontSize: 17,
    borderRadius: 22,
    paddingHorizontal: 10,
    marginTop: 5
          },
});

const mapStateToProps = state => {
  return {

    userinfo: state.sqso.userInfo
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VariosModales);
