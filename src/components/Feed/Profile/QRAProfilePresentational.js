import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import I18n from '../../../utils/i18n';
import QRAProfileBio from './QRAProfileBio';
import QRAProfileFollowing from './QRAProfileFollowing';
import QRAProfileHeader from './QRAProfileHeader';
import QRAProfileInfo from './QRAProfileInfo';
import QRAProfileQsos from './QRAProfileQsos';

class QRAProfile extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }
  render() {
    const buttons = [
      I18n.t('qra.qsos'),
      I18n.t('qra.bio'),
      I18n.t('qra.info'),
      I18n.t('qra.following')
    ];
    const { selectedIndex } = this.state;
    return (
      <View style={styles.container}>
        {/* <Dimmer
        active={this.props.adActive}
        onPress={this.props.handleClose}
        page
        // verticalAlign="center"
      >
        <Ad
          adslot="/21799560237/qraDetail/intersitial"
          width={640}
          height={480}
          id="qradetail-intersitial"
          displayOnly={true}
        />
      </Dimmer> */}

        {!this.props.active && this.props.qra && (
          <View style={styles.container}>
            <View style={styles.header}>
              <QRAProfileHeader
                qraInfo={this.props.qraInfo}
                following={this.props.following}
                followers={this.props.followers}
                userFetched={this.props.userFetched}
                followed={this.props.followed}
                onPress={this.props.onPress}
                currentQRA={this.props.currentQRA}
              />
            </View>
            <View style={styles.buttons}>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={styles.buttons}
              />
            </View>
            <View style={styles.detail}>
              {
                {
                  0: (
                    <QRAProfileQsos
                      qsos={this.props.qra ? this.props.qra.qsos : []}
                      fetchingQRA={this.props.fetchingQRA}
                      QRAFetched={this.props.QRAFetched}
                    />
                  ),
                  1: <QRAProfileBio qraInfo={this.props.qraInfo} />,
                  2: <QRAProfileInfo qraInfo={this.props.qraInfo} />,
                  3: (
                    <QRAProfileFollowing
                      following={
                        this.props.qra ? this.props.qra.following : null
                      }
                    />
                  )
                }[this.state.selectedIndex]
              }
            </View>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: { flex: 1, height: 50, flexGrow: 0 },
  buttons: { height: 30, marginTop: 40 },
  detail: { flex: 1, height: 100, flexGrow: 1, marginTop: 50 },
  container: {
    flex: 1,
    flexDirection: 'column'
    // justifyContent: 'flex-start'
    // alignItems: 'center'
    // flexGrow: 1
    // marginTop: Constants.statusBarHeight
  }
});
export default QRAProfile;
