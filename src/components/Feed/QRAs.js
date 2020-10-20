import React from 'react';
import { StyleSheet, View } from 'react-native';
// import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import QRA from './QRA';
// import './style.js';

export default class QRAs extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        {this.props.qras.map((qra, i) => (
          <QRA key={i} avatarpic={qra.avatarpic} qra={qra.qra} />
        ))}
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
