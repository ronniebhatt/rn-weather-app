if (__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}


import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, TextInput, TouchableWithoutFeedback, Keyboard, Alert, Dimensions } from 'react-native';
import { Icon } from "expo";
import Card from './components/Card';
import { weatherConditions } from './components/WeatherCondition';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { dimensions } from './shared/theme';

class App extends Component {


    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: [],
            cityName: "",
            error: ""
        }
    }



    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.fetchWeather(position.coords.latitude, position.coords.longitude)
            },
            error => {
                this.setState({ error: "error getting weather condition" })
            }
        )

    }

    async fetchWeather(lat = 25, lon = 25) {
        try {
            let response = await fetch(`https://openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b6907d289e10d714a6e88b30761fae22`);
            let responseJson = await response.json();
            console.log("fetchWeather", responseJson)
            this.setState({
                isLoading: false,
                dataSource: responseJson
            })
            return responseJson.movies;
        } catch (error) {
            console.error(error);
        }
    }

    getWeatherData = async (city) => {
        try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=124ad040fc978b946f292e15eee2a8d9`);
            let responseJson = await response.json();
            console.log("getWeatherData", responseJson)
            if (responseJson.message === "city not found") {
                Alert.alert(
                    'Alert',
                    'City not found',
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                    ],
                    { cancelable: false },
                );
            } else {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                })
            }

        } catch (error) {
            console.error(error);
        }
    }




    changeCityNameHandler = (val) => {
        this.setState({ cityName: val })
    }


    searchButtonPressed = () => {
        let name = this.state.cityName

        if (name !== "") {

            this.getWeatherData(name)

            this.setState({ cityName: "" })
            Keyboard.dismiss()



        } else {
            name = "mumbai"
            this.getWeatherData(name)

        }


    }

    render() {

        const dataSource = this.state.dataSource;

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>

                    <ActivityIndicator />
                </View>
            )
        }

        return (

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <View style={styles.container}>


                    <View style={styles.header}>

                        <TextInput style={styles.textinput}
                            placeholder="Enter City Name"
                            value={this.state.cityName}
                            onChangeText={this.changeCityNameHandler}
                        />

                        <Icon.Ionicons
                            name="ios-search"
                            size={25}
                            style={{
                                alignSelf: 'center'
                            }}
                            onPress={() => this.searchButtonPressed()}
                        />

                    </View>


                    <Card name={dataSource.name}
                        country={dataSource.sys.country}
                        temp={dataSource.main.temp}
                        main={dataSource.weather[0].main}
                        description={dataSource.weather[0].description}
                        Iconname={weatherConditions[dataSource.weather[0].main].icon}
                    />

                </View>
            </TouchableWithoutFeedback>

        );
    }
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1, paddingTop: 20,
        justifyContent: "space-around",
    },
    header: {
        width: dimensions.width - 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        alignSelf: 'center',
        height: 60,
        backgroundColor: '#FFF',
        shadowColor: 'rgba(0,0,0,0.7)',
        shadowOffset: {
            width: 0,
            height: 2
        },
        paddingHorizontal: 20,
        shadowOpacity: 0.6,
        elevation: 3,
        borderRadius: 11


    },
    textinput: {
        width: dimensions.width - 105,
        height: 40,
        marginRight: 10,
    }

}) 