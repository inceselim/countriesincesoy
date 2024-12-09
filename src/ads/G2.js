
import React, { useEffect, useState } from 'react';
import AdMob, { AdMobPlus, InterstitialAd } from '@admob-plus/react-native'

const adUnitId = Platform.OS === "ios" ?
    "ca-app-pub-1017432203303316/3942475435" :
    "ca-app-pub-1017432203303316/1788652053"

export default function G2() {
    const [loaded, setLoaded] = useState(false);
    const G2ShowAd = async () => {
        await AdMob.start()

        const interstitial = new InterstitialAd({
            adUnitId: adUnitId,
        })

        await interstitial.load()
            .then(async () => {
                if (AdMob.adIsLoaded({ id: adUnitId })) {
                    console.log("interstitial.isLoaded: ", interstitial.isLoaded())
                    await interstitial.show()
                }
                if (interstitial.isLoaded()) {
                    await interstitial.show()
                }
            })
    }
    useEffect(() => {
        G2ShowAd()
    }, []);
}