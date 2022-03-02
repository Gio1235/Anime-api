const animeNameInp = document.querySelector("#animeName");
const animeSearchBtn = document.querySelector("#searchForAnime");
const cardAreaView = document.querySelector(".card-area")
const  caruselInnerArea = document.querySelector(".carousel-inner")

animeSearchBtn.addEventListener("click", function(){
    var  animeName  = animeNameInp.Value;
   // if (animeName.length > 1)
   // {
        WebService.getDataFromApi(animeName);
   // }

});


class WebService 
{
   static getDataFromApi(animeName)
    {
        var fullApi =`https://api.jikan.moe/v3/search/anime?q=${animeName}&limit=26`;
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open("GET", fullApi,true);
        xmlHttpRequest.onloadend = function(){
            var text = xmlHttpRequest.responseText;
            var result = JSON.parse(text).results;
            ViewController.renderHtmlOnView(result);
            renderSliderItems(result);
        }
        xmlHttpRequest.send()
    }
}

function renderSliderItems(sliderAnimes)
{
    caruselInnerArea.innerHTML=null
    for(var i=0; i<3; i++)
    {
        caruselInnerArea.innerHTML+= getSliderHtml(sliderAnimes[i],i);
    }
}


function getSliderHtml(item,i)
{
    return` <div class="carousel-item ${i==0 ?  'active': ''}">
    <img src="${item.image_url}" 
    class="d-block w-100" alt="...">
  </div>`
}



class ViewController
{
    static renderHtmlOnView(animeCollection)
    {

        cardAreaView.innerHTML=null;
        animeCollection.forEach(o => {
            cardAreaView.innerHTML += ViewController.getAnimeCardHtml(o);  
        });
    }

    static getAnimeCardHtml(item)
    {
       return ` <div class="card">
                        <img src="${item.image_url}">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">${item.synopsis}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Score : ${item.score} </li>
                            <li class="list-group-item">Start Date: ${item.start_date} </li>
                            <li class="list-group-item">End Date: ${item.end_date} </li>
                        </ul>
                        <div class="card-body">
                            <a href="${item.url}" class="card-link">
                            <button class='btn btn-dark btn-lg btn-block'> Go For Anime </button>
                            </a>
                        </div>
                </div> `
    }
}