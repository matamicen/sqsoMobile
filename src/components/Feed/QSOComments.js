import { Formik } from 'formik';
import React, { Fragment } from 'react';
import { FlatList, Modal, StyleSheet, TextInput, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
//import { withRouter } from 'react-router-dom';
// import TextareaAutosize from 'react-textarea-autosize';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
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

  handleAddComment = (values) => {
    console.log(values);
    // e.preventDefault();
    if (values === '') return;

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
  _renderItem = ({ item, index }) => {
    return (
      <View>
        <QSOCommentItem
          key={index}
          comment={item}
          currentQRA={this.props.currentQRA}
          // recalculateRowHeight={this.props.recalculateRowHeight}
        />
      </View>
    );
  };
  render() {
    // let comments = null;
    // if (this.state.comments) {
    //   comments = this.state.comments.map((comment, i) => (
    //     <QSOCommentItem
    //       key={i}
    //       comment={comment}
    //       currentQRA={this.props.currentQRA}
    //       // recalculateRowHeight={this.props.recalculateRowHeight}
    //     />
    //   ));
    // }

    return (
      <Fragment>
        {/* <Modal
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
          }}>
          <Modal.Header>{t('qso.comments')} </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Comment.Group threaded>
                {comments}
                {form}
              </Comment.Group>
            </Modal.Description>
          </Modal.Content>
        </Modal> */}
        <Modal
          position={'top'}
          animationType={'slide'}
          transparent={true}
          visible={this.props.showComments}
          onRequestClose={() => this.props.doClose()}>
          {/* {I18n.t('qso.likeModalHeader')}{' '}
          {qso.type === 'POST' ? I18n.t('qso.POST') : ' QSO'} */}
          <View style={styles.modal}>
            <View style={styles.iconView}>
              <Icon
                name="close"
                type="font-awesome"
                onPress={() => this.props.doClose()}
              />
            </View>
            <View style={styles.itemsView} />
            <FlatList
              pagingEnabled={true}
              onScroll={this.handleScroll}
              data={this.state.comments}
              onViewableItemsChanged={this._onViewableItemsChanged}
              initialNumToRender={3}
              viewabilityConfig={this.viewabilityConfig}
              maxToRenderPerBatch={3}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this._renderItem}
              contentContainerStyle={styles.container}
            />
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={(values) => this.handleAddComment(values)}
              // validationSchema={yup.object().shape({
              //   email: yup.string().email().required(),
              //   password: yup.string().min(6).required()
              // })}
            >
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                isValid,
                handleSubmit
              }) => (
                <Fragment>
                  <TextInput
                    multiline
                    style={{ paddingTop: 5, paddingBottom: 5, minHeight: 40 }}
                    onChangeText={(text) => this.setState({ comment: text })}
                    value={this.state.comment}
                  />
                  <Button
                    size="mini"
                    content={I18n.t('qso.add')}
                    onPress={handleSubmit}
                  />
                </Fragment>
              )}
            </Formik>
          </View>
        </Modal>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  itemsView: {
    // flex: 1,
    // // flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start'
  },

  iconView: {
    // flex: 1,
    // height: 20,
    // width: 20,
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    alignSelf: 'flex-end'
  },
  modal: {
    flex: 1,
    marginTop: 100,
    marginBottom: 150,
    marginLeft: 50,
    width: '80%',
    height: 50,
    padding: 10,
    backgroundColor: 'gray',
    // paddingVertical: 5,
    alignItems: 'flex-start',
    borderRadius: 12
  },
  text: {
    fontSize: 20
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  container: {
    paddingHorizontal: 5
  }
});
const mapStateToProps = (state) => ({
  qsos: state.qsos,

  token: state.sqso.jwtToken,
  currentQRA: state.sqso.qra,
  firstname: state.userData.qra.firstname,
  lastname: state.userData.qra.lastname,
  avatarpic: state.userData.qra.avatarpic,
  isAuthenticated: state.userData.isAuthenticated
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QSOComments);
