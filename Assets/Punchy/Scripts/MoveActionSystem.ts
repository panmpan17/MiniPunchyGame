
namespace game {

    /** New System */
    export class MoveActionSystem extends ut.ComponentSystem {
        
        OnUpdate():void {
            this.world.forEach([ut.Entity, game.MoveAction, ut.Core2D.TransformLocalPosition], (entity, action, pos) => {
                if (action.progress == 0) {
                    action.original = new ut.Vector2(pos.position.x, pos.position.y);
                }

                action.progress += this.scheduler.deltaTime();

                if (action.progress >= action.duration) {
                    action.progress = action.duration;
                }

                var newPos = action.original.lerp(action.destination, action.progress / action.duration);
                pos.position = new Vector3(newPos.x, newPos.y, 0);

                if (action.progress == action.duration) {
                    this.world.removeComponent(entity, game.MoveAction);
                }
            });
        }
    }
}
