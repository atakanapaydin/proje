function get_limited_data(){
    fetch("https://api.ratesapi.io/api/latest?base=TRY&symbols=USD,EUR,JPY,GBP,DKK,NOK")
    .then(response=>response.json())
    .then(data=>{
        const rates_array=[];
        console.log(rates_array);
        for(let a in data.rates){
            const TRY =1;
            const toplam= Number(TRY/data.rates[a]).toFixed(3);
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
                    <p class="sales-amouth" id="buying_amouth">${toplam}</p>
                </div>
                <div class="sales">
                    <h2 class="sales-title">SATIŞ</h2>
                    <p class="sales-amouth" id="sales_amouth">${toplam}</p>
                </div>
                </div>
            </div>`
        }
    })
    .catch(err=>console.warn(err));
}
get_limited_data()



function get_all_data(){
    fetch("https://api.ratesapi.io/api/latest?base=TRY")
    .then(response=>response.json())
    .then(data=>{
        const full_data=[];
        for(let b in data.rates){
            full_data.push(data.rates[b]);
        }
        const TRY=data.rates.TRY
        for (let i = 0; i< full_data.length; i++) {
            full_data[i]=TRY/full_data[i];
        }

        for(let a in data.rates){
            const TRY =1;
            const toplam= Number(TRY/data.rates[a]).toFixed(3);
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
                        <p class="sales-amouth" id="buying_amouth">${toplam}</p>
                    </div>
                    <div class="sales">
                        <h2 class="sales-title">SATIŞ</h2>
                        <p class="sales-amouth" id="sales_amouth">${toplam}</p>
                    </div>
                </div>
            </div>`
        }
    })
    .catch(err=>console.warn(err)); 
}


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