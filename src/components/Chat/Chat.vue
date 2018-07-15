<template>
    <div class="Chat">
      <ul>
        <li :key="index" v-for="(message, index) in messages">
          {{message.message}}
        </li>
      </ul>
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
            message: '',
            messages: [],
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
    },
    mounted() {
        this.socket.on('message', (message) => {
            this.messages.push(message)
        });
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