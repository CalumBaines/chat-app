<template>
    <div class="TextBox">
        <input class="TextBox__input" autocomplete="off" :value="value" @input="$emit('input',   $event.target.value)" />
        <button class="TextBox__button"><i class="fas fa-paper-plane"></i></button>
    </div>
</template>

<script>

export default {
    name: 'TextBox',
    props: ['value'],
    computed: {
        status: {
            get() { return this.input },
            set(value) {
                this.input = value;
            }
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  // Leave import variables in here 
  @import "../../assets/scss/main.scss";
  // If creating a new component import component style sheet here as shown below 
  @import "TextBox.scss";
</style>