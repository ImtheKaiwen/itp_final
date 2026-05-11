const islandButtons = document.querySelectorAll('.island-btn');
const whitePill = document.querySelector('.white-pill');

const views = {
    idle : document.querySelector('.idle'),
}

let activeIslandButton;


handleIslandButtons();

function handleIslandButtons(){

    const movePill = ()=> {
        const transformSize = activeIslandButton.offsetLeft;
        whitePill.style.transform = `translateX(${transformSize}px)`;
    }
    const deactiveOthers = ()=> {
        islandButtons.forEach(button => {
            if (button !== activeIslandButton) button.style.color = 'white';
        });
    }
    const setActive = (button)=> {
        activeIslandButton = button;
        button.style.color = 'black';
        movePill();
        deactiveOthers();
    }
    const setListeners = ()=>{
        islandButtons.forEach(button => {
            button.addEventListener('click', ()=> {
                setActive(button);
            });
        });
    }

    setListeners();
    setActive(islandButtons[0]);
}
