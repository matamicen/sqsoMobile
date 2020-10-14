import React from 'react';
import { View } from 'react-native';
// import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
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
      <View styles={{ flex: 1, justifyContent: 'center' }}>
        {videoList.length > 0 && (
          <View>
            <Divider
              hidden
              // style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
            />
            <FeedVideoList
              mediaList={videoList}
              // measure={this.props.measure}
              idqso={this.props.qso.idqsos}
              currentIndex={this.props.currentIndex}
              currentVisibleIndex={this.props.currentVisibleIndex}
              qso_owner={this.props.qso.qra}
            />
          </View>
        )}
        {picList.length > 0 && (
          <View>
            <Divider
              hidden
              // style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
            />
            <FeedImage
              img={picList}
              // measure={this.props.measure}
              idqso={this.props.qso.idqsos}
              qso_owner={this.props.qso.qra}
            />
          </View>
        )}
        {audioList.length > 0 && (
          <View>
            <Divider
              hidden
              // style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
            />
            <FeedAudioList
              mediaList={audioList}
              idqso={this.props.qso.idqsos}
              qso_owner={this.props.qso.qra}
              // recalculateRowHeight={this.props.recalculateRowHeight}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.sqso.jwtToken,
  // isAuthenticated: state.userData.isAuthenticated,
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(FeedMedia);
