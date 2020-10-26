import { useFormik } from 'formik';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import * as Yup from 'yup';
import { MY_COUNTRIES_DATA } from './countries.js';
const QraProfileInfoEdit = (props) => {
  const [qra, setQRA] = useState({
    firstname: '',
    lastname: props.qraInfo.lastname,

    mobile: props.qraInfo.mobile,
    birthday: props.qraInfo.birthday,
    address: props.qraInfo.address,
    address2: props.qraInfo.address2,
    city: props.qraInfo.city,
    state: props.qraInfo.state,
    zipcode: props.qraInfo.zipcode,
    country: props.qraInfo.country,
    cqzone: props.qraInfo.cqzone,
    ituzone: props.qraInfo.ituzone,
    gridlocator: props.qraInfo.gridlocator,
    iotadesignator: props.qraInfo.iotadesignator,
    licenseclass: props.qraInfo.licenseclass,
    qslinfo: props.qraInfo.qslinfo,
    eqsl: props.qraInfo.eqsl,
    lotw: props.qraInfo.lotw,
    mailqsl: props.qraInfo.mailqsl
  });
  useEffect(() => {
    setQRA(props.qraInfo);
  }, [props.qraInfo]);
  const validationSchema = Yup.object({
    birthday: Yup.date()
      .required(t('auth.birthDateRequired'))
      .min(new Date(1900, 0, 1))
      .max(new Date())
      .test('birthDate', I18n.t('auth.years13Restriction'), (value) => {
        return moment().diff(moment(value), 'years') >= 13;
      }),
    country: Yup.string().required(),
    firstname: Yup.string().required(t('auth.firstNameRequired')),
    lastname: Yup.string().required(t('auth.lastNameRequired'))
  });
  const formik = useFormik({
    initialValues: {
      firstname: props.qraInfo.firstname,
      lastname: props.qraInfo.lastname,
      mobile: props.qraInfo.mobile,
      birthday: props.qraInfo.birthday,
      address: props.qraInfo.address,
      address2: props.qraInfo.address2,
      city: props.qraInfo.city,
      state: props.qraInfo.state,
      zipcode: props.qraInfo.zipcode,
      country: props.qraInfo.country,
      cqzone: props.qraInfo.cqzone,
      ituzone: props.qraInfo.ituzone,
      gridlocator: props.qraInfo.gridlocator,
      iotadesignator: props.qraInfo.iotadesignator,
      licenseclass: props.qraInfo.licenseclass,
      qslinfo: props.qraInfo.qslinfo,
      eqsl: props.qraInfo.eqsl,
      lotw: props.qraInfo.lotw,
      mailqsl: props.qraInfo.mailqsl
    },
    validationSchema: validationSchema,
    onSubmit: (val) => {
      setQRA({
        ...qra,
        firstname: val.firstname,
        lastname: val.lastname,

        mobile: val.mobile,
        birthday: val.birthday,
        address: val.address,
        address2: val.address2,
        city: val.city,
        state: val.state,
        zipcode: val.zipcode,
        country: val.country,
        cqzone: val.cqzone,
        ituzone: val.ituzone,
        gridlocator: val.gridlocator,
        iotadesignator: val.iotadesignator,
        licenseclass: val.licenseclass,
        qslinfo: val.qslinfo,
        eqsl: val.eqsl,
        lotw: val.lotw,
        mailqsl: val.mailqsl
      });

      props.doSaveUserInfo(props.token, val);
      props.closeModal();
    }
  });

  return (
    <Fragment>
      <Modal
        centered={false}
        size="small"
        open={props.modalOpen}
        closeIcon
        onClose={() => props.closeModal()}>
        <Header content={I18n.t('qra.editInfo')} />
        <Modal.Content>
          <Form>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={I18n.t('qra.firstName')}
                error={
                  formik.errors.firstname && Boolean(formik.errors.firstname)
                }
                name="firstname"
                readOnly={false}
                value={formik.values.firstname}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.firstname ? (
                <View>{formik.errors.firstname}</View>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={I18n.t('qra.lastName')}
                error={
                  formik.errors.lastname && Boolean(formik.errors.lastname)
                }
                name="lastname"
                readOnly={false}
                value={formik.values.lastname}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.lastname ? (
                <View>{formik.errors.lastname}</View>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="date"
                fluid
                iconPosition="left"
                label={I18n.t('qra.birthday')}
                error={
                  formik.errors.birthday && Boolean(formik.errors.birthday)
                }
                name="birthday"
                readOnly={false}
                value={
                  formik.values.birthday
                    ? new Date(formik.values.birthday)
                        .toISOString()
                        .substring(0, 10)
                    : ''
                }
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.birthday ? (
                <View>{formik.errors.birthday}</View>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={I18n.t('qra.addressLine1')}
                error={formik.errors.address && Boolean(formik.errors.address)}
                name="address"
                readOnly={false}
                value={formik.values.address}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.address ? (
                <View>{formik.errors.address}</View>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={I18n.t('qra.addressLine2')}
                error={
                  formik.errors.address2 && Boolean(formik.errors.address2)
                }
                name="address2"
                readOnly={false}
                value={formik.values.address2}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.address2 ? (
                <View>{formik.errors.address2}</View>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={I18n.t('qra.city')}
                error={formik.errors.city && Boolean(formik.errors.city)}
                name="city"
                readOnly={false}
                value={formik.values.city}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.city ? <View>{formik.errors.city}</View> : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={I18n.t('qra.state')}
                error={formik.errors.state && Boolean(formik.errors.state)}
                name="state"
                readOnly={false}
                value={formik.values.state}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.state ? <View>{formik.errors.state}</View> : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={I18n.t('qra.zipCode')}
                error={formik.errors.zipcode && Boolean(formik.errors.zipcode)}
                name="zipcode"
                readOnly={false}
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.zipcode ? (
                <View>{formik.errors.zipcode}</View>
              ) : null}
            </Form.Field>
            <Form.Field width={3}>
              <label htmlFor="country">{I18n.t('qra.country')}</label>
              <Dropdown
                name="country"
                onChange={formik.changeHandler}
                options={MY_COUNTRIES_DATA}
                search
                disabled={false}
                selection
                selectOnBlur={false}
                value={formik.values.country}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={I18n.t('qra.cqZone')}
                error={formik.errors.cqzone && Boolean(formik.errors.cqzone)}
                name="cqzone"
                readOnly={false}
                value={formik.values.cqzone}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.cqzone ? (
                <View>{formik.errors.cqzone}</View>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={I18n.t('qra.ituZone')}
                error={formik.errors.ituzone && Boolean(formik.errors.ituzone)}
                name="ituzone"
                readOnly={false}
                value={formik.values.ituzone}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.ituzone ? (
                <View>{formik.errors.ituzone}</View>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={I18n.t('qra.gridLocator')}
                error={
                  formik.errors.gridlocator &&
                  Boolean(formik.errors.gridlocator)
                }
                name="gridlocator"
                readOnly={false}
                value={formik.values.gridlocator}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.gridlocator ? (
                <View>{formik.errors.gridlocator}</View>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={I18n.t('qra.licenseClass')}
                error={
                  formik.errors.licenseclass &&
                  Boolean(formik.errors.licenseclass)
                }
                name="licenseclass"
                readOnly={false}
                value={formik.values.licenseclass}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.licenseclass ? (
                <View>{formik.errors.licenseclass}</View>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={I18n.t('qra.iotaDesignator')}
                error={
                  formik.errors.iotadesignator &&
                  Boolean(formik.errors.iotadesignator)
                }
                name="iotadesignator"
                readOnly={false}
                value={formik.values.iotadesignator}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.iotadesignator ? (
                <View>{formik.errors.iotadesignator}</View>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={I18n.t('qra.qsoInfo')}
                error={formik.errors.qslinfo && Boolean(formik.errors.qslinfo)}
                name="qslinfo"
                readOnly={false}
                value={formik.values.qslinfo}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.qslinfo ? (
                <View>{formik.errors.qslinfo}</View>
              ) : null}
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="save"
            type="submit"
            labelPosition="right"
            content={I18n.t('qra.saveInfo')}
            onClick={formik.handleSubmit}
          />
          <Button
            icon="check"
            content={I18n.t('global.cancel')}
            onClick={() => props.closeModal()}
          />
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default QraProfileInfoEdit;
