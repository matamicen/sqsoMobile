import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
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
  handleOnSaveInfo = e => {
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
    const { t } = this.props;

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
    this.props.isAuthenticated
      ? (email = this.state.qra.email)
      : (email = t('auth.loginToSeeField'));
    return (
      <Fragment>
        <Segment raised>
          <Form size="large">
            {this.props.isAuthenticated &&
              this.props.currentQRA === this.props.qraInfo.qra && (
                <div>
                  <Button
                    positive
                    fluid
                    size="mini"
                    onClick={() => this.setState({ edit: true })}
                  >
                    {t('qra.editInfo')}
                  </Button>
                </div>
              )}

            <Form.Input
              inline
              transparent
              name="firstname"
              label={t('qra.firstName')}
              value={firstname ? firstname : ''}
            />
            <Form.Input
              inline
              transparent
              name="lastname"
              label={t('qra.lastName')}
              value={lastname ? lastname : ''}
            />

            <Form.Input
              name="email"
              label={t('qra.email')}
              
              transparent
              value={email ? email : ''}
            />
            <Form.Input
              name="birthday"
              label={t('qra.birthday')}
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
              label={t('qra.addressLine1')}

              transparent
              value={address ? address : ''}
            />

            <Form.Input
              name="address2"
              label={t('qra.addressLine2')}
              
              transparent
              value={address2 ? address2 : ''}
            />

            <Form.Input
              name="city"
              label={t('qra.city')}
              inline
              transparent
              value={city ? city : ''}
            />
            <Form.Input
              name="state"
              label={t('qra.state')}
              inline
              transparent
              value={state ? state : ''}
            />
            <Form.Input
              name="zipcode"
              label={t('qra.zipCode')}
              inline
              transparent
              value={zipcode ? zipcode : ''}
            />

            <Form.Input
              inline
              transparent
              name="country"
              label={t('qra.country')}
              value={country ? country : ''}
            />

            <Form.Input
              name="cqzone"
              label={t('qra.cqZone')}
              inline
              transparent
              value={cqzone ? cqzone : ''}
            />
            <Form.Input
              name="ituzone"
              label={t('qra.ituZone')}
              inline
              transparent
              value={ituzone ? ituzone : ''}
            />
            <Form.Input
              name="gridlocator"
              label={t('qra.gridLocator')}
              inline
              transparent
              value={gridlocator ? gridlocator : ''}
            />
            <Form.Input
              name="licenseclass"
              label={t('qra.licenseClass')}
              inline
              transparent
              value={licenseclass ? licenseclass : ''}
            />

            <Form.Input
              name="iotadesignator"
              label={t('qra.iotaDesignator')}
              inline
              transparent
              value={iotadesignator ? iotadesignator : ''}
            />

            <Form.Input
              name="qslinfo"
              label={t('qra.qsoInfo')}
              
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
  currentQRA: state.userData.currentQRA,
  isAuthenticated: state.userData.isAuthenticated,
  token: state.userData.token
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { pure: false }
  )(withTranslation()(QRAProfileInfo))
);
