import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入动画库
import gsap from 'gsap'
// 导入dat.gui
import * as dat from 'dat.gui'
import { color } from 'dat.gui'

// 目标：掌握轻量级图形界面

// 1、创建场景
const scene = new THREE.Scene()

// 2、创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 3、添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

// 修改物体的位置
cube.position.set(5, 0, 0) // 三维向量 x y z
cube.position.x = 3 // 通过render函数不断改变，就可以做动画了
// 缩放
// cube.scale.set(3, 2, 1);
// cube.scale.x = 5;
// 旋转
cube.rotation.set(Math.PI / 4, 0, 0, 'XZY') //各方向旋转的角度【2PI = 360度】（45度，0,0）  ，按照 X Z Y 的顺序旋转

// 将几何体添加到场景中
scene.add(cube)

// console.log(cube);
// const gui = new dat.GUI();
// gui
//   .add(cube.position, "x")
//   .min(0)
//   .max(5)
//   .step(0.01)
//   .name("移动x轴")
//   .onChange((value) => {
//     console.log("值被修改：", value);
//   })
//   .onFinishChange((value) => {
//     console.log("完全停下来:", value);
//   });
// //   修改物体的颜色
// const params = {
//   color: "#ffff00",
//   fn: () => {
//     //   让立方体运动起来
//     gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 });
//   },
// };
// gui.addColor(params, "color").onChange((value) => {
//   console.log("值被修改：", value);
//   cube.material.color.set(value);
// });
// // 设置选项框
// gui.add(cube, "visible").name("是否显示");

// var folder = gui.addFolder("设置立方体");
// folder.add(cube.material, "wireframe");
// // 设置按钮点击触发某个事件
// folder.add(params, "fn").name("立方体运动");

// 4、初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// console.log(renderer);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

// 使用渲染器，通过相机将场景渲染进来
renderer.render(scene, camera)

// 5、创建轨道控制器（参数：指定哪个相机，围绕哪个物体，360度视角擦看，通过渲染函数不断渲染，就能实现拖动效果）
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true

// 6、添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(10) // 长度为 5
scene.add(axesHelper)
// // 设置时钟
// const clock = new THREE.Clock();

// window.addEventListener("dblclick", () => {
//   const fullScreenElement = document.fullscreenElement;
//   if (!fullScreenElement) {
//     //   双击控制屏幕进入全屏，退出全屏
//     // 让画布对象全屏
//     renderer.domElement.requestFullscreen();
//   } else {
//     //   退出全屏，使用document对象
//     document.exitFullscreen();
//   }
//   //   console.log(fullScreenElement);
// });

// 不断渲染
function render() {
	controls.update()
	renderer.render(scene, camera)
	//   渲染下一帧的时候就会调用render函数
	requestAnimationFrame(render)
}

render()

// // 监听画面变化，更新渲染画面
// window.addEventListener("resize", () => {
//   //   console.log("画面变化了");
//   // 更新摄像头
//   camera.aspect = window.innerWidth / window.innerHeight;
//   //   更新摄像机的投影矩阵
//   camera.updateProjectionMatrix();

//   //   更新渲染器
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   //   设置渲染器的像素比
//   renderer.setPixelRatio(window.devicePixelRatio);
// });
