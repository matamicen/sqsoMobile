//import i18n from 'i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import FeedItemHeader from './FeedItemHeader';
import FeedMedia from './FeedMedia';
import QRAs from './QRAs';
// import './style.js';

class FeedItemQSO extends React.PureComponent {
  constructor() {
    super();
    this.state = { showComments: false, comments: [], likes: [], error: null };

    // this.recalculateRowHeight = this.recalculateRowHeight.bind(this);
  }

  // recalculateRowHeight() {
  //   if (this.props.recalculateRowHeight) {
  //     this.props.recalculateRowHeight(this.props.index);
  //   }
  // }

  //     }
  // static getDerivedStateFromProps(props, prevState) {
  //   if (props.qso.comments !== prevState.comments) {
  //     console.log('update');
  //     return { qso: props.qso, comments: props.qso.comments };
  //   }
  //   if (props.qso.likes !== prevState.likes) {
  //     return { qso: props.qso, likes: props.qso.likes };
  //   }
  //   return null;
  // }
  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.qso) !== JSON.stringify(prevProps.qso))
      this.setState({
        qso: this.props.qso,
        comments: this.props.qso.comments,
        likes: this.props.qso.likes
      });
  }
  render() {
    const commentsCounter = '(' + this.props.qso.comments.length + ')';

    return (
      // <Fragment>
      //   <Segment raised>
      //     <div className="qso-header">

      //       {/* {date.toLocaleDateString("i18n.language", {month: "short"}) + ' ' + date.getDate() + ', ' + date.getFullYear()} */}
      //       <div
      //         className="qso-header-button"
      //         style={{
      //           float: 'right'
      //         }}>
      //         <FeedOptionsMenu
      //           qso_owner={this.props.qso.qra}
      //           idqso={this.props.qso.idqsos}
      //           guid={this.props.qso.GUID_QR}
      //           qso={this.props.qso}
      //           optionsCaller="FeedItem"
      //           QslCard={
      //             this.props.currentQRA === this.props.qso.qra ||
      //             this.props.qso.qras.some(
      //               (o) => o.qra === this.props.currentQRA
      //             )
      //           }
      //         />
      //       </div>
      //     </div>

      //     {this.props.qso.links && (
      //       <FeedLinkList links={this.props.qso.links} />
      //     )}
      //     <Divider hidden style={{ marginTop: '1vh' }} />
      //     <QSOLikeText
      //       qso={this.props.qso}
      //       likes={this.state.likes}
      //       recalculateRowHeight={this.recalculateRowHeight}
      //     />
      //     <Button.Group fluid basic>
      //       <QSOLikeButton
      //         qso={this.props.qso}
      //         recalculateRowHeight={this.recalculateRowHeight}
      //       />
      //       <Button onClick={() => this.setState({ showComments: true })}>
      //         <div>
      //           <Icon name="comment outline" />{' '}
      //           {this.props.qso.comments.length > 0 && commentsCounter}
      //         </div>
      //       </Button>
      //       <QSORePostButton qso={this.props.qso} />
      //       <QSOShareButtons
      //         idqso={this.props.qso.GUID_URL}
      //         title={shareText}
      //       />
      //     </Button.Group>

      //     {this.state.showComments && (
      //       <QSOComments
      //         showComments={this.state.showComments}
      //         doClose={() => this.setState({ showComments: false })}
      //         index={this.props.index}
      //         qso={this.props.qso}
      //         comments={this.props.comments}
      //         recalculateRowHeight={this.recalculateRowHeight}
      //       />
      //     )}
      //   </Segment>
      //   {/* <Confirm
      //     size="mini"
      //     open={this.state.openLogin}
      //     onCancel={() => this.setState({ openLogin: false })}
      //     onConfirm={() =>
      //       this.props.history.push({
      //         pathname: '/login',
      //         state: { from: this.props.location.pathname }
      //       })
      //     }
      //     cancelButton={t('global.cancel')}
      //     confirmButton={t('auth.login')}
      //     content={t('auth.loginToPerformAction')}
      //   /> */}
      // </Fragment>
      <Card containerStyle={{ padding: 0, margin: 0 }}>
        <FeedItemHeader qso={this.props.qso} />
        <QRAs
          avatarpic={this.props.qso.avatarpic}
          qso_owner={this.props.qso.qra}
          qras={this.props.qso.qras}
        />

        <FeedMedia
          qso={this.props.qso}
          currentIndex={this.props.currentIndex}
          currentVisibleIndex={this.props.currentVisibleIndex}
          idqso={this.props.qso.idqsos}
          qso_owner={this.props.qso.qra}
        />

        <Button
          icon={<Icon name="code" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="VIEW NOW"
        />
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
    // flexGrow: 1
    // marginTop: Constants.statusBarHeight
  }
});
FeedItemQSO.propTypes = {
  currentQRA: PropTypes.string,

  recalculateRowHeight: PropTypes.func,
  measure: PropTypes.string,
  index: PropTypes.string
};
const mapStateToProps = (state, qsos) => ({
  fetchingQSOS: state.sqso.feed.FetchingQSOS,
  qsosFetched: state.sqso.feed.qsosFetched,
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(FeedItemQSO);
// FeedItemQSO.propTypes = {
//   qso: PropTypes.object.isRequired
// };
