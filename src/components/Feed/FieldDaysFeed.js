import React from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import NewsFeed from './NewsFeedPresentational';

class FieldDaysFeed extends React.PureComponent {
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

    this.props.actions.doFetchFieldDaysFeed();

    //Comentado Adsense
    // window.googletag.cmd.push(function () {
    //   window.googletag.destroySlots();
    //   window.googletag
    //     .defineSlot(
    //       '/22031658057/Home/home_left',
    //       [160, 600],
    //       'div-ads-instance-home-left'
    //     )
    //     .addService(window.googletag.pubads());
    //   window.googletag
    //     .defineSlot(
    //       '/22031658057/Home/home_right',
    //       [160, 600],
    //       'div-ads-instance-home-right'
    //     )
    //     .addService(window.googletag.pubads());
    //   window.googletag.pubads().enableSingleRequest();
    //   window.googletag.enableServices();
    // });
  }
  // handleOpen = () => this.setState({ adActive: true });
  // handleClose = () => this.setState({ adActive: false });

  // static getDerivedStateFromProps(props, state) {
  //   if (props.qsos.length > 0) return { active: false, qsos: props.qsos };
  //   else if (props.qsos.length === 0) return { active: true };
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.qsos.length > 0)
  //     this.setState({ qsos: this.props.qsos, active: false });
  //   // else if (props.qsos.length === 0) return { active: true };
  // }
  render() {
    let qsos = [];
    if (this.props.fieldDays.length > 0) {
      for (let i = 0; i < this.props.fieldDays.length; i++) {
        qsos.push({
          qso: this.props.fieldDays[i],
          type: this.props.fieldDays[i].type,
          source: this.props.fieldDays[i].source
            ? this.props.fieldDays[i].source
            : null,
          ad: this.props.fieldDays[i].ad ? this.props.fieldDays[i].ad : null
        });
      }
      return (
        <NewsFeed
          feedType="FIELDDAYS"
          list={qsos}
          QRAFetched={this.props.QRAFetched}
          FetchingQRA={this.props.FetchingQRA}
        />
      );
    }
    return null;
  }
}
const mapStateToProps = (state) => ({
  FetchingQSOS: state.sqso.feed.FetchingFieldDays,
  qsosFetched: state.sqso.feed.fieldDaysFetched,
  currentQRA: state.sqso.qra,
  token: state.sqso.jwtToken,
  fieldDays: state.sqso.feed.fieldDays,
  account_type: state.sqso.feed.userData.qra.account_type
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(FieldDaysFeed)
);
