//get_limited_data() Fonksiyonu başlangıç ekranında ki 6 adet verinin yazılmasını sağlıyor.
function get_limited_data(){
    fetch("https://api.ratesapi.io/api/latest?base=TRY&symbols=USD,EUR,JPY,GBP,DKK,NOK")
    .then(response=>response.json())
    .then(data=>{
        for(let a in data.rates){
            const TRY =1;
            const type_of_tl= Number(TRY/data.rates[a]).toFixed(3); //Bu işlem sayesinde gelen datayı TL cinsine çeviriyorum.
            cards.innerHTML+=`
            <div class="card-area mt-4">
                <div class="card-info">
                    <div class="card-image">
                        <img src="assets/img/flags/${a}.png" alt="" id="card_flag">
                    </div>
                    <div class="card-type">
                        <h2 id="card_title">${a}</h2>
                        <p id="card_title_detail"></p>
                    </div>
                </div>
                <div class="card-exchange-area" id="card_exchange_area">
                <div class="buying">
                    <h2 class="sales-title" id="buying_title">ALIŞ</h2>
                    <p class="sales-amouth" id="buying_amouth">${type_of_tl}</p>
                </div>
                <div class="sales">
                    <h2 class="sales-title">SATIŞ</h2>
                    <p class="sales-amouth" id="sales_amouth">${type_of_tl}</p>
                </div>
                </div>
            </div>`
        }
    })
    .catch(err=>console.warn(err));
}
get_limited_data()


// get_all_data() fonksiyonu tüm piyasaları alt alta listeletmek için kullanılıyor. Yukarıda ki fonksiyonla neredeyse aynı işlemleri içeriyor.
function get_all_data(){
    fetch("https://api.ratesapi.io/api/latest?base=TRY")
    .then(response=>response.json())
    .then(data=>{
        for(let a in data.rates){
            const TRY =1;
            const type_of_tl= Number(TRY/data.rates[a]).toFixed(3);
            cards.innerHTML+=`
            <div class="card-area mt-4">
                <div class="card-info">
                    <div class="card-image">
                        <img src="assets/img/flags/${a}.png" alt="" id="card_flag">
                    </div>
                    <div class="card-type">
                        <h2 id="card_title">${a}</h2>
                        <p id="card_title_detail"></p>
                    </div>
                </div>
                <div class="card-exchange-area">
                    <div class="buying">
                        <h2 class="sales-title" id="buying_title">ALIŞ</h2>
                        <p class="sales-amouth" id="buying_amouth">${type_of_tl}</p>
                    </div>
                    <div class="sales">
                        <h2 class="sales-title">SATIŞ</h2>
                        <p class="sales-amouth" id="sales_amouth">${type_of_tl}</p>
                    </div>
                </div>
            </div>`
        }
    })
    .catch(err=>console.warn(err)); 
}

//calculate() fonksiyonu döviz çevirme işlemi için kullanılıyor. Selectbox ögesinin içerisini fonksiyon ile dinamik getirtebilsem de selectbox içerisini seçme işlemini yapamadım o yüzden elle girdim.
let first_input = document.getElementById("first_input");
let second_input = document.getElementById("second_input");
let selectbox = document.getElementById("selectbox");
function calculate(){
    const my_selectbox = selectbox.value;
    fetch(`https://api.ratesapi.io/api/latest?base=${my_selectbox}`)
    .then(response=>response.json())
    .then(data=>{
        const rate = data.rates.TRY
        second_input.value = (first_input.value * rate).toFixed(2);
    });
}
first_input.addEventListener("input", calculate);
selectbox.addEventListener("change", calculate);

calculate()