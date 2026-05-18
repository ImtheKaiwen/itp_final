class Database {
    constructor() {
        this.projects = JSON.parse(localStorage.getItem('my_projects')) || [];
    }

    get Projects() {
        return this.projects;
    }

    getProjectByTitle(title){
        return this.projects.find(project => project.title === title);
    }
    
    addProject(project) {

        const index = this.projects.findIndex(p => p.title === project.title);
        if (index === -1) {
            this.projects.push(project);
        } else {
            this.projects[index] = project;
        }
        localStorage.setItem('my_projects', JSON.stringify(this.projects));
    }


    addProjects(projects) {
        //** ... seperator kullandık */
        this.projects.push(...projects);
        localStorage.setItem('my_projects', JSON.stringify(this.projects));
    }


}

var db = new Database();