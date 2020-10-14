import React, { Fragment } from 'react';
//import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
//import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import * as Actions from '../../actions';
import QSOLikeTextModalItem from './QSOLikeTextModalItem';
import './style.js';
class QSOLikeText extends React.Component {
  constructor() {
    super();
    this.state = { likes: [], showModal: false };
  }
  componentDidMount() {
    this.setState({ likes: this.props.qso ? this.props.qso.likes : [] });
  }
  static getDerivedStateFromProps(props, prevState) {
    if (props.qso.likes && props.qso.likes.length !== prevState.likes.length)
      return { likes: props.qso.likes };
    return null;
  }
  // handleButtonClick(idqra) {
  //   if (!this.props.userData.token) return null;
  //   if (!this.props.userData.following.some(o => o.qra === idqra)) {
  //     if (this.props.userData.isAuthenticated) {
  //       this.props.actions.doFollowQRA(this.props.userData.token, idqra);
  //     }
  //   } else {
  //     if (this.props.userData.isAuthenticated) {
  //       this.props.actions.doUnfollowQRA(this.props.userData.token, idqra);
  //     }
  //   }
  //   // this.setState(prevState => {
  //   //   return {
  //   //     followed: !prevState.followed
  //   //   };
  //   // });
  // }
  componentDidUpdate(prevProps, prevState) {

    if (
      this.props.qso.likes.length === 1 &&
      this.props.qso.likes[0].qra === this.props.userData.currentQRA
    ) {
      this.props.recalculateRowHeight();
    }
  }
  render() {
    const { qso, t } = this.props;
    let counter;
    let outputText = '';
    let finalText;
    let maxLikers = 2;
    let others = 0;
    let likes = qso.likes;
    // let avatarPic = null;

    if (likes.length > maxLikers) {
      counter = maxLikers;
      others = likes.length - maxLikers;

      finalText =
        t('qso.and') +
        others +
        (others > 1 ? t('qso.othersLikeThis') : t('qso.otherLikeThis'));
      //  + (this.props.qso.type === 'POST' ? ' POST' : ' QSO');
    } else if (
      likes.length === 1 &&
      likes[0].qra === this.props.userData.currentQRA
    ) {
      // this.props.recalculateRowHeight();
      counter = likes.length;
      finalText = t('qso.youLikeThis');
      //  + (this.props.qso.type === 'POST' ? ' POST' : ' QSO');
    } else if (
      likes.length === 1 &&
      likes[0].qra !== this.props.userData.currentQRA
    ) {
      counter = likes.length;
      finalText = t('qso.oneLikeThis');
      //  + (this.props.qso.type === 'POST' ? ' POST' : ' QSO');
    } else {
      counter = likes.length;
      finalText = t('qso.manyLikeThis');
      //  + (this.props.qso.type === 'POST' ? ' POST' : ' QSO');
    }

    if (counter === 0) return null;

    // if the first element in array does not have avatar -> reorder array
    if (likes[0].avatarpic === null) {
      let i = 0;

      while (likes[0].avatarpic === null && i < likes.length) {
        let like = likes.splice(0, 1)[0];

        likes.push(like);

        i++;
      }
    }
    outputText = t('qso.startLikePhrase');
    for (let a = 0; a <= counter - 1; a++) {
      // if (qso.likes[a].avatarpic !== null
      // avatarPic = qso.likes[a].avatarpic;

      outputText =
        outputText +
        (likes[a].qra === this.props.userData.currentQRA
          ? t('global.you')
          : likes[a].qra);

      switch (true) {
        case a === counter - 1: //Last QRA
          outputText = outputText + finalText;
          break;
        case likes.length > 1 && a === counter - 2 && counter === likes.length: //Before Last
          outputText = outputText + t('qso.and');
          break;
        case likes.length > 1 && a <= counter - 2 && counter < likes.length: //Before Last
          outputText = outputText + ', ';
          break;
        default:
          break;
      }
    }
    return (
      <Fragment>
        <button
          type="button"
          className="link-button"
          onClick={() => this.setState({ showModal: true })}
        >
          {likes[0].avatarpic && (
            <Image
              style={{ height: '1.5rem', width: 'auto', marginRigth: '5px' }}
              src={likes[0].avatarpic}
              circular
            />
          )}
          <span style={{ alignSelf: 'center' }}>{outputText}</span>
        </button>
        {/* <a
          style={{
            cursor: 'pointer',
            fontSize: '1.1rem',
            display: 'flex',
            marginBottom: '5px'
          }}
          href={null}
          onClick={() => this.setState({ showModal: true })}
        >
          {likes[0].avatarpic && (
            <Image
              style={{ height: '1.5rem', width: 'auto', marginRigth: '5px' }}
              src={likes[0].avatarpic}
              circular
            />
          )}
          <span>{outputText}</span>
        </a> */}
        <Modal
          size="tiny"
          centered={true}
          closeIcon={{
            style: { top: '0.0535rem', right: '0rem' },
            color: 'black',
            name: 'close'
          }}
          open={this.state.showModal}
          onClose={() => this.setState({ showModal: false })}
          style={{
            //height: '90%',
            overflowY: 'auto'
          }}
        >
          <Modal.Header>
            {t('qso.likeModalHeader')}{' '}
            {qso.type === 'POST' ? t('qso.POST') : ' QSO'}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <div>
                {likes.map(l => (
                  // <div key={l.idqsos_likes} style={{ padding: '1vh' }} />
                  <div key={l.qra}>
                    <QSOLikeTextModalItem
                      l={l}
                      qso={this.props.qso}
                      likes={likes}
                    />
                  </div>
                ))}
              </div>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.userData.isAuthenticated,
  currentQRA: state.sqso.qra,
  userData: state.userData,
  token: state.sqso.jwtToken
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(QSOLikeText))
);
