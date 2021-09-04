import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,

  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import I18n from '../../utils/i18n';
// import Amplify from 'aws-amplify';
// import Auth from '@aws-amplify/auth';
import { Auth } from '@aws-amplify/auth';
import Amplify from "@aws-amplify/core"
import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import awsconfig from '../../aws-exports';
import {languageCheck} from '../../helper';
// import Amplify, * as AmplifyModules from 'aws-amplify'


// Predictions.addPluggable(new AmazonAIPredictionsProvider());


Auth.configure(awsconfig);
Amplify.configure(awsconfig);


// estos dos de abajo ambien andan si comento el Amplify.addPluggable(....)
// Amplify.register(Predictions);
// Predictions.addPluggable(new AmazonAIPredictionsProvider());


Amplify.addPluggable(new AmazonAIPredictionsProvider());


class TranslatedDescription extends React.PureComponent {
    itemWidth = Dimensions.get('window').width;
    state = {  showTranslation: false, descriptionTranslated: '', translateText: 'Translation' };
    componentDidMount() {
        rec = languageCheck(I18n.locale.substring(0, 2));
        this.setState({translateText: rec.translateText});
        this.language = rec.language;
    }
    componentDidUpdate() {
    //   this.itemWidth = this.props.type === 'SHARE' ? slideWidth - 50 : slideWidth;
    }
  
    translate(description) {
      // I18n.locale.substring(0, 2) === 'ja'
    //   description = 'my little 🇨🇱 🇪🇸 satcom 🎙📡 station 😎 '
      var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

      withoutEmojis = description.replace(regex, '');
     console.log('description:' + withoutEmojis);
     console.log('language:' +I18n.locale.substring(0, 2))
    //  rec = languageCheck(I18n.locale.substring(0, 2));
    //  console.log(rec);
     Predictions.convert({
      translateText: {
        source: {
          text: withoutEmojis,
          language : "auto" // defaults configured in aws-exports.js
        },
        targetLanguage: this.language
        // targetLanguage: 'jj'
      }
    }).then(result => {
  
       console.log(result)
  
      this.setState({showTranslation: true, descriptionTranslated: result.text})
  
    }
    )
      .catch(err => 
        console.log('error es:' +err)
        // console.log(JSON.stringify(err, null, 2))
      )
    }
  
   
    
    render() {
      return (
        <View>
           {(!this.state.showTranslation) ?
              <TouchableOpacity style={{ width: 80 }} onPress={() => this.translate(this.props.description)}>
                  <Text  style={{
                fontSize: 16,
                color: 'blue',
                // paddingHorizontal: 5,
                //  textAlign: 'left'
                }}>
                    {this.state.translateText}</Text>
              </TouchableOpacity>
              :
              <Text  style={{
                fontSize: 18.5,
                color: 'blue',
                // paddingHorizontal: 5,
                // textAlign: 'center'
                }}>
                    {this.state.descriptionTranslated}</Text>
             }
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  
  const mapStateToProps = (state, ownProps) => ({
    token: state.sqso.jwtToken,
  
    currentQRA: state.sqso.qra
  });
  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
  });
  export default connect(mapStateToProps, mapDispatchToProps)(TranslatedDescription);
  