document.addEventListener('DOMContentLoaded', () => {
  const URL = 'http://localhost:3000/dogs';
  const tbody = document.getElementById('table-body');
  const form = document.getElementById('dog-form');
  let id = 0;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const configObject = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: form.name.value,
        breed: form.breed.value,
        sex: form.sex.value,
      })
    };

    fetch(URL + `/${id}`, configObject);
    window.location.reload();
  });

  fetch(URL).then((response) => response.json())
    .then((dogs) => addDogsToTable(dogs));

  function addDogsToTable(dogs) {
    dogs.map((dog) => {
      const tr = document.createElement('tr');
      const tdName = document.createElement('td');
      const tdBreed = document.createElement('td');
      const tdSex = document.createElement('td');
      const tdEdit = document.createElement('td');
      const button = document.createElement('button');

      tdName.innerText = dog.name;
      tdBreed.innerText = dog.breed
      tdSex.innerText = dog.sex
      button.innerText = 'Edit Dog';

      button.addEventListener('click', () => {
        form.name.value = dog.name;
        form.breed.value = dog.breed;
        form.sex.value = dog.sex;
        id = dog.id;
      });
      
      tdEdit.append(button);
      tbody.append(tr,tdName, tdBreed, tdSex, tdEdit);
    });
  }
});