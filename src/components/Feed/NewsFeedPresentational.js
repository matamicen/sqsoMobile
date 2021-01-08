import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import FeedItem from './FeedItem';
class NewsFeedPresentational extends React.PureComponent {
  state = {
    currentVisibleIndex: null,
    list: this.props.list,
    feedFetchedDate: null,
    refresh: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.list && this.props.list !== prevProps.list) {
      this.setState({ refresh: true, list: this.props.list });
    }
    if (
      this.props.feedFetchedDate !== prevProps.feedFetchedDate &&
      this.flatListRef
    )
      this.flatListRef.scrollToOffset({ offset: 0, animated: true });
  }
  constructor(props) {
    super(props);
    this.cellRefs = {};

    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 80 };
  }

  _onViewableItemsChanged = (props) => {
    props.changed.map((c) => {
      if (!c.isViewable && c.item.type !== 'AD') {
        this.props.actions.doPauseVideo(c.item.qso.idqsos);
      }
    });
    // if (viewableItems && viewableItems.length > 0) {
    //   // this.setState({ currentVisibleIndex: viewableItems[0] });
    // }
  };
  _renderItem = ({ item, index }) => {
    if (item)
      return (
        <View style={{ zIndex: 0 }}>
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
            scrollToTop={() => this.scrollToTop()}
          />
        </View>
      );
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 20,
          width: '100%',
          backgroundColor: '#CED0CE'
          // marginLeft: '14%'
        }}
      />
    );
  };
  render() {
    return (
      <View style={{ flex: 1, zIndex: 0 }}>
        <MenuProvider skipInstanceCheck backHandler={true} style={{ flex: 1 }}>
          <FlatList
            ref={(ref) => {
              this.flatListRef = ref;
            }}
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
            windowSize={5} // Reduce the window size
          />
        </MenuProvider>
      </View>
    );
  }
}
NewsFeedPresentational.propTypes = {
  list: PropTypes.array.isRequired
};
const mapStateToProps = (state) => {
  return {
    feedFetchedDate: state.sqso.feed.feedFetchedDate
    // qsos: state.sqso.feed.qsos,
    // FetchingQSOS: state.sqso.feed.FetchingQSOS,
    // qsosFetched: state.sqso.feed.qsosFetched
    // authenticating: state.sqso.feed.userData.authenticating,
    // token: state.sqso.feed.userData.token
    // public: state.sqso.feed.userData.public
  };
};
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsFeedPresentational);
