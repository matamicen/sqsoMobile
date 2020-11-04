import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
// import PopupToFollow from '../PopupToFollow';

class QRA extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('QRAProfile', {
              qra: this.props.qra
            })
          }>
          <View style={styles.center}>
            <Avatar
              size="medium"
              rounded
              source={
                this.props.avatarpic
                  ? {
                      uri: this.props.avatarpic
                    }
                  : require('../../images/emptyprofile.png')
              }
            />

            <Text>{this.props.qra}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  container: {
    paddingHorizontal: 5
  }
});

const mapStateToProps = (state) => ({
  token: state.sqso.jwtToken,

  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps, null, {
    pure: false
  })(QRA)
);
