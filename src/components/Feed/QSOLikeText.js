import React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
import QSOLikeTextModalItem from './QSOLikeTextModalItem';

// import './style.js';
class QSOLikeText extends React.Component {
  constructor() {
    super();
    this.state = { likes: [], showModal: false };
  }
  componentDidMount() {
    // this.setState({ likes: qso ? qso.likes : [] });
    // let qso = this.props.qsos.find((q) => q.idqsos === this.props.idqsos);
    // if (qso) this.setState({ qso: qso });
  }
  static getDerivedStateFromProps(props, prevState) {
    // let qso = props.qsos.find((q) => q.idqsos === props.idqsos);
    // if (qso) return { qso: qso };
    // return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // this.setState({ likes: this.props.qso.likes });
    // let qso = this.props.qsos.find((q) => q.idqsos === this.props.idqsos);
    // if (qso) this.setState({ qso: qso });
    // console.log(this.props.qso.likes);
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
        <QSOLikeTextModalItem l={item} idqsos={this.props.idqsos} />
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
    // console.log(qso);

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
            <Text style={styles.text}>{outputText}</Text>
          </View>
        </TouchableOpacity>

        <Modal
          position={'top'}
          animationType={'slide'}
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          {/* {I18n.t('qso.likeModalHeader')}{' '}
          {qso.type === 'POST' ? I18n.t('qso.POST') : ' QSO'} */}
          <View style={styles.modal}>
            <View style={styles.iconView}>
              <Icon
                name="close"
                type="font-awesome"
                onPress={() => this.setState({ showModal: false })}
              />
            </View>
            <View style={styles.itemsView} />
            <FlatList
              pagingEnabled={true}
              onScroll={this.handleScroll}
              data={likes}
              onViewableItemsChanged={this._onViewableItemsChanged}
              initialNumToRender={3}
              viewabilityConfig={this.viewabilityConfig}
              maxToRenderPerBatch={3}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this._renderItem}
              contentContainerStyle={styles.container}
            />
          </View>
        </Modal>
      </View>
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
const mapStateToProps = (state, ownProps) => ({
  currentQRA: state.sqso.qra,
  qso: state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos),
  likes: state.sqso.feed.qsos.find((q) => q.idqsos === ownProps.idqsos).likes,
  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QSOLikeText);
