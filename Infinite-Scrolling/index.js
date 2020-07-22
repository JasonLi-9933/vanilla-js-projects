//jshint esversion:8

const filter = document.querySelector('.filter-box');
const posts = document.querySelector('.posts');
const spinners = document.querySelector('.spinners');

var limit = 5;
var page = 1;



window.onload = () => {
    fetchPosts();
};

window.addEventListener('scroll', reachPageBottom);
filter.addEventListener('input', searchPosts);

function reachPageBottom() {
    const scrollTop = document.documentElement.scrollTop; /* Scroll down how much*/
    const scrollHeight = document.documentElement.scrollHeight; /* Total height*/
    const clientHeight = document.documentElement.clientHeight; /* View Port height */

    const atBottom = (scrollTop + clientHeight) > scrollHeight - 5;

    if (atBottom) {
        loadMorePosts();
    }
}

function searchPosts() {
    let word = filter.value;
    const loadedPosts = document.querySelectorAll('.post');

    loadedPosts.forEach( post => {
        const title = post.querySelector('.post-title').innerHTML;
        const content = post.querySelector('.post-content').innerHTML;

        const keyWordInTitle = title.indexOf(word) != -1;
        const keyWordInContent = content.indexOf(word) != -1;

        if( keyWordInContent || keyWordInTitle) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });

}

async function fetchPosts() {
    var fakeDataAPI = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`;
    let data = await fetch(fakeDataAPI);
    console.log(page);
    data = await data.json();
    populateUI(data);

    // fetch(fakeDataAPI)
    // .then( data => {
    //     return data.json();
    // })
    // .then( posts => {
    //     populateUI(posts);
    // });
}

function populateUI(data) {
    data.forEach(post => {
        const id = post.id;
        const title = post.title;
        const content = post.body;
        createPostCard(id, title, content);
    });
}

function createPostCard(id, title, content) {
    const newPost = document.createElement('div');
    newPost.classList.add('post'); /* Add style*/
    newPost.innerHTML = `
                <span class="id-box">${id}</span>
                <h2 class="post-title">${title}</h2>
                <p class="post-content">${content}</p>`;
    posts.appendChild(newPost);
}

function loadMorePosts() {

    spinners.classList.remove('hidden');

    setTimeout(() => {
        spinners.classList.add('hidden');
        setTimeout(() => {
            page++;
            fetchPosts();
        }, 300);

    }, 1000);


}