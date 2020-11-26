import React from 'react';
import { Image, Platform, Text, View, AppState } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import NewsFeed from './NewsFeedContainer';
import ShareMenu from 'react-native-share-menu';
import AsyncStorage from '@react-native-community/async-storage';
class Home extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: ' ',
    // 50
    tabBarIcon: ({ tintColor }) => {
      // return (<View style={{width: 50, height: 20,marginTop: (Platform.OS==='ios') ? 6 : 7,backgroundColor:'yellow'}}>
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{
              width: 28,
              height: 28,
              marginLeft: 5,
              marginTop: Platform.OS === 'ios' ? 24 : 28
            }}
            //  style={{ width: 28, height: 28, marginLeft: 18 }}

            source={require('../../images/home4.png')}
            // />
          />
          {/* <Text style={{fontSize:9, marginTop: 3, marginLeft: 19}}>{I18n.t("HomeTitle")}12345678</Text> */}
          <Text style={{ fontSize: 9, marginTop: 3, marginLeft: 5 }}>
            {I18n.t('HomeTitle')}
          </Text>
        </View>
      );
    }
  };
  state = {
    adActive: true,
    active: true,
    modalOpen: null,
    qsos: [],
    error: null
    // videoAlreadyDisplayed: false
  };
  componentDidMount() {

    ShareMenu.getSharedText((text) => {
      console.log('el text del share 09:'+JSON.stringify(text) )
       if (text!==null && (typeof text !== 'undefined')) {
        // if (typeof text !== 'undefined') {
        console.log('el text del share 09: '+ text)
        auxshare1 = JSON.stringify(text);
        auxshare2 = JSON.parse(auxshare1);
        console.log('auxshare: ' + auxshare2.data)
        AsyncStorage.setItem('shareExternalMedia', auxshare2.data);
        AsyncStorage.setItem('shareExternalMediaMimeType', auxshare2.mimeType);
       
        this.props.actions.setExternalShreUrl(true);
        this.props.navigation.navigate("QsoScreen");
        
      }
      // else
      // this.props.setExternalShreUrl(false);
    })
    // if (__DEV__)
    //   this.setState({ adActive: false });
    this.props.actions.doFollowFetch();
    if (this.props.qsos.length === 0) {
      // this.props.actions.doFetchUserFeed(
      //   this.props.token,
      //   this.props.currentQRA
      // );
      this.props.actions.doFetchPublicFeed(this.props.currentQRA);
    }

    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = async nextAppState => {

  if (nextAppState === "active") {

    ShareMenu.getSharedText((text) => {
    console.log('el text del share 05:'+JSON.stringify(text) )

// if (text!==null) {
  if (text!==null && (typeof text !== 'undefined')) {
 
  console.log('el text del share hay data 05: '+ text)
  auxshare1 = JSON.stringify(text);
  auxshare2 = JSON.parse(auxshare1);
  console.log('auxshare: ' + auxshare2.data)
  AsyncStorage.setItem('shareExternalMedia', auxshare2.data);
  AsyncStorage.setItem('shareExternalMediaMimeType', auxshare2.mimeType);
  this.props.actions.setExternalShreUrl(true);

        this.props.actions.newqsoactiveFalse();
        this.props.actions.resetQso();
       

       this.props.navigation.navigate("QsoScreen");
 


}else
{

// this.props.setExternalShreUrl(false);

}

})
  }
}

  static getDerivedStateFromProps(props, state) {
    if (props.qsos.length > 0) return { active: false, qsos: props.qsos };
    else if (props.qsos.length === 0) return { active: true };
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.qsos.length > 0)
  //     this.setState({ qsos: this.props.qsos, active: false });
  //   // else if (props.qsos.length === 0) return { active: true };
  // }
  render() {
    if (this.props.qsos.length > 0) {
      return <NewsFeed />;
    }
    return null;
  }
}

const mapStateToProps = (state) => ({
  FetchingQSOS: state.sqso.feed.FetchingQSOS,
  qsosFetched: state.sqso.feed.qsosFetched,
  //   authenticating: state.sqso.feeduserData.authenticating,
  currentQRA: state.sqso.qra,

  token: state.sqso.jwtToken,
  qsos: state.sqso.feed.qsos
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
