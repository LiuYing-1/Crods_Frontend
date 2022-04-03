<template>
  <div class="introduction">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li class="is-active"><router-link to="/introduction" aria-current="page">Introduction</router-link></li>
      </ul>
    </nav>
    <div class="is-multiline columns">
      <div class="column is-12">
        <h1 class="title">Introduction</h1>
      </div>
      <div class="column is-12">
        <div class="video-container columns is-multiline">
          <div class="column is-2 intro">
            <div class="box">
              <img :src="require('@/assets/logo_black.png')" alt="logo_black.png">
              <div class="content">
                <p class="title has-text-white">FlyMe</p>
                <p class="subtitle has-text-white">Crowdsourcing</p>
                <p class="has-text-white">http://flyme.social/</p>
              </div>
            </div>
          </div>
          <video class="hero-element column is-8" id="hero-video" playsinline poster preload="meta" tabindex="0" muted autoplay loop @click="videoOperation">
            <source src="http://localhost:8000/media/videos/introduction-flymecrods.mp4" type="video/mp4">
          </video>
          <div class="column is-2">
            <div class="box universities">
              <p class="subtitle has-text-white">
                <span>Nanjing Institute of Technology</span>
                <span>University of Oulu</span>
              </p>
              <img :src="require('@/assets/universities_inline.png')" alt="logo_black.png">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Introduction',
  data() {
    return {

    }
  },
  methods: {
    videoOperation() {
      const video = document.getElementById('hero-video')
      if (video.paused) {
        video.play()
      } else {
        video.pause()
      }
    }
  },
  mounted() {
    document.title = "Introduction | FlyMeCrods"
  },
}
</script>

<style scoped>
.video-container .box {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #363636;
}

.intro .box img {
  margin-bottom: 3rem;
}

.universities p {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  writing-mode: vertical-rl;
}

.universities img {
  margin-top: 4rem;
}

video {
  width: 100%;
  height: 100%;
}

video:hover {
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .intro .box {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .intro .box .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .intro .box img {
    width: 30%;
    margin-bottom: 0;
  }

  .universities {
    flex-direction: column;
  }

  .universities p {
    display: flex;
    font-weight: bold;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    writing-mode: horizontal-tb;
  }

  .universities img {
    width: 50%;
    margin-top: 0;
  }
}
</style>