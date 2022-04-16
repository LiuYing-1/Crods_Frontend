<template>
  <div class="contact">
  <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li class="is-active"><router-link to="/contact" aria-current="page">Contact</router-link></li>
      </ul>
    </nav>  
    <div class="columns is-multiline">
      <div class="column is-4" id="universities">
        <div class="image">
          <img :src="require('@/assets/universities_inline.png')" alt="Universities">
        </div>
      </div>
      <div class="column is-2" id="developer">
        <div class="image box">
          <img :src="require('@/assets/developer.png')" alt="Developer">
        </div>
      </div>
      <div class="column is-6" id="developer-profile">
        <p class="title">Liu Ying</p>
        <p class="subtitle"><b>Admin / Dev of FlyMeCrods</b></p>
        <p>Bachelor (Engineering), Software Engineering, <a href="https://www.njit.edu.cn">Nanjing Institute of Technology</a></p>
        <p>Bachelor (Science), Information Processing Science, <a href="https://oulu.fi">University of Oulu</a></p>
        <hr>
        <p>Email: admin@crods.flyme.social / yiliu18@student.oulu.fi</p>
      </div>

      <div class="column is-12"><hr></div>
      <div class="column is-6">
        <p class="title">Nanjing Institute of Technology</p>
        <p class="subtitle">南京工程学院, Nanjing, China</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27093.21611480045!2d118.86780453955078!3d31.916051000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35b5904850787e85%3A0x5264d762aadba2c5!2sNanjing%20Institute%20of%20Technology!5e0!3m2!1sen!2sus!4v1650123897103!5m2!1sen!2sus" 
          width="100%" 
          height="450" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade" 
          class="box">
        </iframe>
      </div>
      <div class="column is-6">
        <p class="title">University of Oulu</p>
        <p class="subtitle">Oulun Yliopisto, Oulu, Finland</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1651.7563549250692!2d25.464104817443836!3d65.05931769999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46802d0fee05afb3%3A0xe8963f6b08a1eba1!2sUniversity%20of%20Oulu!5e1!3m2!1sen!2sus!4v1650124243699!5m2!1sen!2sus" 
          width="100%" 
          height="450" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade" 
          class="box">
        </iframe>
      </div>
      <div class="column is-12"><hr></div>
      <div class="column is-12" id="contact">
        <p class="title">Contact</p>
        <p class="subtitle">Feel free to contact me if you have any questions or suggestions.</p>
        <div class="content">
          <p>
            <span><i class="fab fa-weibo mr-3"></i></span>
            <span>写Bug的Ying</span>
          </p>
          <p>
            <span><i class="fab fa-weixin mr-3"></i></span>
            <span>_ExtrovertedLoner</span>
          </p>
          <p>
            <span><i class="fas fa-phone mr-3"></i></span>
            <span>+86 15240581016</span>
          </p>
          <p>
            <span><i class="far fa-envelope mr-3"></i></span>
            <span>admin@crods.flyme.social</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {

    }
  },
  mounted() {
    document.title = "Contact | FlyMeCrods"
  },
}
</script>

<style scoped>
#universities {
  display: flex;
  justify-content: center;
  align-items: center;
}

#developer {
  display: flex;
  justify-content: center;
  align-items: center;
}

#developer-profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 768px) {
  #developer .box {
    width: 40%;
    display: flex;
    justify-content: center;
  }
  #developer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>