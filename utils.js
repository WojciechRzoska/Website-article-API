const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const structure = (root, btnClass, btnTxt, item) => {
  let string = item.summary;
  string = string.substr(0, 200);
  let time = item.publishedAt;
  time = time.slice(0, -5).replace('T', ' ');
  root.innerHTML = `
  <h2>${item.title}</h2>  
  <div class="card-body">
      <span >${string}</span>
      <div class="card-info">
      <p>Website:${item.newsSite}</p>
      <p>Publishet at:${time}</p>
      </div>
      <div class="buttons">
        <a href="${item.url}">Read article</a>
        <button class="${btnClass}" value="${item.id}">${btnTxt}</button>
      </div>
  </div>   
  `;
};

const generateAddButton = (renderFunction) => {
  const libraryButton = document.querySelectorAll('.add-library');
  libraryButton.forEach((item) => {
    item.addEventListener('click', async (e) => {
      const response = await fetchID(item.value);
      e.preventDefault();

      itemsArray.push(response[0]);
      localStorage.setItem('items', JSON.stringify(itemsArray));
      item.style.display = 'none';
      renderFunction();
    });
  });
};

const generateDelButton = (renderFunction) => {
  const deleteButton = document.querySelectorAll('.delete-library');

  deleteButton.forEach((item) => {
    item.addEventListener('click', () => {
      itemsArray = itemsArray.filter((obj) => obj.id != item.value);
      localStorage.setItem('items', JSON.stringify(itemsArray));
      renderFunction();
    });
  });
};
