
namespace game {

    export class StarMoveBehaviorFilter extends ut.EntityFilter {
        pos: ut.Core2D.TransformLocalPosition;
        star: game.Star;
    }

    export class StarMoveBehavior extends ut.ComponentBehaviour {

        data: StarMoveBehaviorFilter;

        // ComponentBehaviour lifecycle events
        // uncomment any method you need
        
        // this method is called for each entity matching the StarMoveBehaviorFilter signature, once when enabled
        OnEntityEnable():void {
            var speed = randfloat(5, 7);

            var x = randfloat(-1, 1);
            var y = randfloat(-1, 1);
            var distance = ((x ** 2) + (y ** 2)) ** 0.5;
            var multiplier = distance / speed;
            x /= multiplier;
            y /= multiplier;

            this.data.star.direction = new Vector2(x, y);
        }
        
        // this method is called for each entity matching the StarMoveBehaviorFilter signature, every frame it's enabled
        OnEntityUpdate():void {
            this.data.pos.position = new Vector3(this.data.pos.position.x + (this.data.star.direction.x * this.scheduler.deltaTime()),
                                       this.data.pos.position.y + (this.data.star.direction.y * this.scheduler.deltaTime()),
                                       0);

            if (Math.abs(this.data.pos.position.x) > 10) {
                if (Math.abs(this.data.pos.position.y) > 10) {
                    this.world.destroyEntity(this.entity);
                }
            }
        }

        // this method is called for each entity matching the StarMoveBehaviorFilter signature, once when disabled
        //OnEntityDisable():void { }

    }
}
