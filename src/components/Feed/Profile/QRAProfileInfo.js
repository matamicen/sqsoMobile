import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button,Divider } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import I18n from '../../../utils/i18n';
// const options = [
//   { key: "Y", text: "Yes", value: "1" },
//   { key: "N", text: "No", value: "0" }
// ];
class QRAProfileInfo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      qra: {
        firstname: this.props.qraInfo.firstname,
        lastname: this.props.qraInfo.lastname,
        email: this.props.qraInfo.email,
        mobile: this.props.qraInfo.mobile,
        birthday: this.props.qraInfo.birthday,
        address: this.props.qraInfo.address,
        address2: this.props.qraInfo.address2,
        city: this.props.qraInfo.city,
        state: this.props.qraInfo.state,
        zipcode: this.props.qraInfo.zipcode,
        country: this.props.qraInfo.country,
        cqzone: this.props.qraInfo.cqzone,
        ituzone: this.props.qraInfo.ituzone,
        gridlocator: this.props.qraInfo.gridlocator,
        iotadesignator: this.props.qraInfo.iotadesignator,
        licenseclass: this.props.qraInfo.licenseclass,
        qslinfo: this.props.qraInfo.qslinfo,
        eqsl: this.props.qraInfo.eqsl,
        lotw: this.props.qraInfo.lotw,
        mailqsl: this.props.qraInfo.mailqsl
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.qraInfo !== prevProps.qraInfo)
      this.setState({ qra: this.props.qra });
  }
  // handleOnSaveInfo = (e) => {
  //   this.props.actions.doSaveUserInfo(this.props.token, this.state.qra);
  // };
  changeHandler = (e, { name, value }) => {
    this.setState({
      qra: {
        ...this.state.qra,
        [name]: value
      }
    });
  };
  render() {
    let {
      firstname,
      lastname,
      email,
      // mobile,
      city,
      birthday,
      zipcode,
      country,
      state,
      address,
      address2,
      cqzone,
      ituzone,
      gridlocator,
      iotadesignator,
      licenseclass,
      qslinfo,
      phone
      // eqsl,
      // lotw,
      // mailqsl
    } = this.props.qraInfo;
    email = this.props.qraInfo.email;

    return (
      <ScrollView>
        {this.props.currentQRA === this.props.qraInfo.qra && (
          <View>
            <Button
              onPress={() => {
                this.props.navigation.push('qraInfoEdit');

                // this.props.navigation.dispatch(
                //   NavigationActions.navigate({
                //     index: 0,
                //     actions: [NavigationActions.navigate({ routeName: 'Home' })]
                //   })
                // );
              }}
              title={I18n.t('qra.editInfo')}
            />
          </View>
        )}

        <View style={{marginLeft: 15}}>
     
          <Text style={{fontSize:25, fontWeight: 'bold', color: '#777', marginTop: 15}}>{I18n.t('qra.personalData')}</Text>
          <Text style={styles.text}>
            {I18n.t('qra.firstName')}
          </Text>
          <Text style={styles.textDesc}>
           {firstname}
          </Text>
          <Text style={styles.text}>
            {I18n.t('qra.lastName')}
          </Text>
          <Text style={styles.textDesc}>
            {lastname}
          </Text>
          { (!this.props.userinfo.pendingVerification) &&
          <View>
          <Text style={styles.text}>{I18n.t('qra.email')}</Text>
  
          <Text style={styles.textDesc}>{email}</Text>
          </View>
          }
          {/* <Text style={styles.text}>
            {I18n.t('qra.birthday')}
          </Text>
          <Text style={styles.textDesc}>{new Date(birthday).toISOString().substring(0, 10)}</Text> */}


          <Divider style={{ backgroundColor: '#222', marginRight: 15 }} />
          <Text style={{fontSize:25, fontWeight: 'bold', color: '#777', marginTop: 15}}>{I18n.t('qra.locationData')}</Text>

          {(address != null) && 
          <View>
              <Text style={styles.text}>
              {I18n.t('qra.addressLine1')}
              </Text>
              <Text style={styles.textDesc}>{address}</Text>
          </View>
          }
          {(address2 != null) && 
          <View>
          <Text style={styles.text}>
            {I18n.t('qra.addressLine2')}
          </Text>
          <Text style={styles.textDesc}>{address2}</Text>
          </View>
          }
          {(city != null) && 
            <View>
              <Text style={styles.text}>{I18n.t('qra.city')}</Text>
              <Text style={styles.textDesc}>{city}</Text>
            </View>
          }
          {(state != null) && 
          <View>
            <Text style={styles.text}>{I18n.t('qra.state')}</Text>
            <Text style={styles.textDesc}>{state}</Text>
          </View>            
          }
          {(zipcode != null) &&
          <View>
            <Text style={styles.text}>
              {I18n.t('qra.zipCode')}
            </Text>
            <Text style={styles.textDesc}>
              {zipcode}
            </Text>
          </View>
          }
          {(country != null) &&
            <View>
              <Text style={styles.text}>
                {I18n.t('qra.country')}
              </Text>
              <Text style={styles.textDesc}>
                {country}
              </Text>
            </View>
          }


        <Divider style={{ backgroundColor: '#222', marginRight: 15 }} />
        <Text style={{fontSize:25, fontWeight: 'bold', color: '#777', marginTop: 15}}>{I18n.t('qra.moreData')}</Text>


          {(cqzone != null) &&
            <View>
              <Text style={styles.text}>
                {I18n.t('qra.cqZone')}
              </Text>
              <Text style={styles.textDesc}>
                {cqzone}
              </Text>
            </View>
          }
          {(ituzone != null) &&
            <View>
              <Text style={styles.text}>
                {I18n.t('qra.ituZone')}
              </Text>
              <Text style={styles.textDesc}>
                {ituzone}
              </Text>
            </View>
          }
          {(gridlocator != null) &&
            <View>
              <Text style={styles.text}>
                {I18n.t('qra.gridLocator')}
              </Text>
              <Text style={styles.textDesc}>
                {gridlocator}
              </Text>
            </View>
          }
          {(licenseclass != null) &&
            <View>
              <Text style={styles.text}>
                {I18n.t('qra.licenseClass')}
              </Text>
              <Text style={styles.textDesc}>
                {licenseclass}
              </Text>
            </View>
          }
          {(iotadesignator != null) &&
            <View>
              <Text style={styles.text}>
                {I18n.t('qra.iotaDesignator')}
              </Text>
              <Text style={styles.textDesc}>
                {iotadesignator}
              </Text>
            </View>
          }
          {(qslinfo != null) &&
            <View>
              <Text style={styles.text}>
                {I18n.t('qra.qsoInfo')}
              </Text>
              <Text style={styles.textDesc}>
                {qslinfo}
              </Text>
            </View>
          }
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  text: { fontSize: 15, marginLeft: 2, color: '#444', marginTop: 8 },
  textDesc: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 25,
    marginBottom: 8 
  }
});
const mapStateToProps = (state, ownProps) => ({
  qraInfo: state.sqso.feed.qra.qra,
  currentQRA: state.sqso.qra,
  env: state.sqso.env,
  qra: state.sqso.feed.qra,
  userinfo: state.sqso.userInfo,
  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(QRAProfileInfo)
);
// export default connect(mapStateToProps, mapDispatchToProps, null, {
//   pure: false
// })(QRAProfileInfo);
