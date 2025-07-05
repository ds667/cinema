<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Story of a Seed</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            font-family: 'Arial', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
        }
        
        #storyCanvas {
            border: 3px solid #4a90e2;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            background: #87ceeb;
        }
        
        .story-title {
            color: #fff;
            font-size: 2.5em;
            margin-bottom: 20px;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .story-text {
            color: #fff;
            font-size: 1.2em;
            margin-top: 20px;
            text-align: center;
            max-width: 600px;
            line-height: 1.6;
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
        
        .controls {
            margin-top: 15px;
        }
        
        button {
            background: linear-gradient(45deg, #4a90e2, #357abd);
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 1em;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
    </style>
</head>
<body>
    <h1 class="story-title">The Story of a Seed</h1>
    <canvas id="storyCanvas" width="800" height="600"></canvas>
    <div class="story-text" id="storyText">
        Once upon a time, in a quiet meadow, a tiny seed lay dormant in the earth...
    </div>
    <div class="controls">
        <button onclick="restartStory()">Restart Story</button>
    </div>

    <script>
        const canvas = document.getElementById('storyCanvas');
        const ctx = canvas.getContext('2d');
        const storyText = document.getElementById('storyText');
        
        let currentPhase = 0;
        let animationTime = 0;
        let isAnimating = true;
        
        const storyPhases = [
            { duration: 3000, text: "Once upon a time, in a quiet meadow, a tiny seed lay dormant in the earth..." },
            { duration: 4000, text: "Spring arrived with gentle rains, awakening the seed from its long slumber..." },
            { duration: 4000, text: "The seed began to sprout, pushing through the soil toward the warm sunlight..." },
            { duration: 5000, text: "Through summer's heat, the sapling grew tall and strong, reaching for the sky..." },
            { duration: 4000, text: "Autumn painted the leaves in brilliant colors of gold and crimson..." },
            { duration: 4000, text: "Winter brought snow and rest, as the tree stood resilient against the cold..." },
            { duration: 3000, text: "And so the cycle continued, as the mighty tree stood as a testament to growth and perseverance." }
        ];
        
        let seedY = 0;
        let sproutHeight = 0;
        let treeHeight = 0;
        let leafCount = 0;
        let seasonalColor = { r: 34, g: 139, b: 34 };
        let snowflakes = [];
        let raindrops = [];
        let birds = [];
        let clouds = [];
        
        function initParticles() {
            snowflakes = [];
            raindrops = [];
            birds = [];
            clouds = [];
            
            for (let i = 0; i < 50; i++) {
                snowflakes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speed: Math.random() * 2 + 1
                });
            }
            
            for (let i = 0; i < 100; i++) {
                raindrops.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    speed: Math.random() * 8 + 5,
                    length: Math.random() * 20 + 10
                });
            }
            
            for (let i = 0; i < 3; i++) {
                birds.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * 200 + 100,
                    speed: Math.random() * 2 + 1,
                    wingPhase: Math.random() * Math.PI * 2
                });
            }
            
            for (let i = 0; i < 5; i++) {
                clouds.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * 150 + 50,
                    size: Math.random() * 80 + 40,
                    speed: Math.random() * 0.5 + 0.2
                });
            }
        }
        
        function drawSky(phase) {
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            
            switch(phase) {
                case 0: 
                    gradient.addColorStop(0, '#1a1a2e');
                    gradient.addColorStop(1, '#16213e');
                    break;
                case 1:
                    gradient.addColorStop(0, '#87ceeb');
                    gradient.addColorStop(1, '#e0f6ff');
                    break;
                case 2:
                    gradient.addColorStop(0, '#87ceeb');
                    gradient.addColorStop(1, '#e0f6ff');
                    break;
                case 3: 
                    gradient.addColorStop(0, '#4a90e2');
                    gradient.addColorStop(1, '#87ceeb');
                    break;
                case 4:
                    gradient.addColorStop(0, '#ff8c69');
                    gradient.addColorStop(1, '#ffd700');
                    break;
                case 5: 
                    gradient.addColorStop(0, '#708090');
                    gradient.addColorStop(1, '#d3d3d3');
                    break;
                case 6:
                    gradient.addColorStop(0, '#87ceeb');
                    gradient.addColorStop(1, '#98fb98');
                    break;
            }
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        function drawGround() {
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
            
            ctx.fillStyle = '#228b22';
            ctx.fillRect(0, canvas.height - 120, canvas.width, 20);
        }
        
        function drawSeed(progress) {
            const seedX = canvas.width / 2;
            const seedY = canvas.height - 80;
            
            ctx.fillStyle = '#8b4513';
            ctx.beginPath();
            ctx.ellipse(seedX, seedY, 8, 6, 0, 0, Math.PI * 2);
            ctx.fill();
            
            if (progress > 0.3) {
                ctx.shadowColor = '#90EE90';
                ctx.shadowBlur = 15;
                ctx.fillStyle = '#90EE90';
                ctx.beginPath();
                ctx.ellipse(seedX, seedY, 6, 4, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
        
        function drawSprout(progress) {
            const sproutX = canvas.width / 2;
            const maxHeight = 60;
            const currentHeight = Math.min(progress * maxHeight, maxHeight);
            
            ctx.strokeStyle = '#228b22';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(sproutX, canvas.height - 80);
            ctx.lineTo(sproutX, canvas.height - 80 - currentHeight);
            ctx.stroke();
            
          
            if (progress > 0.5) {
                ctx.fillStyle = '#32cd32';
                ctx.beginPath();
                ctx.ellipse(sproutX - 15, canvas.height - 80 - currentHeight + 20, 12, 8, -Math.PI/4, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.beginPath();
                ctx.ellipse(sproutX + 15, canvas.height - 80 - currentHeight + 15, 12, 8, Math.PI/4, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function drawTree(progress, season) {
            const treeX = canvas.width / 2;
            const treeBase = canvas.height - 100;
            const maxHeight = 200;
            const currentHeight = Math.min(progress * maxHeight, maxHeight);
            
            
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(treeX - 15, treeBase - currentHeight, 30, currentHeight);
            
          
            if (progress > 0.3) {
                ctx.strokeStyle = '#8b4513';
                ctx.lineWidth = 8;
                
               
                ctx.beginPath();
                ctx.moveTo(treeX, treeBase - currentHeight * 0.7);
                ctx.lineTo(treeX - 40, treeBase - currentHeight * 0.9);
                ctx.moveTo(treeX, treeBase - currentHeight * 0.7);
                ctx.lineTo(treeX + 40, treeBase - currentHeight * 0.9);
                ctx.stroke();
                
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.moveTo(treeX, treeBase - currentHeight * 0.5);
                ctx.lineTo(treeX - 30, treeBase - currentHeight * 0.7);
                ctx.moveTo(treeX, treeBase - currentHeight * 0.5);
                ctx.lineTo(treeX + 30, treeBase - currentHeight * 0.7);
                ctx.stroke();
            }
            
          
            if (progress > 0.5) {
                let leafColor;
                switch(season) {
                    case 3: 
                        leafColor = '#228b22';
                        break;
                    case 4: 
                        leafColor = '#ff8c00';
                        break;
                    case 5:
                        return;
                    default:
                        leafColor = '#32cd32';
                }
                
                ctx.fillStyle = leafColor;
                
                ctx.beginPath();
                ctx.arc(treeX, treeBase - currentHeight * 0.9, 60, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.beginPath();
                ctx.arc(treeX - 35, treeBase - currentHeight * 0.75, 45, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.beginPath();
                ctx.arc(treeX + 35, treeBase - currentHeight * 0.75, 45, 0, Math.PI * 2);
                ctx.fill();
                
                if (season === 4) {
                    for (let i = 0; i < 10; i++) {
                        const leafX = treeX + (Math.sin(animationTime * 0.01 + i) * 100);
                        const leafY = treeBase - currentHeight * 0.6 + (Math.sin(animationTime * 0.005 + i) * 30) + i * 5;
                        
                        ctx.fillStyle = i % 2 === 0 ? '#ff8c00' : '#dc143c';
                        ctx.beginPath();
                        ctx.ellipse(leafX, leafY, 6, 4, Math.sin(animationTime * 0.01 + i), 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
        }
        
        function drawRain() {
            ctx.strokeStyle = '#4169e1';
            ctx.lineWidth = 2;
            
            raindrops.forEach(drop => {
                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x - 3, drop.y + drop.length);
                ctx.stroke();
                
                drop.y += drop.speed;
                if (drop.y > canvas.height) {
                    drop.y = -drop.length;
                    drop.x = Math.random() * canvas.width;
                }
            });
        }
        
        function drawSnow() {
            ctx.fillStyle = '#ffffff';
            
            snowflakes.forEach(flake => {
                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
                ctx.fill();
                
                flake.y += flake.speed;
                flake.x += Math.sin(animationTime * 0.001 + flake.y * 0.01) * 0.5;
                
                if (flake.y > canvas.height) {
                    flake.y = -10;
                    flake.x = Math.random() * canvas.width;
                }
            });
        }
        
        function drawBirds() {
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 2;
            
            birds.forEach(bird => {
                const wingOffset = Math.sin(animationTime * 0.02 + bird.wingPhase) * 10;
                
                ctx.beginPath();
                ctx.moveTo(bird.x - 5, bird.y);
                ctx.lineTo(bird.x + 5, bird.y);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(bird.x, bird.y);
                ctx.lineTo(bird.x - 8, bird.y - wingOffset);
                ctx.moveTo(bird.x, bird.y);
                ctx.lineTo(bird.x + 8, bird.y - wingOffset);
                ctx.stroke();
                
                bird.x += bird.speed;
                if (bird.x > canvas.width + 20) {
                    bird.x = -20;
                    bird.y = Math.random() * 200 + 100;
                }
            });
        }
        
        function drawClouds() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            
            clouds.forEach(cloud => {
                ctx.beginPath();
                ctx.arc(cloud.x, cloud.y, cloud.size * 0.6, 0, Math.PI * 2);
                ctx.arc(cloud.x + cloud.size * 0.4, cloud.y, cloud.size * 0.8, 0, Math.PI * 2);
                ctx.arc(cloud.x - cloud.size * 0.4, cloud.y, cloud.size * 0.7, 0, Math.PI * 2);
                ctx.fill();
                
                cloud.x += cloud.speed;
                if (cloud.x > canvas.width + cloud.size) {
                    cloud.x = -cloud.size;
                }
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            let totalTime = 0;
            let phaseProgress = 0;
            
            for (let i = 0; i <= currentPhase; i++) {
                if (i < currentPhase) {
                    totalTime += storyPhases[i].duration;
                } else {
                    const elapsed = animationTime - totalTime;
                    phaseProgress = Math.min(elapsed / storyPhases[i].duration, 1);
                    break;
                }
            }
            
           
            drawSky(currentPhase);
            drawClouds();
            drawGround();
            
            switch(currentPhase) {
                case 0: 
                    drawSeed(phaseProgress);
                    break;
                case 1: 
                    drawSeed(phaseProgress);
                    drawRain();
                    break;
                case 2: 
                    drawSprout(phaseProgress);
                    break;
                case 3: 
                    drawTree(phaseProgress, 3);
                    drawBirds();
                    break;
                case 4: 
                    drawTree(1, 4);
                    break;
                case 5:
                    drawTree(1, 5);
                    drawSnow();
                    break;
                case 6: 
                    drawTree(1, 6);
                    drawBirds();
                    break;
            }
            
            // Update animation time and phase
            animationTime += 16; // ~60fps
            
            if (phaseProgress >= 1 && currentPhase < storyPhases.length - 1) {
                currentPhase++;
                storyText.textContent = storyPhases[currentPhase].text;
            }
            
            if (isAnimating) {
                requestAnimationFrame(animate);
            }
        }
        
        function restartStory() {
            currentPhase = 0;
            animationTime = 0;
            isAnimating = true;
            storyText.textContent = storyPhases[0].text;
            initParticles();
            animate();
        }
        
        
        initParticles();
        animate();
    </script>
</body>
</html>
