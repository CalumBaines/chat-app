<template>
    <div class="Chat">
      <ul id="Chatbox" class="Chat__list">
        <!-- displaying objects in chat history  -->
        <Message :key="index+message.timestamp" v-for="(message, index) in chatHistory[0]" :time="message.timestamp" :message="message.message" v-bind:class="{ 'Message--them': !isPoster(message.id)}"/>
        <!-- displaying list of new messages. Adding a different class depending on if the message is recieved or sent  -->
        <Message :key="index" v-for="(message, index) in messages" :time="message.timestamp" :message="message.message" v-bind:class="{ 'Message--them': !isPoster(message.id)}"/>
      </ul>
      <!-- Form containing the input field, running chatMessage function on submit -->
      <form class="Chat__form" @submit.prevent="chatMessage">
        <TextBox v-model="message" />
      </form>
    </div>
</template>

<script>
// including socket io client on the front end 
import io from 'socket.io-client';

// I have split the application into smaller components to make it easier to manage and scale
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
            chatHistory: [],
            name: "Jess Holt",
            userID: "",
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
          if(this.socket.id == id || id == 1) {
            return true;
          }
          return false;
        },


    },
    mounted() {
        // this.socket.on('connection', () => {
        //   this.socket.emit('storeClientInfo', { customId:"1" });
        // });
        this.socket.on('message', (message) => {
            this.messages.push(message)

            this.$nextTick(function () {
              var messageBox = document.getElementById('Chatbox');
              messageBox.scrollTop = messageBox.scrollHeight;
            })
        });
        this.socket.on('history', (history) => {
          // eslint-disable-next-line
          console.log(history);
          this.chatHistory.push(history);
        })
    },
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  // Leave import variables in here 
  @import "../../assets/scss/main.scss";
  // seperate scss files into sub folders, this makes it easier to manage styles
  @import "Chat.scss";
</style>