<template>
    <div class="Chat">
      Chat area
    </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    name: 'Chat',
    props: {
      
    },
    data() {
        return {
            socket : io('localhost:8081')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  // Leave import variables in here 
  @import "../../assets/scss/main.scss";
  // If creating a new component import component style sheet here as shown below 
  @import "Chat.scss";
</style>