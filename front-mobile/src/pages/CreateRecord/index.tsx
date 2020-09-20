import React, {useState, useEffect} from 'react';
import {  Text, StyleSheet, View, TextInput, Alert } from 'react-native';
import Header from '../../components/Header';
import PlatformCard from './PlatformCard';
import { GamePlatform, Game } from './types';
import { FontAwesome5 as Icon } from "@expo/vector-icons"
import RnPickerSelect from 'react-native-picker-select'
import axios from 'axios';
import {RectButton} from 'react-native-gesture-handler'
const placeholder = {
    label: 'Selecione o Game',
    value: null
}
const BASE_URL = 'http://v8-n6i.anonymous.front-mobile.exp.direct:80'

const mapSelectValue = (games: Game[]) =>{
    return games.map(game => ({
        ...game,
        label: game.title,
        value: game.id
    }))
}

const CreateRecord = () =>{


    const  [name, setName] = useState('');
    const  [age, setAge] = useState('');
    const [platform, setPlatform] = useState<GamePlatform>();

    const [selectedGame, setSelectedGame] = useState('');
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const handleChangePlatform = (selectedPlatform:GamePlatform) => {
        setPlatform(selectedPlatform);
        const gamesByPlatform = allGames.filter(
            game => game.platform === selectedPlatform
        )
            setFilteredGames(gamesByPlatform)
    }
    const handleSubmit = () => {
        const payload = { name, age, gameId: selectedGame};

        axios.post(`${BASE_URL}/records`, payload).then(()=>{
            setName('');
            setAge('');
            setSelectedGame('');
            setPlatform(undefined);
            Alert.alert("Dados enviados")
        }).catch(() => Alert.alert("Error"))
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/games`).then(response => {
            const selectValue = mapSelectValue(response.data)
            setAllGames(selectValue)
            
        }).catch(() => Alert.alert("Error"))

    }, [])
    return (
        <>
            <Header></Header>
            <View style={styles.container}>
                <TextInput style={styles.inputText}
                    placeholder={"Nome"}
                    placeholderTextColor="9e9e9e"
                    onChangeText={text => setName(text)}
                    value={name}
                ></TextInput>
                <TextInput 
                keyboardType={"numeric"}
                maxLength={3}
                placeholder={"Idade"}
                placeholderTextColor="#9e9e9e"
                style={styles.inputText}
                onChangeText={text => setAge(text)}
                value={age}
                ></TextInput>

                <View style={styles.platformContainer}>
                    <PlatformCard
                        icon="laptop"
                        platform="PC"
                        onChange={handleChangePlatform}
                        activePlatform={platform}
                    ></PlatformCard>
                    <PlatformCard
                        icon="xbox"
                        platform="XBOX"
                        onChange={handleChangePlatform}
                        activePlatform={platform}
                    ></PlatformCard>
                    <PlatformCard
                        icon="playstation"
                        platform="PS"
                        onChange={handleChangePlatform}
                        activePlatform={platform}
                    ></PlatformCard>
                </View>
                <RnPickerSelect
                    onValueChange={value => {
                        setSelectedGame(value);
                    }}
                    placeholder={placeholder}
                    value={selectedGame}
                    items={filteredGames}
                    style={pickerSelectStyles}
                    Icon={() =>{
                        return <Icon name="chevron-down" color="#9e9e9e" siz={25}></Icon>
                    }}
                >

                </RnPickerSelect>
                <View style={styles.footer}>
                    <RectButton  style={styles.button}  onPress={handleSubmit}  >
                        <Text style={styles.buttonText}>Salvar</Text>
                    </RectButton>
                </View>
            </View>
           
        </>
    );
}

const pickerSelectStyles = StyleSheet.create(
    {
        inputIOS: {
          fontSize: 16,
          paddingVertical: 12,
          paddingHorizontal: 20,
          backgroundColor: '#FFF',
          borderRadius: 10,
          color: '#ED7947',
          paddingRight: 30,
          fontFamily: "Play_700Bold",
          height: 50
        },
        inputAndroid: {
          fontSize: 16,
          paddingVertical: 12,
          paddingHorizontal: 20,
          backgroundColor: '#FFF',
          borderRadius: 10,
          color: '#ED7947',
          paddingRight: 30,
          fontFamily: "Play_700Bold",
          height: 50
        },
        placeholder: {
          color: '#9E9E9E',
          fontSize: 16,
          fontFamily: "Play_700Bold",
        },
        iconContainer: {
          top: 10,
          right: 12,
        }
      }
)
const styles = StyleSheet.create({
    
        container: {
          marginTop: '15%',
          paddingRight: '5%',
          paddingLeft: '5%',
          paddingBottom: 50
        },
        inputText: {
          height: 50,
          backgroundColor: '#FFF',
          borderRadius: 10,
          color: '#ED7947',
          fontFamily: "Play_700Bold",
          fontSize: 16,
          paddingLeft: 20,
          marginBottom: 21
        },
        platformContainer: {
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        footer: {
          marginTop: '15%',
          alignItems: 'center',
        },
        button: {
          backgroundColor: '#00D4FF',
          flexDirection: 'row',
          borderRadius: 10,
          height: 60,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        },
        buttonText: {
          fontFamily: "Play_700Bold",
          fontWeight: 'bold',
          fontSize: 18,
          color: '#0B1F34',
        }
      });
  

export default  CreateRecord;