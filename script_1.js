document.addEventListener('DOMContentLoaded', (event) => {
    const slider = document.getElementById('difficulty-slider');
    const sliderValue = document.getElementById('slider-value');
    
    slider.addEventListener('input', () => {
        sliderValue.textContent = slider.value;
    });

    let set=document.getElementById('set');
    set.addEventListener('click',()=>{
        window.location.href='page_0.html';
        localStorage.setItem('difficulty', slider.value);
    })
});

