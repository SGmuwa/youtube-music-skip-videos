function fetchElement() {

    function reactIfVideo() {

        function isVideo() {
            console.debug("Check is video...")
            // return document.querySelector("#thumbnail").children[0].getAttribute('src').length < 100
            return document.querySelector("#movie_player > div.ytp-chrome-top > button").classList.length == 2
        }

        function addToVideosPlaylist(callback) {

            function openMenuOfSong() {
                return document.querySelector('.middle-controls-buttons > ytmusic-menu-renderer > tp-yt-paper-icon-button').click();
            }

            function openInMenuOfSongAddToPlaylist() {
                return document.querySelector("body > ytmusic-app > ytmusic-popup-container > tp-yt-iron-dropdown:nth-child(2) > div > ytmusic-menu-popup-renderer > tp-yt-paper-listbox").children[4].getElementsByTagName("a")[0].click();
            }

            function searchPlaylistsMenu() {
                return document.querySelector("#top-shelf > ytmusic-carousel-shelf-renderer > div > ytmusic-carousel > div > ul");
            }

            function closeInMenuOfSongAddToPlaylist() {
                document.querySelector("#contentWrapper > ytmusic-add-to-playlist-renderer > div.top-bar.style-scope.ytmusic-add-to-playlist-renderer > tp-yt-paper-icon-button").click();
            }

            console.debug('addToVideosPlaylist...');

            window.setTimeout(
                () => {
                    openMenuOfSong();
                    window.setTimeout(
                        () => {
                            openInMenuOfSongAddToPlaylist();
                            window.setTimeout(() => {
                                let found = false;
                                searchPlaylistsMenu().childNodes.forEach(playlist => {
                                    playlist = playlist.getElementsByClassName('yt-simple-endpoint')[0];
                                    if (playlist.title === '📹👎') {
                                        found = true;
                                        console.debug("playlist found:", playlist);
                                        playlist.click();
                                    }
                                })
                                if (!found) {
                                    closeInMenuOfSongAddToPlaylist();
                                    throw 'Not found playlist «📹👎»';
                                }
                                window.setTimeout(callback, 1000);
                            }, 1000);
                        }, 1000
                    );
                }, 0
            );

        }

        function dislikeAndSkip() {

            function skip() {
                console.debug("Skip...")
                document.querySelector('.next-button').click()
            }

            console.debug("dislike?")

            const dislikeButton = document.querySelector('.ytmusic-player-bar .dislike');

            if(dislikeButton.getAttribute('aria-pressed') !== 'true') {
                console.debug("dislike!")
                dislikeButton.click()
            } else {
                skip()
            }
        }

        if (isVideo()) {
            console.log("dislike and add to playlist music because it's video")
            addToVideosPlaylist(dislikeAndSkip)
        }
    }

    try {
        reactIfVideo();
    } catch (error) {
        console.warn(error)
    }
    window.setTimeout(fetchElement, 5000);
}

fetchElement();
