const searchForm = document.querySelector("#searchForm");
const searchBtn = document.querySelector("#searchBtn");
const clearBtn = document.querySelector("#clearBtn");
const imageCont = document.querySelector("#imageCont");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getQuery();
})

const getData = () => {
    return false;
}

const getQuery = async () => {
    const searchText = searchForm.elements.query.value;
    if(searchText && searchText.trim()) {
        (imageCont.firstChild) && clearImages();
        const queryConfig = {
            params: {
                q: searchText
            }
        }
        const res = await axios.get("http://api.tvmaze.com/search/shows",queryConfig);
        fetchImage(res.data);
        searchForm.elements.query.value = "";
    }
    else {
        alert("Search field is blank!");
    }
}

const clearImages = () => {
    while(imageCont.firstChild) {
        imageCont.removeChild(imageCont.lastChild)
    }
    searchForm.elements.query.value = ""
}

const fetchImage = (shows) => {
    for(let result of shows){
        if(result.show.image){
            console.log(result);

            const img_cont = document.createElement("div");
            img_cont.classList.add("col");

            const img_card = document.createElement("div");
            img_card.classList.add("card", "box-shadow");

            const img = document.createElement("img");
            img.src = result.show.image.medium;
            img.classList.add("card-img-top");

            const img_card_body = document.createElement("div");
            img_card_body.classList.add("card-body");

            const img_txt = document.createElement("p");
            img_txt.classList.add("card-text");
            img_txt.title = result.show.name
            img_txt.innerHTML = result.show.name

            imageCont.append(img_cont)
            img_cont.append(img_card)
            img_card.appendChild(img)
            img_card.appendChild(img_card_body)
            img_card_body.appendChild(img_txt)

            revealImages();
        }
    }
}

const revealImages = () => {
    let tempArr = document.getElementsByClassName("card");

    let tl = new TimelineLite();
    tl.staggerTo(tempArr, .75, {
        opacity:1,
        scale: 1,
    }, .15);
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getQuery();
    getData();
})

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearImages();
    getData();
})