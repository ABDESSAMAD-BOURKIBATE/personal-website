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
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Abdessamad";
            $("#favicon").attr("href", "/assests/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";

        }
    });


// fetch projects start
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        })
}


function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .projects-grid");
    let projectsHTML = "";
    projects.forEach(project => {
        const tagsHTML = project.tags ? project.tags.map(tag => `<span>${tag}</span>`).join('') : '';
        const badge = project.badge || 'AI';

        projectsHTML += `
        <div class="project-card">
          <div class="project-image">
            <img draggable="false" src="${project.image}" alt="${project.name}" />
            <div class="project-overlay">
              <div class="project-links">
                <a href="${project.links.view}" class="project-link-btn" target="_blank" title="Live Demo">
                  <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="${project.links.code}" class="project-link-btn" target="_blank" title="Source Code">
                  <i class="fab fa-github"></i>
                </a>
              </div>
            </div>
            <div class="project-badge">${badge}</div>
          </div>
          <div class="project-info">
            <h3 class="project-title">${project.name}</h3>
            <p class="project-desc">${project.desc}</p>
            <div class="project-tags">${tagsHTML}</div>
            <div class="project-actions">
              <a href="${project.links.view}" class="project-btn primary" target="_blank">
                <i class="fas fa-eye"></i> Live Demo
              </a>
              <a href="${project.links.code}" class="project-btn secondary" target="_blank">
                <i class="fas fa-code"></i> Code
              </a>
            </div>
          </div>
        </div>`;
    });
    projectsContainer.innerHTML = projectsHTML;

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'bottom',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.project-card', { interval: 200 });
}

getProjects().then(data => {
    showProjects(data);
})
// fetch projects end

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
