// JavaScript code to create the HTML structure dynamically

// Create and append the <head> section
const head = document.head;

const metaCharset = document.createElement('meta');
metaCharset.setAttribute('charset', 'UTF-8');
head.appendChild(metaCharset);

const metaViewport = document.createElement('meta');
metaViewport.setAttribute('name', 'viewport');
metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
head.appendChild(metaViewport);

const title = document.createElement('title');
title.textContent = 'TV Channels';
head.appendChild(title);

const style = document.createElement('style');
style.textContent = `
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #121212;
        color: #ffffff;
        transition: background-color 0.5s ease, color 0.5s ease;
        overflow-x: hidden; /* Prevent horizontal scrolling */
        user-select: none; /* Disable text selection */
    }

    .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        padding-top: 60px; /* Add padding to avoid content being hidden behind the bar */
    }

    .bar {
        width: 100%;
        background-color: #ffffff;
        color: #121212;
        border-bottom: 2px solid #ff0000;
        padding: 10px 0;
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        transition: background-color 0.5s ease, color 0.5s ease;
    }

    .theme-toggle {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .theme-toggle input {
        display: none;
    }

    .switch {
        display: inline-block;
        width: 60px;
        height: 34px;
        background-color: #ccc;
        border-radius: 34px;
        position: relative;
        transition: background-color 0.3s;
    }

    .switch::before {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 30px;
        height: 30px;
        background-color: #ffffff;
        border-radius: 50%;
        transition: transform 0.3s;
    }

    input:checked + .switch {
        background-color: #4CAF50;
    }

    input:checked + .switch::before {
        transform: translateX(26px);
    }

    .emoji {
        margin-left: 10px;
        font-size: 24px;
    }

    .channels {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
    }

    .channel {
        background-color: #1e1e1e;
        border-radius: 10px;
        overflow: hidden;
        width: 200px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
    }

    .channel:hover {
        transform: scale(1.08);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

    .channel img {
        width: 100%;
        height: auto;
    }

    .channel h2 {
        margin: 10px 0;
    }

    .channel .play-button {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        background: rgba(255, 0, 0, 0.7);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        color: white;
        font-size: 24px;
        line-height: 50px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        transition: opacity 0.5s, transform 0.5s, box-shadow 0.5s;
        opacity: 0;
    }

    .channel:hover .play-button {
        display: block;
        transform: translate(-50%, -50%) scale(1.1);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        opacity: 1;
    }

    .footer {
        text-align: center;
        padding: 20px 0;
        margin-top: 20px;
    }

    .footer p {
        margin: 0;
    }

    .player-section {
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
    }

    .back-button {
        position: absolute;
        top: 20px;
        left: 20px;
        background-color: #ffffff;
        color: #121212;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: background-color 0.3s, color 0.3s;
    }

    .back-button:hover {
        background-color: #ff0000;
        color: #ffffff;
    }

    .player {
        width: 80%;
        max-width: 800px;
        height: 450px;
        background-color: #000;
    }

    /* Light mode styles */
    .light-mode {
        background-color: #f0f0f0 !important;
        color: #333 !important;
    }

    .light-mode .container {
        background-color: transparent;
    }

    .light-mode .bar {
        background-color: #000000;
        color: #ffffff;
    }

    .light-mode .channel {
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .light-mode .channel:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .light-mode .footer {
        color: #666;
    }

    .light-mode .theme-toggle .switch {
        background-color: #ccc;
    }

    .light-mode .theme-toggle input:checked + .switch {
        background-color: #4CAF50;
    }

    .light-mode .theme-toggle input:checked + .switch::before {
        background-color: #ffffff;
    }

    .light-mode .player-section {
        background-color: rgba(255, 255, 255, 0.8);
    }

    .light-mode .back-button {
        background-color: #000000;
        color: #ffffff;
    }

    .light-mode .back-button:hover {
        background-color: #ff0000;
        color: #ffffff;
    }

    /* Responsive styles */
    @media (max-width: 768px) {
        .channel {
            width: 45%;
        }

        .player {
            width: 95%;
            height: auto;
        }

        .back-button {
            width: 80px;
            font-size: 14px;
            padding: 8px 16px;
        }
    }

    @media (max-width: 480px) {
        .channel {
            width: 100px; /* Smaller tiles for mobile view */
        }

        .channel h2 {
            font-size: 14px; /* Smaller font size for channel names */
        }

        .channel .play-button {
            width: 30px; /* Smaller play button for mobile view */
            height: 30px;
            font-size: 16px;
            line-height: 30px;
        }

        .player {
            width: 100%;
            height: auto;
        }

        .back-button {
            width: 60px;
            font-size: 12px;
            padding: 6px 12px;
        }

        .bar {
            font-size: 1.2rem;
        }

        .switch {
            width: 40px; /* Smaller switch for mobile view */
            height: 20px;
        }

        .switch::before {
            width: 18px;
            height: 18px;
        }

        .emoji {
            font-size: 18px; /* Smaller emoji for mobile view */
            margin-left: 5px; /* Adjust margin for better alignment */
        }
    }
`;
head.appendChild(style);

// Create and append the <body> section
const body = document.body;

const bar = document.createElement('div');
bar.className = 'bar';
bar.textContent = 'TV Channels';

const themeToggle = document.createElement('div');
themeToggle.className = 'theme-toggle';

const themeSwitch = document.createElement('input');
themeSwitch.type = 'checkbox';
themeSwitch.id = 'theme-switch';
themeSwitch.addEventListener('change', toggleTheme);
themeToggle.appendChild(themeSwitch);

const themeSwitchLabel = document.createElement('label');
themeSwitchLabel.className = 'switch';
themeSwitchLabel.htmlFor = 'theme-switch';
themeToggle.appendChild(themeSwitchLabel);

const emoji = document.createElement('span');
emoji.className = 'emoji';
emoji.textContent = '🌙';
themeToggle.appendChild(emoji);

bar.appendChild(themeToggle);
body.appendChild(bar);

const container = document.createElement('div');
container.className = 'container';

const channelsDiv = document.createElement('div');
channelsDiv.className = 'channels';

const channels = {
            "TV Derana": "https://edge2-moblive.yuppcdn.net/transhd2/smil:detv04.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToyMzozMCBBTSZoYXNoX3ZhbHVlPXN0aU85Umg2R1ZCMzZ0Y0lkVStmZ0E9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfNF8tMSZzdHJtX2xlbj0yNQ==",
            "Sirasa TV": "https://edge3-moblive.yuppcdn.net/transsd/smil:sirtv09.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxMzo1MyBBTSZoYXNoX3ZhbHVlPWxTdVZPMHpONjVtTHkzTS9MWjkvUEE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfOV8tMSZzdHJtX2xlbj0yNQ==",
            "Hiru TV": "https://edge2-moblive.yuppcdn.net/transhd2/smil:hitv17.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxNzo0MiBBTSZoYXNoX3ZhbHVlPWF2aHYvSjRsOWFxYTg0Tkt2RENnM3c9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMTdfLTEmc3RybV9sZW49MjU=",
            "Swarnawahini": "https://edge2-moblive.yuppcdn.net/transsd/smil:swani06.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxMjo0MCBBTSZoYXNoX3ZhbHVlPS93UE1pSUx0bXBsYk82Z1RiL2krUEE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfNl8tMSZzdHJtX2xlbj0yNQ==",
            "ITN": "https://edge3-moblive.yuppcdn.net/transsd/smil:itn43.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxMDo1MyBBTSZoYXNoX3ZhbHVlPW9MeHp3dnh6eWNPY0pPR2tieGZtYkE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfNDNfLTEmc3RybV9sZW49MjM=",
            "Star TV": "https://edge2-moblive.yuppcdn.net/trans1sd/smil:strtml19.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMTo0NjoxMiBBTSZoYXNoX3ZhbHVlPU9tZmExdkd1N3R3TjN0QkdBT21hT3c9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMTlfLTEmc3RybV9sZW49Mjc=",
            "Music TV": "https://edge2-moblive.yuppcdn.net/trans1sd/smil:muptv14.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMTo0MDoyNCBBTSZoYXNoX3ZhbHVlPWFUWTBmSGRkZk5pbjZjalk3L3BreUE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMTRfLTEmc3RybV9sZW49MjY=",
            "SLT": "https://edge3-moblive.yuppcdn.net/transsd/smil:sltgroupwatchaes.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTQvMjAyNSAwNDowMzozOCBQTSZoYXNoX3ZhbHVlPW9CMWlMWXRjVnJ5azJWS0dMbzFieVE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8xNzQzNTlfZDQxYjI4YTItYTgyZS0yY2FhLWUzY2ItNjU4MTNmYTc2MmE3X0xLXzExMS4yMjMuMTg5LjUwX3NsdF8xX2NoYW5uZWxfNDZfLTEmc3RybV9sZW49MzQ=",
            "Pragna TV": "https://edge1-moblive.yuppcdn.net/trans1sd/smil:pragtv34.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToyNDozOCBBTSZoYXNoX3ZhbHVlPUpObWYrMVpjc3lVVmVBZThaeTZidVE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMzRfLTEmc3RybV9sZW49Mjc=",
            "Rupawahini": "https://edge3-moblive.yuppcdn.net/transsd/smil:runi01.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToyMzowNiBBTSZoYXNoX3ZhbHVlPXpRTTl0NVg2YndRMTdBbzhxZERqNkE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMV8tMSZzdHJtX2xlbj0yNA==",
            "Shardha TV": "https://edge2-moblive.yuppcdn.net/trans1sd/smil:shartv29.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToyMToxNiBBTSZoYXNoX3ZhbHVlPTJ1Y2VVNlpGblR2Z2pTMDB1WDcrWEE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMjlfLTEmc3RybV9sZW49Mjc=",
            "Jaya TV": "https://edge2-moblive.yuppcdn.net/transsd/smil:jatv27.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToyMDo0MyBBTSZoYXNoX3ZhbHVlPXlJRUJHZWFjM1lldEt1eWhnMkNNL2c9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMjdfLTEmc3RybV9sZW49MjQ=",
            "Verbum TV": "https://edge3-moblive.yuppcdn.net/trans1sd/smil:vertv26.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToyMDoyOCBBTSZoYXNoX3ZhbHVlPWs2RFhlcHlhUVBKZzRrekJ6WVNJVlE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMjZfLTEmc3RybV9sZW49MjY=",
            "ChannelEye": "https://edge3-moblive.yuppcdn.net/trans1sd/smil:nettv15.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxNjoxNiBBTSZoYXNoX3ZhbHVlPTR2Z1BjWnlYR2tPM3BDZXpIZUd5NHc9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMTVfLTEmc3RybV9sZW49MjY=",
            "AdaDerana24x7": "https://edge2-moblive.yuppcdn.net/transsd/smil:addetv13.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxNToyNCBBTSZoYXNoX3ZhbHVlPXlCdHRFNHAyOGllVmFQa012TWY1ZUE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMTNfLTEmc3RybV9sZW49MjY=",
            "TNL": "https://edge3-moblive.yuppcdn.net/transsd/smil:tnl12.smil/playlist.m3u8?dvr&wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxNTowMiBBTSZoYXNoX3ZhbHVlPW1Qd0NFNnZLWDRFVmp3OGhSTjVKVFE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMTJfLTEmc3RybV9sZW49MjM=",
            "TV1": "https://edge3-moblive.yuppcdn.net/trans1sd/smil:tv111.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxNDo0MCBBTSZoYXNoX3ZhbHVlPUlxK3krZG9ITzkxRUV4UkVGSmlwK2c9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMTFfLTEmc3RybV9sZW49MjQ=",
            "Shakthi TV": "https://edge2-moblive.yuppcdn.net/transsd/smil:saktv10.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxNDoxNCBBTSZoYXNoX3ZhbHVlPUFaUmRiNGFicExGV1VJVm5qR1JVRmc9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMTBfLTEmc3RybV9sZW49MjU=",
            "Siyatha TV": "https://edge3-moblive.yuppcdn.net/transhd2/smil:siytv08.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxMzozMiBBTSZoYXNoX3ZhbHVlPWpZc0RFYjBVWEcxa2FqZ1pRQUNmSlE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfOF8tMSZzdHJtX2xlbj0yNg==",
            "Wasantham TV": "https://edge2-moblive.yuppcdn.net/trans1sd/smil:vatv07.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxMzoxMCBBTSZoYXNoX3ZhbHVlPXVyRjZEUXhmRFdHVTZxZTZQaERlZWc9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfN18tMSZzdHJtX2xlbj0yNQ==",
            "Charana TV": "https://edge3-moblive.yuppcdn.net/transhd2/smil:chtv05.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxMjoxNCBBTSZoYXNoX3ZhbHVlPW9UZE1qQ3ZKb0d4d0tOK2ROSENMaEE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfNV8tMSZzdHJtX2xlbj0yNQ==",
            "Nethra TV": "https://edge2-moblive.yuppcdn.net/transsd/smil:chii02.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxMToxNiBBTSZoYXNoX3ZhbHVlPVpNTXZOREhoeFQ4L0hmRlBkNm1lWFE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMl8tMSZzdHJtX2xlbj0yNA==",
            "Buddhist TV": "https://edge3-moblive.yuppcdn.net/trans1sd/smil:dbud28.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMTowNjoxMSBBTSZoYXNoX3ZhbHVlPWNZbXlrc0x1YzN3bkNDdFdmbjFnaHc9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMjhfLTEmc3RybV9sZW49MjU="
};

function createChannel(channelKey, channelLogo, channelName) {
    const channel = document.createElement('div');
    channel.className = 'channel';
    channel.setAttribute('data-key', channelKey);

    const img = document.createElement('img');
    img.src = channelLogo;
    img.alt = `${channelName} Logo`;
    channel.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = channelName;
    channel.appendChild(h2);

    const button = document.createElement('button');
    button.className = 'play-button';
    button.textContent = '▶';
    button.addEventListener('click', () => playChannel(channelKey));
    channel.appendChild(button);

    return channel;
}

channelsDiv.appendChild(createChannel('TV Derana', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/derana.png', 'TV Derana'));
channelsDiv.appendChild(createChannel('Sirasa TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/ucihva.png', 'Sirasa TV'));
channelsDiv.appendChild(createChannel('Hiru TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/hiru-tv.png', 'Hiru TV'));
channelsDiv.appendChild(createChannel('Swarnawahini', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/ddcjju.png', 'Swarnawahini'));
channelsDiv.appendChild(createChannel('ITN', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/ducchq.png', 'ITN'));
channelsDiv.appendChild(createChannel('Star TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/vztqoe.png', 'Star TV'));
channelsDiv.appendChild(createChannel('Music TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/music-television.png', 'Music TV'));
channelsDiv.appendChild(createChannel('SLT', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/twkwpt.png', 'SLT'));
channelsDiv.appendChild(createChannel('Pragna TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/pragna-tv.png', 'Pragna TV'));
channelsDiv.appendChild(createChannel('Rupawahini', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/rupavahini.png', 'Rupawahini'));
channelsDiv.appendChild(createChannel('Shardha TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/mvfdxj.png', 'Shardha TV'));
channelsDiv.appendChild(createChannel('Jaya TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/ppkeyw.png', 'Jaya TV'));
channelsDiv.appendChild(createChannel('Verbum TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/verbum-tv.png', 'Verbum TV'));
channelsDiv.appendChild(createChannel('ChannelEye', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/fhuhab.png', 'ChannelEye'));
channelsDiv.appendChild(createChannel('AdaDerana24x7', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/ada-derana-24.png', 'AdaDerana24x7'));
channelsDiv.appendChild(createChannel('TNL', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdcQj9w0VyOAgD7wwyCze0adezDmRm2F6P0cmX22tNFOvXtO9X5gPJRZQ&usqp=CAE&s', 'TNL'));
channelsDiv.appendChild(createChannel('TV1', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/vjtiwc.png', 'TV1'));
channelsDiv.appendChild(createChannel('Shakthi TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/dmikwb.png', 'Shakthi TV'));
channelsDiv.appendChild(createChannel('Siyatha TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/twchnq.png', 'Siyatha TV'));
channelsDiv.appendChild(createChannel('Wasantham TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/ngfsik.png', 'Wasantham TV'));
channelsDiv.appendChild(createChannel('Charana TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/djwqoh.png', 'Charana TV'));
channelsDiv.appendChild(createChannel('Nethra TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/udbacm.png', 'Nethra TV'));
channelsDiv.appendChild(createChannel('Buddhist TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/the-buddhist.png', 'Buddhist TV'));

container.appendChild(channelsDiv);
body.appendChild(container);

const footer = document.createElement('div');
footer.className = 'footer';

const footerP = document.createElement('p');
footerP.innerHTML = '&copy; 2k25 TV Channels. All rights reserved.';
footer.appendChild(footerP);
body.appendChild(footer);

function toggleTheme() {
    const body = document.body;
    const emoji = document.querySelector('.theme-toggle .emoji');
    const isLightMode = document.getElementById('theme-switch').checked;
    if (isLightMode) {
        body.classList.add('light-mode');
        emoji.textContent = '☀️';
    } else {
        body.classList.remove('light-mode');
        emoji.textContent = '🌙';
    }
}

function playChannel(channelKey) {
    const channelName = document.querySelector(`.channel[data-key="${channelKey}"] h2`).textContent;
    const streamURL = channels[channelKey];
    window.location.href = `player.html?channel=${encodeURIComponent(channelName)}&stream=${encodeURIComponent(streamURL)}`;
}
