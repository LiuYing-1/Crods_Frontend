<template>
  <div class="container">
    <button class="button is-light" id="firstButton" @click="openSideBar">
      <div class="icon">
        <i class="fas fa-angle-left" id="angle"></i>
      </div>
    </button>
    <button class="button is-primary" id="secondButton" @click="toTarget">
      <div class="icon">
        <i class="fas fa-arrow-up" id="arrow"></i>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'to-top-button',
  methods: {
    openSideBar: function () {
        var goLine = "open"
        var rotateAngle = "angleRotate"
        var roatateArrow = "arrowRotate"
        
        var status = document.getElementById('firstButton').classList.value.includes(goLine)

        if (status) {
          document.getElementById('firstButton').classList.remove(goLine)
          document.getElementById('angle').classList.remove(rotateAngle)
          document.getElementById('secondButton').classList.remove(goLine)
          document.getElementById('arrow').classList.remove(roatateArrow)
        } else {
          document.getElementById('firstButton').classList.add(goLine)
          document.getElementById('angle').classList.add(rotateAngle)
          document.getElementById('secondButton').classList.add(goLine)
          document.getElementById('arrow').classList.add(roatateArrow)
        }
    },

    toTarget: function () {
      var height = document.documentElement.scrollHeight
      var clientHeight = document.documentElement.clientHeight
      var current = window.scrollY
      var ration = (clientHeight+current) / height
      if (document.getElementById('arrow')) {
        if (ration <= 1) {
            window.scrollTo(0, clientHeight)
        } else {
          window.scrollTo(0, 0)
        }
      }
    },  

    arrowOrientation: window.onscroll = function () {
      var height = document.documentElement.scrollHeight
      var clientHeight = document.documentElement.clientHeight
      var current = window.scrollY
      var ration = (clientHeight+current) / height
      if (document.getElementById('arrow')) {
        if (ration <= 1) {
          document.getElementById('arrow').classList.add("arrowRotate")
        } else {
          document.getElementById('arrow').classList.remove("arrowRotate")
        }
      }
    }
  }
}
</script>


<style scoped>
.open {
  transform: translateX(-3.5rem);
  transition: 1s;
}

.angleRotate {
  transform: rotate(180deg);
  transition: 1s;
}

.arrowRotate {
  transform: rotate(180deg);
  transition: 1s;
}
</style>