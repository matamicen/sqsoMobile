import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Overlay, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation, NavigationActions } from 'react-navigation';
import * as Actions from '../../../actions';
import I18n from '../../../utils/i18n';
class ProfileMenu extends React.PureComponent {
  constructor(props) {
    super(props);
   
  }
  state = {
    showModal: false,
    showBlockModal: false,
    blocked: false
  };


  render() {

    if (
      this.props.currentQRA === 'LU2ACH' ||
      this.props.currentQRA === 'TSMM1' ||
      this.props.currentQRA === 'TSLL'
    )
      return (
        <View>
          <Icon
            size={30}
            name="ellipsis-v"
            type="font-awesome"
            onPress={() => this.setState({ showModal: true })}
          />
          <Overlay
            animationType="slide"
            isVisible={this.state.showModal}
            onBackdropPress={() => this.setState({ showModal: false })}
            backdropStyle={{ opacity: 1 }}
            width="auto"
            height="auto"
            borderRadius={8}
            overlayStyle={{
              position: 'absolute',
              flex: 1,
              top: 50,
              // bottom: 50,
              width: '80%'
              // maxHeight: '80%'
            }}>
            <View style={{ flex: 1, width: '100%' }}>
              {/* <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'center' }}> */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <View style={{ width: '80%' }}>
                  <Text style={{ fontSize: 18, textAlign: 'center' }}>
                    {I18n.t('qra.optionsMenu')}
                  </Text>
                </View>
                <View style={styles.iconView}>
                  <Icon
                    name="close"
                    type="font-awesome"
                    onPress={() => this.setState({ showModal: false })}
                  />
                </View>
              </View>
              <ScrollView>
                {this.props.qraInfo &&
                  this.props.qraInfo.qra.pendingVerification ? (
                    <Button
                      // fluid
                      size="medium"
                      onPress={() => {
                        this.props.actions.doValidateUser(
                          this.props.qraInfo.qra.qra
                        );
                      }}
                      title={I18n.t('qra.approveUser')}
                    />
                  )
                  :
                  <Text style={{ fontSize: 18, textAlign: 'center' }}>
                      Usuario ya aprobado!
                   </Text>
                  
                  }
              </ScrollView>
            </View>
          </Overlay>
        </View>
      );
    else // here is the blockUser menu
    return (
      <View>
        <Icon
          size={32}
          name="ellipsis-v"
          type="font-awesome"
          onPress={() => this.setState({ showBlockModal: true })}
        />
        <Overlay
          animationType="slide"
          isVisible={this.state.showBlockModal}
          onBackdropPress={() => {
                 this.setState({ showBlockModal: false })
                 if (this.state.blocked) // es porque lo Bloqueo y debe salir del perfil bloqueado
                 this.props.navigation.navigate(
                   'Home',
                   {p1 : 'BlockUser'},
                 );
                 
          }
        }
          backdropStyle={{ opacity: 1 }}
          width="auto"
          height="auto"
          borderRadius={8}
          overlayStyle={{
            position: 'absolute',
            flex: 1,
            top: 50,
            // bottom: 50,
            width: '80%'
            // maxHeight: '80%'
          }}>
          <View style={{ flex: 1, width: '100%' }}>
            {/* <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'center' }}> */}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <View style={{ width: '80%' }}>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>
                  {I18n.t('qra.blockMenu')} {this.props.qraInfo && 
                  this.props.qraInfo.qra.qra}
                </Text>
              </View>
              <View style={styles.iconView}>
                <Icon
                  name="close"
                  type="font-awesome"
                  onPress={() => {
                    // console.log(this.props.blockedusers)
                    this.setState({ showBlockModal: false })
                     if (this.state.blocked) // es porque lo Bloqueo y debe salir del perfil bloqueado
                      this.props.navigation.navigate(
                        'Home',
                        {p1 : 'BlockUser'},
                      );
  

                  }
                
                
                }
                />
              </View>
            </View>
            <ScrollView>
           
            <Text style={{fontSize: 16}}> 
            {"\n"}
                {I18n.t('qra.blockMess1')}
               
                {"\n\n"}
                {I18n.t('qra.blockMess2')}
                {"\n"}
                {I18n.t('qra.blockMess3')}
                {"\n"}
             </Text>
             
                  <Button
                    // fluid
                    size="medium"
                    onPress={() => {
                      if (!this.state.blocked) {
                        console.log(this.props.qraInfo.qra)
                        this.props.actions.blockUnblockUser(
                        this.props.qraInfo.qra.qra,'BLOCK',this.props.jwtToken)
                        user = {"blockedbyme": "blockedbyme", "idqra_blocked": this.props.qraInfo.qra.idqras, "profilepic": this.props.qraInfo.qra.profilepic}
                        this.props.actions.updateBlockUsers(user,'BLOCK')
                        this.setState({blocked: true})
                        
                       
                      
                      }
                      else
                      {
                      this.props.actions.blockUnblockUser(this.props.qraInfo.qra.qra,'UNBLOCK',this.props.jwtToken)
                      user = {"idqra_unblock": this.props.qraInfo.qra.idqras}
                      this.props.actions.updateBlockUsers(user,'UNBLOCK')
                      this.setState({blocked: false})
                    }
                  }
                  }
                    title={!this.state.blocked ? I18n.t('qra.blockUser') : I18n.t('qra.UnblockUser')}
                  />
  
                

            </ScrollView>
          </View>
        </Overlay>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemsView: {
    marginTop: 10,
    flex: 1
    // // flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start'
  },

  iconView: {
    flex: 1,
    width: '20%'
    // width: 20,
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignSelf: 'flex-end'
  },
  modal: {
    flex: 1,
    marginTop: 100,
    marginBottom: 150,
    marginLeft: 50,
    width: '90%',
    height: 50,
    padding: 10,

    // paddingVertical: 5,
    // alignItems: 'flex-start',
    borderRadius: 12
  },
  text: {
    fontSize: 17
  },
  view: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  container: {
    paddingHorizontal: 5
  }
});

const mapStateToProps = (state, ownProps) => ({
  currentQRA: state.sqso.qra,
  qraInfo: state.sqso.feed.qra,
  env: state.sqso.env,
  blockedusers: state.sqso.currentQso.blockedUsers,
  jwtToken: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ProfileMenu));
