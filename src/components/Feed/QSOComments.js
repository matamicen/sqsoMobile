import { Formik } from 'formik';
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { Button, Icon, Overlay } from 'react-native-elements';
import { MenuProvider } from 'react-native-popup-menu';
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
    if (this.props.comments) {
      // window.gtag('event', 'qsoCommentModalOpen_WEBPRD', {
      //   event_category: 'qso',
      //   event_label: 'commentModalOpen'
      // });
      this.setState({ comments: this.props.comments });
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

        values.comment = values.comment.replace(
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
    comment.idqsos_comments = datetime;
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
      JSON.stringify(this.props.comments) !==
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

          <View>
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
      <Overlay
        animationType="slide"
        isVisible={this.props.showComments}
        onBackdropPress={() => this.props.doClose()}
        backdropStyle={{ opacity: 1 }}
        width="auto"
        height="auto"
        borderRadius={8}
        overlayStyle={{
          // position: 'absolute',
          flex: 1,
          top: 20,
          bottom: 50,
          width: '90%',
          maxHeight: '90%'
        }}>
        <View styles={{ flex: 1, height: '80%' }}>
          <KeyboardAvoidingView
          // enabled
          // behavior={Platform.OS === 'ios' ? 'padding' : null}
          // style={{ flex: 1, justifyContent: 'center' }}
          >
            <Text h2>{I18n.t('qso.likeModalHeader')}</Text>
            <View style={styles.iconView}>
              <Icon
                name="close"
                type="font-awesome"
                onPress={() => this.props.doClose()}
              />
            </View>
            <ScrollView>
              <MenuProvider
                skipInstanceCheck
                style={{
                  // flexDirection: 'column',

                  backgroundColor: 'white'
                }}>
                <View style={{ flex: 1 }}>
                  {/* <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}> */}
                  <View style={{ flex: 1 }}>
                    <FlatList
                      extraData={this.state.comments}
                      nestedScrollEnabled={true}
                      // keyboardShouldPersistTaps="handled"
                      // pagingEnabled={true}
                      // onScroll={this.handleScroll}
                      data={this.state.comments}
                      scrollEnabled={true}
                      // onViewableItemsChanged={this._onViewableItemsChanged}
                      initialNumToRender={3}
                      // viewabilityConfig={this.viewabilityConfig}
                      maxToRenderPerBatch={3}
                      keyExtractor={(item, index) => index.toString()}
                      ItemSeparatorComponent={this.renderSeparator}
                      renderItem={this._renderItem}
                      contentContainerStyle={styles.container}
                      removeClippedSubviews={true} // Unmount components when outside of window
                      ListFooterComponent={this._ListFooterComponent}
                    />
                  </View>
                </View>
                {/* </ScrollView> */}
              </MenuProvider>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Overlay>
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
  container: { flex: 1, flexGrow: 1 }
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
