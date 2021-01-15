import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// import { Link } from 'react-router-dom';
// import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
const QRAProfileFollowing = ({ following, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={following}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                margin: 1,
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center'
              }}>
              <TouchableOpacity
                // style={styles.button}
                onPress={() => {
                  this.props.actions.clearQRA();
                  this.props.actions.doFetchQRA(item.qra);
                  navigation.push('QRAProfile', {
                    qra: item.qra,
                    screen: 'PROFILE'
                  });
                }}>
                <Avatar
                  size="medium"
                  rounded
                  source={
                    item.avatarpic
                      ? {
                          uri: item.avatarpic
                        }
                      : require('../../../images/emptyprofile.png')
                  }
                />
                <View className="qra">
                  <Text>{item.qra}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: { flex: 1, height: 50, flexGrow: 0 },
  buttons: { height: 30, marginTop: 40 },
  detail: { flex: 1, height: 100, flexGrow: 1, marginTop: 50 },
  container: {
    flex: 1
    // flexDirection: 'column'
    // justifyContent: 'flex-start'
    // alignItems: 'center'
    // flexGrow: 1
    // marginTop: Constants.statusBarHeight
  }
});
const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(QRAProfileFollowing)
);
