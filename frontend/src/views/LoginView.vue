<template>
  <div class="login-view">
    <div id="left-view">
      <span>
        <p>Welcome to</p>
        <img src="@/assets/Inbounds-all-white.png" alt="Inbounds logo" />
      </span>
    </div>
    <div id="right-view">
      <img id="logo" src="@/assets/Inbounds-all-blue.png" alt="Inbounds logo" />
      <h2 class="mb-6 has-text-weight-bold">Sign In</h2>
      <LoginForm />
    </div>
  </div>
</template>

<script lang="ts">
import LoginForm from '@/components/LoginForm.vue'

export default {
  components: {
    LoginForm
  }
}
</script>

<style scoped lang="scss">
.login-view {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

#left-view {
  height: 100vh;
  width: 66vw;
  background-color: $info;
  position: relative;

  span {
    color: #fff;
    position: absolute;
    bottom: 5rem;
    right: 3rem;
    margin: 0;
    font-size: 7em;
    font-weight: 700;
  }

  img {
    width: 5em;
    margin-left: 0.5em;
    margin-top: 0;
  }

  p {
    margin-bottom: -60px;
  }
}

#right-view {
  background-color: #fff;
  height: 100vh;
  width: 34vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #logo {
    width: 15em;
    margin-bottom: 4rem;
    margin-right: 18%;
  }
}
</style>
