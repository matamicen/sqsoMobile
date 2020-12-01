import { Formik } from 'formik';
import React, { Fragment } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { Button, Icon, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
// import TextareaAutosize from 'react-textarea-autosize';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import QSOCommentItem from './QSOCommentItem';

class QSOComments extends React.PureComponent {
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
    // if (!__DEV__)
    if (this.props.qso.comments) {
      // window.gtag('event', 'qsoCommentModalOpen_WEBPRD', {
      //   event_category: 'qso',
      //   event_label: 'commentModalOpen'
      // });
      this.setState({ comments: this.props.qso.comments });
    }
  }

  handleAddComment = (values) => {
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
    values.comment = '';
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
      onSubmit={(values, actions) => {
        
        this.handleAddComment(values);
      }}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleBlur,
        handleSubmit
      }) => (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',

            padding: 0
          }}>
          <View style={{ flex: 1, flexGrow: 0, flexShrink: 1, width: 200 }}>
            <TextInput
              name="comment"
              placeholder={I18n.t('qso.writeComment')}
              multiline
              onBlur={handleBlur('comment')}
              style={{ borderWidth: 1, width: 200 }}
              onChangeText={handleChange('comment')}
              value={values.comment}
              autoFocus
            />
          </View>
          <View
            style={{
              flex: 1,
              width: 100,
              height: '100%',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              alignContent: 'flex-end',
              marginHorizontal: 20,
              flexBasis: 0,
              flexGrow: 0
            }}>
            <Button
              buttonStyle={{
                padding: 1,
                // margin: 0,
                width: 100,
                height: '100%'
              }}
              size="small"
              title={I18n.t('qso.add')}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>
  );
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE'
          // marginLeft: '14%'
        }}
      />
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
        <Overlay
          animationType="slide"
          isVisible={this.props.showComments}
          onBackdropPress={() => this.props.doClose()}
          backdropStyle={{ opacity: 1 }}
          width="auto"
          height="auto"
          borderRadius={8}
          overlayStyle={{
            position: 'absolute',

            flex: 1,
            top: 50,
            bottom: 50,
            width: '80%',
            height: '80%'
          }}>
          {/* <Modal
          position={'top'}
          animationType={'slide'}
          transparent={true}
          visible={this.props.showComments}
          onRequestClose={() => this.props.doClose()}> */}
          {/* {I18n.t('qso.likeModalHeader')}{' '}
          {qso.type === 'POST' ? I18n.t('qso.POST') : ' QSO'} */}
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'center' }}>
            <ScrollView style={{ flex: 1 }}>
              <View style={styles.iconView}>
                <Icon
                  name="close"
                  type="font-awesome"
                  onPress={() => this.props.doClose()}
                />
              </View>
              <View style={styles.itemsView}>
                <FlatList
                  extraData={this.props.comments}
                  pagingEnabled={true}
                  onScroll={this.handleScroll}
                  data={this.props.comments}
                  onViewableItemsChanged={this._onViewableItemsChanged}
                  initialNumToRender={3}
                  // viewabilityConfig={this.viewabilityConfig}
                  maxToRenderPerBatch={3}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={this.renderSeparator}
                  renderItem={this._renderItem}
                  contentContainerStyle={styles.container}
                  ListFooterComponent={this._ListFooterComponent}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Overlay>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  form: { flex: 1 },
  comment: { borderWidth: 1 },
  itemsView: {
    flex: 1,
    width: '100%'
    // maxHeight: '80%'
    // flexGrow: 0
  },

  iconView: {
    alignSelf: 'flex-end'
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
  container: { flexGrow: 1 }
});
const selectorFeedType = (state, ownProps) => {
  if (ownProps.feedType === 'MAIN')
    return state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'PROFILE')
    return state.sqso.feed.qra.qsos.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'FIELDDAYS')
    return state.sqso.feed.fieldDays.find((q) => q.idqsos === ownProps.idqsos);
  else if (ownProps.feedType === 'DETAIL') return state.sqso.feed.qso;
  else return null;
};

const mapStateToProps = (state, ownProps) => ({
  qso: selectorFeedType(state, ownProps),
  comments: selectorFeedType(state, ownProps).comments,
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
