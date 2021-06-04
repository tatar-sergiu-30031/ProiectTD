var api = require('./src/api.js').app;
const fs = require('fs');
const phonesFilepath = './src/phones.json';

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/phones', function (request, response) {
  response.json(getphones());
});

api.get('/phones/:id', function (request, response) {
  let car = getCarById(request.params.id);
  if (car) response.json(car);
  response.json('not found');
});

api.put('/phones', function (request, response) {
  saveCar(request.body);
  response.json('User was saved succesfully');
});

api.post('/phones', function (request, response) {
  // in request o sa-mi vina un obiect de tip car care o sa aiba un anumit id
  console.log(request.body);//un obiect de tipul car actualizat pe client
  // citim phones din fisier pe baza id-ului primit de la client
  // cautam daca exista indexul de pe request.body
  // daca exista actualizam parametrii acestui produs/item
  // salvam in fisier produsele actualizate
  response.json('Phone  was saved succesfully');
});

api.delete('/phones/:index', function (request, response) {
  // delete din fisier pe baza unui id
  // phones.splice(request.params.index, 1);
  response.json('User with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getphones() {
  let phones = [];
  try {
    phones = JSON.parse(fs.readFileSync(phonesFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return phones;
}

function saveCar(car) {
  let phones = getphones();// citire json din fisier
  let maxId = getMaxId(phones);  // get maximum id form phones array
  car.id = maxId+1;// generare id unic
  phones.push(car);// adaugare masina noua in array
  try {
    fs.writeFileSync(phonesFilepath, JSON.stringify(phones));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(phones) {
  let max = 0;
  for (var i=0; i<phones.length;i++) {
    if(max < phones[i].id) {
      max = phones[i].id;
    }
  }
  return max;
}

function getCarById(id){
  let phones = getphones();// citire json din fisier
  let selectedCar = null;
  for(var i=0; i<phones.length; i++) {
    if(id == phones[i].id) selectedCar = phones[i];
  }
  return selectedCar;
}