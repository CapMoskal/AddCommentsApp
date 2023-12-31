import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://commentsapp-aa012-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const commentsListInDB = ref(database, "commentsList")

const inputAreaID = document.getElementById("inputArea")
const fromWhoID = document.getElementById("IDFromWho")
const toWhoID = document.getElementById("IDToWho")
const inputBtnID = document.getElementById("inputBtn")
let commentsListEl = document.getElementById("commentsList")


function clearShoppingListEl() {
    commentsListEl.innerHTML = ""
}

function clearInputFieldEl(inputField) {
    inputField.value = ""
}

inputBtnID.addEventListener("click", function() {
    let values = [toWhoID.value, inputAreaID.value, fromWhoID.value]
    // console.log(values[0])
    // console.log(values[1])
    // console.log(values[2])

    push(commentsListInDB, values)

    clearInputFieldEl(toWhoID)
    clearInputFieldEl(inputAreaID)
    clearInputFieldEl(fromWhoID)
})

onValue(commentsListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()

        for (let i = itemsArray.length - 1; i >= 0; i--) 
        {
            let currentItem = itemsArray[i]
            appendItemToCommentList(currentItem)
        }
    } else {
        commentsListEl.innerHTML = "No comments..."
    }
})

function appendItemToCommentList(item) {
    let itemID = item[0]
    let itemValues = item[1]

    let newEl = document.createElement("li")

    newEl.innerHTML = 
    `
    <p id="toWho">To ${itemValues[0]}</p>
    <p id="comment">${itemValues[1]}</p>
    <p id="fromWho">From ${itemValues[2]}</p>
    `   
    commentsListEl.append(newEl)
}