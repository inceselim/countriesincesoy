// utils/showInterstitialAd.ts
import { Platform } from 'react-native';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

let interstitialAd: InterstitialAd | null = null;

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.select({
    ios: 'ca-app-pub-1017432203303316/5055148109',      // iOS için gerçek ID
    android: 'ca-app-pub-1017432203303316/5227334651', // Android için gerçek ID
  }) || TestIds.INTERSTITIAL;
export const Inter1 = () => {
  return new Promise<void>((resolve, reject) => {
    if (!interstitialAd) {
      interstitialAd = InterstitialAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
      });
    }

    const adEventListener = interstitialAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitialAd?.show();
      }
    );

    const closeListener = interstitialAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        resolve(); // reklam kapatılınca devam et
        interstitialAd?.removeAllListeners();
        interstitialAd = null;
      }
    );

    const errorListener = interstitialAd.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.error('Reklam hatası:', error);
        reject(error);
        interstitialAd?.removeAllListeners();
        interstitialAd = null;
      }
    );

    interstitialAd.load();
  });
};
