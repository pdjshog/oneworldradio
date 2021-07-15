let player = {
    url: "https://pl-cache.weareone.world/minimal/nowplaying?stream=https://playerservices.streamtheworld.com/api/livestream-redirect/OWR_INTERNATIONAL_ADP.m3u8",
    interval: null,
    init: function () {
        player.polling();
        player.interval = setInterval(function () {
            player.polling()
        }, 60 * 1000);
        player.getStream();

        document.querySelector('#player').remote.watchAvailability(function (available) {
            console.log(available ? "airplay" : "no remote play")
            // document.getElementById("deviceBtn").style.display = available ? "inline" : "none";
        }).catch((e) => {
            console.log(e);
            // document.getElementById("deviceBtn").style.display = "inline";
        });
    },
    polling: function () {
        try {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', player.url, true);
            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let responseData = JSON.parse(xhr.response);
                        document.querySelector('.player-artist-heading').innerHTML = responseData.artist;
                        document.querySelector('.player-artist-title').innerHTML = responseData.title;
                    }
                }
            };
            xhr.send(null);
        } catch (err) {
            console.log(err);
        }
    },
    streamGetUrl: 'https://opml.radiotime.com/Tune.ashx?id=s307749&render=json&listenId=1604657445',
    getStream: function () {
        try {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', player.streamGetUrl, true);
            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let responseData = JSON.parse(xhr.response);
                        document.querySelector('#player').setAttribute('src', responseData.body[0].url);
                        document.querySelector('#player').play();
                    }
                }
            };
            xhr.send(null);
        } catch (err) {
            console.log(err);
        }
    }

}


document.addEventListener("DOMContentLoaded", function (event) {
    player.init();

    document.querySelector('#player').addEventListener("playing", function () {
        document.querySelector('.player-button').classList.remove('player-button-spining');
        document.querySelector('.player-button').classList.add('player-button-pause');
    }, true);
    document.querySelector('#player').addEventListener("loadstart", function () {
        document.querySelector('.player-button').classList.remove('player-button-pause');
        document.querySelector('.player-button').classList.add('player-button-spining');
    }, true);
    document.querySelector('#player').addEventListener("pause", function () {
        document.querySelector('.player-button').classList.remove('player-button-spining');
        document.querySelector('.player-button').classList.remove('player-button-pause');
    }, true);

    document.querySelector('.player-button').addEventListener("click", function () {
        if (document.querySelector('.player-button').classList.contains('player-button-pause')) {
            document.querySelector('#player').pause();
        } else {
            document.querySelector('#player').play();
        }
    });
});

const {ipcRenderer} = require('electron');
ipcRenderer.on('play', (event) => {
    document.querySelector('#player').play();
});

ipcRenderer.on('pause', (event) => {
    document.querySelector('#player').pause();
})