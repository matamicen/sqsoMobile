import React, { Component } from 'react';
import { View, Platform, Text, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../utils/i18n';
// import firebase from "react-native-firebase";

  


class Publicar extends Component {


  constructor(props) {
    super(props);
    
    this.state = {
    
      
    };
  }

  componentDidMount() {
  }

    
render() { console.log("RENDER publicar SCREEN!" );
    

return <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#d9d9d9', borderBottomWidth: 0.5}}>
         <View style={{ flex: 0.28,  alignItems: 'flex-start', marginTop: 3 }}>
            <TouchableOpacity  onPress={() => this.props.descartar()}>
            <Text style={{fontSize: 18,marginLeft: 10}} >{I18n.t("PUBLICARCANCELAR")}</Text>
            </TouchableOpacity>
       </View>
         <View style={{ flex: 0.47,  alignItems: 'center', marginTop: 3 }}>
             <Text style={{fontSize: 17}} >{I18n.t("PUBLICARNUEVA")}</Text>
         </View>
         <View style={{ flex: 0.25,  alignItems: 'flex-end', marginTop: 3 }}>
            <TouchableOpacity  onPress={() => this.props.publicar()}>
            <Text style={{fontSize: 19, marginRight: 10, fontWeight: Platform.OS==='ios' ? "bold" : "normal", color: '#4e7bff'}}>{I18n.t("PUBLICAR")}</Text>
            </TouchableOpacity>
        </View>
 


</View>; 
} 

}


 const mapStateToProps = state => {
    return {  

        
     };
};


const mapDispatchToProps = {
    
   
   }

export default connect(mapStateToProps, mapDispatchToProps)(Publicar);