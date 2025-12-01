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

            // Sign out first to clear cached account selection
            await GoogleSignin.signOut();

            // initiates signIn process with account picker
            const userInfo = await GoogleSignin.signIn();
            return userInfo;
        } catch (error) {
            console.log(error + "from google");
        }
    };

    const googleSignIn = async () => {
        try {
            const response = await GoogleLogin();
            if (!response) return null
            // retrieve user data
            const { idToken, user } = response.data ?? {};
            if (idToken) {
                return response;
            }
            return null;
        } catch (error) {
            console.log('Error on google', error);
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