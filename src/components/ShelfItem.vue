<template>
  <div class="product">
      <img :src="product.ThumbnailURL" :alt="product.Name">
      <div class="group">
            <p class="name">{{product.Name}}</p>
            <h4 v-if="product['Retail Price'] > product.Price" class="retailPrice">{{formatPrice(product['Retail Price'])}}</h4>
            <h3 class="price">{{formatPrice(product.Price)}}</h3>
      </div>
      <a @click.stop.prevent="handleModal" class="btn btnDetails" href="#">View Details</a>

    <transition name="bounce">
        <ModalDetails v-if="active" :product="product"/>
    </transition>

      <a v-if="active" @click.stop.prevent="handleModal" href="#" class="overlay"></a>
      
  </div>
</template>

<script>
import ModalDetails from './ModalDetail.vue';

export default {
    props:['product'],
    data(){
        return{
            active: false,
        };
    },
    components:{
        ModalDetails,
    },
    methods:{
        handleModal(){
            this.active = !this.active;
        },
        formatPrice(price) {
            let resp = (price/1).toFixed(2).replace('.', ',')
            return '$'+resp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    },
}
</script>

<style lang="scss">
@import '../style/base/mixin.scss';
@import '../style/base/colors.scss';
@import '../style/base/typography.scss';

.product{
    height: 100px;
    display: flex;
    align-items: center;
    border: 1px solid $gray-darkest;  
    border-radius: 8px;      
    margin-bottom: 10px;
    padding: 10px;

    img{
        width: 100px;
    }

    .group{
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        
        p{
            @include fontMontserrat(18px, 600, 0px);

            &.name{                
                color: $gray-dark;
                text-align: left;            
                margin-bottom: 15px;
            }
        }

        .retailPrice{
            @include fontMontserrat(12px, 400, 0px);            
            color: $gray-darkest;
            text-align: left;
            text-decoration: line-through;
        }

        .price{
            @include fontMontserrat(16px, 600, 0px);            
            color: $gray-dark;
            text-align: left;
        }        
    }

    .btn{       
        width: 150px;
        height: 40px; 
        background-color: $black;        
        display: block;        
        @include fontMontserrat(14px, 400, 0px);        
        color: $white;
        line-height: 38px;
        text-align: center;
        text-decoration: none;
        border-radius: 6px;
        transition: .4s;

        &.btnDetails{
            position: absolute;
            right: 30px;

            @include media(mobile) {
                width: 100px;
                right: 15px;
                margin-bottom: -45px;
            }
        }        

        &:hover{
            opacity: .8;
            transition: .4s;
        }
    } 
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }    

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }  

    .overlay{
        width: 100vw;
        height: 100vh;
        background: $overlay;        
        position: fixed;
        left: 0;
        top: 0;        
        z-index: 1;

        @include media(mobile) {
            height: 110vh;
        }
    }

    
}

</style>