
import { Text,View,TouchableOpacity,StyleSheet,Image } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

 export const renderData = ({ item }: { item: any[] }) => (
    <Animatable.View  animation={"zoomIn"} style={styles.row} >
      {item.map((value, index) => (
        <View style={styles.product} key={index}>
          <TouchableOpacity onPress={() => {}} style={styles.itemContainer}>
            <Image
              source={require('../../../asset/Home/hometv.png')}
              style={styles.imageProduct}
            />
            <Text style={styles.textProduct}>{value.ref}</Text>
            <Text style={styles.brandText}>{value.brand}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{value.current_price + ' DH'}</Text>
              <View style={styles.addButton}>
                <AntDesign name="plus" size={20} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </Animatable.View>
  );

  const styles = StyleSheet.create({
    itemContainer: { 
        backgroundColor: '#fff', 
        borderRadius: 10, 
        padding: 10 ,
        elevation:2

      },
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 10 ,
      },
      product: { 
        flex: 1, 
        margin: 5 ,

      },
      imageProduct: {
        width: 60, 
        height: 60, 
        marginBottom: 8 
      },
      textProduct: {
        fontWeight: 'bold', 
        fontSize: 14 
      },
      brandText: { 
        fontSize: 12, 
        color: '#555' 
      },
      priceContainer: { 
         flexDirection: 'row',
         alignItems: 'center', 
         marginTop: 10
         },
      priceText: { 
        color: '#0284c7', 
        fontWeight: 'bold', 
        fontSize: 14
       },

       addButton: {
        backgroundColor: '#0284c7', 
        borderRadius: 20, 
        padding: 5, 
        marginLeft: 'auto' 
      },
  })