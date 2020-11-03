import React from 'react';
import { connect } from 'react-redux';
// import 'react-virtualized/styles.css'; // only needs to be imported once
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import NewsFeed from './NewsFeedPresentational';
// import './style.css';

class NewsFeedContainer extends React.PureComponent {
  state = { qsos: this.props.qsos };
  componentDidUpdate(prevProps) {
    if (this.props.qsos && this.props.qsos !== prevProps.qsos) {
      this.setState({ qsos: this.props.qsos });
    }
  }
  render() {
    let qsos = [];
    // if (this.props.qsos && this.props.qsos.length > 0) {
    for (let i = 0; i < this.state.qsos.length; i++) {
      qsos.push({
        qso: this.state.qsos[i],
        type: this.state.qsos[i].type,
        source: this.state.qsos[i].source ? this.state.qsos[i].source : null
      });
    }
    // }

    if (this.state.qsos) {
      return (
        <NewsFeed
          list={qsos}
          fetchingQSOS={this.props.fetchingQSOS}
          qsosFetched={this.props.qsosFetched}
        />
      );
    } else return null;
  }
}

const mapStateToProps = (state) => {
  return {
    qsos: state.sqso.feed.qsos,
    FetchingQSOS: state.sqso.feed.FetchingQSOS,
    qsosFetched: state.sqso.feed.qsosFetched
    // authenticating: state.sqso.feed.userData.authenticating,

    // token: state.sqso.feed.userData.token
    // public: state.sqso.feed.userData.public
  };
};
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedContainer);