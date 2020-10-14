import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import NewsFeed from './NewsFeedContainer';
class Home extends React.Component {
  state = {
    adActive: true,
    active: true,
    modalOpen: null,
    qsos: [],
    error: null
    // videoAlreadyDisplayed: false
  };
  componentDidMount() {
    // if (process.env.NODE_ENV !== 'production')
    //   this.setState({ adActive: false });
    this.props.actions.doFollowFetch();
    if (this.props.qsos.length === 0) {
      //   if (this.props.isAuthenticated) {
      // this.props.actions.doFetchUserFeed(
      //   this.props.token,
      //   this.props.currentQRA
      // );
      this.props.actions.doFetchPublicFeed(this.props.currentQRA);
      //   } else {
      //     this.props.actions.doFetchPublicFeed();
      //   }
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.qsos.length > 0) return { active: false, qsos: props.qsos };
    else if (props.qsos.length === 0) return { active: true };
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.qsos.length > 0)
  //     this.setState({ qsos: this.props.qsos, active: false });
  //   // else if (props.qsos.length === 0) return { active: true };
  // }
  render() {
    if (this.props.qsos.length > 0) return <NewsFeed />;
    return null;
  }
}

const mapStateToProps = (state) => ({
  FetchingQSOS: state.sqso.feed.FetchingQSOS,
  qsosFetched: state.sqso.feed.qsosFetched,
  //   authenticating: state.sqso.feeduserData.authenticating,
  currentQRA: state.sqso.qra,
  //   isAuthenticated: state.sqso.feeduserData.isAuthenticated,
  token: state.sqso.jwtToken,
  qsos: state.sqso.feed.qsos
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
