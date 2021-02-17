import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Avatar, Icon, Overlay, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import QSOLikeTextModalItem from './QSOLikeTextModalItem';

// import './style.js';
class QSOLikeText extends React.PureComponent {
  constructor() {
    super();
    this.state = { likes: [], showModal: false };
  }
  componentDidMount() {
    // this.setState({ likes: qso ? qso.likes : [] });
    // let qso = this.props.qsos.find((q) => q.idqsos === this.props.idqsos);
    // if (qso) this.setState({ qso: qso });
  }

  componentDidUpdate(prevProps, prevState) {
    // this.setState({ likes: this.props.qso.likes });
    // let qso = this.props.qsos.find((q) => q.idqsos === this.props.idqsos);
    // if (qso) this.setState({ qso: qso });
    // if (
    //   this.props.qso.likes.length === 1 &&
    //   this.props.qso.likes[0].qra === this.props.currentQRA
    // ) {
    //   this.props.recalculateRowHeight();
    // }
  }
  _renderItem = ({ item, index }) => {
    return (
      <View>
        <QSOLikeTextModalItem
          l={item}
          idqsos={this.props.idqsos}
          closeModal={() => this.setState({ showModal: false })}
        />
      </View>
    );
  };
  render() {
    let counter;
    let outputText = '';
    let finalText;
    let maxLikers = 2;
    let others = 0;
    // let qso = this.props.qsos.find((q) => q.idqsos === this.props.idqsos);

    let likes = this.props.qso.likes ? this.props.qso.likes : [];
    // let avatarPic = null;

    if (likes.length > maxLikers) {
      counter = maxLikers;
      others = likes.length - maxLikers;

      finalText =
        I18n.t('qso.and') +
        others +
        (others > 1
          ? I18n.t('qso.othersLikeThis')
          : I18n.t('qso.otherLikeThis'));
      //  + (this.props.qso.type === 'POST' ? ' POST' : ' QSO');
    } else if (likes.length === 1 && likes[0].qra === this.props.currentQRA) {
      // this.props.recalculateRowHeight();
      counter = likes.length;
      finalText = I18n.t('qso.youLikeThis');
      //  + (this.props.qso.type === 'POST' ? ' POST' : ' QSO');
    } else if (likes.length === 1 && likes[0].qra !== this.props.currentQRA) {
      counter = likes.length;
      finalText = I18n.t('qso.oneLikeThis');
      //  + (this.props.qso.type === 'POST' ? ' POST' : ' QSO');
    } else {
      counter = likes.length;
      finalText = I18n.t('qso.manyLikeThis');
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
    outputText = I18n.t('qso.startLikePhrase');
    for (let a = 0; a <= counter - 1; a++) {
      // if (qso.likes[a].avatarpic !== null
      // avatarPic = qso.likes[a].avatarpic;

      outputText =
        outputText +
        (likes[a].qra === this.props.currentQRA
          ? I18n.t('global.you')
          : likes[a].qra);

      switch (true) {
        case a === counter - 1: //Last QRA
          outputText = outputText + finalText;
          break;
        case likes.length > 1 && a === counter - 2 && counter === likes.length: //Before Last
          outputText = outputText + I18n.t('qso.and');
          break;
        case likes.length > 1 && a <= counter - 2 && counter < likes.length: //Before Last
          outputText = outputText + ', ';
          break;
        default:
          break;
      }
    }

    return (
      <View>
        <TouchableOpacity
          // style={styles.button}
          onPress={() => this.setState({ showModal: true })}>
          <View style={styles.view}>
            {likes[0].avatarpic && (
              <Avatar
                size="small"
                rounded
                source={{
                  uri: likes[0].avatarpic
                }}
              />
            )}
            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
              <Text style={styles.text}>{outputText}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Overlay
          animationType="slide"
          isVisible={this.state.showModal}
          onBackdropPress={() => this.setState({ showModal: false })}
          backdropStyle={{ opacity: 1 }}
          width="auto"
          height="auto"
          borderRadius={8}
          overlayStyle={{
            // position: 'absolute',
            flex: 1,
            top: 50,
            // bottom: 50,
            width: '80%'
            // maxHeight: '80%'
          }}>
          <View style={{ flex: 1, width: '100%' }}>
            {/* <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'center' }}> */}
            <View
              style={{
                flex: 0.05,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <View style={{ width: '80%' }}>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>
                  {I18n.t('qso.likeModalHeader')}
                </Text>
              </View>
              <View style={styles.iconView}>
                <Icon
                  name="close"
                  type="font-awesome"
                  onPress={() => this.setState({ showModal: false })}
                />
              </View>
            </View>
            <Divider hidden />

            <View style={{ flex: 0.85 }}>
              <FlatList
                // pagingEnabled={true}
                onScroll={this.handleScroll}
                data={likes}
                onViewableItemsChanged={this._onViewableItemsChanged}
                // initialNumToRender={3}
                // viewabilityConfig={this.viewabilityConfig}
                // maxToRenderPerBatch={3}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this._renderItem}
                contentContainerStyle={styles.container}
              />
            </View>
            {/* </KeyboardAvoidingView> */}
          </View>
        </Overlay>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemsView: {
    marginTop: 10,
    flex: 1
    // // flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start'
  },

  iconView: {
    flex: 1,
    width: '20%'
    // width: 20,
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignSelf: 'flex-end'
  },
  modal: {
    flex: 1,
    marginTop: 100,
    marginBottom: 150,
    marginLeft: 50,
    width: '90%',
    height: 50,
    padding: 10,

    // paddingVertical: 5,
    // alignItems: 'flex-start',
    borderRadius: 12
  },
  text: {
    fontSize: 17,

    paddingHorizontal: 5
  },
  view: {
    flex: 1,
    paddingTop: 10,
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
const selectorFeedTypeLikes = (state, ownProps) => {
  if (ownProps.feedType === 'MAIN')
    return state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos).likes;
  else if (ownProps.feedType === 'PROFILE')
    return state.sqso.feed.qra.qsos.find((q) => q.idqsos === ownProps.idqsos)
      .likes;
  else if (ownProps.feedType === 'FIELDDAYS')
    return state.sqso.feed.fieldDays.find((q) => q.idqsos === ownProps.idqsos)
      .likes;
  else if (ownProps.feedType === 'DETAIL' && state.sqso.feed.qso)
    return state.sqso.feed.qso.likes;
  else return null;
};
const mapStateToProps = (state, ownProps) => ({
  currentQRA: state.sqso.qra,
  qso: selectorFeedType(state, ownProps),
  likes: selectorFeedTypeLikes(state, ownProps),
  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QSOLikeText);
