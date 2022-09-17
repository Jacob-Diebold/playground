import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Button } from "react-native-paper";
import NavBar from "./NavBar";

export default function TestScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [navBarHeight, setNavBarHeight] = useState(50);

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const refs = [ref1, ref2, ref3, ref4, ref5, ref6];

  const handleFocusNext = () => {
    const next = activeIndex + 1;
    if (next > refs.length - 1) return;
    refs[next].current.focus();
    setActiveIndex(next);
  };

  const handleFocusPrev = () => {
    const prev = activeIndex - 1;
    if (prev < 0) return;
    refs[prev].current.focus();
    setActiveIndex(prev);
  };

  const handleFocus = (i) => {
    setActiveIndex(i);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={navBarHeight}
      >
        <ScrollView>
          <View style={{ paddingTop: 300 }}>
            {refs.map((e, index) => (
              <TextInput
                key={index}
                label={"Name" + index}
                keyboardType="numeric"
                style={[styles.input, { marginVertical: 5 }]}
                ref={refs[index]}
                onFocus={() => handleFocus(index)}
              />
            ))}
            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <NavBar
        handleNext={handleFocusNext}
        handlePrev={handleFocusPrev}
        navBarHeight={navBarHeight}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
  },
});
