
import React, { useEffect, useState } from 'react';
import AdMob, { AdMobPlus, InterstitialAd } from '@admob-plus/react-native'

const adUnitId = Platform.OS === "ios" ?
    "ca-app-pub-1017432203303316/5055148109" :
    "ca-app-pub-1017432203303316/5227334651"

export default function G1() {
    const [loaded, setLoaded] = useState(false);
    console.log("sadas")
    const G1ShowAd = async () => {
        await AdMob.start()

        const interstitial = new InterstitialAd({
            adUnitId: adUnitId,
        })

        await interstitial.load()
            .then(async () => {
                console.log("AAA: ")
                console.log("AdMob.adIsLoaded({ id: adUnitId }),", AdMob.adIsLoaded({ id: adUnitId }).then((a) => console.log("first A: ", a)))
                console.log("interstitial.isLoaded(): ", interstitial.isLoaded())
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
        G1ShowAd()
    }, []);

    // No advert ready to show yet
    // if (!loaded) {
    //     return null;
    // } else {
    //     interstitial.show()
    // }
}