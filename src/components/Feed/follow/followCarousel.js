import React from 'react';
import I18n from '../../../utils/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

import { withNavigation } from 'react-navigation';
import { Image, Button, Avatar, Card, Icon } from 'react-native-elements';

import Carousel from 'react-native-snap-carousel';
class FollowCarousel extends React.PureComponent {
  _renderItem(props) {
    let qra = props.item;
    return (
      <View
        key={qra.qra}
        style={{
          // flex: 1,
          // width: 100,
          height: 175,
          margin: 3
        }}>
        <Card
          containerStyle={{
            height: 175,
            borderRadius: 5,
            // flex: 1,
            // flexWrap: 'wrap',
            // width: 390,
            padding: 5,
            margin: 0
          }}>
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.avatar}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.actions.clearQRA();
                    this.props.actions.doFetchQRA(qra.qra);
                    this.props.navigation.push('QRAProfile', {
                      qra: qra.qra,
                      screen: 'PROFILE'
                    });
                  }}>
                  <Avatar
                    size="medium"
                    rounded
                    source={
                      qra.avatarpic
                        ? {
                            uri: qra.avatarpic
                          }
                        : require('../../../images/emptyprofile.png')
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.name}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.actions.clearQRA();
                    this.props.actions.doFetchQRA(qra.qra);
                    this.props.navigation.push('QRAProfile', {
                      qra: qra.qra,
                      screen: 'PROFILE'
                    });
                  }}>
                  <Text numberOfLines={1} style={{ fontSize: 16 }}>
                    {qra.qra}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 13
                    }}>
                    {qra.firstname ? qra.firstname : ''}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 13
                    }}>
                    {qra.lastname ? qra.lastname : ''}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <Card.Divider /> */}
            <View style={styles.kpi}>
              <View>
                <Text style={{ fontSize: 13 }}>
                  <Icon
                    name="edit"
                    size={16}
                    type="font-awesome"
                    containerStyle={{ width: 20 }}
                  />
                  {qra.qsos_counter} {I18n.t('exploreUsers.qsosCreated')}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 13 }}>
                  <Icon
                    name="user"
                    size={16}
                    type="font-awesome"
                    containerStyle={{ width: 20 }}
                  />
                  {qra.followers_counter} {I18n.t('qra.followers')}
                </Text>
              </View>
            </View>
            {/* <Card.Divider style={styles.divider} /> */}
            <View style={styles.buttons}>
              {this.props.following.some((o) => o.qra === qra.qra) ||
              this.props.followed.some((o) => o === qra.qra) ? (
                <Button
                  fluid
                  disabled
                  style={{ paddingLeft: 10, paddingRight: 10 }}
                  title={I18n.t('qra.following')}
                />
              ) : (
                <Button
                  fluid
                  raised
                  onPress={() => this.props.doFollow(qra.qra)}
                  style={{
                    // paddingLeft: 10,
                    // paddingRight: 10,
                    margin: 0
                    // padding: 0
                  }}
                  title={
                    this.props.followers.some((o) => o.qra === qra.qra)
                      ? I18n.t('qra.followToo')
                      : I18n.t('qra.follow')
                  }
                />
              )}
            </View>
          </View>
        </Card>
      </View>
    );
  }

  render() {
    if (this.props.follow.length > 1) {
      let sliderWidth = Dimensions.get('window').width;

      return (
        <Card containerStyle={{ margin: 0, padding: 5 }}>
          <Card.Title>{I18n.t('navBar.whoToFollow')}</Card.Title>
          <Card.Divider />
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            layout="default"
            data={this.props.follow}
            renderItem={this._renderItem.bind(this)}
            sliderWidth={sliderWidth}
            itemWidth={180}
            // removeClippedSubviews={false}
            // initialNumToRender={0}.bindd
          />
        </Card>
      );
    } else return null;
  }
}
const styles = StyleSheet.create({
  card: {},

  buttons: {
    // flex: 1,
    margin: 0,
    padding: 0
    // flexBasis: 50,
    // flexDirection: 'column',
    // alignItems: 'flex-start'
  },
  kpi: {
    flex: 1,
    margin: 0,
    padding: 0,
    flexBasis: 50,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  avatar: {
    flex: 1,

    flexBasis: 60,
    flexGrow: 0,
    flexShrink: 0
  },
  name: {
    flex: 1,

    flexBasis: 90,
    flexGrow: 0,
    flexShrink: 0
  },
  header: {
    flex: 1,
    flexBasis: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
});

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(FollowCarousel)
);
