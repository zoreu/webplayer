// ==UserScript==
// @name         Magnet Link to WebPlayer
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Open magnet links in WebPlayer with hash parameter
// @author       zoreu
// @match        *://*/*
// @namespace    https://raw.githubusercontent.com/zoreu/webplayer/main/magnet2player.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=utorrent.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // List of domains to exclude
    const excludedDomains = ['facebook.com', 'instagram.com'];

    // Function to extract the hash from the magnet link
    function getMagnetHash(magnetLink) {
        const match = magnetLink.match(/magnet:\?xt=urn:btih:([a-zA-Z0-9]+)/);
        return match ? match[1] : null;
    }

    // Function to check if the current domain is excluded
    function isExcludedDomain() {
        return excludedDomains.some(domain => window.location.hostname.includes(domain));
    }

    // Add event listeners to all magnet links if not on an excluded domain
    if (!isExcludedDomain()) {
        document.querySelectorAll('a[href^="magnet:"]').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const magnetLink = link.getAttribute('href');
                const hash = getMagnetHash(magnetLink);

                if (hash) {
                    const newUrl = `https://zoreu.github.io/webplayer/?hash=${hash}`;
                    window.open(newUrl, '_blank');
                }
            });
        });
    }
})();
