import { Link } from "expo-router";
import { Text, View } from "react-native";
import Header from '../../components/common/header';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <Text>welcome</Text>
      <Link href="/login">
        <Text style={{ color: "blue" }}>Go to Lohgin</Text></Link>
        <Link href="/register">
        <Text style={{ color: "blue" }}>Go to reg</Text></Link>
         <Link href="/customerList">
        <Text style={{ color: "blue" }}>Go  rgeg</Text></Link>
        <Link href="/dashboard">
        <Text style={{ color: "blue" }}>Goeg</Text></Link>
         <Link href="/filter">
        <Text style={{ color: "blue" }}>Gofgyjheg</Text></Link>
           <Link href="/landingPage">
        <Text style={{ color: "blue" }}>Gofgyjhvgeg</Text></Link>
    </View>
  );
}
