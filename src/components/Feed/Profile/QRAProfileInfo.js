import React, { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
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
  handleOnSaveInfo = (e) => {
    this.props.actions.doSaveUserInfo(this.props.token, this.state.qra);
    this.close();
  };
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
      qslinfo
      // eqsl,
      // lotw,
      // mailqsl
    } = this.state.qra;
    email = this.state.qra.email;

    return (
      <Fragment>
        <View>
          {this.props.currentQRA === this.props.qraInfo.qra && (
            <View>
              <Button
                onPress={() => this.props.navigation.push('QRAProfileInfoEdit')}
                title={I18n.t('qra.editInfo')}
              />
            </View>
          )}

          <View>
            <Text style={styles.text}>
              {I18n.t('qra.firstName') + ': ' + firstname}
            </Text>
            <Text style={styles.text}>
              {I18n.t('qra.lastName') + ': ' + lastname}
            </Text>
            <Text style={styles.text}>
              {I18n.t('qra.email') + ': ' + email}
            </Text>
            <Text style={styles.text}>
              {I18n.t('qra.birthday') +
                ': ' +
                new Date(birthday).toISOString().substring(0, 10)}
            </Text>
            <Text style={styles.text}>
              {I18n.t('qra.addressLine1') + ': ' + address}
            </Text>
            <Text style={styles.text}>
              {I18n.t('qra.addressLine2') + ': ' + address2}
            </Text>
            <Text style={styles.text}>{I18n.t('qra.city') + ': ' + city}</Text>
            <Text style={styles.text}>
              {I18n.t('qra.state') + ': ' + state}
            </Text>
            <Text style={styles.text}>
              {I18n.t('qra.zipCode') + ': ' + zipcode}
            </Text>
            <Text style={styles.text}>
              {I18n.t('qra.country') + ': ' + country}
            </Text>
            <Text style={styles.text}>
              {I18n.t('qra.cqZone') + ': ' + cqzone}
            </Text>
            <Text style={styles.text}>
              {I18n.t('qra.ituZone') + ': ' + ituzone}
            </Text>
            <Text style={styles.text}>
              {I18n.t('qra.gridLocator') + ': ' + gridlocator}
            </Text>
            <Text style={styles.text}>
              {I18n.t('qra.licenseClass') + ': ' + licenseclass}
            </Text>
            <Text style={styles.text}>
              {I18n.t('qra.iotaDesignator') + ': ' + iotadesignator}
            </Text>
            <Text style={styles.text}>
              {I18n.t('qra.qsoInfo') + ': ' + qslinfo}
            </Text>
          </View>
        </View>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  text: { fontSize: 15, marginBottom: 8, marginLeft: 2 }
});
const mapStateToProps = (state, ownProps) => ({
  //state: state,
  currentQRA: state.sqso.qra,
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
