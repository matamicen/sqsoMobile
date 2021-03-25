/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  Modal,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import {} from '../../actions';

class UnreadCounter extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      //<View >

      this.props.unreadcounter !== 0 ? (
        <Text
          style={{
            color: 'white',
            position: 'absolute',
            //    top:1,
            top: 1,
            left: 38,
            //    margin: -1,
            minWidth: 18,
            // height:18,
            borderRadius: 6,
            overflow: 'hidden',
            // alignItems: 'center',
            // justifyContent: 'center',
            backgroundColor: '#FF0000',
            fontWeight: 'bold',

            textAlign: 'center',
            fontSize: 10
          }}>
          {this.props.unreadcounter}
        </Text>
      ) : null

      //  </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    unreadcounter: state.sqso.notificationsUnread
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UnreadCounter);
