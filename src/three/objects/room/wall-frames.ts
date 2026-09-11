import {
  Group,
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
  SRGBColorSpace,
  LinearFilter,
  Uint16BufferAttribute,
} from "three";
import type { BufferAttribute, Material } from "three";
import { resources } from "../../../utils/resources";

// 138 triangles (414 indices) defining the authentic 3D frame from room.glb
// (removes the default placeholder mountain illustration and preserves the beveled chassis)
const FRAME_INDICES = new Uint16Array([
  232, 234, 245, 232, 245, 287, 194, 196, 237, 194, 237, 233, 195, 197, 239, 195, 239, 235, 184, 183, 212, 184, 212, 214, 182, 188, 222, 182, 222, 211, 188, 190, 226, 188, 226, 222, 191, 176, 200, 191, 200, 228, 198, 187, 220, 198, 220, 241, 177, 178, 204, 177, 204, 202, 180, 179, 205, 180, 205, 208, 179, 181, 209, 179, 209, 205, 185, 184, 214, 185, 214, 216, 186, 185, 216, 186, 216, 218, 189, 191, 228, 189, 228, 224, 181, 193, 231, 181, 231, 209, 192, 194, 233, 192, 233, 230, 197, 199, 242, 197, 242, 239, 196, 195, 235, 196, 235, 237, 178, 180, 208, 178, 208, 204, 187, 186, 218, 187, 218, 220, 190, 189, 224, 190, 224, 226, 281, 279, 323, 281, 323, 326, 201, 203, 272, 201, 272, 262, 234, 238, 247, 234, 247, 245, 240, 243, 270, 240, 270, 251, 207, 206, 274, 207, 274, 276, 236, 240, 251, 236, 251, 249, 238, 236, 249, 238, 249, 247, 206, 210, 278, 206, 278, 274, 215, 213, 253, 215, 253, 256, 203, 207, 276, 203, 276, 272, 217, 215, 256, 217, 256, 280, 213, 223, 257, 213, 257, 253, 221, 219, 282, 221, 282, 267, 219, 217, 280, 219, 280, 282, 223, 227, 259, 223, 259, 257, 227, 225, 283, 227, 283, 259, 225, 229, 264, 225, 264, 283, 229, 201, 262, 229, 262, 264, 210, 232, 287, 210, 287, 278, 243, 221, 267, 243, 267, 270, 303, 327, 308, 308, 305, 315, 315, 319, 317, 317, 321, 329, 329, 288, 290, 290, 292, 294, 294, 312, 310, 310, 325, 324, 324, 300, 297, 297, 301, 303, 303, 308, 315, 315, 317, 329, 329, 290, 294, 294, 310, 324, 324, 297, 303, 303, 315, 329, 329, 294, 324, 329, 324, 303, 258, 260, 304, 258, 304, 302, 260, 284, 328, 260, 328, 304, 284, 265, 309, 284, 309, 328, 265, 263, 307, 265, 307, 309, 277, 285, 330, 277, 330, 322, 268, 266, 311, 268, 311, 313, 286, 244, 289, 286, 289, 331, 261, 271, 316, 261, 316, 306, 244, 246, 291, 244, 291, 289, 250, 269, 314, 250, 314, 295, 275, 273, 318, 275, 318, 320, 248, 250, 295, 248, 295, 293, 246, 248, 293, 246, 293, 291, 273, 277, 322, 273, 322, 318, 255, 252, 296, 255, 296, 299, 271, 275, 320, 271, 320, 316, 279, 255, 299, 279, 299, 323, 254, 258, 302, 254, 302, 298, 266, 281, 326, 266, 326, 311
]);

let frameMeshRef: Mesh | null = null;
let originalIndex: BufferAttribute | null = null;
let originalMaterial: Material | Material[] | null = null;
let pictureContainer: Group | null = null;

export const wallFrames = {
  init: (frameMesh: Mesh) => {
    if (frameMeshRef) return;

    frameMeshRef = frameMesh;
    frameMesh.visible = true;

    // Keep exact original position so it aligns seamlessly with its baked shadow on the wall
    // (frameMesh.position remains [0, 0, -2.22869])

    // Match the exact light birch wood / warm beige color of the corkboard frame (#deccac)
    originalMaterial = frameMesh.material;
    const birchFrameMat = new MeshBasicMaterial({ color: 0xdeccac });
    frameMesh.material = birchFrameMat;

    // Filter mesh geometry to only render the frame chassis and canvas,
    // hiding the mountain and sun artwork
    if (!originalIndex && frameMesh.geometry.index) {
      originalIndex = frameMesh.geometry.index as BufferAttribute;
    }
    frameMesh.geometry.setIndex(new Uint16BufferAttribute(FRAME_INDICES, 1));

    // Build the certificate display assembly inside the frame's recessed canvas
    pictureContainer = new Group();
    // Canvas center in frame local coordinates: X = -2.650, Y = 3.2655, Z = -0.6607
    pictureContainer.position.set(-2.650, 3.2655, -0.6607);
    pictureContainer.rotation.y = Math.PI / 2;

    // 1. Backing mat board in dark espresso (#1a1613) to create contrast and depth
    const matBoardGeo = new PlaneGeometry(1.16, 1.00);
    const matBoardMat = new MeshBasicMaterial({ color: 0x1a1613 });
    const matBoardMesh = new Mesh(matBoardGeo, matBoardMat);
    matBoardMesh.position.z = 0.001;
    pictureContainer.add(matBoardMesh);

    // 2. Fine champagne gold inner trim accent (#dfa55c)
    const trimGeo = new PlaneGeometry(1.15, 0.79);
    const goldTrimMat = new MeshBasicMaterial({ color: 0xdfa55c });
    const trimMesh = new Mesh(trimGeo, goldTrimMat);
    trimMesh.position.z = 0.002;
    pictureContainer.add(trimMesh);

    // 3. Official Cisco Certification Texture
    const certTex = resources.items["cisco-cert"];
    if (certTex) {
      certTex.colorSpace = SRGBColorSpace;
      certTex.minFilter = LinearFilter;
      certTex.magFilter = LinearFilter;
      certTex.generateMipmaps = true;
    }
    const certGeo = new PlaneGeometry(1.13, 0.765); // Aspect ratio matching 1536x1040 diploma
    const certMat = new MeshBasicMaterial({ map: certTex });
    const certMesh = new Mesh(certGeo, certMat);
    certMesh.position.z = 0.004;
    pictureContainer.add(certMesh);

    // Attach directly to the frame mesh
    frameMesh.add(pictureContainer);
  },

  tick: () => {
    // Frame is mounted solidly on the wall aligning with its baked shadow.
  },

  destroy: () => {
    if (pictureContainer) {
      pictureContainer.removeFromParent();
      pictureContainer = null;
    }
    if (frameMeshRef) {
      if (originalIndex) {
        frameMeshRef.geometry.setIndex(originalIndex);
      }
      if (originalMaterial) {
        frameMeshRef.material = originalMaterial;
      }
      frameMeshRef = null;
    }
    originalIndex = null;
    originalMaterial = null;
  },
};
