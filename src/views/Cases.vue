<template>
  <div class="cases">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li class="is-active"><router-link to="/cases" aria-current="page">Cases</router-link></li>
      </ul>
    </nav>
    
    <div class="columns is-multiline">
      <div class="column is-12 fields">
        <div class="box">
          <p><a href="#informatics-part"><b>Informatics</b></a></p>
          <p><a href="#health-part"><b>Health</b></a></p>
          <p><a href="#comprehensive-part"><b>Comprehensive</b></a></p>
        </div>
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column is-12" id="informatics-part">
        <p class="title">Informatics</p>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="require('@/assets/chatbot_with_ibm_4by3.png')" alt="Chatbot with IBM">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Chatbot with IBM Watson Assistant</p>
                <p class="subtitle is-6">@liuying</p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@ibm-watson</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2021-11-21">10:23 PM - 21 Dec 2021</time>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="require('@/assets/movie_with_bigdata_4by3.png')" alt="Movie Analytics with BDT">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Movie Analytics with Big Data Tech</p>
                <p class="subtitle is-6">@liuying</p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2019-12-03">01:09 PM - 03 Dec 2019</time>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="require('@/assets/app_with_harmonyos_4by3.png')" alt="Hormony OS app">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Harmony OS Application Dev</p>
                <p class="subtitle is-6">@liuying</p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2021-11-21">03:47 PM - 21 Nov 2021</time>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column is-12" id="health-part">
        <p class="title">Health</p>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="require('@/assets/methods_with_covid19_4by3.jpg')" alt="Method to Prevent Covid">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Methods to Prevent the Infectious</p>
                <p class="subtitle is-6">Photo from @cedric.fauntleroy</p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2022-02-28">09:26 PM - 28 Feb 2022</time>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="require('@/assets/stomatology_4by3.jpg')" alt="Stomatology">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Take Care of Your Teeth</p>
                <p class="subtitle is-6">Photo from @anna.shvets</p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2022-02-17">10:19 PM - 17 Feb 2022</time>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="require('@/assets/good_sleep_4by3.jpg')" alt="Good Sleep">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Tips for A High-Quliaty Sleep</p>
                <p class="subtitle is-6">Photo from @vladimir.konoplev</p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2022-03-26">06:56 PM - 26 Mar 2022</time>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column is-12" id="comprehensive-part">
        <p class="title">Comprehensive</p>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="require('@/assets/misconduct_in_finland_4by3.png')" alt="Misconduct Instruction">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Misconduct in University of Oulu</p>
                <p class="subtitle is-6">@liuying</p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2018-09-26">08:25 AM - 26 Sep 2018</time>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="require('@/assets/logo_4by3.png')" alt="Logo Design">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Logo Design for FlyMe Crods</p>
                <p class="subtitle is-6">@liuying</p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2022-2-15">05:41 PM - 15 Feb 2022</time>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="require('@/assets/introduction_to_research_work_4by3.png')" alt="Research Work">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Approaches to Conduct A Research</p>
                <p class="subtitle is-6">@liuying</p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <time datetime="2021-11-11">11:23 AM - 11 Nov 2021</time>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cases',
  data() {
    return {

    }
  },
  mounted() {
    document.title = "Cases | FlyMeCrods"
  },
}
</script>

<style scoped>
.fields .box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #363636;
}

.fields a {
  color: white;
}

.fields a:hover {
  text-decoration: underline;
  color: #00d1b2;
  transform: scale(1.1);
  transition: all 0.6s;
}
</style>