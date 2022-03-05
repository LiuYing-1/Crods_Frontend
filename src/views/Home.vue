<template>
  <div class="home">

    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li class="is-active"><router-link to="/" aria-current="page">Home</router-link></li>
      </ul>
    </nav>

    <section class="hero is-medium is-dark">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          Welcome to FlyMeCrods!
        </p>
        <p class="subtitile">
          An amazing way to put many minds to work in solving though problems.
        </p>
      </div>
    </section>

    <section class="hero is-medium has-carousel">
      <div class="hero-carousel" id="carousel">
        <div class="item-1">
          <div class="imgContainer">
            <img :src="require('@/assets/copenhagen.jpg')" alt="Copenhagen" @load="bulmaCarousel" class="back-img">
            <div class="slogan-box">
              <div class="slogan-text">
                <i><b>IDEAS</b></i>
              </div>
            </div>
          </div>
        </div>
        <div class="item-2">
          <div class="imgContainer">
            <img :src="require('@/assets/london.jpg')" alt="London" class="back-img">
            <div class="slogan-box">
              <div class="slogan-text">
                <i><b>SOLUTIONS</b></i>
              </div>
            </div>
          </div>
        </div>
        <div class="item-3">
          <div class="imgContainer">
            <img :src="require('@/assets/snow.jpg')" alt="Snow" @load="bulmaCarousel" class="back-img">
            <div class="slogan-box">
              <div class="slogan-text">
                <i><b>CHOICES</b></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-head">
        <img :src="require('@/assets/logo.png')" alt="logo" class="logo">
      </div>
      <div class="hero-body"></div>
      <div class="hero-foot"></div>
    </section>

    <div class="cards">
      <div class="card" id="card-1">
        <header class="card-header">
          <div class="card-header-title">
            <span class="icon">
              <i class="far fa-paper-plane"></i>
            </span>
            <span>Faster</span>
          </div>
          <button class="card-header-icon" @click="openDropPart">
            <span class="icon">
              <i class="fas fa-angle-down"></i>
            </span>
          </button>
        </header>
        
        <div class="card-content" id="content-1">
          <div class="content">
            <p class="subtitle"><b>1 to 1 Service</b></p>
            <p>FlyMeCrods strictly follows the <b>1 to 1 Service</b> principle.
              <b>For the client</b>, he/she can only choose one problem to solve at a time.
              <b>For the sponsor</b>, the submitted problem will be invisible to the other client after selection.
            </p>
          </div>
        </div>
      </div>

      <div class="card" id="card-2">
        <header class="card-header">
          <div class="card-header-title">
            <span class="icon">
              <i class="far fa-thumbs-up"></i>
            </span>
            <span>Sound</span>
          </div>
          <button class="card-header-icon" @click="openDropPart">
            <span class="icon">
              <i class="fas fa-angle-down"></i>
            </span>
          </button>
        </header>
        <div class="card-content" id="content-1">
          <div class="content">
            <p class="subtitle"><b>Trusted Co-worker</b></p>
            <p>
              All the users of FlyMeCrods are <b>trusted co-workers</b>. 
              Importantly, FlyMeCrods will push the related problems to the proficient co-workers.
              It is wise for suitable co-workers to solve the corresponding problems.
            </p>
          </div>
        </div>
      </div>
      <div class="card" id="card-3">
        <header class="card-header">
          <div class="card-header-title">
            <span class="icon">
              <i class="fas fa-check-double"></i>
            </span>
            <span>Safer</span>
          </div>
          <button class="card-header-icon" @click="openDropPart">
            <span class="icon">
              <i class="fas fa-angle-down"></i>
            </span>
          </button>
        </header>
        <div class="card-content" id="content-1">
          <div class="content">
            <p class="subtitle"><b>Tasks Monitored</b></p>
            <p>
              Once the session has been created, the whole process will be <b>monitored</b> by FlyMeCrods.
              You can also write to me to report any problem. FlyMeCrods will issue it and reply to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
    </div>

    <section class="hero mt-6" id="fields">
      <div class="hero-body">
        <p class="title has-text-centered">Covering Different Requirements from Multiple Fields</p>
        <p class="subtitle has-text-centered">Provide Comprehensive and Proficient Services with You</p>
        <div class="container mt-6">
          <div class="columns">
            <div class="column is-4">
              <div class="content">
                <div class="subtitle has-text-centered">
                  <div class="container">
                    <div class="icon mb-3">
                      <i class="fas fa-code"></i>
                    </div>
                    <div>
                      <router-link to="/informatics">Informatics</router-link>
                    </div>
                  </div>
                </div>
                <div class="details has-text-centered">
                  <p>
                    Computer Science | Big Data | Information Technology
                    Artificial Intelligence | Software Engineering | Web Dev
                  </p>
                </div>
              </div>
            </div>

            <div class="column is-4">
              <div class="content">
                <div class="subtitle has-text-centered">
                  <div class="container">
                    <div class="icon mb-3">
                      <i class="fas fa-chart-line"></i>
                    </div>
                    <div>
                      <router-link to="/business">Business</router-link>
                    </div>
                  </div>
                </div>
                <div class="details has-text-centered">
                  <p>
                    Business Development | Marketing | Stock Analysis
                    Accounting | Human Resource Management | Sales
                  </p>
                </div>
              </div>
            </div>

            <div class="column is-4">
              <div class="content">
                <div class="subtitle has-text-centered">
                  <div class="container">
                    <div class="icon mb-3">
                      <i class="fas fa-balance-scale"></i>
                    </div>
                    <div>
                      <router-link to="/law">Law</router-link>
                    </div>
                  </div>
                </div>
                <div class="details has-text-centered">
                  <p>
                    Corporate | International Law | International Trade
                    International Arbitration | International Litigation
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="columns mt-6">
            <div class="column is-4">
              <div class="content">
                <div class="subtitle has-text-centered">
                  <div class="container">
                    <div class="icon mb-3">
                      <i class="fas fa-heartbeat"></i>
                    </div>
                    <div>
                      <router-link to="/health">Health</router-link>
                    </div>
                  </div>
                </div>
                <div class="details has-text-centered">
                  <p>
                    Internal Medicine | Surgery | Pediatrics | Neurology
                    Ophtalmology | Stomatology | Orthopedic | Psychiatry
                  </p>
                </div>
              </div>
            </div>

            <div class="column is-4">
              <div class="content">
                <div class="subtitle has-text-centered">
                  <div class="container">
                    <div class="icon mb-3">
                      <i class="fas fa-pencil-ruler"></i>
                    </div>
                    <div>
                      <router-link to="/design">Design</router-link>
                    </div>
                  </div>
                </div>
                <div class="details has-text-centered">
                  <p>
                    Logo Design | Graphic Design | Web Design | UI
                    Graphic Design | 3D Animation | 2D Animation
                  </p>
                </div>
              </div>
            </div>

            <div class="column is-4">
              <div class="content">
                <div class="subtitle has-text-centered">
                  <div class="container">
                    <div class="icon mb-3">
                      <i class="fas fa-ellipsis-h"></i>
                    </div>
                    <div>
                      <router-link to="/others">Others</router-link>
                    </div>
                  </div>
                </div>
                <div class="details has-text-centered">
                  <p>If there is no option above for you to choose, click here to view all. For instance, languages and electronics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- This is the place for cases by using bulma-carousel -->
    <section class="hero mt-3">
      <div class="hero-body has-text-centered" id="case-hero-body">
          <p class="title">Marvellous Cases with Superior Services</p>
          <p class="subtitle">Successful Experience Support Us to Continue</p>
      </div>
      <div id="case-carousel" class="hero-carousel">
        <div class="case-1">
          <div class="tile is-ancestor">
            <div class="tile is-6 is-vertical is-parent">
              <div class="tile is-child box">
                <div class="case-content">
                  <div class="desc">
                    <p class="subtitle"><b>Chatbot with IBM Watson Assistant</b></p>
                    <p>
                      FlyMe (FlightYING): This is the work of the course 
                      <u>Special Course in Software Engineering</u>. It was created by IBM Watson Assistant.
                      Taught by Oulu University.
                    </p>
                  </div>
                  <div class="pic">
                    <img :src="require('@/assets/chatbot_with_ibm.png')" alt="chatbot_with_ibm.png" @load="bulmaCarouselCases">
                  </div>
                </div>
                <div class="tag is-dark">
                  <div class="icon">
                    <i class="fas fa-code"></i>
                  </div>
                  <p>Informatics</p>
                </div>
              </div>

              <div class="tile is-child box">
                <div class="case-content">
                  <div class="desc">
                    <p class="subtitle"><b>Movie Analytics with Big Data Technology</b></p>                  
                    <p>
                      Douban Movie: This is the work of the course 
                      <u>Big Data and Its Application</u>.
                      Taught by Nanjing Institute of Technology.
                    </p>
                  </div>
                  <div class="pic">
                    <img :src="require('@/assets/movie_with_bigdata.png')" alt="movie_analytics_with_big_data.png">
                  </div>
                </div>
                <div class="tag is-dark">
                  <div class="icon">
                    <i class="fas fa-code"></i>
                  </div>
                  <p>Informatics</p>
                </div>
              </div>
            </div>

            <div class="tile is-parent">
              <div class="tile is-child box">
                <div class="case-content">
                  <div class="desc">
                    <p class="subtitle"><b>Harmony OS Application Development</b></p>
                    <p>
                      FlyMe (Harmony OS): This is the work of the course 
                      <u>Software Engineering Project Training</u>. 
                      Python is used to develop the back-end of the application in the platform of Harmony OS,
                      and the front-end is built with HTML, CSS, JavaScript. Involved Database is MySQL. 
                      After developed, the publishment method is with the help of Ngrok and Nginx. Relevant 
                      development of the application includes the application for Wechat. Developer: Ying Liu. 
                      Taught by the Nanjing Institute of Technology.
                    </p>
                  </div>
                  <div class="pic">
                    <img :src="require('@/assets/app_with_harmonyos.png')" alt="app_with_harmonyos">
                  </div>
                </div>
                <div class="tag is-dark">
                  <div class="icon">
                    <i class="fas fa-code"></i>
                  </div>
                  <p>Informatics</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="case-2">
          <div class="tile is-ancestor">
            <div class="tile is-6 is-vertical is-parent">
              <div class="tile is-child box" id="chatbot-with-ibm">
                <div class="case-content">
                  <div class="desc">
                    <p class="subtitle"><b>Methods to Prevent the Infectious of Covid-19</b></p>
                    <p>
                      This project aims to prevent the spread of the virus, individually. 
                      Photo by <b>Cedric Fauntleroy</b> from Pexels.
                    </p>
                  </div>
                  <div class="pic">
                    <img :src="require('@/assets/methods_with_covid19.jpg')" alt="methods_with_covid19">
                  </div>
                </div>
                <div class="tag is-dark">
                  <div class="icon">
                    <i class="fas fa-heartbeat"></i>
                  </div>
                  <p>Health</p>
                </div>
              </div>

              <div class="tile is-child box">
                <div class="case-content">
                  <div class="desc">
                    <p class="subtitle"><b>Take Care of Your Teeth</b></p>                  
                    <p>
                      Discovery of the research in the field of Stomatology. Pay more attention to teeth.
                      Photo by <b>Anna Shvets</b> from Pexels.
                    </p>
                  </div>
                  <div class="pic">
                    <img :src="require('@/assets/stomatology.jpg')" alt="take_care_of_your_teeth">
                  </div>
                </div>
                <div class="tag is-dark">
                  <div class="icon">
                    <i class="fas fa-heartbeat"></i>
                  </div>
                  <p>Health</p>
                </div>
              </div>
            </div>

            <div class="tile is-parent">
              <div class="tile is-child box">
                <div class="case-content">
                  <div class="desc">
                    <p class="subtitle"><b>Tips for Enjoying a High-Quliaty Sleep</b></p>
                    <p>
                      Sleep makes you feel better, but its importance goes way beyond just boosting your 
                      mood or banishing under-eye circles. Adequate sleep is a key part of a healthy lifestyle, 
                      and can benefit your heart, weight, mind, and more. Enjoying a good sleep is very significant to everyone. 
                      It is a must for the people to take a sleep around 8 hours per day. Otherwise, he/she might
                      be suffering from insomnia, and then without any energy to work. Here
                      are some tips for teaching us how to sleep in a good way. Photo by <b>Vladimir Konoplev</b> from Pexels.
                    </p>
                  </div>
                  <div class="pic">
                    <img :src="require('@/assets/good_sleep.jpg')" alt="good-sleep">
                  </div>
                </div>
                <div class="tag is-dark">
                  <div class="icon">
                    <i class="fas fa-heartbeat"></i>
                  </div>
                  <p>Health</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="case-3">
          <div class="tile is-ancestor">
            <div class="tile is-6 is-vertical is-parent">
              <div class="tile is-child box">
                <div class="case-content">
                  <div class="desc">
                    <p class="subtitle"><b>Misconduct in Finland (University of Oulu)</b></p>
                    <p>
                      It is <b>strictly not allowed</b> to violate the code of conduct as a student in Finland. Taught by the University of Oulu.
                    </p>
                  </div>
                  <div class="pic">
                    <img :src="require('@/assets/misconduct_in_finland.png')" alt="misconduct.png">
                  </div>
                </div>
                <div class="tag is-dark">
                  <div class="icon">
                    <i class="fas fa-balance-scale"></i>
                  </div>
                  <p>Law</p>
                </div>
              </div>

              <div class="tile is-child box">
                <div class="case-content">
                  <div class="desc">
                    <p class="subtitle"><b>Logo Design for FlyMe Crods</b></p>                  
                    <p>
                      FlyMe (Crods): This is the logo made by myself for the final course 
                      <u>Graduation Project</u>.
                      Taught by the NJIT-UO Program.
                    </p>
                  </div>
                  <div class="pic">
                    <img :src="require('@/assets/logo_design_composition.png')" alt="logo_design_composition.png">
                  </div>
                </div>
                <div class="tag is-dark">
                  <div class="icon">
                    <i class="fas fa-pencil-ruler"></i>
                  </div>
                  <p>
                    Design
                  </p>
                </div>
              </div>
            </div>

            <div class="tile is-parent">
              <div class="tile is-child box">
                <div class="case-content">
                  <div class="desc">
                    <p class="subtitle"><b>Approaches to Conduct A Research</b></p>
                    <p>
                      This is the work of the course <u>Introduction to Research Work</u>.
                      After the learning of the course, I have mastered several methods to conduct 
                      a research (DSR, SLR, MLR, SMR), whatever the scientific theories or the efficient 
                      tools. This has cast a huge impact on my writing and research. 
                      Correspondingly, I have also taken SLR to be my main research method 
                      to write my project for the course. These methods are easy to use and with large amount
                      of cases to support. Taught by the University of Oulu.
                    </p>
                  </div>
                  <div class="pic">
                    <img :src="require('@/assets/introduction_to_research_work.png')" alt="IRW.png">
                  </div>
                </div>
                <div class="tag is-dark">
                  <div class="icon">
                    <i class="fas fa-ellipsis-h"></i>
                  </div>
                  <p>Others</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="hero is-light mt-6" id="steps">
      <div class="hero-body">
        <p class="title has-text-centered">Completed and Smooth Online Service</p>
        <p class="subtitle has-text-centered">
          1 Minute to Distribute Your Problem, 
          Well-structured Services will be presented from Requirements to Delivery
        </p>
        <div class="container mt-4 mb-3">
          <div class="box has-text-centered">
            <div class="content">  
              <div class="icon">
                <i class="fab fa-wpforms title"></i>
              </div>
              <p class="text-for-box">
                <b>Post Request within 1 Minute</b>
              </p>
              <p class="text-for-box">
                Recommend the service provider to you automatically.
              </p>
            </div>
            <div class="step-order">
              <p class="subtitle">Step 1</p>
            </div>
          </div> 
          
          <div class="point-to">
            <div class="icon">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>

          <div class="box has-text-centered">
            <div class="content">
              <div class="icon">
                <i class="fab fa-whatsapp title"></i>
              </div>
              <p class="text-for-box">
                <b>Communicate and Confirm</b>
              </p>
              <p class="text-for-box">
                Secure your processes and trades during the whole lifecircle.
              </p>
            </div>
            <div class="step-order">
              <p class="subtitle">Step 2</p>
            </div>
          </div>

          <div class="point-to">
            <div class="icon">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>

          <div class="box has-text-centered">
            <div class="content">
              <div class="icon">
                <i class="fas fa-users title"></i>
              </div>
              <p class="text-for-box">
                <b>Realize and Check the Project</b>
              </p>
              <p class="text-for-box">
                Monitored by the FlyMeCrods, guarantee your service after sales.
              </p>
            </div>
            <div class="step-order">
              <p class="subtitle">Step 3</p>
            </div>
          </div>

          <div class="point-to">
            <div class="icon">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>

          <div class="end-step">
            <div class="icon">
              <i class="fas fa-check-circle title"></i>
            </div>
            <p class="subtitle">End</p>
          </div>
        </div>

        <div class="publish-button mt-6">
          <button class="button is-primary">
            <router-link to="/post">
              <div class="icon">
                <i class="fas fa-plus"></i>
              </div>
              <p>Post Request for Free</p>
            </router-link>
          </button>
        </div>
      </div>
    </section>

    <section class="hero is-dark" id="frames">
      <div class="hero-body">
        <p class="title has-text-centered">
          Frameworks and Libraries Used When Building FlyMeCrods
        </p>
        <p class="subtitle has-text-centered">
          Front-end, Back-end, and Database
        </p>

        <div class="tabs is-centered is-boxed mt-6">
          <ul>
            <li id="tab-1" class="is-active" @click="switchToTabOne">
              <a>
                <span class="icon is-small"><i class="fab fa-html5" aria-hidden="true"></i></span>
                <span>Front-end</span>
              </a>
            </li>
            <li id="tab-2" @click="switchToTabTwo">
              <a>
                <span class="icon is-small"><i class="fab fa-python" aria-hidden="true"></i></span>
                <span>Back-end</span>
              </a>
            </li>
            <li id="tab-3" @click="switchToTabThree">
              <a>
                <span class="icon is-small"><i class="fas fa-database" aria-hidden="true"></i></span>
                <span>Database</span>
              </a>
            </li>
            <li id="tab-4" @click="switchToTabFour">
              <a>
                <span class="icon is-small"><i class="far fa-file-alt" aria-hidden="true"></i></span>
                <span>Documents</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="tab-pages">
          <div class="tab-page-one" id="tab-page-one">
            <div class="container mt-6">
              <div class="block">
                <div class="columns is-multiline">
                  <div class="column is-4">
                    <div class="icon">
                      <i class="fab fa-html5 subtitle"></i>
                    </div>
                    <p class="subtitle"><b>HTML5</b></p>
                    <p>
                      HTML5 is the latest version of the standard that defines the structure of web pages and the rules for the behavior of web browsers.
                    </p>
                  </div>

                  <div class="column is-4">
                    <div class="icon">
                      <i class="fab fa-css3-alt subtitle"></i>
                    </div>
                    <p class="subtitle"><b>CSS3</b></p>
                    <p>
                      CSS3 is the latest version of the Cascading Style Sheets language that allows us to style web pages easily.
                    </p>
                  </div>
                  
                  <div class="column is-4">
                    <div class="icon">
                      <i class="fab fa-js subtitle"></i>
                    </div>
                    <p class="subtitle"><b>JavaScript</b></p>
                    <p>
                      JavaScript is a programming language that allows us to add interactivity to our web pages.
                    </p>
                  </div>

                  <div class="column is-6">
                    <div class="icon">
                      <i class="fab fa-vuejs subtitle"></i>
                    </div>
                    <p class="subtitle"><b>Vue.js</b></p>
                    <p>
                      Vue (pronounced '/vjuː/', like view) is a progressive framework for building user interfaces. 
                      Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. 
                      The core library is focused on the view layer only, and is easy to pick up and integrate with other 
                      libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated 
                      Single-Page Applications when used in combination with modern tooling and supporting libraries.
                    </p>
                  </div>

                  <div class="column is-6">
                    <div class="icon">
                      <i class="fas fa-rss"></i>
                    </div>
                    <p class="subtitle"><b>Vue Router</b></p>
                    <p>
                      Vue Router is the official router for Vue.js. It deeply integrates with Vue.js core to make building 
                      Single Page Applications with Vue.js a breeze. Features include:</p> 
                    <p>
                      1. Nested routes mapping, 2. Dynamic Routing,
                      3. Modular, component-based router configuration, 4. Route params, query, wildcards, 5. View transition effects 
                      powered by Vue.js' transition system, 6. Fine-grained navigation control, 7. Links with automatic active CSS classes, 
                      8. HTML5 history mode or hash mode, 9. Customizable Scroll Behavior, 10. Proper encoding for URLs
                    </p>
                  </div>

                  <div class="column is-6">
                    <div class="icon">
                      <i class="fas fa-book"></i>
                    </div>
                    <p class="subtitle"><b>Bulma</b></p>
                    <p>
                      Bulma is a CSS library. This means it provides CSS classes to help you style your HTML code.
                      To use Bulma, you can either use the pre-compiled .css file or install the .sass files so you can customize it to your needs.
                    </p>
                  </div>

                  <div class="column is-6">
                    <div class="icon">
                      <i class="fab fa-squarespace"></i>
                    </div>
                    <p class="subtitle"><b>Axios</b></p>
                    <p>
                      Axios is a simple promise based HTTP client for the browser and node.js. Axios provides a 
                      simple to use library in a small package with a very extensible interface.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="tab-page-two is-hidden" id="tab-page-two">
            <div class="container mt-6">
              <div class="block">
                <div class="columns is-multiline">
                  <div class="column is-full">
                    <div class="icon">
                      <i class="fab fa-python subtitle"></i>
                    </div>
                    <p class="subtitle"><b>Python</b></p>
                    <p>
                      Python is a programming language that allows us to create programs that can be executed on a computer.
                    </p>
                  </div>

                  <div class="column is-full">
                    <p class="subtitle"><b>Django</b></p>
                    <p>
                      Django is a Python framework that allows us to create web applications.
                    </p>
                  </div>
                  
                  <div class="column is-full">
                    <p class="subtitle"><b>Django-Rest-Framework</b></p>
                    <p>
                      Django REST framework is a powerful and flexible toolkit for building Web APIs.
                    </p>
                  </div>

                  <div class="column is-full">
                    <p class="subtitle"><b>Pillow</b></p>
                    <p>
                      The Python Imaging Library adds image processing capabilities to your Python interpreter.
                      This library provides extensive file format support, an efficient internal representation, 
                      and fairly powerful image processing capabilities.The core image library is designed for fast 
                      access to data stored in a few basic pixel formats. It should provide a solid foundation for 
                      a general image processing tool.
                    </p>
                  </div>

                  <div class="column is-full">
                    <div class="icon">
                      <i class="fab fa-cc-stripe"></i>
                    </div>
                    <p class="subtitle"><b>Stripe</b></p>
                    <p>You can use the Stripe API in test mode, which does not affect your live data or interact
                       with the banking networks. The API key you use to authenticate the request determines whether 
                       the request is live mode or test mode.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-page-three is-hidden" id="tab-page-three">
            <div class="container mt-6">
              <div class="block">
                <div class="columns is-multiline">
                  <div class="column is-full">
                    <div class="icon">
                      <p class="subtitle"><i class="fas fa-database"></i></p>
                    </div>
                    <p class="subtitle"><b>Sqlite</b></p>
                    <p>
                      SQLite is a C-language library that implements a small, fast, self-contained, 
                      high-reliability, full-featured, SQL database engine. SQLite is the most used 
                      database engine in the world. SQLite is built into all mobile phones and most 
                      computers and comes bundled inside countless other applications that people use every day.
                      The SQLite file format is stable, cross-platform, and backwards compatible and the developers 
                      pledge to keep it that way through the year 2050. SQLite database files are commonly used as 
                      containers to transfer rich content between systems and as a long-term archival format 
                      for data. There are over 1 trillion (1e12) SQLite databases in active use.
                      SQLite source code is in the public-domain and is free to everyone to use for any purpose.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-page-four is-hidden" id="tab-page-four">
            <div class="container mt-6">
              <div class="block">
                <div class="columns is-multiline">
                  <div class="column is-4">
                    <div class="icon">
                      <i class="fab fa-html5 subtitle"></i>
                    </div>
                    <p class="subtitle"><b>HTML5</b></p>
                    <p>
                      Click Here: <a href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML"><u>Introduction to HTML</u></a>
                    </p>
                  </div>

                  <div class="column is-4">
                    <div class="icon">
                      <i class="fab fa-css3-alt subtitle"></i>
                    </div>
                    <p class="subtitle"><b>CSS3</b></p>
                    <p>
                      Click Here: <a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps"><u>First_Steps_of_CSS</u></a>
                    </p>
                  </div>
                  
                  <div class="column is-4">
                    <div class="icon">
                      <i class="fab fa-js subtitle"></i>
                    </div>
                    <p class="subtitle"><b>JavaScript</b></p>
                    <p>
                      Click Here: <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript"><u>Introduction to JavaScript</u></a>
                    </p>
                  </div>

                  <div class="column is-4">
                    <div class="icon">
                      <i class="fab fa-vuejs subtitle"></i>
                    </div>
                    <p class="subtitle"><b>Vue.js</b></p>
                    <p>
                      Click Here: <a href="https://vuejs.org/guide/introduction.html"><u>Introduction to Vue.js</u></a>
                    </p>
                  </div>

                  <div class="column is-4">
                    <div class="icon">
                      <i class="fas fa-rss"></i>
                    </div>
                    <p class="subtitle"><b>Vue Router</b></p>
                    <p>
                      Click Here: <a href="https://router.vuejs.org/guide/">Introduction to <u>Vue Router</u></a>
                    </p>
                  </div>

                  <div class="column is-4">
                    <div class="icon">
                      <i class="fas fa-book"></i>
                    </div>
                    <p class="subtitle"><b>Bulma</b></p>
                    <p>
                      Click Here: <a href="https://bulma.io/"><u>Introduction to Bulma</u></a>
                    </p>
                  </div>

                  <div class="column is-4">
                    <div class="icon">
                      <i class="fab fa-squarespace"></i>
                    </div>
                    <p class="subtitle"><b>Axios</b></p>
                    <p>
                      Click Here: <a href="https://axios-http.com/"><u>Introduction to Axios</u></a>
                    </p>
                  </div>

                  <div class="column is-4">
                    <div class="icon">
                      <i class="fab fa-python"></i>
                    </div>
                    <p class="subtitle"><b>Python</b></p>
                    <p>Click Here: <a href="https://www.python.org/"><u>Official Website for Python</u></a></p>
                  </div>

                  <div class="column is-4">
                    <div class="icon">
                      <i class="fab fa-cc-stripe"></i>
                    </div>
                    <p class="subtitle"><b>Stripe</b></p>
                    <p>Click Here: <a href="https://stripe.com/docs/api?lang=python"><u>Official Website for Stripe</u></a></p>
                  </div>

                  <div class="column is-4">
                    <p class="subtitle"><b>Django-Rest-Framework</b></p>
                    <p>Click Here: <a href="https://www.django-rest-framework.org/"><u>Official Website for Django-Rest-Framework</u></a></p>
                  </div>

                  <div class="column is-4">
                    <p class="subtitle"><b>SQLite</b></p>
                    <p>Click Here: <a href="https://sqlite.org/index.html"><u>Official Website for SQLite</u></a></p>
                  </div>

                  <div class="column is-4">
                    <p class="subtitle"><b>Django</b></p>
                    <p>Click Here: <a href="https://www.djangoproject.com/"><u>Official Website for Django</u></a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <div class="backToTopButton">
      <button class="button is-light" id="sidePart" @click="openSidePartStatus">
        <div class="icon">
          <i class="fas fa-angle-left" id="angle"></i>
        </div>
      </button>
      <button class="button is-primary" id="bodyPart" @click="backButton">
        <div class="icon">
          <i class="fas fa-arrow-up" id="arrow"></i>
        </div>
      </button>
    </div>
  </div>

</template>

<style scoped>
.item-1 {
  display: flex;
  justify-content: center;
}

.imgContainer {
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
}

.slogan-box {
  top: 19%;
  width: 60%;
  display: flex;
  position: absolute;
  border-radius: 1rem;
  border: 0.2rem solid white;
  justify-content: center;
  background-image: linear-gradient(to right,#a1a9a6 0%, #4b8285 100%);
}

.slogan-text {
  padding: 1rem;
  color: white;
  font-size: 2rem;
  text-shadow: 0.2rem 0.2rem 0.5rem #363636;
}

.item-2 .slogan-box {
  background-image: linear-gradient(to left, #fefce9 0%, #6996a9 100%);
}

.item-2 .slogan-text {
  color: white;
}

.item-3 .slogan-box {
  background-image: linear-gradient(to right, #ecf6fe 0%, #112a31 100%);
}

.back-img {
  width: 100%;
  height: 100%;
}

.hero-head {
  width: 5%;
  height: 5%;
  position: relative;
}

.logo {
  width: 100%;
  height: 100%;
  margin: 1rem 1rem;
  z-index: 1;
}

.to-top-button {
  position: fixed;
  top: 4.5rem;
  right: -2.5rem;
}

/* This is the component for the Back to Top Button */
.backToTopButton {
  position: fixed;
  top: 4.5rem;
  right: -2.5rem;
}

.openSidePartActive {
  transform: translateX(-3.5rem);
  transition: 1s;
}

.openSidePartActiveAngle {
  transform: rotate(180deg);
  transition: 1s;
}

.openSidePartActiveArrow {
  transform: rotate(180deg);
  transition: 1s;
}

.cards {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.card {
  width: 33.33%;
}

.card-header-title {
  display: flex;
  flex-direction: row;
}

.card-header-title .icon{
  margin-right: 1rem;
}

#fields {
  background-color: rgb(220, 220, 220);
}

#fields a {
  color: #363636;
  font-weight: bold;
  text-decoration: none;
}

#fields .subtitle :hover {
  cursor: pointer;
  color: #00c4a7;
  transition: 0.4s;
}

#case-container {
  background-color: black;
}

#case-carousel {
  overflow: hidden;
}

#case-carousel .tile {
  margin:0 0 0.5rem 0;
  position: relative;
}

#case-hero-body {
  background-color: white;
}

.case-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.case-content .pic{
  width: 30%;
}

.case-content .pic :hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: 0.8s;
}

.case-content .desc{
  width: 70%;
}

.tag {
  position: absolute;
  right: 0;
  top: 0;
}

#steps .hero-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#steps .container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#steps .box {
  width: 28%;
  display: flex;
  justify-content: center;
  border: 0.1rem solid black;
  margin: 0.5rem;
}

#steps .box .content {
  margin-top: 10%;
  width: 90%;
}

#steps .box .step-order {
  width: 10%;
  border-radius: 1rem;
  background-color: #363636;
  writing-mode: vertical-rl;
}

#steps .box .step-order p{
  color: white;
}

#steps .box .text-for-box {
  margin-top: 1rem;
}

#steps .end-step {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
}

#steps .end-step .icon {
  margin: 1rem;
}

.publish-button .button a {
  display: flex;
}

#frames {
  margin-top: 4rem;
}

#frames .box p{
  color: black;
}

@media screen and (max-width: 800px) {
  .cards {
    flex-direction: column;
  }

  .card {
    width: 100%;
  }

  .case-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .case-content .pic{
    width: 100%;
    margin-top: 0.5rem;
  }

  .case-content .pic :hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: 0.8s;
  }

  .case-content .desc{
    width: 100%;
  }

  #steps .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #steps .box {
    width: 100%;
    border: 0.1rem solid black;
  }

} 
</style>

<script>
// @ is an alias to /src
import bulmaCarousel from '/crowd-soucing/crods_vue/node_modules/bulma-extensions/bulma-carousel/dist/js/bulma-carousel.min.js'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
    bulmaCarousel: function () {
      bulmaCarousel.attach('#carousel', {
        slidesToScroll: 1,
        slidesToShow: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        duration: 500,
        })
      },

      openSidePartStatus: function () {
        var newAttribute = "openSidePartActive"
        var status = document.getElementById('sidePart').classList.value.includes(newAttribute)
        if (status) {
          document.getElementById('sidePart').classList.remove(newAttribute)
          document.getElementById('angle').classList.remove('openSidePartActiveAngle')
          document.getElementById('bodyPart').classList.remove(newAttribute)
          document.getElementById('arrow').classList.remove('openSidePartActiveArrow')
        } else {
          document.getElementById('sidePart').classList.add(newAttribute)
          document.getElementById('angle').classList.add('openSidePartActiveAngle')
          document.getElementById('bodyPart').classList.add(newAttribute)
          document.getElementById('arrow').classList.add('openSidePartActiveArrow')
        }
      },

      backButton: function () {
        var height = document.documentElement.scrollHeight
        var clientHeight = document.documentElement.clientHeight
        var current = window.scrollY
        var ration = (clientHeight+current) / height
        if (ration <= 1) {
          window.scrollTo(0, height)
        } else {
          window.scrollTo(0, 0)
        }
      },

      arrowOrientation: window.onscroll = function () {
        var height = document.documentElement.scrollHeight
        var clientHeight = document.documentElement.clientHeight
        var current = window.scrollY
        var ration = (clientHeight+current) / height
        if (document.getElementById('arrow')) {
          if (ration <= 1) {
            document.getElementById('arrow').classList.add('openSidePartActiveArrow')
          } else {
            document.getElementById('arrow').classList.remove('openSidePartActiveArrow')
          }
        }
      },

      bulmaCarouselCases: function () {
        bulmaCarousel.attach('#case-carousel', {
          slidesToScroll: 1,
          slidesToShow: 1,
        })
      },

      // Below are the js functions for switching the tabs
      switchToTabOne: function () {
        var status = document.getElementById('tab-1').classList.value.includes('is-active')
        if (!status) {
          document.getElementById('tab-1').classList.add('is-active')
          document.getElementById('tab-page-one').classList.remove('is-hidden')
          document.getElementById('tab-2').classList.remove('is-active')
          document.getElementById('tab-page-two').classList.add('is-hidden')
          document.getElementById('tab-3').classList.remove('is-active')
          document.getElementById('tab-page-three').classList.add('is-hidden')
          document.getElementById('tab-4').classList.remove('is-active')
          document.getElementById('tab-page-four').classList.add('is-hidden')
        } 
      },

      switchToTabTwo: function () {
        var status = document.getElementById('tab-2').classList.value.includes('is-active')
        if (!status) {
          document.getElementById('tab-1').classList.remove('is-active')
          document.getElementById('tab-page-one').classList.add('is-hidden')
          document.getElementById('tab-2').classList.add('is-active')
          document.getElementById('tab-page-two').classList.remove('is-hidden')
          document.getElementById('tab-3').classList.remove('is-active')
          document.getElementById('tab-page-three').classList.add('is-hidden')
          document.getElementById('tab-4').classList.remove('is-active')
          document.getElementById('tab-page-four').classList.add('is-hidden')
        } 
      },

      switchToTabThree: function () {
        var status = document.getElementById('tab-3').classList.value.includes('is-active')
        if (!status) {
          document.getElementById('tab-1').classList.remove('is-active')
          document.getElementById('tab-page-one').classList.add('is-hidden')
          document.getElementById('tab-2').classList.remove('is-active')
          document.getElementById('tab-page-two').classList.add('is-hidden')
          document.getElementById('tab-3').classList.add('is-active')
          document.getElementById('tab-page-three').classList.remove('is-hidden')
          document.getElementById('tab-4').classList.remove('is-active')
          document.getElementById('tab-page-four').classList.add('is-hidden')
        } 
      },

      switchToTabFour: function () {
        var status = document.getElementById('tab-4').classList.value.includes('is-active')
        if (!status) {
          document.getElementById('tab-1').classList.remove('is-active')
          document.getElementById('tab-page-one').classList.add('is-hidden')
          document.getElementById('tab-2').classList.remove('is-active')
          document.getElementById('tab-page-two').classList.add('is-hidden')
          document.getElementById('tab-3').classList.remove('is-active')
          document.getElementById('tab-page-three').classList.add('is-hidden')
          document.getElementById('tab-4').classList.add('is-active')
          document.getElementById('tab-page-four').classList.remove('is-hidden')
        } 
      },

      refreshTab: function () {
        document.getElementById('tab-1').classList.add('is-active')
        document.getElementById('tab-page-one').classList.remove('is-hidden')
        document.getElementById('tab-2').classList.remove('is-active')
        document.getElementById('tab-page-two').classList.add('is-hidden')
        document.getElementById('tab-3').classList.remove('is-active')
        document.getElementById('tab-page-three').classList.add('is-hidden')
        document.getElementById('tab-4').classList.remove('is-active')
        document.getElementById('tab-page-four').classList.add('is-hidden')
      },
  },
  
  activated () {
      if(window.name == "") {
        window.name = "isRefresh"
      } else if (window.name == "isRefresh") {
        refreshTab()
    }
  },

  mounted() {
    document.title = 'Home | FlyMeCrods' 
  },
}
</script>