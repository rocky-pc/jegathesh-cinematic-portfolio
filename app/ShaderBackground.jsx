"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ShaderBackground() {
  const host = useRef(null);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer, frame, material, geometry;
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.Camera();
      geometry = new THREE.PlaneGeometry(2, 2);
      material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, resolution: { value: new THREE.Vector2() } },
        vertexShader: `void main(){ gl_Position = vec4(position, 1.0); }`,
        fragmentShader: `
          precision highp float;
          uniform vec2 resolution;
          uniform float time;
          void main(){
            vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x,resolution.y);
            float t = time * 0.045;
            float lines = 0.0;
            for(int i=0;i<5;i++){
              float fi=float(i);
              lines += 0.0018*(fi*fi+1.0)/abs(fract(t+fi*0.012)*5.0-length(uv)+mod(uv.x+uv.y,0.22));
            }
            float glow = smoothstep(0.0,0.8,lines);
            vec3 lime = vec3(0.72,0.95,0.20);
            vec3 deep = vec3(0.015,0.02,0.012);
            vec3 col = mix(deep, lime, clamp(glow*0.14,0.0,0.16));
            gl_FragColor = vec4(col, 1.0);
          }`
      });
      scene.add(new THREE.Mesh(geometry, material));
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      el.appendChild(renderer.domElement);
      const resize = () => {
        const w = el.clientWidth, h = el.clientHeight;
        renderer.setSize(w, h, false);
        material.uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
      };
      resize();
      window.addEventListener("resize", resize);
      const animate = () => {
        material.uniforms.time.value += 0.04;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        geometry.dispose(); material.dispose(); renderer.dispose();
        if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
      };
    } catch (error) {
      console.warn("Shader background unavailable; using CSS fallback.", error);
    }
  }, []);
  return <div ref={host} className="shader-bg" aria-hidden="true" />;
}
