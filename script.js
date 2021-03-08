const searchForm = document.querySelector("#searchForm");
const searchBtn = document.querySelector("#searchBtn");
const clearBtn = document.querySelector("#clearBtn");
const imageCont = document.querySelector("#imageCont");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getQuery();
})

// const getSubmit = () => {
//     (imageCont.firstChild) && clearImages();
//     getQuery();
// }

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
}

const fetchImage = (shows) => {
    for(let result of shows){
        if(result.show.image){
            const img = document.createElement("img");
            img.src = result.show.image.medium;
            imageCont.append(img)
        }
    }
}

clearBtn.addEventListener("click", clearImages)