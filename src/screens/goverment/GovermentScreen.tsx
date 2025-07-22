//import liraries
import React, { Component, useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Pressable, Alert } from 'react-native';
import { styles } from '../../styles/styles';
import ContentView from '../../components/ContentView/ContentView';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { DataContext } from '../../context/DataContext';
import HeaderMenuContent from '../../components/HeaderMenu/HeaderMenuContent';
import { build_costs } from '../../data/build_costs';
import ButtonSelect from '../../components/ButtonSelect/ButtonSelect';
import CardView from '../../components/CardView/CardView';
import { build_maintenance } from '../../data/build_maintenance';
import LottieView from 'lottie-react-native';
import { EnterName } from '../../components/EnterName/EnterName';
import Slider from '@react-native-community/slider';
import { Inter1 } from '../../ads/Inter1';

// create a component
const GovermentScreen = () => {
    const navigation: any = useNavigation();
    let { data, setData } = useContext(DataContext);
    const [isVisibleCountryName, setVisibleCountryName] = useState(false)
    Inter1()
    const handleCountryBonus = (bonus: string) => {
        setData((prevData: any) => ({
            ...prevData,
            countryFocus: bonus
        }
        ));
    };
    const handleCountryBonusPremium = (bonus: string) => {
        if (data.gems === 20) {
            setData((prevData: any) => ({
                ...prevData,
                countryFocus: 'premium' // countryFocus'u "all" yap
            }
            ));
        } else {
            Alert.alert('Gems değeri 20 olmalı!'); // Uyarı mesajı
        }
    };

    const updateParliamentAndGold = () => {
        // Eğer gold 200 veya daha fazlaysa
        if (data.gold >= build_costs.parliament.gold || data.wood >= build_costs.parliament.wood || data.clay >= build_costs.parliament.clay || data.iron >= build_costs.parliament.iron) {
            setData((prevData: any) => ({
                ...prevData,
                parliament: prevData.parliament + 1,  // Parliament değerini artır
                gold: prevData.gold - build_costs.parliament.gold,
                wood: prevData.wood - build_costs.parliament.wood,
                clay: prevData.clay - build_costs.parliament.clay,
                iron: prevData.iron - build_costs.parliament.iron,
            }
            ));
        } else {
            Alert.alert("Gold not enough")
            console.log('Gold değeri yeterli değil.');
        }
    }
    return (
        <ContentView>
            {
                isVisibleCountryName == true ?
                    <EnterName value={isVisibleCountryName} setValue={setVisibleCountryName} />
                    :
                    <>
                        <HeaderMenuContent title={"Goverment"} />
                        <ScrollView style={{
                            paddingHorizontal: "2%"
                        }}>
                            <View style={{
                                flexDirection: "row",
                                marginVertical: 6,
                                justifyContent: "center"
                            }}>
                                <TouchableOpacity onPress={() => {
                                    // PlaySoundImportant()
                                    handleCountryBonus("attack")
                                }}
                                    disabled={data.countryFocus == "attack"}
                                    style={{
                                        opacity: data.countryFocus == "attack" ? 1 : 0.52,
                                        height: Dimensions.get("window").width / 8,
                                        width: Dimensions.get("window").width / 8,
                                        marginHorizontal: 12,
                                        borderRadius: 90,
                                        borderWidth: 2,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: colors.kavun
                                    }}>
                                    <Image source={require("../../assets/images/swords.png")}
                                        style={{
                                            height: 40,
                                            width: 40
                                        }} />
                                    <Text style={[styles.txtCenter, styles.txtUyumlu]}>%10 Attack Power</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    // PlaySoundImportant()
                                    handleCountryBonus("defence")
                                }}
                                    disabled={data.countryFocus == "defence"}
                                    style={{
                                        opacity: data.countryFocus == "defence" ? 1 : 0.52,
                                        height: Dimensions.get("window").width / 8,
                                        width: Dimensions.get("window").width / 8,
                                        marginHorizontal: 12,
                                        borderRadius: 90,
                                        borderWidth: 2,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: colors.kavun
                                    }}>
                                    <Image source={require("../../assets/images/shield512.png")}
                                        style={{
                                            height: 40,
                                            width: 40
                                        }} />
                                    <Text style={[styles.txtCenter, styles.txtUyumlu]}>%10 Defence Power</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    // PlaySoundImportant()
                                    handleCountryBonus("pop")
                                }}
                                    disabled={data.countryFocus == "pop"}
                                    style={{
                                        opacity: data.countryFocus == "pop" ? 1 : 0.52,
                                        height: Dimensions.get("window").width / 8,
                                        width: Dimensions.get("window").width / 8,
                                        marginHorizontal: 12,
                                        borderRadius: 90,
                                        borderWidth: 2,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: colors.kavun
                                    }}>
                                    <Image source={require("../../assets/images/population.png")}
                                        style={{
                                            height: 40,
                                            width: 40
                                        }} />
                                    <Text style={[styles.txtCenter, styles.txtUyumlu]}>%20 Population Growth</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    // PlaySoundImportant()
                                    handleCountryBonus("income")
                                }}
                                    disabled={data.countryFocus == "income"}
                                    style={{
                                        opacity: data.countryFocus == "income" ? 1 : 0.52,
                                        height: Dimensions.get("window").width / 8,
                                        width: Dimensions.get("window").width / 8,
                                        marginHorizontal: 12,
                                        borderRadius: 90,
                                        borderWidth: 2,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: colors.kavun
                                    }}>
                                    <Image source={require("../../assets/images/money-growth.png")}
                                        style={{
                                            height: 40,
                                            width: 40
                                        }} />
                                    <Text style={[styles.txtCenter, styles.txtUyumlu]}>%10 Income Growth</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    //PlaySoundImportant()
                                    handleCountryBonusPremium("premium")
                                }}
                                    disabled={data.countryFocus == "premium"}
                                    style={{
                                        opacity: data.countryFocus == "premium" ? 1 : 0.52,
                                        height: Dimensions.get("window").width / 8,
                                        width: Dimensions.get("window").width / 8,
                                        marginHorizontal: 12,
                                        borderRadius: 90,
                                        borderWidth: 2,
                                        borderColor: data.countryFocus == "premium" ? "rgba(125, 15, 15, 1.0)" : "rgba(55, 25, 55, 0.3  )",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: colors.kavun
                                    }}>
                                    <Image source={require("../../assets/images/premium.png")}
                                        style={{
                                            height: 40,
                                            width: 40
                                        }} />
                                    <Text style={[styles.txtCenter, styles.txtUyumlu]}>%100 All Powers</Text>
                                    <Text style={[styles.txtCenter, styles.txtUyumlu]}>💎 20</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ padding: 12 }}>
                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={10}
                                    maximumValue={90}
                                    step={1}
                                    value={data.taxRate}
                                    minimumTrackTintColor={colors.kavun}
                                    maximumTrackTintColor="#000000"
                                    onValueChange={(value) => {
                                        const taxGold = Math.round(value * 0.333);
                                        const popGrowth = 0.006 - ((value - 10) / 80) * (0.006 - 0.001);

                                        setData((prevData: any) => ({
                                            ...prevData,
                                            taxRate: value,
                                            taxGoldPerTurn: taxGold,
                                            populationGrowthRate: parseFloat(popGrowth.toFixed(5))
                                        }));
                                    }}
                                />
                                <Text style={[styles.txtDarkTitle]}>Tax Rate: %{data.taxRate}</Text>
                                <Text style={[styles.txtDark]}>Gold per Turn: {data.taxGoldPerTurn} 💰</Text>
                                <Text style={[styles.txtDark]}>Gold per Turn: {data.populationGrowthRate} 💰</Text>
                                <Text style={[styles.txtDark]}>Population Growth: +{(data.populationGrowthRate * 1).toFixed(3)}%</Text>
                            </View>

                            <CardView>
                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: 6,
                                    alignItems: "center"
                                    // justifyContent: "center"
                                }}>
                                    {/* <Image source={require("../../assets/capitol.png")}
                            style={{
                                height: 80,
                                width: 80,
                                resizeMode: "contain"
                            }} /> */}
                                    <LottieView
                                        autoPlay
                                        loop
                                        // ref={animationRef}
                                        source={require("../../assets/animation/bina.json")}
                                        style={{ width: 100, height: 80 }}
                                    />
                                    <View style={{ paddingStart: 12, flex: 1 }}>
                                        <Text style={[styles.txtDarkTitle, { paddingStart: 0 }]}>Parliament - Level: {data.parliament} Performance: {data.population < (data.parliament * 1000) ? "%100" : " % " + (100 - 5 * ((data.population - (data.parliament * 1000)) / 100)).toFixed(2)}</Text>
                                        <Text style={styles.txtDark}>Parlemento is the building you successfully manage your country. Please keep UP TO date level for successfull management. Each of 1000 population needs 1 level</Text>
                                        <View style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginVertical: 6
                                        }}>
                                            <View>
                                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Price: {build_costs.parliament.gold > 0 && build_costs.parliament.gold + "💰"} {build_costs.parliament.wood > 0 && build_costs.parliament.wood + "🪵"} {build_costs.parliament.clay > 0 && build_costs.parliament.clay + "🧱"} {build_costs.parliament.iron > 0 && build_costs.parliament.iron + "🪨"}</Text>
                                                <Text style={[styles.txtDark, { marginTop: 6 }]}>Maintenance: {build_maintenance.parliament.gold > 0 && build_maintenance.parliament.gold + "💰"} {build_maintenance.parliament.wood > 0 && build_maintenance.parliament.wood + "🪵"} {build_maintenance.parliament.clay > 0 && build_maintenance.parliament.clay + "🧱"} {build_maintenance.parliament.iron > 0 && build_maintenance.parliament.iron + "🪨"}</Text>
                                            </View>
                                            <View style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginVertical: 6
                                            }}>
                                                <Text style={[styles.txtDarkBold, {
                                                    marginVertical: 6,
                                                    marginEnd: 12
                                                }]}></Text>
                                                {/* <TouchableOpacity onPress={() => updateParliamentAndGold()}>
                                    <Image source={require("../../assets/plus128.png")}
                                        style={{
                                            height: 35,
                                            width: 35,
                                            resizeMode: "contain"
                                        }} />
                                </TouchableOpacity> */}
                                                <ButtonSelect onPress={() => {
                                                    updateParliamentAndGold()
                                                    // PlaySoundClickLevel()
                                                }} text={"Level Up"}
                                                    disabled={(data.gold < build_costs.parliament.gold || data.wood < build_costs.parliament.wood || data.clay < build_costs.parliament.clay || data.clay < build_costs.parliament.clay || data.iron < build_costs.parliament.iron)} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </CardView>

                            <View style={{
                                marginVertical: 14,
                                flexDirection: "column",
                                flex: 1
                            }}>
                                {
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        height: 80,
                                        marginVertical: 14
                                    }}>
                                        <View style={{
                                            marginVertical: 12,
                                        }}>
                                            {
                                                data.polity != "" &&
                                                <CardView>
                                                    <View style={{
                                                        height: 80,
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                    }}>
                                                        <View style={{
                                                            height: 80,
                                                            width: 80,
                                                            marginHorizontal: 6,
                                                            borderRadius: 80,
                                                            borderWidth: 2,
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            backgroundColor: colors.kavun
                                                        }}>
                                                            {
                                                                data.polity == "Monarchy" ?
                                                                    <Image source={require("../../assets/images/crown.png")}
                                                                        style={{
                                                                            height: 50,
                                                                            width: 50
                                                                        }} />
                                                                    : data.polity == "Aristocracy" ?
                                                                        <Image source={require("../../assets/images/aristocracy.png")}
                                                                            style={{
                                                                                height: 50,
                                                                                width: 50
                                                                            }} />
                                                                        : data.polity == "Theocracy" ?
                                                                            <Image source={require("../../assets/images/religious.png")}
                                                                                style={{
                                                                                    height: 50,
                                                                                    width: 50
                                                                                }} />
                                                                            : data.polity == "Dictator" ?
                                                                                <Image source={require("../../assets/images/supreme.png")}
                                                                                    style={{
                                                                                        height: 50,
                                                                                        width: 50
                                                                                    }} />
                                                                                : data.polity == "Democracy" ?
                                                                                    <Image source={require("../../assets/images/democracy.png")}
                                                                                        style={{
                                                                                            height: 50,
                                                                                            width: 50
                                                                                        }} />
                                                                                    : null
                                                            }
                                                        </View>
                                                        {
                                                            data.polity != "" && <View>
                                                                <Text style={[styles.txtDarkBold, styles.txtCenter]}>Selected Polity</Text>
                                                                <Text style={[styles.txtDarkTitle, styles.txtCenter]}>{data.polity}</Text>
                                                            </View>
                                                        }
                                                    </View>
                                                </CardView>
                                            }
                                        </View>
                                        <View style={{
                                            marginVertical: 12,
                                        }}>
                                            {
                                                data.polity != "" &&
                                                <>
                                                    <View style={{
                                                        height: 80,
                                                        marginHorizontal: 12,
                                                        borderRadius: 12,
                                                        paddingHorizontal: 6,
                                                        borderWidth: 2,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        backgroundColor: colors.kavun
                                                    }}>
                                                        {
                                                            data.polity == "Monarchy" ?
                                                                <View>
                                                                    <Text style={[styles.txtDarkBold]}>Election: 40 Turn</Text>
                                                                    <View style={{
                                                                        flexDirection: "row",
                                                                        justifyContent: "space-between"
                                                                    }}>
                                                                        <View style={{
                                                                            marginEnd: 12
                                                                        }}>
                                                                            <Text style={[styles.txtDarkBold]}>Positive</Text>
                                                                            <Text style={[styles.txtUyumlu]}>%10 Income</Text>
                                                                            <Text style={[styles.txtUyumlu]}>-%10 Build Price</Text>
                                                                        </View>
                                                                        <View style={{
                                                                            marginStart: 12
                                                                        }}>
                                                                            <Text style={[styles.txtDarkBold]}>Negative</Text>
                                                                            <Text style={[styles.txtUyumlu]}>-%20 Attack</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                                : data.polity == "Aristocracy" ?
                                                                    <View>
                                                                        <Text style={[styles.txtDarkBold]}>Election: 20 Turn</Text>
                                                                        <View style={{
                                                                            flexDirection: "row",
                                                                            justifyContent: "space-between"
                                                                        }}>
                                                                            <View style={{
                                                                                marginEnd: 12
                                                                            }}>
                                                                                <Text style={[styles.txtDarkBold]}>Positive</Text>
                                                                                <Text style={[styles.txtUyumlu]}>%10 Income</Text>
                                                                                <Text style={[styles.txtUyumlu]}>-%10 Build Price</Text>
                                                                            </View>
                                                                            <View style={{
                                                                                marginStart: 12
                                                                            }}>
                                                                                <Text style={[styles.txtDarkBold]}>Negative</Text>
                                                                                <Text style={[styles.txtUyumlu]}>-%20 Attack</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                    : data.polity == "Theocracy" ?
                                                                        <View>
                                                                            <Text style={[styles.txtDarkBold]}>Election: 10 Turn</Text>
                                                                            <View style={{
                                                                                flexDirection: "row",
                                                                                justifyContent: "space-between"
                                                                            }}>
                                                                                <View style={{
                                                                                    marginEnd: 4
                                                                                }}>
                                                                                    <Text style={[styles.txtDarkBold]}>Positive</Text>
                                                                                    <Text style={[styles.txtUyumlu]}>%20 Defence</Text>
                                                                                </View>
                                                                                <View style={{
                                                                                    marginStart: 4
                                                                                }}>
                                                                                    <Text style={[styles.txtDarkBold]}>Negative</Text>
                                                                                    <Text style={[styles.txtUyumlu]}>%20 Build Price</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                        : data.polity == "Dictator" ?
                                                                            <View>
                                                                                <Text style={[styles.txtDarkBold]}>Election: No Election</Text>
                                                                                <View style={{
                                                                                    flexDirection: "row",
                                                                                    justifyContent: "space-between"
                                                                                }}>
                                                                                    <View style={{
                                                                                        marginEnd: 6
                                                                                    }}>
                                                                                        <Text style={[styles.txtDarkBold]}>Positive</Text>
                                                                                        <Text style={[styles.txtUyumlu]}>%20 Population Growth</Text>
                                                                                        <Text style={[styles.txtUyumlu]}>%10 Defence</Text>
                                                                                    </View>
                                                                                    <View style={{
                                                                                        marginStart: 4
                                                                                    }}>
                                                                                        <Text style={[styles.txtDarkBold]}>Negative</Text>
                                                                                        <Text style={[styles.txtUyumlu]}>%20 Build Price</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                            : data.polity == "Democracy" ?
                                                                                <View>
                                                                                    <Text style={[styles.txtDarkBold]}>Election: 5 Turn</Text>
                                                                                    <View style={{
                                                                                        flexDirection: "row",
                                                                                        justifyContent: "space-between"
                                                                                    }}>
                                                                                        <View style={{
                                                                                            marginEnd: 12
                                                                                        }}>
                                                                                            <Text style={[styles.txtDarkBold]}>Positive</Text>
                                                                                            <Text style={[styles.txtUyumlu]}>%20 Population Growth</Text>
                                                                                            <Text style={[styles.txtUyumlu]}>-%10 Build Price</Text>
                                                                                        </View>
                                                                                        <View style={{
                                                                                            marginStart: 12
                                                                                        }}>
                                                                                            <Text style={[styles.txtDarkBold]}>Negative</Text>
                                                                                            <Text style={[styles.txtUyumlu]}>%20 Defence</Text>
                                                                                        </View>
                                                                                    </View>
                                                                                </View>
                                                                                : null
                                                        }
                                                    </View>
                                                </>
                                            }
                                        </View>
                                    </View>
                                }
                                <CardView>
                                    <View style={{
                                        flexDirection: "row",
                                        marginVertical: 6,
                                        alignItems: "center"
                                        // justifyContent: "center"
                                    }}>
                                        <Image source={require("../../assets/images/parchmentIcon.png")}
                                            style={{
                                                height: 80,
                                                width: 80
                                            }} />
                                        <View style={{ paddingStart: 12, flex: 1 }}>
                                            <Text style={[styles.txtDarkTitle, { paddingStart: 0 }]}>Enter Your Country Name</Text>
                                            <Text style={[styles.txtDark, { paddingStart: 0 }]}>You can always update your name! Select a good name...</Text>
                                            <View style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginVertical: 6
                                            }}>
                                                <View style={{
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    marginVertical: 6
                                                }}>
                                                    <Text style={[styles.txtDarkBold, {
                                                        marginVertical: 6,
                                                        marginEnd: 12
                                                    }]}></Text>
                                                    <ButtonSelect onPress={() => {
                                                        // PlaySoundImportant()
                                                        setVisibleCountryName(true)
                                                    }} text={"Enter Name"} />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </CardView>
                            </View>
                        </ScrollView>
                    </>
            }
        </ContentView >
    );
};

export default GovermentScreen;
