let islandButtons;
let whitePill;
let currentPage = 'home';
let currentMode = 'idle';
let islandModes = {};
let island;

const pageViews = {
    home: '/pages/index.html',
    projects: '/pages/projects.html',
};

function showPage(pageName) {
    if (pageViews[pageName]) {
        window.location.href = pageViews[pageName];
    }
}

function setupIslandLogic() {
    islandButtons = document.querySelectorAll('.island-btn');
    whitePill = document.querySelector('.white-pill');

    if (!islandButtons.length || !whitePill) return;

    islandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pageName = button.dataset.page;
            showPage(pageName);
            setActiveIslandButton(button);
        });
    });

    getCurrentPage();
}

function setActiveIslandButton(activeButton) {
    islandButtons.forEach(button => button.style.color = 'white');
    activeButton.style.color = 'black';
    whitePill.style.transform = `translateX(${activeButton.offsetLeft}px)`;
    whitePill.style.opacity = '1';
}

function getCurrentPage() {
    const currentPath = window.location.pathname;
    islandButtons.forEach(button => {
        if (pageViews[button.dataset.page].includes(currentPath)) {
            setActiveIslandButton(button);
        }
    });
}

function createIsland() {
    fetch('/pages/island.html')
        .then(response => {
            // console.log(response);
            return response.text()
        })
        .then(data => {
            document.getElementById('island-placeholder').innerHTML = data;
            setupIslandLogic();
            initializeIslandModes();
            setIslandMode('idle');
        })
        .catch(error => console.error('Island yüklenirken hata:', error));
}


function initializeIslandModes(){
    islandModes = {
        idle: {element: document.querySelector('.idle'),
            radius: '50px',
        },
        contact: {element: document.querySelector('.contact'),
            radius: '40px',
        },
        project: {
            element: document.querySelector('.island-mode-project'),
            radius: '50px',
        }
    };

    const closeButton = document.querySelector('.close-btn');
    closeButton.addEventListener('click', () => { setIslandMode('idle'); });

    island = document.querySelector('.island');
}
function setIslandMode(mode) {
    currentMode = mode;

    for (const key in islandModes) {
        if (islandModes[key]) {
            islandModes[key].element.style.display = 'none';
        }
    }

    if (islandModes[mode]) {
        islandModes[mode].element.style.display = 'flex';
        island.style.borderRadius = islandModes[mode].radius;
    }
}

createIsland();