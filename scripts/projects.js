const projectItems = document.querySelectorAll('.project-item');
const filterButtons = document.querySelectorAll('.filter-item');

function filterProjects(filter) {

    projectItems.forEach(project => {

        const category = project.dataset.category;

        if (filter === 'all' || category === filter) {

            project.classList.remove('pitem-hide');
            project.classList.add('pitem-show');

        } else {

            project.classList.remove('pitem-show');
            project.classList.add('pitem-hide');

        }

    });

}

function setActiveFilterButton(activeButton) {

    filterButtons.forEach(button => {

        //! çakışma var sanırım
        //TODO review & fix classes
        button.classList.remove('filter-btn-active');
        button.classList.add('filter-btn');
    });

    activeButton.classList.add('filter-btn-active');
}

function initializeFilterButtons() {

    filterButtons.forEach(button => {

        button.addEventListener('click', () => {

            const filter = button.dataset.filter;

            filterProjects(filter);

            setActiveFilterButton(button);

        });

    });

    filterProjects('all');

    setActiveFilterButton(filterButtons[0]);

}

function setProjects(){
    projectItems.forEach(item => {
        const project = {
            title: item.querySelector('.project-title').textContent.trim(),
            description: item.querySelector('.project-description').textContent.trim(),
            category: item.dataset.category,
            imageUrl: item.querySelector('.project-item-img').src
        };
        console.log(project); //? check for data
        db.addProject(project);
    });
}


function handleProjectClick(){
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectTitle = item.querySelector('.project-title').textContent.trim();
            console.log(`Project clicked: ${projectTitle}`); //? check for click event
            window.location.href = `/pages/project_detail.html?title=${(projectTitle)}`;
        });
    });
}

initializeFilterButtons();
setProjects();
handleProjectClick();