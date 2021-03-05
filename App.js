import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Picker, Button, ImageBackground } from 'react-native';

const imagen = { uri: "https://i.pinimg.com/736x/df/ca/93/dfca939078be5e449530f7f995d45d25.jpg" };

const operarConversion = (MonedaActual, monedaLocal)=> {
 
  const apiKey = '38dc502b26e186d83a0ec8352d098ca9389b564bb38a8c03abe2d592ceb3f90d';
  const URL = `https://min-api.cryptocompare.com/data/price?fsym=${MonedaActual}&tsyms=${monedaLocal}`;

  let Resultado = ' ';

  fetch(URL)
    .then(response => response.json())
    .then(datos =>{
      console.log(datos);
      Resultado = datos;
      console.log(Resultado)
    })
    return Resultado;

}

export default function App() {
  const [Monedas,setMonedas] = useState([]);
  const [MonedaActual, setMonedaActual] = useState(' ');
  const [MonedasPicker, setMonedasPicker] = useState([]);
  const [monedaLocal, setMonedaLocal] = useState('');
  const [Resultado, setResultado] = useState('');

  //promise para cargar paises 
  let MonedasArray = [];
  useEffect(() => {
    fetch('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
    .then(response => response.json())
    .then(data => {
      let monedaInfo = data.Data;
      monedaInfo.forEach(element => {
        MonedasArray.push(element.CoinInfo.Name);
      });
      console.log(monedaInfo);
      setMonedas(MonedasArray);
    });
  }, []);

  let arrPickerItems = [];
  Monedas.map((item,index) =>{
    if(item != undefined){
      arrPickerItems.push(<Picker.Item label={item} value={item} key={index}/>)
    }
  });


  return (
    <ImageBackground source={imagen} style={styles.foto}>
      <View style={styles.container}>
        <Text style={styles.texto}>Conversor de monedas y criptomonedas</Text>
        <Text style={styles.titulos}>Criptomoneda:</Text>
        <Picker
          style={styles.MonedasPicker}
          selectedValue={MonedaActual}
          onValueChange={(itemValue, itemIndex) => {
            setMonedaActual(itemValue)
          }}
  
        >
          {arrPickerItems}
        </Picker>

        {/*Picker de nombres de las criptomonedas*/}
        <Text style={styles.titulos}>Moneda Nacional:</Text>
        <Picker
          style={styles.monedaLocalPicker}
          selectedValue={monedaLocal}
          onValueChange={(itemValue, itemIndex) => {
            setMonedaLocal(itemValue)
          }}
        >
          <Picker.Item label='USD' value='USD' />
          <Picker.Item label='GBP' value='GBP' />
          <Picker.Item label='EUR' value='EUR' />
          <Picker.Item label='JPY' value='JPY' />
        </Picker>

        <View style={styles.boton}>
          <Button 
            
            color='#F08A0F'
            title= "Convertir"
            onPress = {() => {
              const URL = `https://min-api.cryptocompare.com/data/price?fsym=${MonedaActual}&tsyms=${monedaLocal}`;

              let Resultado = ' ';

              fetch(URL)
                .then(response => response.json())
                .then(datos =>{
                  console.log(datos);
                  Resultado = JSON.stringify(datos)
                  Resultado = Resultado.slice(7,-1)
                  setResultado(Resultado)
                })
            }}
          />
        </View>
        
      {MonedasPicker}
      <Text style={styles.Resultado}> Resultado: {Resultado} </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  Resultado: {
    marginTop: 80,
    fontSize: 18,
    fontFamily: 'Rockwell Extra Bold',
    color: 'white',
    backgroundColor:'black',
    padding:15,
    fontWeight: 'bold'
  },

  MonedasPicker:{
    height: 50,
    width: '50%',
    paddingLeft:'22%',
    backgroundColor: 'black',
    color: 'white',
    marginTop:40

  },

  monedaLocalPicker:{
    height: 50,
    width: '50%',
    paddingLeft:'22%',
    backgroundColor: 'black',
    color: 'white',
    marginTop:40
  },
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },

  foto:{
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: "cover",
    flex:1
  },

  texto:{
    fontSize: 40,
    fontFamily:'Bernard MT Condensed',
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'white',
    paddingTop:10,
    borderBottomWidth:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
  },

  titulos:{
    borderRadius:10,
    backgroundColor: 'white',
    padding:10,
    marginTop:50,
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Forte',
    color: '#3365B8'
    
  },

  boton:{
    marginTop:70,
    width: '20%', 
    height: 40, 
    backgroundColor: "#F08A0F", 
    borderRadius:10,
  }
});