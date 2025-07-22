import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, Platform } from 'react-native';
import { styles } from '../../styles/styles';
import ContentView from '../../components/ContentView/ContentView';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../context/DataContext';
import HeaderMenuContent from '../../components/HeaderMenu/HeaderMenuContent';
import CardView from '../../components/CardView/CardView';
import ButtonSelect from '../../components/ButtonSelect/ButtonSelect';
import * as RNIap from 'react-native-iap';
import { Inter2 } from '../../ads/Inter2';

const PremiumScreen = () => {
    const navigation: any = useNavigation();
    const { addGems } = useContext(DataContext);
    const [isVisibleCountryName, setVisibleCountryName] = useState(false);
    const [products, setProducts] = useState<any>([]);
    Inter2()
    // const itemSkus = [Platform.OS === 'ios' ? 'com.countriesincesoyselim.iap1' : 'diamond_pack_1'];
    const itemSkus: any = Platform.select({
        ios: [
            'com.countriesincesoyselim.iap1', 'com.countriesincesoyselim.iap2'
        ],
        android: ['diamond_pack_1', 'diamond_pack_2'],
    });
    useEffect(() => {
        // if (__DEV__) {
        //     console.log('⚠️ IAP çalışmaz çünkü simülatördeyiz.');
        //     return;
        // }

        RNIap.initConnection()
            .then(async () => {
                const items: any = await RNIap.getProducts({ skus: itemSkus });
                console.log('📦 Ürünler:', items);
                setProducts(items);
            })
            .catch((err) => {
                console.warn('Ürün getirme hatası:', err);
            });
    }, []);


    useEffect(() => {
        const purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(async (purchase) => {
            const receipt = purchase.transactionReceipt;

            if (receipt) {
                try {
                    const sku = purchase.productId;
                    const gemAmount =
                        sku === 'com.countriesincesoyselim.iap1' || sku === 'diamond_pack_1'
                            ? 14
                            : 100;

                    // 🛡️ Android: Eğer zaten acknowledged ise tekrar finishTransaction yapma
                    const alreadyAcknowledged =
                        Platform.OS === 'android' && purchase.isAcknowledgedAndroid;

                    if (!alreadyAcknowledged) {
                        await RNIap.finishTransaction(purchase, false);
                        addGems(gemAmount);
                        Alert.alert("Satın alma başarılı", `${gemAmount} elmas hesabınıza eklendi.`);
                    } else {
                        console.log("⛔️ Bu satın alma zaten tamamlanmış (acknowledged), işlem yapılmadı.");
                    }
                } catch (error: any) {
                    console.log('❌ Satın alma sonrası hata:', error.message || error);
                }
            }
        });

        const purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
            console.log('Satın alma hatası:', error);
        });

        return () => {
            purchaseUpdateSubscription.remove();
            purchaseErrorSubscription.remove();
            RNIap.endConnection();
        };
    }, []);



    const handlePurchase = async (sku: string) => {
        console.log('🟢 Satın alma başlatılıyor, SKU:', sku);
        const params: any = Platform.select({
            ios: {
                sku,
                andDangerouslyFinishTransactionAutomaticallyIOS: false
            },
            android: {
                skus: [sku]
            }
        })

        await RNIap.requestPurchase(params)
        // console.warn('❌ Satın alma başlatılamadı:', err);
        console.log("object")
    }

    return (
        <ContentView>
            <HeaderMenuContent title={"Goverment"} />
            <ScrollView style={{ paddingHorizontal: "2%" }}>
                {
                    products.map((prod: any) => {
                        return (
                            <CardView key={prod.title}>
                                <View style={{ flexDirection: "row", marginVertical: 6, alignItems: "center" }}>
                                    <View style={{ paddingStart: 12, flex: 1 }}>
                                        <Text style={[styles.txtDarkTitle]}>
                                            {prod.title}
                                        </Text>
                                        <Text style={styles.txtDark}>
                                            {prod.localizedPrice}
                                        </Text>
                                        <Text />
                                        <ButtonSelect
                                            onPress={() => {
                                                handlePurchase(prod?.productId)
                                            }}
                                            text={prod.description}
                                        />
                                    </View>
                                </View>
                            </CardView>
                        )
                    })
                }
            </ScrollView>
        </ContentView>
    );
};

export default PremiumScreen;
