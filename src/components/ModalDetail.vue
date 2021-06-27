<template>      
          <div class="modalDetails">
            <img :src="product.PictureURL" :alt="product.Name">
            <div class="group">
                <p class="name">{{product.Name}}</p>
                <div class="rating">
                    <stars-rating v-bind="config"></stars-rating>
                </div>
                <p class="brand">
                    <small><b>Brand: </b>{{product.Brand}}</small>
                </p>
                <p class="color">
                    <small><b>Color: </b>{{product.Color}}</small>
                </p>
                <p class="description">{{product.Description}}</p>
            </div>
            <div class="group">
                <div class="prices">
                    <h4 v-if="product['Retail Price'] > product.Price" class="retailPrice">{{formatPrice(product['Retail Price'])}}</h4>
                    <h3 class="price">{{formatPrice(product.Price)}}</h3>
                </div>
                <div class="bottom">
                    <span class="stock">
                        {{product.Stock > 0 ? 'In of Stock' : 'Out of Stock'}} 
                    </span>
                    <a @click.stop.prevent="addToCart(product)" class="btn btnBuy" href="#">Add to Cart</a>
                </div>
            </div>            
          </div>
</template>

<script>
import starsRating from "vue-dynamic-star-rating/star-rating.vue";

export default {
    props:['product'],  
    data() {
        return {
            config: {
                rating: this.product.RatingAvg,
                isIndicatorActive: false,
                starStyle: {
                fullStarColor: "#222",
                emptyStarColor: "#ccc",
                starWidth: 15,
                starHeight: 15
                }
            }
        };
    },  
    components:{
        starsRating,
    },   
    methods:{
        addToCart(product){
            if(product.Stock){

                //enviar o Id do produto(product.ProductID)

                return this.$notify({
                    group: 'app',
                    type: 'success',
                    title: `Produto adicionado a Sacola`,
                    duration: 2500,
                });

            }
            else{

                return this.$notify({
                    group: 'app',
                    type: 'error',
                    title: `Produto sem Estoque!`,
                    duration: 2500,
                });

            }
        },
        formatPrice(price) {
            let resp = (price/1).toFixed(2).replace('.', ',')
            return '$'+resp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../style/base/mixin.scss';
@import '../style/base/colors.scss';
@import '../style/base/typography.scss';
.product{ 
    .modalDetails{  
        width: 50%;
        height: 350px;      
        display: flex;        
        background-color: $white;
        box-shadow: 5px 5px 15px $shadown;
        border-radius: 6px;
        padding: 10px;    
        position: fixed;
        top: 20%;
        left: 25%;   
        z-index: 2; 

        img{
            width: 350px;
            height: 350px;

            @include media(mobile) {
                width: 100%;
                height: auto;
                margin-bottom: 15px;
            }
        }

        .group{
            &:first-of-type{
                width: 50%;
                display: flex;
                flex-direction: column;
                justify-content: center;

                p{
                    &.brand, &.color{
                        font-weight: 400;
                    }

                    &.color{
                        margin-bottom: 15px;
                    }

                    &.description{
                        @include fontMontserrat(14px, 400, 0px);   
                        line-height: 18px;     
                        color: $gray-dark;
                        padding-right: 25px;

                        @include media(desktop){
                            display: -webkit-box;
                            -webkit-line-clamp: 9;
                            -webkit-box-orient: vertical;  
                            overflow: hidden;
                        }

                        @include media(mobile) {
                            padding-right: 0;
                        }
                    }
                }

                .rating{
                    @include fontMontserrat(16px, 400, 0px);        
                    color: $gray-dark;
                    text-align: left;
                    margin-bottom: 15px;                    
                }                

                @include media(mobile) {
                    width: 100%;
                    margin: 0 0 30px 0;
                }
            }

            &:last-of-type{
                width: 20%;                
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding-right: 50px;

                .prices{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .bottom{
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .stock{
                        @include fontMontserrat(14px, 400, 0px);   
                        line-height: 18px;  
                        color: $error;
                        margin-bottom: 10px;

                        @include media(mobile) {
                            margin: 25px 0;
                        }
                    }

                    .btn{
                        &.btnBuy{
                            background-color: $green;
                        }
                    }                   
                }

                @include media(mobile) {
                    width: 100%;
                    margin-left: 0;
                    padding-right: 0;
                }
            }            
        }  
        @include media(mobile) {            
            width: 90%;
            height: auto;
            flex-direction: column;
            position: absolute;
            top: 20px;
            left: 2%;
        }      
    }
}

</style>