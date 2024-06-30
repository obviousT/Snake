//page_0
document.addEventListener('DOMContentLoaded', (event) => {
    let click=new Audio('click.mp3');
    let start = document.getElementById('start');
    start.addEventListener('click', () => {
        window.location.href = 'index.html';
        click.play();
    });

    let difficluty=document.getElementById('difficulty');
    difficluty.addEventListener('click', () => {
        window.location.href = 'page_1.html';
       click.play();
    });

    let info=document.getElementById('info');
    info.addEventListener('click',()=>{
        window.location.href='page_2.html';
        click.play();
    })
});