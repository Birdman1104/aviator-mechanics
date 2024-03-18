import { lego } from '@armathai/lego';
import { Howl } from 'howler';
import { audioAssets } from './assets/assetsNames/audio';
import { HeadModelEvents } from './events/ModelEvents';

class SoundControl {
    private sounds: any;
    public constructor() {
        this.sounds = {};
        lego.event.on(HeadModelEvents.GameModelUpdate, this.gameModelUpdate, this);
    }

    public loadSounds(): void {
        audioAssets.forEach(({ name, path }) => {
            this.sounds[name] = new Howl({ src: path });
        });
    }

    private gameModelUpdate(): void {
        this.sounds.sound.play();
    }
}

const SoundController = new SoundControl();
export default SoundController;
