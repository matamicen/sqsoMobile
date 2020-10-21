import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View } from 'react-native';
import FeedItem from './FeedItem';

class NewsFeed extends React.Component {
  state = { currentVisibleIndex: null };
  constructor(props) {
    super(props);
    this.cellRefs = {};

    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 80 };
  }

  _onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems && viewableItems.length > 0) {
      this.setState({ currentVisibleIndex: viewableItems[0].index });
    }
  };
  _renderItem = ({ item, index }) => {
    return (
      <View>
        <FeedItem
          ref={(ref) => {
            this.cellRefs[item.id] = ref;
          }}
          key={index.toString}
          qso={item.qso}
          currentIndex={index}
          currentVisibleIndex={this.state.currentVisibleIndex}
          type={item.type}
          source={item.source}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Header
          leftComponent={
            <Icon
              name="arrow-left"
              type="font-awesome"
              // color='#fff'
              // onPress={() => console.log('pressed')}
              // underlayColor={'#64b5f6'}
            />
          }
        /> */}
        <FlatList
          onScroll={this.handleScroll}
          data={this.props.list}
          onViewableItemsChanged={this._onViewableItemsChanged}
          initialNumToRender={3}
          viewabilityConfig={this.viewabilityConfig}
          maxToRenderPerBatch={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
NewsFeed.propTypes = {
  list: PropTypes.array.isRequired
};
export default NewsFeed;
