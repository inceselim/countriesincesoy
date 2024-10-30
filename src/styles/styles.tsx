import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./colors";
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        // backgroundColor: colors.card,
    },
    content: {
        flex: 1,
        marginHorizontal: "1%"
    },
    txt: {
        fontSize: 14,
        color: colors.txtWhite
    },
    txtBold: {
        fontSize: 13,
        color: colors.txtWhite,
        fontWeight: "bold"
    },
    txtDarkBold: {
        fontSize: 14,
        fontWeight: "800",
        color: colors.black
    },
    txtDarkTitle: {
        fontSize: 20,
        paddingHorizontal: 6,
        paddingVertical: 6,
        fontWeight: "800",
        color: colors.black
    },
    txtTitle: {
        fontSize: 20,
        paddingHorizontal: 6,
        paddingVertical: 6,
        fontWeight: "800",
        color: colors.white
    },
    txtDark: {
        fontSize: 14,
        color: colors.black,
        fontWeight: "600",
        paddingEnd: 12
    },
    txtCenter: {
        textAlign: "center",
        paddingHorizontal: 6
    },
    txtUyumlu: {
        fontSize: width * 0.013,
        paddingHorizontal: 6,
        marginHorizontal: 6,
        fontWeight: "bold",
        color: colors.black
    },
})