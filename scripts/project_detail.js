

async function loadProjectDetails() {
    const projectDetailContainer = document.querySelectorAll('.project-detail');
    const projectDetailImg = document.querySelectorAll('.project-detail-img');
    const projectDetailTitle = document.querySelectorAll('.project-detail-title');
    const projectDetailDescription = document.querySelectorAll('.project-detail-description');

    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const project = db.getProjectByTitle(title);

    const categoryIcons = {
        mobil: '/images/icons/mobil.svg',
        masaüstü: '/images/icons/computer.svg',
        web: '/images/icons/web.svg',
    }


    if (project) {
        projectDetailImg[0].src = project.imageUrl;
        projectDetailTitle[0].textContent = project.title;
        projectDetailDescription[0].textContent = project.description;

        //** render footer */
        await fetch('/pages/project_footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('project-footer-placeholder').innerHTML = data;

                const footerImg = document.querySelector('.project-footer-img');
                const footerTitle = document.querySelector('.project-footer-title');
                const footerCategory = document.querySelector('.pf-category');


                if (footerImg) footerImg.src = project.imageUrl;
                if (footerTitle) footerTitle.textContent = project.title;

                const capitalize = (text) => {
                    return text.charAt(0).toUpperCase() + text.slice(1);
                }

                //** footer icon & category name */
                const categoryIcon = document.createElement('img');
                categoryIcon.classList.add('project-footer-item-logo');
                categoryIcon.src = categoryIcons[project.category];

                const pItem = document.createElement('p');
                pItem.innerText = capitalize(project.category);

                footerCategory.append(categoryIcon);
                footerCategory.appendChild(pItem);



            });

        //** set island mode to projects */
        setIslandMode('project');
        const islandProjectTitleText = document.getElementById('island-project-name');
        console.log(islandProjectTitleText);
        islandProjectTitleText.innerText = project.title;

        //** add listener to back button */
        const backButton = document.getElementById('island-project-back-btn');
        backButton.addEventListener('click', ()=>{
            window.location.href = '/pages/projects.html';
        });
    } else {
        projectDetailContainer[0].innerHTML = '<p>Proje bulunamadı.</p>';
    }
};

loadProjectDetails();
