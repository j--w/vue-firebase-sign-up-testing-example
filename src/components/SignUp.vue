<template>
  <form @submit.prevent="onSignup">
    <label>
      Username
      <input
      class="signup__username"
      v-model="signUpModel.username"
      type="text">
    </label>
    <label>
      Password
      <input
        class="signup__password"
        v-model="signUpModel.password"
        type="password">
    </label>
    <button class="signup__submit">
      Login
    </button>
  </form>
</template>
<script>
export default {
  name: 'signup',
  data() {
    return {
      signUpModel: {
        username: null,
        password: null,
      },
    };
  },
  props: ['firebaseAuth'],
  methods: {
    onSignup() {
      this
        .firebaseAuth
        .createUserWithEmailAndPassword(this.signUpModel.username, this.signUpModel.password);
    },
  },
};
</script>
<style>

</style>
