<script setup lang="ts">
import {createOption} from './helpers'
import {createBotMessage, createUserMessage} from './helpers'
import {computed} from 'vue'
import {onMounted} from 'vue'
import {ref} from 'vue'
import {Message} from './types'


const inputValue = ref<string>('')
const messages = ref<Message[]>([])

const allowedMessages = ref([
  createOption('Вывести погоду'),
  createOption('Установить будильник'),
  createOption('Заказать пиццу')
])

const addAllowedOptions = () => {
  messages.value = [...messages.value, ...allowedMessages.value]
}

const clearInput = () => {
  inputValue.value = ''
}


const allowedOptions = computed(() => {
  return allowedMessages.value.map(({msg}) => msg)
})

onMounted(() => {
  addMessage(createBotMessage('Привет! Что я могу для Вас сделать?'))
  addAllowedOptions()
})

const chooseOption = (isOption: boolean, e) => {
  if (isOption) {
    inputValue.value = e.target.innerText
  }
}

const addMessage = (msg: Message) => {
  messages.value.push(msg)
}

const sendMessage = () => {
  addMessage(createUserMessage(inputValue.value))

  if (allowedMessages.value.length === 0) {
    return addMessage(createBotMessage('Варианты закончились :('))
  }

  if (!allowedOptions.value.includes(inputValue.value)) {
    addMessage(createBotMessage( 'Не понял! Выберите варианты:'))
    addAllowedOptions()
    clearInput()
    return
  }
  addMessage(createBotMessage('Без пробем! Что еще могу сделать?'))
  allowedMessages.value = allowedMessages.value.filter((val) => val.msg !== inputValue.value)
  clearInput()
}

</script>

<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container class="shadow-2 rounded-borders chat-container">
      <q-header reveal elevated>
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-toolbar-title>Vuejs chat with dependabot</q-toolbar-title>

          <q-btn flat round dense icon="whatshot" />
        </q-toolbar>
      </q-header>

      <q-footer reveal elevated class="bg-grey-3">
        <q-input rounded filled v-model="inputValue" style="width: 90%; margin: 0 auto;
         font-size: 23px; "
                 class="bg-grey-3 fa-border">
          <template v-slot:append>
            <q-icon name="send" style="cursor: pointer" @click="sendMessage"/>
          </template>
        </q-input>
      </q-footer>

      <q-page-container class="bg-grey-2">
        <q-page class="q-pa-md">
          <div class="q-pa-md row justify-center">
            <div style="width: 100%; max-width: 400px">
              <q-chat-message
                  v-for="message in messages"
                  :avatar="message.avatar"
                  :text="[message.msg]"
                  :bg-color="message.isOption ? 'purple-2' : null"
                  @click="e => chooseOption(message.isOption, e)"
                  style="cursor: pointer"
                  :sent="message.sent"
              />
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<style scoped>
.chat-container {
  height: 700px;
  min-width: 375px;
  max-width: 550px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
<script setup lang="ts">
</script>
