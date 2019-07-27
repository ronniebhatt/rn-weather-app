import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { dimensions } from '../shared/theme';

const Card = props => (
    <View>

        <View style={styles.card}>
            <Text style={styles.currentLocationText}>{props.name},{props.country}</Text>
            <Text style={styles.degreeText}>{parseInt(props.temp)}º</Text>
            <Text style={styles.subtitle}>{props.main}</Text>
            <Text style={styles.humidtyTitle}>{props.description}</Text>
            <MaterialCommunityIcons
                name={props.Iconname}
                size={72}
                style={styles.weatherImage}
                color="white"
            />

        </View>
    </View>
)

export default Card;

const styles = StyleSheet.create({

    card: {
        width: dimensions.width - 44,
        alignSelf: 'center',
        height: 300,
        borderRadius: 14,
        backgroundColor: "#5D50FE",
        alignItems: 'center',
        marginBottom: 90,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

    },
    degreeText: {
        fontSize: 120,
        color: "white",
        fontWeight: "600",
        paddingTop: 20,

    },
    subtitle: {
        color: "white",
        fontSize: 23,
        fontWeight: "600",
        textTransform: "capitalize",
    },
    humidtyTitle: {
        color: "white",
        fontSize: 19,
        fontWeight: "bold",
        paddingBottom: 30,
        paddingTop: 20,
        textTransform: "capitalize",
    },
    weatherImage: {
        position: "absolute",
        right: 0,
        top: 0,
        width: 80,


    },
    currentLocationText: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: "600",
        color: "white",
        paddingTop: 10,
        fontWeight: "700",

        marginRight: 30
    },
})