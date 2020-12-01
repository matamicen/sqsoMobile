import React, { Fragment } from 'react';
import { Image, Platform, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
// import Advertisement from "semantic-ui-react/dist/commonjs/views/Advertisement";
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import NewsFeedPresentational from './NewsFeedPresentational';

class QSODetail extends React.PureComponent {
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
    eventId: null,
    active: true,
    showModal: false,
    adActive: false,
    idqso: null,
    adClosed: false,
    qsoError: null
  };

  static getDerivedStateFromProps(props, prevState) {
    if (props.qsoError && prevState.active)
      return {
        qsoError: props.qsoError,
        active: false
      };
    // if (props.qso && prevState.active) {
    //   if (
    //     process.env.NODE_ENV === 'production' &&
    //     !prevState.adClosed &&
    //     props.qraUserData &&
    //     props.qraUserData.account_type &&
    //     props.qraUserData.monthly_qso_views >
    //       props.qraUserData.account_type.web_qso_detail
    //   ) {
    //     return {
    //       adActive: true,
    //       active: false
    //     };
    //   } else if (
    //     process.env.NODE_ENV === 'production' &&
    //     !props.isAuthenticated
    //   )
    //     return {
    //       adActive: true,
    //       active: false
    //     };
    //   else return { active: false };
    // }
    if (!props.qso && !prevState.active) return { active: true };
    // if (
    //   process.env.NODE_ENV === 'production' &&
    //   !prevState.adClosed &&
    //   props.qraUserData &&
    //   props.qraUserData.account_type &&
    //   props.qraUserData.monthly_qso_views >
    //     props.qraUserData.account_type.web_qso_detail
    // ) {
    //   return {
    //     adActive: true
    //   };
    // }
    return null;
  }
  componentDidMount() {
    const { navigation } = this.props;

    let qsoInMemory = navigation.getParam('QSO_GUID', 'NO-ID');
    console.log('QSODetail' + qsoInMemory);

    if (
      (!this.props.FetchingQSO && !this.props.QSOFetched) ||
      (this.props.QSOFetched &&
        this.props.navigation.getParam('QSO_GUID', 'NO-ID') !== qsoInMemory)
    ) {
      this.props.actions.doRequestQSO();
      this.props.actions.doFetchQSO(
        this.props.navigation.getParam('QSO_GUID', 'NO-ID'),
        this.props.token
      );
      this.setState({
        idqso: this.props.navigation.getParam('QSO_GUID', 'NO-ID')
      });
    }

    //Comentado Adsense
    // window.googletag.cmd.push(function() {
    //   window.googletag.destroySlots();
    //   window.googletag
    //     .defineSlot(
    //       '/22031658057/qsoDetail/qsoDetail_left',
    //       [160, 600],
    //       'div-ads-instance-qsoDetail-left'
    //     )
    //     .addService(window.googletag.pubads());
    //   window.googletag
    //     .defineSlot(
    //       '/22031658057/qsoDetail/qsoDetail_right',
    //       [160, 600],
    //       'div-ads-instance-qsoDetail-right'
    //     )
    //     .addService(window.googletag.pubads());
    //   window.googletag.pubads().enableSingleRequest();
    //   window.googletag.enableServices();
    // });
  }

  render() {
    let error;
    switch (this.state.qsoError) {
      case 'QSO does not exist':
        error = I18n.t('qso.notExist');
        break;
      case 'This QSO was deleted and cannot be displayed':
        error = I18n.t('qso.postDeleted');
        break;
      default:
        error = this.state.qsoError;
    }
    // if (this.state.qsoError) {
    //   return (
    //     <Modal
    //       open={this.state.qsoError ? true : false}
    //       onClose={() => {
    //         this.setState({ qsoError: null });
    //         // this.props.history.push('/');
    //       }}
    //       size="small">
    //       <Modal.Content>
    //         <Text>{error}</Text>
    //       </Modal.Content>
    //     </Modal>
    //   );
    // }

    let qsos = [];
    if (this.props.qso) {
      qsos.push({ qso: this.props.qso, type: this.props.qso.type });
    }

    return (
      <Fragment>
        {this.props.qso && (
          <NewsFeedPresentational feedType="DETAIL" list={qsos} />
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  qsoError: state.sqso.feed.qsoError,
  qso: state.sqso.feed.qso,
  FetchingQSO: state.sqso.feed.FetchingQSO,
  QSOFetched: state.sqso.feed.QSOFetched,
  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(QSODetail)
);
