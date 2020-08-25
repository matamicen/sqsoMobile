import React, { Component } from 'react';
import { View, Platform, Text, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
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
         <View style={{ flex: 0.33,  alignItems: 'flex-start', marginTop: 4 }}>
            <TouchableOpacity  onPress={() => this.props.descartar()}>
            <Text style={{fontSize: 18, fontWeight: "bold",marginLeft: 10}} >X</Text>
            </TouchableOpacity>
       </View>
         <View style={{ flex: 0.33,  alignItems: 'center', marginTop: 4 }}>
             <Text style={{fontSize: 16}} >Crear publicación</Text>
         </View>
         <View style={{ flex: 0.33,  alignItems: 'flex-end', marginTop: 4 }}>
            <TouchableOpacity  onPress={() => this.props.publicar()}>
            <Text style={{fontSize: 18, marginRight: 10, color: '#0040ff'}}>Publicar</Text>
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