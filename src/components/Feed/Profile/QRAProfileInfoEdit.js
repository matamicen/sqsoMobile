import { useFormik } from 'formik';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import * as Yup from 'yup';
import { MY_COUNTRIES_DATA } from './countries.js';
const QraProfileInfoEdit = props => {
  const { t } = props;
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
      .test('birthDate', t('auth.years13Restriction'), value => {
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
    onSubmit: val => {
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
        onClose={() => props.closeModal()}
      >
        <Header content={t('qra.editInfo')} />
        <Modal.Content>
          <Form>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={t('qra.firstName')}
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
                <div>{formik.errors.firstname}</div>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={t('qra.lastName')}
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
                <div>{formik.errors.lastname}</div>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="date"
                fluid
                iconPosition="left"
                label={t('qra.birthday')}
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
                <div>{formik.errors.birthday}</div>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={t('qra.addressLine1')}
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
                <div>{formik.errors.address}</div>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={t('qra.addressLine2')}
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
                <div>{formik.errors.address2}</div>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={t('qra.city')}
                error={formik.errors.city && Boolean(formik.errors.city)}
                name="city"
                readOnly={false}
                value={formik.values.city}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.city ? <div>{formik.errors.city}</div> : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={t('qra.state')}
                error={formik.errors.state && Boolean(formik.errors.state)}
                name="state"
                readOnly={false}
                value={formik.values.state}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.state ? <div>{formik.errors.state}</div> : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={t('qra.zipCode')}
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
                <div>{formik.errors.zipcode}</div>
              ) : null}
            </Form.Field>
            <Form.Field width={3}>
              <label htmlFor="country">{t('qra.country')}</label>
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
                label={t('qra.cqZone')}
                error={formik.errors.cqzone && Boolean(formik.errors.cqzone)}
                name="cqzone"
                readOnly={false}
                value={formik.values.cqzone}
                onChange={formik.handleChange}
                style={{
                  textTransform: 'uppercase'
                }}
              />{' '}
              {formik.errors.cqzone ? <div>{formik.errors.cqzone}</div> : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={t('qra.ituZone')}
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
                <div>{formik.errors.ituzone}</div>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={t('qra.gridLocator')}
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
                <div>{formik.errors.gridlocator}</div>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={t('qra.licenseClass')}
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
                <div>{formik.errors.licenseclass}</div>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={t('qra.iotaDesignator')}
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
                <div>{formik.errors.iotadesignator}</div>
              ) : null}
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                iconPosition="left"
                label={t('qra.qsoInfo')}
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
                <div>{formik.errors.qslinfo}</div>
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
            content={t('qra.saveInfo')}
            onClick={formik.handleSubmit}
          />
          <Button
            icon="check"
            content={t('global.cancel')}
            onClick={() => props.closeModal()}
          />
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default withTranslation()(QraProfileInfoEdit);
