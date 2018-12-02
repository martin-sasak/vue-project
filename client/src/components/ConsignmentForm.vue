<template>
    <div class="form">
        <label for="registry">Podatelna</label>
        <select id="registry" :value="registry" @input="$emit('update:registry', $event.target.value)" >
            <option value="Praha 6">Praha 6</option>
            <option value="Praha 8">Praha 8</option>
            <option vlaue="Brno 20">Brno 20</option>
            <option vlaue="Kosice 24">Kosice 24</option>
        </select>
        <label for="delivery-address">Adresa doručení</label>
        <input id="delivery-address" type="text" :value="deliveryAddress" @input="$emit('update:deliveryAddress', $event.target.value)" >
        <label for="recipient">Meno přijemcu</label>
        <input id="recipient" type="text" :value="recipient" @input="$emit('update:recipient', $event.target.value)">
        <label class="checkbox-label"><input type="checkbox" v-model="cashOnDeliveryy"><span>Dobírka</span></label>
        <label>Poznámka</label>
        <textarea :value="note" @input="$emit('update:note', $event.target.value)"></textarea>
    </div>
</template>

<script>
    export default {
        name: 'ConsignmentForm',
        props: [
            'registry',
            'deliveryAddress',
            'recipient',
            'cashOnDelivery',
            'note',
        ],
        data() {
            return {
                cashOnDeliveryy: this.cashOnDelivery,
            }
        },
        watch: {
            cashOnDeliveryy(newValue, oldValue) {
               this.$emit('onChangeCheckbox', newValue);
            }
        }
    }
</script>

<style lang="scss">
    .form {
        width: 40rem;
        margin: 0 auto;

        label {
            font-size: 1.3rem;
            display: block;
            margin-bottom: 0.7rem;
            color: #24233d;
        }

        input[type="text"], select {
            box-sizing: border-box;
            width: 100%;
            height: 4.5rem;
            border: none;
            background-color: white;
            box-shadow: 0 0 0 0.1rem #cbd8e5;
            outline: none;
            padding: 0 1.5rem;
            color: #8898aa !important;
            font-size: 1.5rem;
            border-radius: 0.5rem;
            margin-bottom: 2rem;
            transition: background-color .4s;

            &:active, &:focus {
                box-shadow: 0 0 0 0.1rem #cbd8e5;
                background-color: white;
            }
        }

        input[type="checkbox"] {
            width: 2rem;
            height: 2rem;
            background-color: white;
        }

        .checkbox-label {
            display: flex;
            align-items: center;

            span {
                margin-left: 0.5rem;
            }
        }

        textarea {
            width: 100%;
            box-sizing: border-box;
            border: none;
            background-color: white;
            box-shadow: 0 0 0 0.1rem #cbd8e5;
            color: #8898aa !important;
            border-radius: 5px;
            min-height: 10rem;
            outline: none;
            padding: 1.5rem;
        }
    }
</style>
