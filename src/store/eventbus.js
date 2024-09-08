import Vue from 'vue'

const EventBus = new Vue()
window.EvnetBus = EventBus

export const handleEvent = (data) => {
  console.log('get message', data)
}

export default EventBus
