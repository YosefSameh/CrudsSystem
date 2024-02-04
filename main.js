
const title = document.querySelector(".title")
const price = document.querySelector(".price")
const taxes = document.querySelector(".taxes")
const ads = document.querySelector(".ads")
const discount = document.querySelector(".discount")
const count = document.querySelector(".count")
const creat = document.getElementById("creat")
const search = document.querySelector(".search")
const delet = document.querySelector(".delet")
const totel = document.querySelector(".totel")
const table = document.querySelector(".table")
const deletAll = document.querySelector(".delet")
const span = document.querySelector(".span")

let mood = "creat"
let index
// step 1 getTotel

let getotel = ()=>{
    
if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        totel.innerHTML = result
    }else{
        totel.innerHTML = ""
    }

}
// step 2 creat product


let products;
if (localStorage.product != null) {
    products = JSON.parse(localStorage.getItem("product")) 
}else{
    products = []
}

creat.onclick =  (e) => {
e.preventDefault()
if (title.value != "" && price.value != "" && count.value <=600) {
        
    let collect = {
            Titel:title.value,
            Price:price.value, 
            Taxes:taxes.value, 
            Ads:ads.value, 
            Discount:discount.value,
            Totel:totel.innerHTML,
            Count: count.value,
            
            
        }

        // count product
        
        if (mood === "creat") {
            if (collect.Count > 1) {
                for (let i = 0; i < collect.Count; i++) {
                    
                    products.push(collect)
                    
                }
            }else{
                products.push(collect)
            }
        }else{
            for (let i = 0; i < collect.Count; i++) {
                    products.push(collect)
                }
            products[index] = collect
            creat.innerHTML = "Creat"
        }

        // save in localStorage
        
        localStorage.setItem("product", JSON.stringify(products))

        inputundefind()
        
        ShowData()
        
    
    }
}

let inputundefind = ()=>{
    title.value = ''
        price.value = ''
        taxes.value = ''
        ads.value = ''
        discount.value = ''
        totel.innerHTML = ''
        count.value = ''
}
// step 3 ShowData

let ShowData = ()=>{    
    table.innerHTML = ""
    products.forEach((pro ,key)=>{
        table.innerHTML += `
        <div class="d-flex justify-content-between w-100 text-center align-items-center">
        <p>${key + 1}</p>
        <p>${pro.Titel}</p>
        <p>${pro.Price}</p>
        <p>${pro.Taxes}</p>
        <p>${pro.Ads}</p>
        <p>${pro.Discount}</p>
        <p>${pro.Totel}</p>
        <button onclick="Update(${key})">Update</button>
        <button onclick="Delet(${key})">Delet</button>
        </div>
        <hr>
        `
        span.innerHTML = key +1
    })
}

// step 4 delet product

ShowData()
let Delet  = (key) => {
    products.splice(key,1)
    localStorage.setItem("product", JSON.stringify(products));
    span.innerHTML = key
    ShowData()
    inputundefind()
}


// step 5 deletAllProducts

deletAll.onclick = (e)=>{
    e.preventDefault()
    localStorage.clear()
    products.splice(0)
    ShowData()
    span.innerHTML = "0"
    inputundefind()
}


// step 6 Update product


let Update = (key)=>{
    index = key
    title.value = products[key].Titel
    price.value = products[key].Price
    ads.value = products[key].Ads
    taxes.value = products[key].Taxes
    discount.value = products[key].Discount
    getotel()
    creat.innerHTML = "Update"
    mood = "Update"
    scroll({
        top:0,
        behavior:"smooth",
    })
}


// step 7 search in products

let Search = (value)=>{
    table.innerHTML= ''
    products.forEach((pro,key)=>{
        if (pro.Titel.includes(value.toLowerCase())) {
            table.innerHTML += `
            <div class="d-flex justify-content-between w-100 text-center align-items-center">
            <p>${key + 1}</p>
            <p>${pro.Titel}</p>
            <p>${pro.Price}</p>
            <p>${pro.Taxes}</p>
            <p>${pro.Ads}</p>
            <p>${pro.Discount}</p>
            <p>${pro.Totel}</p>
            <button onclick="Update(${key})">Update</button>
            <button onclick="Delet(${key})">Delet</button>
            </div>
            <hr>
            `
        }
    })
}
