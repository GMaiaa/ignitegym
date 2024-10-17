import { useState } from "react";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, Text, VStack } from "@gluestack-ui/themed";
import { SectionList } from "react-native";

export function History(){
    const [exercises, setExercises] = useState([
        {
            title: "16.10.2024",
            data: ["Puxada Frontal", "Remada Curvada"]
        },
        {
            title: "21.10.2024",
            data: ["Puxada Frontal"]
        },
    ])
    return(
        <VStack flex={1}>
            <ScreenHeader title="Histórico"/>

            <SectionList 
            sections={exercises} 
            keyExtractor={item => item} 
            renderItem={() => <HistoryCard/>} 
            renderSectionHeader={({ section }) => (
                <Heading color="$gray200" fontSize="$md" mt="$10" mb="$3" fontFamily="$heading">{section.title}</Heading>
            )}
            style={{paddingHorizontal: 32}}
            contentContainerStyle={
                exercises.length === 0 && {flex: 1, justifyContent: "center"}
            }
            ListEmptyComponent={() => (
                <Text color="$gray100" textAlign="center">
                    Não há exercícios registrados ainda. {"\n"} Vamos fazer exercícios hoje?
                </Text>
            )}
            showsVerticalScrollIndicator={false}
            />
        </VStack>
    )
}