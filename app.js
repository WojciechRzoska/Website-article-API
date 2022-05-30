const fetchData = async (articlesNumbers) => {
  const response = await axios.get(
    'https://api.spaceflightnewsapi.net/v3/articles',
    {
      params: {
        _limit: articlesNumbers,
      },
    }
  );
  return response.data;
};

const paginationData = async (numberOfPagination, articlesNumbers) => {
  const response = await axios.get(
    'https://api.spaceflightnewsapi.net/v3/articles',
    {
      params: {
        _start: numberOfPagination,
        _limit: articlesNumbers,
      },
    }
  );
  return response.data;
};

const fetchCounter = async () => {
  const response = await axios.get(
    'https://api.spaceflightnewsapi.net/v3/articles/count'
  );

  return response.data;
};

const fetchID = async (id) => {
  const response = await axios.get(
    'https://api.spaceflightnewsapi.net/v3/articles',
    {
      params: {
        id: id,
      },
    }
  );

  return response.data;
};
//number of value to paginate
let skipValue = 15;

let itemsArray = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];

const numberOfRender = document.querySelector('.number-of-render');
const results = document.querySelector('.results');
const counter = document.querySelector('.counter');

//first render and render when user change value of articles
const newRender = async () => {
  if (numberOfRender.value === '') {
    numberOfRender.value = 15;
  }
  const items = await fetchData(numberOfRender.value);

  results.innerHTML = '';
  skipValue = parseInt(numberOfRender.value);

  builder(items);

  const quantity = await fetchCounter();
  counter.innerHTML = counterTemplate(skipValue, quantity);
};

//function to paginate
const paginationRender = async (skipValue) => {
  const items = await paginationData(skipValue, parseInt(numberOfRender.value));

  builder(items);
  const quantity = await fetchCounter();
  counter.innerHTML = counterTemplate(skipValue, quantity);
};

//template to render articles
const builder = (items) => {
  for (let item of items) {
    const article = document.createElement('div');
    article.classList.add('card');
    if (itemsArray.some((e) => e.id === item.id)) {
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
newRender();

//listeners for input and scroll
numberOfRender.addEventListener('input', debounce(newRender, 500));
window.addEventListener('scroll', () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    skipValue = parseInt(numberOfRender.value) + skipValue;
    paginationRender(skipValue);
  }
});
