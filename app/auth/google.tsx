import {
    GoogleSignin,
    GoogleSigninButton,
    isErrorWithCode,
    statusCodes,
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
        // check if users' device has google play services
        await GoogleSignin.hasPlayServices();

        // initiates signIn process
        const userInfo = await GoogleSignin.signIn();
        return userInfo;
    };

    const googleSignIn = async () => {
        try {
            const response = await GoogleLogin();

            // retrieve user data
            const { idToken, user } = response.data ?? {};
            if (idToken) {
                console.log(response.data) // Server call to validate the token & process the user data for signing In
            }
        } catch (error) {
            console.log('Error', error);
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

    return (
        <GoogleSigninButton onPress={googleSignIn} />
    )
}