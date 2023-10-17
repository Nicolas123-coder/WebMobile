function getJSON(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('Dados recebidos com sucesso!');
        resolve(xhr.response);
      } else {
        console.log('Problema ao conectar com a API: ' + xhr.status);
        reject('Erro na API');
      }
    };
    xhr.send();
  });
}

function fetchHeroData(code) {
  var url = BASE_URL + code;
  return getJSON(url);
}

const heroData = [];

async function loadHeroes() {
  try {
    // ----------------------------------------------------------------
    //  COLOCAR NESTA VARIÁVEL A QUANTIDADE DE HERÓIS DESEJADA
    const heroesNumber = 4
    // ----------------------------------------------------------------

    for (let i = 0; i < heroesNumber;) {
      const random = Math.floor(Math.random() * 200);

      const data = await fetchHeroData(random);
      console.log(data);

      // Validação de valor nulo que a API retornava
      let nullValue = false;

      for (var chave in data.powerstats) {
        console.log(typeof data.powerstats[chave])
        if (data.powerstats[chave] === "null") {
          nullValue = true;
        }
      }

      if (nullValue == false) {
        i++;
        heroData.push(data);
      }
    }

    renderHeroes(heroData);
  } catch (error) {
    console.error(error);
  }
}

function renderHeroes(heroData) {
  document.getElementById("heroes").innerHTML = "";

  heroData.forEach((json, index) => {
    const name = json.name;
    const intelligence = json.powerstats.intelligence;
    const image = json.image.url;
    const strength = json.powerstats.strength;
    const speed = json.powerstats.speed;
    const power = json.powerstats.power;
    const durability = json.powerstats.durability;
    const combat = json.powerstats.combat;

    document.getElementById("heroes").innerHTML += "<article>" +
      "<div class='heroe-header'>" +
        "<div class='circle-box'>" +
          "<div class='circle'>" +
            (index + 1) +
          "</div>" +
        "</div>" +
        "<div class='name'>" +
          "<p style='margin: 0; font-size: 20px;'>" + name + "</p>" +
        "</div>" +
      "</div>" +
      "<div class='image-box'>" +
        "<img src='" + image + "'/>" +
      "</div>" +

      "<p style='position: relative;  font-size: 20px;'>" +
        "Intelligence - " + intelligence +
        "<span style='position: absolute; width: 325px; max-width: 325px; background-color: #DFDFDF;'></span>" +
        "<span style='position: absolute; width: " + intelligence + "%; max-width: 325px; background-color: #DE3127;'></span>" +
      "</p>" +

      "<p style='position: relative;  font-size: 20px;'>" +
        "Strength - " + strength +
        "<span style='position: absolute; width: 325px; max-width: 325px; background-color: #DFDFDF;'></span>" +
        "<span style='position: absolute; width: " + strength + "%; max-width: 325px; background-color: #DFBD1C;'></span>" +
      "</p>" +

      "<p style='position: relative;  font-size: 20px;'>" +
        "Speed - " + speed +
        "<span style='position: absolute; width: 325px; max-width: 325px; background-color: #DFDFDF;'></span>" +
        "<span style='position: absolute; width: " + speed + "%; max-width: 325px; background-color: #7EDE96;'></span>" +
      "</p>" +

      "<p style='position: relative;  font-size: 20px;'>" +
        "Power - " + power +
        "<span style='position: absolute; width: 325px; max-width: 325px; background-color: #DFDFDF;'></span>" +
        "<span style='position: absolute; width: " + power + "%; max-width: 325px; background-color: #5EBFE0;'></span>" +
      "</p>" +
      
      "<p style='position: relative;  font-size: 20px;'>" +
        "Durability - " + durability +
        "<span style='position: absolute; width: 325px; max-width: 325px; background-color: #DFDFDF;'></span>" +
        "<span style='position: absolute; width: " + durability + "%; max-width: 325px;" + "%; background-color: #995AE3;'></span>" +
      "</p>" +

      "<p style='position: relative;  font-size: 20px;'>" +
        "Combat - " + combat +
        "<span style='position: absolute; width: 325px; max-width: 325px; background-color: #DFDFDF;'></span>" +
        "<span style='position: absolute; width: " + combat + "%; max-width: 325px; background-color: #FF7C6C;'></span>" +
      "</p>"
  });
}

const ACCESS_TOKEN = "6571215106330439";
const BASE_URL = "https://superheroapi.com/api.php/" + ACCESS_TOKEN + "/";

loadHeroes();