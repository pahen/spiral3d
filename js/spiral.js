(function () {
	
	var LENGTH = 800, RADIUS = 100, VELOCITY = 1;
	var camera, scene, renderer, timer, count = 0, deg = 0, spiralParticles = [], curveSpiralParticles = [];
	var random = Math.random, abs = Math.abs, sin = Math.sin, cos = Math.cos;
	var mouseX = 0, mouseY = 0, windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2;
	
	function init() {

		camera = new THREE.Camera(450, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.z = 1000;

	    scene = new THREE.Scene();
		
		for (var i = 0; i < LENGTH; i++) {
			
			var n = 20,
				frequency = 0.3,
				r = sin(frequency * (i % n) + 0) * 127 + 128,
				g = sin(frequency * (i % n) + 2) * 127 + 128,
				b = sin(frequency * (i % n) + 4) * 127 + 128,
				color = rgb2Hex(r, g, b); 
			
			var particle = spiralParticles[i] = new THREE.Particle(new THREE.ParticleCircleMaterial({
				color: color,
				opacity: 0.6
			}));
			particle.position.x = particle.position.y = 0;
			particle.position.z = -1800 + i * 5;
			particle.scale.x = particle.scale.y = 10;
			scene.addObject(particle);
			
			var curveParticle = curveSpiralParticles[i] = new THREE.Particle(new THREE.ParticleCircleMaterial({
				color: color,
				opacity: 0.8
			}));
			curveParticle.position.x = curveParticle.position.y = 0;
			curveParticle.position.z = -1800 + i * 16;
			curveParticle.scale.x = curveParticle.scale.y = 3;
			scene.addObject(curveParticle);
		}
		
	    renderer = new THREE.CanvasRenderer();
	    renderer.setSize(window.innerWidth, window.innerHeight);
	    document.body.appendChild(renderer.domElement);
	
		document.addEventListener('mousemove', function (event) {
			
			mouseX = event.clientX - windowHalfX;
			mouseY = event.clientY - windowHalfY;
			
		}, false);
		
		document.addEventListener('touchstart', function (event) {
			
			if (event.touches.length === 1) {
				event.preventDefault();
				mouseX = event.touches[0].pageX - windowHalfX;
				mouseY = event.touches[0].pageY - windowHalfY;
			}
			
		}, false);
		
		document.addEventListener('touchmove', function (event) {
			
			if (event.touches.length === 1) {
				event.preventDefault();
				mouseX = event.touches[0].pageX - windowHalfX;
				mouseY = event.touches[0].pageY - windowHalfY;
			}
			
		}, false);
		
		document.addEventListener('dblclick', function () {
			
			startStop();
			
		}, false);
	}
	
	function rgb2Hex(r, g, b) {
		
		return '0x' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
		
	}
	
	function byte2Hex(n) {
		
		var nybHexString = "0123456789ABCDEF";
		return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
		
	}
	
	function deg2Rad(deg) {
		
		return deg * (Math.PI / 180);
		
	}
	
	function startStop() {
		
		var player = document.getElementById('player');
		if (timer) {
			timer = clearInterval(timer);
			player.pause();
		} else {
			timer = setInterval(loop, 1000 / 60);
			player.play();
		}
		
	}
	
	function loop() {
		
		camera.position.x += (mouseX - camera.position.x) * 0.1;
		camera.position.y += (- mouseY - camera.position.y) * 0.1;
		
		for (var i = 0; i < spiralParticles.length; i++) {
			
			var particle = spiralParticles[i];
			var rad = deg2Rad(deg * VELOCITY);
			
			particle.position.x = sin(rad + (i * 0.3)) * RADIUS;
			particle.position.y = cos(rad + (i * 0.3)) * RADIUS;
			particle.scale.x = particle.scale.y = 1 + abs(12 * sin(rad));
			
			var curveParticle = curveSpiralParticles[i];
			curveParticle.position.x += cos(rad + (i * 0.2)) * 10;
			curveParticle.position.y += sin(rad + (i * 0.2)) * 10;
		}
		
		count += 1;
		deg = (count + 10) % 360;
		
	    renderer.render(scene, camera);
	
	}
	
	init();
	startStop();
	
})();