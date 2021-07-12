import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import I18n from '../../utils/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import analytics from '@react-native-firebase/analytics';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
class SideMenu extends Component {
  // navigateToScreen = (route) => () => {
  //   const navigateAction = NavigationActions.navigate({
  //     routeName: route
  //   });
  //   this.props.navigation.push(route);
  // };
  constructor(props){
    super(props);
    this.state = {
        animatePosition: new Animated.ValueXY({x:height, y:-width}),
        animateBorder: new Animated.Value(0),
        animatedSize: new Animated.ValueXY({x: (3*height+45), y: (3*height+45)}),
        tutorialTextPosition: {left: -width*0.1, top: height*0.75},
        tutorialText: I18n.t("HelpTutorials"),
        animatedOpacity: 0,
        nextOpacity: 1,
        showTutorial: false
    }
  }
  animationZero = true;
  componentDidMount(){
    //Todo esto debe ejecutarse al tocar el boton de ayuda.
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
    if(this.state.showTutorial){
      this.props.actions.showTutorial();
    }
    // if(this.props.showTutorial){
    //   this.animationZero = false;
    //   Animated.sequence([
    //     Animated.timing(this.state.animatePosition,{
    //       toValue: {x:-height*1.568, y:-height*1.49},
    //       duration:2000,
    //       useNativeDriver: false
    //     }),
    //     Animated.timing(this.state.animateBorder,{
    //       toValue:1.5*height, 
    //       duration:2000,
    //       useNativeDriver: false 
    //     })
      
    //   ]).start(() => {
    //     setTimeout(() => {
    //       this.props.navigation.dispatch(DrawerActions.openDrawer());
    //       this.firstAnimation();
    //     },100)
          
    //   });
    // }
    
  }
  componentDidUpdate(){
    if(this.state.showTutorial && this.animationZero){
      this.animationZero = false;
      Animated.sequence([
        Animated.timing(this.state.animatePosition,{
          toValue: {x:-height*1.568, y:-height*1.49},
          duration:2000,
          useNativeDriver: false
        }),
        Animated.timing(this.state.animateBorder,{
          toValue:1.5*height, 
          duration:2000, 
          useNativeDriver: false 
        })
      
      ]).start(() => {
        setTimeout(() => {
          this.props.navigation.dispatch(DrawerActions.openDrawer());
          this.firstAnimation();
        },100)
          
      });
    }
  }
  tutorialSalir = () => {
    this.moveAnimated(height, -width, (3*height+45), (3*height+45), 1000, ()=>{console.log("salir callback")});
    Animated.timing(this.state.animateBorder,{
      toValue:0,
      duration:500,
      useNativeDriver: false
    }).start();
    this.setState({animatedOpacity: 0, 
      nextButtonListener: this.firstAnimation, 
      tutorialTextPosition: {left: -width*0.1, top: height*0.75},
      tutorialText: I18n.t("HelpTutorials"),
      nextOpacity: 1});
    this.props.actions.showTutorial();
    this.animationZero = true;
  }
  firstAnimation = () =>{
    this.moveAnimated(-height*1.058, -height*1.5, (3*height+45), (3*height+135), 1001, ()=>{
      this.setState({animatedOpacity: 1});
    });
  }
  secondAnimation = ()=>{
    console.log("second animation callback")
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
    this.setState({animatedOpacity: 0})
    this.moveAnimated(-height*1.49, -height*1.718, (3*height+45), (3*height+45), 1500, ()=>{
      this.setState({tutorialText: I18n.t("HelpSearch"),
      tutorialTextPosition: {left: -width*0.8, top: height*0.65},
      animatedOpacity: 1,
      nextOpacity: 0});
    });
    
  }
  moveAnimated = (posH, posW, sizH, sizW, duration, callback)=>{
      Animated.timing(this.state.animatePosition,{
        toValue: {x:posW, y:posH},
        duration:duration,
        useNativeDriver: false
      }).start();
      Animated.timing(this.state.animatedSize, {
        toValue: {x: sizW, y: sizH},
        duration: duration, 
        useNativeDriver: false
      }).start(()=>{
        callback();
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            width: this.state.animatedSize.x,
            height: this.state.animatedSize.y,
            position: 'absolute',
            borderColor: 'rgba(35,54,101,0.8)', 
            borderRadius: 10000,
            borderWidth: this.state.animateBorder,
            top: this.state.animatePosition.y,
            left: this.state.animatePosition.x,
            zIndex: 1000
          }}
        />
        <View style={{
            position: 'absolute',
            left: this.state.tutorialTextPosition.left,
            top: this.state.tutorialTextPosition.top,
            zIndex: 1002
        }}>
            <View
              style = {{
                position:'absolute', 
                left: 100,
                top: 130,
                opacity: this.state.animatedOpacity
              }}>
              <TouchableOpacity onPress={this.secondAnimation}>
                <Text style={{fontSize: 25, color:'#FFF', opacity: this.state.nextOpacity}}>Siguiente</Text>
              </TouchableOpacity>
            </View>
            <View
              style = {{
                position:'absolute',
                left: -10,
                top: 130,
                zIndex: 1001,
                opacity: this.state.animatedOpacity
              }}>
              <TouchableOpacity onPress={this.tutorialSalir}>
                <Text style={{fontSize: 25, color:'#FFF'}}>Salir</Text>
              </TouchableOpacity>
            </View>
            <View style={{
              position:'absolute',
              left: 0,
              top: 0,
              zIndex: 1001,
              opacity: this.state.animatedOpacity
            }}>
              <Text style={{fontSize:25, color:'#FFF', width: width*0.6}}>{this.state.tutorialText}</Text>
            </View>
        </View>
        
        <ScrollView>
          <View>
            {/* <Text style={styles.sectionHeadingStyle}>Section 1</Text> */}
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={() => {
                  if (!__DEV__)
                    analytics().logEvent('drawerHomePressed_APPPRD');

                  this.props.navigation.dispatch(DrawerActions.closeDrawer());

                  this.props.navigation.navigate('Home');
                }}>
                {I18n.t('HomeTitle')}
              </Text>
            </View>
          </View>
          <View>
            {/* <Text style={styles.sectionHeadingStyle}>Section 1</Text> */}
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={() => {
                  if (!__DEV__)
                    analytics().logEvent('drawerLatestUsersPressed_APPPRD');
                  this.props.actions.doLatestUsersFetch();
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());

                  this.props.navigation.navigate('ExploreUsers');
                }}>
                {I18n.t('navBar.exploreUsers')}
              </Text>
            </View>
          </View>
          <View>
            {/* <Text style={styles.sectionHeadingStyle}>Section 2</Text> */}
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={() => {
                  if (!__DEV__)
                    analytics().logEvent('drawerFieldDaysPressed_APPPRD');
                  this.props.actions.doFetchFieldDaysFeed();
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());

                  this.props.navigation.navigate('FieldDays');
                }}>
                {I18n.t('navBar.lastFieldDays')}
              </Text>
            </View>
          </View>
          <View>
            {/* <Text style={styles.sectionHeadingStyle}>Section 2</Text> */}
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={() => {
                  if (!__DEV__)
                    analytics().logEvent('drawerMyPostsPressed_APPPRD');
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());
                  this.props.navigation.navigate('QRAProfile');
                }}>
                {I18n.t('navBar.myPosts')}
              </Text>
            </View>
          </View>
          <View>
            {/* <Text style={styles.sectionHeadingStyle}>Section 2</Text> */}
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={() => {
                  if (!__DEV__)
                    analytics().logEvent('drawerEditBioPressed_APPPRD');
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());
                  this.props.navigation.navigate('editBio');
                }}>
                {I18n.t('navBar.editBio')}
              </Text>
            </View>
          </View>
          <View>
            {/* <Text style={styles.sectionHeadingStyle}>Section 2</Text> */}
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={() => {
                  if (!__DEV__)
                    analytics().logEvent('drawerEditInfoPressed_APPPRD');
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());
                  this.props.navigation.navigate('editInfo');
                }}>
                {I18n.t('navBar.editProfile')}
              </Text>
            </View>
          </View>
          <View> 
            {/* <Text style={styles.sectionHeadingStyle}>Section 2</Text> */}
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={() => {
                  if (!__DEV__)
                    analytics().logEvent('drawerMyPostsPressed_APPPRD');
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());
                  this.props.navigation.navigate('QRAProfile');
                }}>
                Tutoriales
              </Text>
            </View>
          </View>
          <View></View>
        </ScrollView>
        {/* <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View> */}
      </View>
    );
  }
  static getDerivedStateFromProps(props, prevState){
    return {
      showTutorial: props.showTutorial
    }
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  }, 
  navItemStyle: {
    padding: 10,
    fontSize: 20
  },
  navSectionStyle: {
    // backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  }
});

const mapStateToProps = (state) => ({
  currentQRA: state.sqso.qra,
  showTutorial: state.sqso.showTutorial
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(SideMenu)
);
