import React from 'react';
import { withTranslation } from 'react-i18next';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import '../../styles/style.css';
import Ad from '../Ad/Ad';
import AppNavigation from '../Home/AppNavigation';
import QRAProfileBio from './QRAProfileBio';
import QRAProfileFollowing from './QRAProfileFollowing';
import QRAProfileHeader from './QRAProfileHeader';
import QRAProfileInfo from './QRAProfileInfo';
import QRAProfileQsos from './QRAProfileQsos';



const QRAProfile = props => {
  const { t } = props;
  return (
    <div className="profile-container">
     
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
          adslot="/22031658057/qraDetail/qraDetail_left"
          width={160}
          height={600}
          id="div-ads-instance-qraDetail-left"
          displayOnly={true}
        />
      </div>
      {!props.active && props.qra && (
        <div className="profile-main">
          <QRAProfileHeader
            qraInfo={props.qraInfo}
            isAuthenticated={props.isAuthenticated}
            following={props.following}
            followers={props.followers}
            userFetched={props.userFetched}
            followed={props.followed}
            onClick={props.onClick}
            currentQRA={props.currentQRA}
          />
          <Segment basic style={{ padding: '0px' }}>
            <div className="profile-buttons">
              <Button
                style={{
                  flex: '1 1 auto',
                  paddingLeft: '1px',
                  paddingRight: '1px'
                }}
                onClick={() => props.handleTabClick(1)}
                active={props.tab === 1 ? true : false}
              >
                {t('qra.qsos')}
              </Button>
              <Button
                style={{
                  flex: '1 1 auto',
                  paddingLeft: '1px',
                  paddingRight: '1px'
                }}
                onClick={() => props.handleTabClick(2)}
                active={props.tab === 2 ? true : false}
              >
                {t('qra.bio')}
              </Button>
              <Button
                style={{
                  flex: '1 1 auto',
                  paddingLeft: '1px',
                  paddingRight: '1px'
                }}
                onClick={() => props.handleTabClick(3)}
                active={props.tab === 3 ? true : false}
              >
                {t('qra.info')}
              </Button>
              <Button
                style={{
                  flex: '1 1 auto',
                  paddingLeft: '1px',
                  paddingRight: '1px'
                }}
                onClick={() => props.handleTabClick(4)}
                active={props.tab === 4 ? true : false}
              >
                {t('qra.following')}
              </Button>
            </div>
          </Segment>
          <div className="profile-detail">
            {/* <Segment> */}
            {
              {
                1: (
                  <QRAProfileQsos
                    qsos={props.qra ? props.qra.qsos : []}
                    fetchingQRA={props.fetchingQRA}
                    QRAFetched={props.QRAFetched}
                  />
                ),
                2: <QRAProfileBio qraInfo={props.qraInfo} />,
                3: <QRAProfileInfo qraInfo={props.qraInfo} />,
                4: (
                  <Segment>
                    <QRAProfileFollowing
                      following={props.qra ? props.qra.following : null}
                    />
                  </Segment>
                )
              }[props.tab]
            }
            {/* </Segment> */}
          </div>
        </div>
      )}
      <div className="site-right">
        <Ad
          adslot="/22031658057/qraDetail/qraDetail_right"
          width={160}
          height={600}
          id="div-ads-instance-qraDetail-right"
          displayOnly={true}
        />
      </div>
    </div>
  );
};

export default withTranslation()(QRAProfile);
