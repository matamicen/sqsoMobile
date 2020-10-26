import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import '../../styles/style.css';
import Ad from '../Ad/Ad';
import AppNavigation from '../Home/AppNavigation';
const ExploreUsers = ({
  t,
  active,
  users,
  followed,
  followers,
  following,
  doFollow,
  currentQRA
}) => (
  <div className="profile-container">
    <Dimmer active={active} page>
      <Loader>{I18n.t('qra.loading')}</Loader>
    </Dimmer>
    {/* <Dimmer
      active={props.adActive}
      onClick={props.handleClose}
      page
      // verticalAlign="center"
    >
      <Ad
        adslot="/21799560237/qraDetail/intersitial"
        width={640}
        height={480}
        id="qradetail-intersitial"
        displayOnly={true}
      />
    </Dimmer> */}
    <div className="site-header">
      <AppNavigation />
    </div>
    <div className="site-left">
      <Ad
        adslot="/21799560237/qraDetail/left"
        width={160}
        height={600}
        id="qradetail-left"
        displayOnly={true}
      />
    </div>

    <div className="exploreUsers-main">
      <Header as="h1" attached="top" textAlign="center">
        {I18n.t('navBar.exploreUsers')}
      </Header>

      <Segment>
        <div className="exploreUsers">
          {users.map((qra, i) => {
            if (currentQRA !== qra.qra)
              return (
                <div
                  className="qra"
                  key={qra.qra}
                  // key={i}
                  // style={{
                  //   marginTop: '1em',
                  //   marginLeft: '1em'
                  // }}
                >
                  <Card raised style={{ width: '190px' }}>
                    <Card.Content>
                      <Card.Header>
                        <div
                          key={qra.qra}
                          style={{ display: 'flex', paddingBottom: '10px' }}
                        >
                          <div
                            style={{
                              flex: '0 0 auto',
                              alignSelf: 'center'
                              // justifyContent: 'center',
                              // paddingRigth: '5px'
                            }}
                          >
                            <Link to={'/' + qra.qra}>
                              <Image
                                size="mini"
                                avatar
                                style={{
                                  width: '50px',
                                  height: '50px'
                                }}
                                src={
                                  qra.avatarpic
                                    ? qra.avatarpic
                                    : '/emptyprofile.png'
                                }
                              />
                            </Link>
                          </div>
                          <div
                            style={{
                              flex: '1 1 auto',
                              textAlign: 'center'
                              // paddingRigth: '5px'
                            }}
                          >
                            <Link to={'/' + qra.qra}>
                              <Text style={{ fontSize: '1.5rem' }}>
                                {qra.qra}
                              </Text>
                              <br />
                              <Text style={{ fontSize: '1rem' }}>
                                {qra.firstname ? qra.firstname : ''}
                              </Text>
                              <br />
                              <Text style={{ fontSize: '1rem' }}>
                                {qra.lastname ? qra.lastname : ''}
                              </Text>
                            </Link>
                          </div>
                        </div>
                      </Card.Header>

                      <Card.Description>
                        <div style={{ textAlign: 'center' }}>
                          <Icon name="edit outline" />
                          {qra.qsos_counter} {I18n.t('exploreUsers.qsosCreated')}
                          <br />
                          <Icon name="user" />
                          {qra.followers_counter} {I18n.t('qra.followers')}
                        </div>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div style={{ textAlign: 'center' }}>
                        {following.some(o => o.qra === qra.qra) ||
                        followed.some(o => o === qra.qra) ? (
                          <Button
                            basic
                            color="grey"
                            style={{ paddingLeft: '1em', paddingRight: '1em' }}
                          >
                            {I18n.t('qra.following')}
                          </Button>
                        ) : (
                          <Button
                            positive
                            onClick={() => doFollow(qra.qra)}
                            style={{ paddingLeft: '1em', paddingRight: '1em' }}
                          >
                            {followers.some(o => o.qra === qra.qra)
                              ? I18n.t('qra.followToo')
                              : I18n.t('qra.follow')}
                          </Button>
                        )}
                      </div>
                    </Card.Content>
                  </Card>
                </div>
              );
            else return null;
          })}
        </div>
      </Segment>
    </div>

    <div className="site-right">
      <Ad
        adslot="/21799560237/qraDetail/right"
        width={160}
        height={600}
        id="qradetail-right"
        displayOnly={true}
      />
    </div>
  </div>
);
export default withTranslation()(ExploreUsers);
