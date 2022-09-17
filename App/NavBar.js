import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function NavBar({ handleNext, handlePrev, navBarHeight }) {
  const [showNavBar, setShowNavBar] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const showKeys = Keyboard.addListener("keyboardWillShow", (e) => {
      setHeight(e.endCoordinates.height);
      setShowNavBar(true);
    });
    const hideKeys = Keyboard.addListener("keyboardWillHide", () => {
      setShowNavBar(false);
      setHeight(0);
    });
    return function cleanup() {
      showKeys.remove();
      hideKeys.remove();
    };
  });
  return (<>
{showNavBar && 
      <View style={[styles.navbar, { bottom: height, height: navBarHeight  }]}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#f2f1f6",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 0,
            borderColor: "#f2f1f6",
          }}
          onPress={handlePrev}
        >
          <Ionicons name="chevron-up" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.div} />
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#f2f1f6",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 0,
            borderColor: "#f2f1f6",
          }}
          onPress={handleNext}
        >
          <Ionicons name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
      }
      </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#f2f1f6",
    // height: 50,
    width: "100%",
    position: "absolute",
    left: 0,
    flexDirection: "row",
  },
  div: {
    backgroundColor: "#d2d3d8",
    width: 1,
    height: "50%",
    alignSelf: "center",
    borderRadius: 25,
  },
});
