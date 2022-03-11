import * as THREE from "three";
import { Pose } from "./Pose";

export class Bone
{
    public name: string;
    public direction: THREE.Vector3;
    public length: number;
    public dofs: boolean[];
    public children: Bone[];

    public boneToRotationSpace: THREE.Matrix4;
    public rotationToBoneSpace: THREE.Matrix4;

    public transform: THREE.Group;

    constructor()
    {
        this.name = '';
        this.direction = new THREE.Vector3();
        this.length = 0;
        this.dofs = [false, false, false];
        this.children = [];

        this.boneToRotationSpace = new THREE.Matrix4();
        this.rotationToBoneSpace = new THREE.Matrix4();

        this.transform = new THREE.Group();    
    }

    createHierarchy(parentTransform: THREE.Object3D): void
    {
        this.resetTransform();
        parentTransform.add(this.transform);

        this.children.forEach((child: Bone) => {
            child.createHierarchy(this.transform);
        });
    }

    resetTransform(): void
    {
        this.transform.position.copy(this.direction);
        this.transform.position.multiplyScalar(this.length);
        this.transform.rotation.set(0, 0, 0);
    }

    update(pose: Pose): void
    {
        /** TO DO: You will need to define a current transformation matrix for this bone
         * that will apply the joint rotation for this bone in the correct coordinate space.
         * rotation of the bone due to the current pose.
         * 
         * Think of the vertices that make up the geometry of each bone as being defined in
         * "bone space", where the joint that the bone rotates around is located at the origin
         * and the bone extends in the direction and length specified by the skeleton. 
         * 
         * To determine which matrices need to be composed to create the current transformation 
         * matrix and the order to multiply them together, think about what needs to happen to
         * each vertex of a cylinder defined in "bone space" in order to get the vertex to the 
         * correct position in 3D space.
         * 
         * First, the vertex must be transformed into the bone's "rotation axis space" because 
         * the rotation axes are not guaranteed to line up perfectly with the bone's X,Y,Z axes.  
         * The bone's rotation axes are a property of the skeleton -- they are set for each skeleton
         * and do not change for each pose.  You can access matrices that transform from "bone space"
         * to "rotation axis space" as member variables.
         * 
         * Second, now that the vertices are in the bone's "rotation axis space", the rotation from 
         * the character's current pose can be applied.  The current pose can be accessed using
         * the pose.getJointRotation() method.
         * 
         * Third, with the rotations applied relative to the appropriate rotation axes, the vertices
         * must now be transformed back into regular "bone space".  At this point, the bone should
         * be properly rotated based upon the current pose, but the vertices are still defined in 
         * "bone space" so they are close to the origin.
         * 
         * Finally, you will need to call the update() method for each of the bone's children to
         * propagate through the entire skeleton.
         */
    }
}