
namespace game {

    /** New System */
    export class SoundCollectionPlayerSystem extends ut.ComponentSystem {
        @ut.executeAfter(game.PlayerInputSystem)
        OnUpdate():void {
            this.world.forEach([ut.Entity, game.SoundCollection, game.SoundCollectionStart, ut.Audio.AudioSource], (entity, sounds, _, audio) => {
                audio.clip = sounds.sounds[randint(0, sounds.sounds.length - 1)];
                this.world.addComponent(entity, ut.Audio.AudioSourceStart);
                this.world.removeComponent(entity, game.SoundCollectionStart);
            });
        }
    }
}

function randint (min: number, max: number) : number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randfloat (min: number, max: number) : number {
    return Number((Math.random() * (max - min + 1) + min).toFixed(3));
}
