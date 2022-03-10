<template>
  <div class="page-post-successfully">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/">FlyMeCrods</router-link></li>
        <li><router-link to="/tasks">Tasks</router-link></li>
        <li><router-link to="/post">Post</router-link></li>
        <li class="is-active"><router-link to="/post/success" aria-current="page">Success</router-link></li>
      </ul>
    </nav>

    <div class="container">
      <div class="box" :class="{ shake: noActivated }" >
        <div id="icon">
            <span>
            <div class="image">
                <i class="fas fa-clipboard-check"></i>
            </div>
            </span>
            <span v-if="noActivated"><p>Successfully</p></span>
        </div>
      </div>
      <p class="backNotice">Auto back to the previous page after {{this.count}} s ...</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'SuccessPost',
    data() {
        return {
            noActivated: false,
            count: 0,
        }
    },
    methods: {
        backToPreviousPage() {
            const TIME_COUNT = 5;
            if (!this.timer) {
                this.count = TIME_COUNT
                this.show = false
                this.timer = setInterval(() => {
                    if(this.count > 1 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true
                        clearInterval(this.timer)
                        this.timer = null
                        this.$router.push({
                            path: '/post'
                        })
                    }
                }, 1000)
            }
        }
    },
    mounted() {
        this.noActivated = true
        this.backToPreviousPage()
        document.title = 'Success | FlyMeCrods'
    }
}
</script>

<style scoped>
#icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.box {
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  color: white;
  background-color: #3ec487;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.box .image i {
  font-size: 10rem;
}

.box p {
  font-size: 3rem;
  font-weight: bold;
}

.shake {
  animation: shake 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: rotate();
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: rotate(-3deg);
  }

  20%,
  80% {
    transform: rotate(3deg);
  }

  30%,
  50%,
  70% {
    transform: rotate(-3deg);
  }

  40%,
  60% {
    transform: rotate(3deg);
  }
}

.backNotice {
  color: #5da9df;
}

@media screen and (max-width: 800px) {
  .box {
    width: 10rem;
    height: 10rem;
  }

  .box .image i {
    font-size: 3rem;
  }

  .box p {
    font-size: 1.3rem;
    font-weight: bold;
  }
}
</style>