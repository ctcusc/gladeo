import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D94077',
      },
    
    main: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    footer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    step: {
        color: '#DEA3BB',
        fontFamily: 'montserrat-regular', 
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: '10%',
    
    },

    text: {
        fontFamily: 'montserrat-regular', 
        fontSize: 30,
        lineHeight: 37,
        fontWeight: 'bold',
        color: '#F5F5F5',
        marginBottom: '20%',
        textAlign: 'center',
        width: 256,
    }, 

    image: {
        marginBottom: '3%',
    },

    button: {
        width: 179,
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        justifyContent: 'center',
    },
    
    buttonText: {
        fontStyle: 'normal',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E5186E',
        textAlign: 'center',
    }
})

export default styles