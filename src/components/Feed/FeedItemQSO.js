//import i18n from 'i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import FeedMedia from './FeedMedia';
import './style.js';

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

    let text;
    let shareText;

    switch (this.props.qso.type) {
      case 'QSO':
        text = I18n.t('qso.workedAQSO');
        shareText = I18n.t('qso.checkOutQSO');
        break;
      case 'LISTEN':
        text = I18n.t('qso.listenedQSO');
        shareText = I18n.t('qso.checkOutQSO');
        break;
      case 'SHARE':
        text = I18n.t('qso.repostedQSO');
        shareText = I18n.t('qso.checkOutPost');
        break;
      default:
    }
    var date = new Date(this.props.qso.datetime);

    return (
      // <Fragment>
      //   <Segment raised>
      //     <div className="qso-header">
      //       <div className="qso-avatar">
      //         <Link to={'/' + this.props.qso.qra}>
      //           <Image
      //             src={
      //               this.props.qso.avatarpic
      //                 ? this.props.qso.avatarpic
      //                 : '/emptyprofile.png'
      //             }
      //             size="mini"
      //             avatar
      //             style={{
      //               width: '50px',
      //               height: '50px'
      //             }}
      //           />
      //         </Link>
      //         <TextToFollow qra={this.props.qso.qra} />
      //       </div>
      //       <div className="qso-header-action">
      //         <PopupToFollow
      //           qra={this.props.qso.qra}
      //           trigger={
      //             <Link to={'/' + this.props.qso.qra}>
      //               {this.props.qso.qra}
      //             </Link>
      //           }
      //         />
      //         {text}
      //       </div>
      //       <div className="qso-header-info">
      //         <div>
      //           <b>{t('qso.mode')}</b>
      //           <br />
      //           {this.props.qso.mode}
      //         </div>
      //         <div>
      //           <b>{t('qso.band')}</b>
      //           <br />
      //           {this.props.qso.band}
      //         </div>
      //         {this.props.qso.db && (
      //           <div>
      //             <b>dB</b>
      //             <br />
      //             {this.props.qso.db ? this.props.qso.db : null}
      //           </div>
      //         )}
      //         {!this.props.qso.db && (
      //           <div>
      //             <b>RST</b>
      //             <br />
      //             {this.props.qso.rst ? this.props.qso.rst : '59'}
      //           </div>
      //         )}
      //         <div>
      //           <b>{t('qso.date')}</b>
      //           <br />
      //           {date.toLocaleDateString(i18n.language, { month: 'short' }) +
      //             ' ' +
      //             date.getDate() +
      //             ', ' +
      //             date.getFullYear()}
      //         </div>
      //         <div>
      //           <b>UTC</b>
      //           <br />
      //           {date.getUTCHours() +
      //             ':' +
      //             (date.getMinutes() < 10 ? '0' : '') +
      //             date.getMinutes()}
      //         </div>
      //       </div>

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
      //     <Divider
      //       hidden
      //       style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
      //     />

      //     <QRAs
      //       avatarpic={this.props.qso.avatarpic}
      //       qso_owner={this.props.qso.qra}
      //       qras={this.props.qso.qras}
      //     />
      //     <FeedMedia
      //       qso={this.props.qso}
      //       measure={this.props.measure}
      //       idqso={this.props.qso.idqsos}
      //       qso_owner={this.props.qso.qra}
      //       recalculateRowHeight={this.recalculateRowHeight}
      //     />

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
      <Card>
        <Card.Title>HELLO WORLD</Card.Title>
        <Card.Divider />
        {/* <Card.Image
          source={
            this.props.qso.avatarpic
              ? { uri: this.props.qso.avatarpic }
              : require('../../images/emptyprofile.png')
          }
        /> */}
        <View styles={{ flex: 1, justifyContent: 'center' }}>
          <FeedMedia
            qso={this.props.qso}
            currentIndex={this.props.currentIndex}
            currentVisibleIndex={this.props.currentVisibleIndex}
            idqso={this.props.qso.idqsos}
            qso_owner={this.props.qso.qra}
          />
        </View>
        {/* <Text style={{ marginBottom: 10 }}>
          The idea with React Native Elements is more about component structure
          than actual design.
        </Text> */}
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
