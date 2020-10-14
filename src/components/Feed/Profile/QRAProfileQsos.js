import React from 'react';
import NewsFeed from '../Feed/NewsFeedPresentational';
export default class QRAProfileQsos extends React.Component {
  render() {
    let qsos = [];
    if (this.props.qsos && this.props.qsos.length > 0) {
      for (let i = 0; i < this.props.qsos.length; i++) {
        qsos.push({
          qso: this.props.qsos[i],
          type: this.props.qsos[i].type,
          source: this.props.qsos[i].source ? this.props.qsos[i].source : null,
          ad: this.props.qsos[i].ad ? this.props.qsos[i].ad : null
        });
      }
      return (
        <NewsFeed
          list={qsos}
          QRAFetched={this.props.QRAFetched}
          FetchingQRA={this.props.FetchingQRA}
        />
      );
    }

    return null;
  }
}
