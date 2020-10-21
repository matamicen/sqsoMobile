import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
// import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import QRA from './QRA';
// import './style.js';

export default class QRAs extends React.PureComponent {
  _renderItem = ({ item, index }) => {
    return <QRA key={index} avatarpic={item.avatarpic} qra={item.qra} />;
  };
  render() {
    return (
      <View style={styles.container}>
        {this.props.qras.length > 0 && (
          <View style={styles.qras}>
            <FlatList
              horizontal
              pagingEnabled={true}
              onScroll={this.handleScroll}
              data={this.props.qras}
              onViewableItemsChanged={this._onViewableItemsChanged}
              initialNumToRender={3}
              viewabilityConfig={this.viewabilityConfig}
              maxToRenderPerBatch={3}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this._renderItem}
              contentContainerStyle={styles.container}
            />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  qra: {
    flex: 1
    // alignSelf: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

    // flexGrow: 1
    // marginTop: Constants.statusBarHeight
  },

  qras: {
    alignItems: 'center',
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',

    // width: '80%',
    // overflowX: 'auto',

    maxWidth: '80%',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000'

    // justifyContent: 'space-between'
    // alignItems: 'flex-start'
    // flexGrow: 1
    // marginTop: Constants.statusBarHeight
  }
});
