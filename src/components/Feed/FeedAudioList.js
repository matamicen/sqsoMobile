import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
// import Item from "semantic-ui-react/dist/commonjs/views/Item";
import FeedAudio from './FeedAudio';
export default class FeedAudioList extends React.PureComponent {
  render() {
    if (this.props.mediaList.length > 0) {
      return (
        // <Item.Group style={{ margin: "0px" }}>
        <View>
          {this.props.mediaList.map((m, i) => (
            <ListItem key={i} bottomDivider>
              {/* <Item key={i} style={{ margin: "6px", display: "block" }}> */}
              <FeedAudio
                key={i}
                index={i}
                media={m}
                qso_owner={this.props.qso_owner}
                // recalculateRowHeight={this.props.recalculateRowHeight}
              />
            </ListItem>
            // {/* </Item> */}
          ))}
          {/* // </Item.Group> */}
        </View>
      );
    } else {
      return null;
    }
  }
}
