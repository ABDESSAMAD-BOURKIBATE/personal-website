$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    })
    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggle.classList.replace('fa-moon', 'fa-sun');
        }
    }

    // Theme Toggle Logic with Drag functionality
    let isDragging = false;
    let hasMoved = false;
    let startX, startY, initialLeft, initialTop;

    function handleStart(e) {
        hasMoved = false;
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        startX = clientX;
        startY = clientY;

        const rect = themeToggle.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        // Remove transition during drag to avoid lag
        themeToggle.style.transition = 'none';

        if (e.type === 'mousedown') {
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleEnd);
        } else {
            document.addEventListener('touchmove', handleMove);
            document.addEventListener('touchend', handleEnd);
        }
    }

    function handleMove(e) {
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        const dx = clientX - startX;
        const dy = clientY - startY;

        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            hasMoved = true;
            isDragging = true;
            themeToggle.style.cursor = 'grabbing';
            // Disable right positioning and set explicit left/top
            themeToggle.style.right = 'auto';
            themeToggle.style.left = `${initialLeft + dx}px`;
            themeToggle.style.top = `${initialTop + dy}px`;
        }
    }

    function handleEnd() {
        themeToggle.style.cursor = 'grab';
        themeToggle.style.transition = 'all 0.3s ease'; // Restore transition

        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);

        // Reset dragging flag after a short delay to allow click event to be blocked
        setTimeout(() => {
            isDragging = false;
        }, 100);
    }

    themeToggle.addEventListener('mousedown', handleStart);
    themeToggle.addEventListener('touchstart', handleStart);

    themeToggle.addEventListener('click', (e) => {
        if (hasMoved) {
            e.preventDefault();
            return;
        }

        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            themeToggle.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            themeToggle.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', '');
        }
    });

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Abdessamad Bourkibate";
            $("#favicon").attr("href", "assests/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";

        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Front End Developer", "Artificial Intelligence", "Cyber Security", "UI/UX Designer", "Problem Solver", "Tech Enthusiast", "Machine Learning", "Web Security Expert"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}
function fadeOut() {
    setInterval(loader, 500);
}
window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
// var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
//   (function(){
//   var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
//   s1.async=true;
//   s1.src='https://embed.tawk.to/62c99a01b0d10b6f3e7b8fde/1g7ho36lj';
//   s1.charset='UTF-8';
//   s1.setAttribute('crossorigin','*');
//   s0.parentNode.insertBefore(s1,s0);
//   })();
// End of Tawk.to Live Chat

async function fetchData(type = "skills") {
    let response;
    try {
        const cacheBuster = new Date().getTime();
        if (type === "skills") {
            response = await fetch(`skills.json?v=${cacheBuster}`);
        } else {
            response = await fetch(`./projects/projects.json?v=${cacheBuster}`);
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch data:", error);
        return [];
    }
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer) {
        console.error("Skills container not found!");
        return;
    }

    let skillHTML = "";
    if (skills.length === 0) {
        skillsContainer.innerHTML = "<p style='color: white; text-align: center; width: 100%;'>No skills found or error loading.</p>";
        return;
    }

    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src="${skill.icon}" alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

fetchData().then(data => {
    showSkills(data);
});



/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: false
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });



/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 300 });
srtop.reveal('.about .content .tag', { delay: 400 });
srtop.reveal('.about .content p', { delay: 300 });
srtop.reveal('.about .content .box-container', { delay: 300 });
srtop.reveal('.about .content .resumebtn', { delay: 300 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PUBLICATIONS */
srtop.reveal('.publications .pub-card', { interval: 300 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });
