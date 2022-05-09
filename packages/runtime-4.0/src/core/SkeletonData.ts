import type { ISkeletonData } from "@pixi-spine/base";
import type { Animation } from "./Animation";
import { BoneData } from "./BoneData";
import { EventData } from "./EventData";
import { IkConstraintData } from "./IkConstraintData";
import { PathConstraintData } from "./PathConstraintData";
import { Skin } from "./Skin";
import { SlotData } from "./SlotData";
import { TransformConstraintData } from "./TransformConstraintData";

/** Stores the setup pose and all of the stateless data for a skeleton.
 *
 * See [Data objects](http://esotericsoftware.com/spine-runtime-architecture#Data-objects) in the Spine Runtimes
 * Guide.
 * @public
 * */
export class SkeletonData
    implements
        ISkeletonData<
            BoneData,
            SlotData,
            Skin,
            Animation,
            EventData,
            IkConstraintData,
            TransformConstraintData,
            PathConstraintData
        >
{
    /** The skeleton's name, which by default is the name of the skeleton data file, if possible. May be null. */
    name: string;

    /** The skeleton's bones, sorted parent first. The root bone is always the first bone. */
    bones = new Array<BoneData>(); // Ordered parents first.

    /** The skeleton's slots. */
    slots = new Array<SlotData>(); // Setup pose draw order.
    skins = new Array<Skin>();

    /** The skeleton's default skin. By default this skin contains all attachments that were not in a skin in Spine.
     *
     * See {@link Skeleton#getAttachmentByName()}.
     * May be null. */
    defaultSkin: Skin;

    /** The skeleton's events. */
    events = new Array<EventData>();

    /** The skeleton's animations. */
    animations = new Array<Animation>();

    /** The skeleton's IK constraints. */
    ikConstraints = new Array<IkConstraintData>();

    /** The skeleton's transform constraints. */
    transformConstraints = new Array<TransformConstraintData>();

    /** The skeleton's path constraints. */
    pathConstraints = new Array<PathConstraintData>();

    /** The X coordinate of the skeleton's axis aligned bounding box in the setup pose. */
    x: number;

    /** The Y coordinate of the skeleton's axis aligned bounding box in the setup pose. */
    y: number;

    /** The width of the skeleton's axis aligned bounding box in the setup pose. */
    width: number;

    /** The height of the skeleton's axis aligned bounding box in the setup pose. */
    height: number;

    /** The Spine version used to export the skeleton data, or null. */
    version: string;

    /** The skeleton data hash. This value will change if any of the skeleton data has changed. May be null. */
    hash: string;

    // Nonessential
    /** The dopesheet FPS in Spine. Available only when nonessential data was exported. */
    fps = 0;

    /** The path to the images directory as defined in Spine. Available only when nonessential data was exported. May be null. */
    imagesPath: string;

    /** The path to the audio directory as defined in Spine. Available only when nonessential data was exported. May be null. */
    audioPath: string;

    /** Finds a bone by comparing each bone's name. It is more efficient to cache the results of this method than to call it
     * multiple times.
     * @returns May be null. */
    findBone(boneName: string) {
        if (!boneName) throw new Error("boneName cannot be null.");
        let bones = this.bones;
        for (let i = 0, n = bones.length; i < n; i++) {
            let bone = bones[i];
            if (bone.name == boneName) return bone;
        }
        return null;
    }

    /** Finds a slot by comparing each slot's name. It is more efficient to cache the results of this method than to call it
     * multiple times.
     * @returns May be null. */
    findSlot(slotName: string) {
        if (!slotName) throw new Error("slotName cannot be null.");
        let slots = this.slots;
        for (let i = 0, n = slots.length; i < n; i++) {
            let slot = slots[i];
            if (slot.name == slotName) return slot;
        }
        return null;
    }

    /** Finds a skin by comparing each skin's name. It is more efficient to cache the results of this method than to call it
     * multiple times.
     * @returns May be null. */
    findSkin(skinName: string) {
        if (!skinName) throw new Error("skinName cannot be null.");
        let skins = this.skins;
        for (let i = 0, n = skins.length; i < n; i++) {
            let skin = skins[i];
            if (skin.name == skinName) return skin;
        }
        return null;
    }

    /** Finds an event by comparing each events's name. It is more efficient to cache the results of this method than to call it
     * multiple times.
     * @returns May be null. */
    findEvent(eventDataName: string) {
        if (!eventDataName) throw new Error("eventDataName cannot be null.");
        let events = this.events;
        for (let i = 0, n = events.length; i < n; i++) {
            let event = events[i];
            if (event.name == eventDataName) return event;
        }
        return null;
    }

    /** Finds an animation by comparing each animation's name. It is more efficient to cache the results of this method than to
     * call it multiple times.
     * @returns May be null. */
    findAnimation(animationName: string) {
        if (!animationName) throw new Error("animationName cannot be null.");
        let animations = this.animations;
        for (let i = 0, n = animations.length; i < n; i++) {
            let animation = animations[i];
            if (animation.name == animationName) return animation;
        }
        return null;
    }

    /** Finds an IK constraint by comparing each IK constraint's name. It is more efficient to cache the results of this method
     * than to call it multiple times.
     * @return May be null. */
    findIkConstraint(constraintName: string) {
        if (!constraintName) throw new Error("constraintName cannot be null.");
        let ikConstraints = this.ikConstraints;
        for (let i = 0, n = ikConstraints.length; i < n; i++) {
            let constraint = ikConstraints[i];
            if (constraint.name == constraintName) return constraint;
        }
        return null;
    }

    /** Finds a transform constraint by comparing each transform constraint's name. It is more efficient to cache the results of
     * this method than to call it multiple times.
     * @return May be null. */
    findTransformConstraint(constraintName: string) {
        if (!constraintName) throw new Error("constraintName cannot be null.");
        let transformConstraints = this.transformConstraints;
        for (let i = 0, n = transformConstraints.length; i < n; i++) {
            let constraint = transformConstraints[i];
            if (constraint.name == constraintName) return constraint;
        }
        return null;
    }

    /** Finds a path constraint by comparing each path constraint's name. It is more efficient to cache the results of this method
     * than to call it multiple times.
     * @return May be null. */
    findPathConstraint(constraintName: string) {
        if (!constraintName) throw new Error("constraintName cannot be null.");
        let pathConstraints = this.pathConstraints;
        for (let i = 0, n = pathConstraints.length; i < n; i++) {
            let constraint = pathConstraints[i];
            if (constraint.name == constraintName) return constraint;
        }
        return null;
    }

    findPathConstraintIndex(pathConstraintName: string) {
        if (pathConstraintName == null)
            throw new Error("pathConstraintName cannot be null.");
        let pathConstraints = this.pathConstraints;
        for (let i = 0, n = pathConstraints.length; i < n; i++)
            if (pathConstraints[i].name == pathConstraintName) return i;
        return -1;
    }
}
