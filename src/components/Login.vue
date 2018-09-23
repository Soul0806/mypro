<template>
  <div class="signUp">
    <div>
      <input type="email" v-model="signupForm.email" placeholder="email">
    </div>
    <div>
      <input type="password" v-model="signupForm.password" placeholder="password">
    </div>
    <button @click="signUp">Sign up</button>
    <button @click="signIn">Sign in</button>
  </div>
</template>

<script>

const fb = require('../db.js')
export default {
  data() {
    return {
      signupForm: {
        email:'',
        password:''
      }
    }
  },
  methods: {
    signUp() {
      fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password)
      .then((user) => {
        this.$router.push('/')
      },(err) => {
        alert(err.message)
      });
    },
    signIn() {
      fb.auth.signInWithEmailAndPassword(this.signupForm.email, this.signupForm.password)
      .then((user) => {
        /* this.$store.commit('setCurrentUser', user.user)
        this.$store.dispatch('fetchUserProfile') */

        this.$router.replace('/'); 
      },(err) => {
        alert(err.message)
      });
    }
  }
}
</script>

<style>

</style>

