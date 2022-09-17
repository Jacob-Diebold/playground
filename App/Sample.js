import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Platform,
  TextInput
} from "react-native";
import Constants from "expo-constants";
// import { TextInput } from "react-native-paper";
import { Ionicons} from "@expo/vector-icons";


export default function Sample() {
  const [showNavBar, setShowNavBar] = useState(false);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0)


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
      showKeys.remove()
      hideKeys.remove()
    }
    
  });
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const refs = [ref1, ref2, ref3, ref4, ref5, ref6];

  const handleFocusNext = () => {
    const next = activeIndex + 1
    console.log(refs.length)
    if (next > refs.length - 1) return
    refs[next].current.focus()
    setActiveIndex(next)
    // console.log(activeIndex)
  }

  const handleFocusPrev = () => {
    const prev = activeIndex - 1
    if (prev < 0) return
    refs[prev].current.focus()
    setActiveIndex(prev)
  }

  const handleFocus = (i) => {
    setActiveIndex(i)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={48}
      >
        <ScrollView>
          <View style={{ paddingTop: 300 }}>
            
            {refs.map((e,index)=>
              <TextInput key={index} label={"Name"+index} keyboardType="numeric" style={[styles.input, {marginVertical: 5 }]} ref={refs[index]} onFocus={()=>handleFocus(index)} />
            )}
            {/* <TextInput label="Name4" style={{ marginVertical: 5 }} ref={refs[3]} />
            <TextInput label="Name5" style={{ marginVertical: 5 }} ref={refs[4]} />
            <TextInput label="Name6" style={{ marginVertical: 5 }} ref={refs[5]} /> */}

          </View>
        </ScrollView>
        {showNavBar && (
          <View style={[styles.navbar, { bottom: height - 34, }]}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#f2f1f6",
                justifyContent: "center",
                alignItems: "center",
                borderWidth:0,
                borderColor: "#f2f1f6"
              }}
              onPress={handleFocusPrev}
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
                borderWidth:0,
                borderColor: "#f2f1f6"
              }}
              onPress={handleFocusNext}
            >
              <Ionicons name="chevron-down" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
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
    borderWidth:1
  },
  title: {
    fontSize: 21,
    paddingTop: 20,
    paddingLeft: 20,
    fontWeight: "500",
  },
  subTitle: {
    paddingTop: 8,
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  navbar: {
    backgroundColor: "#f2f1f6",
    height: 50,
    width: "100%",
    position: "absolute",
    // bottom: height,
    left: 0,
    flexDirection: "row",
  },
  div: {
    backgroundColor: "#d2d3d8",
    width: 1,
    height: "50%",
    alignSelf: "center",
    borderRadius: 25
  }
});

// export default function App() {
//   const [showNavBar, setShowNavBar] = useState(true);
//   const [test, showTest] = useState("hello");

//   // useEffect(() => {
//   //   handleVisibleNavBar()
//   // }, [])

//   const dismiss = () => {
//     Keyboard.dismiss();
//     keyboardNotVisible()
//   };
//   const keyboardVisible = () => {
//     setShowNavBar(true);
//   };
//   const keyboardNotVisible = () => {
//     setShowNavBar(false);
//   };
//   const handleVisibleNavBar = () => {
//     if (showNavBar === true) {
//       keyboardNotVisible();
//     } else {
//       keyboardVisible();
//     }
//     console.log(showNavBar);
//   };

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior="position" keyboardVerticalOffset={100}>
//       <View style={styles.container}>
//     <ScrollView style={{flex:1, paddingTop:150}}>
//         <TouchableOpacity style={styles.dismiss} onPress={dismiss}>
//           <Text> {test} </Text>
//           <TextInput
//             label="Username"
//             style={styles.input}
//             placeholder="Username"
//             onFocus={keyboardVisible}
//           />
//           <TextInput label="Email" style={styles.input} placeholder="Email" onFocus={keyboardVisible}/>
//           <TextInput
//             label="Full Name"
//             style={styles.input}
//             placeholder="Full Name"
//             onFocus={keyboardVisible}
//           />
//           <TextInput
//             label="Full Name1"
//             style={styles.input}
//             placeholder="Full Name 123"
//             onFocus={keyboardVisible}
//           />
//         </TouchableOpacity>

//       </ScrollView>
//       </View>
//       {/* {showNavBar && (
//           <View style={styles.navbar}>
//             <TouchableOpacity
//               style={{
//                 flex: 1,
//                 backgroundColor: "pink",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Text>Up</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 flex: 1,
//                 backgroundColor: "lightblue",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Text>Down</Text>
//             </TouchableOpacity>
//           </View>
//         )} */}
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: "#ecf0f1",
//     // padding: 8,
//     width: "100%",
//     height: "100%",
//   },

//   dismiss: {
//     // backgroundColor: "blue",
//     flex: 1,
//     justifyContent: "center",
//   },
//   input: {
//     marginVertical: 5,
//     width: "100%",
//     height: 80,
//     backgroundColor: "light grey",
//     borderColor: "black",
//     borderWidth: 1,
//     paddingHorizontal: 5,
//   },
//   navbar: {
//     backgroundColor: "grey",
//     height: 50,
//     width: "100%",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     flexDirection: "row",
//   },
// });
