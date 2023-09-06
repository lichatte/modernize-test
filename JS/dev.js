let imagesLoading = false;

function setStickyListener() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', (e) => {
        if (window.scrollY > 90) {
           header.classList.add('header--sticky');
        } else {
            header.classList.remove('header--sticky');
        }
    });
}

function onLogoClick() {
    const logo = document.querySelector('#logo');
    logo.addEventListener('click', () => {
        console.log('Logo clicked')
        document.location.href = 'https://modernze.com'
    });
}

function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeColor() {
    const button = document.getElementById('colorChangeButton');
    button.addEventListener('click', (e) => {
        console.log('Color Change Button Clicked')
        e.target.parentElement.style.backgroundColor = getRandomHexColor();
    });
}

function loadImageList() {
    const list = document.querySelector('#imageList');
    imagesLoading = true;
    for (let index = 0; index < 20; index++) {
        const img = document.createElement('img')
        const randomMilliseconds = Math.floor(Math.random() * 3001);
        const randomImageSize = (Math.floor(Math.random() * 6) + 3) * 1000;
        img.alt = "Loading"
        list.appendChild(img)
        setTimeout(function() {
            img.src = `https://picsum.photos/3000/${randomImageSize}?random=${index+1}`
        }, randomMilliseconds)
    }
}

function loadUserList() {
    const users = document.querySelector('#users');
    fetch('https://reqres.in/api/users?per_page=12')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Testing user list works')
        data.data.reverse().forEach((item, i) => {
            const userItem = document.createElement('li')
            userItem.classList.add('user-item')
            userItem.dataset.index = i
            userItem.innerHTML = `
                <img src="${item.avatar}">
                <p class="user-info">
                    <span class="user-name">${item.first_name} ${item.last_name}</span>
                    <span class="user-email"><a href="emailto:${item.first_name} ${item.last_name}">${item.email}</a></span>
                </p>`;
            users.appendChild(userItem)
        })
    });
}

function sayWelcomeBack() {
    const name = localStorage.getItem('name');
    const form = document.querySelector('form');

    document.querySelector('#greeting').innerHTML = `Welcome back ${name}`;
    form.style.display = 'none';
}

function showGreeting() {
    const name = localStorage.getItem('name');
    const form = document.querySelector('form');
    
    if (name) {
        sayWelcomeBack()
    } else {
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            const data = new FormData(form);
            localStorage.setItem('name', data.get('name'));
            sayWelcomeBack()
        });
    }
}

setStickyListener();
showGreeting();
onLogoClick();
loadImageList();
loadUserList();
changeColor();