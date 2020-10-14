import React from 'react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import QRA from './QRA';
import './style.js';

export default class QRAs extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Segment
          compact
          style={{
            paddingTop: '1vh',
            paddingBottom: '0.5vh',
            minWidth: '30%',
            display: 'inline-flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            justifyContent: 'inherit',
            gap: '1vh'
          }}
        >
          {/* <div className="feed-item-qras"> */}
          {this.props.qras.map((qra, i) => (
            <QRA key={i} avatarpic={qra.avatarpic} qra={qra.qra} />
          ))}
          {/* </div> */}
        </Segment>
      </div>
    );
  }
}
