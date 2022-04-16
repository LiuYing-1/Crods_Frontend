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
          <p><a href="#comprehensive-part"><b>Comprehension</b></a></p>
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
              This problem is focused on the field of <a>#Informatics</a>, posted 
              by the <a href="https://oulu.fi" target="_blank">University of Oulu</a>. 
              The topic is to build a chatbot that can answer questions to the visitors with
              <a>@ibm-watson</a>. The team leader Liu Ying organized his team to work together
              to build the chatbot within the selected topic - <a>FlyMe</a>, namely the flight 
              booking system. From Software Architecture to the implementation, including testing 
              and delivering, LiuYing spared no effort to it. After two months of work, the chatbot has been 
              successfully deployed and is now available for the users to use. The teacher <b>Ram Prabhat</b>
              from Oulu University also gave a high score to the chatbot - FlyMeYING. The overall score is 5/5.
              <br>
              <b><time datetime="2021-11-21">10:23 PM - 21 Dec 2021</time></b>
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
              This problem is focused on the field of <a>#Informatics</a>, 
              posted by <a href="https://njit.edu.cn" target="_blank">Nanjing Institute of Technology</a>.
              The course taught the basic concepts of <a>@big-data</a> and some technologies like spark and 
              hadoop. LiuYing's team selected the topic - <a>Movie Analytics</a> to analyse the data of
              the movie ratings. They spent several weeks to build the system and test it. At the end of the 
              course, the system was successfully developed with many visiable results by the usage of python.
              That was the first time for Liu Ying to learn echarts and virtual machine. The successful
              result of the project benefits him to improve his programming skills.
              The teacher <b>潘磊</b> from NJIT also scored the system as 97/100.
              <br>
              <b><time datetime="2019-12-03">01:09 PM - 03 Dec 2019</time></b>
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
              This problem is focused on the field of <a>#Informatics</a>,
              posted by <a href="https://njit.edu.cn" target="_blank">Nanjing Institute of Technology</a>.
              The course taught the students the methods to develop the applications on the 
              <a href="https://www.harmonyos.com" target="_blank">#HarmonyOS</a>. After the course, Liu Ying
              choose the topic - <a>FlyMe</a> to build the flight booking system individually. As the cover 
              shown, the application with good-looking UI and comfortable UX. Due to the development of the
              system, Liu Ying got more experience of developing mini-apps. His programming skills and abilities for 
              frontend like CSS, HTML and JavaScript all got imporved. Finally, the responsible teacher <b>彭焕峰</b>
              from NJIT and <b>周新宇</b> from the institute <a>讯方技术</a> scored the system as 92/100.
              <br>
              <b><time datetime="2021-11-21">03:47 PM - 21 Nov 2021</time></b>
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
              The problem is focused on the field of <a>#Health</a>. As this is the photo picked 
              from the Pixels website. So I referenced the photo to the original user <b>Cedric Fauntleroy</b>.
              With the on-going situation of the COVID-19, the people in the world are facing a lot of chances to 
              get infected by the virus. The methods to prevent the infection are very important. The critical one
              is to wear a mask and to wash your hands often.
              <br>
              <b><time datetime="2022-02-28">09:26 PM - 28 Feb 2022</time></b>
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
              The problem is focused on the field of <a>#Health</a>. As this is the photo picked
              from the Pixels website. So I referenced the photo to the original user <b>Anna Shvets</b>.
              According to the survey to the share of the people who have a bad tooth, the percentage of
              the people who have a bad tooth is about 20%. Whatever the price of the treatment, the extent 
              of the pain is very high. Take care them. Brush often, clean often, and eat healthy.
              <br>
              <b><time datetime="2022-02-17">10:19 PM - 17 Feb 2022</time></b>
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
              The problem is focused on the field of <a>#Health</a>. As this is the photo picked
              from the Pixels website. So I referenced the photo to the original user <b>Vladimir Konoplev</b>.
              The tips to a good quality sleep are very important. The most important one is to find a silent 
              place and relax yourself. The second one is to take a rest and to take a deep breath. The third one
              is to avoid using mobile before sleep.
              <br>
              <b><time datetime="2022-03-26">06:56 PM - 26 Mar 2022</time></b>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column is-12" id="comprehensive-part">
        <p class="title">Comprehension</p>
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
              The problem is focused on the field of <a>#Law</a>, posted by 
              <a href="https://www.oulu.fi">Oulu University</a>. At the beginning 
              of the study at this major, the teacher <a>Jouni Markkula</a> taught
              the students that the students should not do anything that is listed 
              in the Misconduct Instructions. Such operations are strictly forbidden
              at any time. After learning the course, Liu Ying, as a freshmen, his 
              thesis based on the topic of the course achieved a grade of 95/100.
              <br>
              <b><time datetime="2018-09-26">08:25 AM - 26 Sep 2018</time></b>
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
              The problem is focused on the field of <a>#Design</a>, posted by
              the <a href="https://njit.edu.cn">Nanjing Institute of Technology</a>
              and <a href="https://www.oulu.fi">Oulu University</a>. The logo is designed by Liu Ying in Spring
              Festival. He inited the project and designed it to be his topic's logo - <a href="/#">FlyMeCrods</a>. 4 different 
              people cover the bulb which with euros in it. The idea of it is that the all the people could bring their ideas
              together to get a better or optimized solution to earn the 
              more benefits.
              <br>
              <b><time datetime="2022-2-15">05:41 PM - 15 Feb 2022</time></b>
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
              The problem is focused on the field of <a>#Others</a>, posted by
              <a href="https://www.oulu.fi">Oulu University</a>. The students of the course
              should know how to conduct a research in a scientific way. Liu Ying read a large
              amount of the research literature and academic articles shared by the teacher 
              <b>Jouni Markkula</b>. Besides, he took many notes after each course.
              Finally, Liu Ying achieved the grade of 5/5 as his continous hardworking.
              <br>
              <b><time datetime="2021-11-11">11:23 AM - 11 Nov 2021</time></b>
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

.card {
  width: 100%;
  height: 100%;
}
</style>