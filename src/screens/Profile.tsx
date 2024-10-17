import { ScrollView, TouchableOpacity } from "react-native";

import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"


import { ScreenHeader } from "@components/ScreenHeader";
import { Center, Heading, Text, VStack, useToast } from "@gluestack-ui/themed";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useState } from "react";
import { ToastMessage } from "@components/ToastMessage";

export function Profile() {
    const [userPhoto, setUserPhoto] = useState("https:github.com/GMaiaa.png")

    const toast = useToast()

    async function handleUserPhotoSelect() {
        try {

            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
            })

            if (photoSelected.canceled) {
                return
            }

            const photoURI = photoSelected.assets[0].uri

            if (photoURI) {
                const photoInfo = await FileSystem.getInfoAsync(photoURI) as {
                    size: number
                }

                if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
                    return toast.show({
                        placement: "top",
                        render: ({id}) => (
                            <ToastMessage id={id} action="error" title="Imagem muito grande!" description="Essa imagem é muito grande. Escolha uma de até 5MB" onClose={() => toast.close(id)}/>
                        )
                    })
                }

                setUserPhoto(photoURI)
            }

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil" />
            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
                <Center mt="$6" px="$10">
                    <UserPhoto source={{ uri: userPhoto }} alt="Foto do usuário" size="xl" />

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text color="$green500" fontFamily="$heading" fontSize="$md" mt="$2" mb="$8" > Alterar Foto </Text>
                    </TouchableOpacity>

                    <Center w="$full" gap="$4">
                        <Input placeholder="Nome" bg="$gray600" />
                        <Input value="gabrielmaiaa22@gmail.com" bg="$gray600" isReadOnly />
                    </Center>

                    <Heading
                        alignSelf="flex-start"
                        fontFamily="$heading"
                        color="$gray200"
                        fontSize="$md"
                        mt="$12"
                        mb="$2"
                    >
                        Alterar Senha
                    </Heading>

                    <Center w="$full" gap="$4">
                        <Input placeholder="Senha Atual" bg="$gray600" secureTextEntry />
                        <Input placeholder="Nova Senha" bg="$gray600" secureTextEntry />
                        <Input placeholder="Confirmar Nova Senha" bg="$gray600" secureTextEntry />

                        <Button title="Atualizar" />
                    </Center>
                </Center>




            </ScrollView>
        </VStack>
    )
}