import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

import BackgroundImg from "@assets/background.png"
import Logo from "@assets/logo.svg"
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useAuth } from "@hooks/useAuth";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import { Toast } from "@gluestack-ui/themed";
import { ToastDescription } from "@gluestack-ui/themed";
import { AppError } from "@utils/AppError";
import { useState } from "react";


type FormData = {
    email: string;
    password: string;
}

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const { signIn } = useAuth()
    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    const toast = useToast();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

    function handleNewAccount() {
        navigation.navigate('signUp');
    }

    async function handleSignIn({ email, password }: FormData) {
        try {
            setIsLoading(true)
            await signIn(email, password);

          } catch (error) {
            const isAppError = error instanceof AppError;
      
            const title =  isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'

            toast.show({
                placement: "top",
                render: () => {
                    return (
                        <Toast action="error" variant="solid" backgroundColor="$red500">
                            <ToastDescription color="$white">{title}</ToastDescription>
                        </Toast>
                    )
                }
            })

            setIsLoading(false)
            
        }

      

    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1}>
                <Image
                    w="$full"
                    h={624}
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando em bicicletas"
                    position="absolute"
                />

                <VStack flex={1} px="$10" pb="$16">
                    <Center my="$24">
                        <Logo />
                        <Text color="$gray100" fontSize="$sm">
                            Treine sua mente e o seu corpo.
                        </Text>
                    </Center>

                    <Center gap="$2">
                        <Heading color="$gray100"> Acesse a conta </Heading>

                        <Controller
                            control={control}
                            name="email"
                            rules={{ required: 'Informe o e-mail' }}
                            render={({ field: { onChange } }) => (
                                <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" onChangeText={onChange}
                                    errorMessage={errors.email?.message} />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: 'Informe a senha' }}
                            render={({ field: { onChange } }) => (
                                <Input placeholder="Senha" onChangeText={onChange} errorMessage={errors.password?.message} secureTextEntry />
                            )}
                        />



                        <Button title="Acessar" onPress={handleSubmit(handleSignIn)}  isLoading={isLoading}/>
                    </Center>

                    <Center flex={1} justifyContent="flex-end" mt="$4">
                        <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body"> Ainda não tem acesso?</Text>

                        <Button title="Criar Conta" variant="outline" onPress={handleNewAccount}/>
                    </Center>
                </VStack>
            </VStack>
        </ScrollView>
    )
}