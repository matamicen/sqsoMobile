import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Header } from 'react-native-elements';
import FeedItem from './FeedItem';

class NewsFeed extends React.Component {
  state = { currentVisibleIndex: null };
  constructor(props) {
    super(props);
    this.cellRefs = {};

    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 20 };
  }

  _onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems && viewableItems.length > 0) {
      console.log(viewableItems);
      this.setState({ currentVisibleIndex: viewableItems[0].index });
    }
  };
  _renderItem = ({ item, index }) => {
    return (
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
    );
  };
  render() {
    return (
      <View>
        <Header leftComponent={{ icon: 'chevron-left', color: '#fff' }} />
        <FlatList
          onScroll={this.handleScroll}
          data={this.props.list}
          onViewableItemsChanged={this._onViewableItemsChanged}
          initialNumToRender={2}
          viewabilityConfig={this.viewabilityConfig}
          maxToRenderPerBatch={2}
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
