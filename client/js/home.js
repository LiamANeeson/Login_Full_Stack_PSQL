const greeting = document.querySelector('.greeting');
const searchBar = document.querySelector('.searchBar');
const search_product_button = document.querySelector('.search_product_button');

window.onload = () => {
    if(!sessionStorage.name){
        location.href = '/login';
    } else{
        greeting.innerHTML = `hello ${sessionStorage.name}`;
    }
}

const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}

search_product_button.addEventListener('click', () => {
    alert('Hello');
})
