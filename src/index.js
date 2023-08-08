console.log("Connected")

const url = "https://wagon-garage-api.herokuapp.com/esso/cars"
const carsList = document.querySelector(".cars-list")

fetch(url)
  .then(response => response.json())
  .then((data) => {
    data.forEach((car) => {
      const html = `<div class="car">
                      <div class="car-image">
                        <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
                      </div>
                      <div class="car-info">
                        <h4>${car.brand}</h4>
                        <p><strong>Owner:</strong> ${car.owner}</p>
                        <p><strong>Plate:</strong> ${car.plate}</p>
                      </div>
                    </div>`

      carsList.insertAdjacentHTML('beforeend', html);
    });
  });

  // 1 selecting the html elements
  const model = document.querySelector("#model")
  const brand = document.querySelector("#brand")
  const owner = document.querySelector("#owner")
  const plate = document.querySelector("#plate")
  const form = document.querySelector("form")
  
  // 2 user interaction
    form.addEventListener("submit", (event) => {
        event.preventDefault()
    // call api and manipulate dom  
        fetch(url, {
            method: "POST"  ,
            headers: { "Content-Type": "application/json" },
            body:  JSON.stringify({
                    "brand":  brand.value,
                    "model": model.value,
                    "owner": owner.value,
                    "plate": plate.value
                    })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            const html = `<div class="car">
                        <div class="car-image">
                        <img src="http://loremflickr.com/280/280/${data.brand} ${data.model}" />
                        </div>
                        <div class="data-info">
                        <h4>${data.brand}</h4>
                        <p><strong>Owner:</strong> ${data.owner}</p>
                        <p><strong>Plate:</strong> ${data.plate}</p>
                        </div>
                    </div>`

            carsList.insertAdjacentHTML('afterbegin', html);
            form.reset()
        })
    })