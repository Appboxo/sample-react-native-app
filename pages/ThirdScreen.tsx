/*CORE*/
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
/*LIBS*/
import appboxosdk from '@appboxo/react-native-sdk';

export default function ThirdScreen() {
  const [products, setProducts] = useState<object[]>([]);

  React.useEffect(() => {
      fetch('https://shop.appboxo.com/api/v1/unacash/store/open_api/')
      .then((response) => {
          return response.json();
      }).then((body)=>{
        setProducts(body.products);
      });

    return () => {
    
    };
  }, []);

  return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
                {products.length > 0 &&
                    products.map((product, index) => (
                        <View key={index}>
                          <Pressable style={styles.productContainer} onPress={()=>{
                              console.log("App-"+product.appId);
                              console.log("handle-"+product.handle);
                              appboxosdk.openMiniapp(product.appId, { extraUrlParams: { 'productId' : ''+product.handle } })
                            }}>
                              {product.image.transformedSrc && (
                                <Image source={{ uri: product.image.transformedSrc }} style={styles.logo}/>
                              )}
                            <Text style={styles.productTitle}>{product.name}</Text>
                            </Pressable>
                        </View>
                    ))}
            </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
      justifyContent: 'space-around',
  },
  scrollContainer: {
      flex: 1,
      width: '100%'
  },
  productContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
  },
  productTitle: {
      color: '#000000',
      marginStart: 16,
  },
  logo: {
      width: 50,
      height: 50,
  },
});
