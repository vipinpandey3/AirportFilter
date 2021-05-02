// import data from './airports.json'

const checkbox = document.querySelectorAll('.checkbox');
const searchFilter = document.querySelector('.search-filter');
const tableBody = document.querySelector('.table-body');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const number1 = document.querySelector('.number-1');
const number2 = document.querySelector('.number-2')
let page = 0

let jsonData = []
let startIndex = 0
const row_per_page = 4;

loadEventListener()

function loadEventListener() {
    document.addEventListener('DOMContentLoaded', fetchAirports)

    checkbox.forEach((box) => {
        box.checked = false
        box.addEventListener('change', checkboxEvent);
    })

    next.addEventListener('click', nextPage)

    prev.addEventListener('click', prevPage)
    
    searchFilter.addEventListener('keyup', filterSearch)

    searchFilter.value = ""
}

function checkboxEvent(e) {
    if(e.target.value) {
        let typeArry = jsonData.filter(data => data.type.toLowerCase() === e.target.value)
        console.log(typeArry)
        fillTables(typeArry, startIndex, page);
    } else if(!e.target.value){
        fillTables(jsonData, startIndex, page)
    }
}

function filterSearch(e) {

}

function fetchAirports() {

    
    fetch('./airports.json')
        .then((res) => res.json())
        .then(data => {
            jsonData = data;
            fillTables(jsonData, startIndex, page)
        })
        .catch(e => console.log(e))
}

function fillTables(jsonData, startIndex, page) {

    // next.addEventListener('click', nextPage)

    // prev.addEventListener('click', prevPage)

    
    let indexStart = row_per_page * page
    let end = indexStart + row_per_page
    let tableArry = jsonData.slice(indexStart, end)
    const totlaLength = jsonData.length
    let output = "";
    tableArry.forEach(row => {
        console.log(row)
        output += `
            <tr>
                <td>${row.name}</td>
                <td>${row.icao}</td>
                <td>${row.iata}</td>
                <td>${row.elevation} ft</td>
                <td>${row.latitude}</td>
                <td>${row.longitude}</td>
                <td>${row.type}</td>
            </tr>
        `
    })
    number1.innerText = `${indexStart+1}-${end}`
    number2.innerText = `${totlaLength}`
    tableBody.innerHTML = output
}

function nextPage(data){
    page++;
    startIndex =  row_per_page * page
    // if(data.length == 0) {
    //     jsonData != data
    //     fillTables(jsonData, startIndex, page)
    // } else {
    //     jsonData = data
    //     fillTables(jsonData, startIndex, page)
    // }

    fillTables(jsonData, startIndex, page)
}

function prevPage() {
    page--;
    if(page < 0) {
        page = 0
        const row_per_page = 4;
        fillTables(jsonData, startIndex, page)
    } else {
        const row_per_page = 4;
        fillTables(jsonData, startIndex, page)
    }
}

function filterSearch(e) {
    // page = 0;
    if(e.target.value === "") {
        fillTables(jsonData, startIndex, page)
    } else {
        const searchValue = jsonData.filter(data => data.name.toLowerCase() === e.target.value.toLowerCase());
        // jsonData = searchValue
        // console.log(searchValue)
        fillTables(searchValue, startIndex, page)
    }
}

