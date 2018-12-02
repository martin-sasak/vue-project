<template>
  <div class="create">
    <div class="wizzard">
      <div class="wizzard__title">Prúvodce založení zásilky</div>
      <div class="wizzard__progress">
        <div class="wizzard__progress__step" @click="section = 1">
          <div class="step-icon">1</div>Výber krajny
        </div>
        <div class="wizzard__progress__step" :class="section < 2 ? 'inactive' : ''" @click="section = 2">
          <div class="step-icon">2</div>Výber přepravce
        </div>
        <div class="wizzard__progress__step" :class="section < 3 ? 'inactive' : ''" @click="section = 3">
          <div class="step-icon">3</div>Informace pro doručení
        </div>
        <div class="wizzard__progress__line" :class="line"></div>
      </div>
      <div class="wizzard__content">
        <transition name="fade" mode="out-in" appear>
          <country-select v-if="section === 1" :propCountry="country" @onClickCountry="setCountry"></country-select>
          <transporter-select v-else-if="section === 2" @onClickTransporter="setTransporter" :prop-active-transporter="transporter"></transporter-select>
          <consignment-form
          v-else-if="section === 3"
          :registry.sync="registry"
          :delivery-address.sync="deliveryAddress"
          :recipient.sync="recipient"
          :cash-on-delivery="cashOnDelivery"
          @onChangeCheckbox="setCashOnDelivery"
          :note.sync="note"
          ></consignment-form>
        </transition>
      </div>
    </div>
    <div class="data">
      <h2>Data state</h2>
      <div>
        <b>section:</b><span>{{section}}</span>
      </div>
      <div>
        <b>country:</b><span>{{country}}</span>
      </div>
      <div>
        <b>transporter:</b> <span style="font-size: 1.2rem;">{{transporter}}</span>
      </div>
      <div>
        <b>registry:</b> <span>{{registry}}</span>
      </div>
      <div>
        <b>deliveryAddress:</b> <span>{{deliveryAddress}}</span>
      </div>
      <div>
        <b>recipient:</b> <span>{{recipient}}</span>
      </div>
      <div>
        <b>cashOnDelivery:</b> <span>{{cashOnDelivery}}</span>
      </div>
      <div>
        <b>note:</b><br> <span>{{note}}</span> 
      </div>

      <div v-if="showSendButton">
        <button class="send-button" @click="createConsignment">Vytvorit zasilku</button>
      </div>
    </div>
  </div>
</template>

<script>
import TransporterSelect from "../components/TransporterSelect";
import CountrySelect from "../components/CountrySelect";
import ConsignmentForm from "../components/ConsignmentForm";

export default {
  name: 'consignment-create',
  components: {
    TransporterSelect,
    CountrySelect,
    ConsignmentForm
  },
  data() {
    return {
      section: 1,
      country: null,
      transporter: null,
      registry: null,
      deliveryAddress: null,
      recipient: null,
      cashOnDelivery: false,
      note: '',
    }
  },
  computed: {
    line() {
      if(this.section === 2) {
        return 'p50';
      } else if(this.section === 3) {
        return 'p100';
      }
      return 'p0';
    },
    showSendButton(){
      if(this.country !== null && this.transporter != null && this.registry != null && this.deliveryAddress != null && this.recipient !== null) {
        return true;
      }
      return false;
    },
  },
  methods: {
    setCountry(value) {
      this.country = value;
    },
    setTransporter(value) {
      this.transporter = value;
    },
    setCashOnDelivery(value) {
      this.cashOnDelivery = value;
    },
    handleGetTransporters() {
      this.$store.dispatch('getTransporters');
    },
    createConsignment() {
      this.$store.dispatch('createConsignment', {
        country: this.country,
        transporterId: this.transporter,
        deliveryAddress: this.deliveryAddress,
        recipient: this.recipient,
        cashOnDelivery: this.cashOnDelivery,
        note: this.note,
      });
      this.cleanForm();
    },
    cleanForm() {
      this.country = null;
      this.transporter = null;
      this.deliveryAddress = null;
      this.recipient = null;
      this.cashOnDelivery = false;
      this.note = '';
      this.section = 1;
      this.registry = null;
      this.$router.push('consignments');
    }
  },
  created() {
    this.handleGetTransporters();
  },
}
</script>

<style lang="scss">
  .create {
    display: flex;
    width: 100%;
    box-shadow: -5px 13px 27px -5px rgba(50, 50, 93, 0.2),
    0 8px 16px -8px rgba(0, 0, 0, 0.2);
  }

  .data {
    width: 30rem;
    background-color: white;
    padding: 3rem;
    font-size: 1.7rem;
    border-left: 0.1rem solid darken(white, 10%);

    span {
      color: #cb2d3e;
      margin-left: 1rem;
    }

    .send-button {
      margin-top: 3rem;
      border-radius: 0.5rem;
      border: 0 solid transparent;
      padding: 2rem 0;
      width: 100%;
      background-color: #cb2d3e;
      font-size: 1.7rem;
      font-weight: 500;
      cursor: pointer;
      color: white;
      transition: all 0.4s;

      &:hover {
        background-color: lighten(#cb2d3e, 6%);
      }
    }
  }

  .wizzard {
  display: flex;
  flex-direction: column;
  width: calc(100% - 30rem);
  position: relative;
  z-index: 3;
  background-color: white;
  

  &__title {
    padding: 2rem;
    width: 100%;
    font-size: 1.9rem;
    color: grey;
    font-weight: 500;
    border-bottom: 1px solid darken(white, 10%);
  }

  &__progress {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    position: relative;

    &__step {
      padding: 2rem;
      text-align: center;
      font-size: 1.2rem;
      color: grey;

      &.inactive {
        opacity: 0.5;
      }
    }

    .step-icon {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      background-color: #ef473a;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
      font-weight: 700;
      margin: 0 auto 1rem;
      position: relative;
      z-index: 3;
    }

    &__line {
      position: absolute;
      width: 0;
      height: 0.2rem;
      background-color: red;
      top: 4.5rem;
      left: 16%;
      z-index: 2;
      transition: width ease-in-out 0.5s;

      &.p0 {
        width: 0;
      }
      &.p50 {
        width: 34%;
      }
      &.p100 {
        width: 68%;
      }
    }
  }

  &__content {
    margin: 2rem 0 5rem;
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
