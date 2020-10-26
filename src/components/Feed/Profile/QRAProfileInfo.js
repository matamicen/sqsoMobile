import React, { Fragment } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import * as Actions from '../../actions';
import '../../styles/style.css';
import QRAProfileInfoEdit from './QRAProfileInfoEdit';


// const options = [
//   { key: "Y", text: "Yes", value: "1" },
//   { key: "N", text: "No", value: "0" }
// ];
class QRAProfileInfo extends React.Component {
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

  close = () => this.setState({ edit: false });
  componentDidUpdate(prevProps, prevState) {
    if (this.props.qraInfo !== prevProps.qraInfo)
      this.setState({ qra: this.props.qraInfo });
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
     (email = this.state.qra.email)
      
    return (
      <Fragment>
        <Segment raised>
          <Form size="large">
            {
              this.props.currentQRA === this.props.qraInfo.qra && (
                <View>
                  <Button
                    positive
                    fluid
                    size="mini"
                    onClick={() => this.setState({ edit: true })}>
                    {I18n.t('qra.editInfo')}
                  </Button>
                </View>
              )}

            <Form.Input
              inline
              transparent
              name="firstname"
              label={I18n.t('qra.firstName')}
              value={firstname ? firstname : ''}
            />
            <Form.Input
              inline
              transparent
              name="lastname"
              label={I18n.t('qra.lastName')}
              value={lastname ? lastname : ''}
            />

            <Form.Input
              name="email"
              label={I18n.t('qra.email')}
              transparent
              value={email ? email : ''}
            />
            <Form.Input
              name="birthday"
              label={I18n.t('qra.birthday')}
              type="date"
              inline
              transparent
              value={
                birthday
                  ? new Date(birthday).toISOString().substring(0, 10)
                  : ''
              }
            />

            <Form.Input
              name="address"
              label={I18n.t('qra.addressLine1')}
              transparent
              value={address ? address : ''}
            />

            <Form.Input
              name="address2"
              label={I18n.t('qra.addressLine2')}
              transparent
              value={address2 ? address2 : ''}
            />

            <Form.Input
              name="city"
              label={I18n.t('qra.city')}
              inline
              transparent
              value={city ? city : ''}
            />
            <Form.Input
              name="state"
              label={I18n.t('qra.state')}
              inline
              transparent
              value={state ? state : ''}
            />
            <Form.Input
              name="zipcode"
              label={I18n.t('qra.zipCode')}
              inline
              transparent
              value={zipcode ? zipcode : ''}
            />

            <Form.Input
              inline
              transparent
              name="country"
              label={I18n.t('qra.country')}
              value={country ? country : ''}
            />

            <Form.Input
              name="cqzone"
              label={I18n.t('qra.cqZone')}
              inline
              transparent
              value={cqzone ? cqzone : ''}
            />
            <Form.Input
              name="ituzone"
              label={I18n.t('qra.ituZone')}
              inline
              transparent
              value={ituzone ? ituzone : ''}
            />
            <Form.Input
              name="gridlocator"
              label={I18n.t('qra.gridLocator')}
              inline
              transparent
              value={gridlocator ? gridlocator : ''}
            />
            <Form.Input
              name="licenseclass"
              label={I18n.t('qra.licenseClass')}
              inline
              transparent
              value={licenseclass ? licenseclass : ''}
            />

            <Form.Input
              name="iotadesignator"
              label={I18n.t('qra.iotaDesignator')}
              inline
              transparent
              value={iotadesignator ? iotadesignator : ''}
            />

            <Form.Input
              name="qslinfo"
              label={I18n.t('qra.qsoInfo')}
              transparent
              value={qslinfo ? qslinfo : ''}
            />
          </Form>
        </Segment>
        {this.state.edit && (
          <QRAProfileInfoEdit
            qraInfo={this.props.qraInfo}
            doSaveUserInfo={this.props.actions.doSaveUserInfo}
            modalOpen={this.state.edit}
            closeModal={() => this.setState({ edit: false })}
          />
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  //state: state,
  currentQRA: state.sqso.qra,
,
  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(QRAProfileInfo);
