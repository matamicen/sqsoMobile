import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Icon, Overlay, SearchBar } from 'react-native-elements';
import { DrawerActions, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import FeedHeaderSearch from './FeedHeaderSearch';
class FeedHeaderBar extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false
    };
  }

  render() {
    return (
      <View style={{ height: 60, zIndex: 999 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 20,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            zIndex: 999
          }}>
          <View
            style={{
              flex: 1,
              flexBasis: 60,
              flexGrow: 0,
              flexShrink: 0,
              marginTop: 5,
              marginLeft: 5
            }}>
            <Avatar
              size="medium"
              rounded
              source={require('../../images/superqsoIconAzul.png')}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexGrow: 1,
              zIndex: 999
            }}>
            <Pressable onPress={() => this.setState({ modalVisible: true })}>
              <SearchBar
                round
                lightTheme
                placeholder="Type Here..."
                onChangeText={() => this.setState({ modalVisible: true })}
                // value={search}
              />
            </Pressable>
          </View>
          <View
            style={{
              flex: 1,
              flexBasis: 40,
              flexGrow: 0,
              marginTop: 12,
              marginRight: 5
            }}>
            <Icon
              size={30}
              name="navicon"
              type="font-awesome"
              onPress={() => {
                this.props.navigation.dispatch(DrawerActions.openDrawer());
              }}
            />
          </View>
        </View>
        <Overlay
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setState({ modalVisible: false })}>
          <FeedHeaderSearch
            navigate={(qra) => {
              this.props.navigation.navigate('QRAProfile', {
                qra
              });
              this.setState({ modalVisible: false });
            }}
          />
        </Overlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    zIndex: 999
    // padding: 16,
    // marginTop: 40
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    zIndex: 999
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16
  }
});
const mapStateToProps = (state) => ({
  FetchingQSOS: state.sqso.feed.FetchingQSOS,
  qsosFetched: state.sqso.feed.qsosFetched,
  //   authenticating: state.sqso.feeduserData.authenticating,
  currentQRA: state.sqso.qra,

  token: state.sqso.jwtToken,
  qsos: state.sqso.feed.qsos
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(FeedHeaderBar)
);
