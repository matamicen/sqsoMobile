import React, { Fragment } from 'react';
//import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
//import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { bindActionCreators } from 'redux';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Comment from 'semantic-ui-react/dist/commonjs/views/Comment';
import * as Actions from '../../actions';
import QSOCommentItem from './QSOCommentItem';
class QSOComments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      comment: '',
      openLogin: false,
      qso: { comments: [] }
    };

    this.handleAddComment = this.handleAddComment.bind(this);
  }

  componentDidMount() {
    if (!__DEV__)
      window.gtag('event', 'qsoCommentModalOpen_WEBPRD', {
        event_category: 'qso',
        event_label: 'commentModalOpen'
      });
    if (this.props.qso.comments) {
      this.setState({ comments: this.props.qso.comments });
    }
  }

  handleAddComment = e => {
    if (!this.props.isAuthenticated) this.setState({ openLogin: true });
    else {
      // e.preventDefault();
      if (this.state.comment === '') return;

      let datetime = new Date();
      let comment = {
        qra: this.props.currentQRA.toUpperCase(),
        comment: this.state.comment,
        datetime: datetime
      };
      this.setState({ comment: comment });
      // this.setState({
      //   comments: this.state.comments.concat(comment)
      // });
      // e.target.comment.value = null;
      this.setState({ comment: '' });
      // this.props.recalculateRowHeight();

      comment.firstname = this.props.firstname;
      comment.lastname = this.props.lastname;
      comment.avatarpic = this.props.avatarpic;
      comment.idqso = this.props.qso.idqso_shared
        ? this.props.qso.idqso_shared
        : this.props.qso.idqsos;

      this.props.actions.doCommentAdd(
        this.props.qso.idqsos,
        comment,
        this.props.token,
        this.props.qso.idqso_shared
      );
    }
  };
  // static getDerivedStateFromProps(props, prevState) {
  //   if (props.qsos[props.index].comments !== prevState.comments)
  //     return { index: props.index, comments: props.qsos[props.index].comments };
  //   return null;
  // }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(this.props.qso.comments) !==
      JSON.stringify(this.state.comments)
    )
      this.setState({
        index: this.props.index,
        comments: this.props.qso.comments,
        qso: this.props.qso
      });
  }
  render() {
    const { t } = this.props;

    let comments = null;
    if (this.state.comments) {
      comments = this.state.comments.map((comment, i) => (
        <QSOCommentItem
          key={i}
          comment={comment}
          currentQRA= {this.props.currentQRA}
          // recalculateRowHeight={this.props.recalculateRowHeight}
        />
      ));
    }

    let form = null;

    form = (
      <Form size="mini" reply onSubmit={() => this.handleAddComment()}>
        <Form.Group>
          <TextareaAutosize
            value={this.state.comment}
            onChange={e => this.setState({ comment: e.target.value })}
            // onHeightChange={this.props.recalculateRowHeight}
            fontSize={12}
            style={{
              fontSize: '1.1rem',
              paddingTop: '5px',
              paddingBottom: '5px'
            }}
            placeholder={t('qso.writeComment')}
            rows={4}
          />

          <Button positive size="mini" content={t('qso.add')} />
        </Form.Group>
      </Form>
    );

    return (
      <Fragment>
        <Modal
          size="tiny"
          centered={true}
          closeIcon={{
            style: { top: '0.0535rem', right: '0rem' },
            color: 'black',
            name: 'close'
          }}
          open={this.props.showComments}
          onClose={() => this.props.doClose()}
          style={{
            //height: '90%',
            overflowY: 'auto'
          }}
        >
          <Modal.Header>{t('qso.comments')} </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Comment.Group threaded>
                {comments}
                {form}
              </Comment.Group>
            </Modal.Description>
          </Modal.Content>
        </Modal>

        <Confirm
          size="mini"
          open={this.state.openLogin}
          onCancel={() => this.setState({ openLogin: false })}
          onConfirm={() =>
            this.props.history.push({
              pathname: '/login',
              state: { from: this.props.location.pathname }
            })
          }
          cancelButton={t('global.cancel')}
          confirmButton={t('auth.login')}
          content={t('auth.loginToPerformAction')}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  qsos: state.qsos,
  
  token: state.sqso.jwtToken,
  currentQRA: state.sqso.qra,
  firstname: state.userData.qra.firstname,
  lastname: state.userData.qra.lastname,
  avatarpic: state.userData.qra.avatarpic,
  isAuthenticated: state.userData.isAuthenticated
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(QSOComments))
);
