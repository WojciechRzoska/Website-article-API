const spaceFlightNewsApiV3Url = 'https://api.spaceflightnewsapi.net/v3';
const defaultArticlesPerPage = 15;
const defaultArticlesOffset = 0;

const fetchArticles = async (maxArticlesPerPage = defaultArticlesPerPage, articlesOffset = defaultArticlesOffset) => {
  const response = await axios.get(
      `${spaceFlightNewsApiV3Url}/articles`,
      {
        params: {
          _start: articlesOffset,
          _limit: maxArticlesPerPage,
        },
      }
  );
  return response.data;
};

const fetchCounter = async () => {
  const response = await axios.get(
      `${spaceFlightNewsApiV3Url}/articles/count`
  );

  return response.data;
};

const fetchArticle = async (id) => {
  const response = await axios.get(
      `${spaceFlightNewsApiV3Url}/articles`,
      {
        params: {
          id: id,
        },
      }
  );

  return response.data;
};

//number of value to paginate
let currentArticlesOffset = defaultArticlesPerPage;

let savedArticles = localStorage.getItem('articles')
  ? JSON.parse(localStorage.getItem('articles'))
  : [];

const numberOfRender = document.querySelector('.number-of-render');
const results = document.querySelector('.results');
const counter = document.querySelector('.counter');

//first render and render when user change value of articles
const newRender = async () => {
  if (numberOfRender.value === '') {
    numberOfRender.value = defaultArticlesPerPage;
  }
  const articles = await fetchArticles(numberOfRender.value);

  results.innerHTML = '';
  currentArticlesOffset = parseInt(numberOfRender.value);

  builder(articles);

  const quantity = await fetchCounter();
  counter.innerHTML = counterTemplate(currentArticlesOffset, quantity);
};

//function to paginate
const paginationRender = async (articlesOffset) => {
  const articles = await fetchArticles(parseInt(numberOfRender.value), articlesOffset);

  builder(articles);
  const quantity = await fetchCounter();
  counter.innerHTML = counterTemplate(articlesOffset, quantity);
};

//template to render articles
const builder = (items) => {
  for (let item of items) {
    const article = document.createElement('div');
    article.classList.add('card');
    if (savedArticles.some((e) => e.id === item.id)) {
      structure(article, 'delete-library', 'Delete from library', item);
    } else {
      structure(article, 'add-library', 'Add to library', item);
    }
    results.appendChild(article);
  }
  generateAddButton(newRender);
  generateDelButton(newRender);
};

const counterTemplate = (number, quantity) => {
  return `
    <p>Counter: ${number}/${quantity}</p>
  `;
};

window.addEventListener('load', function () {
  newRender();

//listeners for input and scroll
  numberOfRender.addEventListener('input', debounce(newRender, 500));
  window.addEventListener('scroll', () => {
    if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
    ) {
      currentArticlesOffset = parseInt(numberOfRender.value) + currentArticlesOffset;
      paginationRender(currentArticlesOffset);
    }
  });
});

