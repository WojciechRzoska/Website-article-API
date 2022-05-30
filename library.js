//check value of local storage
let savedArticles = localStorage.getItem('articles')
  ? JSON.parse(localStorage.getItem('articles'))
  : [];

const results = document.querySelector('.results');

const template = (data) => {
  for (let item of data) {
    const article = document.createElement('div');
    article.classList.add('card');
    structure(article, 'delete-library', 'Delete from library', item);
    results.appendChild(article);
  }
  generateDelButton(libraryRender);
};

const libraryRender = () => {
  if (savedArticles.length === 0) {
    results.innerHTML = `<p>Nothing in your library</p>`;
  } else {
    results.innerHTML = ``;
    template(savedArticles);
  }
};
libraryRender();

const asSortByUpdate = document.querySelector('#as-sort-by-update');
const desSortByUpdate = document.querySelector('#des-sort-by-update');
const asSortByTitle = document.querySelector('#as-sort-by-title');
const desSortByTitle = document.querySelector('#des-sort-by-title');

const createSort = (func, btn1, btn2, style1, style2) => {
  func();
  btn1.style.display = style1;
  btn2.style.display = style2;
  results.innerHTML = '';
  libraryRender();
};

asSortByUpdate.addEventListener('click', () => {
  createSort(
    () => {
      savedArticles = savedArticles.sort((a, b) => {
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
      savedArticles = savedArticles.sort((a, b) => {
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
      savedArticles = savedArticles.sort((a, b) => {
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
      savedArticles = savedArticles.sort((a, b) => {
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
