import { Formik } from 'formik';
import React from 'react';
import { userNotValidated } from '../../helper';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { Button, Icon, Overlay, Divider } from 'react-native-elements';
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
      // window.gtag('event', 'qsoCommentModalOpen_APPPRD', {
      //   event_category: 'qso',
      //   event_label: 'commentModalOpen'
      // });
      if (!__DEV__) analytics().logEvent('qsoCommentModalOpen_APPPRD');

      this.setState({ comments: this.props.comments });
    }
  }

  handleAddComment = (values) => {
    if (this.props.userinfo.pendingVerification) userNotValidated();
    else {
      // e.preventDefault();
      if (values.comment === '') return;

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
      comment.country = this.props.country;
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

      // this.flatListRef.getScrollResponder().scrollResponderScrollToEnd({
      //   animated: true,
      // });
      setTimeout(() => {
        this.flatListRef.getScrollResponder().scrollResponderScrollToEnd({
          animated: true
        });
      }, 1500);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(this.props.comments) !==
      JSON.stringify(this.state.comments)
    )
      this.setState({
        index: this.props.index,
        comments: this.props.comments,
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
          feedType={this.props.feedType}
          closeModal={() => {
            this.props.doClose();
          }}
          // recalculateRowHeight={this.props.recalculateRowHeight}
        />
      </View>
    );
  };

  // _ListFooterComponent = () => (
  //   <KeyboardAvoidingView behavior="padding" style={{ flex: 1, justifyContent: "center" }}>
  //     <View>
  //   <Formik
  //     initialValues={{ comment: '' }}
  //     onSubmit={(values, actions) => {
  //       this.handleAddComment(values);
  //     }}>
  //     {({
  //       values,
  //       handleChange,
  //       errors,
  //       setFieldTouched,
  //       touched,
  //       isValid,
  //       handleBlur,
  //       handleSubmit
  //     }) => (
  //       <View
  //         style={{
  //           flex: 1,
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',

  //           padding: 0
  //         }}>
  //         <View style={{ flex: 1, flexGrow: 0, flexShrink: 1, width: 200 }}>
  //           <TextInput
  //             name="comment"
  //             placeholder={I18n.t('qso.writeComment')}
  //             multiline
  //             removeClippedSubviews={false}
  //             keyboardDismissMode="none"
  //             onBlur={handleBlur('comment')}
  //             style={{ borderWidth: 1, width: 200 }}
  //             onChangeText={handleChange('comment')}
  //             value={values.comment}
  //           />
  //         </View>

  //         <View>
  //           <Button
  //             buttonStyle={{
  //               padding: 1,
  //               // margin: 0,
  //               width: 100,
  //               height: '100%'
  //             }}
  //             size="small"
  //             title={I18n.t('qso.add')}
  //             onPress={handleSubmit}
  //           />
  //         </View>
  //       </View>
  //     )}
  //   </Formik>
  //   </View>
  //    </KeyboardAvoidingView>
  // );
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
          position: 'absolute',
          flex: 1,
          top: Platform.OS === 'ios' ? 30 : 5,
          bottom: 100,
          width: '95%',
          height: '100%'
          //  maxHeight: '90%'
        }}>
        {/* <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}> */}
        {/* <ScrollView> */}

        <MenuProvider
          skipInstanceCheck
          style={
            {
              // flexDirection: 'column',
              // flex: 1,
              // backgroundColor: 'white'
            }
          }>
          <View
            style={{
              flex: 0.1,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <View style={{ width: '80%' }}>
              <Text style={{ fontSize: 20, textAlign: 'center' }}>
                {I18n.t('qso.comments')}
              </Text>
            </View>
            <View style={styles.iconView}>
              <Icon
                name="close"
                type="font-awesome"
                onPress={() => this.props.doClose()}
              />
            </View>
          </View>

          {Platform.OS === 'ios' ? (
            <View
              style={{
                // marginRight: 10 ,
                // marginLeft: 10,
                // marginTop: 10 ,
                // height: 100
                flex: 0.9
              }}>
              <View
                style={{
                  // marginRight: 10 ,
                  // marginLeft: 10,
                  // marginTop: 10 ,
                  // height: 100
                  flex: 0.65
                }}>
                <FlatList
                  ref={(ref) => {
                    this.flatListRef = ref;
                  }}
                  extraData={this.state.comments}
                  // nestedScrollEnabled={true}
                  // keyboardShouldPersistTaps="handled"
                  // pagingEnabled={true}
                  onScroll={this.handleScroll}
                  data={this.state.comments}
                  scrollEnabled={true}
                  // onViewableItemsChanged={this._onViewableItemsChanged}
                  // initialNumToRender={3}
                  removeClippedSubviews={false}
                  // viewabilityConfig={this.viewabilityConfig}
                  // maxToRenderPerBatch={3}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={this.renderSeparator}
                  renderItem={this._renderItem}
                  // contentContainerStyle={styles.container}
                  onContentSizeChange={() =>
                    this.flatListRef.scrollToEnd({ animated: true })
                  }
                  onLayout={() =>
                    this.flatListRef.scrollToEnd({ animated: true })
                  }
                  // removeClippedSubviews={true} // Unmount components when outside of window
                  // ListFooterComponent={this._ListFooterComponent}
                />
              </View>

              <KeyboardAvoidingView behavior="padding" style={{ flex: 0.45 }}>
                <View
                  style={{
                    // marginRight: 10 ,
                    // marginLeft: 10,
                    // marginTop: 10 ,
                    // height: 100
                    flex: 0.35,
                    marginTop: 5
                  }}>
                  <View
                    style={{
                      // marginRight: 10 ,
                      // marginLeft: 10,
                      // marginTop: 10 ,
                      // height: 100
                      flex: 1
                    }}>
                    <Formik
                      style={{
                        // marginRight: 10 ,
                        // marginLeft: 10,
                        // marginTop: 10 ,
                        // height: 100
                        flex: 1,
                        flexDirection: 'row'
                      }}
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
                            marginTop: 5,

                            padding: 0
                          }}>
                          {/* <View style={{ flex: 1, flexGrow: 0, flexShrink: 1, width: 200 }}> */}
                          <View
                            style={{
                              marginRight: 10,
                              // marginLeft: 10,
                              marginTop: 2,

                              flex: 0.75
                            }}>
                            <TextInput
                              name="comment"
                              placeholder={I18n.t('qso.writeComment')}
                              multiline
                              removeClippedSubviews={false}
                              keyboardDismissMode="none"
                              onBlur={handleBlur('comment')}
                              // style={{ borderWidth: 1, width: 230 }}
                              style={{ borderWidth: 1, fontSize: 16 }}
                              onChangeText={handleChange('comment')}
                              value={values.comment}
                            />
                          </View>

                          <View
                            style={{
                              // marginRight: 10 ,
                              // marginLeft: 10,
                              // marginTop: 10 ,
                              // height: 100
                              flex: 0.25,
                              alignItems: 'flex-end'
                            }}>
                            <Button
                              buttonStyle={{
                                padding: 1,
                                // margin: 0,
                                width: 90
                                // height: '100%'
                              }}
                              size="small"
                              title={I18n.t('qso.add')}
                              onPress={handleSubmit}
                            />
                          </View>
                        </View>
                      )}
                    </Formik>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
          ) : (
            <View
              style={{
                // marginRight: 10 ,
                // marginLeft: 10,
                // marginTop: 10 ,
                // height: 100
                flex: 0.9
              }}>
              <View
                style={{
                  // marginRight: 10 ,
                  // marginLeft: 10,
                  // marginTop: 10 ,
                  // height: 100
                  flex: 0.75
                }}>
                <FlatList
                  ref={(ref) => {
                    this.flatListRef = ref;
                  }}
                  extraData={this.state.comments}
                  // nestedScrollEnabled={true}
                  // keyboardShouldPersistTaps="handled"
                  // pagingEnabled={true}
                  onScroll={this.handleScroll}
                  data={this.state.comments}
                  scrollEnabled={true}
                  // onViewableItemsChanged={this._onViewableItemsChanged}
                  // initialNumToRender={3}
                  removeClippedSubviews={false}
                  // viewabilityConfig={this.viewabilityConfig}
                  // maxToRenderPerBatch={3}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={this.renderSeparator}
                  renderItem={this._renderItem}
                  onContentSizeChange={() =>
                    this.flatListRef.scrollToEnd({ animated: true })
                  }
                  onLayout={() =>
                    this.flatListRef.scrollToEnd({ animated: true })
                  }
                  // contentContainerStyle={styles.container}

                  // removeClippedSubviews={true} // Unmount components when outside of window
                  // ListFooterComponent={this._ListFooterComponent}
                />
              </View>

              {/* <KeyboardAvoidingView behavior="padding" style={{ flex: 0.45 }}> */}
              <View
                style={{
                  // marginRight: 10 ,
                  // marginLeft: 10,
                  // marginTop: 10 ,
                  // height: 100
                  flex: 0.25,
                  marginTop: 5
                }}>
                <View
                  style={{
                    // marginRight: 10 ,
                    // marginLeft: 10,
                    // marginTop: 10 ,
                    // height: 100
                    flex: 1
                  }}>
                  <Formik
                    style={{
                      // marginRight: 10 ,
                      // marginLeft: 10,
                      // marginTop: 10 ,
                      // height: 100
                      flex: 1,
                      flexDirection: 'row'
                    }}
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
                          marginTop: 5,

                          padding: 0
                        }}>
                        {/* <View style={{ flex: 1, flexGrow: 0, flexShrink: 1, width: 200 }}> */}
                        <View
                          style={{
                            marginRight: 5,
                            // marginLeft: 10,
                            //  marginTop: 10 ,

                            flex: 0.7
                            // alignItems: 'flex-start'
                          }}>
                          <TextInput
                            name="comment"
                            placeholder={I18n.t('qso.writeComment')}
                            multiline
                            removeClippedSubviews={false}
                            keyboardDismissMode="none"
                            onBlur={handleBlur('comment')}
                            // style={{ borderWidth: 1, width: 230 }}
                            style={{ borderWidth: 1, fontSize: 15 }}
                            onChangeText={handleChange('comment')}
                            value={values.comment}
                          />
                        </View>

                        <View
                          style={{
                            // marginRight: 10 ,
                            // marginLeft: 10,
                            // marginTop: 10 ,
                            // height: 100
                            flex: 0.3,
                            alignItems: 'flex-end'
                          }}>
                          <Button
                            buttonStyle={{
                              padding: 5,
                              // margin: 0,
                              width: 90
                              // height: '100%'
                            }}
                            size="small"
                            title={I18n.t('qso.add')}
                            onPress={handleSubmit}
                          />
                        </View>
                      </View>
                    )}
                  </Formik>
                </View>
              </View>
              {/* </KeyboardAvoidingView> */}
            </View>
          )}
        </MenuProvider>
      </Overlay>
    );
  }
}
const styles = StyleSheet.create({
  form: { flex: 1 },
  comment: { borderWidth: 1 },
  itemsView: {
    // flex: 1,
    width: '100%'
    // maxHeight: '80%'
    // flexGrow: 0
  },

  iconView: {
    flex: 1,
    width: '20%'
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
  container: { flex: 1 }
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
  userinfo: state.sqso.userInfo,
  currentQRA: state.sqso.qra,
  firstname: state.sqso.userInfo.firstname,
  country: state.sqso.userInfo.country,
  lastname: state.sqso.userInfo.lastname,
  avatarpic: state.sqso.userInfo.avatarpic
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QSOComments);
