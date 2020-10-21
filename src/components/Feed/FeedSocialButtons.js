import React, { Fragment } from 'react';
//import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import * as Actions from '../../actions';
import QSOComments from './QSOComments';
import QSOLikeButton from './QSOLikeButton';
import QSOLikeText from './QSOLikeText';
import QSORePostButton from './QSORePostButton';
import QSOShareButtons from './QSOShareButtons';
import './style.js';

class FeedSocialButtons extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      qso: null,
      showComments: false,
      comments: [],
      likes: [],
      error: null
    };
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.qso && (JSON.stringify(this.props.qso) !== JSON.stringify(prevProps.qso)))
  //     this.setState({
  //       qso: this.props.qso
  //     });
  // }
  render() {
    const { t } = this.props;
    const commentsCounter = '(' + this.props.qso.comments.length + ')';
    let shareText;

    switch (this.props.qso.type) {
      case 'POST':
        // text = t('qso.createdPost');
        shareText = t('qso.checkOutPost');
        break;
      case 'QAP':
        // text = t('qso.createdQAP');
        shareText = t('qso.checkOutQAP');
        break;
      case 'FLDDAY':
        // text = t('qso.createdFLDDAY');
        shareText = t('qso.checkOutFLDDAY');
        break;
      default:
    }

    return (
      <Fragment>
        <QSOLikeText
          qso={this.props.qso}
          likes={this.state.likes}
          recalculateRowHeight={this.props.recalculateRowHeight}
        />
        <Button.Group fluid basic>
          <QSOLikeButton
            qso={this.props.qso}
            recalculateRowHeight={this.props.recalculateRowHeight}
          />
          <Button onClick={() => this.setState({ showComments: true })}>
            <View>
              <Icon name="comment outline" />{' '}
              {this.props.qso.comments.length > 0 && commentsCounter}
            </View>
          </Button>
          <QSORePostButton qso={this.props.qso} />
          <QSOShareButtons idqso={this.props.qso.GUID_URL} title={shareText} />
        </Button.Group>
        {this.state.showComments && (
          <QSOComments
            showComments={this.state.showComments}
            doClose={() => this.setState({ showComments: false })}
            index={this.props.index}
            qso={this.props.qso}
            comments={this.props.comments}
            recalculateRowHeight={this.props.recalculateRowHeight}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.sqso.jwtToken,
  isAuthenticated: state.userData.isAuthenticated,
  currentQRA: state.sqso.qra
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(withTranslation()(FeedSocialButtons));
