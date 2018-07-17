<template>
    <li class="Message">
        <div class="Message__wrap">
            <span class="Message__time">Sent {{time}}</span>
            <div class="Message__bubble">
                <p class="Message__text">{{message}}</p>
            </div>
            <Avatar/>
        </div>
    </li>
</template>

<script>
import Avatar from '../Avatar/Avatar.vue';

export default {
    name: 'Message',
    props: {
        message: {
            type: String,
            default: null
        },
        time: {
            type: String,
            default: null
        },
    },
    components: {
        Avatar
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