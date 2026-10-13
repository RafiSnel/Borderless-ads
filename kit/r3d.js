// r3d.js — real 3D moments (chrome, gloss, glass) for the motion reels. Opaque renders on the reel background; 2D draws on top.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
const W = 1080, H = 1920;
const canvas = document.createElement('canvas'); canvas.width = W; canvas.height = H;
const R = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
R.setPixelRatio(1); R.setSize(W, H, false); R.toneMapping = THREE.ACESFilmicToneMapping; R.toneMappingExposure = 1.0;
const S = new THREE.Scene(); S.background = new THREE.Color('#0b0a0a');
S.environment = new THREE.PMREMGenerator(R).fromScene(new RoomEnvironment(), 0.04).texture;
const cam = new THREE.PerspectiveCamera(32, W / H, 0.1, 100); cam.position.set(0, 0, 17);
const key = new THREE.DirectionalLight(0xffffff, 2.0); key.position.set(3, 5, 6); S.add(key);
const rim = new THREE.DirectionalLight('#ff6a3d', 1.4); rim.position.set(-6, -2, -4); S.add(rim);
const comp = new EffectComposer(R); comp.addPass(new RenderPass(S, cam));
const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.25, 0.5, 0.9); comp.addPass(bloom); comp.addPass(new OutputPass());
const chrome = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 1, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.03 });
// knot ribbon
class Knot extends THREE.Curve { getPoint(u, v = new THREE.Vector3()) { const t = u * Math.PI * 2; return v.set(Math.sin(t) + 2 * Math.sin(2 * t), Math.cos(t) - 2 * Math.cos(2 * t), -Math.sin(3 * t)).multiplyScalar(0.7); } }
const knot = new THREE.Mesh(new THREE.TubeGeometry(new Knot(), 500, 0.3, 64, true), chrome);
const stripeMat = new THREE.MeshPhysicalMaterial({ color: '#ff4a1c', emissive: '#ff4a1c', emissiveIntensity: 0.6, roughness: 0.2, clearcoat: 1 });
const stripe = new THREE.Mesh(new THREE.TubeGeometry(new Knot(), 500, 0.07, 16, true), stripeMat);
const knotG = new THREE.Group(); knotG.add(knot); knotG.add(stripe); S.add(knotG);
// glossy blob
const blobG = new THREE.IcosahedronGeometry(1, 48); const base = blobG.attributes.position.array.slice();
const blob = new THREE.Mesh(blobG, new THREE.MeshPhysicalMaterial({ color: '#ff4a1c', roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.04, sheen: 0.3 })); S.add(blob);
// coin: chrome rim + logo faces (UVs upright; turns only around the vertical axis)
const coin = new THREE.Group(); S.add(coin);
let faceF, faceB;
function buildCoin(img) {
  const tex = new THREE.Texture(img); tex.colorSpace = THREE.SRGBColorSpace; tex.needsUpdate = true;
  const texB = tex.clone(); texB.wrapS = THREE.RepeatWrapping; texB.repeat.x = -1; texB.offset.x = 1; texB.needsUpdate = true;
  const r = 1, d = 0.22;
  const rimM = new THREE.Mesh(new THREE.CylinderGeometry(r, r, d, 128, 1, true), new THREE.MeshPhysicalMaterial({ color: '#e3b871', metalness: 1, roughness: 0.18, clearcoat: 1 }));
  rimM.rotation.x = Math.PI / 2; coin.add(rimM);
  const lip = new THREE.Mesh(new THREE.TorusGeometry(r, 0.07, 24, 128), new THREE.MeshPhysicalMaterial({ color: '#f2cf86', metalness: 1, roughness: 0.12, clearcoat: 1 }));
  const lip2 = lip.clone(); lip.position.z = d / 2; lip2.position.z = -d / 2; coin.add(lip); coin.add(lip2);
  faceF = new THREE.Mesh(new THREE.CircleGeometry(r * 0.96, 96), new THREE.MeshPhysicalMaterial({ map: tex, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.05 })); faceF.position.z = d / 2 + 0.001; coin.add(faceF);
  faceB = new THREE.Mesh(new THREE.CircleGeometry(r * 0.96, 96), new THREE.MeshPhysicalMaterial({ map: texB, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.05 })); faceB.position.z = -d / 2 - 0.001; faceB.rotation.y = Math.PI; coin.add(faceB);
}
const img = new Image(); img.src = 'app/logo512.png';
img.onload = () => { buildCoin(img); window.__modres(); };
function only(o) { knotG.visible = o === 'knot'; blob.visible = o === 'blob'; coin.visible = o === 'coin'; }
window.R3 = {
  // knot ribbon; pose = {x, y, s, rx, ry, rz}
  knot(t, p = {}) { only('knot'); knotG.position.set(p.x ?? 0, p.y ?? 0, 0); knotG.scale.setScalar(p.s ?? 1); knotG.rotation.set(p.rx ?? 0, p.ry ?? 0, p.rz ?? 0); bloom.strength = p.bloom ?? 0.25; comp.render(); return canvas; },
  blob(t, p = {}) { only('blob'); const a = blobG.attributes.position, amp = p.amp ?? 0.14;
    for (let i = 0; i < a.count; i++) { const x = base[i * 3], y = base[i * 3 + 1], z = base[i * 3 + 2]; const n = 1 + amp * Math.sin(x * 2.6 + t * 2.2) * Math.sin(y * 2.4 + t * 1.7) * Math.sin(z * 2.8 + t * 1.3); a.setXYZ(i, x * n, y * n, z * n); }
    a.needsUpdate = true; blobG.computeVertexNormals(); blob.position.set(p.x ?? 0, p.y ?? 0, 0); blob.scale.setScalar(p.s ?? 1); blob.rotation.set(t * 0.3, t * 0.5, 0); bloom.strength = p.bloom ?? 0.15; comp.render(); return canvas; },
  // coin turning around its vertical axis only (ang radians); always upright
  coin(t, ang, p = {}) { only('coin'); coin.position.set(p.x ?? 0, p.y ?? 0, 0); coin.scale.setScalar(p.s ?? 1); coin.rotation.set(0, ang, 0); bloom.strength = p.bloom ?? 0.2; comp.render(); return canvas; },
};
