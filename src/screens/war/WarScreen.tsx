import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { styles } from '../../styles/styles';
import ContentView from '../../components/ContentView/ContentView';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { DataContext } from '../../context/DataContext';
import ButtonSelect from '../../components/ButtonSelect/ButtonSelect';
import CardView from '../../components/CardView/CardView';
import { soldier_power } from '../../data/soldier_powers';
import HeaderMenuContent from '../../components/HeaderMenu/HeaderMenuContent';

export const WarScreen = () => {
    const navigation: any = useNavigation();
    const [segment, setSegment] = useState(0)
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

    return (
        <ContentView>
            <HeaderMenuContent title={"War"} />
            <ScrollView style={{
                paddingHorizontal: "2%",
            }}>
                <CardView>
                    <View style={{
                        flexDirection: "row",
                        paddingBottom: 10,
                    }}>
                        <View style={{ paddingHorizontal: 12, flex: 0.3 }}>
                            <Pressable onPress={() => setSegment(0)}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,
                                    width: 145,
                                    alignItems: "center",
                                    paddingHorizontal: 12,
                                    marginVertical: 8,
                                    paddingVertical: 6,
                                    opacity: segment == 0 ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>Plunder</Text>
                            </Pressable>
                            <Pressable onPress={() => setSegment(1)}
                                style={{
                                    backgroundColor: colors.kavunKoyu,
                                    borderRadius: 8,
                                    width: 145,
                                    alignItems: "center",
                                    paddingHorizontal: 12,
                                    marginVertical: 8,
                                    paddingVertical: 6,
                                    opacity: segment == 1 ? 0.52 : 1
                                }}>
                                <Text style={[styles.txtDarkBold]}>Attack</Text>
                            </Pressable>
                        </View>

                        <View style={{ paddingStart: 12, flex: 0.7 }}>
                            <Text style={[styles.txtDarkTitle, { paddingStart: 0, }]}>{segment == 0 ? "Defence Power" : segment == 1 ? "Attack Power" : "Population"}</Text>
                            {
                                data?.bots.map((i: any, index: number) => {
                                    return (
                                        <View key={index} style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            paddingVertical: 6,
                                        }}>
                                            <Text style={[styles.txtDark, { paddingStart: 0, fontSize: 15, fontWeight: "700", color: colors.black }]}>{i.countryName}</Text>
                                            <Text style={[styles.txtDark, { paddingStart: 0, }]}>{
                                                (i.spearman * soldier_power.spearman.defence) +
                                                (i.bowman * soldier_power.bowman.defence) +
                                                (i.axeman * soldier_power.axeman.defence) +
                                                (i.swordman * soldier_power.swordman.defence) +
                                                (i.knight * soldier_power.knight.defence)
                                            }</Text>
                                            <ButtonSelect />
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </CardView>
            </ScrollView>
        </ContentView >
    );
};