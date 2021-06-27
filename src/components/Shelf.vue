<template>
  <div class="shelfInner">
        <ShelfItem v-for="product in products" 
        :key="product.key"
        :product="product"/>

        <notifications
            group="app"
            classes="notification"
            position="bottom center"
            width="585"
        />
    </div>
</template>

<script>
import axios from '../api/Axios';
import ShelfItem from './ShelfItem.vue'

export default {
    data() {
        return{
            products: [],
        };
    },
    components:{
        ShelfItem,
    },
    mounted() {
        axios.get("server/productList.json")
        .then(response => {this.products = response.data})
    },
}
</script>

<style lang="scss">
@import '../style/base/mixin.scss'; 
.shelfInner{
    max-width: 800px;
    display: flex;
    flex-direction: column;        
    position: relative;
    margin: 0 auto;

    @include media(mobile) {
        padding: 10px;
    }
}
</style>