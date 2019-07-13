
namespace game {

    /** New System */
    export class PlayerInputSystem extends ut.ComponentSystem {
        
        OnUpdate():void {
            
            this.world.forEach([game.Character, ut.Core2D.Sprite2DRenderer], 
                (character, renderer) => {
                    if (ut.Runtime.Input.getMouseButtonDown(0)) {
                        character.punch = true;
                        character.recoveryProgress = 0;

                        renderer.sprite = character.punchedSprite;

                        character.recoveryProgress += this.scheduler.deltaTime();

                        ut.EntityGroup.instantiate(this.world, "game.StarGroup");
                        ut.EntityGroup.instantiate(this.world, "game.GruntGroup");
                    } else if (character.punch) {
                        character.recoveryProgress += this.scheduler.deltaTime();

                            if (character.recoveryProgress >= character.destinatedRecovery) {
                                renderer.sprite = character.sprite;
                                character.punch = false;
                            }
                    }
                }
            );
        }
    }
}
