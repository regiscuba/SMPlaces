import Vue from 'vue'
import Notifications from 'vue-notification';

import App from './App.vue'
import Shelf from './components/Shelf.vue';
import ShelfItem from './components/ShelfItem.vue';

Vue.use(Notifications);

new Vue({
  render: h => h(App),
  components: {
    Shelf,
    ShelfItem,
  },
}).$mount('#app')
