import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';


export default function GoogleAuth() {

    GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_WEB_ID,
        scopes: ['profile', 'email'],
        offlineAccess: true,
        forceCodeForRefreshToken: false,
        iosClientId: process.env.EXPO_PUBLIC_IOS_ID,
    });

    const GoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();

            // initiates signIn process
            const userInfo = await GoogleSignin.signIn();
            return userInfo;
        } catch (error) {
            console.log(error);
        }
    };

    const googleSignIn = async () => {
        try {
            const response = await GoogleLogin();
            if (!response) return null

            // retrieve user data
            const { idToken, user } = response.data ?? {};
            if (idToken) {
                console.log( user) // Server call to validate the token & process the user data for signing In
                return response; // Return the response for further processing
            }
            return null;
        } catch (error) {
            console.log('Error', error);
            return null;
        }
    };

    // use this for signing out the user
    const googleSignOut = async () => {
        try {
            // initiates sign out process
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
        }
    };

    return {
        googleSignIn,
        googleSignOut,
    };

}