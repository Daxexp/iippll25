window.addEventListener('load', function() {
  const video = document.getElementById('video');
  const volumeControl = document.getElementById('volume');
  const resizeSelect = document.getElementById('resize');
  const liveBadge = document.getElementById('liveBadge');
  const playerContainer = document.querySelector('.player-container');

  // Set initial volume from range input
  video.volume = volumeControl.value;

  volumeControl.addEventListener('input', function() {
    video.volume = this.value;
  });

  // Handle resize mode selection
  resizeSelect.addEventListener('change', function() {
    // Remove any existing resize classes
    playerContainer.classList.remove('resize-fit', 'resize-fill', 'resize-original', 'resize-6-9');
    const mode = this.value;
    if (mode === "6-9") {
      playerContainer.classList.add('resize-6-9');
    } else {
      playerContainer.classList.add(`resize-${mode}`);
    }
  });

  // Determine if the stream is live. In a real-world scenario, you would parse the HLS manifest
  // For demonstration, we simulate live stream detection based on the stream URL.
  let isLive = false;

  // Example HLS stream URL (replace with your actual stream URL)
  const hlsUrl = 'https://ams.sandbrix.live/LiveApp/streams/vC19gZapiqRVC2ry35467275934172.m3u8';

  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(hlsUrl);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      video.play();
      // Simple simulation: mark as live depending on URL (for demo only)
      if (hlsUrl.includes('test-streams')) {
        isLive = true;
      }
      updateLiveBadge();
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = hlsUrl;
    video.addEventListener('loadedmetadata', function() {
      video.play();
      if (hlsUrl.includes('test-streams')) {
        isLive = true;
      }
      updateLiveBadge();
    });
  } else {
    console.error("HLS is not supported in this browser.");
  }

  // Update the live badge visibility
  function updateLiveBadge() {
    if (isLive) {
      liveBadge.classList.remove('hidden');
    } else {
      liveBadge.classList.add('hidden');
    }
  }
});
