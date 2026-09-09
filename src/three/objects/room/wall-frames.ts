import {
  Group,
  Mesh,
  BoxGeometry,
  PlaneGeometry,
  MeshBasicMaterial,
  SRGBColorSpace,
  LinearFilter,
} from "three";
import { resources } from "../../../utils/resources";

let wallFramesGroup: Group | null = null;

export const wallFrames = {
  init: (frameMesh: Mesh) => {
    if (wallFramesGroup) return;

    // Hide the original generic mountain illustration frame
    frameMesh.visible = false;

    wallFramesGroup = new Group();

    // Textures
    const photoTex = resources.items["personal-photo"];
    if (photoTex) {
      photoTex.colorSpace = SRGBColorSpace;
      photoTex.minFilter = LinearFilter;
      photoTex.magFilter = LinearFilter;
      photoTex.generateMipmaps = true;
    }

    const certTex = resources.items["cisco-cert"];
    if (certTex) {
      certTex.colorSpace = SRGBColorSpace;
      certTex.minFilter = LinearFilter;
      certTex.magFilter = LinearFilter;
      certTex.generateMipmaps = true;
    }

    // Materials
    const photoFrameMat = new MeshBasicMaterial({ color: 0x221d18 }); // Warm obsidian chassis
    const photoMat = new MeshBasicMaterial({ map: photoTex });

    const certFrameMat = new MeshBasicMaterial({ color: 0x2a241d }); // Warm bronze chassis
    const certBorderMat = new MeshBasicMaterial({ color: 0xdfa55c }); // Gold inner bezel
    const certMat = new MeshBasicMaterial({ map: certTex });

    // ----------------------------------------------------
    // FRAME 1: LIONEL AGUIRRE PERSONAL PHOTO (PORTRAIT)
    // ----------------------------------------------------
    const photoGroup = new Group();
    // Centered around original frame's Z location, slightly to the left
    photoGroup.position.set(-2.61, 3.265, -0.78);
    photoGroup.rotation.y = Math.PI / 2;

    // Outer Bezel / Chassis
    const photoBackGeo = new BoxGeometry(0.86, 1.10, 0.05);
    const photoBackMesh = new Mesh(photoBackGeo, photoFrameMat);
    photoGroup.add(photoBackMesh);

    // Inner Photo Surface
    const photoGeo = new PlaneGeometry(0.78, 1.02);
    const photoMesh = new Mesh(photoGeo, photoMat);
    photoMesh.position.z = 0.026; // Sits right on the front face of the chassis
    photoGroup.add(photoMesh);

    wallFramesGroup.add(photoGroup);

    // ----------------------------------------------------
    // FRAME 2: CISCO CYBERSECURITY CERTIFICATE (LANDSCAPE)
    // ----------------------------------------------------
    const certGroup = new Group();
    // Placed to the right on the wall, between the photo and blackboard
    certGroup.position.set(-2.61, 3.265, +0.32);
    certGroup.rotation.y = Math.PI / 2;

    // Outer Bezel / Chassis
    const certBackGeo = new BoxGeometry(1.18, 0.84, 0.05);
    const certBackMesh = new Mesh(certBackGeo, certFrameMat);
    certGroup.add(certBackMesh);

    // Gold Bezel Trim
    const certTrimGeo = new BoxGeometry(1.12, 0.78, 0.052);
    const certTrimMesh = new Mesh(certTrimGeo, certBorderMat);
    certGroup.add(certTrimMesh);

    // Inner Certificate Surface
    const certGeo = new PlaneGeometry(1.06, 0.72);
    const certMesh = new Mesh(certGeo, certMat);
    certMesh.position.z = 0.027; // Sits right on the front face of the gold trim
    certGroup.add(certMesh);

    wallFramesGroup.add(certGroup);

    // Add to the frameMesh object so coordinates inherit the scene transformations
    frameMesh.add(wallFramesGroup);
    // Keep frameMesh itself in the scene hierarchy so its children render
    // but its own geometry won't render because onBeforeRender can make it invisible,
    // or better: add wallFramesGroup to frameMesh.parent!
    if (frameMesh.parent) {
      // Offset by frameMesh.position
      wallFramesGroup.position.copy(frameMesh.position);
      wallFramesGroup.rotation.copy(frameMesh.rotation);
      wallFramesGroup.scale.copy(frameMesh.scale);
      frameMesh.parent.add(wallFramesGroup);
    } else {
      frameMesh.add(wallFramesGroup);
    }
  },

  destroy: () => {
    if (wallFramesGroup) {
      wallFramesGroup.removeFromParent();
      wallFramesGroup = null;
    }
  },
};
