const result_mobile = document.getElementById('result_mobile');
const filter = document.getElementById('filter_mobile');
const listItems = [];
getData();

result_mobile.classList.add('hide'); // Sonuç listesini başlangıçta gizli hale getir

filter.addEventListener('input', (e) => {
  if (e.target.value.trim() !== '') {
    result_mobile.classList.remove('hide');
  } else {
    result_mobile.classList.add('hide');
  }
  filterData(e.target.value);
});

async function getData() {
  const res = await fetch('https://randomuser.me/api?result_mobiles=50');
  const { result_mobiles } = await res.json();
  // Clear result_mobile
  result_mobile.innerHTML = '';
  result_mobiles.forEach((user) => {
    const li = document.createElement('li');
    listItems.push(li);
    li.innerHTML = `
      <img src="${user.picture.large}" alt="${user.name.first}">
      <div class="user-info">
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.city}, ${user.location.country}</p>
      </div>
    `;
    result_mobile.appendChild(li);
  });
}

function filterData(searchTerm) {
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
}
