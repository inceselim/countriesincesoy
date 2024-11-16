import React, { useRef, useState } from "react";
import { Animated, TextInput, StyleSheet, View, Easing } from "react-native";

export const App = () => {
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;
  const intervalRef:any = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [currentColor, setCurrentColor] = useState("white");
  const [nextColor, setNextColor] = useState(getRandomColor());

  function getRandomColor() {
    return (
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")"
    );
  }

  const startColorAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentColor(nextColor);
      setNextColor(getRandomColor());
      Animated.timing(backgroundColorAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        backgroundColorAnim.setValue(0); // Bir sonraki animasyon için sıfırla
      });
    }, 1000);
  };

  const stopColorAnimation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    startColorAnimation();
  };

  const handleBlur = () => {
    setIsFocused(false);
    stopColorAnimation();
    setCurrentColor("white"); // Odak dışındayken rengi beyaza sıfırla
  };

  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [currentColor, nextColor],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <TextInput
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Type something"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "white",
  },
});
