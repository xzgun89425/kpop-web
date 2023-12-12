<script setup>
onMounted(() => {
  var tag = document.createElement("script");
  tag.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById("embed-iframe");
    const options = {
      uri: "spotify:track:4IouQaO9GkaHC7AtMErdSa",
    };
    const callback = (EmbedController) => {
      document.querySelectorAll(".episode").forEach((episode) => {
        episode.addEventListener("click", () => {
          EmbedController.loadUri(episode.dataset.spotifyId);
          EmbedController.play();
        });
      });
    };
    IFrameAPI.createController(element, options, callback);
  };
});
</script>

<template>
  <button
    class="episode"
    data-spotify-id="spotify:track:6fmowbDHpvQ1qw7lp22Xhi"
  >
    Next
  </button>
  <!-- <button
    class="episode"
    data-spotify-id="spotify:track:6fmowbDHpvQ1qw7lp22Xhi"
  >
    play
  </button> -->
  <div class="w-full max-w-[1440px] p-4">
    <div id="embed-iframe"></div>
  </div>
</template>

<style>
</style>