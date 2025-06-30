import Sound from 'react-native-sound';

export const PlaySoundClick = () => {
    Sound.setCategory('Playback');
    var whoosh = new Sound('click1.wav', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // Play the sound with an onEnd callback
        whoosh.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
    });
    whoosh.setCurrentTime(1.5);
    whoosh.setVolume(1.0)
};
