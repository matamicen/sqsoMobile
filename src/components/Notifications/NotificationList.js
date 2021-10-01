import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { get_notifications } from '../../actions';
import NotifItem from './NotifItem';

class NotificationList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false
    };
  }

  componentDidMount() {
    //  this.props.fetchPeople();
  }

  onRefresh() {
    // this.setState({ isFetching: true });
    this.props.get_notifications(this.props.jwtToken, this.props.blockedusers);
  }

  // _keyExtractor = item => item.idqra_notifications.toString();
  _keyExtractor = (item) => item.idqra_activity.toString();

  _renderItem = ({ item }) => {
    const {
      idqra_notifications,
      idqra_activity,
      qra_avatarpic,
      QSO_GUID,
      QRA,
      read,
      url,
      message,
      activity_type,
      DATETIME,
      comment,
      mode,
      band,
      UTC,
      qso_type,
      REF_QRA,
      route,
      param1
    } = item;

    return (
      <View>
        <View style={{ marginLeft: 0 }}>
          <NotifItem
            message={message}
            url={url}
            read={read}
            avatar_pic={qra_avatarpic}
            idqra_notifications={idqra_notifications}
            idqra_activity={idqra_activity}
            QSO_GUID={QSO_GUID}
            QRA={QRA}
            activity_type={activity_type}
            datetimecomment={DATETIME}
            comment={comment}
            mode={mode}
            band={band}
            utc={UTC}
            qsotype={qso_type}
            refqra={REF_QRA}
            navigation={this.props.navigation}
            route={route}
            param1={param1}
          />

          {/* <Text style={{ color: 'orange', fontSize: 17}}>id notif: {idqra_notifications} </Text> */}
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.notifications.length > 0 && (
          <FlatList
            style={styles.qralist}
            data={this.props.notifications}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            extraData={this.props.unreadcounter}
          />
        )}

        {/* } */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  qralist: {
    marginRight: 0

    //  marginBottom: 70,
    // maxHeight: 150
  }
});

NotificationList.propTypes = {};

const mapStateToProps = (state) => {
  return {
    notifications: state.sqso.currentQso.notifications,
    jwtToken: state.sqso.jwtToken,
    unreadcounter: state.sqso.notificationsUnread,
    blockedusers: state.sqso.currentQso.blockedUsers
  };
};

const mapDispatchToProps = {
  get_notifications
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);
