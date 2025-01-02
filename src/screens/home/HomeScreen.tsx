//import liraries
import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, TouchableOpacity, Image, Dimensions, ScrollView, Platform, Alert } from 'react-native';
import { styles } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import {
    TourGuideProvider, // Main provider
    TourGuideZone, // Main wrapper of highlight component
    TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
    useTourGuideController, // hook to start, etc.
} from 'rn-tourguide'
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderMenu } from '../../components/HeaderMenu/HeaderMenu';
import { HomeCard } from '../../components/HomeCard/HomeCard';
import { colors } from '../../styles/colors';
import { BottomCard } from '../../components/BottomCard/BottomCard';
import { DataContext } from '../../context/DataContext';
import { EndTurn } from '../../utils/EndTurn';
import { EnterName } from '../../components/EnterName/EnterName';
import { SelectPolity } from '../../components/SelectPolity/SelectPolity';
import AdMob, { AdMobPlus, RewardedAd } from '@admob-plus/react-native'
import LoadingScreen from '../loading/LoadingScreen';
import LottieView from 'lottie-react-native';
import { BotsEndTurn } from '../../utils/BotsEndTurn';
import { PlaySoundClick } from '../../utils/PlaySoundClick';
import G2 from '../../ads/G2';
import { PlaySoundImportant } from '../../utils/PlaySoundImportant';


const adUnitId = Platform.OS === "ios" ?
    "ca-app-pub-1017432203303316/9452089505" :
    "ca-app-pub-1017432203303316/9289906584"

const HomeScreen = () => {
    const { t } = useTranslation();
    const iconProps = { size: 40, color: '#888' }
    let { data, setData, dataBots, setDataBots, loadFromStorage, saveToStorage } = useContext(DataContext)
    const [isVisibleCountryName, setVisibleCountryName] = useState(false)
    const [isVisiblePolity, setVisiblePolity] = useState(false)
    const [loading, setLoading] = useState(false)
    const {
        canStart, // a boolean indicate if you can start tour guide
        start, // a function to start the tourguide
        stop, // a function  to stopping it
        eventEmitter, // an object for listening some events
    }: any = useTourGuideController()

    const [loadedReklam, setLoadedReklam] = useState(false);
    const MAX_TURNS_BEFORE_WAR = 10;

    React.useEffect(() => {
        if (canStart) {
            if (data.isTutorial == true) {
                start()
            }
        }
    }, [canStart, data])
    const handleOnStart = () => console.log('start')
    const handleOnStop = () => {
        console.log('stop')
        data.isTutorial = false
    }
    const handleOnStepChange = () => console.log(`stepChange`)

    React.useEffect(() => {
        eventEmitter.on('start', handleOnStart)
        eventEmitter.on('stop', handleOnStop)
        eventEmitter.on('stepChange', handleOnStepChange)

        return () => {
            eventEmitter.off('start', handleOnStart)
            eventEmitter.off('stop', handleOnStop)
            eventEmitter.off('stepChange', handleOnStepChange)
        }
    }, [])
    const navigation: any = useNavigation();
    const [election, setElection] = useState(0)
    useEffect(() => {
        const turnChange = () => {
            setElection(election + 1)
            console.log(election)
        }
        turnChange()
        if (data.polity == "Monarchy") {
            if (election >= 40) {
                setElection(0)
                console.log("KING CHANGED")
            }
        }
        if (data.polity == "Aristocracy") {
            if (election >= 20) {
                setElection(0)
                console.log("Aristocracy CHANGED")
            }
        }
        if (data.polity == "Theocracy") {
            if (election >= 10) {
                setElection(0)
                console.log("Theocracy CHANGED")
                Alert.alert("Election Made")
            }
        }
        if (data.polity == "Democracy") {
            if (election >= 5) {
                setElection(0)
                console.log("Democracy CHANGED")
            }
        }
    }, [data.turn])

    const ShowAdRewarded = async () => {
        await AdMobPlus.start()
        const rewarded = new RewardedAd({
            adUnitId: adUnitId,
        })
        await rewarded.load()
        await rewarded.show().then(() => {
            setData((prevData: any) => ({
                ...prevData,
                gold: prevData.gold + 100,
                wood: prevData.wood + 20,
                clay: prevData.clay + 20,
                iron: prevData.iron + 20,
            }
            ));
        })
    }
    return (
        <SafeAreaView style={styles.container}>
            {
                isVisibleCountryName == true ?
                    <EnterName value={isVisibleCountryName} setValue={setVisibleCountryName} />
                    :
                    isVisiblePolity == true ?
                        <SelectPolity value={isVisiblePolity} setValue={setVisiblePolity} />
                        :
                        <View style={styles.content}>
                            <TourGuideZone zone={0} shape={'rectangle'}
                                text={'Turn Number and Your balance'}>
                                <HeaderMenu />
                            </TourGuideZone>
                            <ScrollView>
                                <View style={{ alignItems: "center", paddingVertical: 12 }}>
                                    <TourGuideZone zone={1} shape={'rectangle'}
                                        text={'Your Country Name'}>
                                        <Text style={styles.txtBold}>•👑{data.countryName}•</Text>
                                    </TourGuideZone>
                                </View>
                                <View style={{ flexDirection: "row", flex: 1 }}>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                    }}>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            flexWrap: "wrap"
                                        }}>
                                            <TourGuideZone zone={2} shape={'rectangle'}
                                                text={'Goverment Focus'}>
                                                <HomeCard onPress={() => {
                                                    //PlaySoundClick()
                                                    navigation.navigate("Goverment")
                                                }}>
                                                    {/* <Image source={require("../../assets/capitol.png")} style={{
                                                        width: "70%",
                                                        height: "60%",
                                                        resizeMode: "contain"
                                                    }} /> */}
                                                    <LottieView
                                                        autoPlay
                                                        loop
                                                        // ref={animationRef}
                                                        source={require("../../assets/animation/bina.json")}
                                                        style={{ width: "100%", height: "60%" }}
                                                    />
                                                    <Text style={{
                                                        fontSize: 12,
                                                        marginTop: 6,
                                                        fontWeight: "bold",
                                                        textAlign: "center",
                                                        color: colors.txtWhite
                                                    }}>Goverment</Text>
                                                </HomeCard>
                                            </TourGuideZone>
                                            <TourGuideZone zone={3} shape={'rectangle'}
                                                text={'Create your own army'}>
                                                <HomeCard onPress={() => {
                                                    //PlaySoundClick()
                                                    navigation.navigate("Army")
                                                }}>
                                                    {/* <Image source={require("../../assets/army.png")} style={{
                                                    width: "70%",
                                                    height: "60%",
                                                    resizeMode: "contain"
                                                }} /> */}
                                                    <LottieView
                                                        autoPlay
                                                        loop
                                                        // ref={animationRef}
                                                        source={require("../../assets/animation/army.json")}
                                                        style={{ width: "100%", height: "60%" }}
                                                    />
                                                    <Text style={{
                                                        fontSize: 12, paddingHorizontal: 2,
                                                        marginTop: 6,
                                                        fontWeight: "bold",
                                                        textAlign: "center",
                                                        color: colors.txtWhite
                                                    }}>Army</Text>
                                                </HomeCard>
                                            </TourGuideZone>
                                            <TourGuideZone zone={4} shape={'rectangle'}
                                                text={'Improve Your Castle'}>
                                                <HomeCard onPress={() => {
                                                    //PlaySoundClick()
                                                    navigation.navigate("Castle")
                                                }}>
                                                    <Image source={require("../../assets/images/castle.png")} style={{
                                                        width: "70%",
                                                        height: "60%",
                                                        resizeMode: "contain"
                                                    }} />
                                                    <Text style={{
                                                        fontSize: 12, paddingHorizontal: 2,
                                                        marginTop: 6,
                                                        fontWeight: "bold",
                                                        textAlign: "center",
                                                        color: colors.txtWhite
                                                    }}>Castle</Text>
                                                </HomeCard>
                                            </TourGuideZone>
                                            <TourGuideZone zone={5} shape={'rectangle'}
                                                text={'Increase your income'}>
                                                <HomeCard onPress={() => {
                                                    //PlaySoundClick()
                                                    navigation.navigate("Product")
                                                }}>
                                                    <Image source={require("../../assets/images/factory.png")} style={{
                                                        width: "70%",
                                                        height: "60%",
                                                        resizeMode: "contain"
                                                    }} />
                                                    <Text style={{
                                                        fontSize: 12, paddingHorizontal: 2,
                                                        marginTop: 6,
                                                        fontWeight: "bold",
                                                        textAlign: "center",
                                                        color: colors.txtWhite
                                                    }}>Product</Text>
                                                </HomeCard>
                                            </TourGuideZone>
                                            {
                                                data?.countryName == "" &&

                                                <HomeCard onPress={() => {
                                                    //PlaySoundClick()
                                                    setVisibleCountryName(true)
                                                }}>
                                                    <Image source={require("../../assets/images/parchmentIcon.png")} style={{
                                                        width: "50%",
                                                        height: "40%",
                                                        resizeMode: "contain"
                                                    }} />
                                                    <Text style={{
                                                        fontSize: 12, paddingHorizontal: 2,
                                                        marginTop: 6,
                                                        fontWeight: "bold",
                                                        textAlign: "center",
                                                        color: colors.txtWhite
                                                    }}>Enter Name</Text>
                                                </HomeCard>
                                            }
                                            <HomeCard onPress={() => {
                                                //PlaySoundClick()
                                                navigation.navigate("Finance")
                                            }}>
                                                <Image source={require("../../assets/images/finance1.png")} style={{
                                                    width: "70%",
                                                    height: "60%",
                                                    resizeMode: "contain"
                                                }} />
                                                <Text style={{
                                                    fontSize: 12, paddingHorizontal: 2,
                                                    marginTop: 6,
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                    color: colors.txtWhite
                                                }}>Finance</Text>
                                            </HomeCard>
                                            {
                                                data.polity == "" &&
                                                <HomeCard onPress={() => {
                                                    //PlaySoundImportant()
                                                    setVisiblePolity(true)
                                                }}>
                                                    <Image source={require("../../assets/images/crown.png")} style={{
                                                        width: "70%",
                                                        height: "60%",
                                                        resizeMode: "contain"
                                                    }} />
                                                    <Text style={{
                                                        fontSize: 12, paddingHorizontal: 2,
                                                        marginTop: 6,
                                                        fontWeight: "bold",
                                                        textAlign: "center",
                                                        color: colors.txtWhite
                                                    }}>Select Polity</Text>
                                                </HomeCard>
                                            }
                                            {/* <HomeCard onPress={() => navigation.navigate("Product")}>
                                                <Image source={require("../../assets/armies/blacksmith.png")} style={{
                                                    width: "70%",
                                                    height: "60%",
                                                    resizeMode: "contain"
                                                }} />
                                                <Text style={{
                                                    fontSize: 12,paddingHorizontal:2,
                                                    marginTop: 6,
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                    color: colors.txtWhite
                                                }}>Blacksmith</Text>
                                            </HomeCard> */}

                                            {/* <HomeCard onPress={() => {
                                                    //PlaySoundClick()
                                                    navigation.navigate("War")
                                                }}>
                                                    <LottieView
                                                        autoPlay
                                                        loop
                                                        // ref={animationRef}
                                                        source={require("../../assets/animation/warAnimation.json")}
                                                        style={{ width: "100%", height: "60%" }}
                                                    />
                                                    <Text style={{
                                                        fontSize: 12,paddingHorizontal:2,
                                                        marginTop: 6,
                                                        fontWeight: "bold",
                                                        textAlign: "center",
                                                        color: colors.txtWhite
                                                    }}>War</Text>
                                                </HomeCard> */}
                                            <HomeCard onPress={() => {
                                                //PlaySoundClick()
                                                navigation.navigate("Statistic")
                                            }}>
                                                <Image source={require("../../assets/images/statistic1.png")} style={{
                                                    width: "70%",
                                                    height: "60%",
                                                    resizeMode: "contain"
                                                }} />
                                                <Text style={{
                                                    fontSize: 12, paddingHorizontal: 2,
                                                    marginTop: 6,
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                    color: colors.txtWhite
                                                }}>Statistic</Text>
                                            </HomeCard>
                                            {/* <HomeCard onPress={() => {
                                                //PlaySoundClick()
                                                navigation.navigate("BuyGems")
                                            }}>
                                                <Image source={require("../../assets/images/diamond.png")} style={{
                                                    width: "70%",
                                                    height: "60%",
                                                    resizeMode: "contain"
                                                }} />
                                                <Text style={{
                                                    fontSize: 12, paddingHorizontal: 2,
                                                    marginTop: 6,
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                    color: colors.txtWhite
                                                }}>Buy Gems</Text>
                                            </HomeCard> */}
                                            {/* <HomeCard onPress={() => navigation.navigate("Product")}>
                                                    <Image source={require("../../assets/settings.png")} style={{
                                                        width: "70%",
                                                        height: "60%",
                                                        resizeMode: "contain"
                                                    }} />
                                                    <Text style={{
                                                        fontSize: 12,paddingHorizontal:2,
                                                        marginTop: 6,
                                                        fontWeight: "bold",
                                                        textAlign: "center",
                                                        color: colors.txtWhite
                                                    }}>Settings</Text>
                                                </HomeCard> */}
                                            <HomeCard onPress={() => loadFromStorage()}>
                                                <Image source={require("../../assets/images/loadgame.png")} style={{
                                                    width: "70%",
                                                    height: "60%",
                                                    resizeMode: "contain"
                                                }} />
                                                <Text style={{
                                                    fontSize: 12, paddingHorizontal: 2,
                                                    marginTop: 6,
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                    color: colors.txtWhite
                                                }}>Load Game</Text>
                                            </HomeCard>
                                            <TourGuideZone zone={6} shape={'rectangle'}
                                                text={'Remember save your game before exit'}>
                                                <HomeCard onPress={() => {
                                                    saveToStorage(data, dataBots)
                                                }}>
                                                    <Image source={require("../../assets/images/savegame.png")} style={{
                                                        width: "70%",
                                                        height: "60%",
                                                        resizeMode: "contain"
                                                    }} />
                                                    <Text style={{
                                                        fontSize: 12, paddingHorizontal: 2,
                                                        marginTop: 6,
                                                        fontWeight: "bold",
                                                        textAlign: "center",
                                                        color: colors.txtWhite
                                                    }}>Save Game</Text>
                                                </HomeCard>
                                            </TourGuideZone>
                                            <HomeCard onPress={() => {
                                                //PlaySoundClick()
                                                navigation.navigate("Market")
                                            }}>
                                                <Image source={require("../../assets/images/market.png")} style={{
                                                    width: "70%",
                                                    height: "60%",
                                                    resizeMode: "contain"
                                                }} />
                                                <Text style={{
                                                    fontSize: 12, paddingHorizontal: 2,
                                                    marginTop: 6,
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                    color: colors.txtWhite
                                                }}>Market</Text>
                                            </HomeCard>
                                            <TourGuideZone zone={7} shape={'rectangle'}
                                                text={'Click for Rewards'}>
                                                <HomeCard onPress={() => ShowAdRewarded()}>
                                                    <Image source={require("../../assets/images/earn1.png")} style={{
                                                        width: "70%",
                                                        height: "60%",
                                                        resizeMode: "contain"
                                                    }} />
                                                    <Text style={{
                                                        fontSize: 12, paddingHorizontal: 2,
                                                        marginTop: 6,
                                                        fontWeight: "bold",
                                                        textAlign: "center",
                                                        color: colors.txtWhite
                                                    }}>Earn 100$</Text>
                                                </HomeCard>
                                            </TourGuideZone>
                                            <TourGuideZone zone={8} shape={'rectangle'}
                                                text={'Click for End Turn'}>
                                                <HomeCard disabled={loading} onPress={() => {
                                                    //PlaySoundClick()
                                                    EndTurn(data, setData, setLoading)
                                                    BotsEndTurn(dataBots, setDataBots)
                                                }
                                                }>
                                                    <Image source={require("../../assets/images/hourglass.png")} style={{
                                                        width: "70%",
                                                        height: "60%",
                                                        resizeMode: "contain"
                                                    }} />
                                                    <Text style={{
                                                        fontSize: 12, paddingHorizontal: 2,
                                                        marginTop: 6,
                                                        fontWeight: "bold",
                                                        textAlign: "center",
                                                        color: colors.txtWhite
                                                    }}>End Turn</Text>
                                                </HomeCard>
                                            </TourGuideZone>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
            }
        </SafeAreaView >
    );
};
export default HomeScreen;

const style = StyleSheet.create({
    bottomBtn: {
        height: Dimensions.get("window").height / 5 - 10,
        width: 80,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 12,
    },
    bottomBtnImg: {
        height: "60%",
        width: "60%",
        marginBottom: 6,
        resizeMode: "contain"
    },
    bottomBtnTxt: {
        fontSize: 12, paddingHorizontal: 2,
        fontWeight: "bold",
        color: colors.white,
        textAlign: "center"
    }
})