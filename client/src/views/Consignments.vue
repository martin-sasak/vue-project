<template>
  <div class="consignment-table">
    <div class="consignment-table__list">
      <div class="consignment-table__list__title">Zásilky</div>
      <div class="consignment-table__list__content">
        <div v-for="consignment in consignments" :key="consignment.id" @click="showConsignment(consignment)" class="consignment" :class="consignment.id === id ? 'consignment--active' : ''">
          <svg version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="width: 3rem; height: 3rem;">
            <g transform="translate(0,-952.36218)">
              <path style="text-indent:0;text-transform:none;direction:ltr;block-progression:tb;baseline-shift:baseline;color:#000000;enable-background:accumulate;" d="m 50.09375,956.36437 c 0.3871,0.013 0.74204,0.088 1.03125,0.1875 l 39.999999,16 c 1.10955,0.4489 1.88743,1.6157 1.875,2.8125 l 0,54.00003 c -1e-5,1.1865 -0.77517,2.3363 -1.875,2.7812 l -39.999999,16 c -0.7127,0.2883 -1.5373,0.2883 -2.25,0 l -40.0000003,-16 c -1.09983,-0.4449 -1.87499,-1.5947 -1.875,-2.7812 l 0,-54.00003 c -0.0124,-1.1968 0.76545,-2.3636 1.875,-2.8125 l 40.0000003,-16 c 0.41241,-0.1497 0.83165,-0.2 1.21875,-0.1875 z m -0.0937,6.2188 -31.875,12.75 11.25,4.5312 30.125,-13.4688 -9.5,-3.8124 z m 18.3125,7.3437 -31.0625,13.0625 12.75,5.12502 31.875,-12.75002 -13.5625,-5.4375 z m 18.6875,9.875 -34,13.59372 0,47.53131 34,-13.625 0,-47.50003 z m -74,0 0,47.50003 34,13.625 0,-47.53131 -13,-5.1874 0,14.15621 -8,-3.00001 0,-14.37502 -13,-5.1875 z" fill="#bbb" fill-opacity="1" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"></path>
            </g>
          </svg>
          <div class="consignment__label">
            <b>ID:</b> {{ consignment.id }} <br>
            <b>Dátum:</b> {{ consignment.createdAt | date }}
          </div>
        </div>
      </div>
    </div>
    <div class="consignment-table__detail">
      <transition name="fade" mode="out-in" appear>
        <div v-if="activeConsignment != null" key="consignment_info">
          <h2>ID: <span>{{ activeConsignment.id }}</span></h2>
          <b>Dátum:</b> {{ activeConsignment.createdAt | date }}  <br>
          <b>Krajina:</b> {{ activeConsignment.country }} <br>
          <b>Prepravce:</b> {{ activeConsignment.transporter.name }} <br>
          <b>Adresa doručení:</b> {{ activeConsignment.deliveryAddress }} <br>
          <b>Meno přijemcu:</b> {{ activeConsignment.recipient }} <br>
          <b>Dobírka:</b> {{ activeConsignment.cashOnDelivery }} <br>
          <b>Poznámka:</b> {{ activeConsignment.note }} <br>
        </div>
        <div v-else key="empty_info">
          Prosím zvoľte objednávku 
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'consignments',
  data() {
    return {
      activeConsignment: null,
      id: '',
    }
  },
  computed: {
    consignments() {
      return this.$store.getters.consignments;
    },
  },
  methods: {
    showConsignment(consignment) {
      this.activeConsignment = consignment;
      this.id = consignment.id;
    },
    handleGetConsignments() {
      this.$store.dispatch('getConsignments');
    }
  },
  created() {
    this.handleGetConsignments();
  },
};
</script>

<style lang="scss">
  .consignment-table {
    display: flex;
    background-color: white;
    width: 100%;
    max-height: 700px;
    box-shadow: -5px 13px 27px -5px rgba(50,50,93,.2), 0 8px 16px -8px rgba(0,0,0,.2);

    &__list {
      width: 30rem;
      border-right: 1px solid darken(white, 10%);
      height: inherit;

      &__title {
        padding: 2rem;
        width: 100%;
        font-size: 1.9rem;
        color: white;
        background: linear-gradient(to right, #cb2d3e, #ef473a);
        font-weight: 500;
        border-bottom: 1px solid darken(white, 10%);
      }

      &__content {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-height: 630px;
        overflow-y: auto;
        background-color: darken(white, 5%);
      }
    }

    &__detail {
      padding: 5rem;
      line-height: 2.5rem;
      font-size: 1.3rem;
      width: 50rem;
      border-right: 1px solid darken(white, 10%); 
      b {
        color:#4b496b;
        min-width: 12rem;
        display: inline-block;
      }
      h2 {
        color: #cb2d3e;
        font-size: 3rem;
        span {
          color: #4b496b; 
        }
      }
      
    }

    .consignment {
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      background-color: white;
      margin-bottom: 0.1rem;
      cursor: pointer;
      min-height: 6.5rem;
      transition: all 0.4;

      &--active {
        border-left: 0.5rem solid #e53c41;
        background-color: #fbf5f6;
      }

      &:hover {
        background-color: #fbf5f6;
      }
      
      &__label {
        font-size: 1.1rem;
        margin-left: 1rem;
        line-height: 1.4rem;
        color: grey;
        b {
          color: #4b496b;
        }
      }
    }
  }
</style>
