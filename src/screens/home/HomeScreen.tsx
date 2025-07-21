import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { HomeCard } from '../../components/HomeCard/HomeCard'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../../styles/colors';
import { styles } from '../../styles/styles';
import LoadingScreen from '../loading/LoadingScreen';
import { SelectPolity } from '../../components/SelectPolity/SelectPolity';
import { HeaderMenu } from '../../components/HeaderMenu/HeaderMenu';
import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import { DataContext } from '../../context/DataContext';
import LottieView from 'lottie-react-native';
import ButtonSelect from '../../components/ButtonSelect/ButtonSelect';
import { generateBots } from '../../service/botGenerator';
import VictoryScreen from '../victory/VictoryScreen';

export default function HomeScreen() {
    const navigation: any = useNavigation();
    const [loading, setLoading] = useState(false)
    const [selectMode, setSelectMode] = useState("")
    const [isVisiblePolity, setVisiblePolity] = useState(false)
    let { data, setData, dataBots, setDataBots, loadFromStorage, saveToStorage } = useContext(DataContext)
    const [modalVisible, setModalVisible] = useState(false);

    const {
        canStart, // a boolean indicate if you can start tour guide
        start, // a function to start the tourguide
        stop, // a function  to stopping it
        eventEmitter, // an object for listening some events
    }: any = useTourGuideController()

    React.useEffect(() => {
        if (canStart) {
            if (data.isTutorial == true) {
                start()
            }
        }
    }, [canStart, data])
    const handleOnStart = () => console.log('start')
    const handleOnStop = () => {
        setData((prevData: any) => ({
            ...prevData,
            isTutorial: false,
        }))
    }
    const handleOnStepChange = () => console.log(`stepChange`)

    React.useEffect(() => {
        if (!eventEmitter) {
            console.warn('eventEmitter is undefined!')
            return
        }
        eventEmitter.on('start', handleOnStart)
        eventEmitter.on('stop', handleOnStop)
        eventEmitter.on('stepChange', handleOnStepChange)

        return () => {
            eventEmitter.off('start', handleOnStart)
            eventEmitter.off('stop', handleOnStop)
            eventEmitter.off('stepChange', handleOnStepChange)
        }
    }, [])
    const handleDiffucult = () => {
        let botCount = 0;
        if (selectMode === "1") botCount = 1;
        else if (selectMode === "2") botCount = 3;
        else if (selectMode === "3") botCount = 5;
        else if (selectMode === "4") botCount = 7;

        setData((prevData: any) => ({
            ...prevData,
            difficult: selectMode,
        }));

        setDataBots(generateBots(botCount));
    };
    const areAllEnemiesDefeated = (dataBots: any[]): boolean => {
        return dataBots.every(bot => bot.isAlive === false);
    };
    return (
        <SafeAreaView style={styles.container}>
            {
                loading ?
                    <LoadingScreen />
                    :
                    isVisiblePolity == true ?
                        <SelectPolity value={isVisiblePolity} setValue={setVisiblePolity} />
                        :
                        areAllEnemiesDefeated(dataBots) == true ?
                            <VictoryScreen />
                            :
                            data?.difficult == "0" ?
                                <View style={styles.content}>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                        <HomeCard onPress={() => setSelectMode("1")}>
                                            <Text style={{
                                                fontSize: 16,
                                                marginTop: 6,
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                color: selectMode == "1" ? colors.kavun : colors.txtWhite
                                            }}>Easy Game</Text>
                                            <Text style={{
                                                fontSize: 13,
                                                marginTop: 6,
                                                textAlign: "center",
                                                color: selectMode == "1" ? colors.kavun : colors.txtWhite
                                            }}>1v1</Text>
                                        </HomeCard>
                                        <HomeCard onPress={() => setSelectMode("2")}>
                                            <Text style={{
                                                fontSize: 16,
                                                marginTop: 6,
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                color: selectMode == "2" ? colors.kavun : colors.txtWhite
                                            }}>Normal Game</Text>
                                            <Text style={{
                                                fontSize: 13,
                                                marginTop: 6,
                                                textAlign: "center",
                                                color: selectMode == "2" ? colors.kavun : colors.txtWhite
                                            }}>3 Bots</Text>
                                        </HomeCard>
                                        <HomeCard onPress={() => setSelectMode("3")}>
                                            <Text style={{
                                                fontSize: 16,
                                                marginTop: 6,
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                color: selectMode == "3" ? colors.kavun : colors.txtWhite
                                            }}>Hard Game</Text>
                                            <Text style={{
                                                fontSize: 13,
                                                marginTop: 6,
                                                textAlign: "center",
                                                color: selectMode == "3" ? colors.kavun : colors.txtWhite
                                            }}>1v3 Bots</Text>
                                        </HomeCard>
                                        <HomeCard onPress={() => setSelectMode("4")}>
                                            <Text style={{
                                                fontSize: 16,
                                                marginTop: 6,
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                color: selectMode == "4" ? colors.kavun : colors.txtWhite
                                            }}>Very Hard Game</Text>
                                            <Text style={{
                                                fontSize: 13,
                                                marginTop: 6,
                                                textAlign: "center",
                                                color: selectMode == "4" ? colors.kavun : colors.txtWhite
                                            }}>1v7 Bots</Text>
                                        </HomeCard>
                                        <ButtonSelect onPress={() => {
                                            handleDiffucult()
                                            setData((prevData: any) => ({
                                                ...prevData,
                                                difficult: selectMode
                                            }));
                                        }} />
                                    </View>
                                </View>
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
                                                                fontSize: 13,
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
                                                                fontSize: 13,
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
                                                                fontSize: 13,
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
                                                                fontSize: 13,
                                                                marginTop: 6,
                                                                fontWeight: "bold",
                                                                textAlign: "center",
                                                                color: colors.txtWhite
                                                            }}>Product</Text>
                                                        </HomeCard>
                                                    </TourGuideZone>

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
                                                            fontSize: 13,
                                                            marginTop: 6,
                                                            fontWeight: "bold",
                                                            textAlign: "center",
                                                            color: colors.txtWhite
                                                        }}>Select Polity</Text>
                                                    </HomeCard>
                                                    {/* <HomeCard onPress={() => navigation.navigate("Product")}>
                                                <Image source={require("../../assets/armies/blacksmith.png")} style={{
                                                    width: "70%",
                                                    height: "60%",
                                                    resizeMode: "contain"
                                                }} />
                                                <Text style={{
                                                    fontSize: 13,
                                                    marginTop: 6,
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                    color: colors.txtWhite
                                                }}>Blacksmith</Text>
                                            </HomeCard> */}

                                                    <HomeCard onPress={() => {
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
                                                            fontSize: 13,
                                                            marginTop: 6,
                                                            fontWeight: "bold",
                                                            textAlign: "center",
                                                            color: colors.txtWhite
                                                        }}>War</Text>
                                                    </HomeCard>
                                                    <HomeCard onPress={() => {
                                                        //PlaySoundClick()
                                                        navigation.navigate("News")
                                                    }}>
                                                        <Image source={require("../../assets/newspaper.png")} style={{
                                                            width: "70%",
                                                            height: "60%",
                                                            resizeMode: "contain"
                                                        }} />
                                                        <Text style={{
                                                            fontSize: 13,
                                                            marginTop: 6,
                                                            fontWeight: "bold",
                                                            textAlign: "center",
                                                            color: colors.txtWhite
                                                        }}>News</Text>
                                                    </HomeCard>
                                                    <HomeCard onPress={() => {
                                                        //PlaySoundClick()
                                                        navigation.navigate("Premium")
                                                    }}>
                                                        <Image source={require("../../assets/crown.png")} style={{
                                                            width: "70%",
                                                            height: "60%",
                                                            resizeMode: "contain"
                                                        }} />
                                                        <Text style={{
                                                            fontSize: 13,
                                                            marginTop: 6,
                                                            fontWeight: "bold",
                                                            textAlign: "center",
                                                            color: colors.txtWhite
                                                        }}>Premium Shop</Text>
                                                    </HomeCard>

                                                    <HomeCard onPress={() => loadFromStorage()}>
                                                        <Image source={require("../../assets/images/loadgame.png")} style={{
                                                            width: "70%",
                                                            height: "60%",
                                                            resizeMode: "contain"
                                                        }} />
                                                        <Text style={{
                                                            fontSize: 13,
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
                                                                fontSize: 13,
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
                                                            fontSize: 13,
                                                            marginTop: 6,
                                                            fontWeight: "bold",
                                                            textAlign: "center",
                                                            color: colors.txtWhite
                                                        }}>Market</Text>
                                                    </HomeCard>
                                                    {/* <TourGuideZone zone={7} shape={'rectangle'}
                                                    text={'Click for Rewards'}>
                                                    <HomeCard onPress={() => ShowAdRewarded()}>
                                                        <Image source={require("../../assets/images/earn1.png")} style={{
                                                            width: "70%",
                                                            height: "60%",
                                                            resizeMode: "contain"
                                                        }} />
                                                        <Text style={{
                                                            fontSize: 13,
                                                            marginTop: 6,
                                                            fontWeight: "bold",
                                                            textAlign: "center",
                                                            color: colors.txtWhite
                                                        }}>Earn 100$</Text>
                                                    </HomeCard>
                                                </TourGuideZone> */}
                                                    <TourGuideZone zone={7} shape={'rectangle'}
                                                        text={'Click for End Turn'}>
                                                        <HomeCard onPress={() => {
                                                            // //PlaySoundClick()
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
                                                                fontSize: 13,
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
    )
}