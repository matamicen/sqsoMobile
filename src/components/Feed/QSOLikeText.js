import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
//import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
//import { withRouter } from 'react-router-dom';
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
    this.setState({ likes: this.props.qso ? this.props.qso.likes : [] });
  }
  static getDerivedStateFromProps(props, prevState) {
    if (props.qso.likes && props.qso.likes.length !== prevState.likes.length)
      return { likes: props.qso.likes };
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.qso.likes.length === 1 &&
      this.props.qso.likes[0].qra === this.props.currentQRA
    ) {
      this.props.recalculateRowHeight();
    }
  }
  render() {
    console.log('QSOLikeText');
    const { qso } = this.props;
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
          animationType="slide"
          // transparent={true}
          presentationStyle="pageSheet"
          centered={true}
          // closeIcon={{
          //   // style: { top: '0.0535rem', right: '0rem' },
          //   color: 'black',
          //   name: 'close'
          // }}
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}
          // style={{
          //   //height: '90%',
          //   overflowY: 'auto'
          // }}
        >
          {/* {I18n.t('qso.likeModalHeader')}{' '}
          {qso.type === 'POST' ? I18n.t('qso.POST') : ' QSO'} */}
          <View
            style={{
              padding: 10,
              backgroundColor: 'rgba(0,0,0,0.90)',
              marginTop: 230,
              left: 50,
              right: 15,
              //  width: 170,
              width: 290,
              height: 150,

              paddingVertical: 5,

              borderRadius: 12
            }}>
            {likes.map((l) => (
              // <View key={l.idqsos_likes} style={{ padding: '1vh' }} />
              <View key={l.qra}>
                <QSOLikeTextModalItem
                  l={l}
                  qso={this.props.qso}
                  likes={likes}
                />
              </View>
            ))}
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
  currentQRA: state.sqso.qra,
  token: state.sqso.jwtToken
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QSOLikeText);
