import AsyncStorage from '@react-native-community/async-storage';
import queryString from 'query-string';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import React from 'react';
import { AppState, Alert, BackHandler, Linking, Platform } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import ShareMenu from 'react-native-share-menu';
import NewsFeed from './NewsFeedContainer';
import Toast from 'react-native-root-toast';
import { Auth } from 'aws-amplify';
import moment from 'moment';
import analytics from '@react-native-firebase/analytics';
import { _ } from 'lodash';
class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      adActive: true,
      active: true,
      modalOpen: null,
      qsos: [],
      error: null
      // videoAlreadyDisplayed: false
    };
    this.backHandler = null;
  }

  handleDynamicLink(link) {
    console.log('handleDynamicLink', link);
    const parsed = queryString.parseUrl(link.url);
    console.log('parsed2');
    console.log(parsed);
    console.log(Object.keys(parsed.query));
    switch (Object.keys(parsed.query)[0]) {
      case 'QRA':
        this.props.navigation.push('QRAProfile', {
          qra: parsed.query.QRA,
          screen: 'PROFILE'
        });
        break;
      case 'QSO':
        this.props.navigation.navigate('QSODetail', {
          QSO_GUID: parsed.query.QSO
        });
        break;
      case 'ExploreUsers':
        this.props.navigation.navigate('ExploreUsers');
        break;
      case 'Activities':
        this.props.navigation.navigate('FieldDays');
        break;
      default:
        this.props.navigation.navigate('Notifications');
    }
    // console.log('qra: ', qra);
    // Handle dynamic link inside your own application
  }


  
  
  async componentDidMount() {
    await Linking.addEventListener('url', (e) => {
      try {
        console.log(e.url);
        if (e.url) {
          let parsed = queryString.parseUrl(e.url);
          console.log('Linkingparsed');
          console.log(parsed.query.link);
          parsed = queryString.parseUrl(parsed.query.link);
          console.log('linkParsedAgain');
          console.log(parsed);

          if (!__DEV__) analytics().logEvent('pushpress_APPPRD');

          // console.log(Object.keys(parsed.query).link);
          switch (Object.keys(parsed.query)[0]) {
            case 'QRA':
              this.props.navigation.push('QRAProfile', {
                qra: parsed.query.QRA,
                screen: 'PROFILE'
              });
              break;
            case 'QSO':
              this.props.navigation.navigate('QSODetail', {
                QSO_GUID: parsed.query.QSO
              });
              break;
            case 'ExploreUsers':
              this.props.navigation.navigate('ExploreUsers');
              break;
            case 'Activities':
              this.props.navigation.navigate('FieldDays');
              break;
            default:
              this.props.navigation.navigate('Notifications');
          }
        }
      } catch (error) {
        console.log(error);
      }
    });

    // Dynamic Link for ios in killed mode
    if (Platform.OS === 'ios') {
      Linking.getInitialURL().then((res) => {
        console.log('LINKING IOS');
        console.log(res);

        if (!__DEV__) analytics().logEvent('pushpress_APPPRD');

        let parsed = queryString.parseUrl(res);
        console.log('Linkingparsed');
        // console.log(parsed.query.link);
        parsed = queryString.parseUrl(parsed.query.link);
        console.log('linkParsedAgain');
        // console.log(parsed);
        // console.log(Object.keys(parsed.query).link);
        switch (Object.keys(parsed.query)[0]) {
          case 'QRA':
            this.props.navigation.push('QRAProfile', {
              qra: parsed.query.QRA,
              screen: 'PROFILE'
            });
            break;
          case 'QSO':
            this.props.navigation.navigate('QSODetail', {
              QSO_GUID: parsed.query.QSO
            });
            break;
          case 'ExploreUsers':
            this.props.navigation.navigate('ExploreUsers');
            break;
          case 'Activities':
            this.props.navigation.navigate('FieldDays');
            break;
          default:
            this.props.navigation.navigate('Notifications');
        }
      });
    }

    let url = await dynamicLinks().getInitialLink();
    console.log('incoming url', url);
    // PushNotification.onNotification((notification) => {
    this.unsubscribe = await dynamicLinks().onLink(
      (link) => this.handleDynamicLink
    );
    await dynamicLinks().onLink((link) => this.handleDynamicLink);
    await dynamicLinks()
      .getInitialLink()
      .then((link) => {
        console.log('getInitialLink', link);
        if (link) {
          if (!__DEV__) analytics().logEvent('pushpress_APPPRD');

          const parsed = queryString.parseUrl(link.url);
          console.log('getInitialLinkparsed');
          console.log(parsed);
          console.log(Object.keys(parsed.query)[0]);
          switch (Object.keys(parsed.query)[0]) {
            case 'QRA':
              this.props.navigation.push('QRAProfile', {
                qra: parsed.query.QRA,
                screen: 'PROFILE'
              });
              break;
            case 'QSO':
              this.props.navigation.navigate('QSODetail', {
                QSO_GUID: parsed.query.QSO
              });
              break;
            case 'ExploreUsers':
              this.props.navigation.navigate('ExploreUsers');
              break;
            case 'Activities':
              this.props.navigation.navigate('FieldDays');
              break;
            default:
              this.props.navigation.navigate('Notifications');
          }
        }
      });
    this.props.navigation.setParams({
      tabBarOnPress: () => {
        console.log('PRESS HOME! tabBarOnPress');
        // sumo contador de press home para resfrescar el feed solo cuando apreta la segunda vez

        if (this.props.presshome === 1) {
          console.log('press esta en 1 y refresca');

          // cada vez que apreta el INICIO le bajo a 50 el timeout asi se loguea una vez y no dos veces como la primera vez
          // la primera vez tiene un tiemout de 3000 porque hay que darle mas tiempo para asegurar el LOGIN.
          // this.time = 50;
          // await this.props.setWebView(this.props.webviewsession, home);
          this.toast(I18n.t('Refreshing'), 2500);
          this.props.actions.doClearFeed(this.props.publicFeed);
          if (this.props.publicFeed==='REGIONAL' && !this.props.isfetchingregionalfeed) this.props.actions.doFetchRegionalFeed(false,this.props.blockedusers);
          if (this.props.publicFeed==='GLOBAL') this.props.actions.doFetchPublicFeed(false,this.props.blockedusers);
          if (this.props.publicFeed==='FOLLOWING') this.props.actions.doFetchUserFeed(this.props.currentQRA,false,this.props.blockedusers);
          if (this.props.publicFeed==='QAP') this.props.actions.doFetchPublicQAPfeed(false,this.props.blockedusers);

          this.props.actions.doFetchFieldDaysFeed(this.props.blockedusers);
          this.props.actions.doLatestUsersFetch(this.props.currentQRA,this.props.blockedusers);
          //   this.props.setPressHome(0);
        } else {
          console.log('press NO esta en 1 y y lo pone en 1');
          this.props.actions.setPressHome(1);
        }

        // this.props.actions.doFetchPublicFeed(this.props.currentQRA)
      }
    });
    this.props.navigation.setParams({
      tapOnTabNavigator: this.tapOnTabNavigator
    });

    ShareMenu.getSharedText((text) => {
      console.log('el text del share 09:' + JSON.stringify(text));
      if (text !== null && typeof text !== 'undefined') {
        // if (typeof text !== 'undefined') {
        console.log('el text del share 09: ' + text);
        let auxshare1 = JSON.stringify(text);
        let auxshare2 = JSON.parse(auxshare1);
        console.log('auxshare: ' + auxshare2.data);
        AsyncStorage.setItem('shareExternalMedia', auxshare2.data);
        AsyncStorage.setItem('shareExternalMediaMimeType', auxshare2.mimeType);

        this.props.actions.setExternalShreUrl(true);
        this.props.navigation.navigate('QsoScreen');
      }
      // else
      // this.props.setExternalShreUrl(false);
    });
    // if (__DEV__)
    //   this.setState({ adActive: false });
    if (!this.props.isfetchingdofollowfetch)
      this.props.actions.doFollowFetch();

    if (this.props.qsos.length === 0) {
      console.log('entro aca de cabeza!')
      console.log(this.props.blockedusers);
      // this.props.actions.doClearFeed(this.props.publicFeed);
      // if (this.props.publicFeed==='GLOBAL') this.props.actions.doFetchPublicFeed();
      // if (this.props.publicFeed==='FOLLOWING') this.props.actions.doFetchUserFeed(this.props.currentQRA);
      // if (this.props.publicFeed==='QAP') this.props.actions.doFetchPublicQAPfeed();
     

      // el true indica que carge el feed en la variable AUX del store pero que no la copie al FEED 
      // el false es que copie al AUX y que ademas lo ponga en el FEED
      // estos 2 TRUE se hacen para que ya esten pre cargados los feed de SEGUIDOS y QAP para que el switch
      // entre FEEDs se todo en memoria y no tenga que llamar a API. 
      // los IF estan para que no se llamen mas de 1 vez


      if (!this.props.isfetchingregionalfeed)
      this.props.actions.doFetchRegionalFeed(false,this.props.blockedusers);

      if (!this.props.isfetchingpublicfeed)
      this.props.actions.doFetchPublicFeed(true,this.props.blockedusers);

    if (!this.props.isfetchinguserfeed)
      this.props.actions.doFetchUserFeed(this.props.currentQRA,true,this.props.blockedusers);

    if (!this.props.isfetchingQAPfeed)
      this.props.actions.doFetchPublicQAPfeed(true,this.props.blockedusers);
   

        
    //  this.props.actions.doFetchUserFeed(this.props.currentQRA,false);
    //  this.props.actions.doFetchPublicQAPfeed(false);
    


      // if (this.props.publicFeed) this.props.actions.doFetchPublicFeed();
      // else this.props.actions.doFetchUserFeed(this.props.currentQRA);
    if (!this.props.isfetchinggetfielddaysfeed)
        this.props.actions.doFetchFieldDaysFeed(this.props.blockedusers);
    if (!this.props.isfetchinggetlatestusers)
      this.props.actions.doLatestUsersFetch(this.props.currentQRA,this.props.blockedusers);
                                            
    }

    AppState.addEventListener('change', this._handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', this.backAction);



          // se recibe de redux el push recibido que lo envia LOGINFORM, para que el HOME lo tome y navegue, no se navega desde LOGINFORM porque
          // a veces al venir de KILLED la app tarda en cargar y no toma la ruta desde LoginFORM pero si desde aca.

    switch (this.props.urlroute) {
              
      case 'QRAProfile':
        // setTimeout(() => {
        this.props.navigation.push('QRAProfile', {
          qra: this.props.urlparam,
          screen: 'PROFILE'
        });
      // }, 4800);
        break;
      case 'QSODetail':
        // setTimeout(() => {
          console.log('home QSODetail')
          this.props.navigation.navigate('QSODetail', {
            QSO_GUID: this.props.urlparam
          });
        // }, 4800);
        // this.props.setUrlRoute('QSODetail',notification.userInfo.url.param1)
        break;
      case 'ExploreUsers':
        // setTimeout(() => {
          this.props.navigation.navigate('ExploreUsers');
        // }, 4800);
        break;
      case 'Activities':
        // setTimeout(() => {
          this.props.navigation.navigate('FieldDays');
        // }, 4800);
        break;
      default:
        console.log('Nothing');
    }








    // if (this.props.urlroute
    // console.log('test qsodetail hardcode')
    // this.props.navigation.navigate('QSODetail', {
    //   QSO_GUID: 'd37aaab1-aee8-4b91-8dad-d329b00a020d'
    // });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);

    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    dynamicLinks().onLink((link) => this.handleDynamicLink);
  }

  tapOnTabNavigator = async () => {
    console.log('PRESS HOME! tapOnTabNavigator');
    console.log(this.props.publicFeed)
    // sumo contador de press home para resfrescar el feed solo cuando apreta la segunda vez
    // this.props.actions.setSearchedResults([]);
    if (this.props.presshome === 1) {
      // si estaba en SEARCH y refresca debe salir del modo SEARCH
      this.props.actions.setSearchedResults([],false);
      this.toast(I18n.t('Refreshing'), 2500);

      this.props.actions.doClearFeed(this.props.publicFeed);
      if (this.props.publicFeed==='REGIONAL' && !this.props.isfetchingregionalfeed) this.props.actions.doFetchRegionalFeed(false,this.props.blockedusers);
      if (this.props.publicFeed==='GLOBAL' && !this.props.isfetchingpublicfeed) this.props.actions.doFetchPublicFeed(false,this.props.blockedusers);
      if (this.props.publicFeed==='FOLLOWING' && !this.props.isfetchinguserfeed) this.props.actions.doFetchUserFeed(this.props.currentQRA,false,this.props.blockedusers);
      if (this.props.publicFeed==='QAP' && !this.props.isfetchingQAPfeed) this.props.actions.doFetchPublicQAPfeed(false,this.props.blockedusers);
      // if (this.props.publicFeed) this.props.actions.doFetchPublicFeed();
      // else this.props.actions.doFetchUserFeed(this.props.currentQRA);
      if (!this.props.isfetchinggetfielddaysfeed)
        this.props.actions.doFetchFieldDaysFeed(this.props.blockedusers);

    if (!this.props.isfetchinggetlatestusers)   
      this.props.actions.doLatestUsersFetch(this.props.currentQRA,this.props.blockedusers);

      //   this.props.setPressHome(0);
    } else {
      this.props.actions.setPressHome(1);
    }
  };

  _handleAppStateChange = async (nextAppState) => {
    console.log('nextState: ' + nextAppState);

    if (nextAppState === 'background') {
      this.timeGoesBackGround = new Date();
    }

    if (nextAppState === 'active') {
      ShareMenu.getSharedText((text) => {
        console.log('el text del share 05:' + JSON.stringify(text));
        // if (text!==null) {
        if (text !== null && typeof text !== 'undefined') {
          console.log('el text del share hay data 05: ' + text);
          auxshare1 = JSON.stringify(text);
          auxshare2 = JSON.parse(auxshare1);
          console.log('auxshare: ' + auxshare2.data);
          AsyncStorage.setItem('shareExternalMedia', auxshare2.data);
          AsyncStorage.setItem(
            'shareExternalMediaMimeType',
            auxshare2.mimeType
          );
          this.props.actions.setExternalShreUrl(true);

          this.props.actions.newqsoactiveFalse();
          this.props.actions.resetQso();

          this.props.navigation.navigate('QsoScreen');
        } else {
          // this.props.setExternalShreUrl(false);
        }
      });

      this.props.actions.apiCheckVersion();

      // actualizo token porque se pudo haber vencido mientras la APP estuvo mucho tiempo en BackGround
      var session = await Auth.currentSession();
      // console.log('PASO POR SIGNIN token: ' + session.idToken.jwtToken);
      this.props.actions.setToken(session.idToken.jwtToken);
      // si viene de background debe traer las ultimas actualizaciones de notificaciones
      // puede venir de background porque el usuario volvio manualmente o porque apreto un PUSH
      console.log('vuelve de background')
      this.props.actions.get_notifications(session.idToken.jwtToken,this.props.blockedusers);

      // llamo a getuserInfo solo si el usuario no esa validado
      console.log(
        'pendingValidation:' + this.props.userinfo.pendingVerification
      );

      if (this.props.userinfo.pendingVerification)
      this.props.actions.getUserInfoBackGround(session.idToken.jwtToken); // se usa este porque el getUserInfo explotaba los feeds no se porque 
        // this.props.actions.getUserInfo(session.idToken.jwtToken);
     

      // // refresh feed ? it depends the seconds in background
      // console.log('timeGoesBackGround: ' + this.timeGoesBackGround);

      // console.log('dif: ' + moment().diff(this.timeGoesBackGround, 'minutes'));
      var dif = moment().diff(this.timeGoesBackGround, 'minutes');
      if (dif > 15) {
        // if (1===1) {
        console.log('more than 15 minutes it refreshs');
        this.props.actions.setTabToGlobal(true); 


        this.props.actions.doClearFeed(this.props.publicFeed);
        if (this.props.publicFeed==='REGIONAL' && !this.props.isfetchingregionalfeed) this.props.actions.doFetchRegionalFeed(false,this.props.blockedusers);
        if (this.props.publicFeed==='GLOBAL') this.props.actions.doFetchPublicFeed(false,this.props.blockedusers);
        if (this.props.publicFeed==='FOLLOWING') this.props.actions.doFetchUserFeed(this.props.currentQRA,false,this.props.blockedusers);
        if (this.props.publicFeed==='QAP') this.props.actions.doFetchPublicQAPfeed(false,this.props.blockedusers);
        // if (this.props.publicFeed) this.props.actions.doFetchPublicFeed();
        // else this.props.actions.doFetchUserFeed(this.props.currentQRA);

        this.props.actions.doFetchFieldDaysFeed(this.props.blockedusers);
        this.props.actions.doLatestUsersFetch(this.props.currentQRA,this.props.blockedusers);
      }
    }
  };

  static getDerivedStateFromProps(props, state) {
    console.log('getderived home:')
    if (props.qsos.length > 0) return { active: false, qsos: props.qsos };
    else if (props.qsos.length === 0) return { active: true };
  }

  backAction = () => {
    if (!this.props.navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    } else {
      console.log(this.props.searchedResults);
      if (!_.isEmpty(this.props.searchedResults)) {
        console.log('search is not empty -> clear search');
        // this.props.actions.setSearchedResults([]);
        return false;
      } else {
        Alert.alert(
          I18n.t('BACKBUTTONANDROIDTITLE'),
          I18n.t('BACKBUTTONANDROID'),
          [
            {
              text: I18n.t('BACKBUTTONANDROIDCANCEL'),
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            {
              text: I18n.t('BACKBUTTONANDROIDEXIT'),
              onPress: () => BackHandler.exitApp()
            }
          ],
          {
            cancelable: false
          }
        );
        return true;
      }
    }
  };

  toast = async (message, timer) => {
    // Add a Toast on screen.
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      }
    });

    // Toast.hide(toast);
    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    setTimeout(function () {
      Toast.hide(toast);
    }, timer);
  };
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.qsos.length > 0)
  //     this.setState({ qsos: this.props.qsos, active: false });
  //   // else if (props.qsos.length === 0) return { active: true };
  // }
  render() {
   console.log('parametros: ') 
   console.log(this.props.navigation.state.params)
   if (this.props.navigation.state.params!==undefined)
   {
     const { p1, p2, p3 } = this.props.navigation.state.params;
   console.log('p1:'+p1) 
   if (p1==='BlockUser') {
     // The user Block a user, so it has bo load everything again in order to filter
     // that block User


     this.props.navigation.setParams({p1: null}); // reset the param

     // el timeout le da tiempo a que el parametro lo ponga en null y en el proximo render no llame 
     // otra vez a las APIs

          setTimeout(() => {
            console.log('block list:')
            console.log(this.props.blockedusers)

            this.props.actions.doClearFeed();



            if (!this.props.isfetchingregionalfeed)
            this.props.actions.doFetchRegionalFeed(false,this.props.blockedusers);

            if (!this.props.isfetchingpublicfeed)
     this.props.actions.doFetchPublicFeed(true,this.props.blockedusers);

   if (!this.props.isfetchinguserfeed)
     this.props.actions.doFetchUserFeed(this.props.currentQRA,true,this.props.blockedusers);

   if (!this.props.isfetchingQAPfeed)
     this.props.actions.doFetchPublicQAPfeed(true,this.props.blockedusers);

   if (!this.props.isfetchinggetfielddaysfeed)
       this.props.actions.doFetchFieldDaysFeed(this.props.blockedusers);
   if (!this.props.isfetchinggetlatestusers)
     this.props.actions.doLatestUsersFetch(this.props.currentQRA,this.props.blockedusers);

    //  if (!this.props.isfetchingdofollowfetch)
    //  this.props.actions.doFollowFetch();

    // traigo los followers de nuevo porque tuvo que dejar de seguir al usuario bloqueado
    // this.props.actions.doFollowQRA(this.props.token, idqra);
    // this.props.actions.doFollowFetch();

    // para que traiga los followers y following actualizados
    this.props.actions.getUserInfo(this.props.token);


          }, 2000);
     

      }
  }
  //  ?
  //     console.log(this.props.navigation.state.params.p1)
  //     :
  //     console.log('p1 esta vacio')
    // if (this.props.qsos.length > 0) {
    return <NewsFeed />;
    // } else
    //   return (
    //     <View style={{ flex: 1 }}>
    //       <ActivityIndicator size="large" color="#00ff00" />
    //     </View>
    //   );
  }
}

const mapStateToProps = (state) => ({
  FetchingQSOS: state.sqso.feed.FetchingQSOS,
  qsosFetched: state.sqso.feed.qsosFetched,
  //   authenticating: state.sqso.feeduserData.authenticating,
  userinfo: state.sqso.userInfo,
  currentQRA: state.sqso.qra,
  publicFeed: state.sqso.feed.publicFeed,
  token: state.sqso.jwtToken,
  qsos: state.sqso.feed.qsos,
  presshome: state.sqso.pressHome,
  searchedResults: state.sqso.feed.searchedResults,
  urlroute: state.sqso.urlRoute,
  urlparam: state.sqso.urlParam,
  isfetchingpublicfeed:state.sqso.isFetchingPublicFeed,
  isfetchingregionalfeed:state.sqso.isFetchingRegionalFeed,
  isfetchinguserfeed:state.sqso.isFetchingUserFeed,
  isfetchingQAPfeed: state.sqso.isFetchingQAPFeed,
  isfetchingdofollowfetch: state.sqso.isFetchingdoFollowFetch,
  isfetchinggetfielddaysfeed: state.sqso.isFetchinggetFieldDaysFeed,
  isfetchinggetlatestusers: state.sqso.isFetchinggetLatestUsers,
  blockedusers: state.sqso.currentQso.blockedUsers

  
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
