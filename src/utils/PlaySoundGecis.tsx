import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Platform } from 'react-native';

const audioRecorderPlayer = new AudioRecorderPlayer();

export const PlaySoundGecis = async () => {
    try {
        // iOS için uzantılı, Android için uzantısız
        const soundPath = Platform.select({
            ios: 'arrow.wav',
            android: 'arrow',
        });

        const msg = await audioRecorderPlayer.startPlayer(soundPath);

        // Ses seviyesi ayarla
        await audioRecorderPlayer.setVolume(1.0);

        // Oynatma bittiğinde durdur
        audioRecorderPlayer.addPlayBackListener((e: any) => {
            if (e.current_position >= e.duration) {
                audioRecorderPlayer.stopPlayer();
                audioRecorderPlayer.removePlayBackListener();
            }
        });

        console.log('Playing:', msg);
    } catch (err) {
        console.log('Playback error:', err);
    }
};
