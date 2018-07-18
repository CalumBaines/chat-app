<template>
    <div class="Chat">
      <ul id="Chatbox" class="Chat__list">
        <Message :key="index" v-for="(message, index) in messages" :time="message.timestamp" :message="message.message" v-bind:class="{ 'Message--them': !isPoster(message.id)}"/>
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
        Message,
    },
    data() {
        return {
            message: null,
            messages: [],
            name: "Jess Holt",
            userID: 1,
            id: "",
            timestamp: "",
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
                  timestamp: new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', hour12: false}),
                  message: this.message,
              });
            }
            
            this.message = null
        },
        isPoster(id) {
          if(this.socket.id == id) {
            return true;
          }
          return false;
        }
    },
    mounted() {
        this.socket.on('message', (message) => {
            this.messages.push(message)
            this.$nextTick(function () {
              var messageBox = document.getElementById('Chatbox');
              // eslint-disable-next-line
              console.log(messageBox.scrollHeight)
              messageBox.scrollTop = messageBox.scrollHeight;
            })
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