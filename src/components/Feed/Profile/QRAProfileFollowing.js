import React from "react";
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import "../../styles/style.css";
import PopupToFollow from "../PopupToFollow";
const QRAProfileFollowing = ({following, t}) => (
  <div className="profile-following">
    {following
      ? following.map((qra, i) => (
          <div className="qra" key={qra.qra}>
            <div className="avatar">
              <Link to={"/" + qra.qra}>
                {qra.avatarpic ? (
                  <Image avatar size="tiny" src={qra.avatarpic} />
                ) : (
                  <Image avatar size="tiny" src="/emptyprofile.png" />
                )}
              </Link>
            </div>
            <div className="qra">
              {" "}
              <PopupToFollow
                qra={qra.qra}
                key={qra.qra}
                trigger={<Link to={"/" + qra.qra}>{qra.qra}</Link>}
              />
            </div>
          </div>
        ))
      : ""}
  </div>
);
export default withTranslation()(QRAProfileFollowing);
