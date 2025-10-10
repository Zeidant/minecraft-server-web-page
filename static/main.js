const onlineStatus = document.querySelector('#onlineStatus');
const playersCounter = document.querySelector('#playersCounter');
const motd = document.querySelector('#motd');
const worldLink = document.querySelector('#worldLink');
const playerName = document.querySelector('#playersName');
const versionServer = document.querySelector('#versionServer');

const urlAPI = "https://api.mcsrvstat.us/2/mc.zeidant.com";

const getAPI = async () => {
    try {
        const data = await fetch(urlAPI);
        const mcinfo = await data.json();

        if(mcinfo.online){
            // ONLINE
            onlineStatus.style.display = 'block';
            onlineStatus.textContent = 'ONLINE';

            motd.style.display = 'block';
            motd.innerHTML = `${mcinfo.motd.html[0]}<br>${mcinfo.motd.html[1]}`;

            playersCounter.style.display = 'block';
            playersCounter.innerHTML = `Players Online: ${mcinfo.players.online}/${mcinfo.players.max}`;

            versionServer.style.display = 'block';
            versionServer.innerHTML = `<span style="color:white;">Version: </span>${mcinfo.version}`;

            playerName.style.display = 'block';
            if(mcinfo.players.list){
        playerName.innerHTML = `
        <th class="text-center">
        <p>Players Names:</p>>
        </th>
        ${mcinfo.players.list.map(data =>{
            return `<tr>
                        <td>${data}</td>
                    </tr>`
        })}`
    }else{
        playerName.textContent = 'No one on server'
    }
            worldLink.style.display = 'block';
            worldLink.textContent = 'Go to map';
            worldLink.href = 'https://mapa.zeidant.com';
            worldLink.style.pointerEvents = 'auto';
            worldLink.style.color = 'white';
            worldLink.classList.add('rainbow_text_animated', 'link');
        } else {
            // OFFLINE → ocultamos todo excepto el worldLink en rojo
            onlineStatus.style.display = 'none';
            motd.style.display = 'none';
            playersCounter.style.display = 'none';
            versionServer.style.display = 'none';
            playerName.style.display = 'none';

            worldLink.style.display = 'block';
            worldLink.textContent = 'OFFLINE';
            worldLink.removeAttribute('href');
            worldLink.style.pointerEvents = 'none';
            worldLink.style.color = 'red';
            worldLink.classList.remove('rainbow_text_animated', 'link');
        }

        console.log(mcinfo);
    } catch (error) {
        console.error('Error fetching API:', error);
        // Si falla la API, mostrar OFFLINE
        onlineStatus.style.display = 'none';
        motd.style.display = 'none';
        playersCounter.style.display = 'none';
        versionServer.style.display = 'none';
        playerName.style.display = 'none';

        worldLink.style.display = 'block';
        worldLink.textContent = 'OFFLINE';
        worldLink.removeAttribute('href');
        worldLink.style.pointerEvents = 'none';
        worldLink.style.color = 'red';
        worldLink.classList.remove('rainbow_text_animated', 'link');
    }
};

getAPI();
