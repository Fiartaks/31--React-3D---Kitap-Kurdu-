// src/components/Scene.jsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";

const Scene = () => {
  const mountRef = useRef(null);
  const mixerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock()); // Clock referansı

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      125,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 20;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(20, 80, 70).normalize();
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load(
      "/models/butterfly.glb",
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        // Modeli en sola taşımak için burada X koordinatını negatif bir değerle ayarlayın
        model.position.set(-5, -5, -5); //
        model.scale.set(5, 5, 5);
        model.rotation.x = Math.PI / 3;

        const mixer = new AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.play(); // Animasyonu başlat
          action.timeScale = 6; // Animasyon hızını artır
        });

        mixerRef.current = mixer;

        const animate = () => {
          requestAnimationFrame(animate);
          const delta = clockRef.current.getDelta(); // Delta zamanını elde et
          
          mixer.update(delta); // Animasyonu güncelle
          renderer.render(scene, camera); // Sahneyi renderla
        };

        animate();
      },
      undefined,
      (error) => {
        console.error("Bir hata oluştu:", error);
      }
    );

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div>
      <div ref={mountRef} style={{ width: '10%', height: '40px' }} />
    </div>
  );
};

export default Scene;
