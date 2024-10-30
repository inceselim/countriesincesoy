import AdMob, { RewardedAd } from '@admob-plus/react-native'
import React, { useEffect, useState } from 'react';

const adUnitId = Platform.OS === "ios" ?
    "ca-app-pub-1017432203303316/5055148109" :
    "ca-app-pub-1017432203303316/5227334651"
    
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});

React.useEffect(async () => {
  await AdMobPlus.start()

  const rewarded = new RewardedAd({
    adUnitId: 'ca-app-pub-3940256099942544/5224354917',
  })
  await rewarded.load()
  await rewarded.show()
}, [])