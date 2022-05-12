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
          <video class="hero-element column is-8" id="hero-video" playsinline poster preload="meta" tabindex="0" autoplay loop @click="videoOperation">
            <source :src="`${this.BACKEND_URL}media/videos/introduction-flymecrods.mp4`" type="video/mp4">
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
      <div class="column is-12">
        <h1 class="title">Introduction</h1>
      </div>
      <div class="column is-12" id="abstract">
        <div class="box">
          <p class="subtitle"><b>Abstract</b></p>
          <p>
            FlyMeCrods is the abbreviation of the FlyMe Crowdsourcing. It is a combined term with <b>FlyMe</b> and <b>Crowdsourcing</b>.
            FlyMe is the topic of author(<a>@liuying</a>) original work from the previous course. Liu Ying has successfully requested the
            domain name <b>flyme.social</b> from <a href="https://www.name.com" target="_blank"><b>Name.com</b></a> with the usage of the 
            student identification of the university of Oulu. With using this name, it will be very easy for Liu Ying to deploy the platform
            on the internet after the development. While, the second word is actually the key to the platform created by Liu Ying, <b>Crowdsourcing</b>. The common
            is a way of solving problems and producing things by connecting online with people that you otherwise wouldn't know. There are 4 different 
            ways of Crowdsourcing works. The first enables access a large online group before. You can identify a selected worker and just post your work.
            The worker then finds you. And this is also the way of this platform has taken. The similar platform using this mechanism is 
            <a href="https://zhongbao.aliyun.com" target="_blank"><b>阿里云众包</b></a>. With using this sort of Crowdsourcing, anyone can get help from 
            other people that never known before via the internet. Thus, this is obviously the slogan listed in the header of the platform, 
            <b><u>"An amazing way to put many minds to work in solving though problems."</u></b>
          </p>
        </div>
      </div>
      <div class="column is-12" id="instructions">
        <div class="box">
          <p class="subtitle"><b>Instructions</b></p>
          <div class="normal-instruction">
            <p><b>Normal Client</b></p>
            <p>
              To enjoy the services provided by FlyMeCrods, all the visitors should be the member of the platform first.
              The first step is to register an account on the platform. After that, you can login to the platform and then,
              start to post your work and pick up the problems from other people. Also, they could communicate to each other
              after the email registration on the platform. Moreover, each of you guys can also post comments to the problems.
              Accordingly, you can also reply to the comments. Also, you can access the users' profile to get their detailed 
              information like their email, passed solutions rate, etc., to seek the opportunities.
            </p>
          </div>
          <div class="poster-instruction mt-3">
            <p><b>1. Poster</b></p>
            <p>
              When you act the role of poster, you can post your problem via the <router-link to="/post"><b>Problem-Posted</b></router-link> Module in 1 min. There
              is no limitations on the number of problems posted once a time. After each problem posted, Platform will take 
              the according money from your account. This is the moment that FlyMeCrods begins to monitor your problem. Your 
              posted problems will be displayed on the <router-link to="/marketplace"><b>Market</b></router-link> Module. Everybody can access and add it and to their own 
              <router-link to="/checklist"><b>ready-to-solve</b></router-link> carts. After that, what the poster has to do is to wait for FlyMeCrods to allow someone To
              solve the problem. If there are a lot of people would like to solve the problem at the same time, the platform will
              inform you by the FlyMeCrods Email Portal. And then you can participate into the selecting process to determine who to 
              solve your problem. Poster cannot edit the problem information after the problem has been picked by someone. Then, 
              the poster only just wait for the submitted solution and check the process in <b>Problem-Edit</b> Module. Poster can communicate with the picker by 
              the <b>FlyMeCrods Email Portal</b> during the session to discuss a better solution or add something new. After the answer has been submitted, the poster can
              choose to accept or reject the solution. If the poster choose to accept the solution, the money will be distributed to the picker after FlyMeCrods
              auditing the session. Also, the poster can only download the solution file after accepted the solution. If the poster choose to reject,
              the money will be returned to the poster after FlyMeCrods auditing the session. However, the poster cannot access the solution file submitted
              by the picker after the solution has been accepted. <br />
              <b>* Speical Situation - Expired</b>: If the poster's problem has not been picked by anyone before the deadline, the poster can edit it to extend 
              the deadline so that the picker can pick it. Or, the poster can communicate with the Admin to delete the problem and then money will be returned 
              to the poster.<br />
              <b>* Speical Situation - Missed Submitted Deadline</b>: If the poster's problem hasn't been finished after someone picked it, FlyMeCrods will lock the 
              problem and the poster will get the total mount of the money: 1.1 * the price of the problem.
            </p>
          </div>

          <div class="picker-instruction mt-3">
            <p><b>2. Picker</b></p>
            <p>
              When you act the role of picker, you can pick your problem via the <router-link to="/marketplace"><b>Market</b></router-link> Module. 
              There is a filter for you to scale down the target problems. For example, if you would like to pick the problem related to Informatics,
              you can filter the problems by the <b>Informatics</b> tag. Then, FlyMeCrods will push you with all problems in the field of Informatics.
              You can add many problems into your <router-link to="/checklist"><b>ready-to-solve</b></router-link> carts. However, when comes to the 
              confirmation part, you must choose one to pick as this mechanism will protect the environment of the platform. You need to fill out the
              form with your motivation to do the problem and then waiting for the notification of FlyMeCrods. If you get the offer from FlyMeCrods,
              your status will be set to Busy, that means you cannot picked any problem untill you finish the current one. You can use FlyMeCrods Email 
              Portal to communicate with the poster during the session. You can change your answer all the time before the poster accept or reject your solution.
              If your answer is accepted, the money will be distributed to the picker after FlyMeCrods auditing the session. If your answer is rejected, 
              the money will be returned to the poster.<br />
              <b>* Speical Situation - Missed Submitted Deadline</b>: If you have already picked the problem, but missed the deadline, FlyMeCrods will lock the
              problem and you will get punished with paying 0.1 * the price of the problem to the poster. <b>NB!!!</b> If you always behave in this way, you will be
              banned from the platform.
            </p>
          </div>
        </div>
      </div>

      <div class="column is-12" id="notification">
        <div class="box">
          <p class="subtitle"><b>Notification</b></p>
          <p>
            FlyMeCrods Admin (YING) has the master level of the platform. If you have any questions, please contact him via the FlyMeCrods Email: 
            <b>admin@crods.flyme.social</b>.
          </p>
          <p class="mt-3">
            This is the Graduation Project created by Liu Ying, who is majoring in Software Engineering 
            (Sino-Cooperative Education Programme with University of Oulu). <br /> 
            <b>NJIT-ID: 202181224, OULU-ID: 2607883</b>
          </p>
        </div>
      </div>
    </div>

    <!-- Div to SideBar -->
    <div class="sidebar side-part">
      <div class="sidebar-item">
        <div class="sidebar-item-header">
          <p class="sidebar-item-header-text">
            <b>Page Instructor</b>
          </p>
        </div>
        <hr>
        <div class="sidebar-item-content">
          <div class="sidebar-item-content-item">
            <p class="sidebar-item-content-item-text">
              <b><i class="fas fa-dot-circle"></i></b>
            </p>
          </div>
          <div class="sidebar-item-content-item mt-3">
            <p class="sidebar-item-content-item-text">
              <b><i class="fas fa-dot-circle"></i></b>
            </p>
          </div>
          <div class="sidebar-item-content-item mt-3">
            <p class="sidebar-item-content-item-text">
              <b><i class="fas fa-dot-circle"></i></b>
            </p>
          </div>
          <div class="sidebar-item-content-item mt-3">
            <p class="sidebar-item-content-item-text">
              <b><i class="fas fa-dot-circle"></i></b>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar main-part">
      <div class="sidebar-item">
        <div class="sidebar-item-header">
          <p class="sidebar-item-header-text">
            <b>FlyMeCrods Intro</b>
          </p>
        </div>
        <hr>
        <div class="sidebar-item-content">
          <div class="sidebar-item-content-item">
            <p class="sidebar-item-content-item-text">
              <b><a href="#hero_video">Video</a></b>
            </p>
          </div>
          <div class="sidebar-item-content-item mt-3">
            <p class="sidebar-item-content-item-text">
              <b><a href="#abstract">Abstract</a></b>
            </p>
          </div>
          <div class="sidebar-item-content-item mt-3">
            <p class="sidebar-item-content-item-text">
              <b><a href="#instructions">Instruction</a></b>
            </p>
          </div>
          <div class="sidebar-item-content-item mt-3">
            <p class="sidebar-item-content-item-text">
              <b><a href="#notification">Notification</a></b>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {BACKEND_URL} from '../assets/js/commons.js';
export default {
  name: 'Introduction',
  data() {
    return {
      BACKEND_URL,
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
      video.classList.toggle('muted')
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

#abstract .box {
  background-color: #00d1b2;
}

#notification .box {
  background-color: #f03a5f;
}

#notification .box p {
  color: #fff;
}

/* Sidebar */
/* Hover to show sidebar */
.main-part {
  position: fixed;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  top: 3.5rem;
  left: -10rem;
  width: 10rem;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  z-index: 0;
  transition: all 0.6s;
}

.side-part {
  position: fixed;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  top: 3.5rem;
  left: 0rem;
  width: 2.8rem;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  z-index: 1;
  transition: all 0.6s;
}

.side-part .sidebar-item-header p {
  writing-mode: tb-rl;
}

.side-part .sidebar-item-content, .main-part .sidebar-item-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sidebar a {
  color: #363636;
}

.sidebar-item-content-item {
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 0.2rem;
}

.sidebar .sidebar-item-content-item:hover {
  background-color: rgba(83, 241, 162, 0.76);
  transition: all 0.6s;
}

.sidebar .sidebar-item-content-item:hover a {
  color: darkgray;
  transition: all 0.6s;
}

.side-part:hover {
  opacity: 0;
  z-index: 0;
}

.side-part:hover + .main-part {
  transform: translateX(10rem);
  z-index: 1;
  transition: all 0.6s;
}

.main-part:hover {
  transform: translateX(10rem);
  z-index: 1;
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

  .side-part {
    width: 1.4rem;
  }
}
</style>