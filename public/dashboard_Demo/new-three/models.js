import {THREE,box,cylinder,sphere,tube,plant,tree,waterParticles} from './shared.js';
// Independently authored procedural meshes. No original CSS geometry or restricted support scripts.
export function createModel(kind){
 const root=new THREE.Group(),zones=[],labels=[],water=[];let main,probe;
 const zone=i=>{const g=new THREE.Group();g.userData.zone=i;root.add(g);zones.push(g);return g;};
 if(kind==='repharm'){
  box(root,27,.25,17,0,-.15,0,'#d8e1d4');box(root,24,.12,12,0,0,0,'#b6c4b2');
  for(let i=0;i<3;i++){
   const g=zone(i);box(g,7.8,.08,11.8,(i-1)*8,.12,0,i===0?'#d6c9ad':i===1?'#a4c3a3':'#b4c99e');labels.push(new THREE.Vector3((i-1)*8,3.8,5.2));
   for(let b=0;b<2;b++){
    const x=-10+i*8+b*4;
    for(let k=0;k<2;k++){
     box(g,1.15,.28,10.7,x+(k? .9:-.9),.27,0,i===0?'#c3b595':'#605c40');
     if(i>0)for(let p=0;p<12;p++)plant(g,x+(k?.9:-.9),-4.9+p*.87,.44,false).position.y=.4;
     tube(g,[[x+(k?.9:-.9),.45,-5.4],[x+(k?.9:-.9),.45,5.8]],.025,i===1?'#39acc0':'#598078');
    }
    for(let z=-5.8;z<=5.8;z+=2.3){const points=[];for(let j=0;j<=16;j++){const t=j/16*Math.PI;points.push([x+1.93*Math.cos(t),1.5+1.7*Math.sin(t),z]);}tube(root,points,.035,'#78988b');for(const dx of [-1.93,1.93])cylinder(root,.035,.035,1.5,x+dx,.75,z,'#78988b',6);}
    const roof=new THREE.Mesh(new THREE.CylinderGeometry(1.94,1.94,11.6,24,1,true,0,Math.PI),new THREE.MeshPhysicalMaterial({color:'#c0e6dd',transparent:true,opacity:.13,roughness:.23,side:THREE.DoubleSide,depthWrite:false}));roof.rotation.z=Math.PI/2;roof.rotation.x=Math.PI/2;roof.position.set(x,1.5,0);root.add(roof);
   }
  }
  tube(root,[[-13,.35,6.7],[10,.35,6.7]],.10,'#55999a');for(let i=0;i<3;i++)tube(root,[[(i-1)*8,.35,6.7],[(i-1)*8,.35,0]],.075,i===1?'#28b4cb':'#6b9182');
  cylinder(root,.55,.55,1.5,-13,.75,5.5,'#8baea2');box(root,.5,.4,.45,-13,1.6,5.5,'#357f83');main=new THREE.Vector3(-13,2,5.5);probe=new THREE.Vector3(11.5,1,6.6);cylinder(root,.04,.04,1.2,11.5,.6,6.6,'#b98c46',6);
  water.push(waterParticles(root,Array.from({length:72},(_,i)=>[-3.1+(i%4)*1.9,.55+(i%9)*.12,-4.8+Math.floor(i/4)*.55])));
 }else{
  box(root,33,.3,20,0,-.2,0,'#d7dcd5');box(root,31,.1,6.7,0,.02,0,'#e6e3d8');
  for(let row=0;row<2;row++)for(let i=0;i<4;i++){
   const x=-10.5+i*7,z=row?6.5:-6.5;
   box(root,6.1,1.6,4.8,x,.8,z,'#e4ddcb');box(root,6.35,.18,5.05,x,1.68,z,'#faf7ef');
   for(let w=0;w<4;w++)box(root,.85,.9,.04,x-2+w*1.3,1,z+(row?-2.42:2.42),'#718c96');
   box(root,.55,.65,.65,x+2.2,2.04,z-1.4,'#c0c8c5');
  }
  const strips=[{x:-2.5,z:-2.5,w:17,d:.9},{x:-2.5,z:0,w:17,d:3.3},{x:-2.5,z:2.5,w:17,d:.9}];
  strips.forEach((s,i)=>{const g=zone(i);box(g,s.w,.12,s.d,s.x,.16,s.z,i===1?'#8bb96c':'#b2aa7d');labels.push(new THREE.Vector3(-8+i*6,i===1?1:2.2,s.z));if(i!==1)for(let t=0;t<9;t++)tree(g,-10+t*1.85,s.z,.52);else for(let j=0;j<18;j++){const x=-10+(j%9)*1.85,z=j<9?-1:1;cylinder(g,.045,.06,.16,x,.3,z,'#477d68',8);}});
  box(root,8.5,.12,4.7,10.5,.1,0,'#c9bda1');box(root,7.6,.12,3.5,10.5,.19,0,'#75c3ce',{transparent:true,opacity:.85});
  for(const x of [6.7,14.5])for(const z of [-2.5,2.5])tree(root,x,z,.7);
  tube(root,[[-15,.3,0],[-12,.3,0],[-12,.3,-2.5],[-12,.3,2.5]],.08,'#5297a0');for(const z of [-2.5,0,2.5])tube(root,[[-12,.3,z],[6,.3,z]],.06,'#5297a0');main=new THREE.Vector3(-13,1,0);box(root,.5,.55,.45,-13,.48,0,'#57888d');
  water.push(waterParticles(root,Array.from({length:100},(_,i)=>[-10+(i%18)*.9,.4+(i%7)*.17,Math.sin(i*2.4)*1.4])));
 }
 return {root,zones,labels,main,probe,water};
}
