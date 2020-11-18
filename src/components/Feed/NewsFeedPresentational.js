import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View } from 'react-native';
import FeedItem from './FeedItem';
class NewsFeed extends React.PureComponent {
  state = {
    currentVisibleIndex: null,
    list: this.props.list,
    refresh: false
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.list && this.props.list !== prevProps.list) {
      this.setState({ refresh: true, list: this.props.list });
    }
  }
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
    console.log(index, item.type);
    if (item)
      return (
        <View>
          <FeedItem
            ref={(ref) => {
              this.cellRefs[item.id] = ref;
            }}
            feedType={this.props.feedType}
            key={index.toString}
            idqsos={item.qso.idqsos}
            currentIndex={index}
            currentVisibleIndex={this.state.currentVisibleIndex}
            type={item.type}
            source={item.source}
          />
        </View>
      );
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%'
        }}
      />
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          // extraData={this.state.refresh}
          onScroll={this.handleScroll}
          data={this.props.list}
          onViewableItemsChanged={this._onViewableItemsChanged}
          initialNumToRender={5}
          viewabilityConfig={this.viewabilityConfig}
          maxToRenderPerBatch={5}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this._renderItem.bind(this)}
          removeClippedSubviews={true} // Unmount components when outside of window
          windowSize={3} // Reduce the window size
        />
      </View>
    );
  }
}
NewsFeed.propTypes = {
  list: PropTypes.array.isRequired
};
export default NewsFeed;
