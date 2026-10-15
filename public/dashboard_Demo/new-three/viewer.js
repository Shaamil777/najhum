import * as THREE from 'three';
import {createModel} from './models.js';
const mounted=new WeakMap();
function mount(host){
 if(mounted.has(host))return;
 const kind=host.dataset.kind,model=createModel(kind),scene=new THREE.Scene();scene.add(model.root);
 let renderer;try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});}catch(e){host.insertAdjacentHTML('beforeend','<p class="three-error">Enable WebGL 2 to display this 3D scene.</p>');mounted.set(host,true);return;}
 mounted.set(host,renderer);renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.setClearColor(0,0);renderer.domElement.setAttribute('aria-label',kind==='repharm'?'New Three.js greenhouse: six tunnels and three selectable zones':'New Three.js compound: eight villas, pool and three selectable fields');renderer.domElement.setAttribute('role','img');host.prepend(renderer.domElement);
 scene.add(new THREE.HemisphereLight('#ffffff','#a1b9a2',2.7));const sun=new THREE.DirectionalLight('#fff7df',3);sun.position.set(-12,25,18);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-24,right:24,top:24,bottom:-24});scene.add(sun);
 const camera=new THREE.PerspectiveCamera(37,1,.1,160),target=new THREE.Vector3(0,.4,0),ray=new THREE.Raycaster();let selected=-1,helper,last=performance.now(),down,autoRot=0;
 const resize=()=>{const r=host.getBoundingClientRect();renderer.setSize(Math.max(1,r.width),Math.max(1,r.height),false);camera.aspect=r.width/r.height;camera.fov=Math.min(65,37*Math.max(1,1.4/camera.aspect));camera.updateProjectionMatrix();};const ro=new ResizeObserver(resize);ro.observe(host);resize();
 host.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);host.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5||e.target.closest('button'))return;const r=host.getBoundingClientRect();ray.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);const hit=ray.intersectObjects(model.zones,true)[0];if(hit){let o=hit.object;while(o&&o.userData.zone===undefined)o=o.parent;if(o)host.parentElement.querySelectorAll('.zpill')[o.userData.zone]?.click();}});
 const moveLabel=(el,v)=>{if(!el||!v)return;const p=v.clone().project(camera);el.style.left=(p.x*.5+.5)*100+'%';el.style.top=(-p.y*.5+.5)*100+'%';el.style.marginTop=(kind==='rostamani'?(el.dataset.device==='main'?-34:el.dataset.zoneLabel?[-30,0,30][Array.from(host.querySelectorAll('[data-zone-label]')).indexOf(el)]:0):0)+'px';};
 renderer.setAnimationLoop(now=>{
  if(!host.isConnected){renderer.setAnimationLoop(null);ro.disconnect();renderer.dispose();model.root.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});return;}
  const dt=Math.min(.05,(now-last)/1000);last=now;autoRot+=dt*6;
  const d=host.dataset,view=d.view||'3d',zoom=Number(d.zoom)||1,pitch=Number(d.pitch)||0,yaw=Number(d.yaw)||0;
  const polar=THREE.MathUtils.degToRad(Math.max(.05,Math.min(88,pitch))),az=THREE.MathUtils.degToRad(yaw+autoRot+(kind==='rostamani'?-45:0));let distance=(kind==='repharm'?39:48)/zoom;
  if(view==='plan'){camera.position.set(0,distance,.001);camera.up.set(0,0,-1);}else{const a=view==='front'||view==='side'?Math.PI*.43:polar;camera.position.set(distance*Math.sin(a)*Math.sin(az),distance*Math.cos(a),distance*Math.sin(a)*Math.cos(az));camera.up.set(0,1,0);}camera.lookAt(target);camera.updateMatrixWorld();
  const index=Number(d.selected);if(index!==selected){selected=index;if(helper){scene.remove(helper);helper.geometry.dispose();helper.material.dispose();}if(model.zones[index]){helper=new THREE.BoxHelper(model.zones[index],'#059669');scene.add(helper);}}
  for(const w of model.water){w.visible=d.active==='true';const p=w.geometry.attributes.position;for(let i=0;i<p.count;i++)p.setY(i,p.getY(i)-dt*.5<.35?1.4:p.getY(i)-dt*.5);p.needsUpdate=true;}
  renderer.render(scene,camera);host.dataset.engine='three-r180';renderer.domElement.dataset.camera=camera.position.toArray().map(x=>x.toFixed(2)).join(',');renderer.domElement.dataset.triangles=renderer.info.render.triangles;
  host.querySelectorAll('[data-zone-label]').forEach((el,i)=>moveLabel(el,model.labels[i]));moveLabel(host.querySelector('[data-device="main"]'),model.main);moveLabel(host.querySelector('[data-device="probe"]'),model.probe);
 });
}
function scan(){document.querySelectorAll('.new-three-scene').forEach(mount);}new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});scan();
