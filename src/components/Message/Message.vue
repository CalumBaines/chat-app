<template>
    <li class="Message">
        <p class="Message__text">{{message}}</p>
    </li>
</template>

<script>

export default {
    name: 'Message',
    props: {
        message: {
            type: String,
            default: null
        },
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  // Leave import variables in here 
  @import "../../assets/scss/main.scss";
  // If creating a new component import component style sheet here as shown below 
  @import "Message.scss";
</style>