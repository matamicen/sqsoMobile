import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
// import './style.js';
import TextToFollow from './TextToFollow';
class FeedItemHeader extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let text;
    let shareText;

    switch (this.props.qso.type) {
      case 'QSO':
        text = I18n.t('qso.workedAQSO');
        shareText = I18n.t('qso.checkOutQSO');
        break;
      case 'LISTEN':
        text = I18n.t('qso.listenedQSO');
        shareText = I18n.t('qso.checkOutQSO');
        break;
      case 'SHARE':
        text = I18n.t('qso.repostedQSO');
        shareText = I18n.t('qso.checkOutPost');
        break;
      default:
    }
    return (
      <View style={styles.header}>
        <View style={styles.avatar}>
          <View>
            <TouchableOpacity
              // style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('QRAProfile', {
                  qra: this.props.qso.qra
                })
              }>
              <Avatar
                size="large"
                rounded
                source={
                  this.props.qso.avatarpic
                    ? {
                        uri: this.props.qso.avatarpic
                      }
                    : require('../../images/emptyprofile.png')
                }
              />
            </TouchableOpacity>
          </View>
          <View style={styles.follow}>
            <TextToFollow qra={this.props.qso.qra} />
          </View>
        </View>
        <View style={styles.action}>
          <TouchableOpacity
            // style={styles.button}
            onPress={() =>
              this.props.navigation.navigate('QRAProfile', {
                qra: this.props.qso.qra
              })
            }>
            <Text>{this.props.qso.qra}</Text>
          </TouchableOpacity>
          <Text>{text}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row'
    // flexGrow: 1
    // marginTop: Constants.statusBarHeight
  },
  avatar: {
    flex: 1,
    flexDirection: 'column',
    width: 50
    // flexGrow: 1
    // marginTop: Constants.statusBarHeight
  },
  follow: {
    flex: 1,
    flexDirection: 'column',
    width: 70
    // flexGrow: 1
    // marginTop: Constants.statusBarHeight
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20
  },
  title: {
    fontSize: 32
  }
});

const mapStateToProps = (state) => ({
  token: state.sqso.jwtToken,
  // isAuthenticated: state.userData.isAuthenticated,
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(FeedItemHeader);
