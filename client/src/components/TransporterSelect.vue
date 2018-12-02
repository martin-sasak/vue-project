<template>
    <div class="transport">
        <div v-for="transporter in transporters"
            :key="transporter.id"
            @click="clickTransporter(transporter)"
            :class="propActiveTransporter === transporter.id ? 'transport__service--active' : ''"
            class="transport__service">
            <img :src="transporter.img">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TrasporterSelect',
        props: {
            propActiveTransporter: String,
        },
        computed: {
            transporters() {
                return this.$store.getters.transporters;
            },
        },
        methods: {
            clickTransporter({id}){
                this.$emit('onClickTransporter', id);
            },
        },
    }
</script>

<style lang="scss">
    .transport {
        display: grid;
        max-width: 80rem;
        border-top: 1px solid #efefef;
        border-left: 1px solid #efefef;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        width: 100%;

        &__service {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 20rem;
            border-right: 1px solid #efefef;
            border-bottom: 1px solid #efefef;
            background-color: white;
            transition: all 0.8s;
            cursor: pointer;
           
            img {
                width: 10rem;
                height: auto;
            }

            &--active {
              box-shadow: 0 0 15rem rgba(242,236,236,1) inset;  
            }

            &:hover {
                box-shadow: 0 0 15rem rgba(242,236,236,1) inset;
                transition: all 0.4s;
            }
        }
    }
</style>
