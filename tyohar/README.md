# Tyohar

Tyohar (त्योहार) is a Play Store–ready Expo app for busy devotees who cannot visit a temple in person.

## What this first release does

- Browse temples across India and book **puja**, **hawan**, or a small **bhet / chadava**
- **Home pickup**: Tyohar collects homemade prasad, flowers, vastra, or a prayer letter and submits it at the chosen temple
- Sankalp with devotee name, gotra, and family members
- Sandbox checkout (no live UPI yet) so the booking journey is complete
- Order tracking for pickup → temple offering → prasad dispatch
- Profile saved on-device (AsyncStorage)

Payments, live video rooms, WhatsApp alerts, and a real operations backend are the next layer — the product shell and user flows are in place.

## Run locally

```bash
cd tyohar
npm install
npm run web          # browser
npm run android      # Expo Go / emulator
```

## Play Store build (Android App Bundle)

1. Install EAS: `npm i -g eas-cli` and `eas login`
2. In `tyohar/`, run `eas init` and paste the project id into `app.json` → `expo.extra.eas.projectId` if asked
3. Internal testing APK: `eas build -p android --profile preview`
4. Production bundle: `eas build -p android --profile production`
5. Upload the `.aab` in Play Console (`in.tyohar.app`)
6. Store listing copy lives in `PLAYSTORE.md`

Replace `assets/images/` icons with final brand art before production submit.

## Package

- App name: **Tyohar**
- Application id: `in.tyohar.app`
- Version: `1.0.0` (versionCode 1)
