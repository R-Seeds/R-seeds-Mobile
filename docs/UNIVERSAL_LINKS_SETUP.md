# Universal Links Setup for R-Seeds

This document explains how to configure universal links for the R-Seeds mobile app.

## Files Created

1. **app.json** - Updated with universal link configuration
2. **web-config/apple-app-site-association** - iOS universal links config
3. **web-config/assetlinks.json** - Android app links config

## Deployment Requirements

### 1. Web Server Setup

Upload these files to your web server at `https://rseeds.app`:

```
https://rseeds.app/.well-known/apple-app-site-association
https://rseeds.app/.well-known/assetlinks.json
```

**Important:** Files must be served with proper MIME types:
- `apple-app-site-association`: `application/json` (no file extension)
- `assetlinks.json`: `application/json`

### 2. iOS Configuration

**Update apple-app-site-association:**
- Replace `TEAM_ID` with your Apple Developer Team ID
- Find Team ID in Apple Developer Console > Membership

**Example:**
```json
"appID": "ABC123DEF4.com.rseeds.rseeds"
```

### 3. Android Configuration

**Get your app's SHA256 fingerprint:**

For debug builds:
```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

For release builds:
```bash
keytool -list -v -keystore your-release-key.keystore -alias your-key-alias
```

**Update assetlinks.json:**
- Replace `YOUR_RELEASE_KEY_SHA256_FINGERPRINT_HERE` with actual fingerprint

### 4. Testing Universal Links

**iOS:**
1. Build and install app on device
2. Send link via Messages/Notes: `https://rseeds.app/project/spotlight/123`
3. Long press link → should show "Open in R-Seeds"

**Android:**
1. Build and install app on device
2. Test in browser: go to `https://rseeds.app/project/spotlight/123`
3. Should prompt to open in R-Seeds app

### 5. Fallback Behavior

- **App not installed:** Opens in browser
- **Universal links not configured:** Opens in browser
- **Invalid link:** Shows 404 page

## Current Status

✅ App configuration complete
⚠️ Web server deployment required
⚠️ Team ID and SHA256 fingerprints need updating

## Next Steps

1. Deploy web config files to `https://rseeds.app/.well-known/`
2. Update Team ID in apple-app-site-association
3. Update SHA256 fingerprint in assetlinks.json
4. Build and test on devices
