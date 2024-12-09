//import liraries
import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ImageBackground, TextInput, Dimensions, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { DataContext } from '../../context/DataContext';
import { colors } from '../../styles/colors';
import { styles } from '../../styles/styles';
import ButtonSelect from '../ButtonSelect/ButtonSelect';
import { polities } from '../../data/polity_bonuses';

// create a component
export const SelectPolity = ({ value, setValue }: any) => {
    let { data, setData } = useContext(DataContext)
    // Polities
    //Monarchy,Aristocracy,Theocracy,Dictator,Democracy
    const [selectedPolity, setSelectedPolity] = useState("")
    
    useEffect(() => {
    }, [data])
    const handleUpdatePolity = () => {
        setData((prevData: any) => ({
            ...prevData,
            polity: selectedPolity
        }
        ));
        setValue(!value)
    };
    return (
        <ImageBackground source={require("../../assets/images/parchment.png")}
            style={{
                width: "100%",
                height: "100%"
            }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={[styles.txtDarkTitle, styles.txtCenter]}>
                    Selected Polity: {selectedPolity == "Monarchy" ? "Monarchy" :
                        selectedPolity == "Aristocracy" ? "Aristocracy"
                            : selectedPolity == "Theocracy" ? "Theocracy"
                                : selectedPolity == "Dictator" ? "Dictator"
                                    : selectedPolity == "Democracy" ? "Democracy" :
                                        ""}</Text>
                <ScrollView>
                    <View style={{
                        flexDirection: "column",
                        marginVertical: 6,
                        marginHorizontal: 12,
                        alignItems: "center",
                    }}>
                        <TouchableOpacity onPress={() => setSelectedPolity("Monarchy")}
                            disabled={selectedPolity == "Monarchy"}
                            style={{
                                opacity: selectedPolity == "Monarchy" ? 1 : 0.62,
                                height: 120,
                                width: "80%",
                                marginVertical: 12,
                                marginHorizontal: 12,
                                borderRadius: 12,
                                borderWidth: 2,
                                flexDirection: "row",
                                backgroundColor: colors.kavun
                            }}>
                            <View style={{
                                marginHorizontal: 12,
                                paddingHorizontal: 12,
                                paddingVertical: 12,
                                justifyContent: "center",
                            }}>
                                <Image source={require("../../assets/images/crown.png")}
                                    style={{
                                        height: 60,
                                        width: 60,
                                        marginHorizontal: 6,
                                        marginVertical: 6,
                                    }} />
                                <Text style={[styles.txtUyumlu]}>Monarchy</Text>
                            </View>
                            <View style={{
                                marginHorizontal: 12,
                                paddingVertical: 12,
                                justifyContent: "center",
                            }}>
                                <Text style={[styles.txtDarkBold]}>Election: 40 Turn</Text>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <View style={{
                                        marginEnd: 12
                                    }}>
                                        <Text style={[styles.txtDarkBold]}>Positive</Text>
                                        <Text style={[styles.txtUyumlu]}>%20 Attack</Text>
                                        <Text style={[styles.txtUyumlu]}>-%20 Soldier Maintenance</Text>
                                    </View>
                                    <View style={{
                                        marginStart: 12
                                    }}>
                                        <Text style={[styles.txtDarkBold]}>Negative</Text>
                                        <Text style={[styles.txtUyumlu]}>-%20 Population</Text>
                                    </View>
                                    <View style={{
                                        marginStart: 12,
                                    }}>
                                        {
                                            selectedPolity == "Monarchy" &&
                                            <ButtonSelect onPress={() => handleUpdatePolity()} />
                                        }
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedPolity("Aristocracy")}
                            disabled={selectedPolity == "Aristocracy"}
                            style={{
                                opacity: selectedPolity == "Aristocracy" ? 1 : 0.62,
                                height: 120,
                                width: "80%",
                                marginVertical: 12,
                                marginHorizontal: 12,
                                borderRadius: 12,
                                borderWidth: 2,
                                flexDirection: "row",
                                backgroundColor: colors.kavun
                            }}>
                            <View style={{
                                marginHorizontal: 12,
                                paddingHorizontal: 12,
                                paddingVertical: 12,
                                justifyContent: "center",
                            }}>
                                <Image source={require("../../assets/images/aristocracy.png")}
                                    style={{
                                        height: 60,
                                        width: 60,
                                        marginHorizontal: 6,
                                        marginVertical: 6,
                                    }} />
                                <Text style={[styles.txtUyumlu]}>Aristocracy</Text>
                            </View>
                            <View style={{
                                marginHorizontal: 12,
                                paddingVertical: 12,
                                justifyContent: "center",
                            }}>
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
                                    <View style={{
                                        marginStart: 12,
                                    }}>
                                        {
                                            selectedPolity == "Aristocracy" &&
                                            <ButtonSelect onPress={() => handleUpdatePolity()} />
                                        }
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedPolity("Theocracy")}
                            disabled={selectedPolity == "Theocracy"}
                            style={{
                                opacity: selectedPolity == "Theocracy" ? 1 : 0.62,
                                height: 120,
                                width: "80%",
                                marginVertical: 12,
                                marginHorizontal: 12,
                                borderRadius: 12,
                                borderWidth: 2,
                                flexDirection: "row",
                                backgroundColor: colors.kavun
                            }}>
                            <View style={{
                                marginHorizontal: 12,
                                paddingHorizontal: 12,
                                paddingVertical: 12,
                                justifyContent: "center",
                            }}>
                                <Image source={require("../../assets/images/religious.png")}
                                    style={{
                                        height: 60,
                                        width: 60,
                                        marginHorizontal: 6,
                                        marginVertical: 6,
                                    }} />
                                <Text style={[styles.txtUyumlu]}>Theocracy</Text>
                            </View>
                            <View style={{
                                marginHorizontal: 12,
                                paddingHorizontal: 12,
                                paddingVertical: 12,
                                justifyContent: "center",
                            }}>
                                <Text style={[styles.txtDarkBold]}>Election: 10 Turn</Text>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <View style={{
                                        marginEnd: 12
                                    }}>
                                        <Text style={[styles.txtDarkBold]}>Positive</Text>
                                        <Text style={[styles.txtUyumlu]}>%10 Soldier Maintenance</Text>
                                        <Text style={[styles.txtUyumlu]}>%10 Defence</Text>
                                    </View>
                                    <View style={{
                                        marginStart: 14
                                    }}>
                                        <Text style={[styles.txtDarkBold]}>Negative</Text>
                                        <Text style={[styles.txtUyumlu]}>%20 Build Price</Text>
                                    </View>
                                    <View style={{
                                        marginStart: 12,
                                    }}>
                                        {
                                            selectedPolity == "Theocracy" &&
                                            <ButtonSelect onPress={() => handleUpdatePolity()} />
                                        }
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedPolity("Dictator")}
                            disabled={selectedPolity == "Dictator"}
                            style={{
                                opacity: selectedPolity == "Dictator" ? 1 : 0.62,
                                height: 120,
                                width: "80%",
                                marginVertical: 12,
                                marginHorizontal: 12,
                                borderRadius: 12,
                                borderWidth: 2,
                                flexDirection: "row",
                                backgroundColor: colors.kavun
                            }}>
                            <View style={{
                                marginHorizontal: 12,
                                paddingHorizontal: 12,
                                paddingVertical: 12,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Image source={require("../../assets/images/supreme.png")}
                                    style={{
                                        height: 60,
                                        width: 60,
                                        marginHorizontal: 6,
                                        marginVertical: 6,
                                    }} />
                                <Text style={[styles.txtUyumlu]}>Dictator</Text>
                            </View>
                            <View style={{
                                marginHorizontal: 12,
                                paddingHorizontal: 12,
                                paddingVertical: 12,
                                justifyContent: "center",
                            }}>
                                <Text style={[styles.txtDarkBold]}>Election: No Election</Text>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <View style={{
                                        marginEnd: 12
                                    }}>
                                        <Text style={[styles.txtDarkBold]}>Positive</Text>
                                        <Text style={[styles.txtUyumlu]}>%20 Population Growth</Text>
                                        <Text style={[styles.txtUyumlu]}>%10 Defence</Text>
                                    </View>
                                    <View style={{
                                        marginStart: 14
                                    }}>
                                        <Text style={[styles.txtDarkBold]}>Negative</Text>
                                        <Text style={[styles.txtUyumlu]}>%20 Build Price</Text>
                                    </View>
                                    <View style={{
                                        marginStart: 12,
                                    }}>
                                        {
                                            selectedPolity == "Dictator" &&
                                            <ButtonSelect onPress={() => handleUpdatePolity()} />
                                        }
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedPolity("Democracy")}
                            disabled={selectedPolity == "Democracy" ? true : false}
                            style={{
                                opacity: selectedPolity == "Democracy" ? 1 : 0.62,
                                height: 120,
                                width: "80%",
                                marginVertical: 12,
                                marginHorizontal: 12,
                                borderRadius: 12,
                                borderWidth: 2,
                                flexDirection: "row",
                                backgroundColor: colors.kavun
                            }}>
                            <View style={{
                                marginHorizontal: 12,
                                paddingHorizontal: 12,
                                paddingVertical: 12,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Image source={require("../../assets/images/democracy.png")}
                                    style={{
                                        height: 60,
                                        width: 60,
                                        marginHorizontal: 6,
                                        marginVertical: 6,
                                    }} />
                                <Text style={[styles.txtUyumlu]}>Democracy</Text>
                            </View>
                            <View style={{
                                marginHorizontal: 12,
                                paddingVertical: 12,
                                justifyContent: "center",
                            }}>
                                <Text style={[styles.txtDarkBold]}>Election: 5 Turn</Text>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <View style={{
                                        marginEnd: 12
                                    }}>
                                        <Text style={[styles.txtDarkBold]}>Positive</Text>
                                        <Text style={[styles.txtUyumlu]}>%10 Population Growth</Text>
                                        <Text style={[styles.txtUyumlu]}>-%10 Build Price</Text>
                                    </View>
                                    <View style={{
                                        marginStart: 12
                                    }}>
                                        <Text style={[styles.txtDarkBold]}>Negative</Text>
                                        <Text style={[styles.txtUyumlu]}>%20 Defence</Text>
                                    </View>
                                    <View style={{
                                        marginStart: 12,
                                    }}>
                                        {
                                            selectedPolity == "Democracy" &&
                                            <ButtonSelect onPress={() => handleUpdatePolity()} />
                                        }
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};