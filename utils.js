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
