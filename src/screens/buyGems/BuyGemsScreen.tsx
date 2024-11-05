import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { styles } from '../../styles/styles';
import ContentView from '../../components/ContentView/ContentView';
import { useNavigation } from '@react-navigation/native';
import ButtonClose from '../../components/ButtonClose/ButtonClose';
import { colors } from '../../styles/colors';
import { DataContext } from '../../context/DataContext';
import ButtonSelect from '../../components/ButtonSelect/ButtonSelect';
import { BarracksUpdate } from '../../utils/BarracksUpdate';
import CardView from '../../components/CardView/CardView';
import { RecruitSoldier } from '../../utils/RecruitSoldier';
import { soldier_power } from '../../data/soldier_powers';
import { soldier_costs } from '../../data/soldier_costs';
import { soldier_maintenance } from '../../data/soldier_maintenance';
import { build_costs } from '../../data/build_costs';
import { calculateSoldierAmount } from '../../utils/CalculateSoldierAmount';
import { build_maintenance } from '../../data/build_maintenance';
import { BuildUpdate } from '../../utils/BuildUpdate';
import { build_defence_powers } from '../../data/build_defence_powers';
import HeaderMenuContent from '../../components/HeaderMenu/HeaderMenuContent';
import G1 from '../../ads/G1';
import * as IAP from 'react-native-iap';

export const BuyGemsScreen = () => {
    const navigation: any = useNavigation();
    const { data, setData,
        buildIncomeWood,
        buildIncomeClay,
        buildIncomeIron,
        buildMaintenanceGold,
        buildMaintenanceWood,
        buildMaintenanceClay,
        buildMaintenanceIron,
        armyMaintenanceGold,
        armyMaintenanceWood,
        armyMaintenanceClay,
        armyMaintenanceIron,
    } = useContext(DataContext)
    // REKLAM
    // G1()

    const skus = Platform.select({
        android: [
            "com.countrieswar.iap1",
            "com.countrieswar.iap2",
            // "destek2"
        ],
        ios: [
            "com.countrieswar.iap1",
            "com.countrieswar.iap2"
        ]
    });

    let purchaseUpdateSubscription;
    let purchaseErrorSubscription;

    const [subscriptionProducts, setSubscriptionProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        IAP.initConnection()
            .then(async () => {
                setLoading(true)
                getSubs()
            })
            .finally(() => setLoading(false))

    }, [])

    const getSubs = async () => {
        await IAP.getProducts({ skus })
            .then((res) => {
                setSubscriptionProducts(res)
                console.log("subscriptionProducts: ", subscriptionProducts)
            })
    }

    useEffect(() => {
        IAP.purchaseUpdatedListener(async (purchase) => {
            console.log('purchaseUpdatedListener', purchase);
            const receipt = purchase.transactionReceipt;
            console.log('receipt receipt', receipt);

            if (receipt) {
                purchase.transactionReceipt
                console.log('purchase.transactionReceipt', purchase.transactionReceipt);
            }
            await finishTransaction({ purchase, isConsumable: false });
            setData((prevData: any) => ({
                ...prevData,
                tower: prevData.tower + 1,
                gems: prevData.gems + 11,
            }
            ));
        })
    }, [IAP.purchaseUpdatedListener])

    const handlePurchase = async (sku, offerToken) => {
        console.log("SKU: ", sku)
        console.log("OFFERTOKEN: ", offerToken)
        try {
            await IAP.requestPurchase(offerToken == null ? { sku } : { subscriptionOffers: [{ sku, offerToken }], })
                .then(() => {
                    if (sku == "com.countrieswar.iap1") {
                        setData((prevData: any) => ({
                            ...prevData,
                            gems: prevData.gems + 20
                        }
                        ));
                    }
                    if (sku == "com.countrieswar.iap2") {
                        setData((prevData: any) => ({
                            ...prevData,
                            gems: prevData.gems + 200
                        }
                        ));
                    }
                }
                )
        } catch (error) {
            console.warn("HATA", error.code, error.message)
        }
    };
    return (
        <ContentView>
            <HeaderMenuContent title={"Buy Gems"} />
            {
                loading ?
                    <Text>Loading</Text>
                    :
                    <ScrollView style={{
                        paddingHorizontal: "2%",
                    }}>
                        <CardView>
                            <View style={{
                                flexDirection: "row",
                                paddingBottom: 10,
                                minHeight: 300,
                            }}>
                                {
                                    subscriptionProducts.map((offer, index) => {
                                        console.log("object", index)
                                        return (
                                            <TouchableOpacity key={offer["productId"]}
                                                onPress={() => handlePurchase(offer["productId"],
                                                    //  offer["subscriptionOfferDetails"][0]["offerToken"]
                                                )}
                                                // title={subscriptionProducts[0]["name"]}
                                                style={{
                                                    alignItems: "center",
                                                    height: 180,
                                                    width: 180,
                                                    backgroundColor: colors.kavunKoyu,
                                                    borderRadius: 8,
                                                    marginHorizontal: 12,
                                                    marginVertical: 6
                                                }}>
                                                <Image source={require("../../assets/diamond.png")}
                                                    style={{
                                                        width: 60,
                                                        height: 60,
                                                        marginVertical: 12
                                                    }} />
                                                <Text style={[styles.txtDarkBold, {
                                                    paddingHorizontal: 6,
                                                    textAlign: "center"
                                                }]}>{subscriptionProducts[index]["description"]}</Text>
                                                <Text style={[styles.txtDarkBold, {
                                                    paddingHorizontal: 6,
                                                    marginTop: 6,
                                                    textAlign: "center",
                                                    color: "#080",
                                                    fontSize: 16,
                                                }]}>{subscriptionProducts[index]["localizedPrice"]}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </CardView>
                    </ScrollView>
            }
        </ContentView >
    );
};