const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC3aj05GEEyzdOqYM5FLSFeg&part=snippet%2Cid&order=date&maxResults=9';
const content = null || document.getElementById('content')
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8e967ded46mshc9ac78cc80dc212p15e2f0jsn14fb712e3e9a',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};
//Lógica de async: ir por los datos, luego esperar por ellos y finalmente retornarlos hacia el usuario
async function fetchData (urlapi){//siempre async antes de function
    //hacemos uso del fetch() y solo por esta vez le pasamos la opciones 
    const response = await fetch(urlapi, options);
    //estructura de los datos transformandolos en json
    const data = await response.json();
    //retorna la información de la API que estamos solicitando
    return data;
}
// una función que se invoca a sí misma; con JavaScript podemos tener 
// funciones anónimas que permitan llamarse automáticamente,
//  la estructura cuenta con la palabra reservada **async **y con funciones arrows
(async ()=> {
    try {
        const videos = await fetchData(API);
        let view = `
        ${videos.items.map(video =>`
        <a href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank">
            <div class="group relative">
                <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
                </div>
            </div>
        </a>
        `).slice(0, 4).join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);  
    }
})();