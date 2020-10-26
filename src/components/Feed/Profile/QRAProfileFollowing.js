import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import '../../styles/style.css';
import PopupToFollow from '../PopupToFollow';
const QRAProfileFollowing = ({ following, t }) => (
  <View className="profile-following">
    {following
      ? following.map((qra, i) => (
          <View className="qra" key={qra.qra}>
            <View className="avatar">
              <Link to={'/' + qra.qra}>
                {qra.avatarpic ? (
                  <Image avatar size="tiny" src={qra.avatarpic} />
                ) : (
                  <Image avatar size="tiny" src="/emptyprofile.png" />
                )}
              </Link>
            </View>
            <View className="qra">
              {' '}
              <PopupToFollow
                qra={qra.qra}
                key={qra.qra}
                trigger={<Link to={'/' + qra.qra}>{qra.qra}</Link>}
              />
            </View>
          </View>
        ))
      : ''}
  </View>
);
export default QRAProfileFollowing;
