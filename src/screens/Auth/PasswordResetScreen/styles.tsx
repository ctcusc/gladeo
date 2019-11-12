import { StyleSheet } from 'react-native'
import { normalize } from 'path'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    main: {
        flex: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        color: '#000',
    },

    boldText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        lineHeight: 19,
        textAlign: 'center',
        color: '#777777',
        marginLeft: 66,
        marginRight: 65,
        marginTop: 28,
        marginBottom: 110
    },

    normalText: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 19,
        color: '#777777',
    },

    pinkTextButton: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 19,
    },

    resendButtonLine: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 19
    },

    footer: {
        flex: 1
    }
})

export default styles