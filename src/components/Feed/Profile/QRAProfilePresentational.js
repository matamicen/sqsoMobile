import React from 'react';
import { Button } from 'react-native-elements';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import '../../styles/style.css';
import Ad from '../Ad/Ad';
import AppNavigation from '../Home/AppNavigation';
import QRAProfileBio from './QRAProfileBio';
import QRAProfileFollowing from './QRAProfileFollowing';
import QRAProfileHeader from './QRAProfileHeader';
import QRAProfileInfo from './QRAProfileInfo';
import QRAProfileQsos from './QRAProfileQsos';
const QRAProfile = (props) => {
   
  return (
    <View className="profile-container">
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
      <View className="site-header">
        <AppNavigation />
      </View>
      <View className="site-left">
        <Ad
          adslot="/22031658057/qraDetail/qraDetail_left"
          width={160}
          height={600}
          id="div-ads-instance-qraDetail-left"
          displayOnly={true}
        />
      </View>
      {!props.active && props.qra && (
        <View className="profile-main">
          <QRAProfileHeader
            qraInfo={props.qraInfo}
            following={props.following}
            followers={props.followers}
            userFetched={props.userFetched}
            followed={props.followed}
            onClick={props.onClick}
            currentQRA={props.currentQRA}
          />
          <Segment basic style={{ padding: '0px' }}>
            <View className="profile-buttons">
              <Button
                style={{
                  flex: '1 1 auto',
                  paddingLeft: '1px',
                  paddingRight: '1px'
                }}
                onClick={() => props.handleTabClick(1)}
                active={props.tab === 1 ? true : false}>
                {I18n.t('qra.qsos')}
              </Button>
              <Button
                style={{
                  flex: '1 1 auto',
                  paddingLeft: '1px',
                  paddingRight: '1px'
                }}
                onClick={() => props.handleTabClick(2)}
                active={props.tab === 2 ? true : false}>
                {I18n.t('qra.bio')}
              </Button>
              <Button
                style={{
                  flex: '1 1 auto',
                  paddingLeft: '1px',
                  paddingRight: '1px'
                }}
                onClick={() => props.handleTabClick(3)}
                active={props.tab === 3 ? true : false}>
                {I18n.t('qra.info')}
              </Button>
              <Button
                style={{
                  flex: '1 1 auto',
                  paddingLeft: '1px',
                  paddingRight: '1px'
                }}
                onClick={() => props.handleTabClick(4)}
                active={props.tab === 4 ? true : false}>
                {I18n.t('qra.following')}
              </Button>
            </View>
          </Segment>
          <View className="profile-detail">
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
          </View>
        </View>
      )}
      <View className="site-right">
        <Ad
          adslot="/22031658057/qraDetail/qraDetail_right"
          width={160}
          height={600}
          id="div-ads-instance-qraDetail-right"
          displayOnly={true}
        />
      </View>
    </View>
  );
};

export default withTranslation()(QRAProfile);
