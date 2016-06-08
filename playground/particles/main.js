(function() {

    var container = document.getElementsByClassName('container')[0],
        particles = ['pinkstar.svg', 'purplestar.svg', 'yellowstar.svg', 'whitestar.svg'];

    document.body.addEventListener('click',function(evt) {
        starBurst(container, evt.clientX, evt.clientY, particles);
    });

    function starBurst(target, x, y, particles) {
        var burst = createBurst(x, y, particles);
        target.appendChild(burst);
        setTimeout(function() {
            target.removeChild(burst);
        }, 800);
    }

    function createBurst(x, y, particles) {
        var burst = document.createElement('div'),
            count = ~~(Math.random()*8)+4, particleImg;
        burst.classList.add('burst');
        burst.style.top = y+'px';
        burst.style.left = x+'px';
        for(var i = 0; i<count; i++) {
            particleImg = particles[ Math.floor(Math.random()*particles.length) ];
            burst.appendChild(createParticle(particleImg));
        }
        return burst;
    }

    function createParticle(particleImg) {
        var particle = document.createElement('object');
        particle.data = particleImg;
        particle.classList.add('particle');
        setTimeout(function() {
            var dx = Math.random()*400-200,
                dy = Math.random()*400-200,
                rotation = (Math.random()<0.5)? 180 : -180,
                size = Math.random()*0.4 + 0.1;
            particle.style.transform = 'rotate('+rotation+'deg) translate('+dx+'px, '+dy+'px) scale('+size+','+size+')';
            particle.style.opacity = 0;
        }, 50);
        return particle;
    }

})();