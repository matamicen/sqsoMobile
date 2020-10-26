import { Formik } from 'formik';
import React, { Fragment } from 'react';
import { FlatList, Modal, StyleSheet, TextInput, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
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

      qso: { comments: [] }
    };

    this.handleAddComment = this.handleAddComment.bind(this);
  }

  componentDidMount() {
    if (!__DEV__)
      if (this.props.qso.comments) {
        // window.gtag('event', 'qsoCommentModalOpen_WEBPRD', {
        //   event_category: 'qso',
        //   event_label: 'commentModalOpen'
        // });
        this.setState({ comments: this.props.qso.comments });
      }
  }

  handleAddComment = (values) => {
    // console.log(values);
    // e.preventDefault();
    if (values === '') return;

    let datetime = new Date();
    let comment = {
      qra: this.props.currentQRA.toUpperCase(),
      comment: values.comment,
      datetime: datetime
    };
    let m;
    const regex = /(?:^|[ ])@([a-zA-Z0-9]+)/;

    let message = values.comment;

    do {
      m = regex.exec(values.comment);
      if (m) {
        var oldWord = '@' + m[1];

        values.comment = values.replace(
          new RegExp(oldWord, 'g'),
          '<MENTION>' + '@' + m[1] + '</MENTION>'
        );
      }
    } while (m);
    let comment2 = {
      qra: this.props.currentQRA.toUpperCase(),
      comment: values.comment,
      datetime: datetime
    };
    this.setState({ comment: comment2 });
    this.setState({
      comments: this.state.comments.concat(comment2)
    });
    // e.target.comment.value = null;
    this.setState({ comment: '' });
    // this.props.recalculateRowHeight();

    comment.firstname = this.props.firstname;
    comment.lastname = this.props.lastname;
    comment.avatarpic = this.props.avatarpic;
    comment.idqso = this.props.qso.idqso_shared
      ? this.props.qso.idqso_shared
      : this.props.idqsos;

    this.props.actions.doCommentAdd(
      this.props.idqsos,
      comment,
      this.props.token,
      this.props.qso.idqso_shared
    );
  };

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
          idqsos={this.props.idqsos}
          // recalculateRowHeight={this.props.recalculateRowHeight}
        />
      </View>
    );
  };
  _ListFooterComponent = () => (
    <Formik
      initialValues={{ comment: '' }}
      onSubmit={(values) => this.handleAddComment(values)}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit
      }) => (
        <View style={styles.form}>
          <TextInput
            multiline
            style={styles.comment}
            // onChangeText={(text) => this.setState({ comment: text })}
            onChangeText={handleChange('comment')}
            value={values.comment}
          />
          <Button
            size="medium"
            title={I18n.t('qso.add')}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );

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
            <View style={styles.itemsView}>
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
                ListFooterComponent={this._ListFooterComponent}
              />
            </View>
          </View>
        </Modal>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  form: { flex: 1, flexDirection: 'row' },
  comment: {
    width: '70%',
    maxHeight: 80,
    borderWidth: 1,
    fontSize: 20,
    minHeight: 5,
    backgroundColor: 'white'
  },
  itemsView: {
    flex: 1
    // flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start'
  },

  iconView: {
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
const mapStateToProps = (state, ownProps) => ({
  qso: state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos),
  token: state.sqso.jwtToken,
  currentQRA: state.sqso.qra,
  firstname: state.sqso.userInfo.firstname,
  lastname: state.sqso.userInfo.lastname,
  avatarpic: state.sqso.userInfo.avatarpic
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QSOComments);
