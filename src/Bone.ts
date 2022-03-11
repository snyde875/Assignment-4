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
        // TO DO
    }
}