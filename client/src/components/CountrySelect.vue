<template>
    <div class="country">
        <img src="../assets/cz_map.png" class="country__cz" :class="propCountry === 'cz' ? 'active' : ''" @click="clickCountry('cz')">
        <img src="../assets/sk_map.png" class="country__sk" :class="propCountry === 'sk' ? 'active' : ''" @click="clickCountry('sk')">
    </div>
</template>

<script>
    export default {
        name: 'CountrySelect',
        props: {
            propCountry: String,
        },
        methods: {
            clickCountry(countryCode) {
                this.$emit('onClickCountry', countryCode);
            }
        }
    }
</script>

<style lang="scss">
    .country {
        width: 100%;
        max-width: 950px;
        margin: 0 auto;
        height: 300px;
        position: relative;

        &__cz {
            position: absolute;
            top: 0;
            left: 5rem;
            opacity: 0.2;
            cursor: pointer;
            transition: opacity 0.4s;

            &:hover, &.active {
                opacity: 0.5;
            }
        }

        &__sk {
            position: absolute;
            top: 12.9rem;
            left: 38.3rem;
            opacity: 0.2;
            cursor: pointer;
            transition: opacity 0.4s;

            &:hover, &.active {
                opacity: 0.5;
            }
        }
    }
</style>
