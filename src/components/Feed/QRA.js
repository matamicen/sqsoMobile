import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
// import PopupToFollow from '../PopupToFollow';

export default class QRA extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('QRAProfile', {
              qra: this.props.qra
            })
          }>
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
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
    // flexGrow: 1
    // marginTop: Constants.statusBarHeight
  }
});
