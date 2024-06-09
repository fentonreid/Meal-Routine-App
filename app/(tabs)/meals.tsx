import { View, Text, StyleSheet, FlatList } from "react-native";
import { useQuery } from "@realm/react";
import { Meals } from "@/models/schemas/Schemas";
import { RangeSlider } from "@react-native-assets/slider";
import { useState } from "react";

const CustomThumb = ({ value }: any) => {
  return <Text>{value}</Text>;
};

const Screen = () => {
  const meals = useQuery<Meals>("Meals");
  const [range, setRange] = useState<[number, number]>([0, 0]);

  return (
    <View style={{ flex: 1 }}>
      <RangeSlider
        onValueChange={setRange}
        minimumValue={0}
        maximumValue={10}
        range={range}
        thumbSize={24}
        trackHeight={8}
        thumbStyle={{ flex: 1 }}
        step={1}
        CustomThumb={CustomThumb}
        outboundColor="blue"
        inboundColor="red"
      />
      {/* <Text>Meals Screen</Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <Text>{`${item.name} - ${item.ingredients[0].ingredient}`}</Text>
        )}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Screen;
