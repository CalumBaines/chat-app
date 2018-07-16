<template>
    <div class="Chat">
      <ul class="Chat__list">
        <Message :key="index" v-for="(message, index) in messages" :message="message.message"/>
      </ul>
      <form class="Chat__form" @submit.prevent="chatMessage">
        <TextBox v-model="message" />
      </form>
    </div>
</template>

<script>
import io from 'socket.io-client';
import TextBox from '../TextBox/TextBox.vue';
import Message from '../Message/Message.vue';


export default {
    name: 'Chat',
    props: {

    },
    components: {
        TextBox,
        Message
    },
    data() {
        return {
            message: null,
            messages: [],
            name: "Jess Holt",
            userID: 0,
            id: "",
            socket: io('localhost:8081')
        }
    },
    methods: {
        chatMessage(e) {
            e.preventDefault();
            if(this.message == ('' || ' ')) {
              this.message = null
            } 
            if(this.message !== null){
              this.socket.emit('message', {
                  name: this.name,
                  id: this.socket.id,
                  message: this.message
              });
            }
            
            this.message = null
        },
        isPoster(id) {
          if(id === 1) {
            return true
          }
          return false
        }
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