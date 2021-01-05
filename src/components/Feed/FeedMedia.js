import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import FeedAudioList from './FeedAudioList';
import FeedImage from './FeedImage';
import FeedVideoList from './FeedVideoList';
import './style.js';

class FeedMedia extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      qso: null,
      error: null
    };
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.qso && (JSON.stringify(this.props.qso) !== JSON.stringify(prevProps.qso)))
  //     this.setState({
  //       qso: this.props.qso
  //     });
  // }
  render() {
    let picList = this.props.qso.media.filter(
      (media) => media.type === 'image'
    );

    let audioList = this.props.qso.media.filter(
      (media) => media.type === 'audio'
    );

    let videoList = this.props.qso.media.filter(
      (media) => media.type === 'video'
    );

    return (
      <View>
        {videoList.length > 0 && (
          <View>
            <Divider hidden />
            <FeedVideoList
              feedType={this.props.feedType}
              mediaList={videoList}
              idqsos={this.props.idqsos}
              qso_owner={this.props.qso.qra}
            />
          </View>
        )}
        {picList.length > 0 && (
          <View>
            <Divider hidden />
            <FeedImage
              img={picList}
              idqso={this.props.qso.idqsos}
              qso_owner={this.props.qso.qra}
            />
          </View>
        )}
        {audioList.length > 0 && (
          <View>
            <Divider hidden />
            <FeedAudioList
              mediaList={audioList}
              idqso={this.props.qso.idqsos}
              qso_owner={this.props.qso.qra}
            />
          </View>
        )}
      </View>
    );
  }
}
const selectorFeedType = (state, ownProps) => {
  if (ownProps.feedType === 'MAIN')
    return state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'PROFILE')
    return state.sqso.feed.qra.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'FIELDDAYS')
    return state.sqso.feed.fieldDays.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'DETAIL') return state.sqso.feed.qso;
  else return null;
};
const mapStateToProps = (state, ownProps) => ({
  token: state.sqso.jwtToken,
  qso: selectorFeedType(state, ownProps),
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(FeedMedia);
// export default connect(mapStateToProps, mapDispatchToProps, null, {
//   pure: false
// })(FeedMedia);
