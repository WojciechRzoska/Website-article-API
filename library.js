//check value of local storage
let itemsArray = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];

const results = document.querySelector('.results');

const template = (data) => {
  for (let item of data) {
    console.log(data);
    const article = document.createElement('div');
    article.classList.add('card');
    article.innerHTML = `
      <h2>${item.title}</h2>  
      <div class="card-body">
          <span>${item.summary}</span>
          <div class="card-info">
          <p>Website:${item.newsSite}</p>
          <p>Publishet at:${item.publishedAt}</p>
          </div>
          <div class="buttons">
            <a href="${item.url}">Read article</a>
            <button class="delete-library" value="${item.id}">Delete from library</button>
          </div>
      </div>   
      `;
    results.appendChild(article);
  }
  generateDelButton(libraryRender);
};

const libraryRender = () => {
  if (itemsArray.length === 0) {
    results.innerHTML = `<p>Nothing in your library</p>`;
  } else {
    results.innerHTML = ``;
    template(itemsArray);
  }
};
libraryRender(itemsArray);

const asSortByUpdate = document.querySelector('#as-sort-by-update');
const desSortByUpdate = document.querySelector('#des-sort-by-update');
const asSortByTitle = document.querySelector('#as-sort-by-title');
const desSortByTitle = document.querySelector('#des-sort-by-title');

const createSort = (func, btn1, btn2, style1, style2) => {
  func();
  btn1.style.display = style1;
  btn2.style.display = style2;
  results.innerHTML = '';
  libraryRender(itemsArray);
};

asSortByUpdate.addEventListener('click', () => {
  createSort(
    () => {
      itemsArray = itemsArray.sort((a, b) => {
        let keyA = new Date(a.updatedAt),
          keyB = new Date(b.updatedAt);

        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    },
    asSortByUpdate,
    desSortByUpdate,
    'none',
    'inline'
  );
});

desSortByUpdate.addEventListener('click', () => {
  createSort(
    () => {
      itemsArray = itemsArray.sort((a, b) => {
        let keyA = new Date(a.updatedAt),
          keyB = new Date(b.updatedAt);

        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
      });
    },
    asSortByUpdate,
    desSortByUpdate,
    'inline',
    'none'
  );
});

asSortByTitle.addEventListener('click', () => {
  createSort(
    () => {
      itemsArray = itemsArray.sort((a, b) => {
        let keyA = a.title,
          keyB = b.title;

        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    },
    asSortByTitle,
    desSortByTitle,
    'none',
    'inline'
  );
});

desSortByTitle.addEventListener('click', () => {
  createSort(
    () => {
      itemsArray = itemsArray.sort((a, b) => {
        let keyA = a.title,
          keyB = b.title;

        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
      });
    },
    asSortByTitle,
    desSortByTitle,
    'inline',
    'none'
  );
});
