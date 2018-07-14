<template>
    <div class="Chat">
      <form @submit.prevent="chatMessage">
        <input autocomplete="off" v-model="message" /><button>Send</button>
      </form>
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
            message: "",
            socket: io('localhost:8081')
        }
    },
    methods: {
        chatMessage(e) {
            e.preventDefault();

            this.socket.emit('message', {
                message: this.message
            });
            this.message = ''
        },
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