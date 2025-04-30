import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end', 
    },
    containerForm:{
        backgroundColor: '#FEEAFA',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '10%',
        paddingEnd: '10%',
        paddingTop: 28,
        paddingBottom: 28,
        height: 'auto',
        justifyContent: 'space-between'
    },
    title:{
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#708090'
    },
    text:{
        color: '#778899',
        fontFamily: 'times',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    },
    button:{
        backgroundColor: '#BC8F8F',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText:{
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    }
});

export default styles;