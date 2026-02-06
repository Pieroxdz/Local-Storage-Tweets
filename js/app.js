const form = document.querySelector("#formulario");
const tweetList = document.querySelector("#lista-tweets");
let tweets = [];


const cleanHTML = (referencia) => {
    while (referencia.firstChild) {
        referencia.removeChild(referencia.firstChild);
    }
}

const generateHTML = () => {

    cleanHTML(tweetList)

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            const btnDelete = document.createElement("A");
            btnDelete.classList.add("borrar-tweet");
            btnDelete.textContent = "X";
            btnDelete.onclick = () => {
                removeTweet(tweet.id);
            }

            const li = document.createElement("LI");
            li.textContent = tweet.text;
            li.appendChild(btnDelete)
            tweetList.appendChild(li);
        })
    }

    synchroniseStorage()
}

const removeTweet = (id) => {
    tweets = tweets.filter(tweet => tweet.id !== id)
    generateHTML();
}

const synchroniseStorage = () => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

const showAlert = (text) => {
    const alert = document.createElement("P");
    alert.textContent = text;
    alert.classList.add("error");

    const container = document.querySelector("#contenido");
    container.appendChild(alert)

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

const agregarTweet = (e) => {
    e.preventDefault();
    const tweet = document.querySelector("#tweet").value;

    if (tweet.trim() === "") {
        showAlert("Un mensaje no puede ir vacio")
        return;
    }

    const tweetObj = {
        id: Date.now(), //Como no tenemos una BD, esto sirve para que cada tweet sea único
        text: tweet
    }

    tweets = [...tweets, tweetObj];

    generateHTML();

    form.reset();
}

const eventListeners = () => {
    form.addEventListener("submit", agregarTweet);

    document.addEventListener("DOMContentLoaded", () => {
        //Para que no devuelva un string por el JSON.Stringify
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];
        generateHTML()
    })
}

eventListeners();